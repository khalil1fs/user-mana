import {Component, OnInit} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from 'src/app/controller/service/formulaire/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from 'src/app/controller/model/formulaire/FournisseurAppelProjetRecherche.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-fournisseur-appel-projet-recherche-view-admin',
  templateUrl: './four-appel-prj-recherche-view-admin.component.html',
  styleUrls: ['./four-appel-prj-recherche-view-admin.component.css']
})
export class FournisseurAppelProjetRechercheViewAdminComponent implements OnInit {


constructor(private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewFournisseurAppelProjetRechercheDialog  = false;
}

// getters and setters

get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

 get selectedFournisseurAppelProjetRecherche():FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }

   get viewFournisseurAppelProjetRechercheDialog():boolean {
           return this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog;

       }
    set viewFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog= value;
       }

       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
