import React, { useEffect, useRef } from 'react';

interface TrailDot {
    el: HTMLDivElement;
    x: number;
    y: number;
}

const TRAIL_COUNT = 8;

const CursorTrail: React.FC = () => {
    const trailRef = useRef<TrailDot[]>([]);
    const mouseRef = useRef({ x: -200, y: -200 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Hide on touch devices
        if ('ontouchstart' in window) return;

        // Build trail dots
        const dots: TrailDot[] = Array.from({ length: TRAIL_COUNT }, (_, i) => {
            const el = document.createElement('div');
            el.className = 'cursor-trail-dot';
            el.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 99999;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                will-change: transform, opacity;
                transition: opacity 0.1s;
            `;
            const size = Math.max(4, 12 - i * 1.1);
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.background = `rgba(0,255,238,${0.9 - i * 0.1})`;
            el.style.boxShadow = i === 0 ? '0 0 8px rgba(0,255,238,0.9)' : 'none';
            document.body.appendChild(el);
            return { el, x: -200, y: -200 };
        });
        trailRef.current = dots;

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            let px = mouseRef.current.x;
            let py = mouseRef.current.y;

            dots.forEach((dot, i) => {
                dot.x += (px - dot.x) * (0.35 - i * 0.025);
                dot.y += (py - dot.y) * (0.35 - i * 0.025);
                dot.el.style.left = `${dot.x}px`;
                dot.el.style.top = `${dot.y}px`;
                px = dot.x;
                py = dot.y;
            });

            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafRef.current);
            dots.forEach(d => d.el.remove());
        };
    }, []);

    return null;
};

export default CursorTrail;
