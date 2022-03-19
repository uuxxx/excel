import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';

export class Excel {
    constructor(selector, options) {
        this.root = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() {
        const componentOptions = {
            emitter: this.emitter
        }

        const rootTag = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
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

    destroy() {
        this.components.forEach(Component => {
            Component.destroy()
        })
    }
}