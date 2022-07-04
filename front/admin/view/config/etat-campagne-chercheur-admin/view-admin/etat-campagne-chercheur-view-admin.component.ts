import {Component, OnInit} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../../controller/service/config/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../../controller/model/config/EtatCampagneChercheur.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-etat-campagne-chercheur-view-admin',
  templateUrl: './etat-campagne-chercheur-view-admin.component.html',
  styleUrls: ['./etat-campagne-chercheur-view-admin.component.css']
})
export class EtatCampagneChercheurViewAdminComponent implements OnInit {


constructor(private etatCampagneChercheurService: EtatCampagneChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatCampagneChercheurDialog  = false;
}

// getters and setters

get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
    return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

 get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }

   get viewEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog;

       }
    set viewEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
