import dynamic from "next/dynamic";
import "./globals.css";
import { MiniKitProvider } from "@/components/MiniKitProvider";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"] });
import "@smastrom/react-rating/style.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );    

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital@0;1&family=Rubik:ital,wght@0,300..900;1,300..900&family=Sora:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={sora.className}>
        <ErudaProvider>
          <MiniKitProvider>{children}</MiniKitProvider>
        </ErudaProvider>
      </body>
    </html>
  );
}
