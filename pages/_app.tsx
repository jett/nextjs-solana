import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, theme, extendTheme } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';

// Use require instead of import, and order matters
require('../styles/globals.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import('../components/WalletConnectionProvider').then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819"
  }
}

const theme = extendTheme({ colors, config });

// function MyApp({ Component, pageProps }: AppProps) {
const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <WalletConnectionProvider>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletConnectionProvider>
    </ChakraProvider>
  )
}

export default App;
