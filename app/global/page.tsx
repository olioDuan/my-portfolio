import StripeGlobe from '../components/StripeGlobe'; 
// 注意：如果你的路径不是 @/components/...，请改为 ../components/StripeGlobe

export default function GlobePage() {
  return (
    // 1. 最外层：全屏白底，强制居中，禁止滚动
    <main className="h-screen w-screen bg-white overflow-hidden flex items-center justify-center">
      
      {/* 2. 地球容器：核心布局策略
          - aspect-square: 强制正方形
          - w-[80vmin] h-[80vmin]: 宽度和高度都取“屏幕短边”的 80%。
          - min-w-[300px]: 防止在极小屏幕上太小
      */}
      <div className="relative w-[80vmin] h-[80vmin] min-w-[300px] aspect-square flex items-center justify-center">
         <StripeGlobe />
      </div>

    </main>
  );
}