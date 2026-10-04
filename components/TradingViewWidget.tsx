"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** ウィジェットの種類（例: "mini-symbol-overview", "market-quotes"） */
  widget: string;
  /** TradingViewの埋め込みコードに渡す設定 */
  config: Record<string, unknown>;
  /** 表示エリアの高さ（px） */
  height: number;
  className?: string;
}

/**
 * TradingViewの無料ウィジェットを埋め込む共通部品。
 *
 * 株価データ自体はTradingViewのサーバーから直接表示されるため、このサイトが
 * 株価データを保存・再配布する形にはならない。無料ウィジェットの利用条件として、
 * TradingViewへのリンク（クレジット表記）を必ず表示する。
 */
export function TradingViewWidget({ widget, config, height, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const configJson = JSON.stringify(config);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 二重に読み込まれないよう、毎回中身を作り直してからスクリプトを差し込む
    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widget}.js`;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = configJson;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [widget, configJson]);

  return (
    <div className={className}>
      <div ref={containerRef} className="tradingview-widget-container" style={{ height }} />
      <p className="mt-1 text-right text-[11px] text-muted">
        データ提供:{" "}
        <a
          href="https://jp.tradingview.com/"
          target="_blank"
          rel="noopener nofollow"
          className="font-medium text-emerald-dark hover:underline"
        >
          TradingView
        </a>
      </p>
    </div>
  );
}
