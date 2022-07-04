import {Component, OnInit} from '@angular/core';
import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-format-rencontre-view-admin',
  templateUrl: './format-rencontre-view-admin.component.html',
  styleUrls: ['./format-rencontre-view-admin.component.css']
})
export class FormatRencontreViewAdminComponent implements OnInit {


constructor(private formatRencontreService: FormatRencontreService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewFormatRencontreDialog  = false;
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

   get viewFormatRencontreDialog():boolean {
           return this.formatRencontreService.viewFormatRencontreDialog;

       }
    set viewFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.viewFormatRencontreDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
