import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ClientInit } from "./client-init";

export const metadata: Metadata = {
  title: "Descubra Sua Alma Gêmea | Visualização Energética com Seraphina",
  description: "Seraphina revela as características da sua alma gêmea através de leitura energética e visualização espiritual. Descubra quem está destinado a você.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
    themeColor: "#1a0a2e",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            const pixelIds = [];

            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

            pixelIds.forEach((id, index) => {
              const pixelName = \`pixel\${index + 1}\`;
              fbq('init', id, {}, pixelName);
              fbq('track', 'PageView', {}, pixelName);
            });
          `}
        </Script>

        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          data-utmify-ignore-iframe
          data-utmify-is-cartpanda
          async
          defer
        />

        <Script
          type="text/javascript"
          src="https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/cpsales.js"
        />

        <style>
          {`
            #cpd-undefined,
            #cpd-NaN {
              visibility: hidden;
              pointer-events: none;
              width: 0px !important;
              height: 0px !important;
            }
          `}
        </style>
      </head>
      <body>
        <Providers>
          <ClientInit />
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
