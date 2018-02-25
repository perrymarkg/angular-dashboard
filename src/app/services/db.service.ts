import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { PageModel } from '../models/page.model'
import { ThenableReference } from "@firebase/database-types";
import { Observable } from "@firebase/util";

@Injectable()
export class DbService {


    constructor(private af: AngularFireDatabase){

    }

    addPages(pageData: PageModel): ThenableReference{
        return this.af.list('pages').push(pageData)
    }

    getObject(obj: string): AngularFireList<any>{
        return this.af.list(obj);
    }

}