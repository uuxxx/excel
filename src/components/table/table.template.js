import {toInlineStyles} from '@core/utils';
import {initialStyleState} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '24px'

function getWidth(state, index) {
    return state.colState[index] || DEFAULT_WIDTH
}

function getHeight(state, index) {
    return state.rowState[index] || DEFAULT_HEIGHT
}


function createCell(row, state) {
    return function(_, col) {
        const id = `${row}:${col}`
        const text = state.dataState[id] || ''
        const stylesState = state['stylesState'] ? state.stylesState[id] : {}
        const styles = toInlineStyles({...initialStyleState, ...stylesState})
        return `
        <div style="width: ${getWidth(state, col)}; ${styles};" class="cell" contenteditable=true data-col="${col}" data-value="${text || ''}"  data-type="cell" data-id="${id}">${parse(text) || ''}</div>
        `
    }
}

function createColumn(letter, index, width) {
   return `
    <div style="width: ${width}" class="column" data-type="resizable-column" data-col="${index}">
      ${String.fromCharCode(+letter)}
      <div class="column-resize" data-resize="column"></div>
    </div>
   `
}

function createRow(content, i, state) {
    return `
    <div class="row" style="height: ${getHeight(state, i)}" data-row="${i}" data-type="resizable-row">
      <div class="row-info">${i ? i : ''}
      ${i ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z -CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => {
            const width = getWidth(state, index)
            return createColumn(CODES.A + index, index, width)
        })
        .join('')
    rows.push(createRow(cols, null, state))

    for (let row = 0; row < rowsCount; row++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')
        rows.push(createRow(cell, row + 1, state))
    }

    return rows.join('')
}


