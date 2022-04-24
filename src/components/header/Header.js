import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from '@core/routes/ActiveRoute';


export class Header extends ExcelComponent {
    constructor(root, options) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    static className = 'excel__header'

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="header__input" value="${title}"/>
            <div>
                <div class="button" data-button="delete">
                    <i class="material-icons md-48" data-button="delete">delete</i>
                </div>
                <div class="button" data-button="logout">
                    <i class="material-icons md-48" data-button="logout">logout</i>
                </div>
            </div>
        `
    }

    onInput(e) {
        this.$dispatch(changeTitle(e.target.value))
    }

    onClick(e) {
        const targetData = e.target.dataset.button
        if (targetData === 'logout') {
            ActiveRoute.navigate('')
        } else if (targetData === 'delete') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу')
            if (decision) {
                localStorage.removeItem(`state:${ActiveRoute.param[2]}`)
                ActiveRoute.navigate('')
            }
        }
    }
}
