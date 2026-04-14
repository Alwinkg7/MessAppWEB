import React from "react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
}

export function DataTable<T>({ data, columns, keyExtractor }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border-[3px] border-border-color rounded-sm shadow-brutal bg-theme-card">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-theme-primary border-b-[3px] border-border-color border-opacity-100">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="px-4 py-3 font-heading font-black text-sm uppercase tracking-wider text-brutal-border border-r-[3px] border-border-color last:border-r-0 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-body">
          {data.map((item, rowIndex) => (
            <tr 
              key={keyExtractor(item)} 
              className="border-b-[3px] border-border-color last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {columns.map((col, colIndex) => (
                <td 
                  key={colIndex} 
                  className="px-4 py-4 text-sm border-r-[3px] border-border-color last:border-r-0 whitespace-nowrap md:whitespace-normal"
                >
                  {col.cell ? col.cell(item) : (item as any)[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center font-bold text-gray-700 uppercase tracking-widest">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
