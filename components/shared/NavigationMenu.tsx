import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavigationItem {
    label: string
    href: string
    key: string
}

interface NavigationMenuProps {
    items: NavigationItem[]
    active: string
    onItemClick: (e: React.MouseEvent<HTMLButtonElement>, href: string, key: string) => void
    className?: string
}

export default function NavigationMenu({ items, active, onItemClick, className = '' }: NavigationMenuProps) {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
    const pathname = usePathname()

    const isHome = pathname === '/'

    return (
        <nav
            className={`font-inter text-sm lg:text-base xl:text-[20px] inline-flex justify-center items-center text-center space-x-1 xl:space-x-4 rounded-[12px] bg-base-default-100 dark:bg-background dark:border p-1.5 h-8 w-[235px] lg:w-[310px] lg:h-[40px] ${className}`}
        >
            {items.map(item => {
                const isActive = active === item.key
                const isHovered = hoveredItem === item.key
                const shouldShowWhite = isHovered || (isActive && hoveredItem === null)

                const buttonClasses = `
                    font-inter font-normal leading-4 flex cursor-pointer select-none items-center justify-center rounded-sm px-3 py-1 text-xs lg:text-base outline-none transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${shouldShowWhite
                        ? "bg-white dark:bg-background text-black dark:text-foreground"
                        : "bg-transparent text-base-default-500 dark:text-muted-foreground"
                    }
                `

                if (!isHome) {
                    return (
                        <Link
                            key={item.key}
                            href={`/${item.href}`}
                            onMouseEnter={() => setHoveredItem(item.key)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={buttonClasses}
                        >
                            {item.label}
                        </Link>
                    )
                }

                return (
                    <button
                        key={item.key}
                        onClick={(e) => onItemClick(e, item.href, item.key)}
                        onMouseEnter={() => setHoveredItem(item.key)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={buttonClasses}
                    >
                        {item.label}
                    </button>
                )
            })}
        </nav>
    )
}