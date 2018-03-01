export class PageModel {
    parent: string  = '';
    title: string = '';
    content: string = '';
    created: number = 0;
    updated: number = 0;
    active: boolean = true;
    type: 'page' | 'blog' = 'blog';
    url_slug: string = ''
    categories: Array<string> | boolean = false;
    featured_image: string = ''
}