import { ThreeItemGrid } from '@/components/ThreeItemGrid';
import { Suspense } from 'react';
import { GridSekeleton } from './loading';

export default async function Home() {
  return (
    <main>
      <ThreeItemGrid />
    </main>
  );
}
