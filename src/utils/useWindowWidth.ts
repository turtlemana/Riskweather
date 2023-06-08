import { useState, useEffect } from 'react';

function useWindowWidth() {
    const isClient = typeof window === 'object';
    const [windowWidth, setWindowWidth] = useState(isClient ? window.innerWidth : 0);
  
    useEffect(() => {
      if (!isClient) return; // SSR일 경우 리턴합니다.
  
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, [isClient]); // isClient의 변경에 따라 훅을 실행합니다.
  
    return windowWidth;
  }

export default useWindowWidth;