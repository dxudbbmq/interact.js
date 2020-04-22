import * as allSnappers from "./all.js";
import extend from "../utils/extend.js";
const snappersPlugin = {
  id: 'snappers',

  install(scope) {
    const {
      interactStatic: interact
    } = scope;
    interact.snappers = extend(interact.snappers || {}, allSnappers);
    interact.createSnapGrid = interact.snappers.grid;
  }

};
export default snappersPlugin;
//# sourceMappingURL=index.js.map