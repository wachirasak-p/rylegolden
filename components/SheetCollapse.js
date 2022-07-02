import React, { useState, useEffect } from "react";
import { Collapse } from "@nextui-org/react";

const SheetCollapse = () => {
  return (
    <>
      <Collapse
        shadow
        title="เปิดสารบัญ"
        css={{ marginTop: "10px", background: "$gray300" }}
      >
        <iframe
          width="100%"
          height="700"
          src="https://docs.google.com/spreadsheets/d/1XJwvbPFhtMgyhE7Y0MhUnCpYJFynLUxdM0x_Cedtjs4/edit#gid=511480813"
        ></iframe>
      </Collapse>
    </>
  );
};

export default SheetCollapse;
