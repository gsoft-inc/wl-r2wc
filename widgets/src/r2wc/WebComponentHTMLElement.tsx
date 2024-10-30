import type { ReactPortal } from "react";
import { createPortal } from "react-dom";
import { Observable } from "./Observable.ts";
import { PropsProvider } from "./PropsProvider.tsx";
import { type Map, getMapConvert, getMapName } from "./utils.ts";
import { notifyWidgetMountState, styleSheet } from "./WidgetsManager.tsx";

export class WebComponentHTMLElementBase extends HTMLElement {
    #portal: ReactPortal | null = null;

    static get tagName(): string {
        throw new Error("You must implement this method in a subclass.");
    }

    renderReactComponent(): JSX.Element {
        throw new Error("You must implement this method in a subclass.");
    }

    get renderedPortal(): ReactPortal {
        if (!this.#portal) {
            throw new Error("Portal has not been rendered yet.");
        }

        return this.#portal;
    }

    protected buildElement() {
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.adoptedStyleSheets = [styleSheet];
        this.#portal = createPortal(this.renderReactComponent(), shadow);
    }

    connectedCallback() {
        //altough we can call it in constructor, we do it here as it is recommended: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
        this.buildElement();
        notifyWidgetMountState(this, "mounted");
    }

    disconnectedCallback() {
        this.#portal = null;

        notifyWidgetMountState(this, "unmounted");
    }
}

export class WebComponentHTMLElement<Props= unknown, ObservedAttributesType extends string = never> extends WebComponentHTMLElementBase {
    #props = new Observable<Props>();

    protected get reactComponent(): React.ComponentType<Props> {
        throw new Error("You must implement this method in a subclass.");
    }
    renderReactComponent() {
        return (
            <PropsProvider Component={this.reactComponent} observable={this.#props} />
        );
    }

    get data(): Props | undefined {
        return this.#props.value;
    }

    set data(value: Props) {
        this.#props.value = value;
    }

    get map(): Map<Props, ObservedAttributesType> | undefined {
        return undefined;
    }

    addEventListener(eventName: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        super.addEventListener(eventName, listener, options);

        const map = this.map?.events?.[eventName];

        if (map != null) {
            this.data = {
                ...(this.data ?? {} as Props),
                [getMapName(map)]: listener
            };
        }
    }


    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            const map = this.map?.attributes?.[name as ObservedAttributesType];
            if (map != null) {
                const mapName = getMapName(map) ;
                const mapValue = getMapConvert(map)?.(newValue) ?? newValue;
                this.data = {
                    ...this.data ?? {} as Props,
                    [mapName]: mapValue
                };
            }
        }
    }
}

