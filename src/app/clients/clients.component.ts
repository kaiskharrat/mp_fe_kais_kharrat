import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../services/clients.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent  implements OnInit{
  clients$: Observable<Client[]> | undefined;
  clients: Array<Client> = [];
  clientCourant=new Client();
  client=new Client();
  modeEdition:boolean=false;
  numRecherche: number | undefined;
  nomRecherche: string| undefined;
  prenomRecherche: string| undefined;


  constructor(private clientsService :ClientService)
  {
  }

 ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterClients();      
  }
  consulterClients() {
    console.log("Récupérer la liste des clients");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.clientsService.getClients()
    .subscribe(
      {
        //En cas de succès
        next: (data: Client[])=> {
          console.log("Succès GET");
          this.clients=data;
        },

        //En cas d'erreur
        error: (err: any)=> {
          console.log("Erreur GET");
        }
      }
    )    
  }

   

    
   supprimerClient(p: Client)
   {
    //Afficher une boite de dialogue pour confirmer la suppression
     let reponse:boolean =confirm("Voulez vous supprimer le produit :"+p.nom+" ?");
     if (reponse==true)
     {
        console.log("Suppression confirmée..." );
        //chercher l'indice du produit à supprimer  
        let index: number = this.clients.indexOf(p);
        console.log("indice du produit à supprimer: "+index);
        if (index !== -1) 
        {

          //supprimer dans le BackEnd  
          this.clientsService.deleteClient(p.id)
          .subscribe(
            {
              next: (deleteClient: any) => {
                console.log("Succès DELETE");
                // Supprimer dans la partie Front End  (dans le tableau produits)
                this.clients.splice(index, 1);
                console.log("Suppressio du produit:"+p.nom);            
              },
              error: (err: any)=> {
                console.log("Erreur DELETE");
              }
            }
            )     
          
        }
     }
     else
     {
      console.log("Suppression annulée..." );     
     } 
  }

  editerClient(p: Client)
  {
     this.clientCourant.id=p.id;
     this.clientCourant.nom=p.nom;
     this.clientCourant.prenom=p.prenom;
     this.clientCourant.adress=p.adress;
     this.clientCourant.num=p.num;
     this.clientCourant.etat=p.etat;

     this.modeEdition=true;
 }
  validerFormulaire(form: NgForm) 
  {
    console.log(form.value);

      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau:boolean=true;
      let index=0;
      do{
       let p=this.clients[index];
        console.log(
             p.nom + ': ' +
            p.prenom);
  
            if (p.id==form.value.id)
            {
              //rendre le mode à EDIT
              nouveau=false;
              console.log('ancien');
              
              let reponse:boolean =confirm("Produit existant. Confirmez vous la mise à jour de :"+p.nom+" ?");
              if (reponse==true)
                {
                    this.mettreAJourClient(form.value , p);
                    this.modeEdition=false;                                   
                }
                else
                {
                  console.log("Mise à jour annulée");
                }              
              
              //Arrêter la boucle
              return;
            }
            else{
              //continuer à boucler
              index++;
            }           
      }
      while(nouveau && index<this.clients.length);
  }
    
  mettreAJourClient(nouveau: Client, ancien:Client) {
    //mettre à jour dans le BackEnd  
    this.clientsService.updateClient(ancien.id,nouveau)
    .subscribe(
      {
        next: (clientModifie: any)=> {
          console.log("Succès PUT");
          //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
          ancien.nom=nouveau.nom;
          ancien.prenom=nouveau.prenom;
          ancien.num=nouveau.num;
          ancien.adress=nouveau.adress;
            console.log('Mise à jour du produit:'+ancien.nom);
        },
        error: (err: any)=> {
          console.log("Erreur PUT");
        }
      }
      )    
 }

 RechercherClientParNum() {
  console.log("RechercherClientParNum");
  //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
  this.clientsService.findByNum(this.client.num)
  .subscribe(
    {
      //En cas de succès
      next: (data: Array<Client>)=> {
        console.log("Succès GET");
        this.clients=data;
      },

      //En cas d'erreur
      error: (err: any)=> {
        console.log("Erreur GET");
      }
    }
  )    
}
rechercherNum() {
  console.log("Recherche des clients");
  
  // Appeler la méthode 'findByNum' du service pour récupérer les données du backend
  this.clientsService.findByNum(this.numRecherche)
    .subscribe(
      {
        next: (data: Client[]) => {
          console.log("Succès de la recherche");
          this.clients = data;  // Mettez à jour l'observable clients$ avec les nouvelles données
        },
        error: (err: any) => {
          console.log("Erreur lors de la recherche");
        }
      }
    );
}
 
rechercherNom() {
  console.log("Recherche des clients");
  if(this.nomRecherche!=""){
  // Appeler la méthode 'findByNum' du service pour récupérer les données du backend
  this.clientsService.findByNom(this.nomRecherche)
    .subscribe(
      {
        next: (data: Client[]) => {
          console.log("Succès de la recherche");
          this.clients = data;  // Mettez à jour l'observable clients$ avec les nouvelles données
        },
        error: (err: any) => {
          console.log("Erreur lors de la recherche");
        }
      }
    );}
    else{
      this.ngOnInit();
    }
}

rechercherPre() {
  console.log("Recherche des clients");
  if(this.prenomRecherche!=""){
  // Appeler la méthode 'findByNum' du service pour récupérer les données du backend
  this.clientsService.findByPrenom(this.prenomRecherche)
    .subscribe(
      {
        next: (data: Client[]) => {
          console.log("Succès de la recherche");
          this.clients = data;  // Mettez à jour l'observable clients$ avec les nouvelles données
        },
        error: (err: any) => {
          console.log("Erreur lors de la recherche");
        }
      }
    );}
    else{
      this.ngOnInit();
    }
}
 

}

