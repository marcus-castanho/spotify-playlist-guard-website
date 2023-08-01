import React from 'react';
import Link from 'next/link';

export function ErrorFallback() {
    return (
        <div>
            <h2>Oops, there is an error!</h2>
            <Link href="/">Go back to index</Link>
        </div>
    );
}
