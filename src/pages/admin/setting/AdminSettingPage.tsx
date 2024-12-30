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
import { Button } from "@/components/ui/button";
import { Setting } from "@/types/setting";
import { getAdminSetting } from "@/pages/admin/setting/api/adminSettingApi.ts";

export function AdminSettingPage() {
  const [paging, setPaging] = useState(1);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  async function fetchSettingData() {
    try {
      const response = await getAdminSetting(paging);
      console.log("response: ", response);
      setSettings(response.data);
    } catch (e) {
      console.error("Failed to fetch setting data: ", e);
    }
  }

  useEffect(() => {
    fetchSettingData();
  }, [paging]);

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const formatValue = (value: object): string => {
    return JSON.stringify(value, null, 2);
  };

  return (
    <div className="container px-2 py-2">
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
          {settings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRowExpansion(item.id)}
                >
                  {expandedRows.includes(item.id) ? "Collapse" : "Expand"}
                </Button>
              </TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              <TableCell>{item.status === 1 ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {settings.map(
        (item) =>
          expandedRows.includes(item.id) && (
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
