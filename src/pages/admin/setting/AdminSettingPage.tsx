"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockData = {
  data: [
    {
      id: "DCTGW47E37c5wA4",
      createdAt: "2024-12-15T04:48:06Z",
      updatedAt: "2024-12-15T04:49:08Z",
      name: "someone",
      value: "23422",
      status: 1,
    },
    {
      id: "DCTF1FCNGt6eAMv",
      createdAt: "2024-12-14T17:04:50Z",
      updatedAt: "2024-12-14T17:07:32Z",
      name: "123",
      value: {
        test: 123,
      },
      status: 1,
    },
    {
      id: "4DTyp8HG6RUSTt",
      createdAt: "2024-12-14T17:04:40Z",
      updatedAt: "2024-12-14T17:04:40Z",
      name: "test13",
      value: 22,
      status: 1,
    },
    {
      id: "4DRmrhwbXjwDUS",
      createdAt: "2024-12-14T17:04:30Z",
      updatedAt: "2024-12-14T17:04:30Z",
      name: "test1",
      value: {
        value: "text",
      },
      status: 1,
    },
    {
      id: "4DPZuKiusoVBfn",
      createdAt: "2024-12-14T17:01:16Z",
      updatedAt: "2024-12-14T17:01:16Z",
      name: "test",
      value: {
        value: "text",
      },
      status: 1,
    },
    {
      id: "4DN56Syeh36jU8",
      createdAt: "2024-12-14T10:37:03Z",
      updatedAt: "2024-12-14T10:37:03Z",
      name: "STREAM_RESOLUTION_SUPPORT",
      value: {
        supported: [180, 320, 720],
      },
      status: 1,
    },
    {
      id: "4ACFawbWenQG6t",
      createdAt: "2024-12-14T10:34:29Z",
      updatedAt: "2024-12-15T13:33:54Z",
      name: "STREAM_RESOLUTION_INFO",
      value: {
        "1080": {
          fps: {
            "30": {
              aBitRate: 192,
              vBitRate: 2500,
            },
            "60": {
              aBitRate: 192,
              vBitRate: 3000,
            },
          },
          height: 1080,
          width: 1920,
        },
        "180": {
          fps: {
            "30": {
              aBitRate: 48,
              vBitRate: 200,
            },
          },
          height: 180,
          width: 320,
        },
        "240": {
          fps: {
            "30": {
              aBitRate: 48,
              vBitRate: 500,
            },
          },
          height: 240,
          width: 426,
        },
        "360": {
          fps: {
            "30": {
              aBitRate: 48,
              vBitRate: 750,
            },
          },
          height: 360,
          width: 640,
        },
        "480": {
          fps: {
            "30": {
              aBitRate: 96,
              vBitRate: 1000,
            },
          },
          height: 480,
          width: 854,
        },
        "720": {
          fps: {
            "60": {
              aBitRate: 128,
              vBitRate: 2000,
            },
          },
          height: 720,
          width: 1280,
        },
      },
      status: 1,
    },
  ],
  paging: {
    limit: 10,
    page: 1,
    total: 7,
    cursor: "",
    next_cursor: "4ACFawbWenQG6t",
  },
  extra: {},
};

export function AdminSettingPage() {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };
  const formatValue = (value: object | string | number | boolean | null) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Setting Page</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {typeof item.value === "object" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleRowExpansion(item.id)}
                  >
                    {expandedRows.includes(item.id) ? "Collapse" : "Expand"}
                  </Button>
                ) : (
                  formatValue(item.value)
                )}
              </TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {mockData.data.map(
        (item) =>
          expandedRows.includes(item.id) &&
          typeof item.value === "object" && (
            <div
              key={`expanded-${item.id}`}
              className="mt-2 p-4 bg-gray-100 rounded"
            >
              <pre className="whitespace-pre-wrap">
                {formatValue(item.value)}
              </pre>
            </div>
          ),
      )}
      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-3">Paging Information</h2>
        <p>Limit: {mockData.paging.limit}</p>
        <p>Page: {mockData.paging.page}</p>
        <p>Total: {mockData.paging.total}</p>
        <p>Cursor: {mockData.paging.cursor || "N/A"}</p>
        <p>Next Cursor: {mockData.paging.next_cursor}</p>
      </div>
    </div>
  );
}
