import { Drawer, Calendar } from "antd";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dayjs from "dayjs";
import moment from "moment";

const CalendarDrawer = () => {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    Router.push(`/watch/${newValue?.format("YYYY-MM-DD")}`);
    // console.log(selectedValue);
  };

  //   const onPanelChange = (newValue) => {
  //     setValue(newValue);
  //   };

  return (
    <div>
      <Calendar
        value={value}
        onSelect={onSelect}
        // onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalendarDrawer;
