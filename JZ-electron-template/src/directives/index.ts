import { App } from 'vue'

import MouseDrag from './mouseDrag'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install (app:App) {
    app.directive('mouse-drag', MouseDrag)
  }
}
