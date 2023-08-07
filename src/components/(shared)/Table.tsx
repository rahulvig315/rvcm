'use client';
import React from 'react';
import {
  useReactTable,
  Column,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export type HTMLTableElementClasses = {
  wrapper?: string;
  table?: string;
  thead?: string;
  trHead?: string;
  th?: string;
  tbody?: string;
  trBody?: string;
  td?: string;
  tfoot?: string;
  trFoot?: string;
  thFoot?: string;
};

export const defaultTableClasses = {
  wrapper: 'text-xs w-[85vw] h-[80vh] overflow-auto flex flex-col pb-16 ',
  table: 'table-auto w-full m-auto text-left',
  thead: 'w-screen sticky top-0',
  trHead: 'bg-[#000]/80 backdrop-blur-sm w-full uppercase',
  th: 'p-3 font-light tracking-widest',
  tbody: 'divide-y divide-[#132] flex-1',
  trBody: 'even:bg-[#222] w-full',
  td: 'p-3 font-extralight break-all',
  tfoot: '',
  trFoot: '',
  thFoot: '',
};

export type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  classes?: HTMLTableElementClasses;
};

function Table<T extends object>({
  columns,
  data,
  classes = defaultTableClasses,
}: TableProps<T>) {
  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead className={classes.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={classes.trHead}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={classes.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={classes.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={classes.trBody}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={classes.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className={classes.tfoot}>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className={classes.trFoot}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={classes.thFoot}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
