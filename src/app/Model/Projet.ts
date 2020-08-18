import { IAppUser } from './User';


export interface Projet{
    id : number;
    description : String ;
    createdBy : IAppUser ;
    datePostilation : Date;
    dateFin :Date;
    budjet : number;
    etatProjet : boolean ;
    pourcentage : number;
}