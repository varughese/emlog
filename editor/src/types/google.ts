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
} 