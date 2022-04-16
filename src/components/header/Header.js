import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
    constructor(root, options) {
        super(root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    static className = 'excel__header'

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="header__input" value="${title}"/>
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

    onInput(e) {
        this.$dispatch(changeTitle(e.target.value))
    }
}
