import { Type } from '@angular/core';

export interface IModal{
    component:Type<any>;
    overlay:boolean;
    redirectTo:boolean;
    nextToElement:string;
    position:IPosition;
}

export interface IPosition{
    top:string;
    left:string;
}

export class Modal implements IModal{
    constructor(public component:Type<any>, public nextToElement:string, public position:IPosition, public overlay:boolean, public redirectTo:boolean){

    }

}

