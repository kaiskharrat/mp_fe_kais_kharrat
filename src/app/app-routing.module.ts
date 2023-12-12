import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientsComponent } from './clients/clients.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { NgModule } from '@angular/core';
import { FacturesComponent } from './factures/factures.component';

const routes: Routes = [
  {  path:"accueil", component: AccueilComponent },
  {  path:"clients", component: ClientsComponent },
  {  path:"ajouterClient", component: AjoutClientComponent },
  {  path:"Factures", component: FacturesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
