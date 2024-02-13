import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import TreeSelect from './TreeSelect'

export default function Container() {
    const [open, setOpen] = useState(false)

    const [activeElement, setActiveElement] = useState<Element>()

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.onclick = () => {
            const { activeElement } = document
            if (!activeElement) {
                return
            }
            const elementName = activeElement.tagName.toLowerCase()
            if (elementName === 'input' || elementName === 'textarea') {
                setActiveElement(activeElement)
            }
        }
    }, [])

    useHotkeys('j', () => {
        setOpen(o => !o)
    })

    const onLeafClick = useCallback((text: string) => {
        if (activeElement) {
            activeElement.setAttribute('value', text);
            (activeElement as any).value = text;
        }
        setOpen(false)
    }, [activeElement])

    const style = useMemo(() => ({
        display: open ? 'block' : 'none',
        position: 'fixed' as const,
        zIndex: 999999,
        width: '100%',
        backgroundColor: 'white',
        top: '0px',
        overflow: 'scroll',
        maxHeight: '100%',
        left: '0px'
    }), [open])
    return (
        <div style={style}>
            {
                open ?
                    <TreeSelect onLeafClick={onLeafClick} /> : null
            }
        </div>
    )
}
