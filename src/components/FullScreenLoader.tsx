import { LoaderIcon } from 'lucide-react';
import React from 'react'

interface FullscreenLoaderProps {
    label?: string;
};

export default function FullScreenLoader({ label }: FullscreenLoaderProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {label && <p className="text-sm mt-28 text-muted-foreground">{label}</p>}
        </div>
    )
}
