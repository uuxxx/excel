import {$} from '@core/dom'

export function resizeScript(e, root) {
    const resizer = $(e.target)
    const parent = resizer.closest(`[data-type="resizable-${e.target.dataset.resize}"]`)
    const coordinates = parent.getCoordinates()
    let height
    let width
    document.onmousemove = e => {
        if (parent.data.type === 'resizable-row') {
            const delta = e.pageY - coordinates.bottom
            height = (coordinates.height + delta) + 'px'
            resizer.css({bottom: -delta + 'px', opacity: 1, right: '-5000px'})
        } else {
            const delta = e.pageX - coordinates.right
            width = (coordinates.width + delta) + 'px'
            resizer.css({right: -delta + 'px', opacity: 1, bottom: '-1000px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        resizer.css({opacity: 0})
        if (parent.data.type === 'resizable-row') {
            parent.css({height})
        } else {
            parent.css({width})
            root.findAll(`[data-type="${parent.data.col}"]`)
                .forEach(el => el.style.width = width)
        }
    }
}