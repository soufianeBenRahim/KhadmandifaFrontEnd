export class  AppUser
{
    id : number;
     username : String;
     gender : String;
     actived:boolean;
     roles:[{
        id : number;
        roleName : String;
      }];
     email : String;
     typeuser: string;
}
