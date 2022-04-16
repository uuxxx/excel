import './styles/style.scss'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {Store} from '@core/createStore';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/redux/initialState';

const store = new Store(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('state', state)
    // console.log('App state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
components: [Header, Toolbar, Formula, Table], store
})

excel.render()