export default class Emitter {
  constructor () {
    this.listeners = {}
  }

  on (event, listener) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(listener)
  }

  emit (event, ...data) {
    var listeners = this.listeners[event]
    if (!listeners) return
    for (const listener of listeners) listener(...data)
    if (event !== 'render') emit('render')
  }
}
