import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { PageModel } from '../models/page.model'
import { ThenableReference } from "@firebase/database-types";
import { Observable } from "@firebase/util";

@Injectable()
export class DbService {

    constructor(private af: AngularFireDatabase){}

    addPage(page: PageModel): ThenableReference{
        return this.af.list('pages').push(page)
    }

    getObject(obj: string): AngularFireList<any>{
        return this.af.list(obj);
    }

    updatePage(id: string, page: PageModel):Promise<any> {
        return this.af.list('pages').update(id, page)
    }

    deletePage(id: string):Promise<any> {
        return this.af.list('pages').remove(id)
    }

    updateSettings(settings){
        this.af.list('settings').set('settings', settings);
    }

}