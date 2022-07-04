import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';

@Component({
  selector: 'app-etablissement-view-admin',
  templateUrl: './etablissement-view-admin.component.html',
  styleUrls: ['./etablissement-view-admin.component.css']
})
export class EtablissementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementService: EtablissementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private villeService: VilleService
    ,private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewEtablissementDialog  = false;
}

// getters and setters

get etablissements(): Array<EtablissementVo> {
    return this.etablissementService.etablissements;
       }
set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }

 get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
    set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }

   get viewEtablissementDialog(): boolean {
           return this.etablissementService.viewEtablissementDialog;

       }
    set viewEtablissementDialog(value: boolean) {
        this.etablissementService.viewEtablissementDialog= value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog(): boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
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
