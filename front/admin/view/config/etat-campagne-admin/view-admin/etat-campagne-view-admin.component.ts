import {Component, OnInit} from '@angular/core';
import {EtatCampagneService} from '../../../../../../controller/service/config/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../../controller/model/config/EtatCampagne.model';
import {RoleService} from '../../../../../../controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-etat-campagne-view-admin',
  templateUrl: './etat-campagne-view-admin.component.html',
  styleUrls: ['./etat-campagne-view-admin.component.css']
})
export class EtatCampagneViewAdminComponent implements OnInit {


constructor(private etatCampagneService: EtatCampagneService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatCampagneDialog  = false;
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

   get viewEtatCampagneDialog():boolean {
           return this.etatCampagneService.viewEtatCampagneDialog;

       }
    set viewEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.viewEtatCampagneDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
