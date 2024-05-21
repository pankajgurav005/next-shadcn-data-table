import { Button } from "@/components/ui/button";
import { type Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";

// interface columnProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
//   column: Column<TData, TValue>[]
//   title: TValue
// }

interface columnProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnHeader<TData, TValue>({ column, title }: columnProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {(column.getIsSorted() === "asc") ? (<ArrowUpDown className="ml-2 h-4 w-4" />) : (<ArrowDownUp className="ml-2 h-4 w-4" />) }
    </Button>
  )
}