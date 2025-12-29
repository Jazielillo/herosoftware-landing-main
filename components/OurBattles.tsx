import React from 'react'
import { Badge } from '@/components/ui/badge'

export default function OurBattlesSection() {
    return (
        <>
            <div className='w-full p-6'>
                <div className='flex justify-center'>
                    <Badge variant={"ourBattles"}>
                        <p className='font-inter text-[12px] font-normal text-base-secondary leading-4 px-1'>
                            También hemos luchado nuestras propias batallas
                        </p>
                    </Badge>
                </div>

                <p className='text-black font-inter text-center text-4xl font-bold leading-10 my-0.5'>
                    Reliquias de batalla
                </p>

                <p className='font-menlo text-center text-sm leading-5'>
                    Cada proyecto es una victoria digital. En HERO convertimos retos en soluciones para
                    <span className='text-common-green-500'> Emprendedores como tú</span>. ¡Conócelos!
                </p>
                {/* TODO: AQUI AGREGAR LA EJECUCIÓN DEL PLAN */}
            </div>
        </>
    )
}
