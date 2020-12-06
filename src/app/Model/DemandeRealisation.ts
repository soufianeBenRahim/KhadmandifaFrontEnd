import { CV } from './CV';
import { Projet } from './Projet';
import { AppUser } from './User';

export class DemandeRealisation {
    id: number;
    detailDemmande: string;
    projet: Projet;
    demandeur: AppUser;
    proposition : number;
    cv : CV;
}