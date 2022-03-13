const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, index) {
    return `
    <div class="cell" contenteditable=true data-type="${index}"></div>
    `
}

function createColumn(letter, index) {
   return `
    <div class="column" data-type="resizable-column" data-col="${index}">
      ${String.fromCharCode(+letter)}
      <div class="column-resize" data-resize="column"></div>
    </div>
   `
}

function createRow(content, i) {
    return `
    <div class="row" data-type="resizable-row">
      <div class="row-info">${i ? i : ''}
      ${i ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z -CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => createColumn(CODES.A + index, index))
        .join('')
    rows.push(createRow(cols, null))

    for (let i = 0; i < rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map((_, index) => createCell(_, index))
            .join('')
        rows.push(createRow(cell, i + 1))
    }

    return rows.join('')
}


