"use client"

import { useEffect, useState } from "react"

interface Circle {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    label: string
    parentId?: number
    isContainer?: boolean
}

export default function BouncingCirclesBW() {
    const [circles, setCircles] = useState<Circle[]>([])
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
    const [dragState, setDragState] = useState<{
        isDragging: boolean
        circleId: number | null
        startX: number
        startY: number
        startTime: number
    }>({
        isDragging: false,
        circleId: null,
        startX: 0,
        startY: 0,
        startTime: 0,
    })

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!dragState.isDragging) return
            e.preventDefault()
        }

        const handleGlobalMouseUp = (e: MouseEvent) => {
            if (!dragState.isDragging || dragState.circleId === null) return

            const deltaX = e.clientX - dragState.startX
            const deltaY = e.clientY - dragState.startY
            const deltaTime = Math.max(Date.now() - dragState.startTime, 50)

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            const velocity = Math.min(distance / (deltaTime / 100), 2)
            const angle = Math.atan2(deltaY, deltaX)

            if (distance > 5) {
                setCircles((prevCircles) =>
                    prevCircles.map((circle) => {
                        if (circle.id === dragState.circleId) {
                            return {
                                ...circle,
                                vx: Math.cos(angle) * velocity,
                                vy: Math.sin(angle) * velocity,
                            }
                        }
                        return circle
                    }),
                )
            }

            setDragState({
                isDragging: false,
                circleId: null,
                startX: 0,
                startY: 0,
                startTime: 0,
            })
        }

        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (!dragState.isDragging) return
            e.preventDefault()
        }

        const handleGlobalTouchEnd = (e: TouchEvent) => {
            if (!dragState.isDragging || dragState.circleId === null) return

            const touch = e.changedTouches[0]
            const deltaX = touch.clientX - dragState.startX
            const deltaY = touch.clientY - dragState.startY
            const deltaTime = Math.max(Date.now() - dragState.startTime, 50)

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            const velocity = Math.min(distance / (deltaTime / 100), 2)
            const angle = Math.atan2(deltaY, deltaX)

            if (distance > 5) {
                setCircles((prevCircles) =>
                    prevCircles.map((circle) => {
                        if (circle.id === dragState.circleId) {
                            return {
                                ...circle,
                                vx: Math.cos(angle) * velocity,
                                vy: Math.sin(angle) * velocity,
                            }
                        }
                        return circle
                    }),
                )
            }

            setDragState({
                isDragging: false,
                circleId: null,
                startX: 0,
                startY: 0,
                startTime: 0,
            })
        }

        if (dragState.isDragging) {
            document.addEventListener("mousemove", handleGlobalMouseMove)
            document.addEventListener("mouseup", handleGlobalMouseUp)
            document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false })
            document.addEventListener("touchend", handleGlobalTouchEnd)
        }

        return () => {
            document.removeEventListener("mousemove", handleGlobalMouseMove)
            document.removeEventListener("mouseup", handleGlobalMouseUp)
            document.removeEventListener("touchmove", handleGlobalTouchMove)
            document.removeEventListener("touchend", handleGlobalTouchEnd)
        }
    }, [dragState])

    const handleMouseDown = (e: React.MouseEvent, circleId: number) => {
        e.preventDefault()
        e.stopPropagation()
        setDragState({
            isDragging: true,
            circleId,
            startX: e.clientX,
            startY: e.clientY,
            startTime: Date.now(),
        })
    }

    const handleTouchStart = (e: React.TouchEvent, circleId: number) => {
        e.preventDefault()
        e.stopPropagation()
        const touch = e.touches[0]
        setDragState({
            isDragging: true,
            circleId,
            startX: touch.clientX,
            startY: touch.clientY,
            startTime: Date.now(),
        })
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!dragState.isDragging || dragState.circleId === null) return

        const touch = e.changedTouches[0]
        const deltaX = touch.clientX - dragState.startX
        const deltaY = touch.clientY - dragState.startY
        const deltaTime = Date.now() - dragState.startTime

        const velocity = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (deltaTime / 16), 1.5)
        const angle = Math.atan2(deltaY, deltaX)

        setCircles((prevCircles) =>
            prevCircles.map((circle) => {
                if (circle.id === dragState.circleId) {
                    return {
                        ...circle,
                        vx: Math.cos(angle) * velocity,
                        vy: Math.sin(angle) * velocity,
                    }
                }
                return circle
            }),
        )

        setDragState({
            isDragging: false,
            circleId: null,
            startX: 0,
            startY: 0,
            startTime: 0,
        })
    }

    useEffect(() => {
        const containerRef = document.getElementById('bouncing-circles-container')

        const updateDimensions = () => {
            if (containerRef) {
                const rect = containerRef.getBoundingClientRect()
                setContainerDimensions({
                    width: rect.width,
                    height: rect.height,
                })
                setDimensions({
                    width: rect.width,
                    height: rect.height,
                })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        // Esperar un momento para que el contenedor tenga dimensiones
        setTimeout(updateDimensions, 100)

        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    useEffect(() => {
        if (containerDimensions.width === 0) return

        // Determinar si es móvil
        const isMobile = containerDimensions.width < 640

        // Escalar tamaños basados en el ancho del contenedor
        const baseSize = isMobile ? 400 : 800
        const scale = containerDimensions.width / baseSize

        // Tamaños base diferentes para móvil y desktop
        const sizes = isMobile ? {
            investigacion: 140,
            estrategia: 70,
            diseno: 100,
            construccion: 130,
            pruebas: 65,
            ejecucion: 105
        } : {
            investigacion: 140,
            estrategia: 70,
            diseno: 100,
            construccion: 130,
            pruebas: 65,
            ejecucion: 105
        }

        // Aumentar un poco el área cuando no es mobile
        const width = isMobile ? containerDimensions.width : containerDimensions.width * 1.08
        const height = isMobile ? containerDimensions.height : containerDimensions.height * 1.12

        const initialCircles: Circle[] = [
            // Bola 1: Investigación (contenedor)
            {
                id: 0,
                x: width * (isMobile ? 0.25 : 0.3),
                y: height * (isMobile ? 0.65 : 0.6),
                vx: 0.3,
                vy: -0.2,
                size: sizes.investigacion * scale,
                label: "Investigación",
                isContainer: true,
            },
            // Estrategia (dentro de Investigación)
            {
                id: 1,
                x: width * (isMobile ? 0.25 : 0.2),
                y: height * (isMobile ? 0.65 : 0.5),
                vx: 0.4,
                vy: 0.3,
                size: sizes.estrategia * scale,
                label: "Estrategia",
                parentId: 0,
            },
            // Bola 2: Diseño (individual)
            {
                id: 2,
                x: width * (isMobile ? 0.5 : 0.4),
                y: height * (isMobile ? 0.25 : 0.35),
                vx: 0.3,
                vy: 0.4,
                size: sizes.diseno * scale,
                label: "Diseño",
            },
            // Bola 3: Construcción (contenedor)
            {
                id: 3,
                x: width * (isMobile ? 0.5 : 0.6),
                y: height * (isMobile ? 0.6 : 0.5),
                vx: -0.2,
                vy: 0.3,
                size: sizes.construccion * scale,
                label: "Construcción",
                isContainer: true,
            },
            // Pruebas (dentro de Construcción)
            {
                id: 4,
                x: width * (isMobile ? 0.5 : 0.6),
                y: height * (isMobile ? 0.6 : 0.5),
                vx: -0.4,
                vy: 0.3,
                size: sizes.pruebas * scale,
                label: "Pruebas",
                parentId: 3,
            },
            // Bola 4: Ejecución (individual)
            {
                id: 5,
                x: width * (isMobile ? 0.75 : 0.8),
                y: height * (isMobile ? 0.5 : 0.45),
                vx: -0.2,
                vy: 0.2,
                size: sizes.ejecucion * scale,
                label: "Ejecución",
            },
        ]

        setCircles(initialCircles)
    }, [containerDimensions])

    useEffect(() => {
        if (circles.length === 0 || dimensions.width === 0) return

        const animateCircles = () => {
            setCircles((prevCircles) =>
                prevCircles.map((circle) => {
                    let newX = circle.x + circle.vx
                    let newY = circle.y + circle.vy
                    let newVx = circle.vx
                    let newVy = circle.vy

                    if (circle.parentId !== undefined) {
                        // Círculo hijo: rebota dentro de su contenedor
                        const parent = prevCircles.find((p) => p.id === circle.parentId)
                        if (parent) {
                            const maxDistance = (parent.size - circle.size) / 2 - 3
                            const dx = newX - parent.x
                            const dy = newY - parent.y
                            const distance = Math.sqrt(dx * dx + dy * dy)

                            if (distance >= maxDistance) {
                                const angle = Math.atan2(dy, dx)
                                newX = parent.x + Math.cos(angle) * (maxDistance - 1)
                                newY = parent.y + Math.sin(angle) * (maxDistance - 1)

                                const normalX = dx / distance
                                const normalY = dy / distance

                                const dotProduct = newVx * normalX + newVy * normalY
                                newVx = newVx - 2 * dotProduct * normalX
                                newVy = newVy - 2 * dotProduct * normalY

                                newVx += (Math.random() - 0.5) * 0.05
                                newVy += (Math.random() - 0.5) * 0.05

                                const speed = Math.sqrt(newVx * newVx + newVy * newVy)
                                if (speed > 1.5) {
                                    newVx = (newVx / speed) * 1.5
                                    newVy = (newVy / speed) * 1.5
                                }
                            }
                        }
                    } else {
                        // Círculos flotantes: rebotan en los bordes del contenedor
                        const minX = circle.size / 2
                        const maxX = dimensions.width - circle.size / 2
                        const minY = circle.size / 2
                        const maxY = dimensions.height - circle.size / 2

                        if (newX <= minX || newX >= maxX) {
                            newVx = -newVx
                            newX = Math.max(minX, Math.min(maxX, newX))
                        }

                        if (newY <= minY || newY >= maxY) {
                            newVy = -newVy
                            newY = Math.max(minY, Math.min(maxY, newY))
                        }
                    }

                    return {
                        ...circle,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy,
                    }
                }),
            )
        }

        const interval = setInterval(animateCircles, 16)
        return () => clearInterval(interval)
    }, [circles.length, dimensions])

    // Función para detectar si un círculo está detrás de otro
    const getCircleOpacity = (circleId: number) => {
        const currentCircle = circles.find(c => c.id === circleId)
        if (!currentCircle) return 1

        // Los círculos hijos no se vuelven transparentes
        if (currentCircle.parentId !== undefined) return 1

        // Verificar si hay algún círculo flotante encima
        for (const otherCircle of circles) {
            if (otherCircle.id === circleId || otherCircle.parentId !== undefined) continue

            const dx = currentCircle.x - otherCircle.x
            const dy = currentCircle.y - otherCircle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (currentCircle.size + otherCircle.size) / 2

            // Si están superpuestos y el otro está "encima" (mayor id = dibujado después)
            if (distance < minDistance && otherCircle.id > circleId) {
                return 0.3
            }
        }

        return 1
    }

    return (
        <div id="bouncing-circles-container" className="relative w-full h-[350px] bg-white ">
            {circles.map((circle) => {
                const labelPosition = circle.isContainer
                    ? circle.label === "Investigación" ? "bottom" : "top"
                    : "center"

                // Tamaño de fuente más pequeño para contenedores
                const fontSize = circle.isContainer
                    ? Math.max(9, circle.size / 8.5)
                    : Math.max(10, circle.size / 6)

                return (
                    <div
                        key={circle.id}
                        onMouseDown={(e) => handleMouseDown(e, circle.id)}
                        onTouchStart={(e) => handleTouchStart(e, circle.id)}
                        onTouchEnd={handleTouchEnd}
                        className={`absolute rounded-full flex items-center justify-center text-center font-medium text-gray-900 cursor-grab active:cursor-grabbing select-none transition-opacity duration-200 ${circle.isContainer
                            ? "border-2 border-gray-900 bg-white"
                            : "border-2 border-gray-900 bg-white"
                            } ${dragState.isDragging && dragState.circleId === circle.id ? "scale-110" : ""
                            }`}
                        style={{
                            width: `${circle.size}px`,
                            height: `${circle.size}px`,
                            left: `${circle.x - circle.size / 2}px`,
                            top: `${circle.y - circle.size / 2}px`,
                            fontSize: `${fontSize}px`,
                            lineHeight: "1.2",
                            opacity: getCircleOpacity(circle.id),
                            transition: dragState.isDragging && dragState.circleId === circle.id
                                ? 'none'
                                : 'left 0.016s linear, top 0.016s linear, opacity 0.2s ease',
                        }}
                    >
                        <span
                            className={`px-1 ${labelPosition === "bottom" ? "absolute" :
                                labelPosition === "top" ? "absolute" : ""
                                }`}
                            style={{
                                bottom: labelPosition === "bottom" ? `${circle.size * 0.2}px` : undefined,
                                top: labelPosition === "top" ? `${circle.size * 0.2}px` : undefined,
                            }}
                        >
                            {circle.label}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}