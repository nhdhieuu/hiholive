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
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  phone_number: string;
  address: string;
  first_name: string;
  last_name: string;
  display_name: string;
  date_of_birth: string;
  gender: string;
  SystemRole: string;
  avatar: string | null;
  bio: string;
  status: number;
}

const mockData = {
  data: [
    {
      id: "3w5rMFyrnAbduY",
      createdAt: "2024-12-26T08:12:51Z",
      updatedAt: "2024-12-26T08:23:35Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "streamer7+kFQIq",
      date_of_birth: "",
      gender: "other",
      SystemRole: "streamer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3w4MYPEbhfVWdv",
      createdAt: "2024-12-26T13:23:54Z",
      updatedAt: "2024-12-26T13:23:54Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "streamer5+pSBZm",
      date_of_birth: "",
      gender: "other",
      SystemRole: "viewer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3stY2uxxbtZiHa",
      createdAt: "2024-12-26T13:23:14Z",
      updatedAt: "2024-12-26T13:23:14Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "viewer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3srL5VdmuD51Fn",
      createdAt: "2024-12-26T12:56:56Z",
      updatedAt: "2024-12-26T06:12:38Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "streamer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3spqRwaipTug98",
      createdAt: "2024-12-26T12:29:22Z",
      updatedAt: "2024-12-26T12:29:22Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "viewer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3pf1vSCanEe9xi",
      createdAt: "2024-12-26T05:14:21Z",
      updatedAt: "2024-12-26T05:23:06Z",
      phone_number: "",
      address: "",
      first_name: "cao",
      last_name: "Hoang",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "viewer",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3pcoy3yu21VAqE",
      createdAt: "2024-12-23T07:12:53Z",
      updatedAt: "2024-12-23T07:12:53Z",
      phone_number: "",
      address: "",
      first_name: "duy",
      last_name: "duy",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3pbKA988nW3ikt",
      createdAt: "2024-12-23T07:09:30Z",
      updatedAt: "2024-12-23T07:09:30Z",
      phone_number: "",
      address: "",
      first_name: "Huy",
      last_name: "huy",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3pZ7CktyNpqVn8",
      createdAt: "2024-12-23T07:07:10Z",
      updatedAt: "2024-12-23T07:07:10Z",
      phone_number: "",
      address: "",
      first_name: "Hoang",
      last_name: "hoang",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "",
      avatar: null,
      bio: "",
      status: 1,
    },
    {
      id: "3mPHhHdp2nftbt",
      createdAt: "2024-12-23T07:03:10Z",
      updatedAt: "2024-12-23T07:03:10Z",
      phone_number: "",
      address: "",
      first_name: "Huy",
      last_name: "Bui",
      display_name: "",
      date_of_birth: "",
      gender: "other",
      SystemRole: "",
      avatar: null,
      bio: "",
      status: 1,
    },
  ],

  extra: {},
};

export function AdminUserPage() {
  const [users, setUsers] = useState<User[]>(mockData.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const filteredUsers = mockData.data.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.SystemRole.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setUsers(filteredUsers);
  }, [searchTerm]);

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const renderSortIcon = (key: keyof User) => {
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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin User Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add New User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("first_name")}
            >
              First Name {renderSortIcon("first_name")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("last_name")}
            >
              Last Name {renderSortIcon("last_name")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("display_name")}
            >
              Display Name {renderSortIcon("display_name")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("SystemRole")}
            >
              Role {renderSortIcon("SystemRole")}
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.display_name}</TableCell>
              <TableCell>{user.SystemRole}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.status === 1 ? "Active" : "Inactive"}</TableCell>
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
                      onClick={() => navigator.clipboard.writeText(user.id)}
                    >
                      Copy user ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View user details</DropdownMenuItem>
                    <DropdownMenuItem>Edit user</DropdownMenuItem>
                    <DropdownMenuItem>Delete user</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
