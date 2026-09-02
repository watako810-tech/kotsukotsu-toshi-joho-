"use client";

import { useEffect, useRef } from "react";
import { Megaphone } from "lucide-react";
import { getAdsenseId } from "@/lib/adsense";

interface AdSlotProps {
  slot: string;
  format?: string;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSenseの広告ユニットを表示するための共通配置エリア。
 * NEXT_PUBLIC_ADSENSE_ID が未設定（審査申請前）の間は、記事の見た目を
 * 崩さないプレースホルダー枠を表示する。
 */
export function AdSlot({ slot, format = "auto", className, label = "広告" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = getAdsenseId();

  useEffect(() => {
    if (!clientId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense push failed", err);
    }
  }, [clientId]);

  if (!clientId) {
    return (
      <div
        className={`flex min-h-[100px] flex-col items-center justify-center gap-1 rounded-card border border-dashed border-line bg-slate-50 text-xs text-muted ${className ?? ""}`}
      >
        <Megaphone size={16} className="text-muted/70" />
        {label}枠（AdSense未設定）
      </div>
    );
  }

  return (
    <div className={className}>
      <span className="mb-1 block text-[10px] uppercase tracking-wide text-muted">{label}</span>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
