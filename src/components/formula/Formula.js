import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
    constructor(root, options) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    static className = 'excel__formula'

    toHTML() {
        return `
         <div class="info">fx</div>
            <div id="formula" class="input" contenteditable=true spellcheck=false></div>
        `
    }

    init(e) {
        super.init();
        this.formula = this.root.findOne('#formula')
        this.$on('table:select', cell => {
            this.formula.addText(cell.addText())
        })
        this.$on('table:input', cell => {
            this.formula.addText(cell.addText())
        })
    }

    onInput(e) {
        this.$emit('formula:input', $(e.target).addText())
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.key)) {
            e.preventDefault()
            this.$emit('formula:pressEnter')
        }
    }
}
