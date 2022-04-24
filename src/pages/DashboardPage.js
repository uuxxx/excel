import {Page} from '@core/Page';
import {$} from '@core/dom'
import {getAllRecords} from './dashboard.functions';

export class DashboardPage extends Page {
    getRoot() {
        const date = Date.now()
        return $.create('div', 'db').html(
            `
    <div class="db__header">
        <h1>Excel dashboard</h1>
    </div>

    <div class="db__new">
        <div class="db__view">
            <a href="#/excelPage/${date}" class="db__create">
                Новая <br/> таблица
            </a>
        </div>
        
         <div class="db__view">
            <a href="#/remove" class="db__delete">
                Удалить <br/> все
            </a>
        </div>
    </div>

    <div class="db__table db__view">
    ${getAllRecords()}
    </div>`
        )
    }
}
