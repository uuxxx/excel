const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
    <div class="cell" contenteditable=true></div>
    `
}

function createColumn(letter) {
   return `
    <div class="column">${String.fromCharCode(+letter)}</div>
   `
}

function createRow(content, i) {
    return `
    <div class="row">
      <div class="row-info">${i ? i : ''}</div>
      <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z -CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => createColumn(CODES.A + index))
        .join('')
    rows.push(createRow(cols, null))

    for (let i = 0; i < rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(cell, i + 1))
    }

    return rows.join('')
}


