import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const dark = "#141826";
  const light = "#fafafa";
  return (
    <Html lang="es">
      <Head>
        <>
          <link rel="manifest" href="/manifest.json" />
          <script src="https://cdn.tailwindcss.com" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css"
          />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <link rel="preconnect" href="https://wsrv.nl/" />
          <link rel="preconnect" href="https://icons.llampukaq.com/" />
          <link rel="preconnect" href="https://cdn.tailwindcss.com" />
          <meta
            media="(prefers-color-schema: light)"
            name="theme-color"
            content={light}
          />
          <meta
            media="(prefers-color-schema: dark)"
            name="background-color"
            content={dark}
          />
          <meta
            media="(prefers-color-schema: dark)"
            name="theme-color"
            content={dark}
          />
          <meta
            media="(prefers-color-schema: light)"
            name="background-color"
            content={light}
          />
          <link rel="shortcut icon" href="/icons/logo16.webp" />
          <title>ISMAC</title>
          <meta name="title" content="ISMAC" />
        </>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Descubre el poder de la gestión empresarial con Llampukaq Technoly, la solución integral para potenciar tu empresa. Maximiza la eficiencia, optimiza procesos, y toma decisiones informadas con nuestra plataforma líder en el mercado. Gestiona recursos, finanzas y proyectos de manera efectiva, impulsando el crecimiento y la rentabilidad de tu negocio. Confía en Llampukaq Technoly para llevar tu empresa hacia el éxito."
        />

        <link rel="apple-touch-icon" href="/icons/logo512.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/logo152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/logo180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/logo167.png"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link
          href="/apple/apple_splash_2048.png"
          sizes="2048x2732"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1668.png"
          sizes="1668x2224"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1536.png"
          sizes="1536x2048"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1125.png"
          sizes="1125x2436"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1242.png"
          sizes="1242x2208"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_750.png"
          sizes="750x1334"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_640.png"
          sizes="640x1136"
          rel="apple-touch-startup-image"
        />
      </Head>
      <body className="antialiased bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
