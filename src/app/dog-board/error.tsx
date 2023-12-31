'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl">Something went wrong! 🥲</h2>
      <div className="my-6 flex gap-12">
        <button type="reset" onClick={() => reset()}>
          Try again
        </button>
        <Link href={'/'}>Go back home </Link>
      </div>
    </div>
  );
}
