import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from './table.template';
import {resizeScript} from './table.scripts';
import {isCell, shouldResize, matrix, nextSelector} from './table.fn';
import {TableSelection} from '@core/TableSelection';


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
        return createTable(this.rowsCount)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        const cell = this.root.findOne('[data-id="0:0"]')
        this.selectCell(cell)
        this.$on('formula:input', text => this.selection.current.addText(text))
        this.$on('formula:pressEnter', () => {
            this.selection.current.focus()
        })
    }

    selectCell(cell) {
        this.selection.select(cell)
        this.$emit('table:select', cell)
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeScript(e, this.root)
        } else if (isCell(e)) {
            const cell = $(e.target)
            const current = this.selection.current.id(true)
            if (e.shiftKey) {
                const cells = matrix(cell, current).map(id => this.root.findOne(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.select(cell)
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
        this.$emit('table:input', $(e.target))
    }
}