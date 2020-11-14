import { AppUser } from './User';

export class DemandeRealisation {
 
	id :number ;
	detailDemmande: String ;

	projet: Projet ;

	demandeur: AppUser ; 
}
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