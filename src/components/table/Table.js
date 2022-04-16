import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from './table.template';
import {resizeScript} from './table.scripts';
import {isCell, shouldResize, matrix, nextSelector} from './table.fn';
import {TableSelection} from '@core/TableSelection';
import * as actions from '@/redux/actions'
import {initialStyleState} from '@/constants';
import {parse} from '@core/parse';


export class Table extends ExcelComponent {
    constructor(root, options) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
        this.rowsCount = 15
    }
    static className = 'excel__table'

    toHTML() {
        return createTable(this.rowsCount, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        const cell = this.root.findOne('[data-id="0:0"]')
        this.selectCell(cell)
        this.$on('formula:input', text => {
            this.selection.current.attr('data-value', text)
            this.selection.current.addText(parse(text))
            this.updateTextState(text)
        })
        this.$on('formula:pressEnter', () => this.selection.current.focus())
        this.$on('toolbar:applyStyle', (styles) => {
            this.selection.group.forEach(cell => cell.css(styles))
            this.$dispatch(actions.applyStyle({styles, ids: this.selection.selectedIds}))
        })
    }

    selectCell(cell) {
        this.selection.select(cell)
        this.$emit('table:select', cell)
        const styles = cell.getStyles(Object.keys(initialStyleState))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(e) {
        try {
            const data = await resizeScript(e, this.root)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn(e);
        }
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            this.resizeTable(e)
        } else if (isCell(e)) {
            const cell = $(e.target)
            const current = this.selection.current.id(true)
            if (e.shiftKey) {
                const cells = matrix(cell, current).map(id => this.root.findOne(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selectCell(cell)
            }
        }
    }

    onKeydown(e) {
        const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter', 'Tab']
        const {key} = e
        if (keys.includes(key) && !e.shiftKey) {
            const id = this.selection.current.id(true)
            e.preventDefault()
            const next = this.root.findOne(nextSelector(key, id, this))
            this.selectCell(next)
        }
    }

    onInput(e) {
       this.updateTextState(e.target.textContent)
    }

    updateTextState(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: text
        }))
    }
}