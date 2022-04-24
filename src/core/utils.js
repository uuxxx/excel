function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

 function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    } else {
    localStorage.setItem(key, JSON.stringify(data))
    }
}

function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
       return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

 function toCorrectStyles(key) {
     return key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
 }

 function toInlineStyles(styles = {}) {
     return Object.keys(styles)
         .map(key => `${toCorrectStyles(key)}: ${styles[key]}`)
         .join('; ')
 }

 function debounce(fn, wait) {
    let timeout
     return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
     }
 }

 function preventDefault(e) {
    e.preventDefault()
 }

export {capitalizeFirstLetter, storage, isEqual, toCorrectStyles, toInlineStyles, debounce, preventDefault}