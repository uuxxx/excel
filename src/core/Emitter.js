export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(eventName, ...args) {
        if (Array.isArray(this.listeners[eventName])) {
            this.listeners[eventName].forEach(listener => listener(...args))
        } else {
            return false
        }
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
