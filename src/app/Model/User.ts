export class user
{
    id : number;
    username : String;
    gender : String;
    actived:boolean;
    roles : AppRole[];
    tarifhoraire : number;
    resume :String; 
    email : String;
}
export class AppRole
{
    id : number;
     roleName : String;
}