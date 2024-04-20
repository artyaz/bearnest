import "./global.css";
import { NavigationBar } from "@/frontend/components/nav-bar";
import Footer from "@/frontend/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="bg-neutral-100">
        <div class="rounded-bl-2xl rounded-br-2xl bg-white p-3">
          <NavigationBar class="bg-white" />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
