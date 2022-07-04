import {Component, OnInit} from '@angular/core';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-commission-scientifique-view-admin',
  templateUrl: './commis-scien-view-admin.component.html',
  styleUrls: ['./commis-scien-view-admin.component.css']
})
export class CommissionScientifiqueViewAdminComponent implements OnInit {


constructor(private commissionScientifiqueService: CommissionScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCommissionScientifiqueDialog  = false;
}

// getters and setters

get commissionScientifiques(): Array<CommissionScientifiqueVo> {
    return this.commissionScientifiqueService.commissionScientifiques;
       }
set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }

 get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }

   get viewCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.viewCommissionScientifiqueDialog;

       }
    set viewCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.viewCommissionScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
