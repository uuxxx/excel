function shouldResize(e) {
    return e.target.dataset.resize
}

function isCell(e) {
    return e.target.dataset.type === 'cell'
}

function range(start, end) {
    if (start > end) {
        [start, end] = [end, start]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => i + start)
}

function matrix(cell, current) {
    const target = cell.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
   return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

function nextSelector(key, {row, col}, Table) {
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 > Table.rowsCount - 1 ? Table.rowsCount - 1 : row + 1
            break
        case 'Tab':
        case 'ArrowRight':
            col = col + 1 > 25 ? 25 : col + 1
            break
        case 'ArrowLeft':
            col = col - 1 < 0 ? 0 : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < 0 ? 0 : row - 1
            break
    }
    return `[data-id="${row}:${col}"]`
}

export {shouldResize, isCell, matrix, nextSelector}