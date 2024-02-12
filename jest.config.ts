import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/test/test.(ts|tsx|js)"],

  collectCoverage: true,
};
export default config;
