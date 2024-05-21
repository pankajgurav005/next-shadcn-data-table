"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface paginationProps {
  count: number
}

export function PaginationTemplate({ count = 100 } : paginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = Object.fromEntries(searchParams)
  const pathname = usePathname();
  const pageSize = 20;
  const numPages = Math.ceil(count / pageSize);
  const pagination = [];
  for (let i = 0; i < numPages; i++) {
      pagination.push({
          page: i + 1,
          limit: pageSize,
          skip: ((((i + 1)) * pageSize) - pageSize) > 0 ? (((i + 1) * pageSize) - pageSize) : 0,
      });
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={() => {
            if (Number(search.skip) > 0) {
              router.push(`${pathname}?skip=${Number(search.skip) - pageSize}&limit=${search.limit}`)
            }
          }} />
        </PaginationItem>
        {pagination.map((itm) => {
          // if (itm.page === 3) {
          //   return(
          //     <PaginationItem>
          //       <PaginationEllipsis />
          //     </PaginationItem>
          //   )
          // }

          // if(itm.page >= 4) {
          //   return(<></>)
          // }

          return(
            <PaginationItem key={itm.page}>
              <PaginationLink className="cursor-pointer" onClick={() => router.push(`${pathname}?skip=${itm.skip}&limit=${itm.limit}`)}>{ itm.page }</PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={() => {
            if (Number(search.skip) < (count - pageSize)) {
              router.push(`${pathname}?skip=${Number(search.skip) + pageSize}&limit=${search.limit}`)
            }
          }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
