'use client'

// React Imports
import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

// Component Imports

import LogoTextSVG from './LogoTextSVG'; // Import your new SVG logo component

import IsybuildLogo from './IsybuildLogo';

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav';
import { useSettings } from '@core/hooks/useSettings';

const Logo = ({ color }: { color?: CSSProperties['color'] }) => {
  // Refs
  const logoTextRef = useRef<SVGSVGElement>(null); // Ref for the SVG

  // Hooks
  const { isHovered, transitionDuration, isBreakpointReached } = useVerticalNav();
  const { settings } = useSettings();

  

  // Vars
  const { layout } = settings;
  const finalColor = color === 'var(--mui-palette-common-white)' ? '#56197D' : color;




  useEffect(() => {
    if (layout === 'collapsed' && logoTextRef.current) {
      if (!isBreakpointReached && !isHovered) {
        logoTextRef.current.classList.add('hidden');
      } else {
        logoTextRef.current.classList.remove('hidden');
      }
    }
  }, [isHovered, layout, isBreakpointReached]);

  return (
    <div className='flex items-center' style={{ padding: '0', margin: '0' }}>
      <IsybuildLogo className='text-2xl text-primary' />
      <LogoTextSVG
        ref={logoTextRef}
        color={finalColor}
        isHovered={isHovered}
        isCollapsed={layout === 'collapsed'}
        transitionDuration={transitionDuration}
        isBreakpointReached={isBreakpointReached}
        width="80px" // Adjust width
        style={{ margin: '0 10px' }} // Adjust margin or padding
      />
    </div>
  );
};

export default Logo;
