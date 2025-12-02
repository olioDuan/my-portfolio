import type { Config } from "tailwindcss";

const config: Config = {
  // 这里告诉 Tailwind 去哪里扫描你的代码以生成样式
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. 自定义动画关键帧
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      // 2. 注册动画工具类
      animation: {
        // 25s 代表滚动一圈的时间，linear 代表匀速
        'infinite-scroll': 'infinite-scroll 25s linear infinite', 
      },
      // 这里的 colors 是 Next.js 默认自带的，保留着以防万一你用了它们
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;