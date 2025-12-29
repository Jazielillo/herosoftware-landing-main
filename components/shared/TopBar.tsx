"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoIosArrowUp } from "react-icons/io";
import { TbSend2 } from "react-icons/tb";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ModeToggle } from './ModeToggle';
import NavigationMenu from './NavigationMenu';

export default function TopBar() {
    const [active, setActive] = useState<string>("inicio")
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const items = [
        { label: "Inicio", href: "#inicio", key: "inicio" },
        { label: "Servicios", href: "#servicios", key: "servicios" },
        { label: "Proyectos", href: "#proyectos", key: "proyectos" },
    ]

    // Este useEffect maneja la visibilidad del TopBar basado en dirección del scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Si estamos en la parte superior (primeros 50px), siempre mostrar
            if (currentScrollY < 50) {
                setIsVisible(true)
            } else {
                // Si scrolleamos hacia arriba, mostrar. Si hacia abajo, ocultar
                if (currentScrollY < lastScrollY) {
                    setIsVisible(true)
                } else if (currentScrollY > lastScrollY) {
                    setIsVisible(false)
                }
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    // Este useEffect detecta en qué sección estás cuando haces scroll
    useEffect(() => {
        const handleScrollDetection = () => {
            // Detectar si pasamos HeroInActionSection para mostrar botón
            const heroInAction = document.querySelector('.hero-in-action-trigger')
            if (heroInAction) {
                const rect = heroInAction.getBoundingClientRect()
                setShowScrollButton(rect.top < window.innerHeight)
            }

            const currentScrollY = window.scrollY

            // Obtener las secciones
            const serviciosElement = document.getElementById('servicios')
            const proyectosElement = document.getElementById('proyectos')

            // Si servicios existe y está visible en viewport
            if (serviciosElement) {
                const serviciosRect = serviciosElement.getBoundingClientRect()
                if (serviciosRect.top <= 200 && serviciosRect.bottom >= 200) {
                    setActive("servicios")
                    return
                }
            }

            // Si proyectos existe y está visible en viewport
            if (proyectosElement) {
                const proyectosRect = proyectosElement.getBoundingClientRect()
                if (proyectosRect.top <= 200 && proyectosRect.bottom >= 200) {
                    setActive("proyectos")
                    return
                }
            }

            // Si no estamos en servicios ni proyectos, estamos en inicio
            setActive("inicio")
        }

        window.addEventListener('scroll', handleScrollDetection, { passive: true })
        handleScrollDetection() // Ejecutar al inicio

        return () => window.removeEventListener('scroll', handleScrollDetection)
    }, [])

    const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string, key: string) => {
        e.preventDefault()

        // Si es inicio, ir hasta el tope absoluto
        if (key === "inicio") {
            setActive("inicio")
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            return
        }

        // Para otras secciones, usar el comportamiento normal
        setActive(key)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    const scrollToTop = () => {
        // Establecer "inicio" como activo inmediatamente
        setActive("inicio")

        // Ir hasta el tope absoluto de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {/* TopBar con animación y blur */}
            <div
                className={`fixed top-0 left-0 right-0 z-40 w-screen transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                {/* Fondo blur */}
                <div className="absolute inset-0 bg-background/80 dark:bg-background/80 backdrop-blur-md"></div>

                {/* Contenido del TopBar */}
                <div className='relative w-full max-w-[100vw] grid grid-cols-3 items-center px-6 lg:px-12 xl:px-16 py-6 xl:py-8'>
                    {/* Logo - Left */}
                    <div className='flex justify-start'>
                        <Link href="/" className='lg:hidden flex px-1'>
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                width={33}
                                height={40}
                                className="dark:invert dark:brightness-0 dark:contrast-200"
                            />
                        </Link>

                        <Link href="/" className='hidden lg:flex lg:px-1'>
                            <Image
                                src="/images/logoResponsive.svg"
                                alt="Logo"
                                width={145}
                                height={60}
                                className="dark:invert dark:brightness-0 dark:contrast-200"
                            />
                        </Link>
                    </div>

                    {/* Menubar - Center */}
                    <div className='flex justify-center'>
                        <NavigationMenu items={items} active={active} onItemClick={handleScroll} />
                    </div>

                    {/* Buttons - Right */}
                    <div className='flex justify-end gap-5'>
                        {/* ModeToggle solo visible en sm+ (tablet/desktop) */}
                        <div className="hidden sm:block">
                            <ModeToggle />
                        </div>

                        <Button
                            asChild
                            variant="interactive"
                            size={"icon"}
                            className="flex items-center gap-2"
                        >
                            <Link href={"/contact"} className="flex items-center gap-2">
                                <span className="hidden lg:inline">Quiero contactarme</span>
                                <TbSend2 size={24} strokeWidth={1.5} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Espaciador para compensar el TopBar fixed */}
            <div className="h-[80px] xl:h-[100px]"></div>

            {/* Botón flotante para volver arriba */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 flex w-12 h-12 justify-center items-center rounded-full bg-black dark:bg-foreground text-white dark:text-background shadow-lg hover:bg-gray-800 dark:hover:bg-foreground/90 transition-all duration-300 z-50"
                    aria-label="Volver arriba"
                >
                    <IoIosArrowUp size={24} strokeWidth={2} />
                </button>
            )}
        </>
    )
}