import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueMasterService} from 'src/app/controller/service/formulaire/ResponsabilitePedagogiqueMaster.service';
import {ResponsabilitePedagogiqueMasterVo} from 'src/app/controller/model/formulaire/ResponsabilitePedagogiqueMaster.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {MasterVo} from 'src/app/controller/model/referentiel/Master.model';
import {MasterService} from 'src/app/controller/service/referentiel/Master.service';
import {StatutMasterVo} from 'src/app/controller/model/referentiel/StatutMaster.model';
import {StatutMasterService} from 'src/app/controller/service/referentiel/StatutMaster.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-responsabilite-pedagogique-master-edit-admin',
  templateUrl: './resp-ped-master-edit-admin.component.html',
  styleUrls: ['./resp-ped-master-edit-admin.component.css']
})
export class ResponsabilitePedagogiqueMasterEditAdminComponent implements OnInit {


constructor(private responsabilitePedagogiqueMasterService: ResponsabilitePedagogiqueMasterService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private masterService: MasterService
 ,       private statutMasterService: StatutMasterService
 ,       private etablissementService: EtablissementService
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedStatutMaster = new StatutMasterVo();
    this.statutMasterService.findAll().subscribe((data) => this.statutMasters = data);
    this.selectedMaster = new MasterVo();
    this.masterService.findAll().subscribe((data) => this.masters = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.responsabilitePedagogiqueMasterService.edit().subscribe(responsabilitePedagogiqueMaster=>{
    const myIndex = this.responsabilitePedagogiqueMasters.findIndex(e => e.id === this.selectedResponsabilitePedagogiqueMaster.id);
    this.responsabilitePedagogiqueMasters[myIndex] = this.selectedResponsabilitePedagogiqueMaster;
    this.editResponsabilitePedagogiqueMasterDialog = false;
    this.selectedResponsabilitePedagogiqueMaster = new ResponsabilitePedagogiqueMasterVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.editEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatutMaster(statutMaster: string) {
                      const isPermistted = await this.roleService.isPermitted('StatutMaster', 'add');
                       if(isPermistted){
         this.selectedStatutMaster = new StatutMasterVo();
        this.editStatutMasterDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.editCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemaster(master: string) {
                      const isPermistted = await this.roleService.isPermitted('Master', 'add');
                       if(isPermistted){
         this.selectedMaster = new MasterVo();
        this.editMasterDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.editEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.editChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editResponsabilitePedagogiqueMasterDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueMasters(): Array<ResponsabilitePedagogiqueMasterVo> {
    return this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters;
       }
set responsabilitePedagogiqueMasters(value: Array<ResponsabilitePedagogiqueMasterVo>) {
        this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters = value;
       }

 get selectedResponsabilitePedagogiqueMaster(): ResponsabilitePedagogiqueMasterVo {
           return this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster;
       }
    set selectedResponsabilitePedagogiqueMaster(value: ResponsabilitePedagogiqueMasterVo) {
        this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster = value;
       }

   get editResponsabilitePedagogiqueMasterDialog(): boolean {
           return this.responsabilitePedagogiqueMasterService.editResponsabilitePedagogiqueMasterDialog;

       }
    set editResponsabilitePedagogiqueMasterDialog(value: boolean) {
        this.responsabilitePedagogiqueMasterService.editResponsabilitePedagogiqueMasterDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog(): boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedStatutMaster(): StatutMasterVo {
           return this.statutMasterService.selectedStatutMaster;
       }
      set selectedStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.selectedStatutMaster = value;
       }
       get statutMasters(): Array<StatutMasterVo> {
           return this.statutMasterService.statutMasters;
       }
       set statutMasters(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasters = value;
       }
       get editStatutMasterDialog(): boolean {
           return this.statutMasterService.editStatutMasterDialog;
       }
      set editStatutMasterDialog(value: boolean) {
        this.statutMasterService.editStatutMasterDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog(): boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedMaster(): MasterVo {
           return this.masterService.selectedMaster;
       }
      set selectedMaster(value: MasterVo) {
        this.masterService.selectedMaster = value;
       }
       get masters(): Array<MasterVo> {
           return this.masterService.masters;
       }
       set masters(value: Array<MasterVo>) {
        this.masterService.masters = value;
       }
       get editMasterDialog(): boolean {
           return this.masterService.editMasterDialog;
       }
      set editMasterDialog(value: boolean) {
        this.masterService.editMasterDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get editEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
