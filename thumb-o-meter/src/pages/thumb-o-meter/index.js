import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar";
import styles from "./index.module.css";
import PtView from "../../components/ptView";
import SkView from "../../components/skView";

import { createStandaloneToast, LightMode } from "@chakra-ui/react";
import useRoleContext from "../../context/roleContext";

import { Flex, Box, Center, useColorModeValue } from "@chakra-ui/react";
// import socketIOClient from "socket.io-client";
import { config } from "../../config";
import useSocketContext from "../../context/socketContext";
const { url } = config;
// const ENDPOINT = url;
// let socket;

const Thumbometer = () => {
  // const [speakerView, setSpeakerView] = useState();

  const [data, setData] = useState({});
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  const bg = useColorModeValue("white", "#110042");
  const color = useColorModeValue("white", "white");
  const context = useSocketContext();
  const socket = context[0];
  console.log(socket);
  async function handleSubmit({ sessionData }) {
    //https://callback-cats.herokuapp.com/session
    console.log(sessionData);
    const res = await fetch(`${url}/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
    });

    //check the status of the data that is returned. If not 200 then its an error!
    //will add a toast pop up here
    if (res.status === 200) {
      //calls the toast function to create a success popup
      successToast({
        name: "Session Submit Success.",
        message: "successfully submitted data from the session.",
      });
      console.log("Success: session data posted");
    } else {
      burntToast({
        name: "Failed Session Submission",
        message: "failed to submit session data to the database.",
      });
    }
  }

  function successToast(successObject) {
    const toast = createStandaloneToast();
    toast({
      title: successObject.name,
      description: successObject.message,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function burntToast(error) {
    const toast = createStandaloneToast();
    toast({
      title: error.name,
      description: error.message,
      status: "error",
      duration: 10000,
      isClosable: true,
    });
    console.log(error);
  }

  const result = useRoleContext();
  const role = result[0];
  const loggedUser = result[2];
  const name = loggedUser?.given_name;
  console.log(role);
  console.log(loggedUser);

  useEffect(() => {
    // socket = socketIOClient(ENDPOINT);
    // socket.emit("connection");
    //join room request - get name, role from auth
    socket.emit("joinroom", {
      name: name, //take from auth
      role: role,
      room: "thumbometer",
    });

    //listen for thumb update, take in session data
    //useEffect - pass down session data obj

    //start thumb session listener - destructures data and timer, sets state
    socket.on("startThumb", ({ sessionData, timer }) => {
      setData(sessionData);
      setTime(timer);
      console.log("start thumb recieved");
    });

    socket.on("thumbUpdate", ({ sessionData }) => {
      setData(sessionData);
      console.log("thumb updated");
    });

    socket.on("counter", (counter) => {
      setCount(counter);
      console.log(counter);
    });

    //finished listener - sets final data state
    socket.on("finished", ({ sessionData }) => {
      setData(sessionData);
      console.log("finished session");
      console.log({ sessionData });
      //call function that posts to session table
      //success or burnt toast
      role === "coach" &&
        name === sessionData.coach &&
        handleSubmit({ sessionData });
      //disable slider here - state
      setCount(0);
    });

    // return () => socket.disconnect();
  }, []);

  //hand this function down to speaker view - pass in q and timer
  function startSession({ question, timer, throwaway }) {
    socket.emit("start", { question, timer, name, throwaway });
    console.log("started session");
  }

  //function to stop the timer and end the session - pass this down to speaker view
  function endSession() {
    socket.emit("stopTimer");
  }
  //pass down & call in ppt view - saves sessionData object
  function submitData(val) {
    socket.emit("submission", { value: val });
  }

  return (
    <Flex>
      <Box className={styles.container} bg={bg} color={color} w="100%">
        <NavBar />
        <Center>
          <h1 className={styles.heading}>Thumb-O-Meter</h1>
        </Center>

        <Center>
          <LightMode>
            {role !== "bootcamper" && (
              <SkView
                data={data}
                startSession={startSession}
                endSession={endSession}
                count={count}
                time={time}
                setTime={setTime}
                bg={bg}
                color={color}
              />
            )}
            {role === "bootcamper" && (
              <PtView
                data={data}
                submit={submitData}
                time={time}
                count={count}
                bg={bg}
                color={color}
              />
            )}
          </LightMode>
        </Center>
      </Box>
    </Flex>
  );
};

export default Thumbometer;
