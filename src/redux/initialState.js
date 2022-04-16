import {storage} from '@core/utils';
import {initialStyleState, defaultTitle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles: initialStyleState,
    defaultTitle: defaultTitle
}

const normalize = s => ({
    ...s,
    currentStyles: initialStyleState,
    currentText: ''
})

export const initialState = storage('state') ? normalize(storage('state')) : defaultState
