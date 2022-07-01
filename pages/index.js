import Head from "next/head";

import { Drawer, Calendar } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Router from "next/router";
import {
  Card,
  Grid,
  Row,
  Text,
  Button,
  Loading,
  Collapse,
} from "@nextui-org/react";

import Footer from "../components/Footer";
import SheetCollapse from "../components/SheetCollapse";

export default function Home() {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [streamersList, setStreamersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreamersData("normal_m");
  }, []);

  const fetchStreamersData = (input) => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/wachirasak-p/fifatargrean-public/main/streamers/" +
      input +
      ".json"
    )
      .then((response) => response.json())
      .then((result) => {
        setStreamersList(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const changeStreamers = (input) => {
    fetchStreamersData(input);
  };

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
        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={12} lg={8}>
            <div>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "45deg, $purple400 -5%, $pink600 100%",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
                weight="bold"
              >
                ปฏิทิน Ryle Golden
              </Text>
              <Calendar
                style={{ padding: "10px" }}
                value={value}
                onSelect={onSelect}
                validRange={[moment("2022/04/19"), moment()]}
              />
              <SheetCollapse />
            </div>
          </Grid>

          {/* streamers list */}
          <Grid xs={12} lg={4}>
            <div>
              <Text
                h1
                size={32}
                css={{
                  textGradient: "45deg, $gray600 -20%, $pink600 100%",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                ช่องคนอื่นๆ
              </Text>
              <Grid.Container gap={2} justify="center">
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("normal_m")}
                >
                  ประชาชนชาย
                </Button>
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("normal_f")}
                >
                  ประชาชนหญิง
                </Button>
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("police_m")}
                >
                  ตำรวจชาย
                </Button>
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("police_f")}
                >
                  ตำรวจหญิง
                </Button>
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("doctor_m")}
                >
                  หมอชาย
                </Button>
                <Button
                  auto
                  color="gradient"
                  rounded
                  bordered
                  className="streamer"
                  onClick={() => changeStreamers("doctor_f")}
                >
                  หมอหญิง
                </Button>
              </Grid.Container>
              <Grid.Container gap={2} justify="center">
                {loading ? (
                  <Loading />
                ) : (
                  streamersList.map((item, index) => (
                    <Grid xs={4} key={index}>
                      <Card isPressable>
                        <Card.Body css={{
                          p: 9,
                          '&:hover': {
                            background: '$gray800',
                            color: '$gray800',
                            transition: '0.6s',
                          }
                        }}>
                          {item.twitch_img ? (
                            <a
                              href={`https://www.twitch.tv/${item.twitch_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Card.Image
                                src={item.twitch_img}
                                objectFit="cover"
                                width="100%"
                                height={140}
                                css={{ borderRadius: '5px' }}
                                alt={item.twitch_name}
                              />
                            </a>
                          ) : (
                            <a
                              href={`https://www.twitch.tv/${item.twitch_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Card.Image
                                src="https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_960_720.png"
                                objectFit="cover"
                                width="100%"
                                height={140}
                                alt={item.twitch_name}
                              />
                            </a>
                          )}
                        </Card.Body>
                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                          <Row
                            wrap="wrap"
                            justify="space-between"
                            align="center"
                          >
                            {" "}
                            <a
                              href={`https://www.twitch.tv/${item.twitch_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text b>{item.twitch_name}</Text>
                            </a>{" "}
                            <a
                              href={`https://www.twitch.tv/${item.twitch_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                css={{
                                  color: "$accents8",
                                  fontWeight: "$bold",
                                  fontSize: "$sm",
                                }}
                              >
                                {item.ic_name}
                              </Text>
                            </a>{" "}
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid.Container>
            </div>
          </Grid>
        </Grid.Container>
        <Footer />
      </main>
    </div>
  );
}
