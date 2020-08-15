
export interface CV{
    id : number;
    designationCV : String ;
    etatcivile : String ;
    nom : String;
    prenom :String;
    adress : String;
    email : String ;
    Tel : String;
}
export interface Experiance
    {
        ID : number;
        Description :String;
        Organistaion :String;
        anneeDebut : number;
        MoisDebut: number;
        anneeFin : number;
        MoisFin : number;
        curent : boolean;
    }

export interface Compitance
    {
       ID : number;
       Description : String;
       pourcentage : number;
    }


export interface Deplome 
    {
       Id : Number;
       annee : Number;
       mois : Number;
       description : String;
       organisataion : String;

    }
   export interface CvGlobale
   {
    cv:CV;
    deplomes :Deplome[];
    compitances : Compitance[];
    experiances : Experiance[];
   }