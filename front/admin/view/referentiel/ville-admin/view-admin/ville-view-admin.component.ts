import {Component, OnInit} from '@angular/core';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ville-view-admin',
  templateUrl: './ville-view-admin.component.html',
  styleUrls: ['./ville-view-admin.component.css']
})
export class VilleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private villeService: VilleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewVilleDialog  = false;
}

// getters and setters

get villes(): Array<VilleVo> {
    return this.villeService.villes;
       }
set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }

 get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }

   get viewVilleDialog(): boolean {
           return this.villeService.viewVilleDialog;

       }
    set viewVilleDialog(value: boolean) {
        this.villeService.viewVilleDialog= value;
       }

       get selectedPays(): PaysVo {
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
       get editPaysDialog(): boolean {
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
