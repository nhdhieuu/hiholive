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
import { SettingValueModal } from "@/pages/admin/setting/component/SettingValueModal.tsx";

export function AdminSettingPage() {
  const [paging, setPaging] = useState(1);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSetting, setCurrentSetting] = useState<Setting>();

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

  return (
    <div className="container px-2 py-2">
      <h1 className="text-2xl font-bold mb-5">Admin Setting Page</h1>
      <SettingValueModal
        isOpen={isOpen}
        onClose={setIsOpen}
        setting={currentSetting}
        refreshData={fetchSettingData}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Status</TableHead>
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
                  onClick={() => {
                    setCurrentSetting(item);
                    setIsOpen(true);
                  }}
                >
                  Open
                </Button>
              </TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              <TableCell>{item.status === 1 ? "Active" : "Inactive"}</TableCell>
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
