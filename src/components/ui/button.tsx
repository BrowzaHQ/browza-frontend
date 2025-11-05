// src/components/ui/button.tsx

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "default" | "lg" | "icon";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

// Define ALL variants so styles[variant] is type-safe
const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost:
    "bg-transparent hover:bg-accent hover:text-accent-foreground",
  destructive:
    "bg-red-600 text-white hover:bg-red-700",
};

// Optional sizes so size prop actually affects styling
const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2 text-sm",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        // base button styles
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
