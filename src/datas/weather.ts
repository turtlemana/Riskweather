import { StaticImageData } from "next/image";
import sharplyFalling from "assets/icons/weather/sharplyFalling.svg";
import slightlyFalling from "assets/icons/weather/slightlyFalling.svg";
import maintaining from "assets/icons/weather/maintaining.svg";
import slightlyRising from "assets/icons/weather/slightlyRising.svg";
import sharplyRising from "assets/icons/weather/sharplyRising.svg";
import extremelyRising from "assets/icons/weather/extremelyRising.svg";
import explosion from "assets/icons/weather/explosion.svg";

interface Images {
  [index: string]: StaticImageData;
  sharplyFalling: StaticImageData;
  slightlyFalling: StaticImageData;
  maintaining: StaticImageData;
  slightlyRising: StaticImageData;
  sharplyRising: StaticImageData;
  extremelyRising: StaticImageData;
  explosion: StaticImageData;
}

export const IMAGES: Images = {
  sharplyFalling: sharplyFalling,
  slightlyFalling: slightlyFalling,
  maintaining: maintaining,
  slightlyRising: slightlyRising,
  sharplyRising: sharplyRising,
  extremelyRising: extremelyRising,
  explosion: explosion,
};
