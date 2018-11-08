import { tmpdir } from "os"

const resolve = x => require.resolve(x)

export default function babel() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      "@babel/preset/react",
      [
        resolve("@babel/preset-env"),
        {
          targets: {
            browsers: [
              "last 2 versions",
              "Firefox ESR",
              "> 1%",
              "ie >= 8",
              "iOS >= 8",
              "Android >= 4"
            ]
          }
        }
      ]
    ],
    plugins: [
      "babel-plugin-add-module-exports",

      ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread"
    ].map(resolve)
  }
}
