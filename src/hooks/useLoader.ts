import { useCallback, useState } from "react";

export const useLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const start = useCallback(() => setIsLoading(true), [setIsLoading]);
    const stop = useCallback(() => setIsLoading(false), [setIsLoading]);

    return {
        isLoading,
        start,
        stop,
    };
};
