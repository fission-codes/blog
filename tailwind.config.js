const plugin = require("tailwindcss/plugin");
const kit = require("@fission-suite/kit");

module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    ...kit.tailwindPurgeList(),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: kit.dasherizeObjectKeys(kit.colors),
    fontFamily: kit.fonts,
  },
  variants: {
    opacity: ["group-hover"],
  },
  plugins: [
    plugin(function ({ addBase }) {
      // this `fontsPath` will be the relative path
      // to the fonts from the generated stylesheet
      kit.fontFaces({ fontsPath: "./fonts/" }).forEach((fontFace) => {
        addBase({ "@font-face": fontFace });
      });
    }),
  ],
};
