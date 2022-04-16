import {$} from '@core/dom'

export function resizeScript(e, root) {
    return new Promise(resolve => {
        const resizer = $(e.target)
        const parent = resizer.closest(`[data-type="resizable-${e.target.dataset.resize}"]`)
        const coordinates = parent.getCoordinates()
        const type = parent.data.type
        let height
        let width
        document.onmousemove = e => {
            if (type === 'resizable-row') {
                const delta = e.pageY - coordinates.bottom
                height = (coordinates.height + delta) + 'px'
                resizer.css({bottom: -delta + 'px', opacity: 1, right: '-5000px'})
            } else {
                const delta = e.pageX - coordinates.right
                width = (coordinates.width + delta) < 0 ? 0 : (coordinates.width + delta) + 'px'
                resizer.css({right: -delta + 'px', opacity: 1, bottom: '-5000px'})
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            resizer.css({opacity: 0, right: '-3px', bottom: 0})
            if (type === 'resizable-row') {
                parent.css({height})
            } else {
                parent.css({width})
                root.findAll(`[data-col="${parent.data.col}"]`)
                    .forEach(el => el.style.width = width)
            }
            resolve({
                type,
                value: type === 'resizable-row' ? height : width,
                id: type === 'resizable-row' ? parent.data.row : parent.data.col
            })
        }
    })
}