// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Send "Home" to Status by default
  redirect('/status');
}