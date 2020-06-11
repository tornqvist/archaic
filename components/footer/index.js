import { html, mount, css } from '/lib/walla.js'

css('/components/footer/index.css')
mount('#footer', footer)

export default function footer (state, emit) {
  return html`
    <footer id="footer" class="Footer">
      © 2020
    </footer>
  `
}
