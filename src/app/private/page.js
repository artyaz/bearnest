import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data.user.app_metadata.userrole);
  if (error || !data?.user) {
    redirect('/login')
  }
  if(data.user.app_metadata.userrole == 'root_admin') {
    return <p>Hello {data.user.email}, you are admin!</p>
  }

  return <p>Hello {data.user.email}</p>
}