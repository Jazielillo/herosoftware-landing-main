import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"


import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        interactive:
          "text-xs font-inter h-[40px] font-light leading-[20px] bg-common-blue-500 text-white rounded-[12px] lg:w-[185px] lg:text-[14px] hover:bg-common-blue-600 dark:bg-common-blue-500 dark:hover:bg-common-blue-600",
        solutions:
          "text-sm w-[350px] h-[40px] font-inter font-light leading-[20px] bg-common-blue-500 text-white rounded-[12px] gap-[8px] hover:bg-common-blue-600 dark:bg-common-blue-500 dark:hover:bg-common-blue-600",
        solutionsResponsive:
          "text-sm w-[350px] h-[40px] font-inter font-normal leading-[20px] bg-background dark:bg-card text-base-primary dark:text-primary border-common-neutral-300 dark:border-border border-[1px] rounded-[8px] gap-[20px] px-[16px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
        outline:
          "text-xs font-inter text-foreground dark:text-foreground font-normal leading-[20px] rounded-[12px] border border-input dark:border-input bg-background dark:bg-background hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline dark:text-primary dark:hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }