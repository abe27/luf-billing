import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Noto_Sans_Thai } from "@next/font/google";
const fonts = Noto_Sans_Thai({ subsets: ["thai"] });

const MicroApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <section className={fonts.className}>
      <>
        <NextUIProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </NextUIProvider>
      </>
    </section>
  );
};

export default MicroApp;
