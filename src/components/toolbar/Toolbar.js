import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom'
import {initialStyleState} from '@/constants'

export class Toolbar extends ExcelStateComponent {
    constructor(root, options) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }
    static className = 'excel__toolbar'

    prepare() {
        this.initState(initialStyleState)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(e) {
        const target = $(e.target)
        if (target.data.type === 'toolbar-btn') {
            const value = JSON.parse(target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }
}