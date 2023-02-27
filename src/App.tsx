import * as React from "react";
import { useEffect, useState } from "react";
import {
  AGDeadLines,
  bossStartLine,
  cannonLineFragments,
  coreLineFragments,
  flurryLineFragments,
  minionLineFragments,
  pillarLineFragments,
} from "./abilityLineMap";
import useChat from "./useChat";
import * as a1lib from "@alt1/base";
import useImageFinder from "./useImageFinder";

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
  const [hasHoaryChill, chillOut] = useImageFinder();
  const [inBossEncounter, setInBossEncounter] = useState(false);
  const [inPostKill, setInPostKill] = useState(false);

  const resetRotation = () => {
    resetLines();
    chillOut();
  };

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
    //One time linking to the alt-1 press
    a1lib.on("alt1pressed", () => {
      resetRotation();
    });
  }, []);

  useEffect(() => {
    //
    if ([...chat].some((line) => line.includes(bossStartLine))) {
      setInBossEncounter(true);
    }

    //Congrats we've killed AG; reset everything
    if (
      [...chat].some((line) =>
        AGDeadLines.some((agDeadFragment) => line.includes(agDeadFragment))
      )
    ) {
      console.log("AG Completed! Resetting the lines.");
      resetRotation();
      setInBossEncounter(false);
      setInPostKill(true);
      setTimeout(() => {
        setInPostKill(false);
      }, 7000);
    }

    //AG Completed a rotation; reset everything and pass the latest timestamp
    if (
      (chatContainsCoreAlert || hasHoaryChill) &&
      chatContainsMinionsAlert &&
      chatContainsPillarsAlert &&
      chatContainsFlurryAlert &&
      chatContainsCannonAlert
    ) {
      console.log("AG rotation complete. Resetting the lines.");
      resetRotation();
    }
  }, [chat]);

  // console.debug("Current Chat:", chat);

  //Handle the double cannon warning
  const cannonIsLastAbility =
    (chatContainsCoreAlert || hasHoaryChill) &&
    chatContainsMinionsAlert &&
    chatContainsPillarsAlert &&
    chatContainsFlurryAlert &&
    !chatContainsCannonAlert;
  useEffect(() => {
    if (cannonIsLastAbility && alt1.permissionOverlay) {
      alt1.setTooltip("Double Cannon Warning!");
    }
    alt1.clearTooltip();
  }, [cannonIsLastAbility]);

  const rewards = [
    require("./assets/frozenCoreOfLeng.png"),
    require("./assets/darkNilas.png"),
    require("./assets/glacorCore.png"),
    require("./assets/lengArtefact.png"),
  ];

  console.log("inBossEncounter:", inBossEncounter);

  return (
    <>
      <div
        className={`text-white text-xs min-[240px]:text-sm fixed w-screen h-screen flex justify-center items-center bg-gray-900 transition-opacity duration-700 flex space-x-0.5 z-20 p-3  ${
          inPostKill ? "opacity-90" : "opacity-0"
        }`}
      >
        <span>Great kill!</span>
        <img
          className="h-4/5 ml-3"
          src={rewards[Math.floor(Math.random() * rewards.length)]}
        />
      </div>

      <div
        className={`text-white text-xs min-[240px]:text-sm fixed w-screen h-screen flex justify-center items-center bg-gray-900 duration-1000 flex space-x-0.5 z-10 p-3 ${
          inBossEncounter || inPostKill ? "opacity-0" : "opacity-90"
        }`}
      >
        <img className="w-2/3 mr-3" src={require("./assets/archGlacor.png")} />
        <span>Waiting for boss to spawn...</span>
      </div>

      <div
        className={`text-3xl font-bold underline w-screen h-screen overflow-hidden bg-[#171e24] ${
          cannonIsLastAbility ? "applyWarningGlow" : ""
        }`}
      >
        <div className="container grid grid-cols-5 gap-2 mx-auto">
          {[
            {
              alert: chatContainsFlurryAlert,
              image: require("./assets/flurry.png"),
            },
            {
              alert: chatContainsPillarsAlert,
              image: require("./assets/pillars.png"),
            },
            {
              alert: chatContainsCoreAlert || hasHoaryChill,
              image: require("./assets/core.png"),
            },
            {
              alert: chatContainsCannonAlert,
              image: require("./assets/cannon.png"),
            },
            {
              alert: chatContainsMinionsAlert,
              image: require("./assets/minions.png"),
            },
          ].map(({ alert, image }) => (
            <div className="w-full rounded" key={image}>
              <img style={getStyles(alert)} src={image} />
            </div>
          ))}
        </div>
        <div className="my-0.5 text-center w-full flex flex-row justify-center min-[200px]:my-2">
          <button
            className="nisbutton overflow-hidden"
            onClick={() => resetLines()}
          >
            <span className="px-0.5 text-xs min-[200px]:text-sm min-[200px]:px-2">
              Reset
              <br className="inline min-[240px]:hidden" /> the rotation
              <br className="inline min-[320px]:hidden" /> (alt+1)
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
