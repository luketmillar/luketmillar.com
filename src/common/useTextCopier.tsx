import React from 'react'

const useTextCopier = (value: string, inputId?: string) => {
    const ref = React.useRef<HTMLInputElement>(null)
    const onButtonClick = React.useCallback(() => {
        const input = ref.current
        if (!input) {
            return
        }

        // if (isIOS()) {
        //     const range = document.createRange()
        //     range.selectNodeContents(input)

        //     const selection = window.getSelection()
        //     if (!selection) {
        //         return
        //     }

        //     selection.removeAllRanges()
        //     selection.addRange(range)
        //     input.setSelectionRange(0, 999999)
        // } else {
        input.select()
        // }

        document.execCommand('copy')
    }, [ref])
    const inputComponent = (
        <input
            ref={ref}
            id={inputId}
            defaultValue={value}
            contentEditable
            readOnly
            style={{
                position: 'absolute',
                left: -10000,
                zIndex: -1,
                opacity: 0
            }}
        />
    )
    return { copy: onButtonClick, component: inputComponent }
}

export default useTextCopier
