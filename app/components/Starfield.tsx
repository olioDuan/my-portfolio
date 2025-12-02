'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// ===== 可调参数区域 =====
const STAR_COUNT = 1000;        // 星星数量：越大越密，1000–2000 比较合适
const STAR_SIZE = 0.10;         // 星星大小：就是 vertex shader 里的 offset，0.05 更小，0.15 更大
const STAR_SPEED = 0.02;        // 星星速度：u_time 每帧增加多少，0.01 慢，0.05 很快

// 颜色：在 color1 和 color2 之间随机插值
const COLOR_1 = 0x3068ff;       // 起始颜色（蓝）
const COLOR_2 = 0xf34f94;       // 结束颜色（粉）
const COLOR_3 = 0xfffff0;       // 恒星黄

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. 场景 & 相机
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 2. 渲染器绑定到 canvas
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true, // 允许透明，方便叠加在页面内容背后
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 3. 粒子几何：完全照 three.lizi.js 的思路
    const fieldRadius = 20;   // xy 平面范围：可以理解为星空“宽度”
    const fieldZLength = 40;  // z 方向范围：可以理解为星空“深度”

    const positions: number[] = [];
    const corners: number[] = [];
    const uvs: number[] = [];
    const colorMix: number[] = [];
    const indices: number[] = [];

    const geo = new THREE.BufferGeometry();

    // 星星数量由 STAR_COUNT 控制
    for (let i = 0; i < STAR_COUNT; i++) {
      // 随机中心坐标
      const x = THREE.MathUtils.mapLinear(
        Math.random(),
        0,
        1,
        -fieldRadius,
        fieldRadius
      );
      const y = THREE.MathUtils.mapLinear(
        Math.random(),
        0,
        1,
        -fieldRadius,
        fieldRadius
      );
      const z = THREE.MathUtils.mapLinear(
        Math.random(),
        0,
        1,
        -fieldZLength / 2,
        fieldZLength / 2
      );

      // colorMix 决定在 color1 / color2 之间的插值比例
      const mixVal = Math.random();

      // 一颗星用 4 个顶点，方便在 vertex shader 里扩成一个小矩形
      for (let j = 0; j < 4; j++) {
        positions.push(x, y, z);
        corners.push(j);       // 0 / 1 / 2 / 3
        colorMix.push(mixVal);
      }

      // uv：左下、右下、左上、右上
      uvs.push(0, 1);
      uvs.push(1, 1);
      uvs.push(0, 0);
      uvs.push(1, 0);

      const baseIndex = 4 * i;
      // 两个三角形拼一个矩形
      indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
      indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
    }

    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geo.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(uvs), 2)
    );
    geo.setAttribute(
      'corner',
      new THREE.BufferAttribute(new Float32Array(corners), 1)
    );
    geo.setAttribute(
      'colorMix',
      new THREE.BufferAttribute(new Float32Array(colorMix), 1)
    );
    geo.setIndex(indices);
    geo.computeBoundingSphere();

    // 顶点着色器：控制星星位置 / 大小 / 颜色
    const vertexShader = `
      attribute float corner;
      attribute float colorMix;
      uniform float u_time;
      varying vec2 vUv;
      varying vec3 vColor;
      uniform float zMin;
      uniform float zMax;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;  // 新增
      uniform float u_size; // 控制星星大小

      void main() {
        vUv = uv;
        vec3 pos = position;

        // 沿 z 轴前进
        pos.z += u_time;
        // 超出范围后循环
        pos.z = mod(pos.z, zMax) + zMin;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vec4 viewPosition = viewMatrix * worldPos;

        // offset 决定点扩成的矩形大小 -> 星星大小
        float offset = u_size;

        if (corner == 0.0) {
          viewPosition.xy += vec2(-offset, -offset);
        }
        if (corner == 1.0) {
          viewPosition.xy += vec2(offset, -offset);
        }
        if (corner == 2.0) {
          viewPosition.xy += vec2(-offset, offset);
        }
        if (corner == 3.0) {
          viewPosition.xy += vec2(offset, offset);
        }

        // 三段渐变：0–0.5 在 蓝 -> 黄，0.5–1 在 黄 -> 粉
        if (colorMix < 0.5) {
          float t = colorMix / 0.5;
          vColor = mix(color1, color2, t);
        } else {
          float t = (colorMix - 0.5) / 0.5;
          vColor = mix(color3, color2, t);
        }

        gl_Position = projectionMatrix * viewPosition;
      }
    `;

    // 片元着色器：用贴图控制形状和亮度
    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vColor;
      uniform sampler2D u_texture;

      void main() {
        // 灰度贴图：r 通道用来当 alpha / 高光
        vec4 texel = texture2D(u_texture, vUv);

        float alpha = texel.r;
        vec3 color = mix(vColor, vec3(1.0), texel.r);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const textureLoader = new THREE.TextureLoader();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: {
          value: textureLoader.load('/particle-sprite.png'),
        },
        color1: { value: new THREE.Color(COLOR_1) }, // 修改这里可以换主色
        color2: { value: new THREE.Color(COLOR_2) }, // 修改这里可以换副色
        color3: { value: new THREE.Color(COLOR_3) },
        zMin: { value: -fieldZLength / 2 },
        zMax: { value: fieldZLength },
        u_time: { value: 0 },
        u_size: { value: STAR_SIZE },               // 星星大小的统一入口
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // 动画循环：通过 STAR_SPEED 控制速度
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      (material.uniforms.u_time.value as number) += STAR_SPEED;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      geo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // canvas 固定在最底层作为全局背景
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ backgroundColor: 'black' }}
    />
  );
}
