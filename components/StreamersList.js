import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffectOnce } from "react-use";

import { Avatar, Badge } from "antd";

import { LinkOutlined } from "@ant-design/icons";
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

const StreamersList = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [streamersList, setStreamersList] = useState([]);
  const [listForCheckLive, setListForCheckLive] = useState("");
  const [streamersListLive, setStreamersListLive] = useState([]);

  useEffect(() => {
    checkLive(listForCheckLive);
  }, [listForCheckLive]);

  useEffect(() => {
    setListForCheckLive(
      streamersList
        .map(function (item, index) {
          return "user_login=" + item.twitch_name.toLowerCase();
        })
        .join("&")
    );
  }, [streamersList]);

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //     fetchStreamersData("normal_m");
  //   }, [router.isReady]);

  useEffectOnce(() => {
    fetchStreamersData("normal_m");
  });

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkLive = (list) => {
    axios
      .get("https://rylegolden-api.vercel.app/twitch/checkLive/" + list)
      .then((res) => {
        // console.log(res.data.result.data);
        setStreamersListLive(res.data.result.data);

        res.data.result.data.forEach((item, index) =>
          streamersList.find((o, i) => {
            if (item.user_login === o.twitch_name.toLowerCase()) {
              streamersList[i].type = item.type;
              streamersList[i].thumbnail_url = item.thumbnail_url;
              streamersList[i].title = item.title;
              streamersList[i].game_name = item.game_name;
              streamersList[i].viewer_count = item.viewer_count;

              return true; // stop searching
            }
          })
        );

        streamersList.sort(function (a, b) {
          if (a.type === undefined) return 1;
          if (b.type === undefined) return -1;
          if (a.type === b.type) return 0;
          return a.type < b.type ? -1 : 1;
        });

        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const changeStreamers = (input) => {
    fetchStreamersData(input);
  };
  return (
    <>
      {/* streamers list */}
      <Grid.Container
        justify="center"
        css={{ width: "100%", display: "inline" }}
      >
        <Text
          h1
          size={32}
          css={{
            textGradient: "112deg, $pink600 -25%, $pink700 -10%, $pink800 80%",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          ช่องคนในเมือง
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
        <Spacer y={1} />

        <Grid.Container gap={2} justify="center">
          {loading ? (
            <Loading />
          ) : (
            streamersList.map((item, index) => (
              <>
                <Grid xs={6} lg={4} key={index}>
                  <Card isPressable isHoverable>
                    <Card.Body
                      css={{
                        p: 9,
                        "&:hover": {
                          background: "$gray800",
                          color: "$gray800",
                          transition: "0.6s",
                        },
                      }}
                    >
                      {item.twitch_img ? (
                        <a
                          href={`https://www.twitch.tv/${item.twitch_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.type === "live" ? (
                            <Badge.Ribbon text="LIVE" color="red">
                              <Card.Image
                                src={item.twitch_img}
                                objectFit="cover"
                                width="100%"
                                height={200}
                                css={{ borderRadius: "5px" }}
                                alt={item.twitch_name}
                              />
                            </Badge.Ribbon>
                          ) : (
                            <Card.Image
                              src={item.twitch_img}
                              objectFit="cover"
                              width="100%"
                              height={200}
                              css={{ borderRadius: "5px" }}
                              alt={item.twitch_name}
                            />
                          )}
                        </a>
                      ) : (
                        <a
                          href={`https://www.twitch.tv/${item.twitch_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Badge.Ribbon text="LIVE" color="red">
                            <Card.Image
                              src="https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_960_720.png"
                              objectFit="cover"
                              width="100%"
                              height={200}
                              alt={item.twitch_name}
                            />
                          </Badge.Ribbon>
                        </a>
                      )}
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }} isBlurred>
                      <Grid.Container gap={2} justify="center">
                        <Grid xs={12}>
                          <Row
                            justify="space-between"
                            align="center"
                            css={{ display: "block" }}
                          >
                            <a
                              href={`https://www.twitch.tv/${item.twitch_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text b>{item.twitch_name}</Text>
                            </a>
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
                            </a>
                            <Text b css={{ color: "$red800", fontSize: "$sm" }}>
                              {item.game_name}
                            </Text>
                            <Text
                              css={{
                                color: "$accents8",
                                fontWeight: "$bold",
                                fontSize: "$sm",
                              }}
                            >
                              {item.title}
                            </Text>
                          </Row>
                        </Grid>
                      </Grid.Container>
                    </Card.Footer>
                  </Card>
                </Grid>
              </>
            ))
          )}
        </Grid.Container>
      </Grid.Container>
      {/* end streamers list */}
    </>
  );
};

export default StreamersList;
