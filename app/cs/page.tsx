// app/cs/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Cinzel, Noto_Serif_SC } from 'next/font/google';

// 1. 引入星空组件 (请确保路径正确)
import Starfield from '../components/Starfield'; 
// 如果你没有配置 @ 别名，可能需要写成 '../components/Starfield' 或类似的相对路径

const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['700'],
});

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ['latin'], 
  weight: ['500', '700'],
  preload: false, 
});
const SKILLS = [
  { name: "Java", src: "/Java.png" },
  { name: "Python", src: "/Python.png" },
  { name: "C++", src: "/Cpp.png" },
  { name: "JavaScript", src: "/JavaScript.png" },
  { name: "TypeScript", src: "/TypeScript.png" },
  { name: "MySQL", src: "/MySQL.png" },
  { name: "Swift", src: "/Swift.png" },
  { name: "HTML", src: "/HTML5.png" },
  { name: "CSS", src: "/CSS3.png" },
  { name: "React", src: "/React.png" },
  { name: "Next.js", src: "/Next.js.png", bg: true }, // bg: true 代表需要加白色底
  { name: "Node.js", src: "/Node.js.png" },
  { name: "AWS", src: "/AWS.png" },
  { name: "Docker", src: "/Docker.png" },
  { name: "Tailwind CSS", src: "/Tailwind CSS.png" },
];

