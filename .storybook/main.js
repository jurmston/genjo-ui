const path = require("path")
const toPath = (filePath) => path.join(process.cwd(), filePath)

module.exports = {
  "stories": [
    "../src/**/*.stories.js",
  ],
  "addons": [
    "@storybook/addon-links/preset",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "storybook-dark-mode",
  ],

  // Storybook uses a different version of @emotion and that screws with the
  // style engine for MUI. This hack tricks storybook to make sure the MUI
  // version is used to generate the css.
  // See:
  // https://github.com/mui-org/material-ui/issues/24282
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    }
  },
}