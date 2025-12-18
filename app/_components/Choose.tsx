import Image from "next/image";

const choose = [
    {
        title: "One form, multiple insurers",
        description: "Your details are submitted once, not over and over again.",
        image: "/form.svg"
    },
    {
        title: "Rates tailored to you",
        description: "Quotes reflect your vehicle, driving record, and location.",
        image: "/tag.svg"
    },
    {
        title: "Clear coverage options",
        description: "Understand deductibles, limits, and extras before deciding.",
        image: "/insurance.svg"
    },
    {
        title: "No upfront fees",
        description: "Getting quotes costs nothing.",
        image: "/no-money.svg"
    },
]

export default function Choose() {
    return (
        <section className="w-full bg-white py-8 px-3 md:py-12 lg:py-14 xl:px-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 md:gap-10 lg:gap-12">
                <div className="w-full max-w-xl mx-auto space-y-3 text-center px-2 md:px-0">
                    <h2 className="text-3xl md:text-4xl font-semibold font-poppins leading-tight">
                        Why Car Owners Choose{" "}
                        <span className="bg-linear-to-r from-[#00AEEF] to-[#3476DB] bg-clip-text text-transparent font-poppins">
                            AssureRates
                        </span>
                    </h2>
                </div>
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full aspect-4/3 lg:aspect-square xl:aspect-4/3 overflow-hidden rounded-2xl bg-[#F4F8FB]">
                            <Image
                                src="/choose-img.png"
                                alt="Choose"
                                fill
                                priority
                                sizes="(min-width: 1024px) 480px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-5 md:gap-6">
                        {choose.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-start gap-3 rounded-xl border border-[#E5EEF5] bg-white shadow-sm px-4 py-3 md:px-5 md:py-4"
                            >
                                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-linear-to-r from-[#E6F5FF] to-[#EEF3FF]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-xl font-semibold font-poppins text-[#0F172A]">{item.title}</h3>
                                    <p className="text-base font-roboto text-[#4A5568]">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}