import {initMixin} from "./init.js";
import {renderMixin} from "./render.js";


function Due(options) {
    this._init(options);
    if (this.created != null) {
        this.created.call(this);
    }
    this._render();
}

initMixin(Due);
renderMixin(Due);

export default Due;