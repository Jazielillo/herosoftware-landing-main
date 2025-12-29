'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { SlArrowDown } from "react-icons/sl"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Filters from '@/components/shared/Filter'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SolutionsItems() {
    const [api, setApi] = useState<CarouselApi>()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [activeFilter, setActiveFilter] = useState('todos')
    const [currentPage, setCurrentPage] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

    const ITEMS_PER_PAGE = 6

    const items = [
        { id: 1, imageRoute: "/images/solutions/1.jpg", alt: "Solution 1", message: "Tengo una infraestructura antigua o costosa que dificulta el crecimiento de mi negocio.", category: "software", description: "Migramos tu infraestructura a la nube para hacerla más escalable, segura y rentable." },
        { id: 2, imageRoute: "/images/solutions/2.jpg", alt: "Solution 2", message: "Tengo un sitio/sistema pero no está disponible online lo que impide mi operación.", category: "software", description: "Desplegamos tu sistema en la nube para que esté disponible 24/7 desde cualquier lugar." },
        { id: 3, imageRoute: "/images/solutions/3.jpg", alt: "Solution 3", message: "Tengo un negocio, pero todavía no cuento con una página web donde me encuentren.", category: "diseno", description: "Desarrollamos páginas rápidas, modernas y adaptadas a cualquier dispositivo, listas para convertir visitantes en clientes." },
        { id: 4, imageRoute: "/images/solutions/4.jpg", alt: "Solution 4", message: "Mis usuarios se confunden al usar mi app o página y terminan abandonando.", category: "diseno", description: "Creamos interfaces intuitivas y funcionales que mejoran la experiencia del usuario y reducen el abandono." },
        { id: 5, imageRoute: "/images/solutions/5.jpg", alt: "Solution 5", message: "Tengo un producto/servicio, pero no se como iniciar para darme a conocer.", category: "diseno", description: "Creamos identidades memorables que diferencian tu negocio y lo posicionan en la mente de tus clientes." },
        { id: 6, imageRoute: "/images/solutions/6.jpg", alt: "Solution 6", message: "Necesito un sistema que me ayude a optimizar procesos de mi negocio/empresa.", category: "software", description: "Diseñamos sistemas de software personalizados que optimizan procesos y se adaptan 100% a tu negocio." },
        { id: 7, imageRoute: "/images/solutions/7.jpg", alt: "Solution 7", message: "Publico en redes sociales, pero mi contenido no llama la atención ni genera interacción.", category: "marketing", description: "Diseñamos contenido atractivo y estratégico que aumenta visibilidad e interacción real en tus redes." },
        { id: 8, imageRoute: "/images/solutions/8.jpg", alt: "Solution 8", message: "Tengo redes sociales, pero no sé cómo hacerlas crecer ni generar comunidad.", category: "marketing", description: "Gestionamos tus redes con estrategia, generando comunidad, interacción y crecimiento orgánico." },
        { id: 9, imageRoute: "/images/solutions/9.jpg", alt: "Solution 9", message: "Quiero que mi negocio aparezca en google y no se como.", category: "marketing", description: "Optimizamos tu presencia en Google para que tus clientes te encuentren fácilmente cuando te busquen." },
        { id: 10, imageRoute: "/images/solutions/10.jpg", alt: "Solution 10", message: "Tengo un evento en puerta y aun no tengo mis invitaciones digitales.", category: "diseno", description: "Creamos experiencias digitales interactivas que sorprenden, emocionan y generan mayor satisfacción." },
        { id: 11, imageRoute: "/images/solutions/11.jpg", alt: "Solution 11", message: "Tengo un negocio y me interesa tener tarjetas de lealtad digitales para mis clientes.", category: "diseno", description: "Diseñamos tarjetas de lealtad digitales personalizadas que fidelizan clientes y aumentan ventas." },
        { id: 12, imageRoute: "/images/solutions/12.jpg", alt: "Solution 12", message: "Tengo un restaurante y aun no tengo un menú que transmita el sazón de mi restaurante.", category: "diseno", description: "Transformamos materiales comunes en diseños digitales creativos que captan la atención al instante." }
    ]

    const imagesButtonsText = [
        { imagePosition: 1, message: "Me interesa una migración a la nube" },
        { imagePosition: 2, message: "Me interesa un despliegue" },
        { imagePosition: 3, message: "Me interesa una landingpage" },
        { imagePosition: 4, message: "Me interesa un diseño UX/UI de calidad" },
        { imagePosition: 5, message: "Me interesa una Identidad de marca" },
        { imagePosition: 6, message: "Me interesa un sistema" },
        { imagePosition: 7, message: "Me interesa diseño de contenido" },
        { imagePosition: 8, message: "Me interesa manejo de redes sociales" },
        { imagePosition: 9, message: "Me interesa mi negocio en Google" },
        { imagePosition: 10, message: "Me interesan invitaciones" },
        { imagePosition: 11, message: "Me interesan tarjetas de lealtad" },
        { imagePosition: 12, message: "Me interesa un menú" }
    ]

    const filters = [
        { label: "Todos", key: "todos" },
        { label: "Software", key: "software" },
        { label: "Diseño", key: "diseno" },
        { label: "Marketing & Redes", key: "marketing" }
    ]

    const filteredItems = activeFilter === 'todos'
        ? items
        : items.filter(item => item.category === activeFilter)

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
    const paginatedItems = filteredItems.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    )

    useEffect(() => {
        if (!api) {
            return
        }

        const onSelect = () => {
            setCurrentSlide(api.selectedScrollSnap())
        }

        api.on("select", onSelect)
        onSelect()

        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    useEffect(() => {
        setIsAnimating(true)
        const timer = setTimeout(() => setIsAnimating(false), 200)
        return () => clearTimeout(timer)
    }, [currentSlide])

    useEffect(() => {
        if (api) {
            api.scrollTo(0)
            setCurrentSlide(0)
        }
        setCurrentPage(0)
    }, [activeFilter, api])

    const handleFilterClick = (filterKey: string) => {
        setIsTransitioning(true)
        setTimeout(() => {
            setActiveFilter(filterKey)
            setTimeout(() => setIsTransitioning(false), 50)
        }, 10)
    }

    const handlePrevPage = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrentPage(prev => Math.max(0, prev - 1))
            setTimeout(() => setIsTransitioning(false), 50)
        }, 10)
    }

    const handleNextPage = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
            setTimeout(() => setIsTransitioning(false), 50)
        }, 10)
    }

    const toggleExpand = (itemId: number) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }))
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="pb-5">
                <div className="flex justify-center">
                    <Filters
                        filters={filters}
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterClick}
                    />
                </div>
            </div>

            {/* Mobile Carousel (hasta lg) */}
            <div className="lg:hidden w-full">
                <div className={`transition-discrete duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <Carousel
                        className="w-full"
                        setApi={setApi}
                    >
                        <CarouselContent>
                            {filteredItems.map((item) => (
                                <CarouselItem key={item.id}>
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <Card className="dark:bg-card dark:border-border">
                                            <CardContent className="flex items-center justify-center max-w-[350px] max-h-[200px] border border-black dark:border-border rounded-xl">
                                                <div className="flex flex-col min-w-[350px] items-center gap-5">
                                                    <Image
                                                        src={item.imageRoute}
                                                        alt={item.alt}
                                                        width={345}
                                                        height={190}
                                                        className={
                                                            item.id === 12 ? "max-w-[250px] max-h-[190px] rounded-xl" : "max-h-[190px] rounded-xl"
                                                        }
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <p className="text-base-default-500 dark:text-muted-foreground font-inter text-base leading-6 mx-9 text-center">
                                            {item.message}
                                        </p>
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="focus:outline-none cursor-pointer"
                                        >
                                            <SlArrowDown
                                                size={20}
                                                strokeWidth={1.5}
                                                className={`text-foreground dark:text-foreground transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : 'rotate-0'
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItems[item.id] ? 'max-h-40 opacity-100 mb-3' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <p className="text-base-default-500 dark:text-muted-foreground font-inter text-base mx-9 text-center">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <div className="w-full flex justify-center mt-4">
                        <Button
                            asChild
                            variant="solutions"
                            className="overflow-hidden"
                        >
                            <Link href="/contact">
                                <span
                                    className={`inline-block transition-all duration-300 ${isAnimating
                                        ? 'opacity-0 translate-y-2'
                                        : 'opacity-100 translate-y-0'
                                        }`}
                                >
                                    {imagesButtonsText.find(btn => btn.imagePosition === filteredItems[currentSlide]?.id)?.message}
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Grid (lg en adelante) */}
            <div className="hidden lg:flex w-full flex-col items-center px-4 lg:px-6 2xl:px-8 lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-7xl">
                <div className={`transition-discrete duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'} w-full`}>
                    <div className="grid grid-cols-3 gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 justify-center w-full items-start">
                        {paginatedItems.map((item) => (
                            <div key={item.id} className="flex flex-col items-center gap-3 xl:gap-4 2xl:gap-5 text-center">
                                <Card className="w-full lg:max-w-[260px] xl:max-w-[320px] 2xl:max-w-[345px] dark:bg-card dark:border-border">
                                    <CardContent className="flex items-center justify-center p-0 border border-black dark:border-border rounded-xl overflow-hidden">
                                        <Image
                                            src={item.imageRoute}
                                            alt={item.alt}
                                            width={345}
                                            height={190}
                                            className={
                                                item.id === 12
                                                    ? "lg:w-[180px] xl:w-[220px] 2xl:w-[250px] lg:h-[140px] xl:h-[165px] 2xl:h-[190px] object-cover"
                                                    : "w-full lg:h-[140px] xl:h-[165px] 2xl:h-[190px] object-cover"
                                            }
                                        />
                                    </CardContent>
                                </Card>

                                <p className="text-base-default-500 dark:text-muted-foreground font-inter lg:text-sm xl:text-base font-normal not-italic lg:leading-5 xl:leading-6 text-center px-1 xl:px-2 lg:min-h-[60px] xl:min-h-[72px]">
                                    {item.message}
                                </p>

                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="focus:outline-none cursor-pointer"
                                >
                                    <SlArrowDown
                                        size={16}
                                        strokeWidth={1.5}
                                        className={`xl:w-5 xl:h-5 text-foreground dark:text-foreground transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : 'rotate-0'
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItems[item.id] ? 'max-h-40 opacity-100 mb-3' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-base-default-500 dark:text-muted-foreground font-inter lg:text-xs xl:text-sm font-normal px-2 text-center">
                                        {item.description}
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    variant="solutionsResponsive"
                                    className="w-full max-w-sm lg:h-[36px] xl:h-[38px] 2xl:h-[40px] lg:text-xs xl:text-sm 2xl:text-base lg:px-2 xl:px-3 2xl:px-4"
                                >
                                    <Link href="/contact">
                                        {imagesButtonsText.find(
                                            (btn) => btn.imagePosition === item.id
                                        )?.message}
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 lg:gap-5 mt-8 lg:mt-10">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="flex min-w-[36px] min-h-[36px] p-2 justify-center items-center rounded-[8px] border border-[#E5E5E5] dark:border-border hover:bg-gray-50 dark:hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white dark:bg-card"
                        >
                            <ChevronLeft size={20} strokeWidth={2} className="text-foreground dark:text-foreground" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setIsTransitioning(true)
                                        setTimeout(() => {
                                            setCurrentPage(i)
                                            setTimeout(() => setIsTransitioning(false), 50)
                                        }, 10)
                                    }}
                                    className="w-4 h-4 aspect-square"
                                >
                                    {i === currentPage ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <circle cx="8" cy="8" r="8" fill="currentColor" className="text-foreground dark:text-foreground" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <circle cx="8" cy="8" r="8" fill="#E5E5E5" className="dark:fill-muted" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="flex min-w-[36px] min-h-[36px] p-2 justify-center items-center rounded-[8px] border border-[#E5E5E5] dark:border-border hover:bg-gray-50 dark:hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white dark:bg-card"
                        >
                            <ChevronRight size={20} strokeWidth={2} className="text-foreground dark:text-foreground" />
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}