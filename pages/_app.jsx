import "@/styles/globals.css";
import "sweetalert2/src/sweetalert2.scss";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Noto_Sans_Thai } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { Worker } from "@react-pdf-viewer/core";
const fonts = Noto_Sans_Thai({ subsets: ["thai"] });

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: "#22A7F0",
      secondary: "#8E44AD",
      error: "#F9690E",
      warning: "#E08A1E",
      success: "#2ABB9B",
    },
  },
});

const MicroApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <section className={fonts.className}>
        <SessionProvider session={session}>
          <NextUIProvider theme={theme}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </NextUIProvider>
        </SessionProvider>
      </section>
    </Worker>
  );
};

export default MicroApp;
