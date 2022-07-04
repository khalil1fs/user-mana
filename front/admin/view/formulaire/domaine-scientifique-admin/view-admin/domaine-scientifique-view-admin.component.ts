import {Component, OnInit} from '@angular/core';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-domaine-scientifique-view-admin',
  templateUrl: './domaine-scientifique-view-admin.component.html',
  styleUrls: ['./domaine-scientifique-view-admin.component.css']
})
export class DomaineScientifiqueViewAdminComponent implements OnInit {


constructor(private domaineScientifiqueService: DomaineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewDomaineScientifiqueDialog  = false;
}

// getters and setters

get domaineScientifiques(): Array<DomaineScientifiqueVo> {
    return this.domaineScientifiqueService.domaineScientifiques;
       }
set domaineScientifiques(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiques = value;
       }

 get selectedDomaineScientifique():DomaineScientifiqueVo {
           return this.domaineScientifiqueService.selectedDomaineScientifique;
       }
    set selectedDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.selectedDomaineScientifique = value;
       }

   get viewDomaineScientifiqueDialog():boolean {
           return this.domaineScientifiqueService.viewDomaineScientifiqueDialog;

       }
    set viewDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.viewDomaineScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
