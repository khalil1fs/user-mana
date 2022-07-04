import {Component, OnInit, Input} from '@angular/core';
import {DomaineScientifiqueService} from 'src/app/controller/service/formulaire/DomaineScientifique.service';
import {DomaineScientifiqueVo} from 'src/app/controller/model/formulaire/DomaineScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-domaine-scientifique-create-admin',
  templateUrl: './domaine-scientifique-create-admin.component.html',
  styleUrls: ['./domaine-scientifique-create-admin.component.css']
})
export class DomaineScientifiqueCreateAdminComponent implements OnInit {

constructor(private domaineScientifiqueService: DomaineScientifiqueService
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
     this.domaineScientifiqueService.save().subscribe(domaineScientifique=>{
       this.domaineScientifiques.push({...domaineScientifique});
       this.createDomaineScientifiqueDialog = false;
       this.selectedDomaineScientifique = new DomaineScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createDomaineScientifiqueDialog  = false;
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

   get createDomaineScientifiqueDialog(): boolean {
           return this.domaineScientifiqueService.createDomaineScientifiqueDialog;

       }
    set createDomaineScientifiqueDialog(value: boolean) {
        this.domaineScientifiqueService.createDomaineScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
