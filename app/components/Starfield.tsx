// app/components/Starfield.tsx
'use client';

import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  pulseOffset: number;
  pulseSpeed: number;
  // 新增属性：是否有星芒
  hasSpikes: boolean;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ==========================================
    // 👇 [星芒参数]
    // ==========================================
    
    const starCount = 250; 
    const speed = 0.5;
    const sizeMin = 2; 
    const sizeMax = 5.5;

    // 星芒出现的概率 (0.15 = 15% 的星星会有星芒)
    const spikeProbability = 0.2; 
    
    // 星芒的长度系数 (相对于星星本体大小的倍数)
    // 倍数越大，十字芒越长
    const spikeLengthScale = 3.0; 

    // ==========================================

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    const depth = 2200;
    const fov = 400;
    const stars: Star[] = [];

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * depth,
        baseSize: Math.random() * (sizeMax - sizeMin) + sizeMin,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.03,
        // 随机决定这颗星是否拥有星芒特质
        hasSpikes: Math.random() < spikeProbability,
      });
    }

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      
      ctx.fillStyle = "black"; 
      ctx.fillRect(0, 0, width, height);
      
      // 使用 screen 混合模式，让光芒叠加更自然
      ctx.globalCompositeOperation = 'screen'; 

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = depth;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const scale = fov / star.z;
        const x2d = star.x * scale + cx;
        const y2d = star.y * scale + cy;

        if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
          const scaleFactor = (1 - star.z / depth);
          const size = star.baseSize * (scaleFactor * 3); 
          
          // 呼吸计算
          const breathe = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(frameCount * star.pulseSpeed + star.pulseOffset));
          const alpha = scaleFactor * breathe;

          // 1. 绘制球体 (保持之前的逻辑)
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          gradient.addColorStop(0.2, `rgba(255, 255, 255, ${alpha * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.15})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();

          // 2. 绘制星芒 (Diffraction Spikes)
          // 条件：这颗星有星芒属性 && 当前亮度足够高 (alpha > 0.5) && 距离足够近
          if (star.hasSpikes && alpha > 0.5) {
            // 星芒的透明度要比核心低，且随呼吸波动
            // (alpha - 0.5) * 2 意思是：亮度超过0.5的部分才开始算星芒亮度，让它闪烁感更强
            const spikeAlpha = (alpha - 0.5) * 0.8; 
            const spikeLen = size * spikeLengthScale; // 星芒长度
            const spikeWidth = size * 0.2; // 星芒极细，只有核心的 15%

            // 保存画布状态，防止旋转/缩放影响其他星星
            ctx.save();
            ctx.translate(x2d, y2d);
            
            // 为了更自然，可以稍微旋转 45度，或者保持水平垂直
            // ctx.rotate(Math.PI / 4); // 如果想变成 X 形，取消这行注释

            // --- 绘制横向光束 ---
            const gradH = ctx.createLinearGradient(-spikeLen, 0, spikeLen, 0);
            gradH.addColorStop(0, `rgba(255, 255, 255, 0)`); // 端点透明
            gradH.addColorStop(0.5, `rgba(255, 255, 255, ${spikeAlpha})`); // 中心最亮
            gradH.addColorStop(1, `rgba(255, 255, 255, 0)`); // 端点透明
            
            ctx.fillStyle = gradH;
            ctx.fillRect(-spikeLen, -spikeWidth / 2, spikeLen * 2, spikeWidth);

            // --- 绘制纵向光束 ---
            const gradV = ctx.createLinearGradient(0, -spikeLen, 0, spikeLen);
            gradV.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradV.addColorStop(0.5, `rgba(255, 255, 255, ${spikeAlpha})`);
            gradV.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.fillStyle = gradV;
            ctx.fillRect(-spikeWidth / 2, -spikeLen, spikeWidth, spikeLen * 2);

            ctx.restore();
          }
        }
      });
      
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'black' }}
    />
  );
}