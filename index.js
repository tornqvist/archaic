import { use, start } from '/lib/walla.js'

use(store)
start()

function store (state, emitter) {
  emitter.on('event', function (data) {
    state.data = data
  })
}
