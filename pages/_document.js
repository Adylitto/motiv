import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <meta
          name="description"
          content="Génères ta lettre de Motiv en 2 secondes"
        />
        <meta property="og:site_name" content="https://https://motive-adylitto.vercel.app/" />
        <meta
          property="og:description"
          content="Génères ta lettre de Motiv en 10 secondes chrono!"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
