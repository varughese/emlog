import { GoogleDocsDocument } from '../types/google';

export class MarkdownService {
    private convertParagraphToMarkdown(paragraph: any, document: GoogleDocsDocument): string {
        let text = '';

        if (paragraph.elements) {
            for (const element of paragraph.elements) {
                if (element.textRun) {
                    const { content, textStyle } = element.textRun;

                    if (textStyle) {
                        if (textStyle.bold) text += `**${content}**`;
                        else if (textStyle.italic) text += `*${content}*`;
                        else text += content;
                    } else {
                        text += content;
                    }
                } else if (element.inlineObjectElement) {
                    const imageId = element.inlineObjectElement.inlineObjectId;
                    const imageObject = document.inlineObjects?.[imageId];
                    const imageUri = imageObject?.inlineObjectProperties?.embeddedObject?.imageProperties?.contentUri;

                    if (imageUri) {
                        text += `![Image](${imageUri})`;
                    }
                }
            }
        }

        return text;
    }

    private convertHeadingToMarkdown(paragraph: any, document: GoogleDocsDocument): string {
        const text = this.convertParagraphToMarkdown(paragraph, document);
        const level = paragraph.paragraphStyle?.namedStyleType?.replace('HEADING_', '');

        if (level) {
            return `${'#'.repeat(parseInt(level))} ${text}\n`;
        }

        return text;
    }

    private convertListToMarkdown(paragraph: any, document: GoogleDocsDocument): string {
        const text = this.convertParagraphToMarkdown(paragraph, document);
        const listId = paragraph.bullet?.listId;

        if (listId) {
            return `- ${text}\n`;
        }

        return text;
    }

    public convertToMarkdown(document: GoogleDocsDocument): string {
        let markdown = '';

        if (document.body?.content) {
            for (const element of document.body.content) {
                if (element.paragraph) {
                    const paragraph = element.paragraph;

                    // Check if it's a heading
                    if (paragraph.paragraphStyle?.namedStyleType?.startsWith('HEADING_')) {
                        markdown += this.convertHeadingToMarkdown(paragraph, document);
                    }
                    // Check if it's a list item
                    else if (paragraph.bullet) {
                        markdown += this.convertListToMarkdown(paragraph, document);
                    }
                    // Regular paragraph
                    else {
                        const text = this.convertParagraphToMarkdown(paragraph, document);
                        if (text.trim()) {
                            markdown += `${text}\n\n`;
                        }
                    }
                }
            }
        }

        return markdown.trim();
    }
} 