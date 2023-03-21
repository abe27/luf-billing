import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Noto_Sans_Thai } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
const fonts = Noto_Sans_Thai({ subsets: ["thai"] });

const MicroApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <section className={fonts.className}>
      <SessionProvider session={session}>
        <NextUIProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </NextUIProvider>
      </SessionProvider>
    </section>
  );
};

export default MicroApp;
