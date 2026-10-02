import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold ring-offset-background transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Turmeric — the one primary action on a screen
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        ink: "bg-ink text-white hover:bg-ink/85",
        outline:
          "border-2 border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background",
        // For use on the indigo bands
        light:
          "border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-ink",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "rounded-none text-madder underline underline-offset-4 hover:text-foreground",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-11 w-11",
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
