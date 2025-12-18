import Image from "next/image";

const partners = [
    {
        name: "American Family Insurance",
        image: "/american-family-insurance.svg"
    },
    {
        name: "Allstate",
        image: "/allstate.svg"
    },
    {
        name: "Liberty Mutual Insurance",
        image: "/liberty-mutual-insurance.svg"
    },
    {
        name: "Progressive",
        image: "/progressive.svg"
    },
    {
        name: "Root Insurance",
        image: "/root-insurance.svg"
    },
    {
        name: "The General",
        image: "/the-general.svg"
    },
]

export default function Partners() {
    return (
        <section className="w-full bg-white py-6 px-4 lg:py-16 xl:px-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 lg:gap-12">
                <div className="w-full max-w-xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl text-center font-semibold font-poppins leading-tight">
                        Trusted Insurance{" "}
                        <span className="bg-linear-to-r from-[#00AEEF] to-[#3476DB] bg-clip-text text-transparent font-poppins">
                            Partners
                        </span>
                    </h2>
                    <p className="text-base md:text-lg md:max-w-md md:mx-auto lg:mx-0 lg:max-w-none text-center font-roboto leading-relaxed">
                        We partner with leading auto insurance providers across the US, so you can review coverage options without chasing multiple companies.
                    </p>
                </div>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex items-center justify-center">
                            <Image src={partner.image} alt={partner.name} width={100} height={100} className="w-40 h-auto object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}