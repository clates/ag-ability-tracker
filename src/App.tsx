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
import * as a1lib from "@alt1/base";

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
    //One time linking to the alt-1 press
    a1lib.on("alt1pressed", () => {
      resetLines();
    });
  }, []);

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

  console.debug("Current Chat:", chat);

  //Handle the double cannon warning
  const cannonIsLastAbility =
    chatContainsCoreAlert &&
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

  return (
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
            alert: chatContainsCoreAlert,
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
            <img style={getStyles(alert)} src={image}></img>
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
  );
};
