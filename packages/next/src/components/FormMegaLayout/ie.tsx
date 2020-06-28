const isIECompat = !('grid-column-gap' in document?.documentElement?.style)
const getIEGridContainerStyle = (opts) => {
    if (isIECompat) {
        const { gutter, autoRow } = opts
        const halfGutter = Math.floor(gutter / 2)
        return `
            display: flex;
            ${autoRow ? 'flex-flow: row wrap;' : ''}
            margin: -${halfGutter}px -${halfGutter}px ${halfGutter}px;
        `
    }

    return ''
}

const getIEGridItemStyle = (opts) => {
    if (isIECompat) {
        const { gutter, span, columns } = opts
        const halfGutter = Math.floor(gutter / 2)
        const flexBase = `${Number((Number(span) / Number(columns)).toFixed(6)) * 100}%`

        return `
            padding: ${halfGutter}px;
            max-width: ${flexBase};
            flex: 0 0 ${flexBase};
        `
    }

    return ''
}

export {
    getIEGridContainerStyle,
    getIEGridItemStyle,
}