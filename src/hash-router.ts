import { LitElement, html, customElement } from "lit-element";
import { getCurrentRoute } from "./utils/index";

@customElement("hash-router")
export class HashRouter extends LitElement {
  private forceUpdate = async () => await this.requestUpdate();
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.forceUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hashchange", this.forceUpdate);
  }
  render() {
    const currentRoute = getCurrentRoute();

    return currentRoute === ""
      ? html`
          <h1>Not match</h1>
        `
      : html`
          <slot name=${currentRoute}></slot>
        `;
  }
}
