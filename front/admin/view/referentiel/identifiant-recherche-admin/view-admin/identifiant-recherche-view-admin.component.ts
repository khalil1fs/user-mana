import {Component, OnInit} from '@angular/core';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-identifiant-recherche-view-admin',
  templateUrl: './identifiant-recherche-view-admin.component.html',
  styleUrls: ['./identifiant-recherche-view-admin.component.css']
})
export class IdentifiantRechercheViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private identifiantRechercheService: IdentifiantRechercheService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewIdentifiantRechercheDialog  = false;
}

// getters and setters

get identifiantRecherches(): Array<IdentifiantRechercheVo> {
    return this.identifiantRechercheService.identifiantRecherches;
       }
set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }

 get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
    set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }

   get viewIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.viewIdentifiantRechercheDialog;

       }
    set viewIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.viewIdentifiantRechercheDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
