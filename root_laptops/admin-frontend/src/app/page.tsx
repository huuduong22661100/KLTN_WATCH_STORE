import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  return null; // Return null as redirect will handle the rest
}
