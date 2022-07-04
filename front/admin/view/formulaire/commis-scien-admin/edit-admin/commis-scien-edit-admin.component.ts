import {Component, OnInit} from '@angular/core';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-commission-scientifique-edit-admin',
  templateUrl: './commis-scien-edit-admin.component.html',
  styleUrls: ['./commis-scien-edit-admin.component.css']
})
export class CommisScienEditAdminComponent implements OnInit {


constructor(private commissionScientifiqueService: CommissionScientifiqueService
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
    this.commissionScientifiqueService.edit().subscribe(commissionScientifique=>{
    const myIndex = this.commissionScientifiques.findIndex(e => e.id === this.selectedCommissionScientifique.id);
    this.commissionScientifiques[myIndex] = this.selectedCommissionScientifique;
    this.editCommissionScientifiqueDialog = false;
    this.selectedCommissionScientifique = new CommissionScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCommissionScientifiqueDialog  = false;
}

// getters and setters

get commissionScientifiques(): Array<CommissionScientifiqueVo> {
    return this.commissionScientifiqueService.commissionScientifiques;
       }
set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }

 get selectedCommissionScientifique(): CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }

   get editCommissionScientifiqueDialog(): boolean {
           return this.commissionScientifiqueService.editCommissionScientifiqueDialog;

       }
    set editCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.editCommissionScientifiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
