import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    constructor(root, options) {
        super(root, {
            name: 'Header',
            ...options
        });
    }
    static className = 'excel__header'
    toHTML() {
        return `
            <input type="text" class="header__input" value="Новая таблица"/>
            <div>
                <div class="button">
                    <i class="material-icons md-48">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons md-48">logout</i>
                </div>
            </div>
        `
    }
}
