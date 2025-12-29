import ContactForm from '@/components/shared/ContactForm'
import React from 'react'

export default function Page() {
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-0">
            {/* Layout Responsivo Unificado */}
            <div className="flex flex-col items-center gap-2 mt-11 lg:mt-16 xl:mt-20 
                          lg:flex-row lg:justify-center lg:items-start lg:gap-12 xl:gap-16 2xl:gap-20 
                          max-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1130px] mx-auto">

                {/* Columna Izquierda - Título */}
                <div className="flex flex-col items-center lg:items-start gap-2 lg:flex-1 lg:justify-center lg:min-h-[400px] xl:min-h-[500px] 2xl:min-h-[600px]">
                    <div className="px-2 py-[3px] bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <div className="text-center text-blue-600 dark:text-blue-300 text-xs font-medium font-['Geist'] leading-4 tracking-tight">
                            Contacto
                        </div>
                    </div>

                    <div className="text-center lg:text-left w-full max-w-[350px] sm:max-w-md lg:max-w-none">
                        <span className="text-black dark:text-neutral-100 text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-normal font-['Geist'] leading-7 sm:leading-8 md:leading-9 lg:leading-10 xl:leading-[48px]">
                            ¡Estamos listos para esta
                        </span>
                        <br className="lg:hidden" />
                        <span className="text-black dark:text-neutral-100 text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-normal font-['Geist'] leading-7 sm:leading-8 md:leading-9 lg:leading-10 xl:leading-[48px]">
                            {' '}
                        </span>
                        <span className="text-black dark:text-neutral-100 text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold font-['Geist'] leading-8 sm:leading-9 md:leading-10 lg:leading-10 xl:leading-10">
                            nueva misión!
                        </span>
                    </div>

                    <div className="w-full max-w-[350px] sm:max-w-md lg:max-w-none mt-6 lg:mt-4 leading-tight">
                        <span className="text-black dark:text-neutral-200 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl font-normal font-['Geist']">
                            Es necesario que nos proporciones
                        </span>
                        <span className="text-black dark:text-neutral-100 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl font-semibold font-['Geist']">
                            {' '}tu información para ponernos en contacto.
                        </span>
                    </div>
                </div>

                {/* Columna Derecha - Formulario */}
                <div className="w-full max-w-[350px] sm:max-w-md md:max-w-lg lg:w-[450px] xl:w-[500px] 2xl:w-[525px] mt-10 lg:mt-0">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}