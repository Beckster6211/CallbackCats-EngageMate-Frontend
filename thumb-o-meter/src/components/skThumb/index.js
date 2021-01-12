import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { motion } from "framer-motion";
import { animationOne, animationTwo } from "../../animations";
import {
  Button,
  Icon,
  Input,
  Select,
  Switch,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import CustomButton from "../button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdUpdate, MdStop, MdPeople } from "react-icons/md";
import Thumb from "../thumb";
import Timer from "../timer/index";

function SkView({ data, startSession, endSession, count, time, setTime }) {
  const [question, setQuestion] = useState("Set Custom Question");
  const [timer, setTimer] = useState("Custom");
  const [myColor, setMyColor] = useState("#2C276B");
  const [custom, setCustom] = useState(false);
  const [customTime, setCustomTime] = useState(false);
  const [throwaway, setThrowaway] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  console.log({ question });
  function handleSession(e) {
    if (e.target.value !== "custom") {
      setCustom(false);

      setQuestion(e.target.value);
      console.log({ question });
    }
    if (e.target.value === "custom") {
      setCustom(true);
    }
  }

  function handleTimer(e) {
    if (e.target.value !== "custom") {
      setCustomTime(false);
      setTimer(Number(e.target.value));
      setTime(Number(e.target.value));
      console.log({ timer });
    }
    if (e.target.value === "custom") {
      setCustomTime(true);
      console.log(customTime);
    }
    // } else {
    //   let customT = prompt("How many seconds should be allowed?");
    //   setTimer(Number(customT));
    //   setTime(Number(customT));
    //   console.log({ timer });
    // }
    onToggle();
  }

  useEffect(() => {
    if (data.outcome === 0) {
      setMyColor("#2C276B");
    } else if (data.outcome <= 33) {
      setMyColor("red");
    } else if (data.outcome > 33 && data.outcome <= 66) {
      setMyColor("orange");
    } else if (data.outcome > 66 && data.outcome <= 100) {
      setMyColor("green");
    }
  }, [data.outcome]);

  return (
    <motion.div
      className={style.container}
      style={{ backgroundColor: "#2C276B" }}
      initial="out"
      animate="in"
      exit="out"
      variants={animationOne}
      transistion={{ duration: 3 }}
    >
      {/* <h1>The Question Here</h1> */}
      <Select
        placeholder="Select Question"
        onChange={handleSession}
        isDisabled={count > 0 ? true : false}
        className={style.select}
      >
        <option value="How are you feeling?">How are you feeling?</option>
        <option value="Did you understand that?">
          Did you understand that?
        </option>
        <option value="Are you comfortable with moving on?">
          Are you comfortable with moving on?
        </option>
        {/* custom question */}
        <option value="custom">Set a custom question.</option>
      </Select>
      <Input
        focusBorderColor="lime"
        className={style.borderColor}
        style={
          custom
            ? {
                display: "block",
                textAlign: "center",
                borderColor: "grey",
              }
            : { display: "none" }
        }
        placeholder="set custom question..."
        type="text"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Select
        placeholder="Timer Amount"
        className={style.select}
        onChange={handleTimer}
        isDisabled={count > 0 ? true : false}
      >
        <option value="10">10 Seconds</option>
        <option value="15">15 Seconds</option>
        <option value="20">20 Seconds</option>
        <option value="25">25 Seconds</option>
        <option value="30">30 Seconds</option>
        <option value="custom">Set a custom time.</option>
      </Select>
      <Input
        focusBorderColor="lime"
        className={style.borderColor}
        style={
          customTime
            ? {
                display: "block",
                textAlign: "center",
                borderColor: "grey",
              }
            : { display: "none" }
        }
        placeholder="set custom time..."
        type="Number"
        onChange={(e) => setTimer(e.target.value)}
      />
      <div className={style.buttons}>
        <Button
          rightIcon={<MdUpdate />}
          colorScheme="green"
          onClick={() => {
            startSession({ question, timer, throwaway });
          }}
        >
          Start Timer
        </Button>

        <Button
          className={style.button}
          leftIcon={<MdStop />}
          colorScheme="red"
          onClick={endSession}
          isDisabled={count > 0 ? false : true}
        >
          Stop Timer
        </Button>
      </div>
      <p className={style.throwaway}>
        Throwaway:
        <Switch
          isDisabled={count > 0 ? true : false}
          onChange={() => setThrowaway(!throwaway)}
          colorScheme="green"
        />
      </p>
      <Collapse
        in={isOpen}
        animateOpacity
        className={style.valueInformation}
        style={{ backgroundColor: myColor }}
      >
        {" "}
        <Thumb value={data.outcome} />
        <p>
          Value: {data.outcome || "0"}%{" "}
          <span>
            {data.responses || "0"}/{data.participants || "0"}{" "}
            {<Icon as={MdPeople} />}
          </span>
        </p>
        <Timer count={count} time={time} />
        <p className={style.count}>{count}</p>
      </Collapse>{" "}
      <CustomButton
        className={style.backButton}
        link="/"
        icon={<ArrowBackIcon />}
        text={"Back"}
      />
    </motion.div>
  );
}

export default SkView;