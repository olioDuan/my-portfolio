// app/page.tsx
import { Cinzel, Marcellus } from 'next/font/google';
import Link from "next/link";

// 1. 字体配置
// Cinzel: 替代 Trajan，用于名字和一级大标题 (罗马风格)
const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-cinzel',
});

// Marcellus: 替代 Optima，用于子标题和正文 (优雅的人文无衬线)
const marcellus = Marcellus({ 
  subsets: ['latin'],
  weight: ['400'], // Marcellus 只有 400，我们通过 CSS 加粗来模拟层级
  variable: '--font-marcellus',
});

export default function Home() {
  return (
    <main className={`relative h-screen w-full overflow-hidden bg-black text-[#F0F0F0] ${marcellus.className}`}>
      
      {/* --- 背景层 --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          // 请确保图片在 public 文件夹下
          style={{ backgroundImage: "url('/bg.jpg')" }} 
        />
      </div>

      {/* --- 左侧内容区 --- */}
      <div className="relative z-10 flex h-full flex-col justify-start pt-32 md:pt-40 pl-10 md:pl-20 lg:pl-28 w-full max-w-[700px]">
        
        {/* --- A. 姓名模块 (Grid 严格对齐) --- 
            使用 grid-cols-[auto_1fr]：左列自适应宽度，右列占据剩余
            gap-x-4: 控制姓与名之间的水平间距
        */}
        <div className="mb-20 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 items-baseline"> 
          
          {/* 1. 英文行 (Trajan/Cinzel 风格) */}
          <h1 className={`col-span-2 flex gap-x-4 text-3xl md:text-3xl font-bold tracking-wide text-white ${cinzel.className}`}>
            {/* 姓 */}
            <span>Duan</span>
            {/* 名 (Alfred 放在后面) */}
            <span>Wenbo alfred</span>
          </h1>

          {/* 2. 中文行 (对齐逻辑) */}
          {/* 姓：段 -> 对应 Duan */}
          <p className="pl-5 text-xl md:text-3xl font-medium text-[#FB0102] tracking-widest text-center">
            段
          </p>
          
          {/* 名：文博 -> 对应 Wenbo */}
          {/* 这里加了一点 pl-1 微调视觉对齐，因为中文字宽和英文不同 */}
          <p className="text-xl md:text-3xl font-medium text-[#FB0102] tracking-widest pl-10">
            文博
          </p>
        </div>

        {/* --- B. 核心导航 --- */}
        <nav className="flex flex-col space-y-12 mb-16">
          
          {/* Group 1: Computer Science */}
          <div className="group">
            {/* 1. 让大标题也能点击跳转 */}
            <Link href="/cs" className={`block text-xl text-white font-bold mb-5 tracking-widest ${cinzel.className} hover:text-gray-100 transition-colors`}>
              Computer Science
            </Link>
            
            {/* 2. 修改子链接：从 /home#... 改为 /cs#... */}
            <div className="flex flex-col space-y-3 pl-1 border-l border-gray-700/30 ml-1">
              <Link href="/cs#education" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                Education
              </Link>
              <Link href="/cs#experience" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                Experience
              </Link>
              {/* 注意：你的 CS 详情页设计里目前是 Skills，建议这里保持一致，或者让 Projects 跳转到 Experience */}
              <Link href="/cs#skills" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                Skills
              </Link>
            </div>
          </div>

          {/* Group 2: Photography */}
          <div className="group">
            <h2 className={`text-xl text-white font-bold mb-5 tracking-widest cursor-default ${cinzel.className}`}>
              Photography
            </h2>
            <div className="flex flex-col space-y-3 pl-1 border-l border-gray-700/30 ml-1">
              <Link href="/nyc" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                New York City
              </Link>
              <Link href="/california" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                California
              </Link>
              <Link href="/mainland" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                Mainland China
              </Link>
              <Link href="/hongkong" className="pl-1 text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
                Hong Kong
              </Link>
            </div>
          </div>

        </nav>

        {/* --- C. 底部功能链接 --- */}
        <div className="flex flex-col space-y-4 mt-2">
          {/* Contact 保持 Optima 风格 */}
          <a 
            href="mailto:alfred.dwb@gmail.com" 
            className="text-xl text-gray-100 hover:text-white transition-colors duration-300 tracking-wide"
          >
            Contact
          </a>
          {/* CV 红色强调 */}
          <a 
            href="/cv.pdf" 
            target="_blank"
            className="text-lg font-bold text-[#FF2400] hover:text-[#FF6666] transition-colors duration-300 tracking-widest w-max"
          >
            CV
          </a>
        </div>

      </div>
    </main>
  );
}