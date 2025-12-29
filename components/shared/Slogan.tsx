'use client'

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { clsx } from "clsx";

export default function Slogan() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Para móvil (una sola línea)
    // Se centra rápido y luego sale lentamente
    const xSingleLine = useTransform(scrollYProgress, [0, 0.45, 0.9], ["100%", "0%", "-170%"]);

    // Primera línea: empieza fuera a la izquierda, se centra al 45%, termina ligeramente a la derecha
    const xFirstLineSm = useTransform(scrollYProgress, [0, 0.45, 0.8], ["-160%", "-10%", "20%"]);
    const xFirstLineXl = useTransform(scrollYProgress, [0, 0.45, 0.8], ["-160%", "-10%", "20%"]);

    // Segunda línea: empieza fuera a la derecha, se centra al 46%, termina ligeramente a la izquierda
    // Ajustamos más para compensar el padding que tiene
    const xSecondLineSm = useTransform(scrollYProgress, [0, 0.46, 0.8], ["140%", "40%", "10%"]);
    const xSecondLineXl = useTransform(scrollYProgress, [0, 0.46, 0.8], ["140%", "40%", "10%"]);

    const singleLineClasses = clsx(
        'font-onest text-base-default-100 font-black whitespace-nowrap',
        'text-[60px] leading-[60px] tracking-[-3px]',
        'sm:text-[54px] sm:leading-[54px] sm:tracking-[-2.5px]'
    );

    const multilineTextClasses = clsx(
        'font-onest text-base-default-100 font-black',
        'text-[54px] leading-[54px] tracking-[-2.5px]',
        'md:text-[72px] md:leading-[72px] md:tracking-[-3.5px]',
        'lg:text-[88px] lg:leading-[88px] lg:tracking-[-4.5px]',
        'xl:text-[100px] xl:leading-[100px] xl:tracking-[-5px]',
        '2xl:text-[120px] 2xl:leading-[120px] 2xl:tracking-[-6px]'
    );

    // Padding para la segunda línea cuando esté centrada
    const paddingClasses = clsx(
        'pl-[220px]',
        'md:pl-[280px]',
        'lg:pl-[350px]',
        'xl:pl-[400px]',
        '2xl:pl-[480px]'
    );

    return (
        <div ref={containerRef} className="overflow-hidden py-20">
            {/* Versión móvil - una línea */}
            <motion.div
                style={{ x: xSingleLine }}
                className={clsx(singleLineClasses, 'sm:hidden')}
            >
                Crecer es parte de tu historia...
            </motion.div>

            {/* Versión tablet/desktop pequeño */}
            <div className={clsx(multilineTextClasses, 'hidden sm:block xl:hidden')}>
                <motion.div
                    style={{ x: xFirstLineSm }}
                    className="whitespace-nowrap"
                >
                    Crecer es parte
                </motion.div>
                <motion.div
                    style={{ x: xSecondLineSm }}
                    className={clsx('whitespace-nowrap', paddingClasses)}
                >
                    de tu historia...
                </motion.div>
            </div>

            {/* Versión desktop grande */}
            <div className={clsx(multilineTextClasses, 'hidden xl:block')}>
                <motion.div
                    style={{ x: xFirstLineXl }}
                    className="whitespace-nowrap"
                >
                    Crecer es parte
                </motion.div>
                <motion.div
                    style={{ x: xSecondLineXl }}
                    className={clsx('whitespace-nowrap', paddingClasses)}
                >
                    de tu historia...
                </motion.div>
            </div>
        </div>
    )
}