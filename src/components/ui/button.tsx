import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "destructive";
};
const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
};
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        styles[variant],
        className
      )}
      {...props}
    />
  );
});
export default Button;
