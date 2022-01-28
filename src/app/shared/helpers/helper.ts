import { Router } from "@angular/router";

export class Helper {

    static getQuery<T>(model: T): string {
        let query = "?";
        let objectkeys = Object.keys(model);
        objectkeys.forEach(key => {
            if (typeof (model[key]) == "string") {
                if (model[key] != "") {
                    query += query.length > 1 ? "&" : "";
                    query += key + "=" + model[key];
                }
            }

            if (typeof (model[key]) == "number") {
                if (model[key] > 0) {
                    query += query.length > 1 ? "&" : "";
                    query += key + "=" + model[key];
                }
            }

            if (typeof (model[key]) == "boolean") {
                query += query.length > 1 ? "&" : "";
                query += key + "=" + model[key];
            }

        });
        return query;
    }

    static routerLink(router: Router, route: string, params: object) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => router.navigate([route], { queryParams: params }));
    }

    static namesTitle(name: string) {      
    
        let breakName = name.split(" ");
        let firstName= breakName[0];
        let lastName= breakName[breakName.length-1];

        let initials = firstName[0] + lastName[0];
        
       return initials;
    }
}