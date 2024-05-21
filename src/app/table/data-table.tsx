"use client"
import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { paginationTemplate } from "../_components/paginations"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  total,
}: DataTableProps<TData, TValue>) {
  const [filterColName, setFilterColName] = React.useState('email');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = Object.fromEntries(searchParams);
  const skip: number = search?.skip ? Number(search.skip) : 0;
  const limit: number = search?.limit ? Number(search.limit) : search?.skip ? (skip + 30) : 30;

  let skipInc: number = skip > 0 ? (Number(skip) + 30) : 0;
  let limitInc: number = skip > 0 ? (Number(limit) + 30) : 30;

  const [{ skip1, limit1 }, setPagination] = React.useState({
    skip1: skipInc,
    limit1: limitInc,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
    manualPagination: true
  });

  const colData = table.getAllColumns().map((itm) => {
    return { value: itm.id, text: itm.id };
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <div>
          <Input
            placeholder={`Filter by ${filterColName}...`}
            value={(table.getColumn(filterColName)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filterColName)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div>
          <Select onValueChange={(value) => { console.log(value); setFilterColName(value) }}>
            <SelectTrigger className="w-[180px] ml-2">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                {colData.map((itm) => {
                  return (
                    <SelectItem key={itm.value} value={itm.value}>{itm.text}</SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <paginationTemplate count={total} />
      </div>
    </div>
  )
}
