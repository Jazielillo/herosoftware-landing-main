'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carouselVictories';
import { Badge } from './ui/badge';

const VictoriesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const revealImgRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const projects = [
        {
            id: 1,
            image: '/images/projects/project1.jpg',
            title: 'SIRISOR: Sistema de sorteos online basados en lotería nacional.',
        },
        {
            id: 2,
            image: '/images/projects/project2.jpg',
            title: 'SIRISOR: Sistema de sorteos online basados en lotería nacional.',
        },
        {
            id: 3,
            image: '/images/projects/project3.jpg',
            title: 'SIRISOR: Sistema de sorteos online basados en lotería nacional.',
        },
    ];

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsDesktop(width >= 768);
            setIsMdScreen(width >= 768 && width < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;


            const endPoint = (windowHeight - rect.height) / 2;

            let progress = 0;

            if (rect.top >= windowHeight) {
                progress = 0;
            }
            else if (rect.top > endPoint && rect.top < windowHeight) {
                progress = (windowHeight - rect.top) / (windowHeight - endPoint);
                progress = Math.max(0, Math.min(1, progress));
            }
            else {
                progress = 1;
            }

            setScrollProgress(progress);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const translateY = (1 - scrollProgress) * 200;

    return (
        <div
            ref={sectionRef}
            className='flex flex-col py-10 sm:py-12 md:py-14 lg:py-[60px] items-center gap-4 sm:gap-5 self-stretch bg-black'
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseMove={(e) => {
                if (!isDesktop) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y}px`);
                }
            }}
            onMouseLeave={() => {
                if (!isDesktop) return;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            {isDesktop && (
                <div
                    ref={revealImgRef}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        mixBlendMode: 'lighten',
                        opacity: 0.3,
                        pointerEvents: 'none',
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        '--mx': '-9999px',
                        '--my': '-9999px',
                        WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                        maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat'
                    }}
                >
                    <Image
                        src="/images/background-reveal.jpg"
                        alt="Reveal effect"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            )}

            <div
                style={{
                    transform: `translateY(${translateY}px)`,
                    opacity: scrollProgress * 0.7 + 0.3,
                    transition: 'none',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <div className='flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 items-center gap-[3px] self-stretch'>
                    <Badge
                        variant={"projects"}
                        className='w-[73px] h-[24px]'
                    >
                        <p className="text-white font-inter text-xs font-normal leading-4">
                            Proyectos
                        </p>
                    </Badge>
                    <h1 className='font-inter text-2xl sm:text-3xl md:text-4xl font-bold leading-8 sm:leading-9 md:leading-10 text-white self-center text-center'>
                        Victorias digitales
                    </h1>
                    <p className='font-menlo font-normal text-center text-xs sm:text-sm leading-4 sm:leading-5 text-white max-w-xl px-4'>
                        En HERO convertimos retos en soluciones para
                        <span className='text-common-green-500'> Emprendedores como tú</span>. ¡Conócelos!
                    </p>
                </div>

                <div className="w-full flex justify-center items-center px-4">
                    {isDesktop ? (
                        <Carousel
                            opts={{
                                align: 'center',
                                loop: true,
                            }}
                            className="w-full max-w-7xl"
                        >
                            <CarouselContent className="flex items-center justify-center -ml-5">
                                {projects.map((project, index) => {
                                    const isHovered = hoveredIndex === index;
                                    return (
                                        <CarouselItem
                                            key={project.id}
                                            className="basis-auto pl-5"
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <div
                                                className="rounded-lg relative overflow-hidden cursor-pointer"
                                                style={{
                                                    width: isMdScreen ? '230px' : '290px',
                                                    height: isMdScreen ? '360px' : '400px',
                                                    backgroundColor: '#F4F4F5',
                                                }}
                                            >
                                                {/* Imagen con zoom */}
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                                                    style={{
                                                        backgroundImage: `url(${project.image})`,
                                                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                                        opacity: isHovered ? 0.8 : 1,
                                                    }}
                                                />

                                                {/* Gradiente siempre visible */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background:
                                                            'linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #131313 100%)',
                                                        borderRadius: '0 0 8px 8px',
                                                    }}
                                                />

                                                {/* Texto y botón - siempre visibles */}
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 p-4 z-10 flex justify-center items-end gap-2.5"
                                                    style={{
                                                        backdropFilter: 'blur(8px)',
                                                    }}
                                                >
                                                    <div className="flex items-start justify-between gap-2 flex-1">
                                                        <p
                                                            className="text-white font-inter flex-1 md:text-base lg:text-xl"
                                                            style={{
                                                                fontWeight: 600,
                                                                lineHeight: '24px',
                                                            }}
                                                        >
                                                            {project.title}
                                                        </p>
                                                        <button className="text-white hover:text-green-500 transition-colors flex-shrink-0">
                                                            <svg
                                                                className="w-5 h-5 md:w-6 md:h-6"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M7 17L17 7" />
                                                                <path d="M7 7h10v10" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                        </Carousel>
                    ) : (

                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {projects.map((project) => (
                                    <CarouselItem key={project.id}>
                                        <div className="p-1">
                                            <div
                                                className="rounded-lg bg-cover bg-center relative overflow-hidden aspect-[3/4] w-full"
                                                style={{
                                                    backgroundImage: `url(${project.image})`,
                                                    backgroundColor: '#F4F4F5',
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background:
                                                            'linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #131313 100%)',
                                                        borderRadius: '0 0 8px 8px',
                                                    }}
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 p-4 z-10 flex justify-center items-end gap-2.5"
                                                    style={{
                                                        backdropFilter: 'blur(8px)',
                                                    }}
                                                >
                                                    <div className="flex items-start justify-between gap-2 flex-1">
                                                        <p
                                                            className="text-white font-inter flex-1 text-base"
                                                            style={{
                                                                fontWeight: 600,
                                                                lineHeight: '24px',
                                                            }}
                                                        >
                                                            {project.title}
                                                        </p>
                                                        <button className="text-white hover:text-green-500 transition-colors flex-shrink-0">
                                                            <svg
                                                                className="w-5 h-5"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M7 17L17 7" />
                                                                <path d="M7 7h10v10" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VictoriesSection;