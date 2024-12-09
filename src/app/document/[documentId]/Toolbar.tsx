'use client';
import { cn } from '@/lib/utils';
import { BoldIcon, Italic, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo, RemoveFormattingIcon, SpellCheckIcon, Underline, Undo, ChevronDownIcon, Palette, Type, HighlighterIcon } from 'lucide-react';
import React, {  useEffect, useState } from 'react';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {type Level }from '@tiptap/extension-heading';
import {ChromePicker, type ColorResult }from 'react-color';
;


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

const ToolBarImageUpload = () => {
  
}

const COLOR_PALETTE = [
  '#000000', 
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF6600', // Orange
  '#800080', // Purple
];

const ToolbarTextColorPicker = () => {
  const { editor } = useEditorStore();
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    const color = editor?.getAttributes("textColor")?.color || "#000000";
    setCurrentColor(color);
  }, [editor]);

  const handleColorSelect = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setCurrentColor(color);
  };

  const handleCustomColorChange = (color: ColorResult) => {
    const newColor = color.hex;
    editor?.chain().focus().setColor(newColor).run();
    setCurrentColor(newColor);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-9 min-w-10 flex flex-col items-center justify-between 
            text-sm rounded-sm hover:bg-neutral-100
            border-none outline-none"
        >
          <span className="truncate text-lg">
            A
          </span>
          <div
            className="w-8 h-[4.3px] border"
            style={{ 
              backgroundColor: currentColor
            }}
          />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="bg-white shadow-lg border border-neutral-300 
        min-w-[200px] p-3 rounded-sm"
        align="start"
      >
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {COLOR_PALETTE.map((color) => (
            <DropdownMenuItem asChild key={color}>
              <button
                onClick={() => handleColorSelect(color)}
                className="w-6 h-6 rounded-full hover:scale-110 
                transition-transform border border-neutral-200"
                style={{
                  backgroundColor: color,
                  boxShadow: currentColor === color 
                    ? "0 0 0 2px blue" 
                    : "none",
                }}
              />
            </DropdownMenuItem>
          ))}
        </div>
        
        {/* Custom Color Picker */}
        <div className="flex justify-center">
          <ChromePicker
            color={currentColor}
            onChange={handleCustomColorChange}
            disableAlpha={true}
            styles={{
              default: {
                picker: {
                  boxShadow: "none",
                  width: "100%",
                },
              },
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarHighlightColorPicker = () => {
  const { editor } = useEditorStore();
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  useEffect(() => {
    const color = editor?.getAttributes("highlight")?.color || "#FFFFFF";
    setCurrentColor(color);
  }, [editor]);

  const handleColorSelect = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run();
    setCurrentColor(color);
  };

  const handleCustomColorChange = (color: ColorResult) => {
    const newColor = color.hex;
    editor?.chain().focus().setHighlight({ color: newColor }).run();
    setCurrentColor(newColor);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-9 min-w-10 flex flex-col items-center justify-between 
            text-sm rounded-sm hover:bg-neutral-100
            border-none outline-none"
        >
          <HighlighterIcon size={20} />
          <div
            className="w-8 h-[4.3px] border"
            style={{ 
              backgroundColor: currentColor
            }}
          />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="bg-white shadow-lg border border-neutral-300 
        min-w-[200px] p-3 rounded-sm"
        align="start"
      >
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {COLOR_PALETTE.map((color) => (
            <DropdownMenuItem asChild key={color}>
              <button
                onClick={() => handleColorSelect(color)}
                className="w-6 h-6 rounded-full hover:scale-110 
                transition-transform border border-neutral-200"
                style={{
                  backgroundColor: color,
                  boxShadow: currentColor === color 
                    ? "0 0 0 2px blue" 
                    : "none",
                }}
              />
            </DropdownMenuItem>
          ))}
        </div>
        
        {/* Custom Color Picker */}
        <div className="flex justify-center">
          <ChromePicker
            color={currentColor}
            onChange={handleCustomColorChange}
            disableAlpha={true}
            styles={{
              default: {
                picker: {
                  boxShadow: "none",
                  width: "100%",
                },
              },
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const ToolbarHeadingDropdown = () => {
  const { editor } = useEditorStore();
  
  const headings = [
    { label: 'Paragraph', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
    { label: 'Heading 6', value: 6, fontSize: '14px' }
  ];

  const currentHeading = editor?.getAttributes('heading')?.level || 0;


  const currentHeadingLabel = headings.find(h => h.value === currentHeading)?.label || 'Paragraph';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-9 min-w-[120px] max-w-[180px] flex items-center justify-between 
          px-2 py-1 text-sm rounded-sm hover:bg-neutral-100 
          border-none outline-none "
        >
          <span 
            className="truncate mr-2 text-sm" 
           
          >
            {currentHeadingLabel}
          </span>
          <ChevronDownIcon className="size-4 text-neutral-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white shadow-lg border border-neutral-300 
        min-w-[180px] p-1 rounded-sm"
        align="start"
      >
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem 
            key={value}
            onSelect={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().setHeading({ level: value as Level }).run();
              }
            }}
            className={cn(
              'flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer',
              'hover:bg-neutral-100',
              currentHeading === value && 'bg-neutral-200/80'
            )}
          >
            <div 
              className="text-sm" 
              style={{ fontSize }}
            >
              {label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarDropdownFontFamily = () => {
  const { editor } = useEditorStore();
  
  const fonts = [
    { label: 'Arial', value: 'Arial', stack: 'Arial, Helvetica, sans-serif' },
    { label: 'Courier New', value: 'Courier New', stack: 'Courier New, Courier, monospace' },
    { label: 'Georgia', value: 'Georgia', stack: 'Georgia, serif' },
    { label: 'Times New Roman', value: 'Times New Roman', stack: 'Times New Roman, Times, serif' },
    { label: 'Verdana', value: 'Verdana', stack: 'Verdana, Geneva, sans-serif' }
  ];

  const currentFontFamily = editor?.getAttributes('textStyle')?.fontFamily || 'Arial';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-9 min-w-[120px] max-w-[180px] flex items-center justify-between 
          px-2 py-1 text-sm rounded-sm hover:bg-neutral-100 
          border-none outline-none"
        >
          <span 
            className="truncate mr-2" 
            style={{ fontFamily: fonts.find(f => f.value === currentFontFamily)?.stack }}
          >
            {currentFontFamily}
          </span>
          <ChevronDownIcon className="size-4 text-neutral-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white shadow-lg border border-neutral-300 
        min-w-[180px] p-1 rounded-sm"
        align="start"
      >
        {fonts.map(({ label, value, stack }) => (
          <DropdownMenuItem 
            key={value}
            onSelect={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            className={cn(
              'flex items-center justify-between px-3 py-2 rounded-sm cursor-pointer',
              'hover:bg-neutral-100',
              currentFontFamily === value && 'bg-neutral-200/80'
            )}
          >
            <div 
              className="text-sm" 
              style={{ fontFamily: stack }}
            >
              {label}
            </div>
            
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
      <ToolbarDropdownFontFamily />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <ToolbarHeadingDropdown />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Add Font Size Selector */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <ToolbarTextColorPicker />
      <ToolbarHighlightColorPicker />
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

