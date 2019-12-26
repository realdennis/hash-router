import { LitElement, html, customElement, property } from "lit-element";
import { getCurrentRoute } from "./utils/index";

@customElement("hash-link-shadow")
export class HashLinkShadow extends LitElement {
  @property({ type: String }) text: string = "";
  @property({ type: String }) to: string = "";
  @property({ type: String }) activeStyle: string = "";
  forceUpdate = async () => await this.requestUpdate();
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.forceUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hashchange", this.forceUpdate);
  }
  getIsActive() {
    return getCurrentRoute() === this.to;
  }
  
  render() {
    const { to, activeStyle } = this;
    const isActive = this.getIsActive();
    return html`
      <a
        href=${`#${to}`}
        style=${isActive ? activeStyle : ""}
        ><slot></slot
      ></a>
    `;
  }
}

@customElement("hash-link")
export class HashLink extends HashLinkShadow {
  @property({ type: String }) activeClass: string = "";
  createRenderRoot() {
    return this;
  }
  render() {
    const { to, activeClass, activeStyle, text } = this;
    const isActive = this.getIsActive();
    return html`
      <a
        href=${`#${to}`}
        class=${isActive ? activeClass : ""}
        style=${isActive ? activeStyle : ""}
        >${text}</a
      >
    `;
  }
}
