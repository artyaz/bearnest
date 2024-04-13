import "./global.css";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/frontend/components/nav-bar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar class="" />
        {children}
      </body>
    </html>
  );
}
