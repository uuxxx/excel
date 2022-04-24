export class Page {
    constructor(param) {
        this.param = param
    }

    getRoot() {
        throw new Error('getRoot is required!')
    }

    afterRender() {}

    destroy() {}
}