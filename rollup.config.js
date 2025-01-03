import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-porter";
import nodeBuiltins from "rollup-plugin-node-builtins";
import { BABEL_IGNORE_RE, generateHeader } from "vis-dev-utils";

const banner = generateHeader({ name: "vis-timeline and vis-graph2d" });

const GLOBALS = {
  moment: "moment",
  hammerjs: "hammerjs",
  fastdom: "fastdom",
};

const copyStatic = copy({
  targets: [{ src: "types", dest: "dist" }],
});

const babelConfig = {
  babelHelpers: "runtime",
  exclude: BABEL_IGNORE_RE,
};

export default [
  {
    input: "lib/bundle-legacy.js",
    output: {
      file: "dist/vis-timeline-graph2d.esm.js",
      format: "esm",
      banner,
      sourcemap: true,
      globals: GLOBALS,
    },
    plugins: [
      commonjs(),
      nodeBuiltins(),
      nodeResolve({ browser: true }),
      babel(babelConfig),
      css({
        dest: "dist/vis-timeline-graph2d.css",
      }),
      copyStatic,
    ],
  },
  {
    input: "lib/bundle-legacy.js",
    output: {
      file: "dist/vis-timeline-graph2d.min.js",
      name: "vis",
      extend: true,
      exports: "named",
      format: "umd",
      banner,
      sourcemap: true,
      globals: GLOBALS,
    },
    plugins: [
      commonjs(),
      nodeBuiltins(),
      nodeResolve({ browser: true }),
      babel(babelConfig),
      terser({
        output: {
          comments: "some",
        },
      }),
      css({
        dest: "dist/vis-timeline-graph2d.css",
      }),
      copyStatic,
    ],
  },
];
