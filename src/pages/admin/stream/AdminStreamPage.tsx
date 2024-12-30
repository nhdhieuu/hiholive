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
import { Stream } from "@/types/stream";
import { getAdminStreams } from "@/pages/admin/stream/api/adminStreamApi.ts";

export default function AdminStreamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paging, setPaging] = useState(1);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Stream;
    direction: "asc" | "desc";
  } | null>(null);

  async function fetchStreams() {
    try {
      const response = await getAdminStreams(paging);
      console.log("response: ", response);
      setStreams(response.data);
    } catch (error) {
      console.error("Failed to fetch streams: ", error);
    }
  }

  useEffect(() => {
    fetchStreams();
  }, [paging]);

  useEffect(() => {
    const filteredStreams = streams.filter(
      (stream) =>
        stream.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stream.channel.displayName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        stream.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stream.category?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        stream.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setStreams(filteredStreams);
  }, [searchTerm]);

  const handleSort = (key: keyof Stream) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedStreams = [...streams].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setStreams(sortedStreams);
  };

  const renderSortIcon = (key: keyof Stream) => {
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
    <div className="container px-2 py-2">
      <h1 className="text-2xl font-bold mb-5">Admin Stream Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search streams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Title {renderSortIcon("title")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("channel")}
            >
              Channel {renderSortIcon("channel")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Category {renderSortIcon("category")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("currentView")}
            >
              Current Views {renderSortIcon("currentView")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("state")}
            >
              State {renderSortIcon("state")}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Created At {renderSortIcon("createdAt")}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {streams.map((stream) => (
            <TableRow key={stream.id}>
              <TableCell className="font-medium">{stream.id}</TableCell>
              <TableCell>{stream.title}</TableCell>
              <TableCell>{stream.channel.displayName}</TableCell>
              <TableCell>{stream.category?.name || "N/A"}</TableCell>
              <TableCell>{stream.currentView}</TableCell>
              <TableCell>{stream.state}</TableCell>
              <TableCell>
                {new Date(stream.createdAt).toLocaleDateString()}
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
                      onClick={() => navigator.clipboard.writeText(stream.id)}
                    >
                      Copy stream ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View stream details</DropdownMenuItem>
                    <DropdownMenuItem>Edit stream</DropdownMenuItem>
                    <DropdownMenuItem>End stream</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPaging((prev) => Math.max(prev - 1, 1))}
          disabled={paging === 1}
        >
          Previous
        </Button>
        <span>Page {paging}</span>
        <Button onClick={() => setPaging((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
