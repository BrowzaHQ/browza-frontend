import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
});
export default Input;
