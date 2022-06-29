import Head from "next/head";

import { Drawer, Calendar, Button } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Router from "next/router";

export default function Home() {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    Router.push(`/watch/${newValue?.format("YYYY-MM-DD")}`);
    // console.log(selectedValue);
  };

  return (
    <div>
      <Head>
        <title>Ryle Golden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calendar
          value={value}
          onSelect={onSelect}
          validRange={[moment("2022/04/19"), moment()]}

          // onPanelChange={onPanelChange}
        />
      </main>
    </div>
  );
}
