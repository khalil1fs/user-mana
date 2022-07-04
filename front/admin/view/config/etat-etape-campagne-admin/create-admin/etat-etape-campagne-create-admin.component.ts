import {Component, OnInit, Input} from '@angular/core';
import {EtatEtapeCampagneService} from '../../../../../../controller/service/config/EtatEtapeCampagne.service';
import {EtatEtapeCampagneVo} from '../../../../../../controller/model/config/EtatEtapeCampagne.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-etat-etape-campagne-create-admin',
  templateUrl: './etat-etape-campagne-create-admin.component.html',
  styleUrls: ['./etat-etape-campagne-create-admin.component.css']
})
export class EtatEtapeCampagneCreateAdminComponent implements OnInit {

constructor(private etatEtapeCampagneService: EtatEtapeCampagneService
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
     this.etatEtapeCampagneService.save().subscribe(etatEtapeCampagne=>{
       this.etatEtapeCampagnes.push({...etatEtapeCampagne});
       this.createEtatEtapeCampagneDialog = false;
       this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createEtatEtapeCampagneDialog  = false;
}

// getters and setters

get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
    return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }

 get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
    set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }

   get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;

       }
    set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
