"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";

interface StreamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StreamDialog({ open, onOpenChange }: StreamDialogProps) {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("nhdhieuu went live!");
  const [isRerun, setIsRerun] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <div className="relative">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={140}
                className="pr-16"
                placeholder="123"
              />
              <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                {title.length}/140
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notification">Go Live Notification</Label>
            <div className="relative">
              <Input
                id="notification"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                maxLength={140}
                className="pr-16"
              />
              <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                {notification.length}/140
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for a category"
                className="pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Schedule</Label>
            <div className="relative">
              <Input
                type="text"
                className="pl-10"
                defaultValue="12 Dec 2024 20:00"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="rerun"
              checked={isRerun}
              onCheckedChange={(checked) => setIsRerun(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="rerun"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Rerun
              </label>
              <p className="text-sm text-muted-foreground">
                Let viewers know your stream was previously recorded. Failure to
                label Reruns leads to viewer confusion which damages trust.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#9333EA] hover:bg-[#7E22CE]">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
