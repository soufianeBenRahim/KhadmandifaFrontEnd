import { Projet } from './Projet';
import { AppUser } from './User';

export interface DemandeRealisation {
    id: number;
    detailDemmande: string;
    projet: Projet;
    demandeur: AppUser;
    proposition : number;
}