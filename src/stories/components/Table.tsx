import React, { FC, ReactNode } from 'react';

type TableHeaderCellProps = {
    value: string;
};
export const TableHeaderCell: FC<TableHeaderCellProps> = ({ value }) => {
    return (
        <th
            style={{
                borderBottom: '1px solid #cdcdcd',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                padding: '0.75rem',
            }}
        >
            <div style={{ textAlign: 'left', wordWrap: 'break-word' }}>
                {value}
            </div>
        </th>
    );
};

type TableDataCellProps = {
    value: string;
};
export const TableDataCell: FC<TableDataCellProps> = ({ value }) => {
    return (
        <td
            style={{
                borderTop: '1px solid #cdcdcd',
                borderBottom: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                padding: '0.75rem',
                backgroundColor: '#fff',
            }}
        >
            <div style={{ textAlign: 'left', wordWrap: 'break-word' }}>
                {value}
            </div>
        </td>
    );
};

type TableRowProps = {
    children: ReactNode;
};
export const TableRow: FC<TableRowProps> = ({ children }) => {
    return <tr style={{ borderTop: 'none' }}>{children}</tr>;
};

type TableProps<T extends string> = {
    headers: {
        [columnKey in T]: string;
    };
    rows: {
        id: string;
        cells: {
            [columnKey in T]: string | ReactNode;
        };
    }[];
};
export const Table = <T extends string>({ headers, rows }: TableProps<T>) => {
    return (
        <div
            style={{
                padding: '2rem',
                borderRadius: '0.5rem',
                borderWidth: '0.125rem',
                borderColor: 'rgb(208, 215, 222)',
            }}
        >
            <div style={{ overflow: 'auto' }}>
                <table
                    style={{
                        width: '100%',
                        isolation: 'isolate',
                        borderSpacing: '0',
                        borderCollapse: 'separate',
                        margin: '0',
                    }}
                >
                    <thead>
                        <TableRow>
                            {Object.keys(headers).map((headerKey) => {
                                const header = headers[headerKey];
                                return (
                                    <TableHeaderCell
                                        key={headerKey}
                                        value={header}
                                    />
                                );
                            })}
                        </TableRow>
                    </thead>
                    <tbody>
                        {rows.map(({ id, cells }) => (
                            <TableRow key={id}>
                                {Object.keys(cells).map((cellKey) => {
                                    const value = cells[cellKey];
                                    return (
                                        <TableDataCell
                                            key={cellKey}
                                            value={value}
                                        />
                                    );
                                })}
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
