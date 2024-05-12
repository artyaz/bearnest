import "./global.css";
import { NavigationBar } from "@/frontend/components/nav-bar";
import { createClient } from '@/utils/supabase/server'
import Footer from "@/frontend/components/footer";

export default async function RootLayout({ children }) {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body class="bg-neutral-100">
        <div class="rounded-bl-2xl rounded-br-2xl bg-white p-3">
          <NavigationBar class="bg-white" user={data}/>
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
