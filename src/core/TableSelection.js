export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select(el) {
        this.clear()
        el.focus().addClass(TableSelection.className)
        this.current = el
        this.group.push(el)
    }

    get selectedIds() {
        return this.group.map(el => el.id())
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup(selectedCells = []) {
        this.clear()
        this.group = selectedCells
        this.group.forEach(cell => cell.addClass(TableSelection.className))
    }
}