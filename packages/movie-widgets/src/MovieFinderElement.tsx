import { WebComponentHTMLElement } from "@workleap/r2wc";
import { MovieFinder } from "./MovieFinder.tsx";

export class MovieFinderElement extends WebComponentHTMLElement {
    get reactComponent() {
        return MovieFinder;
    }

    static get tagName() {
        return "wl-movie-finder";
    }
}