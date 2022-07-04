import {Component, OnInit, Input} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../../controller/service/config/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../../controller/model/config/EtatCampagneChercheur.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-etat-campagne-chercheur-create-admin',
  templateUrl: './etat-campagne-chercheur-create-admin.component.html',
  styleUrls: ['./etat-campagne-chercheur-create-admin.component.css']
})
export class EtatCampagneChercheurCreateAdminComponent implements OnInit {

constructor(private etatCampagneChercheurService: EtatCampagneChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.etatCampagneChercheurService.save().subscribe(etatCampagneChercheur=>{
       this.etatCampagneChercheurs.push({...etatCampagneChercheur});
       this.createEtatCampagneChercheurDialog = false;
       this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createEtatCampagneChercheurDialog  = false;
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

   get createEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;

       }
    set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
