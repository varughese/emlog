export interface GoogleDocsDocument {
    body?: {
        content?: Array<{
            paragraph?: {
                elements?: Array<{
                    textRun?: {
                        content: string;
                        textStyle?: {
                            bold?: boolean;
                            italic?: boolean;
                        };
                        smartChip?: {
                            type?: string;
                            value?: string;
                        };
                    };
                    inlineObjectElement?: {
                        inlineObjectId: string;
                    };
                }>;
                paragraphStyle?: {
                    namedStyleType?: string;
                };
                bullet?: {
                    listId: string;
                };
            };
        }>;
    };
    inlineObjects?: {
        [key: string]: {
            inlineObjectProperties?: {
                embeddedObject?: {
                    imageProperties?: {
                        contentUri?: string;
                    };
                };
            };
        };
    };
} 