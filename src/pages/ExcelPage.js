import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {Store} from '@core/createStore';
import {storage, debounce} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';


function storageName(param) {
    return `state:${param}`
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.param || Date.now().toString()
        const getState = storage(storageName(params))
        const store = new Store(rootReducer, normalizeInitialState(getState))
        const stateListener = debounce(state => {
            storage(storageName(params), state)
        }, 300)

        store.subscribe(stateListener)
         this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table], store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}