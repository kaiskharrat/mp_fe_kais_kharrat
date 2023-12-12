import { ClientService } from '../services/clients.service';
import { Client } from '../model/client';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit
{
  clients: Array<Client> = [];
  nouveauClient=new Client();

  constructor(private clientsService :ClientService)
  {
  }
  ngOnInit(): void {
    //récupérer la liste des produits existants
    this.consulterClients();
  }

consulterClients() {
  console.log("Récupérer la liste des clients");
  // Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
  this.clientsService.getClients().subscribe({
    // En cas de succès
    next: (data:Client[] ) => {
      console.log("Succès GET");
      this.clients = data;
    },
    // En cas d'erreur
    error: (err: any) => {
      console.error("Erreur GET", err);
    },
  });
}



  validerFormulaire(form: NgForm) 
  {
    console.log(form.value);
    this.ajouterClient(form.value);
    form.reset();
  }

  ajouterClient(nouveau: Client) {
    console.log('nouveau');
      //ajouter dans le BackEnd  
      this.clientsService.addClient(nouveau)
      .subscribe(
        {
          next: (newClient: any)=> {
            console.log("Succès POST");
            console.log("Ajout d'un nouveau client:"+nouveau.nom);            
          },
          error: (err: any)=> {
            console.log("Erreur POST");
          }
        }
        )    
  }
} 
