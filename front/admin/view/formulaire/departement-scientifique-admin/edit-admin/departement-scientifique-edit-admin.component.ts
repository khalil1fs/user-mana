import {Component, OnInit} from '@angular/core';
import {DepartementScientifiqueService} from 'src/app/controller/service/formulaire/DepartementScientifique.service';
import {DepartementScientifiqueVo} from 'src/app/controller/model/formulaire/DepartementScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-departement-scientifique-edit-admin',
  templateUrl: './departement-scientifique-edit-admin.component.html',
  styleUrls: ['./departement-scientifique-edit-admin.component.css']
})
export class DepartementScientifiqueEditAdminComponent implements OnInit {


constructor(private departementScientifiqueService: DepartementScientifiqueService
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
    this.departementScientifiqueService.edit().subscribe(departementScientifique=>{
    const myIndex = this.departementScientifiques.findIndex(e => e.id === this.selectedDepartementScientifique.id);
    this.departementScientifiques[myIndex] = this.selectedDepartementScientifique;
    this.editDepartementScientifiqueDialog = false;
    this.selectedDepartementScientifique = new DepartementScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editDepartementScientifiqueDialog  = false;
}

// getters and setters

get departementScientifiques(): Array<DepartementScientifiqueVo> {
    return this.departementScientifiqueService.departementScientifiques;
       }
set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

 get selectedDepartementScientifique(): DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }

   get editDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.editDepartementScientifiqueDialog;

       }
    set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
