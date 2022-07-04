import {Component, OnInit, Input} from '@angular/core';
import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-format-rencontre-create-admin',
  templateUrl: './format-rencontre-create-admin.component.html',
  styleUrls: ['./format-rencontre-create-admin.component.css']
})
export class FormatRencontreCreateAdminComponent implements OnInit {

constructor(private formatRencontreService: FormatRencontreService
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
     this.formatRencontreService.save().subscribe(formatRencontre=>{
       this.formatRencontres.push({...formatRencontre});
       this.createFormatRencontreDialog = false;
       this.selectedFormatRencontre = new FormatRencontreVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createFormatRencontreDialog  = false;
}

// getters and setters

get formatRencontres(): Array<FormatRencontreVo> {
    return this.formatRencontreService.formatRencontres;
       }
set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }

 get selectedFormatRencontre():FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }

   get createFormatRencontreDialog(): boolean {
           return this.formatRencontreService.createFormatRencontreDialog;

       }
    set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
