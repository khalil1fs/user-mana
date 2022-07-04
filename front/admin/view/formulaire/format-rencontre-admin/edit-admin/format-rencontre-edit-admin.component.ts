import {Component, OnInit} from '@angular/core';
import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-format-rencontre-edit-admin',
  templateUrl: './format-rencontre-edit-admin.component.html',
  styleUrls: ['./format-rencontre-edit-admin.component.css']
})
export class FormatRencontreEditAdminComponent implements OnInit {


constructor(private formatRencontreService: FormatRencontreService
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
    this.formatRencontreService.edit().subscribe(formatRencontre=>{
    const myIndex = this.formatRencontres.findIndex(e => e.id === this.selectedFormatRencontre.id);
    this.formatRencontres[myIndex] = this.selectedFormatRencontre;
    this.editFormatRencontreDialog = false;
    this.selectedFormatRencontre = new FormatRencontreVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editFormatRencontreDialog  = false;
}

// getters and setters

get formatRencontres(): Array<FormatRencontreVo> {
    return this.formatRencontreService.formatRencontres;
       }
set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }

 get selectedFormatRencontre(): FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }

   get editFormatRencontreDialog(): boolean {
           return this.formatRencontreService.editFormatRencontreDialog;

       }
    set editFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.editFormatRencontreDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