export default function ComputerSciencePage() {

  return (
    <div className="min-h-screen text-white font-sans selection:bg-green-900 selection:text-white  relative">
      <Starfield />
      {/* Header */}
      <header className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-12 mb-30">
         {/* 2. 点击名字跳转回主页 (Link href="/") */}
         <Link href="/" className="inline-block group cursor-pointer">
            <div className="flex flex-col gap-y-0">
                <h1 className={`${cinzel.className} text-3xl md:text-xl tracking-wider text-white group-hover:text-gray-300 transition-colors`}>
                  Duan Wenbo Alfred
                </h1>
                <p className={`${notoSerifSC.className} pl-4 text-2xl md:text-xl font-medium text-gray-200 tracking-[0.2em] group-hover:text-gray-400 transition-colors`}>
                  段 文博
                </p>
            </div>
         </Link>
      </header>


      {/* Main Grid */}
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-x-12 pb- lg:gap-x-14">
        
        {/* Sidebar (保持不变) */}
        <aside className="w-full h-fit md:sticky md:top-10 flex flex-col gap-y-6 self-start">
           <div className="w-full h-[1px] bg-gray-600 opacity-80"></div>
           {/* Photo Section: 16:9 */}
           <div className="w-full aspect-video bg-[#111] overflow-hidden relative border border-gray-900">
              {/* 这里直接引用 /profile.jpg 
                 Next.js 会自动去 public 文件夹找 profile.jpg
              */}
              <Image 
                src="/profile.jpg" 
                alt="Duan Wenbo Profile"
                fill
                className="object-cover hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 240px"
                priority
              />
           </div>
           <nav className="mt-2">
            {/*
              <h3 className="text-[12pt] uppercase tracking-widest text-gray-600 mb-4 font-bold font-mono">
                 On This Page
              </h3>
              */}
              <ul className="flex flex-col space-y-0 border-l border-gray-800 ml-1">
                 <li><Link href="#education" className="block pl-4 py-2 text-[12pt] text-gray-500 hover:text-[#FFFFFF] hover:border-l hover:border-[#FFFFFF] -ml-[1px] transition-all">Education</Link></li>
                 <li><Link href="#experience" className="block pl-4 py-2 text-[12pt] text-gray-500 hover:text-[#FFFFFF] hover:border-l hover:border-[#FFFFFF] -ml-[1px] transition-all">Experience</Link></li>
                 <li><Link href="#skills" className="block pl-4 py-2 text-[12pt] text-gray-500 hover:text-[#FFFFFF] hover:border-l hover:border-[#FFFFFF] -ml-[1px] transition-all">Skills</Link></li>
              </ul>
           </nav>
        </aside>


        {/* === Right Column: Content === 
            修改重点在此：移除了所有的 grid-cols-[120px_1fr]，改为大板块垂直排列
        */}
        <div className="flex flex-col gap-y-9 pt-1 md:pt-0">
          
          {/* --- Section: Education --- 
              [Source: Figma] 标题单独一行，下方内容左右分布
          */}
          <section id="education" className="border-t border-gray-600 pt-6">
             {/* 标题 */}
             <h2 className="text-xs font-bold text-white  tracking-wider mb-8">Education</h2>
             
             {/* 内容列表 */}
             <div className="space-y-6"> {/* 增加间距，因为没有分割线 */}
                
                {/* Item 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* 左侧: 学校 + 时间 */}
                    <div>
                       <h3 className="text-[16px] font-bold text-white">New York University (NYU)</h3>
                       <p className="text-gray-300 text-xs font-mono  mt-1">2024 - 2026</p>
                    </div>
                    {/* 右侧: 学位 */}
                    <div>
                       <p className=" text-[16px]">Master of Science in Computer Science & Engineering</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                       <h3 className="text-[16px] font-bold text-white">City University of Hong Kong</h3>
                       <p className="text-gray-300 text-xs font-mono  mt-1">2020 - 2024</p>
                    </div>
                    <div>
                       <p className=" text-[16px]">Bachelor of Science in Computer Science</p>
                    </div>
                </div>
             </div>
          </section>


          {/* --- Section: Experience --- */}
          <section id="experience" className="border-t border-gray-600 pt-8">
             <h2 className="text-xs font-bold text-white  tracking-wider mb-8">Experience</h2>
             
             <div className="flex flex-col">
                {/* Divider */}
                
                {/* Job 1: PredictX */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-y-4 gap-x-8">
                   {/* 左侧信息栏：改为垂直排列 */}
                   <div>
                      <h3 className="text-base font-bold text-white">Software Engineer Intern – AI Agent</h3>
                      {/* 这里使用了 flex-col 让三行信息垂直堆叠，gap-y-1 控制行间距 */}
                      <div className="flex flex-col gap-y-1 text-gray-300 text-xs mt-2 font-mono">
                         <span>PredictX (Startup)</span>
                         <span>May 2025 – Sep 2025</span>
                         <span>Hong Kong</span>
                         <div className="flex flex-wrap gap-2 mt-2">
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/50 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               AI Agent
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Backend
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               AWS
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   
                   {/* 右侧：Bullet Points */}
                   <div>
                      <ul className="list-disc pl-5 text-gray-100 text-[15px] leading-6 space-y-2 marker:text-gray-100">
                         <li>
                            Designed and shipped an AI Chat Agent for enterprise customers, owning the AI workflow and backend from prototype to production
                         </li>
                         <li>
                            Built the FastAPI service behind the agent and ran it on Docker and Kubernetes with autoscaling and health checks, keeping p95 latency under 500 ms for more than 10K requests each month 
                         </li>
                         <li>
                            Shaped the RAG and model stack with LangChain, FAISS, LoRA and TensorRT and wired it into GitHub Actions, Prometheus, Grafana and OpenTelemetry
                         </li>
                      </ul>
                   </div>
                   
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-7"></div>

                {/* Job 2: ByteDance */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-y-4 gap-x-8">
                   <div>
                      <h3 className="text-base font-bold text-white">Software Engineer Co-op Project</h3>
                      <div className="flex flex-col gap-y-1 text-gray-300 text-xs mt-2 font-mono">
                         <span>ByteDance</span>
                         <span>Jun 2024 – Aug 2024</span>
                         <span>Beijing</span>
                         <div className="flex flex-wrap gap-2 mt-2">
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/50 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               LLM
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Backend
                            </span>
                         </div>
                      </div>
                   </div>
                   <div>
                      <ul className="list-disc pl-5 text-gray-100 text-[15px] leading-6 space-y-2 marker:text-gray-100">
                         <li>
                            Improved live music and audio for users on weak networks by tuning a multi-threaded C++ and Swift pipeline, cutting end to end streaming delay and making playback feel smoother
                         </li>
                         <li>
                            Added a real time orchestration layer with Kafka, Redis and WebSockets that could fan out live events across services
                         </li>
                         <li>
                            Shipped an AI powered content discovery feature using PyTorch and FAISS so users could reach the tracks they liked faster, which lifted daily active users and reduced navigation time
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-7"></div>

                {/* Job 3: Greenhouse Data */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-y-4 gap-x-8">
                   <div>
                      <h3 className="text-base font-bold text-white">Software Engineer Intern</h3>
                      <div className="flex flex-col gap-y-1 text-gray-300 text-xs mt-2 font-mono">
                         <span>Greenhouse Data (Startup)</span>
                         <span>Feb 2023 – May 2023</span>
                         <span>Hong Kong</span>
                         <div className="flex flex-wrap gap-2 mt-2">
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/50 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Full Stack
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Distributed System
                            </span>
                         </div>
                      </div>
                   </div>
                   <div>
                      <ul className="list-disc pl-5 text-gray-100 text-[15px] leading-6 space-y-2 marker:text-gray-100">
                         <li>
                            Built a distributed web crawler in Node.js using Express, TypeScript and RabbitMQ that could process more than thousands pages per minute, deployed on AWS EC2 with Docker Swarm and Jenkin
                         </li>
                         <li>
                            Designed MongoDB and PostgreSQL schemas for terabyte scale data and tuned indexes and queries so most lookups returned in a few milliseconds and stayed consistent under load
                         </li>
                         <li>
                            Shipped a React dashboard where customers could watch crawler jobs and system health in real time
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-7"></div>

                {/* Job 4: Siemens Mobility */}
               <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-y-4 gap-x-8">
                  <div>
                     <h3 className="text-base font-bold text-white">Software Engineer Intern</h3>
                     <div className="flex flex-col gap-y-1 text-gray-300 text-xs mt-2 font-mono">
                        <span>Siemens</span>
                        <span>Sep 2022 – Jan 2023</span>
                        <span>Hong Kong</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/50 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Full Stack
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               DevOps
                            </span>
                         </div>
                        </div>
                     </div>
                   <div>
                      <ul className="list-disc pl-5 text-gray-100 text-[15px] leading-6 space-y-2 marker:text-gray-100">
                         <li>
                            Exposed REST APIs that let field engineers pull device data on their own instead of filing internal requests
                         </li>
                         <li>
                            Helped set up Jenkins based CI/CD with Docker and Google Test and started to break legacy C++ services into smaller containerized pieces
                         </li>
                         <li>
                            Built a React and FastAPI monitoring dashboard for station control systems so operators could see sensor data from more than twenty IoT nodes on one live screen.
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-7"></div>

                {/* Job 5: Dolby */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-y-4 gap-x-8">
                   <div>
                      <h3 className="text-base font-bold text-white">Software Engineer Intern</h3>
                      <div className="flex flex-col gap-y-1 text-gray-300 text-xs mt-2 font-mono">
                         <span>Dolby</span>
                         <span>Mar 2022 – Aug 2022</span>
                         <span>Beijing</span>
                         <div className="flex flex-wrap gap-2 mt-2">
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/50 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               Frontend
                            </span>
                            <span className="
                               relative overflow-hidden
                               px-1.5 py-1                    /* 稍微加大一点内边距 */
                               text-[8pt] font-mono tracking-widest text-white 
                               rounded-md    
                               bg-white/6
                               border border-white/20 
                               backdrop-blur-md 
                               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] 
                               transition-all duration-300 ease-out 
                               hover:bg-white/30 
                               hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] 
                               hover:scale-105 hover:-translate-y-0.5
                               cursor-default select-none
                            ">
                               QA Test
                            </span>
                         </div>
                      </div>
                   </div>
                   <div>
                      <ul className="list-disc pl-5 text-gray-100 text-[15px] leading-6 space-y-2 marker:text-gray-100">
                         <li>
                            Built responsive React and TypeScript interfaces with modern state management and routing so the apps worked smoothly across desktop and mobile
                         </li>
                         <li>
                            Improved reliability by hardening API clients with retries and timeouts and by adding web-vitals and custom events, so frontend issues were caught before reaching users
                         </li>
                      </ul>
                   </div>
                </div>

             </div>
          </section>


          {/* --- Section: Skills (保持原样，但也加上白色顶部分割线以统一风格) --- */}
          <section id="skills" className="border-t border-gray-600 pt-8">
            <h2 className="text-xs font-bold text-white  tracking-wider mb-8">Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <h4 className=" text-[10px]  tracking-widest mb-4">Backend & Infra</h4>
                  <ul className="text-sm  space-y-2 font-mono">
                  <li>Java, Python, Node.js, C++</li>
                  <li>FastAPI, Package Manager, Spring Boot</li>
                  <li>PostgreSQL, MongoDB, Redis, Elasticsearch</li>
                  <li>Docker, Kubernetes, AWS(···), Jenkins</li>
                  </ul>
               </div>

               <div>
                  <h4 className=" text-[10px]  tracking-widest mb-4">Frontend & Design</h4>
                  <ul className="text-sm  space-y-2 font-mono">
                  <li>TypeScript, React, Next.js</li>
                  <li>Javascript, React Query, Redux Toolkit</li>
                  <li>Tailwind CSS, component systems, Storybook, Jest</li>
                  <li>Figma, interaction design</li>
                  </ul>
               </div>

               <div>
                  <h4 className=" text-[10px]  tracking-widest mb-4">LLM & Agent</h4>
                  <ul className="text-sm  space-y-2 font-mono">
                  <li>PyTorch, HuggingFace, Transformers</li>
                  <li>LangChain, FAISS, RAG pipelines</li>
                  <li>LLM, Agent, API</li>
                  </ul>
               </div>
               {/* 4. Infinite Scroll Icons (右下 - 图标滚动区) */}
               <div className="flex flex-col h-full">
                  
                  <h4 className=" text-[10px]  tracking-widest mb-4">
                     Languages
                  </h4>

                  <div className="flex-grow flex flex-col justify-center min-h-[80px]">
                     
                     {/* 关键修改 1: 在这里加了 'pt-8' (顶部内边距)
                        这是为了给上方弹出的 Tooltip 留出显示空间，否则会被 overflow-hidden 切掉
                     */}
                     <div className="w-full pr-10 pt-8 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20px,_black_calc(100%-40px),transparent_100%)] group cursor-default">
                        
                        {[0, 1].map((index) => (
                           <ul 
                              key={index}
                              className="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" 
                              aria-hidden={index === 1}
                           >
                              {SKILLS.map((skill) => (
                                 <li key={skill.name} className="relative group/item">
                                    
                                    {/* === Tooltip: 极简文字 === 
                                       修改: top 改为 -top-6，配合外层的 pt-8，正好能显示出来
                                    */}
                                    <span className="
                                       absolute -top-6 left-1/2 -translate-x-1/2 
                                       px-2 py-0.5 
                                       text-[9px] font-mono tracking-wider text-black bg-white rounded-sm
                                       opacity-0 group-hover/item:opacity-100 
                                       transition-all duration-200 
                                       pointer-events-none whitespace-nowrap z-10
                                    ">
                                       {skill.name}
                                    </span>
                                    
                                    {/* === Icon === 
                                       关键修改 2: 
                                       - 移除了 'grayscale' (不再黑白)
                                       - 恢复 opacity-80 -> hover:opacity-100
                                    */}
                                    <img 
                                       src={skill.src} 
                                       alt={skill.name} 
                                       className={`
                                          h-8 w-auto 
                                          opacity-80 hover:opacity-100 hover:scale-110
                                          transition-all duration-300 
                                          ${skill.bg ? 'bg-white/10 rounded-full' : ''} 
                                       `} 
                                    />
                                 </li>
                              ))}
                           </ul>
                        ))}

                     </div>
                  </div>
               </div>
            </div>
            </section>



          {/* 1. Section: Bottom Info (Scholarships / Leadership)
            修改重点：移除了外层 <section> 的 border-t。
            改为在内部两个 <div> 上分别加 border-t，实现“一半一半”的断开效果。
          */}
            <section className="pt-8 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* 左侧 Scholarships: 顶部加线 */}
                  <div className="border-t border-gray-600 pt-8">
                     <h2 className="text-xs font-bold text-white  tracking-wider mb-8">Scholarships</h2>
                     <p className="text-gray-100 text-[15px] leading-relaxed space-y-2 marker:text-gray-100">
                         The FANs Awards – Top Outstanding Student Leader Awards, 2022
                     </p>
                  </div>
                  {/* 右侧 Leadership: 顶部加线 */}
                  <div className="border-t border-gray-600 pt-8">
                     <h2 className="text-xs font-bold text-white  tracking-wider mb-8">Leadership</h2>
                     <p className="text-gray-100 text-[15px] leading-relaxed space-y-2 marker:text-gray-100">
                         President - CSSA Undergraduate, CityU, 2021-2022
                     </p>
                  </div>
              </div>
          </section>
        </div>
      </main>
      {/* 👇 [独立板块] 全宽地球视频 (Full Width Earth Footer) */}
      <div className="relative z-10 w-full h-[50vh] min-h-[500px] overflow-hidden mt-0">
      {/* 1. 顶部融合遮罩 */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />

      {/* 2. 视频本体：去掉 mix-blend-screen，保证完全在星空之上 */}
      <video
         autoPlay
         loop
         muted
         playsInline
         className="absolute inset-0 w-full h-full object-cover opacity-900"
         style={{ objectPosition: 'center 10%' }}
      >
         <source src="/earth-loop.mp4" type="video/mp4" />
      </video>

      {/* 3. 底部版权文字 (浮在地球上方) */}
      <div className="absolute bottom-10 w-full text-center z-30 opacity-80 mix-blend-plus-lighter">
         <p className="text-[10px] tracking-[0.3em] font-mono text-gray-300">
            DESIGNED & ENGINEERED BY DUAN WENBO
         </p>
      </div>
   </div>
   </div>

  );
}