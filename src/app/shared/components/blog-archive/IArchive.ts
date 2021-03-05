export interface IArchive {
   years:IYear[];  
  }

export interface IYear {
  months:IMonth[];
  year:number;
  }

export interface IMonth{
  month:number;
  title:string[];
}
 