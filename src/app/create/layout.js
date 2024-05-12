import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import React from 'react';

export default async function Layout({ children }) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    if(data.user?.app_metadata.userrole != 'root_admin') {
        redirect('/')
      }

  
    return <>{children}</>
}