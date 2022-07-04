import {Component, OnInit, Input} from '@angular/core';
import {EtatReclamationService} from '../../../../../../controller/service/config/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/config/EtatReclamation.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-etat-reclamation-create-admin',
  templateUrl: './etat-reclamation-create-admin.component.html',
  styleUrls: ['./etat-reclamation-create-admin.component.css']
})
export class EtatReclamationCreateAdminComponent implements OnInit {

constructor(private etatReclamationService: EtatReclamationService
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
     this.etatReclamationService.save().subscribe(etatReclamation=>{
       this.etatReclamations.push({...etatReclamation});
       this.createEtatReclamationDialog = false;
       this.selectedEtatReclamation = new EtatReclamationVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createEtatReclamationDialog  = false;
}

// getters and setters

get etatReclamations(): Array<EtatReclamationVo> {
    return this.etatReclamationService.etatReclamations;
       }
set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

 get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }

   get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;

       }
    set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
