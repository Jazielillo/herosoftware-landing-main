import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-[rgba(212,212,216,0.40)] text-secondary-foreground hover:bg-secondary/80 h-6 px-1 justify-center items-center rounded-lg",
        actionPlan:
          "border-transparent bg-flat-success text-secondary-foreground hover:bg-secondary/80 h-6 px-1 justify-center items-center rounded-lg",
        services:
          "border-transparent bg-[#EFF6FF] text-[#1E40AF] hover:bg-secondary/80 h-6 px-1 justify-center items-center rounded-4xl 2xl:h-[32px]",
        servicesResponsive:
          "border-transparent bg-[#EFF6FF] text-[#1E40AF] hover:bg-secondary/80 h-6 px-1 justify-center items-center rounded-lg",
        projects:
          "flex h-6 min-h-[24px] max-h-[24px] px-1 justify-center items-center rounded-full bg-white/20 border-transparent text-[#1E40AF] hover:bg-secondary/80",
        ourBattles:
          "border-transparent bg-flat-secondary text-secondary-foreground hover:bg-secondary/80 h-6 px-1 justify-center items-center rounded-lg",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
