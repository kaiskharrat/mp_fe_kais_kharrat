import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  // Url du service web de gestion de Clients
  // commune pour toutes les méthodes
  urlHote="http://localhost:8080/clients/";

  constructor(private http :HttpClient)
  {

  }

  getClients() :Observable<Array<Client>>
  {
    return  this.http.get<Array<Client>> (this.urlHote,{
      headers: {'Access-Control-Allow-Origin': '*','Accept':'application/json'}
   });
  }

  deleteClient(idP: number|undefined)
  {
    return this.http.get (this.urlHote+"delete/"+idP);
  }

  addClient(nouveau: Client) {
    return this.http.post<Array<Client>> (this.urlHote,nouveau);
  }

  updateClient(idP: number | undefined, nouveau: Client) {
    return this.http.put(this.urlHote,nouveau);
  }
  findByNum(numClient: number | undefined): Observable<Array<Client>> {
    const url = numClient !== undefined ? `${this.urlHote}searchNum?num=${numClient}` : this.urlHote;
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    };
  
    return this.http.get<Client[]>(url, { headers });
  }
  findByNom(nomClient: string | undefined): Observable<Array<Client>> {
    const url = nomClient !== undefined ? `${this.urlHote}searchNom?nom=${nomClient}` : this.urlHote;
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    };
  
    return this.http.get<Client[]>(url, { headers });
  }
  findByPrenom(prenomClient: string | undefined): Observable<Array<Client>> {
    const url = prenomClient !== undefined ? `${this.urlHote}searchPrenom?prenom=${prenomClient}` : this.urlHote;
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json'
    };
  
    return this.http.get<Client[]>(url, { headers });
  }
}
