"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Moonbeam 2",
    link: "https://gomoonbeam.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor 2",
    link: "https://cursor.so",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
];

const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      className="h-48 w-64 sm:h-56 sm:w-72 md:h-64 md:w-80 lg:h-72 lg:w-96 xl:h-80 xl:w-[28rem] relative shrink-0"
    >
      <img
        src={product.thumbnail}
        className="object-cover absolute h-full w-full inset-0 rounded-lg opacity-80"
        alt={product.title}
      />
    </motion.div>
  );
};

export default function HeroInActionSection() {
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const thirdRow = products.slice(8, 12);
  const containerRef = React.useRef(null);

  // Scroll progress para todo el contenedor (incluye el espacio extra para el pinning)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Movimiento horizontal de las filas
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1200]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1200]),
    springConfig
  );

  // Desplazamiento vertical: las filas suben para mostrar la tercera fila
  const translateY = useSpring(
    useTransform(scrollYProgress, [0.35, 0.65], [0, -380]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig
  );

  return (
    // Contenedor con altura extra para crear el efecto de pinning
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {/* Contenedor sticky que se queda fijo mientras scrolleas */}
      <div className="sticky top-0 left-0 w-full h-[100vh] flex items-center justify-center overflow-hidden [perspective:1000px] [transform-style:preserve-3d]">
        {/* Wrapper con altura fija de 2 filas */}
        <div className="relative w-full h-[650px] sm:h-[720px] md:h-[800px] lg:h-[900px] xl:h-[1050px] overflow-hidden">
          {/* Animación de fondo - contenedor de las 3 filas */}
          <motion.div
            style={{ rotateX, rotateZ, y: translateY }}
            className="absolute inset-0 flex flex-col justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 pointer-events-none opacity-30 py-12"
          >
            {/* Primera fila */}
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12 md:space-x-14 lg:space-x-16 xl:space-x-20 mb-4">
              {firstRow.map((product, idx) => (
                <ProductCard product={product} translate={translateX} key={product.title + idx} />
              ))}
            </motion.div>

            {/* Segunda fila */}
            <motion.div className="flex flex-row space-x-8 sm:space-x-12 md:space-x-14 lg:space-x-16 xl:space-x-20 mb-4">
              {secondRow.map((product, idx) => (
                <ProductCard product={product} translate={translateXReverse} key={product.title + idx} />
              ))}
            </motion.div>

            {/* Tercera fila - inicialmente oculta debajo */}
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-12 md:space-x-14 lg:space-x-16 xl:space-x-20">
              {thirdRow.map((product, idx) => (
                <ProductCard product={product} translate={translateX} key={product.title + idx} />
              ))}
            </motion.div>
          </motion.div>

          {/* Texto encima */}
          <div className="relative z-10 text-center bg-transparent flex items-center justify-center h-full">
            <div className="font-sans mx-[38px] flex flex-col gap-2 bg-transparent sm:w-full sm:max-w-[600px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:w-[1512px] sm:px-4">
              <p className="text-blue-600 text-2xl sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] font-extrabold leading-6 sm:leading-[100%] tracking-[-0.24px] sm:tracking-[-0.28px] md:tracking-[-0.34px] lg:tracking-[-0.40px] xl:tracking-[-0.44px] 2xl:tracking-[-0.48px] bg-transparent">
                HERO en acción
              </p>
              <p className="text-base md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[32px] font-medium sm:font-normal leading-6 sm:leading-[150%] sm:tracking-[-0.18px] md:tracking-[-0.22px] lg:tracking-[-0.26px] xl:tracking-[-0.30px] 2xl:tracking-[-0.32px] bg-transparent sm:w-full sm:max-w-[400px] md:max-w-[550px] lg:max-w-[700px] xl:max-w-[850px] 2xl:max-w-[993px] mx-auto text-center">
                Unimos creatividad, estrategia y tecnología para que tu proyecto deje de ser solo idea y se
                vuelva una experiencia digital poderosa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}