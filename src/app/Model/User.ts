export class  IAppUser
{
    id : number;
     username : String;
     gender : String;
     actived:boolean;
     roles:[{
        id : number;
        roleName : String;
      }];
     tarifhoraire : number;
     resume :String; 
     email : String;
}
