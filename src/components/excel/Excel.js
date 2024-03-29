import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {changeDate} from '@/redux/actions';
import {preventDefault} from '@core/utils';

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
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

    init() {
        this.store.dispatch(changeDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(Component => Component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(Component => {
            Component.destroy()
        })
        document.removeEventListener('contextmenu', preventDefault)
    }
}