const isIECompat = !('grid-column-gap' in document.documentElement.style)
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
        const { gutter, span, columns,
            lgSpan, mSpan, sSpan,
            responsive,
            enableResponsive } = opts
        const halfGutter = Math.floor(gutter / 2)
        const flexBase = `${Number((Number(span) / Number(columns)).toFixed(6)) * 100}%`

        const itemStyle = `
            padding: ${halfGutter}px;
            max-width: ${flexBase};
            flex: 0 0 ${flexBase};
        `

        let responsiveStyle = ''
        if (enableResponsive) {
            const { s, m, lg } = responsive
            const sFlexBase = `${Number((Number(sSpan) / Number(s)).toFixed(6)) * 100}%`
            const mFlexBase = `${Number((Number(mSpan) / Number(m)).toFixed(6)) * 100}%`
            const lgFlexBase = `${Number((Number(lgSpan) / Number(lg)).toFixed(6)) * 100}%`
            responsiveStyle = `
                @media (max-width: 720px) {
                    flex: 0 0 ${sFlexBase};
                }
                @media (min-width: 720px) and (max-width: 1200px) {
                    flex: 0 0 ${mFlexBase};
                }
                @media (min-width: 1200px) {
                    flex: 0 0 ${lgFlexBase};
                }
            `
        }

        return `
            ${itemStyle}
        `
    }

    return ''
}

export {
    getIEGridContainerStyle,
    getIEGridItemStyle,
}