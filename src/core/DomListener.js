import {capitalizeFirstLetter} from '@core/utils';

export class DomListener {
    constructor(root, listeners = [], name) {
        if (!root) {
           throw new Error('Root expected in DomListener')
        }
        this.root = root
        this.listeners = listeners
        this.name = name
    }


    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} in ${this.name} is undefined`)
            }
            this[method] = this[method].bind(this)
            this.root.on(listener, this[method])
        })
    }


    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.root.off(listener, this[method])
        })
    }
}

function getMethodName(method) {
    return 'on' + capitalizeFirstLetter(method)
}
