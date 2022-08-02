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
  Col,
  Spacer,
  Dropdown,
  Container,
  Tooltip,
} from "@nextui-org/react";

import Footer from "../components/Footer";
import SheetCollapse from "../components/SheetCollapse";
import StreamersList from "../components/StreamersList";

export default function Home() {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [streamersList, setStreamersList] = useState([]);
  const [storyGameList, setStoryGameList] = useState([]);
  const [otherGameList, setOtherGameList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreamersData("normal_m");
    fetchStoryGameData();
    fetchOtherGameData();
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

  const fetchStoryGameData = () => {
    fetch(
      "https://raw.githubusercontent.com/wachirasak-p/fifatargrean-public/main/others/story_games.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setStoryGameList(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOtherGameData = () => {
    fetch(
      "https://raw.githubusercontent.com/wachirasak-p/fifatargrean-public/main/others/other_games.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setOtherGameList(result);
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
          <Grid xs={12} lg={7}>
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
                // validRange={[moment("2022/04/19"), moment()]}
              />

              <SheetCollapse />

              {/* story game */}
              <Spacer y={1} />
              <Text
                h3
                size={32}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                เกมเนื้อเรื่องเข้มๆ
              </Text>
              <Grid.Container gap={2} justify="flex-start">
                {storyGameList.map((item, index) => (
                  <Grid xs={12} sm={4} key={index}>
                    <Card css={{ w: "100%", h: "400px" }}>
                      <Card.Header
                        css={{ position: "absolute", zIndex: 1, top: 5 }}
                      >
                        <Col>
                          <Text
                            size={12}
                            weight="bold"
                            transform="uppercase"
                            color="#ffffffAA"
                          >
                            {item.status}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={item.game_img}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          alt="Card example background"
                        />
                      </Card.Body>
                      <Card.Footer
                        isBlurred
                        css={{
                          position: "absolute",
                          bgBlur: "#ffffff66",
                          borderTop:
                            "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                          bottom: 0,
                          zIndex: 1,
                        }}
                      >
                        <Collapse
                          shadow
                          title={` ${item.game}`}
                          css={{ width: "100%" }}
                        >
                          <div
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {item.list.map((item2, index2) => (
                              <Tooltip content={item2.desc} key={index2}>
                                <Button
                                  css={{ margin: "2px !important" }}
                                  auto
                                  color="primary"
                                  rounded
                                  flat
                                  onClick={() =>
                                    Router.push(`/watch/${item2.date}`)
                                  }
                                >
                                  EP {item2.ep}
                                </Button>
                              </Tooltip>
                            ))}
                          </div>
                        </Collapse>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
              {/* end story game */}

              {/* other game */}
              <Spacer y={1} />
              <Text
                h3
                size={32}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                เกมอื่นๆ / เกมชิลๆ
              </Text>
              <Grid.Container gap={2} justify="flex-start">
                {otherGameList.map((item, index) => (
                  <Grid xs={12} sm={3} key={index}>
                    <Card css={{ w: "100%", h: "400px" }}>
                      <Card.Header
                        css={{ position: "absolute", zIndex: 1, top: 5 }}
                      >
                        <Col>
                          <Text
                            size={12}
                            weight="bold"
                            transform="uppercase"
                            color="#ffffffAA"
                          >
                            {item.status}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={item.game_img}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          alt="Card example background"
                        />
                      </Card.Body>
                      <Card.Footer
                        isBlurred
                        css={{
                          position: "absolute",
                          bgBlur: "#ffffff66",
                          borderTop:
                            "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                          bottom: 0,
                          zIndex: 1,
                        }}
                      >
                        <Collapse
                          shadow
                          title={` ${item.game}`}
                          css={{ width: "100%" }}
                        >
                          <div style={{ display: "inline-block" }}>
                            {item.list.map((item2, index2) => (
                              <Tooltip content={item2.desc} key={index2}>
                                <Button
                                  css={{ margin: "2px !important" }}
                                  auto
                                  color="primary"
                                  rounded
                                  flat
                                  onClick={() =>
                                    Router.push(`/watch/${item2.date}`)
                                  }
                                >
                                  EP {item2.ep}
                                </Button>
                              </Tooltip>
                            ))}
                          </div>
                        </Collapse>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </div>
          </Grid>
          {/* end other game */}

          {/* streamers list */}
          <Grid xs={12} lg={5}>
            <StreamersList />
          </Grid>
          {/* end streamers list */}
        </Grid.Container>
        <Footer />
      </main>
    </div>
  );
}
