'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData) {
  const supabase = createClient();

  // In JavaScript, you must trust that formData has the correct properties.
  // It would be prudent to add runtime validation or checks here.
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (typeof email !== 'string' || typeof password !== 'string') {
    // Handle cases where email or password are not strings
    redirect('/error');
    return;  // It's important to return here to stop execution
  }

  const data = { email, password };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
    return;  // Stop further execution if there is an error
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData) {
  const supabase = createClient();

  // As in login, ensure validation or checks
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    redirect('/error');
    return;  // Stop execution if validation fails
  }

  const data = { email, password };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
    return;  // Stop further execution if there is an error
  }

  revalidatePath('/', 'layout');
  redirect('/');
}