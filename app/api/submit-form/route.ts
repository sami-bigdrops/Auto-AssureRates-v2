import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Use Edge Runtime for better performance
export const runtime = 'edge'

// Validation schema using Zod for better type safety and performance
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address').max(100, 'Email too long'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body with Zod for better performance and type safety
    const validationResult = formSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      return NextResponse.json(
        { error: 'Validation failed', validationErrors: errors },
        { status: 400 }
      )
    }
    
    const { firstName, lastName, email, subject, message } = validationResult.data

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Validate required environment variables
    if (!process.env.LEADPROSPER_CAMPAIGN_ID || !process.env.LEADPROSPER_SUPPLIER_ID || !process.env.LEADPROSPER_API_KEY || !process.env.LEADPROSPER_API_URL) {
      const missingVars = [];
      if (!process.env.LEADPROSPER_CAMPAIGN_ID) missingVars.push('LEADPROSPER_CAMPAIGN_ID');
      if (!process.env.LEADPROSPER_SUPPLIER_ID) missingVars.push('LEADPROSPER_SUPPLIER_ID');
      if (!process.env.LEADPROSPER_API_KEY) missingVars.push('LEADPROSPER_API_KEY');
      if (!process.env.LEADPROSPER_API_URL) missingVars.push('LEADPROSPER_API_URL');
      
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: `Missing: ${missingVars.join(', ')}`
        },
        { status: 500 }
      );
    }

    // Prepare the data for LeadProsper
    const formData = {
      lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
      lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
      lp_key: process.env.LEADPROSPER_API_KEY,
      lp_subid1: '',
      lp_subid2: '',
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || '',
      landing_page_url: request.headers.get('referer') || '',
    };

    // Send to LeadProsper
    const API_URL = process.env.LEADPROSPER_API_URL
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Get the raw response text
    const rawResponse = await response.text();

    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(rawResponse);
    } catch {
      // Even if parsing fails, we'll treat it as success
      result = { status: 'ACCEPTED' };
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('LeadProsper response:', result);
    }

    if (result.status === 'ACCEPTED' || result.status === 'DUPLICATED' || result.status === 'ERROR') {
      // Generate unique access token for thank you page
      const accessToken = crypto.randomUUID();
      const expiresAt = Date.now() + (10 * 60 * 1000); // Token expires in 10 minutes
      
      const successResponse = { 
        success: true, 
        message: 'Form submitted successfully',
        redirectUrl: '/thankyou',
        leadProsperStatus: result.status,
        accessToken,
        expiresAt
      };
      
      // Set secure cookie for additional validation
      const response = NextResponse.json(successResponse, { status: 200 });
      response.cookies.set('thankyou_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 // 10 minutes
      });
      
      return response;
    } else {
      const errorResponse = { 
        success: false, 
        error: 'Lead submission failed',
        leadProsperStatus: result.status
      };
      return NextResponse.json(errorResponse, { status: 400 })
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
