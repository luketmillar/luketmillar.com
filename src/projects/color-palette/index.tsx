import { rgbToHex } from 'colors/converters'
import ImageDropTarget, { State } from './ImageDropTarget'
import useTextCopier from 'common/useTextCopier'
import React from 'react'
import styled from 'styled-components'
const ColorThief = require('colorthief').default

const colorThief = new ColorThief()

const ColorPalette = () => {
    const [image, setImage] = React.useState<string | undefined>()
    const [colors, setColors] = React.useState<string[] | undefined>()
    const imageRef = React.useRef<HTMLImageElement>(null)

    React.useEffect(() => {
        if (image) {
            const palette = colorThief.getPalette(imageRef.current!, 5)
            setColors(palette.map((rgb: number[]) => rgbToHex(rgb)))
        }
    }, [image])

    const handleChange = React.useCallback((state: State) => {
        switch (state.type) {
            case 'ready':
                setImage(state.src)
        }

    }, [])
    return <div style={{ width: '100vw', height: '100vh' }}>
        <ImageDropTarget onChange={handleChange}>
            {image ? (
                <div style={{ display: 'flex', height: 600, width: '100%' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ maxWidth: 800, width: '80%' }} ref={imageRef} src={image} alt="img" />
                    </div>
                    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ border: '2px solid white', borderRadius: 10, display: 'flex', overflow: 'hidden' }}>
                            {colors?.map(color => <Color color={color} />)}
                        </div>
                    </div>
                </div>
            ) : <h1>drop an image here</h1>}
        </ImageDropTarget>
    </div>
}

const ColorText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 800;
    display: none;
    text-shadow: 0px 0px 10px rgba(0,0,0,0.5);
`
const ColorContainer = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    cursor: pointer;
    :hover ${ColorText} {
        display: block;
    }
`

const Color = ({ color }: { color: string }) => {
    const { copy, component } = useTextCopier(color)
    const handleClick = React.useCallback(() => {
        copy()
    }, [copy])
    return <ColorContainer onClick={handleClick}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: color }} />
        <ColorText>{color}</ColorText>
        {component}
    </ColorContainer>
}


export default ColorPalette