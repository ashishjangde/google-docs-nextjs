'use client';
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

  import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
 } from '@/components/ui/dialog';
  
export default function page() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          hello
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            hi
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // Prevent the menu from closing
            }}
          >
            <RenameDialog initialTitle={"hello"} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface RenameDialogProps {
  initialTitle: string;
}

const RenameDialog = ({ initialTitle }: RenameDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(initialTitle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Rename
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
        
        >
          <DialogTitle>Rename</DialogTitle>
          <div className="mt-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new name"
                autoFocus
              />
            </form>
          </div>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};