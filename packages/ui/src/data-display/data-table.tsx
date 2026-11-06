import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
} from 'lucide-react';
import { GlassCard } from '../primitives/glass-card';
import { GlassButton } from '../primitives/glass-button';
import { cn } from '../utils/cn';

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  idField?: keyof T;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (columnKey: string) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: () => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (newPage: number) => void;
  toolbar?: React.ReactNode;
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  idField = 'id' as keyof T,
  sortColumn,
  sortDirection = 'asc',
  onSort,
  selectable = false,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  toolbar,
  loading = false,
  emptyMessage = 'No records found.',
  className,
}: DataTableProps<T>) {
  const total = totalItems !== undefined ? totalItems : data.length;
  const totalPages = Math.ceil(total / pageSize);
  const isAllSelected =
    data.length > 0 &&
    data.every((row) => selectedIds.includes(String(row[idField])));

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <GlassCard padding="md" variant="default" className={cn('flex flex-col', className)}>
      {/* Optional Toolbar */}
      {toolbar}

      {/* Table Container */}
      <div className="relative overflow-x-auto rounded-xl border border-slate-200/60 dark:border-white/10 glass-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          {/* Header */}
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200/70 dark:border-white/10">
            <tr>
              {selectable && (
                <th scope="col" className="w-10 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                    aria-label="Select all rows"
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortColumn === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width }}
                    className={cn(
                      'px-4 py-3.5 select-none font-semibold',
                      alignClasses[col.align || 'left'],
                      col.sortable &&
                        'cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors'
                    )}
                    onClick={() => col.sortable && onSort?.(col.key)}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        col.align === 'right' && 'justify-end',
                        col.align === 'center' && 'justify-center'
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-xs">Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-10 text-center text-slate-400 dark:text-slate-500 text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const rowId = String(row[idField] || idx);
                const isSelected = selectedIds.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      'transition-colors duration-100',
                      isSelected
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/30'
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectRow?.(rowId)}
                          aria-label={`Select row ${rowId}`}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3 text-slate-700 dark:text-slate-300 font-normal',
                          alignClasses[col.align || 'left']
                        )}
                      >
                        {col.cell ? col.cell(row, idx) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {total === 0 ? 0 : (page - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {Math.min(page * pageSize, total)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {total}
            </span>{' '}
            records
          </div>

          <div className="flex items-center gap-1.5">
            <GlassButton
              variant="outline"
              size="xs"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
            </GlassButton>
            <span className="px-2 font-medium text-slate-700 dark:text-slate-300">
              Page {page} of {totalPages}
            </span>
            <GlassButton
              variant="outline"
              size="xs"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </GlassButton>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

