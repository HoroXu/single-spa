import { registerApplication, start } from "single-spa";

registerApplication(
  // Name of our single-spa application
  "testOne",
  // loadingFunction
  () => import("./testOne/src/testOne.app.js"),
  // activityFunction
  location =>
    location.pathname === "" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/testOne")
);

registerApplication(
  // Name of our single-spa application
  "tesTwo",
  // loadingFunction
  () => import("./testTwo/src/testTwo.app.js"),
  // activityFunction
  location => location.pathname.startsWith("/testTwo")
);

start();
