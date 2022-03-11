import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.root = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const rootTag = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            // DEBUG
            window['c' + component.name] = component
            $el.html(component.toHTML())
            rootTag.append($el)
            return component
        })
        return rootTag
    }

    render() {
        this.root.append(this.getRoot())
        this.components.forEach(Component => Component.init())
    }
}