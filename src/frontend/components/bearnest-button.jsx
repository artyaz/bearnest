import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import "material-icons/iconfont/material-icons.css";

const buttonVariants = {
  white:
    "border border-gray-200 bg-white hover:bg-accent text-black p-2 min-w-[40px] ",
  black: "border bg-black text-white border-gray-900 min-w-[40px] p-2 ",
  default: "bg-gray-200 text-black border-gray-400 min-w-[40px] ",
};

const buttonType = {
  rounded: "rounded-full ",
  default: "",
};

export function BButton({
  name,
  icon,
  type,
  additionalStyles,
  variant = "default",
  children,
}) {
  let buttonClass = buttonVariants[variant] || buttonVariants.default;
  buttonClass += type && buttonType[type] ? buttonType[type] : "";
  buttonClass += additionalStyles ? additionalStyles : "";

  return (
    <Button className={buttonClass}>
      {icon && <span class="material-icons-round !text-[20px]">{icon}</span>}

      {name ? <span>{name}</span> : children || <Fragment />}
    </Button>
  );
}
