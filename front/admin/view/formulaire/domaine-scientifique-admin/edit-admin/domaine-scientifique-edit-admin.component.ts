import {Component, OnInit} from '@angular/core';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-domaine-scientifique-edit-admin',
  templateUrl: './domaine-scientifique-edit-admin.component.html',
  styleUrls: ['./domaine-scientifique-edit-admin.component.css']
})
export class DomaineScientifiqueEditAdminComponent implements OnInit {


constructor(private domaineScientifiqueService: DomaineScientifiqueService
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
    this.domaineScientifiqueService.edit().subscribe(domaineScientifique=>{
    const myIndex = this.domaineScientifiques.findIndex(e => e.id === this.selectedDomaineScientifique.id);
    this.domaineScientifiques[myIndex] = this.selectedDomaineScientifique;
    this.editDomaineScientifiqueDialog = false;
    this.selectedDomaineScientifique = new DomaineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editDomaineScientifiqueDialog  = false;
}

// getters and setters

get domaineScientifiques(): Array<DomaineScientifiqueVo> {
    return this.domaineScientifiqueService.domaineScientifiques;
       }
set domaineScientifiques(value: Array<DomaineScientifiqueVo>) {
        this.domaineScientifiqueService.domaineScientifiques = value;
       }

 get selectedDomaineScientifique(): DomaineScientifiqueVo {
           return this.domaineScientifiqueService.selectedDomaineScientifique;
       }
    set selectedDomaineScientifique(value: DomaineScientifiqueVo) {
        this.domaineScientifiqueService.selectedDomaineScientifique = value;
       }

   get editDomaineScientifiqueDialog(): boolean {
           return this.domaineScientifiqueService.editDomaineScientifiqueDialog;

       }
    set editDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.editDomaineScientifiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
