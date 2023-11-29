import { Color, colors } from '@/styles/theme';
import React, { FC } from 'react';
import colorUtils from 'color';

type ColorSwatchProps = {
    color: string;
    variation?: string;
    fontColor: 'white' | 'black';
};

export const ColorSwatch: FC<ColorSwatchProps> = ({
    color,
    variation,
    fontColor,
}) => {
    return (
        <div style={{ display: 'inline-block' }}>
            <div
                style={{
                    backgroundColor: `${color}`,
                    width: ' calc(4.5rem + 1.25vw)',
                    height: 'calc(4.5rem + 1.25vw)',
                    marginRight: ' 0.125rem',
                    borderRadius: ' 0.25rem',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: `${fontColor}`,
                }}
            >
                {`${color.toUpperCase()}`}
            </div>
            {variation && <h5>{variation}</h5>}
        </div>
    );
};

type ColorPaletteProps = {
    color: Color;
};

export const ColorPalette: FC<ColorPaletteProps> = ({ color }) => {
    const noVariations = color === 'black' || color === 'white';

    return (
        <div style={{}}>
            {noVariations ? (
                <ColorSwatch
                    color={colors[color]}
                    fontColor={color === 'white' ? 'black' : 'white'}
                />
            ) : (
                Object.keys(colors[color]).map((variation) => {
                    const hexDecCode = colors[color][variation];
                    const colorRef = colorUtils(hexDecCode);
                    const contrast = colorRef.contrast(colorUtils('white'));

                    return (
                        <ColorSwatch
                            key={`${hexDecCode}`}
                            color={hexDecCode}
                            variation={variation}
                            // Minimum contrast ratio following WCAG - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
                            fontColor={contrast >= 4.5 ? 'white' : 'black'}
                        />
                    );
                })
            )}
        </div>
    );
};
