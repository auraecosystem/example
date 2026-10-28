declare global {
  interface Node {
    on(name: string, fn: EventListenerOrEventListenerObject): void;
  }

  interface Window {
    on(name: string, fn: EventListenerOrEventListenerObject): void;
    $(selector: string): Element | null;
    $$(selector: string): NodeListOf<Element>;
  }

  interface NodeList extends Array<Node> {
    on(name: string, fn: EventListenerOrEventListenerObject): void;
  }
}
