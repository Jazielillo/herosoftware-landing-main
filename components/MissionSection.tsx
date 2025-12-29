'use client'

import SocialNetworks from "./shared/SocialNetworks"

export default function MissionSection() {

    return (
        <>
            <div className="w-full px-4 flex flex-col align-center text-center py-0 gap-[10px] flex-shrink-0 self-stretch mx-auto 
                sm:w-[90%] sm:max-w-[600px]
                md:w-[90%] md:max-w-[700px]
                lg:w-[90%] lg:max-w-[800px]
                xl:w-[90%] xl:max-w-[900px]
                2xl:w-[850px]">

                <p className="font-inter font-normal leading-6 text-base-default-500 text-base 
                    sm:text-lg sm:leading-7 
                    md:text-xl md:leading-8 
                    lg:text-2xl lg:leading-9 lg:font-onest
                    xl:text-[28px] xl:leading-[42px] xl:font-onest
                    2xl:text-[32px] 2xl:leading-[48px] 2xl:font-onest">
                    <span className="sm:hidden block max-w-[340px] mx-auto">
                        En HERO no buscamos reflectores, creamos y entregamos resultados. Nuestra misión es simple, acompañar emprendedores o empresas que buscan dar el paso y brillar en el mundo de hoy, <span className="font-bold text-black dark:text-white">el mundo digital.</span>
                    </span>
                    <span className="hidden sm:inline">
                        En HERO no buscamos reflectores, creamos y entregamos resultados. Nuestra misión es simple, acompañar emprendedores o empresas que buscan dar el paso y brillar en el mundo de hoy, <span className="font-bold text-black dark:text-white">el mundo digital.</span>
                    </span>
                </p>
            </div>


            <div className="flex pt-15 
                sm:pt-12 
                md:pt-13 
                lg:pt-14 
                xl:pt-[80px]">
                <div className="bg-black flex min-w-[201px] py-4 px-6 
                    md:min-w-[190px] md:py-4 md:px-6
                    lg:min-w-[240px] lg:py-6 lg:px-8
                    xl:min-w-[280px] xl:py-8 xl:px-10
                    2xl:w-[383px] 2xl:h-[120px] 2xl:min-w-0 2xl:py-10 2xl:px-10 2xl:justify-center 2xl:items-center 2xl:gap-[10px]">
                    <p className="text-white font-inter text-sm italic font-normal leading-5
                        md:text-sm md:leading-5
                        lg:text-base lg:leading-6
                        xl:text-lg xl:leading-7
                        2xl:text-xl 2xl:leading-6 2xl:text-center">
                        <span className="lg:hidden">
                            &ldquo;Tu historia también <br />
                            forma parte de la <br />
                            historia de otros.&rdquo;
                        </span>
                        <span className="hidden lg:inline">
                            &ldquo;Tu historia también forma <br />
                            parte de la historia de otros.&rdquo;
                        </span>
                    </p>
                </div>

                <SocialNetworks />
            </div>

        </>
    )
}