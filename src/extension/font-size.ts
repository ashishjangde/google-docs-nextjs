import { Extension } from "@tiptap/react";
import '@tiptap/extension-text-style';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (fontSize: string) => ReturnType;
            useFontSize: () => ReturnType;
        };
    }
}

export const FontSizeExtension = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
           {
            types: this.options.types,
            attributes: {
                fontSize: {
                    default: null,
                    renderHTML: attributes => {
                        if (!attributes.fontSize) {
                            return {};
                        }
                        return {
                            style: `font-size: ${attributes.fontSize}`,
                        };
                    },
                    parseHTML: element => {
                        return {
                            fontSize: element.style.fontSize,
                        };
                    },
                },
            },
           }
        ]   
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize }).run();
            },
            useFontSize: () => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize: null }).run();
            },
        }
    }
 })
    