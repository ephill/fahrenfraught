import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // React 19-era rule that flags the intentional "reset state, then fetch"
      // pattern in our data-loading effects. Surface it as a warning rather
      // than failing the build.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
