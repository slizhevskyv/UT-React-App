import React, { useCallback, useEffect, useRef, useState } from 'react';

const useTrackElement = (elementRef: React.RefObject<HTMLElement>) => {
	const isElementSeenRef = useRef<boolean>(false);
	const [isElementSeen, setIsElementSeen] = useState(false);

	const intersectionCallback = useCallback(([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		if (entry.isIntersecting && !isElementSeenRef.current) {
			isElementSeenRef.current = true;
			setIsElementSeen(true);
		}
	}, []);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) {
			return;
		}

		new IntersectionObserver(intersectionCallback, {
			rootMargin: `0px 0px -${window.innerHeight}px 0px`,
		}).observe(element);
	}, [elementRef, intersectionCallback]);

	return isElementSeen;
};
export default useTrackElement;
