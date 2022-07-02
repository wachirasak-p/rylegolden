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
                <>
                  <Grid xs={4} key={index}>
                    <Card isPressable>
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
                            {streamersListLive.find(
                              (o) =>
                                o.user_login === item.twitch_name.toLowerCase()
                            ) ? (
                              <Badge.Ribbon text="LIVE" color="red">
                                <Card.Image
                                  src={item.twitch_img}
                                  objectFit="cover"
                                  width="100%"
                                  height={140}
                                  css={{ borderRadius: "5px" }}
                                  alt={item.twitch_name}
                                />
                              </Badge.Ribbon>
                            ) : (
                              <Card.Image
                                src={item.twitch_img}
                                objectFit="cover"
                                width="100%"
                                height={140}
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
                                height={140}
                                alt={item.twitch_name}
                              />
                            </Badge.Ribbon>
                          </a>
                        )}
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                        <Row wrap="wrap" justify="space-between" align="center">
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
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                </>
              ))
            )}
          </Grid.Container>
        </div>
      </Grid>
      {/* end streamers list */}
    </>
  );
};

export default StreamersList;
