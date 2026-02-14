// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-35e05c01476be2703c343547bbe16726');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/35e05c01476be2703c343547bbe16726/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/03/07/0c/03070c91243443f25d9bbd40e3170842.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="fd12ad0946db36cd36365fe80c816e41"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/fd/12/ad/fd12ad0946db36cd36365fe80c816e41.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}