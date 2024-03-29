import { DemandeRealisation } from './DemandeRealisation';
import { AppUser } from './User';


export class Projet{
    id : number;
    description : String ;
    createdBy : AppUser ;
    datePostilation : Date;
    dateFin :Date;
    budjet : number;
    etatProjet : boolean ;
    pourcentage : number;
    detail:string;
  
	emploiyeur :AppUser ;

	
	acceptedDemande: DemandeRealisation ;

	demandeRealisations :DemandeRealisation[] ;

}