import {Component, OnInit} from '@angular/core';
import {DoctorantService} from 'src/app/controller/service/formulaire/Doctorant.service';
import {DoctorantVo} from 'src/app/controller/model/formulaire/Doctorant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-doctorant-view-admin',
  templateUrl: './doctorant-view-admin.component.html',
  styleUrls: ['./doctorant-view-admin.component.css']
})
export class DoctorantViewAdminComponent implements OnInit {


constructor(private doctorantService: DoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private sexeService :SexeService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewDoctorantDialog  = false;
}

// getters and setters

get doctorants(): Array<DoctorantVo> {
    return this.doctorantService.doctorants;
       }
set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }

 get selectedDoctorant():DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
    set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }

   get viewDoctorantDialog():boolean {
           return this.doctorantService.viewDoctorantDialog;

       }
    set viewDoctorantDialog(value: boolean) {
        this.doctorantService.viewDoctorantDialog= value;
       }

       get selectedSexe():SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes():Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get editSexeDialog():boolean {
           return this.sexeService.editSexeDialog;
       }
      set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
