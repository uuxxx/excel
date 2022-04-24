import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {preventDefault} from '@core/utils';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('No selector in Router')
        }
        this.placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    changePageHandler() {
        const pageTag = ActiveRoute.param[1] || ''
        if (this.page) {
            this.page.destroy()
        }
        let Page = this.routes.dashboard
        if (pageTag.includes('excelPage')) {
            Page = this.routes.excel
        } else if (pageTag.includes('remove')) {
            localStorage.clear()
        }
        this.page = new Page(ActiveRoute.param[2])
        this.placeholder.html()
        this.placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    init() {
        if (process.env.NODE_ENV) {
            document.addEventListener('contextmenu', e => preventDefault(e))
        }
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}