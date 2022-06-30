import "antd/dist/antd.css";
import "../styles/globals.css";

import locale from "antd/lib/locale/th_TH";
import { ConfigProvider } from "antd";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

function MyApp({ Component, pageProps }) {
  return (
    // <ConfigProvider locale={locale}>
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
        {/* </ConfigProvider> */}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
