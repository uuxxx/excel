import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from '@/redux/types';

function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}

function changeDate() {
    return {
        type: UPDATE_DATE
    }
}

export {tableResize, changeText, changeStyles, applyStyle, changeTitle, changeDate}