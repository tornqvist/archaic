import { html, mount, css } from '/lib/walla.js'

css('/components/header/index.css')
mount('#header', header)

export default function header (state, emit) {
  return html`
    <nav id="header" class="Header">
      <ul class="Header-list">
        <li class="Header-item">
          <a href="/" class="Header-link">Home</a>
        </li>
        <li class="Header-item">
          <a href="/page" class="Header-link">Page</a>
        </li>
      </ul>
    </nav>
  `
}
