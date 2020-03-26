import React from 'react';
import {skeletonClientProvider} from "./skeletonClientProvider";
import {debugLog} from "./debugLog";


export const skeleton = function (TheComponent, fetchFn, cache) {
    // cache is disabled
    if (typeof cache !== "number" || cache <= 0) {
        debugLog('INVALID_CACHE_VALUE')
        return true;
    }

    const Skeleton = function (props) {
        // refetch skeleton in client when server fetch skeleton encounters an error
        if (typeof window !== 'undefined')
            skeletonClientProvider(fetchFn)

        return <TheComponent {...props}/>
    }

    Skeleton.skeleton = fetchFn;
    Skeleton.skeleton.cache = cache;

    return Skeleton;
}
