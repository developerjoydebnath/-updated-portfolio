import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { scrollY } = useScroll();
  const [pageHeight, setPageHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Physics configuration for the smooth scroll
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 150,
    mass: 0.5,
    restDelta: 0.001
  });

  // Transform the scroll value to negative translateY
  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setPageHeight(contentRef.current.scrollHeight);
      }
    };

    // Initial measurement
    handleResize();

    // Observe changes in content size
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  return (
    <>
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} />
    </>
  );
}
