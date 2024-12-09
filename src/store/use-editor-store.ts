import {create} from 'zustand';
import type { Editor } from '@tiptap/react';

export interface TypeEditorStore {
    editor : Editor | null;
    setEditor : (editor : Editor | null) => void;
}

export const useEditorStore = create<TypeEditorStore>((set) => ({
    editor : null,
    setEditor : (editor) => set({editor})
}));

