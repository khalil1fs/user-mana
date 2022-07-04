import {Component, OnInit, Input} from '@angular/core';
import {ResponsabilitePedagogiqueMasterService} from 'src/app/controller/service/formulaire/ResponsabilitePedagogiqueMaster.service';
import {ResponsabilitePedagogiqueMasterVo} from 'src/app/controller/model/formulaire/ResponsabilitePedagogiqueMaster.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


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
  selector: 'app-responsabilite-pedagogique-master-create-admin',
  templateUrl: './resp-ped-master-create-admin.component.html',
  styleUrls: ['./resp-ped-master-create-admin.component.css']
})
export class ResponsabilitePedagogiqueMasterCreateAdminComponent implements OnInit {

constructor(private responsabilitePedagogiqueMasterService: ResponsabilitePedagogiqueMasterService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private masterService :MasterService
  ,       private statutMasterService :StatutMasterService
  ,       private etablissementService :EtablissementService
  ,       private campagneService :CampagneService
  ,       private chercheurService :ChercheurService
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

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.responsabilitePedagogiqueMasterService.save().subscribe(responsabilitePedagogiqueMaster=>{
       this.responsabilitePedagogiqueMasters.push({...responsabilitePedagogiqueMaster});
       this.createResponsabilitePedagogiqueMasterDialog = false;
       this.selectedResponsabilitePedagogiqueMaster = new ResponsabilitePedagogiqueMasterVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
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
        this.createStatutMasterDialog = true;
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
        this.createCampagneDialog = true;
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
        this.createMasterDialog = true;
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
        this.createEtatEtapeCampagneDialog = true;
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
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createResponsabilitePedagogiqueMasterDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueMasters(): Array<ResponsabilitePedagogiqueMasterVo> {
    return this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters;
       }
set responsabilitePedagogiqueMasters(value: Array<ResponsabilitePedagogiqueMasterVo>) {
        this.responsabilitePedagogiqueMasterService.responsabilitePedagogiqueMasters = value;
       }

 get selectedResponsabilitePedagogiqueMaster():ResponsabilitePedagogiqueMasterVo {
           return this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster;
       }
    set selectedResponsabilitePedagogiqueMaster(value: ResponsabilitePedagogiqueMasterVo) {
        this.responsabilitePedagogiqueMasterService.selectedResponsabilitePedagogiqueMaster = value;
       }

   get createResponsabilitePedagogiqueMasterDialog(): boolean {
           return this.responsabilitePedagogiqueMasterService.createResponsabilitePedagogiqueMasterDialog;

       }
    set createResponsabilitePedagogiqueMasterDialog(value: boolean) {
        this.responsabilitePedagogiqueMasterService.createResponsabilitePedagogiqueMasterDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedStatutMaster(): StatutMasterVo {
           return this.statutMasterService.selectedStatutMaster;
       }
      set selectedStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.selectedStatutMaster = value;
       }
       get statutMasters():Array<StatutMasterVo> {
           return this.statutMasterService.statutMasters;
       }
       set statutMasters(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasters = value;
       }
       get createStatutMasterDialog(): boolean {
           return this.statutMasterService.createStatutMasterDialog;
       }
      set createStatutMasterDialog(value: boolean) {
        this.statutMasterService.createStatutMasterDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedMaster(): MasterVo {
           return this.masterService.selectedMaster;
       }
      set selectedMaster(value: MasterVo) {
        this.masterService.selectedMaster = value;
       }
       get masters():Array<MasterVo> {
           return this.masterService.masters;
       }
       set masters(value: Array<MasterVo>) {
        this.masterService.masters = value;
       }
       get createMasterDialog(): boolean {
           return this.masterService.createMasterDialog;
       }
      set createMasterDialog(value: boolean) {
        this.masterService.createMasterDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
