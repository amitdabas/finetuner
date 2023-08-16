import Head from 'next/head';

import App from '~/components/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Compare models</title>
        <meta
          name='description'
          content='The most comprehensive job search assistant in the world'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <App />
      </main>
    </>
  );
}
