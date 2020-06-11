import Emitter from './emitter.js'

const COMMENT = window.NodeFilter.SHOW_COMMENT
const state = new Map()
const emitter = new Emitter()
const emit = emitter.emit.bind(emitter)

export function use (fn) {
  fn(state, emitter)
}

export function css (href) {
  var link = document.querySelector(`link[href="${href}"]`)
  if (link) return
  link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export function start (selector) {
  const root = selector ? document.querySelector(selector) : document
  const iterator = document.createNodeIterator(root, COMMENT, isInclude)
  let curNode
  while ((curNode = iterator.nextNode())) {
    const node = curNode
    const match = node.nodeValue.match(/virtual="([^"]+)/)
    const src = match && match[1].replace(/\.html$/, '.js')
    if (src) {
      import(src).then(function (module) {
        node.replaceWith(module.default(state, emit))
      })
    } else {
      node.remove()
    }
  }
  window.addEventListener('DOMContentLoaded', function () {
    emitter.emit('render')
  })
}

export function mount (selector, fn) {
  var oldNode = document.querySelector(selector)
  emitter.on('render', raf(render))
  function render () {
    var newNode = fn(state, emit)
    oldNode.replaceWith(newNode)
    oldNode = newNode
  }
}

export function html (parts, ...values) {
  parts = Array.isArray(parts) ? parts : [parts]
  var div = document.createElement('div')
  var fragment = document.createDocumentFragment()
  div.innerHTML = parts.reduce(function (acc, part, index) {
    var value = values[index] == null ? '' : values[index]
    return acc + value + part
  })
  while (div.firstChild) fragment.appendChild(div.firstChild)
  return fragment
}

function isInclude (node) {
  return /^#\s?include/.test(node.nodeValue)
    ? window.NodeFilter.FILTER_ACCEPT
    : window.NodeFilter.FILTER_REJECT;
}

function raf (fn) {
  var args
  var scheduled = false
  return function () {
    args = arguments
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(function () {
      scheduled = false
      fn(...args)
    })
  }
}
