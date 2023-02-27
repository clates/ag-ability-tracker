import * as a1lib from "@alt1/base";
import { useCallback, useEffect, useState } from "react";

export default (): [boolean, () => void] => {
  const [imageDetected, setImageDetected] = useState(false);
  const [activeInterval, setActiveInterval] = useState<NodeJS.Timeout>();
  const imgs = a1lib.ImageDetect.webpackImages({
    hoaryChill: require("./assets/hoaryChill.data.png"),
  });

  const startInterval = () => {
    return setInterval(() => {
      //Short circuit this to stop trying to full capture if we know we already have chill.
      //It'll get reset on the rotation or fight end.
      if (
        !imageDetected &&
        a1lib.captureHoldFullRs().findSubimage(imgs.hoaryChill).length > 0
      ) {
        setImageDetected(true);
        if (activeInterval) {
          clearInterval(activeInterval);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const letImagesLoad = async () => {
      await imgs.promise;
    };
    letImagesLoad();

    //Start the initial interval
    setActiveInterval(startInterval());
  }, []);

  /**
   * This is called after an ability rotation and timeouts for a period in order to
   * avoid a scenario where core was the last mechanic and the horary chill takes a second to
   * wear off. This'll likely need to be dialed in.
   */
  const chillOut = useCallback(() => {
    //Reset this to prepare for the next rotation.
    setImageDetected(false);

    if (activeInterval) {
      clearInterval(activeInterval);
    }
    //Someone asked us nicely to ..... chill out for a few seconds :)
    console.log("Chilling out on checking for hoary");
    setTimeout(() => {
      setActiveInterval(startInterval());
    }, 10000);
  }, [activeInterval]);

  return [imageDetected, chillOut];
};
