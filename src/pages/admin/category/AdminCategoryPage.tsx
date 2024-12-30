"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, MoreHorizontal, Plus } from "lucide-react";

interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  image: {
    id: number;
    url: string;
    width: number;
    height: number;
    cloud_name: string;
    extension: string;
  };
  status: number;
  totalContent: number;
}

interface PagingInfo {
  limit: number;
  page: number;
  total: number;
  cursor: string;
  next_cursor: string;
}

const mockData = {
  data: [
    {
      id: "3mHP8w6PgAi8Sz",
      createdAt: "2024-12-28T13:26:46Z",
      updatedAt: "2024-12-28T08:53:22Z",
      name: "Just chatting",
      description: "HEHE",
      image: {
        id: 0,
        url: "https://static.hiholive.fun/category_image/937229338.jpg",
        width: 272,
        height: 380,
        cloud_name: "s3",
        extension: ".jpg",
      },
      status: 1,
      totalContent: 7,
    },
    {
      id: "iUwsZ9sqt1m2",
      createdAt: "2024-12-28T13:24:58Z",
      updatedAt: "2024-12-28T13:24:58Z",
      name: "Genshin Impact",
      description: "Are you a wibu??",
      image: {
        id: 0,
        url: "https://static.hiholive.fun/avatar/647248237.jpg",
        width: 1280,
        height: 720,
        cloud_name: "s3",
        extension: ".jpg",
      },
      status: 1,
      totalContent: 0,
    },
    {
      id: "gGzTDy4u6f9e",
      createdAt: "2024-12-28T13:23:41Z",
      updatedAt: "2024-12-29T09:11:56Z",
      name: "Valorant",
      description: "Trash game too",
      image: {
        id: 0,
        url: "https://static.hiholive.fun/avatar/794491342.jpeg",
        width: 275,
        height: 183,
        cloud_name: "s3",
        extension: ".jpeg",
      },
      status: 1,
      totalContent: 32,
    },
    {
      id: "e5351HQxedGk",
      createdAt: "2024-12-28T13:20:10Z",
      updatedAt: "2024-12-28T06:21:03Z",
      name: "league of legend",
      description: "Trash game",
      image: {
        id: 0,
        url: "https://static.hiholive.fun/avatar/124348175.png",
        width: 1439,
        height: 541,
        cloud_name: "s3",
        extension: ".png",
      },
      status: 1,
      totalContent: 0,
    },
  ],
  paging: {
    limit: 10,
    page: 1,
    total: 4,
    cursor: "",
    next_cursor: "e5351HQxedGk",
  },
  extra: {},
};

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>(mockData.data);
  const [paging] = useState<PagingInfo>(mockData.paging);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Category;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const filteredCategories = mockData.data.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCategories(filteredCategories);
  }, [searchTerm]);

  const handleSort = (key: keyof Category) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedCategories = [...categories].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setCategories(sortedCategories);
  };

  const renderSortIcon = (key: keyof Category) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className=" container px-2 py-2">
      <h1 className="text-2xl font-bold mb-5">Admin Category Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Category
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {renderSortIcon("name")}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("totalContent")}
            >
              Total Content {renderSortIcon("totalContent")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Created At {renderSortIcon("createdAt")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status {renderSortIcon("status")}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <img
                  src={category.image.url}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.totalContent}</TableCell>
              <TableCell>
                {new Date(category.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {category.status === 1 ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(category.id)}
                    >
                      Copy category ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit category</DropdownMenuItem>
                    <DropdownMenuItem>View content</DropdownMenuItem>
                    <DropdownMenuItem>Delete category</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {paging.page} to{" "}
          {Math.min(paging.page * paging.limit, paging.total)} of {paging.total}{" "}
          categories
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Implement previous page logic */
            }}
            disabled={paging.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Implement next page logic */
            }}
            disabled={paging.page * paging.limit >= paging.total}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
