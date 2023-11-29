import React, { FC, ReactNode } from 'react';

type IconViewerProps = {
    children: ReactNode;
};
export const IconViewer: FC<IconViewerProps> = ({ children }) => {
    const [zoom, setZoom] = React.useState(10);

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    borderColor: 'rgb(208, 215, 222)',
                    borderWidth: '1px',
                    borderRadius: '6px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '25rem',
                        backgroundImage: `${gridGradient(
                            0,
                            getGridSize(zoom),
                            'rgba(27, 31, 36, 0.15)',
                        )}, ${gridGradient(
                            90,
                            getGridSize(zoom),
                            'rgba(27, 31, 36, 0.15)',
                        )}`,
                        backgroundSize: `${getGridSize(zoom)}px ${getGridSize(
                            zoom,
                        )}px`,
                        backgroundPosition: 'center center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            transform: `scale(${zoom})`,
                            boxShadow: `0 0 0 ${1 / zoom}px black`,
                        }}
                    >
                        {children}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            left: '0px',
                            right: '0px',
                            bottom: '0px',
                        }}
                    >
                        <div
                            className="w-full md:w-60"
                            style={{
                                display: 'grid',
                                gridGap: 2,
                                gridTemplateColumns: '1fr 48px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                padding: '16px',
                            }}
                        >
                            <input
                                type="range"
                                aria-label="zoom"
                                name="zoom"
                                min="1"
                                max="24"
                                step="0.5"
                                value={zoom}
                                onChange={({ target }) =>
                                    setZoom(parseFloat(target.value))
                                }
                                style={{
                                    width: '100%',
                                    padding: 0,
                                    margin: 0,
                                }}
                            />
                            <span
                                style={{
                                    display: 'inline-flex',
                                    color: 'rgb(36, 41, 47)',
                                }}
                            >
                                {zoom * 100}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function gridGradient(angle: number, size: number, color: string) {
    // WebKit browsers do not support the "transparent" keyword in gradients.
    // As a workaround, we convert `color` to rgba with an alpha value of 0.
    const transparent = 'rgba(255,255,255,0)';
    return `linear-gradient(${angle}deg, ${transparent}, ${transparent} ${Math.floor(
        size / 2,
    )}px, ${color}, ${transparent} ${Math.floor(size / 2) + 1}px)`;
}

function getGridSize(zoom: number) {
    if (zoom > 8) {
        return zoom;
    }

    if (zoom > 4) {
        return zoom * 2;
    }

    if (zoom > 2) {
        return zoom * 6;
    }

    return zoom * 12;
}
