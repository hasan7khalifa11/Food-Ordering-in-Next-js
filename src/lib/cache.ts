/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from "next/cache";
// import { cache as reactCache } from 'react'

type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
    cb: T,
    keyParts: string[],
    options: { revalidate?: number | false; tags?: string[]; }
) {
    return unstable_cache(cb, keyParts, options)
}