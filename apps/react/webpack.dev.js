// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { join } from "path";
import { swcConfig } from "./swc.dev.js";

const __dirname = import.meta.dirname;

/**
 * @type {import("@workleap/webpack-configs").WebpackConfigTransformer}
 */
function virtualCdn(config) {
    config.devServer = {
        ...config.devServer,
        static:[{
            publicPath: "/cdn/movie-widgets",
            directory: join(__dirname, "../../widgets/dist")
        }]
    };

    return config;
}

export default defineDevConfig(swcConfig, {
    transformers:[virtualCdn]
});