import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeScript} from './table.scripts';
import {shouldResize} from './table.fn';


export class Table extends ExcelComponent {
    constructor(root) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    static className = 'excel__table'

    toHTML() {
        return createTable()
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeScript(e, this.root)
        }
    }
}