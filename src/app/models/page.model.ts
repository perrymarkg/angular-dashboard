export class PageModel {
    parent: string
    title: string
    content: string
    created: Date
    updated: Date
    active: boolean
    type: 'page' | 'blog'
    categories: Array<string>
}