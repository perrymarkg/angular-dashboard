import { Directive, ElementRef, OnInit, Renderer2, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDashboardTitle]'
})
export class TitleDirective implements OnInit, OnChanges {

    @Input() title: string;
    @Input() appDashboardTitle: string;

    constructor(
        private el: ElementRef,
        private router: Router,
        private render: Renderer2
    ) {}

    ngOnInit() {
        if ( !this.title ) {
            this.render.setProperty( this.el.nativeElement, 'innerHTML', this.getCurrentUrl() );
        }
    }

    ngOnChanges() {
        this.render.setProperty( this.el.nativeElement, 'innerHTML', this.title );
    }

    getCurrentUrl() {
        let title = this.capitalize( this.router.url.split('/').pop() );
        if ( title.indexOf('?') > 1 ) {
            title = title.substring(0, title.indexOf('?'));
        }

        return title;
    }

    capitalize(title: string) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

}
