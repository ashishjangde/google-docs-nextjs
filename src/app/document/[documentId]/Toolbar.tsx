'use client';
import { cn } from '@/lib/utils';
import { BoldIcon, Italic, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo, RemoveFormattingIcon, SpellCheckIcon, Underline, Undo } from 'lucide-react';
import React from 'react';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className='size-4' />
    </button>
  );
};

export default function Toolbar() {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false
      },
      {
        label: 'Redo',
        icon: Redo,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
        isActive: false
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true');
        },
        isActive: false
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold') || false
      },
      {
        label: 'Italic',
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic') || false
      },
      {
        label: 'Underline',
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive('underline') || false
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        onClick: () => { console.log('Comment') },
        isActive: false
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive('taskList') || false
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: false
      }
    ]
  ];

  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Font Family Selector */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Heading Selector */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Font Size Selector */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Text Color Picker */}
      {/* TODO: Add Highlight Color Picker */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Link Button */}
      {/* TODO: Add Image Button */}
      {/* TODO: Add Alignment Options */}
      {/* TODO: Add Line Height Selector */}
      {/* TODO: Add List Options */}
      {sections[2].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}
    </div>
  );
}
