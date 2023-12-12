import { Component } from '@angular/core';
import { Client } from './model/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  

  actions:Array<any> =
  [
    {  titre:"Accueil", route:"/accueil"},
    {  titre:"Liste des clients", route:"/clients"},
    {  titre:"Ajouter Client", route:"/ajouterClient"}
  ]

  actionCourante:any;
  title: any;

  setActionCourante(a :any)
  {
    this.actionCourante=a;  
  }  
}
