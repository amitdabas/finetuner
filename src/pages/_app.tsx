import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import MainLayout from '~/components/MainLayout';
import theme from '~/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </>
  );
}
