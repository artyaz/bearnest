import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import "material-icons/iconfont/material-icons.css";

const buttonVariants = {
  black: "bg-zinc-800 text-zinc-100 hover:bg-zinc-600 active:bg-zinc-900 ",
  white:
    "border border-zinc-300 bg-neutral-50 text-zinc-900 hover:border-none hover:bg-zinc-200 active:bg-zinc-900 active:text-zinc-100 ",
  orange:
    "bg-orange-500 text-zinc-100 hover:bg-orange-400 active:bg-orange-600 ",
};

const buttonTypes = {
  rounded: "rounded-full hover:rounded-lg active:rounded-lg ",
  default: "rounded-lg ",
};

export function BButton({
  text,
  icon,
  type = "default",
  additionalStyles,
  variant = "black",
  children,
}) {
  const sharedStyles = "font-e-ukraine font-regular ";

  let buttonClass =
    buttonVariants[variant] +
    buttonTypes[type] +
    sharedStyles +
    additionalStyles;

  if (text && icon) {
    buttonClass += " flex gap-2";
  }

  return (
    <Button className={buttonClass}>
      {icon && <span class="material-icons-round">{icon}</span>}

      {text ? <span>{text}</span> : children || <Fragment />}
    </Button>
  );
}
