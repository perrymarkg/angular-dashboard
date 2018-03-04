export class PageModel {
    parent  = '';
    title = '';
    content = '';
    excerpt = '';
    created = 0;
    updated = 0;
    active = true;
    type: 'page' | 'blog' = 'blog';
    url_slug = '';
    categories: Array<string> | boolean = false;
    featured_image = '';
}
