import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BButton } from "./bearnest-button";

export function BNavigationDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button class="flex max-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-black hover:bg-accent">
          <span class="material-icons-round !text-[20px]">menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Furniture</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Living Room</DropdownMenuItem>
                <DropdownMenuItem>Dining Room</DropdownMenuItem>
                <DropdownMenuItem>Bedroom</DropdownMenuItem>
                <DropdownMenuItem>Home Office</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Lightning & Accesories</DropdownMenuItem>
          <DropdownMenuItem>Outdoor</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Log in</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
