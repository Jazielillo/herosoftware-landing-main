import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { LuInstagram } from "react-icons/lu";
import { FiFacebook } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { ModeToggle } from './ModeToggle';

export default function FooterSection() {
    return (
        <div className='flex flex-col w-full pt-10 pb-5 px-5 gap-10 font-inter 
                        md:px-8 md:gap-12
                        lg:px-10 lg:gap-14
                        xl:px-10
                        2xl:pt-10 2xl:px-10 2xl:pb-5 2xl:gap-10'>

            <div className='grid grid-cols-2 gap-8
                            md:flex md:justify-between md:items-start
                            lg:items-center
                            2xl:justify-between 2xl:items-center'>

                {/* Navigation Links - Hidden on md+ */}
                <div className='flex flex-col gap-2 text-base leading-6 text-foreground dark:text-foreground
                                md:hidden'>
                    <Link href="#" className="hover:text-primary transition-colors">Inicio</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Servicios</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Productos</Link>
                    <Link href="#" className='text-common-blue-500 dark:text-common-blue-500 hover:text-common-blue-600 dark:hover:text-common-blue-600 transition-colors'>Contacto</Link>

                    {/* Theme Toggle Button */}
                    <div className='mt-3'>
                        <ModeToggle />
                    </div>
                </div>

                {/* Logo and Social Icons Container */}
                <div className='flex flex-col items-end 
                                md:flex-row md:items-center md:gap-6
                                lg:gap-8
                                xl:gap-10'>

                    {/* Logo */}
                    <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={45}
                        height={54}
                        className='md:w-[50px] md:h-[60px]
                                   lg:w-[58px] lg:h-[70px]
                                   xl:w-[62px] xl:h-[75px]
                                   2xl:w-[66px] 2xl:h-[80px]
                                   dark:invert dark:brightness-0 dark:contrast-200'
                    />

                    {/* Mobile Social Section */}
                    <div className='md:hidden'>
                        <p className='mt-4 mb-2 text-foreground dark:text-foreground'>Síguenos en:</p>
                        <div className='flex gap-[7px]'>
                            <LuInstagram size={24} strokeWidth={1.5} className="text-foreground dark:text-foreground" />
                            <FiFacebook size={24} strokeWidth={1.5} className="text-foreground dark:text-foreground" />
                            <FiLinkedin size={24} strokeWidth={1.5} className="text-foreground dark:text-foreground" />
                            <PiWhatsappLogoLight size={28} strokeWidth={1.5} className="text-foreground dark:text-foreground" />
                        </div>
                    </div>
                </div>

                {/* Desktop/Tablet Social Section */}
                <div className='hidden md:flex md:flex-col md:justify-center md:items-end md:gap-2
                                lg:gap-3'>
                    <p className='text-base leading-6 text-foreground dark:text-foreground'>Síguenos en:</p>
                    <div className='flex justify-end items-center gap-3
                                    md:gap-4
                                    lg:gap-5'>
                        <LuInstagram
                            size={32}
                            strokeWidth={1.5}
                            className='md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-foreground dark:text-foreground'
                        />
                        <FiFacebook
                            size={32}
                            strokeWidth={1.5}
                            className='md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-foreground dark:text-foreground'
                        />
                        <FiLinkedin
                            size={32}
                            strokeWidth={1.5}
                            className='md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-foreground dark:text-foreground'
                        />
                        <PiWhatsappLogoLight
                            size={32}
                            strokeWidth={1.5}
                            className='md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-foreground dark:text-foreground'
                        />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <p className='text-sm font-light leading-7 text-center text-foreground dark:text-muted-foreground
                          md:text-base
                          lg:leading-8'>
                HERO Software © 2025. Todos los derechos reservados.
            </p>
        </div>
    )
}