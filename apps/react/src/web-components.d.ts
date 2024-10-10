export declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-pop-up": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                text?: string;
            },
            HTMLElement
            >;

            "wl-movie-details": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                "show-ranking"?: string;
            },
            HTMLElement
            >;

            "wl-movie-finder": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
            >;

            "wl-ticket": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
            >;

            "wl-selected-movie": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
            >;
        }
    }
}

