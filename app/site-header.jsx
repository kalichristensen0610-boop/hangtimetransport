'use client';

import React, { useEffect, useRef } from 'react';

export default function SiteHeader({children}) {
  const header = useRef(null);

  useEffect(() => {
    const element = header.current;
    const mobile = window.matchMedia('(max-width: 800px)');
    let previous = Math.max(0, window.scrollY);
    function update() {
      const current = Math.max(0, window.scrollY);
      if (!mobile.matches || current <= element.offsetHeight || element.querySelector('.mobile-navigation[open]')) {
        element.removeAttribute('data-scrolled-away');
      } else if (Math.abs(current - previous) < 8) {
        return;
      } else {
        element.toggleAttribute('data-scrolled-away', current > previous);
      }
      previous = current;
    }
    window.addEventListener('scroll', update, {passive:true});
    mobile.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      mobile.removeEventListener('change', update);
    };
  }, []);

  return <header ref={header} className="site-header">{children}</header>;
}
