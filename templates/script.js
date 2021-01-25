// Dark/light mode
;(() => {
    const tryLocalStorage = (method, ...rest) => {
        try {
            const val = localStorage[method](...rest)
            return JSON.parse(val)
        } catch { }
    }

    const storage = {
        setItem: (key, val) => { tryLocalStorage('setItem', key, val) },
        removeItem: (key, val) => { tryLocalStorage('removeItem', key) },
        getItem: (key) => tryLocalStorage('getItem', key),
    }

    // Don't put the button on the page unless JS is enabled, since it wouldn't do anything
    const invertButton = document.createElement('button')
    invertButton.title = 'Toggle Dark Mode'
    invertButton.id = 'invert'
    invertButton.innerText = '☾'
    const body = document.querySelector('body')
    body.prepend(invertButton)

    const invertStorageKey = 'nidd-inverted'
    // Light mode by default
    let inverted = false

    const handleInvert = (override) => {
        inverted = override != null ? !!override : !inverted
        const h = document.getElementsByTagName('html')[0]
        const b = document.getElementsByTagName('body')[0]
        const method = inverted ? 'add' : 'remove'
        const className = 'dark'

        ;[...[h, b]].forEach((el) => {
            el.classList[method](className)
        })

        storage.setItem(invertStorageKey, JSON.stringify(inverted))
    }

    invertButton.onclick = () => handleInvert()

    document.addEventListener('DOMContentLoaded', () => {
        const storageInverted = storage.getItem(invertStorageKey)
        handleInvert(!!storageInverted)
    })
})()
