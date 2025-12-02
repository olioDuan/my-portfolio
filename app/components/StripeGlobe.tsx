'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export default function StripeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    // 1. 获取 Canvas 的实际显示宽度，确保渲染分辨率匹配
    // 这样可以防止在高分屏或大屏上模糊
    let width = canvasRef.current.offsetWidth;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2, // 内部渲染宽度是显示宽度的2倍，保证清晰
      height: width * 2, // 强制正方形，高度等于宽度
      phi: 0,
      theta: 0,
      dark: 0, // 0 = 亮色模式 (Light Mode)
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      
      // === 配色方案 (白底黑球) ===
      baseColor: [0.3, 0.3, 0.3], // 陆地粒子：深灰色 (在白底上很清晰)
      markerColor: [1, 0, 0],     // 标记点：红色
      glowColor: [0.8, 0.8, 0.8], // 光晕：浅灰色 (白底上显示为柔和阴影)
      opacity: 0.8,               // 稍微透明一点，增加通透感
      
      markers: [
        { location: [40.7128, -74.0060], size: 0.05 }, // NYC
        { location: [22.3193, 114.1694], size: 0.05 }, // HK
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    // 这里的 CSS 只需要填满父容器即可
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-100 transition-opacity duration-1000"
      style={{ 
        width: '100%', 
        height: '100%', 
        contain: 'layout paint size', // 优化性能，防止布局抖动
        cursor: 'grab', 
      }}
    />
  );
}