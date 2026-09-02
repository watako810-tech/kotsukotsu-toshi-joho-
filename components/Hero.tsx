import { BarChart3, ShieldCheck, LineChart } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, text: "堅実なデータ分析" },
  { icon: LineChart, text: "日米優良株を厳選" },
  { icon: BarChart3, text: "毎日更新のマーケット情報" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* 背景の装飾グラデーション */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(600px circle at 15% 20%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(500px circle at 85% 0%, rgba(16,185,129,0.15), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="animate-fade-up max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            無料で読める株式・投資情報メディア
          </span>
          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            コツコツ投資情報部
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            堅実なデータ分析と日米優良株のコツコツ投資ガイド。
            <br className="hidden sm:block" />
            日々のマーケット動向を初心者にもわかりやすく解説します。
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {POINTS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
              >
                <Icon size={16} className="text-emerald" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
