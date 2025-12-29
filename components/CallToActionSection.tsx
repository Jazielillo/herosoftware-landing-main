import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbSend2 } from "react-icons/tb";
import { clsx } from "clsx";

export default function CallToActionSection() {

    const containerClasses = clsx(
        'relative flex flex-col w-[382px] px-4 py-6 mx-auto items-center gap-5 font-inter text-white rounded-lg overflow-hidden',
        // sm: 540px
        'sm:w-[540px] sm:px-6 sm:py-8 sm:gap-6',
        // md: 720px
        'md:w-[720px] md:px-8 md:py-10 md:gap-7',
        // lg: 960px
        'lg:w-[960px] lg:px-10 lg:py-12 lg:gap-8',
        // xl: 1140px
        'xl:w-[1140px] xl:px-12 xl:py-14 xl:gap-9',
        // 2xl: 1220px
        '2xl:w-[1220px] 2xl:gap-10 2xl:py-[60px] 2xl:px-5'
    );

    const titleClasses = clsx(
        'text-center text-2xl font-light leading-6',
        'sm:text-3xl sm:leading-8',
        'md:text-3xl md:leading-9',
        'lg:text-4xl lg:leading-10',
        'xl:text-[42px] xl:leading-11',
        '2xl:text-5xl 2xl:leading-12'
    );

    const subtitleClasses = clsx(
        'text-center text-2xl font-bold leading-8',
        'sm:text-3xl sm:leading-9',
        'md:text-3xl md:leading-10',
        'lg:text-4xl lg:leading-11',
        'xl:text-[42px] xl:leading-[48px]',
        '2xl:text-5xl 2xl:leading-12'
    );

    const descriptionClasses = clsx(
        'font-inter text-center text-base font-extralight leading-[24px]',
        'sm:text-base sm:leading-6',
        'md:text-lg md:leading-7 md:font-light',
        'lg:text-lg lg:leading-7',
        'xl:text-xl xl:leading-7 xl:mt-3',
        '2xl:text-xl 2xl:font-light 2xl:leading-6 2xl:mt-5'
    );

    const buttonClasses = clsx(
        'h-[40px]',
        'w-full relative z-10',
        'sm:w-full',
        'md:w-[185px]',
        'lg:w-[185px]',
        'xl:w-[185px]',
        '2xl:w-[185px]'
    );

    const buttonTextClasses = clsx(
        'font-geist text-sm leading-6 flex gap-2',
        'sm:text-sm',
        'md:text-sm',
        'lg:text-sm',
        'xl:text-sm',
        '2xl:text-sm'
    );

    return (
        <div className={containerClasses}>
            {/* Video de fondo */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/callToActionVideo.mp4" type="video/mp4" />
            </video>

            {/* Overlay oscuro opcional para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* Contenido */}
            <div className="gap-5 relative z-10">
                <p className={titleClasses}>
                    Tenemos el poder digital
                </p>
                <p className={subtitleClasses}>
                    que impulsa tu próxima victoria
                </p>
                <p className={descriptionClasses}>
                    Diseño, software y estrategia que trabajan juntos para llevar tu negocio al siguiente nivel.
                </p>
            </div>

            <Button asChild variant="interactive" className={buttonClasses}>
                <Link href="/contact" className={buttonTextClasses}>
                    Quiero contactarme
                    <TbSend2 size={20} strokeWidth={1.5} />
                </Link>
            </Button>
        </div>
    )
}