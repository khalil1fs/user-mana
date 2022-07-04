import {Component, OnInit} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../../controller/service/config/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../../controller/model/config/EtatCampagneChercheur.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-etat-campagne-chercheur-edit-admin',
  templateUrl: './etat-campagne-chercheur-edit-admin.component.html',
  styleUrls: ['./etat-campagne-chercheur-edit-admin.component.css']
})
export class EtatCampagneChercheurEditAdminComponent implements OnInit {


constructor(private etatCampagneChercheurService: EtatCampagneChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etatCampagneChercheurService.edit().subscribe(etatCampagneChercheur=>{
    const myIndex = this.etatCampagneChercheurs.findIndex(e => e.id === this.selectedEtatCampagneChercheur.id);
    this.etatCampagneChercheurs[myIndex] = this.selectedEtatCampagneChercheur;
    this.editEtatCampagneChercheurDialog = false;
    this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatCampagneChercheurDialog  = false;
}

// getters and setters

get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
    return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

 get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }

   get editEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;

       }
    set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
