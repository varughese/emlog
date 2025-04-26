import { Post } from "contentlayer/generated";

export interface Author {
    fullName: string;
    nickName: string;
}

const authorMap: Record<string, Author> = {
    "matv": {
        fullName: "Mathew Varughese",
        nickName: "Mat"
    },
    "bibek": {
        fullName: "Bibek Ghimire",
        nickName: "Bibek"
    }
};

export function getAuthor(post: Post): Author {
    return authorMap[post.author];
} 