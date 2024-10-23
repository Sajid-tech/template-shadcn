import Page from "../dashboard/page";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
//   FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
//   ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";

const BrandList = () => {
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://houseofonzone.com/admin/public/api/fetch-brand-list`,
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmQyNGQyYzIwY2I3NDAzZmVjZjdmZTY4ZDEzNWIxNTE4ZTE5OTVhOTUwYmNjNTEzMTg0NGEwM2NhZTM5MjYyMDBiY2QwZWMxM2Y0OGRjMWMiLCJpYXQiOjE3Mjk2NjUxNzcuMDE3MTc4MDU4NjI0MjY3NTc4MTI1LCJuYmYiOjE3Mjk2NjUxNzcuMDE3MTgyMTExNzQwMTEyMzA0Njg3NSwiZXhwIjoxNzYxMjAxMTc3LjAwODQ2MjkwNTg4Mzc4OTA2MjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.hLWh3nfZJXer1-a5FMs0q0kNd01DDpP8CUCHVn3RCkHPQj2NDa88_-6zXZSLMna6_TR2WMZJhoPLB1qHhImQtRnF1UZdeiEecMnagnu1Rg_q604uR93rSq0npimBckbBkOIehFcuY1UDMpCdpInChDHRYWLM7cMl0ERKq3_-wKybDdfkqjAgdI6CX-WzyFxa2R8ZkGtQVjz56x2iOcmAqrG-UOx5_e_Z6KGiluP6KtZh4XiZ6kmp5DVj9R5MkwPdMi_P-q6QCjRhzMB0mMBW5HGygltr38BG7Utr_b6JxCZ0gOro7LrtVv47zo2-BjgbLBUKZVimkGrsmmZTv7Yq8O5Lw-S0EhfqEi20jRlXR38i8RyU2vGPQOCG3yW1v2Atr-dEFlzKpVx2KqtooBc6e_tU1LLqsttoefFpBHGmnlIqUK9swopXnFwHR3eOUKao425N6pyzbr39nqKKc6h8MTxCh4K_fNrMLSStMyXjwMSrT9RCa1CmoHUxzK_shfdBjXTtw0wBq0MunPW_sCLO8iTjnrOyKSz5wUQM7-7w3OMJGcauPX3oMGafV4ZZ3lXLRUeKTv871Cop-LWVng69nPsy_gL8bffrIGAl4BZCC7fWFg-Wd1nkz-_FCiLUh268L1xoG1DxpbFBEzXZGB2fLE1m5LNyTDYyJHZ0R0F9Pg4`,
            },
          }
        );

        setBrandData(response.data?.brand || []);
      } catch (error) {
        console.error("Error fetching brand data", error);
        setBrandData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandData();
  }, []);

  const columns = [
    {
      accessorKey: "slNo",
      header: "SL No",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "fabric_brand_brands",
      header: ({ column }) => {
        return (
          <div className="text-left">
            <Button
              variant="ghost"
              onClick={() => {
                const currentOrder = column.getIsSorted();
                const sortedData = [...brandData].sort((a, b) => {
                  if (currentOrder === false || currentOrder === "desc") {
                    return a.fabric_brand_brands.localeCompare(b.fabric_brand_brands);
                  }
                  return b.fabric_brand_brands.localeCompare(a.fabric_brand_brands);
                });
                setBrandData(sortedData);
              }}
            >
              Brand
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "fabric_brand_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("fabric_brand_status");
        return (
          <div className={`font-medium ${status === 1 ? "text-green-600" : "text-red-600"}`}>
            {status === 1 ? "Active" : "Inactive"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log("Edit", brand)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => console.log("Delete", brand)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: brandData,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <Page>
        <div className="rounded-md border p-4">
          <p>Loading...</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Filter brands..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center space-x-2">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of {brandData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Page</span>
              <span className="text-sm font-medium">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BrandList;