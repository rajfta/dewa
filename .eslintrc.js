module.exports = {
  extends: ["next", "next/core-web-vitals", "next/typescript"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "react/jsx-no-constructed-context-values": "off",
    "react/jsx-pascal-case": "off",
    "react/require-default-props": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
