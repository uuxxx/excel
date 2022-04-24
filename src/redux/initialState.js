import {initialStyleState, defaultTitle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: initialStyleState,
    defaultTitle: defaultTitle,
    date: new Date().toJSON()
}

const normalize = s => ({
    ...s,
    currentStyles: initialStyleState,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}