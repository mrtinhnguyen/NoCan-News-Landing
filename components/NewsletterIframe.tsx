"use client";

import { useEffect, useRef } from "react";

export default function NewsletterIframe({
  htmlContent,
}: {
  htmlContent: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Hàm điều chỉnh chiều cao theo nội dung bên trong iframe
    const resizeIframe = () => {
      if (iframe.contentWindow) {
        // Thêm một chút dư (+20px) để chặn hoàn toàn thanh cuộn
        iframe.style.height =
          iframe.contentWindow.document.body.scrollHeight + 20 + "px";
      }
    };

    // Chạy khi tải
    iframe.addEventListener("load", resizeIframe);

    // Chạy khi thay đổi kích thước cửa sổ (đáp ứng responsive)
    window.addEventListener("resize", resizeIframe);

    return () => {
      iframe.removeEventListener("load", resizeIframe);
      window.removeEventListener("resize", resizeIframe);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={htmlContent}
      className="w-full border-none block"
      title="Newsletter Content"
      // Thiết lập chiều cao ban đầu (để tránh nhấp nháy khi đang tải, đặt đủ lớn)
      style={{ minHeight: "600px" }}
    />
  );
}
