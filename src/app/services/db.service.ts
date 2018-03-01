import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { PageModel } from '../models/page.model'
import { ThenableReference } from "@firebase/database-types";
import { Observable } from "@firebase/util";
import { SettingsModel } from "../models/settings.model";

@Injectable()
export class DbService {

    constructor(private af: AngularFireDatabase){}

    getObject(obj: string): AngularFireList<any>{
        return this.af.list(obj);
    }

    addPage(page: PageModel): ThenableReference{
        page.url_slug = this.stringToUrlSlug(page.url_slug);
        return this.af.list('pages').push(page)
    }

    updatePage(id: string, page: PageModel):Promise<any> {
        page.url_slug = this.stringToUrlSlug(page.url_slug);
        return this.af.list('pages').update(id, page)
    }

    deletePage(id: string):Promise<any> {
        return this.af.list('pages').remove(id)
    }

    getAllBlogs(){
        return this.af.list('pages').snapshotChanges().map( items => {
            return items.map(item => ({ key: item.key, ...item.payload.val() }));
        })
    }

    getBlogById(id: string){
        let blog;
        return this.af.list('pages/'+id).snapshotChanges()
        .switchMap( items => {
            if( items.length ){
                blog = new PageModel()
                items.forEach( item => {
                    blog[item.key] = item.payload.val();
                })
            }
            return [blog]
        })
    }

    getBlogByTitle(title: string){
        let blog;
        return this.af.list('pages', ref => ref.orderByChild('title').equalTo(title) )
        .snapshotChanges().switchMap( items => {
            if( items.length ){
                blog = new PageModel();
                Object.assign(blog, {...items}[0].payload.val()) // blog = {...items}[0].payload.val() not working.. Why?
                return [blog]
            }
            return [blog];
        })
    }

    updateSettings(settings){
        this.af.list('settings').set('settings', settings);
    }

    getSettings(){
        let settings;
        return this.af.list('settings/settings').snapshotChanges()
        .switchMap( items => {
            if( items.length ){
                settings = new SettingsModel()
                items.forEach( item => {
                    settings[item.key] = item.payload.val();
                })
            }
            return [settings];
        })
    }

    stringToUrlSlug(url){
        return url
                .toString()
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
    }

}