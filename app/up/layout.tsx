import Script from "next/script";

export default function UpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
        src="https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/libs/ocu-external.js"
        strategy="afterInteractive"
      />

      <Script id="ocu-external-init" strategy="afterInteractive">
        {`new OcuExternal();`}
      </Script>

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

      {children}
    </>
  );
}
