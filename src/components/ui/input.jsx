import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, icon, type, min, max, input_w, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 space-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent",
          className,
        )}
      >
        <span class="material-icons-round mt-[1px] !text-[20px] text-muted-foreground">
          {icon}
        </span>
        <input
          type={type}
          min={min}
          max={max}
          className={cn(
            "placeholder:text-muted-foreground focus-visible:outline-none",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
