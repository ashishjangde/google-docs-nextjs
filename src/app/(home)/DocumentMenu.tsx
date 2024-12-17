import React from 'react'

import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import RemoveDialog from '@/components/RemoveDialog';
import { RenameDialog } from '@/components/RenameDialog';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc, Id } from '../../../convex/_generated/dataModel';

interface DocumentMenuProps {
    documentId: Doc<"documents">["_id"]
    title: string
    onNewTab: (id: Id<"documents">) => void;
}

export default function  DocumentMenu({
    documentId,
    title,
    onNewTab
}: DocumentMenuProps) {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <RenameDialog documentId={documentId} initialTitle={title}>
              <DropdownMenuItem
                 onSelect={(e) => e.preventDefault()}
                 onClick={(e) => e.stopPropagation()}
              >
                <FilePenIcon className="size-4 mr-2" />
                Rename
              </DropdownMenuItem>
            </RenameDialog>
            <RemoveDialog documentId={documentId}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}
              >
                <TrashIcon className="size-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </RemoveDialog>
            <DropdownMenuItem
              onClick={() => onNewTab(documentId)}
            >
              <ExternalLinkIcon className="size-4 mr-2" />
              Open in a new tab
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}