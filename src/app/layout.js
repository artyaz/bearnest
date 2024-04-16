import "./global.css";
import { NavigationBar } from "@/frontend/components/nav-bar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="bg-neutral-100">
        <div class="rounded-bl-2xl rounded-br-2xl bg-white p-3">
          <NavigationBar class="bg-white" />
        </div>
        {children}
      </body>
    </html>
  );
}
