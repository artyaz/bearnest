"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { BButton } from "./bearnest-button";
import { VerticalSpacer } from "./vertical-spacer";
import { BNavigationDropDown } from "./bearnest-dropdown-menu";

const components = [
  {
    title: "Living Room",
    href: "/docs/primitives/alert-dialog",
    description: "Coffee & Side tables, Shelving, Storage, Sofas & Armchairs.",
  },
  {
    title: "Dining Room",
    href: "/docs/primitives/hover-card",
    description:
      "Counter & Bar Stools, Dining Benches, Dining Chairs, Dining Tables",
  },
  {
    title: "Bedroom",
    href: "/docs/primitives/progress",
    description:
      "Dining Tables, Beds, Bedside Tables, Chest of Drawers, Dressing Table",
  },
  {
    title: "Home Office",
    href: "/docs/primitives/scroll-area",
    description: "Desks, Office Chairs",
  },
];

export function NavigationBar() {
  return (
    <NavigationMenu class="w-full">
      <NavigationMenuList className="m-5 laptop:space-x-[2%]">
        <NavigationMenuItem class="hidden laptop:block">
          <Image
            src="/images/bearnest-logo.png"
            alt="Bearnest Logo"
            width={80}
            height={50}
            class="min-w-20"
          />
        </NavigationMenuItem>
        <NavigationMenuItem class="block laptop:hidden">
          <Image
            src="/images/bearnest-logo-mobile.svg"
            alt="Bearnest Logo"
            width={40}
            height={50}
            class="min-w-10"
          />
        </NavigationMenuItem>
        <div class="hidden items-center  laptop:flex laptop:px-[3%]">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Furniture</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="md:w-[500px] md:grid-cols-2 lg:w-[600px] grid w-[400px] gap-3 p-4 ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Lightning & Accesories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Outdoor
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
        <NavigationMenuItem class="w-[100%] laptop:w-[40%]">
          <Input
            type="search"
            placeholder="Search"
            icon="search"
            class="w-[100%]"
          />
        </NavigationMenuItem>
        <NavigationMenuItem class="hidden laptop:block">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Log in
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <VerticalSpacer height="20" />
        <div class="flex space-x-2">
          <div class="laptop:hidden">
            <BNavigationDropDown />
          </div>
          <BButton variant="white" type="rounded" icon="shopping_cart" />
          <BButton variant="white" type="rounded" icon="favorite" />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef((props, ref) => {
  const { className, title, children, ...rest } = props;
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
