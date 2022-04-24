import {storage} from '@core/utils';

function toHtml() {
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
           ${createRecordsList()}
        </ul>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('state')) {
            continue
        }
        keys.push(key)
    }
   return keys
}

function getAllRecords() {
    return getAllKeys().length ? toHtml() : `<p>Вы пока не создали ни одной таблицы</p>`
}

function createRecordsList() {
   return getAllKeys().map(key => {
       const currentState = storage(key)
       const date = key.split(':')[1]
    return `
     <li class="db__record">
      <a href="#/excelPage/${date}">${currentState.title || currentState.defaultTitle}</a>
      <strong>
${new Date(currentState.date).toLocaleDateString()}
${new Date(currentState.date).toLocaleTimeString()}
</strong>
    </li>
    `
   }).join('')
}

export {toHtml, getAllRecords}
