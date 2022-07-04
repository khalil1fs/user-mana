import {Component, OnInit} from '@angular/core';
import {EtatCampagneService} from '../../../../../../controller/service/config/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../../controller/model/config/EtatCampagne.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-etat-campagne-edit-admin',
  templateUrl: './etat-campagne-edit-admin.component.html',
  styleUrls: ['./etat-campagne-edit-admin.component.css']
})
export class EtatCampagneEditAdminComponent implements OnInit {


constructor(private etatCampagneService: EtatCampagneService
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
    this.etatCampagneService.edit().subscribe(etatCampagne=>{
    const myIndex = this.etatCampagnes.findIndex(e => e.id === this.selectedEtatCampagne.id);
    this.etatCampagnes[myIndex] = this.selectedEtatCampagne;
    this.editEtatCampagneDialog = false;
    this.selectedEtatCampagne = new EtatCampagneVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatCampagneDialog  = false;
}

// getters and setters

get etatCampagnes(): Array<EtatCampagneVo> {
    return this.etatCampagneService.etatCampagnes;
       }
set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

 get selectedEtatCampagne(): EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }

   get editEtatCampagneDialog(): boolean {
           return this.etatCampagneService.editEtatCampagneDialog;

       }
    set editEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.editEtatCampagneDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
