import React from 'react'
import { Badge } from '@/components/ui/badge'
import SolutionsItems from './shared/SolutionsItems'


export default function OurSolutionsSection() {
    return (
        <>
            <div className='w-full flex flex-col items-center pb-5 gap-[3px]'>
                <Badge
                    variant={"services"}
                >
                    <p className="font-inter text-[12px] font-normal leading-4 px-1
                                    2xl:flex 2xl:h-[32px] 2xl:min-h-[32px] 2xl:max-h-[32px]
                                    2xl:px-[4px] 2xl:justify-center 2xl:items-center 2xl:text-base 2xl:w-[86px]">
                        Servicios
                    </p>
                </Badge>

                <p className='text-foreground dark:text-foreground text-center font-inter text-4xl font-bold leading-10 2xl:text-5xl'>
                    Conoce nuestras soluciones
                </p>
            </div>

            <SolutionsItems />
        </>
    )
}