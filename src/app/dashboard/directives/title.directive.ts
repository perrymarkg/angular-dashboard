import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'dashboard-title' 
})
export class TitleDirective implements OnInit{
    @Input() title: string;
    constructor(private el: ElementRef, private router: Router, private render: Renderer2){}
    ngOnInit(){
        this.getCurrentUrl();
        if( this.title )
            this.render.setProperty(this.el.nativeElement, 'innerHTML', '<h2>' + this.title + '</h2>');
        else
            this.render.setProperty(this.el.nativeElement, 'innerHTML', '<h2>' + this.getCurrentUrl() + '</h2>');
    }
    
    getCurrentUrl(){
        return this.router.url.split('/').pop();
    }
}