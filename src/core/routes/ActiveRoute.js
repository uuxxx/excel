export class ActiveRoute {
    static get path() {
        return window.location.hash
    }

    static get param() {
        return ActiveRoute.path.split('/')
    }

    static navigate(path) {
        window.location.href = path
    }
}