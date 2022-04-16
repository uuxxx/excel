import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    get template() {
        return JSON.stringify(this.state, null, 2)
    }

    initState(state = {}) {
        this.state = {...state}
    }

    setState(styles) {
        this.state = styles
        this.root.html(this.template)
    }
}