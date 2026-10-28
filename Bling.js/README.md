# bling.js

Because you want the $ of jQuery without the jQuery.

------------------------------------

You may be interested in bling.js if you get tired of the `Array.from(document.querySelectorAll('.foo')).forEach(… ` rodeo. It does this:

```js
// Array methods w/ the qSA result
document.querySelectorAll('input').map(el => /* ... */);

// on() rather than addEventListener()
document.body.on('dblclick', evt => /* ... */);

// classic jQuery + on()
$$('p').on('click', el => /* ... */);
```

It doesn't do anything else. This is **not** a jQuery equivalent.

#### Notes:
* `on()` works on elements, `document`, `window`, and results from `querySelector` & `querySelectorAll`.
* ~`$` is qSA so if you're grabbing a single element you'll have to `[0]` it.~
   * In Nov 2024 I made a breaking change (ya know, 10yrs later) where $$ is qSA and $ is qS. This matches how these [symbols are defined within DevTools Console](https://developer.chrome.com/docs/devtools/console/utilities#querySelector-function).
* Bling plays well with authoring ES6 (and beyond!)
* Resig explored this stuff a while ago: [github.com/jeresig/nodelist](http://github.com/jeresig/nodelist)
* Bling works everywhere.

#### Nerdy implementation notes:
* The NodeList prototype usually inherits from Object, so we move it to Array.
* I'm curious how ES6/7 would let a NodeList be iterable and inherit from EventTarget. _2024 Paul here: whelp, they added iterable to NodeList but not EventTarget. seems good._
* Setting `Node.prototype.on = EventTarget.prototype.addEventListener` is awesome. It works in Chrome/FF but not yet in IE/Safari.
* I haven't set up any off() or trigger() to map to `dispatchEvent` & `removeEventListener`. I'm OK with that.
   * See comments for alternatives where folks have more fleshed out editions of this.


#### Typescript declaration

(Added 2024..)

```ts
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
```
