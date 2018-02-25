export class PageModel {
    parent: string;
    title: string;
    content: string;
    created: number;
    updated: number;
    active: boolean;
    type: 'page' | 'blog';
    categories: Array<string>;
}