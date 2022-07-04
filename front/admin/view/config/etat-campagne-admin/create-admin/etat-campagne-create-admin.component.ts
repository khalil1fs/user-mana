import {Component, OnInit, Input} from '@angular/core';
import {EtatCampagneService} from '../../../../../../controller/service/config/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../../controller/model/config/EtatCampagne.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-etat-campagne-create-admin',
  templateUrl: './etat-campagne-create-admin.component.html',
  styleUrls: ['./etat-campagne-create-admin.component.css']
})
export class EtatCampagneCreateAdminComponent implements OnInit {

constructor(private etatCampagneService: EtatCampagneService
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
     this.etatCampagneService.save().subscribe(etatCampagne=>{
       this.etatCampagnes.push({...etatCampagne});
       this.createEtatCampagneDialog = false;
       this.selectedEtatCampagne = new EtatCampagneVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createEtatCampagneDialog  = false;
}

// getters and setters

get etatCampagnes(): Array<EtatCampagneVo> {
    return this.etatCampagneService.etatCampagnes;
       }
set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

 get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }

   get createEtatCampagneDialog(): boolean {
           return this.etatCampagneService.createEtatCampagneDialog;

       }
    set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
