function createToolbar(state) {
    // console.log(state)
    const dataType = 'toolbar-btn'
    const buttons = [
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underline',
            active: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
        },
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        }
    ]
    return buttons.map(btn => {
        const dataValue = JSON.stringify(btn.value)
        return `
            <div class="button ${btn.active ? 'active' : ''}" data-type="${dataType}" data-value='${dataValue}'>
                <i data-type="${dataType}" data-value='${dataValue}'  class="material-icons md-48">${btn.icon}</i>
            </div>`
    }).join('')
}

export {createToolbar}