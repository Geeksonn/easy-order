import React from 'react';

import css from '@styles/dataTable.module.css';

const DataTable = ({
    headers,
    rows,
    primaryAction,
    secondaryAction,
    primaryActionName = 'edit',
    secondaryActionName = 'delete',
}) => {
    const buildHeading = () => {
        return (
            <thead>
                <tr>
                    {headers.map((h, i) => {
                        return (
                            <th key={i} className={css.headCell}>
                                {h === '_id' ? 'id' : h}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    };

    const buildRowCells = (row, index) => {
        return Object.values(row).map((r, i) => {
            return (
                <td key={'dt-' + i} className={css.cell}>
                    {i === 0 ? index : r}
                </td>
            );
        });
    };

    const buildRows = () => {
        return (
            <tbody>
                {rows.map((row, index) => {
                    return <tr key={index}>{buildRowCells(row, index)}</tr>;
                })}
            </tbody>
        );
    };

    return (
        <div className={css.tableWrapper}>
            <table>
                {buildHeading()}
                {buildRows()}
            </table>
        </div>
    );
};

export default DataTable;
