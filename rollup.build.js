import { generateRollupConfiguration } from "vis-dev-utils";
import packageJSON from "./package.json";

export default generateRollupConfiguration({
  externalForPeerBuild: ["moment", "vis-data"],
  globals: {
    "@egjs/hammerjs": "Hammer",
    "component-emitter": "Emitter",
    "propagating-hammerjs": "propagating",
    "vis-data": "vis",
    "vis-util": "vis",
    keycharm: "keycharm",
    moment: "moment",
    uuid: "uuid",
    xss: "filterXSS",
    fastdom: "fastdom",
  },
  header: { name: "vis-timeline and vis-graph2d" },
  libraryFilename: "vis-timeline-graph2d",
  entryPoints: "./lib",
  packageJSON,
});
