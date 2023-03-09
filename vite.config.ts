import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";
import viteCompression from 'vite-plugin-compression';

export default defineConfig(() => {
    return {

      plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact(),viteCompression()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
      resolve: {
        alias: {
            "node:stream":"stream-browserify",
//            stream:"rollup-plugin-node-polyfills/polyfills/stream",
            "node:util": "rollup-plugin-node-polyfills/polyfills/util",
            util:"rollup-plugin-node-polyfills/polyfills/util",
            sys: "rollup-plugin-node-polyfills/polyfills/util",
            events: "rollup-plugin-node-polyfills/polyfills/events",
            path:"path",
            "node:path": "path",
            querystring: "rollup-plugin-node-polyfills/polyfills/qs",
            punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
            "node:url": "url",
            url: "url",
            "node:http": "rollup-plugin-node-polyfills/polyfills/http",
            "node:net":"net-websocket-polyfill",
            "node:fs":"memfs",
            https: "rollup-plugin-node-polyfills/polyfills/http",
            os: "rollup-plugin-node-polyfills/polyfills/os",
            assert: "rollup-plugin-node-polyfills/polyfills/assert",
            constants: "rollup-plugin-node-polyfills/polyfills/constants",

            timers: "rollup-plugin-node-polyfills/polyfills/timers",
            console: "rollup-plugin-node-polyfills/polyfills/console",
            vm: "rollup-plugin-node-polyfills/polyfills/vm",
            zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
            tty: "rollup-plugin-node-polyfills/polyfills/tty",
            domain: "rollup-plugin-node-polyfills/polyfills/domain",
            "node:buffer": "rollup-plugin-node-polyfills/polyfills/buffer-es6",
            process: "rollup-plugin-node-polyfills/polyfills/process-es6",
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            crypto:"crypto-browserify"
        },
      },
      optimizeDeps: {
        include:['node-domexception'],

          esbuildOptions: {
            target: "es2020",
              supported: { bigint: true },
            define: {
                global: 'globalThis'
            },
              plugins: [
     NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true
                }),
                NodeModulesPolyfillPlugin()
            ]
        }
      },
      build: {
        target: "es2020",
          commonjsOptions: {

            transformMixedEsModules: true,
          },
          rollupOptions: {
           
            plugins: [

                builtins(),
                rollupNodePolyFill({crypto:true,}),

                ],
          },
      },
      define: {
        "process.env": process.env ?? {},

    }
  };
});
