import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <h5 className="white">
            Content by{" "}
            <a
              href="https://www.twitch.tv/fifatargrean"
              target="_blank"
              rel="noopener noreferrer"
            >
              FifaTargrean
              <LinkOutlined />
            </a>
          </h5>
          <h5 className="white">
            Arrange by{" "}
            <a
              href="https://bit.ly/3uaZcgx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kartana9
              <LinkOutlined />
            </a>
          </h5>
          <h5 className="white">
            Website by{" "}
            <a
              href="https://github.com/wachirasak-p"
              target="_blank"
              rel="noopener noreferrer"
            >
              ThomasShelby416
              <LinkOutlined />{" "}
            </a>
            &{" "}
            <a
              href="https://github.com/Yelleyy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yelleyy
              <LinkOutlined />{" "}
            </a>
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
