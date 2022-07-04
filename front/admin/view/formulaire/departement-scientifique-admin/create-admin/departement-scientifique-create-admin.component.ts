import {Component, OnInit, Input} from '@angular/core';
import {DepartementScientifiqueService} from 'src/app/controller/service/formulaire/DepartementScientifique.service';
import {DepartementScientifiqueVo} from 'src/app/controller/model/formulaire/DepartementScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-departement-scientifique-create-admin',
  templateUrl: './departement-scientifique-create-admin.component.html',
  styleUrls: ['./departement-scientifique-create-admin.component.css']
})
export class DepartementScientifiqueCreateAdminComponent implements OnInit {

constructor(private departementScientifiqueService: DepartementScientifiqueService
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
     this.departementScientifiqueService.save().subscribe(departementScientifique=>{
       this.departementScientifiques.push({...departementScientifique});
       this.createDepartementScientifiqueDialog = false;
       this.selectedDepartementScientifique = new DepartementScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createDepartementScientifiqueDialog  = false;
}

// getters and setters

get departementScientifiques(): Array<DepartementScientifiqueVo> {
    return this.departementScientifiqueService.departementScientifiques;
       }
set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

 get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }

   get createDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.createDepartementScientifiqueDialog;

       }
    set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
