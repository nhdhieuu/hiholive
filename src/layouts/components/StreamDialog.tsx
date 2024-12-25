"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DatePickerComponent } from "@/components/DatePickerComponent.tsx";
import {
  createStream,
  CreateStreamRequest,
} from "@/layouts/api/createStream.ts";
import { StreamInfoModal } from "@/layouts/components/StreamInfoModal.tsx";

interface StreamDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function StreamDialog({ isOpen, onOpenChange }: StreamDialogProps) {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("nhdhieuu went live!");
  const [description, setDescription] = useState("");
  const [isRerun, setIsRerun] = useState<boolean>(false);
  const [streamKey, setStreamKey] = useState<string>("");
  const [rtmpLink, setRtmpLink] = useState<string>("");
  const [showStreamInfoModal, setShowStreamInfoModal] =
    useState<boolean>(false);
  async function onSubmitCreateStream() {
    try {
      const payload: CreateStreamRequest = {
        title: title,
        description: description,
        notification: notification,
        scheduledStartTime: new Date(), // Thay đổi điều này theo DatePickerComponent
        isRerun: isRerun,
      };

      const response = await createStream(payload);
      console.log(response.data);

      // Set streamKey and rtmpLink from the response
      setStreamKey(response.data.streamKey);
      setRtmpLink(response.data.rtmpLink);

      // Show the Stream Info Modal
      setShowStreamInfoModal(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              <Label htmlFor="description">Description</Label>
              <div className="relative">
                <Input
                  id="title"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              <Label>Schedule</Label>
              <div className="relative">
                <DatePickerComponent />
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
                  className="text-sm font-medium leading-none"
                >
                  Rerun
                </label>

                <p className="text-sm text-muted-foreground">
                  Let viewers know your stream was previously recorded. Failure
                  to label Reruns leads to viewer confusion which damages trust.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                console.log(open);
                onOpenChange(false);
                console.log(open);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={onSubmitCreateStream}
              className="bg-[#9333EA] hover:bg-[#7E22CE]"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <StreamInfoModal
        open={showStreamInfoModal}
        onOpenChange={setShowStreamInfoModal}
        streamKey={streamKey}
        rtmpLink={rtmpLink}
      />
    </div>
  );
}
