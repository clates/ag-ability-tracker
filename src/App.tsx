import * as React from "react";
import { useEffect } from "react";
import {
  AGDeadLines,
  cannonLineFragments,
  coreLineFragments,
  flurryLineFragments,
  minionLineFragments,
  pillarLineFragments,
} from "./abilityLineMap";
import useChat from "./useChat";

const chatContainsAFragment = (
  chat: string[],
  ...fragments: string[]
): string | undefined => {
  return [...chat].find((line) =>
    fragments.some((abilityLineFrag) => line.includes(abilityLineFrag))
  );
};

const getStyles = (alert) => {
  return { filter: alert ? "grayscale(1) blur(10px)" : "none" };
};

export const App: React.FC = () => {
  const [chat, resetLines] = useChat();

  //If _some_ chat message includes one of the ability line fragments, then return the ability
  const chatContainsFlurryAlert = chatContainsAFragment(
    [...chat],
    ...flurryLineFragments
  );
  const chatContainsCoreAlert = chatContainsAFragment(
    [...chat],
    ...coreLineFragments
  );
  const chatContainsMinionsAlert = chatContainsAFragment(
    [...chat],
    ...minionLineFragments
  );
  const chatContainsPillarsAlert = chatContainsAFragment(
    [...chat],
    ...pillarLineFragments
  );
  const chatContainsCannonAlert = chatContainsAFragment(
    [...chat],
    ...cannonLineFragments
  );

  useEffect(() => {
    //Congrats we've killed AG; reset everything
    if (
      [...chat].some((line) =>
        AGDeadLines.some((agDeadFragment) => line.includes(agDeadFragment))
      )
    ) {
      console.log("AG Completed! Resetting the lines.");
      resetLines();
    }

    //AG Completed a rotation; reset everything and pass the latest timestamp
    if (
      chatContainsCoreAlert &&
      chatContainsMinionsAlert &&
      chatContainsPillarsAlert &&
      chatContainsFlurryAlert &&
      chatContainsCannonAlert
    ) {
      console.log("AG rotation complete. Resetting the lines.");
      resetLines();
    }
  }, [chat]);

  const cannonIsLastAbility =
    chatContainsCoreAlert &&
    chatContainsMinionsAlert &&
    chatContainsPillarsAlert &&
    chatContainsFlurryAlert &&
    !chatContainsCannonAlert;

  console.log("Current Chat:", chat);

  return (
    <div className="text-3xl font-bold underline w-screen h-screen overflow-hidden">
      <div className="container grid grid-cols-5 gap-2 mx-auto">
        <div className="w-full rounded">
          <img
            style={getStyles(chatContainsFlurryAlert)}
            src={require("./assets/flurry.png")}
          ></img>
        </div>
        <div className="w-full rounded">
          <img
            style={getStyles(chatContainsPillarsAlert)}
            src={require("./assets/pillars.png")}
          ></img>
        </div>
        <div className="w-full rounded">
          <img
            style={getStyles(chatContainsCoreAlert)}
            src={require("./assets/core.png")}
          ></img>
        </div>
        <div className="w-full rounded">
          <img
            style={getStyles(chatContainsCannonAlert)}
            className={cannonIsLastAbility ? "animate-pulse" : ""}
            src={require("./assets/cannon.png")}
          ></img>
        </div>
        <div className="w-full rounded">
          <img
            style={getStyles(chatContainsMinionsAlert)}
            src={require("./assets/minions.png")}
          ></img>
        </div>
      </div>
      <div className="my-2 text-center w-full flex flex-row justify-center ">
        <button
          className="nisbutton overflow-hidden"
          onClick={() => resetLines()}
        >
          <span className="px-2">
            Reset
            <br className="hidden min-[240px]:visible" /> the rotation
            <br className="hidden min-[320px]:visible" /> (alt+1)
          </span>
        </button>
      </div>
    </div>
  );
};
