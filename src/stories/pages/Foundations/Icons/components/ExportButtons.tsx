import React, { FC, useState, useEffect } from 'react';
import { Button } from '@/stories/components/Button';

type DownloadButtonProps = {
    iconName: string;
    componentCode: string;
};
export const DownloadButton: FC<DownloadButtonProps> = ({
    iconName,
    componentCode,
}) => {
    const downloadSVG = (code: string, fileName: string) => {
        const xmlDeclaration = '<?xml version="1.0" standalone="no"?>\r\n';
        const component = xmlDeclaration + code;
        const url =
            'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(component);
        const $link = window.document.createElement('a');

        $link.href = url;
        $link.download = `${fileName}.svg`;
        document.body.appendChild($link);
        $link.click();
        document.body.removeChild($link);
    };

    return (
        <Button onClick={() => downloadSVG(componentCode, iconName)}>
            Download SVG
        </Button>
    );
};

type CopyButtonProps = {
    componentCode: string;
};
export const CopyButton: FC<CopyButtonProps> = ({ componentCode }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(componentCode);
                setCopied(true);
            }}
        >
            {copied ? 'Copied' : 'Copy SVG'}
        </Button>
    );
};

type ExportButtonsProps = {
    iconName: string;
    componentCode: string;
};
export const ExportButtons: FC<ExportButtonsProps> = ({
    iconName,
    componentCode,
}) => {
    return (
        <div
            className="grid-cols-none md:grid-cols-2"
            style={{
                paddingTop: '16px',
                paddingBottom: '16px',
                display: 'grid',
                gridGap: '16px',
            }}
        >
            <CopyButton componentCode={componentCode} />
            <DownloadButton iconName={iconName} componentCode={componentCode} />
        </div>
    );
};
