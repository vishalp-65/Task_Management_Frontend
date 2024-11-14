import { useEffect, useState } from "react";

type InfiniteScrollOptions = {
    fetchMore: () => void;
    hasMore: boolean;
    scrollableElement: HTMLElement | null;
};

const useInfiniteScroll = ({
    fetchMore,
    hasMore,
    scrollableElement,
}: InfiniteScrollOptions) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isFetching || !hasMore || !scrollableElement) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
            if (scrollHeight - scrollTop <= clientHeight + 200) {
                setIsFetching(true);
                fetchMore();
            }
        };

        scrollableElement?.addEventListener("scroll", handleScroll);
        return () =>
            scrollableElement?.removeEventListener("scroll", handleScroll);
    }, [isFetching, hasMore, fetchMore, scrollableElement]);

    useEffect(() => {
        if (isFetching) setIsFetching(false);
    }, [isFetching]);

    return { isFetching };
};

export default useInfiniteScroll;
