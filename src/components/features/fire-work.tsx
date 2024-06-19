'use client';

import React, { memo, useEffect } from 'react';
import confetti from 'canvas-confetti';

function FireWork() {
  useEffect(() => {
    const end = Date.now() + 15 * 1000;

    // go Buckeyes!
    const colors = ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'];
    let id: any = null;

    function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        id = requestAnimationFrame(frame);
      }
    }

    frame();

    return () => {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, []);
  return <div />;
}

export default memo(FireWork);
