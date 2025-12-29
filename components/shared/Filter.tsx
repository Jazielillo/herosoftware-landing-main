'use client'

import React from 'react'

interface Filter {
    label: string
    key: string
}

interface FiltersProps {
    filters: Filter[]
    activeFilter: string
    onFilterChange: (filterKey: string) => void
}

export default function Filters({ filters, activeFilter, onFilterChange }: FiltersProps) {
    return (
        <div className="font-geist w-[342px] text-sm flex items-center text-center space-x-1 rounded-[12px] bg-base-default-100 dark:bg-muted p-1.5">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.key)}
                    className={`font-geist font-medium leading-4 text-center flex cursor-pointer select-none items-center rounded-sm px-1.5 py-1 outline-none transition-colors ${activeFilter === filter.key
                        ? 'bg-white dark:bg-background text-black dark:text-foreground shadow dark:shadow-md'
                        : 'bg-transparent text-foreground dark:text-muted-foreground hover:bg-white/50 dark:hover:bg-accent/50'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}