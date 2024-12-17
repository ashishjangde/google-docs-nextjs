"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "convex/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface RenameDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
};

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
    const update = useMutation(api.document.updateById);
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();
    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);
 
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsUpdating(true);
      
      update({ id: documentId, title: title.trim() || "Untitled" })
        .then(() => {
          toast({ title: "Document updated successfully" });
          setOpen(false);
        })
        .catch(() => {
          toast({
            title: "Failed to update document",
            variant: "destructive"
          });
        })
        .finally(() => {
          setIsUpdating(false);
        });
    };
 
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Rename document</DialogTitle>
              <DialogDescription>
                Enter a new name for this document
              </DialogDescription>
            </DialogHeader>
            <div className="my-4" >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document name"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                disabled={isUpdating}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
 };