'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuCrown } from "react-icons/lu";
import DecryptedText from '@/animations/DecryptedText';
import { clsx } from "clsx";

export default function HeroSection() {
    const containerClasses = clsx(
        'w-full max-w-[430px] flex flex-col align-center px-6 py-0 gap-2 mx-auto',
        // sm: 640px
        'sm:max-w-2xl',
        // md: 768px
        'md:max-w-3xl',
        // lg: 1024px
        'lg:max-w-5xl',
        // xl: 1280px
        'xl:max-w-6xl',
        // 2xl: 1536px
        '2xl:max-w-[1512px]'
    );

    const subtitleClasses = clsx(
        'font-inter text-common-zinc-400 font-normal leading-5 text-sm',
        'sm:text-base',
        'md:text-lg',
        'lg:text-xl',
        'xl:text-2xl',
        '2xl:text-2xl'
    );

    const mainTitleClasses = clsx(
        'font-onest text-[54px] font-black leading-[100%]',
        'sm:text-6xl',
        'md:text-7xl',
        'lg:text-8xl',
        'xl:text-[90px]',
        '2xl:text-[100px]'
    );

    const quoteClasses = clsx(
        'font-geist text-base font-medium leading-6 text-common-zinc-400',
        'sm:text-lg',
        'md:text-xl md:font-medium',
        'lg:text-xl lg:font-semibold',
        'xl:text-2xl xl:font-semibold xl:leading-7',
        '2xl:text-2xl 2xl:font-semibold 2xl:leading-7'
    );

    const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const serviciosElement = document.getElementById('servicios');
        if (serviciosElement) {
            serviciosElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className={containerClasses}>
            <div className="text-center">
                <p className={subtitleClasses}>
                    ¡No hay nadie igual a ti, <span className="text-common-blue-500">excepto tú!</span>
                </p>
            </div>

            <div className="text-center">
                <p className={mainTitleClasses}>
                    <DecryptedText
                        text="El poder"
                        animateOn="view"
                        speed={100}
                        sequential={true}
                        revealDirection="start"
                        className="font-onest font-black"
                    />
                    {" "}
                    <DecryptedText
                        text="tecnológico"
                        animateOn="view"
                        speed={100}
                        sequential={true}
                        revealDirection="start"
                        className="font-oxanium font-light"
                    />
                    <br className="md:hidden" />
                    <br className="hidden 2xl:block" />
                    <DecryptedText
                        text="te hará"
                        animateOn="view"
                        speed={100}
                        sequential={true}
                        revealDirection="start"
                        className="font-onest font-black"
                    />
                    {" "}
                    <DecryptedText
                        text="invencible..."
                        animateOn="view"
                        speed={100}
                        sequential={true}
                        revealDirection="start"
                        className="font-onest font-black"
                    />
                </p>
            </div>

            <div className="text-center">
                <p className={quoteClasses}>
                    <span className="2xl:block">{`"Son nuestras decisiones las que nos hacen ser quienes somos, y siempre podemos`}</span>
                    {" "}
                    <span className="2xl:block">{`optar por hacer algo distinto."`}</span>
                </p>
            </div>

            <div className="flex flex-row py-2 justify-center gap-2">
                <Button asChild variant="outline" className="w-[116px] h-10 text-[14px]">
                    <a href="#servicios" onClick={handleScrollToServices}>
                        Ver servicios
                    </a>
                </Button>
                <Button asChild variant="interactive" className="w-[185px] h-10">
                    <Link href="/contact">
                        Soy emprendedor
                        <LuCrown size={20} strokeWidth={1.2} />
                    </Link>
                </Button>
            </div>
        </div>
    );
}