import "antd/dist/antd.css";
import "../styles/globals.css";

import locale from "antd/lib/locale/th_TH";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }) {
  return (
    // <ConfigProvider locale={locale}>
    <Component {...pageProps} />
    // </ConfigProvider>
  );
}

export default MyApp;
