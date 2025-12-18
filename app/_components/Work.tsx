import Image from "next/image";

const work = [
    {
        step: 1,
        title: "Share a few details",
        description: "Tell us about your car, location, and coverage needs. That's it.",
        image: "/work-1.png"
    },
    {
        step: 2,
        title: "Analyze real options",
        description: "See offers from recognised insurers, side by side, based on your profile.",
        image: "/work-2.png"
    },
    {
        step: 3,
        title: "Choose your plan",
        description: "Select the coverage that best suits your needs and budget.",
        image: "/work-3.png"
    }
]

export default function Work() {
    return (
        <section className="w-full bg-[#F6FAFD] py-6 px-3 md:py-10 lg:py-12 xl:px-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-7 md:gap-9 lg:gap-12">
                <div className="w-full max-w-xl mx-auto space-y-3 text-center px-2 md:px-0">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#3476DB] font-semibold font-roboto">
                        Simple steps
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold font-poppins leading-tight">
                        How It{" "}
                        <span className="bg-linear-to-r from-[#00AEEF] to-[#3476DB] bg-clip-text text-transparent font-poppins">
                            Works
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-[#4A5568] font-roboto">
                        Get to the right quote in minutes without the confusing paperwork.
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {work.map((item) => (
                        <div
                            key={item.step}
                            className="relative flex h-full flex-col gap-3.5 md:gap-4 overflow-hidden rounded-2xl border border-[#E5EEF5] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#00AEEF] to-[#3476DB]" />

                            <div className="relative w-full h-40 md:h-44 lg:h-52 overflow-hidden bg-[#F8FBFF] px-3 pt-4 md:px-4 md:pt-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex items-start gap-3 px-4 pb-4 md:px-5 md:pb-5">
                                <span className="inline-flex md:hidden lg:inline-flex shrink-0 items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-r from-[#00AEEF] to-[#3476DB] text-white text-sm md:text-base font-bold font-poppins leading-none shadow-sm">
                                    {item.step}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl md:text-lg lg:text-xl font-semibold font-poppins text-[#0F172A]">
                                        {item.title}
                                    </h3>
                                    <p className="text-base md:text-sm lg:text-base font-roboto text-[#4A5568]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}