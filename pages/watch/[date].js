import React, { useState, useEffect } from "react";
import {
  Timeline,
  Calendar,
  Drawer,
  Breadcrumb,
  PageHeader,
  Layout,
  Col,
  Row,
  notification,
  Card,
  Spin,
  List,
} from "antd";
import { SmileOutlined, LinkOutlined, HomeOutlined } from "@ant-design/icons";

import { Button, Grid, Collapse, Text } from "@nextui-org/react";

import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import moment from "moment";

import Footer from "../../components/Footer";
import SheetCollapse from "../../components/SheetCollapse";

const Date = () => {
  const router = useRouter();
  const { date } = router.query;

  const [visible, setVisible] = useState(false);
  const [file, setFile] = React.useState(1);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [selectedTime, setSelectedTime] = useState("0h0m0s");
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const noti = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topLeft",
      duration: 3,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData(date);
  }, [router.isReady]);

  const changeTime = (time) => {
    const replaced =
      time.substring(0, 2) +
      "h" +
      time.substring(3, 5) +
      "m" +
      time.substring(6, 8) +
      "s";
    setSelectedTime(replaced);
    // console.log(replaced);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setSrc(
      // `https://player.twitch.tv/?video=${data.video_id}&parent=localhost&time=${selectedTime}`
      `https://player.twitch.tv/?video=${data.video_id}&parent=rylegolden.vercel.app&time=${selectedTime}`
    );
  }, [selectedTime]);

  const fetchData = (input) => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/wachirasak-p/fifatargrean-public/main/data/" +
        input +
        ".json"
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setList(result.list);
        setSrc(
          // `https://player.twitch.tv/?video=${result.video_id}&parent=localhost&time=0h0m0s`
          `https://player.twitch.tv/?video=${result.video_id}&parent=rylegolden.vercel.app&time=0h0m0s`
        );
        setLoading(false);
        setVisible(false);
      })
      .catch((error) => {
        noti("error", "ไม่มีข้อมูล", "กำลังอัพเดท..");
        setLoading(false);
        console.error(error);
      });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    Router.push(`/watch/${newValue?.format("YYYY-MM-DD")}`);
    fetchData(newValue?.format("YYYY-MM-DD"));
    // console.log(selectedValue);
  };

  const dcNext = (param) => {
    Router.push(`/watch/${param}`);
    fetchData(param);
    // console.log(selectedValue);
  };

  return (
    <div>
      <Head>
        <title>Ryle Golden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spin size="large" spinning={loading}>
        <Row>
          <Col style={{ padding: "10px" }}>
            <Button
              auto
              color="gradient"
              rounded
              bordered
              icon={<HomeOutlined />}
              onClick={() => Router.push("/")}
            >
              หน้าแรก
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={18}>
            <iframe
              src={src}
              height="700"
              width="100%"
              allowFullScreen
            ></iframe>
            <SheetCollapse />
          </Col>
          <Col xs={24} lg={6}>
            <Card
              className="bg"
              title={moment(data.date).format("วันที่ DD เดือน MM ปี YYYY")}
              extra={
                <a
                  onClick={showDrawer}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  เลือกวันที่{" "}
                  <img
                    width="32"
                    className="margin"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Icons8_flat_calendar.svg/512px-Icons8_flat_calendar.svg.png"
                  ></img>
                </a>
              }
            >
              {/* <Timeline mode="left">
                {list.map((data, index) => (
                  <Timeline.Item
                    key={index}
                    color="green"
                    // label={data.time}
                    onClick={() => changeTime(data.time)}
                    
                  >
                    <Button type="link">
                      {data.content} : {data.time}
                    </Button>
                  </Timeline.Item>
                ))}
              </Timeline> */}
              <div
                style={{
                  height: 600,
                  overflow: "auto",
                  padding: "0 8px",
                }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a
                            onClick={() => changeTime(item.time)}
                            style={
                              item.color
                                ? { color: item.color }
                                : { color: "white" }
                            }
                          >
                            {item.content}
                          </a>
                        }
                        description={
                          <p
                            onClick={() => changeTime(item.time)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.time}
                          </p>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
            {data.dc_next ? (
              <Button
                style={{ marginTop: "10px" }}
                color="gradient"
                auto
                onClick={() => dcNext(data.dc_next)}
              >
                ดูต่อของวันเดียวกัน
              </Button>
            ) : null}
          </Col>
        </Row>

        <Footer />

        <Drawer
          title="เลือกวันที่"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Calendar
            value={value}
            onSelect={onSelect}
            validRange={[moment("2022-04-19"), moment()]}
          />
        </Drawer>
      </Spin>
    </div>
  );
};

export default Date;
