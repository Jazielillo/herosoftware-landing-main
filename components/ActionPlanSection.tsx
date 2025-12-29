import React from 'react'
import { Badge } from '@/components/ui/badge'
import BouncingCirclesBW from './shared/BouncingCirclesBW'

export default function ActionPlanSection() {
    return (
        <>
            <div className='w-full p-6'>
                <div className='flex justify-center'>
                    <Badge variant={"actionPlan"}>
                        <p className='font-inter text-[12px] font-normal text-base-success leading-4 px-1'>Plan de acción</p>
                    </Badge>
                </div>

                <p className='text-black font-inter text-center text-4xl font-bold leading-10'>
                    Así{' '}
                    <span
                        className=""
                        style={{
                            textDecorationLine: 'underline',
                            textDecorationStyle: 'solid',
                            textDecorationSkipInk: 'none',
                            textDecorationThickness: 'auto',
                            textUnderlineOffset: 'auto',
                            textUnderlinePosition: 'from-font',
                        }}
                    >
                        ejecutamos
                    </span> el plan hacia
                    <span className='text-common-yellow-500 italic'>
                        ¡El triunfo!
                    </span>
                </p>


            </div>
            <div className='relative w-full h-[350px] sm:h-[350px] md:h-[350px] mt-8'>
                <BouncingCirclesBW />
            </div>
        </>
    )
}
