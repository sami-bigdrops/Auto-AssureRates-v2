import { NextRequest, NextResponse } from 'next/server'

// Use Edge Runtime for faster response times
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract only UTM parameters
    const utmSource = searchParams.get('utm_source')
    const utmId = searchParams.get('utm_id')
    const utmS1 = searchParams.get('utm_s1')
    
    // Create response
    const response = NextResponse.json({ 
      success: true, 
      message: 'UTM tracking cookies set successfully' 
    })
    
    // Set cookies for UTM parameters only
    if (utmSource) {
      response.cookies.set('utm_source', utmSource, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
    }
    
    if (utmId) {
      response.cookies.set('utm_id', utmId, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
    }
    
    if (utmS1) {
      response.cookies.set('utm_s1', utmS1, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
    }
    
    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to set tracking cookies' },
      { status: 500 }
    )
  }
}
