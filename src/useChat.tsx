import ChatboxReader from "@alt1/chatbox";
import * as a1lib from "@alt1/base";
import { useEffect, useState } from "react";

const timeStampPattern = /\[\d\d:\d\d:\d\d\]/;

const IsAfterTimestampedLine = (
  timestampedLine: string,
  incomingLine: string
): boolean => {
  if (!timeStampPattern.test(incomingLine)) {
    return false;
  }
  return incomingLine > timestampedLine;
};

const getLatestLine = (lines: string[]): string =>
  lines
    .filter((line) => timeStampPattern.test(line))
    .sort()
    .slice(-1)[0];

export default (): [Set<string>, () => void] => {
  const [lastActionedLine, setLastActionedLine] = useState<string>("");
  const [lines, setLines] = useState<Set<string>>(new Set<string>());
  const [chatInterval, setChatInterval] = useState<NodeJS.Timeout>();

  // Set Chat reader with all textcolors etc.
  const chatboxReader = new ChatboxReader();
  chatboxReader.readargs = {
    colors: [
      //Shamelessly stolen from the SusAlrty repo <3
      a1lib.mixColor(255, 255, 255), // Normal Text White
      a1lib.mixColor(130, 70, 184), // Gorvek Purple
      a1lib.mixColor(159, 255, 159), // Clan chat green
      a1lib.mixColor(255, 82, 86), // PM Red
      a1lib.mixColor(255, 0, 0), // Very Red Red
      a1lib.mixColor(0, 174, 0), // Crystal Mask Green
      a1lib.mixColor(45, 184, 20), // Completion Time Green
      a1lib.mixColor(67, 188, 188), // Contribution Score Green
      a1lib.mixColor(102, 152, 255), // Notable Drops Blue
      a1lib.mixColor(235, 47, 47), // Rot Mistake Red
      a1lib.mixColor(255, 255, 0), // Blessing From The Gods Yellow
      a1lib.mixColor(0, 255, 255), // Seren Spirit Cyan
      a1lib.mixColor(30, 255, 0), // Catalyst Of Alteration Green
      a1lib.mixColor(127, 169, 255), // Public Chat Blue
      a1lib.mixColor(0, 255, 0), // Artificer's Measure Green
      a1lib.mixColor(255, 112, 0), // Luck Ring Orange
      a1lib.mixColor(163, 53, 238), // Rare Drop Purple
      ////

      /// AG Specific colors
      a1lib.mixColor(202, 51, 152), // Azzandra
      a1lib.mixColor(0, 153, 0), // Ariane
      a1lib.mixColor(45, 186, 20), // Completion Time
    ],
  };

  useEffect(() => {
    console.log("Setting timeout");
    setTimeout(() => {
      console.log("Finding chatbox...");
      chatboxReader.find();

      if (chatInterval) {
        clearInterval(chatInterval);
      }
      setChatInterval(
        setInterval(() => {
          let newLines = chatboxReader.read() ?? [];

          //Filter out old / already actioned / and fragmanted lines
          newLines = newLines.filter((newLine) =>
            IsAfterTimestampedLine(lastActionedLine, newLine.text)
          );

          if (
            newLines.length > 0 &&
            newLines.some((newLine) => !lines.has(newLine.text))
          ) {
            setLines(
              (prev) => new Set([...prev, ...newLines.map((line) => line.text)])
            );
          }
        }, 600)
      );
    }, 500);
  }, []);

  return [
    lines,
    () => {
      console.log(
        "Resetting the active lines. Capturing this line as the Latest line: ",
        getLatestLine([...lines])
      );
      setLastActionedLine(getLatestLine([...lines]));
      setLines(new Set<string>());
    },
  ];
};
