class Dom {
    constructor(selector) {
        this.el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html = '') {
        if (typeof html === 'string') {
            this.el.innerHTML = html
            return this
        }
        return this.el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, fn) {
        this.el.addEventListener(eventType, fn)
    }

    off(evenType, fn) {
        this.el.removeEventListener(evenType, fn)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.el
        }
        if (Element.prototype.append) {
            this.el.append(node)
        } else {
            this.el.appendChild(node)
        }
        return this
    }

    get data() {
        return this.el.dataset
    }

    closest(selector) {
        return $(this.el.closest(selector))
    }

    getCoordinates() {
        return this.el.getBoundingClientRect()
    }

    findAll(selector) {
        return this.el.querySelectorAll(selector)
    }

    css(styles = {}) {
        this.el.style = Object.keys(styles).map(key => key+': '+ styles[key]+';').join(' ')
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if (className) {
        el.classList.add(className)
    }
    return $(el)
}
