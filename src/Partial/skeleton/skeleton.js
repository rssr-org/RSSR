import React, {useEffect} from 'react';
import {skeletonClientProvider} from "./skeletonClientProvider";


export const skeleton = function (TheComponent, fetchFn, cache) {
    const Skeleton = function (props) {
        useEffect(() => {
            // refetch skeleton on client when server fetch skeleton error
            skeletonClientProvider(fetchFn)
        }, []);

        return <TheComponent {...props}/>
    }

    Skeleton.skeleton = fetchFn;
    Skeleton.skeleton.cache = cache;

    return Skeleton;
}
