import {Component, OnInit, Input} from '@angular/core';
import {CommissionScientifiqueService} from 'src/app/controller/service/formulaire/CommissionScientifique.service';
import {CommissionScientifiqueVo} from 'src/app/controller/model/formulaire/CommissionScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-commission-scientifique-create-admin',
  templateUrl: './commis-scien-create-admin.component.html',
  styleUrls: ['./commis-scien-create-admin.component.css']
})
export class CommissionScientifiqueCreateAdminComponent implements OnInit {

constructor(private commissionScientifiqueService: CommissionScientifiqueService
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
     this.commissionScientifiqueService.save().subscribe(commissionScientifique=>{
       this.commissionScientifiques.push({...commissionScientifique});
       this.createCommissionScientifiqueDialog = false;
       this.selectedCommissionScientifique = new CommissionScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createCommissionScientifiqueDialog  = false;
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

   get createCommissionScientifiqueDialog(): boolean {
           return this.commissionScientifiqueService.createCommissionScientifiqueDialog;

       }
    set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
