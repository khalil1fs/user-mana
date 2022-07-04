import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {VieInstitutionnelleDetailVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetail.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-vie-institutionnelle-view-admin',
  templateUrl: './vie-institutionnelle-view-admin.component.html',
  styleUrls: ['./vie-institutionnelle-view-admin.component.css']
})
export class VieInstitutionnelleViewAdminComponent implements OnInit {

        selectedVieInstitutionnelleDetails: VieInstitutionnelleDetailVo = new VieInstitutionnelleDetailVo();
        vieInstitutionnelleDetailsListe: Array<VieInstitutionnelleDetailVo> = [];

        myTypeInstances: Array<TypeInstanceVo> = [];
        myStructureIrds: Array<StructureIrdVo> = [];
        myPayss: Array<PaysVo> = [];


constructor(private vieInstitutionnelleService: VieInstitutionnelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private typeInstanceService :TypeInstanceService
    ,private structureIrdService :StructureIrdService
    ,private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
    ,private campagneService :CampagneService
    ,private paysService :PaysService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedVieInstitutionnelle=new VieInstitutionnelleVo();
                this.selectedVieInstitutionnelleDetails=new VieInstitutionnelleDetailVo();
                this.selectedVieInstitutionnelleDetails.typeInstanceVo = new TypeInstanceVo();
                this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
                this.selectedVieInstitutionnelleDetails.structureIrdVo = new StructureIrdVo();
                this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
                this.selectedVieInstitutionnelleDetails.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewVieInstitutionnelleDialog  = false;
    this.selectedVieInstitutionnelle=new VieInstitutionnelleVo();
    this.selectedVieInstitutionnelleDetails=new VieInstitutionnelleDetailVo();
}

// getters and setters

get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
    return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }

 get selectedVieInstitutionnelle():VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }

   get viewVieInstitutionnelleDialog():boolean {
           return this.vieInstitutionnelleService.viewVieInstitutionnelleDialog;

       }
    set viewVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.viewVieInstitutionnelleDialog= value;
       }

       get selectedTypeInstance():TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
      set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
       get typeInstances():Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
       set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }
       get editTypeInstanceDialog():boolean {
           return this.typeInstanceService.editTypeInstanceDialog;
       }
      set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog= value;
       }
       get selectedCampagne():CampagneVo {
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
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur():ChercheurVo {
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
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
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
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedStructureIrd():StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
      set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
       get structureIrds():Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
       set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }
       get editStructureIrdDialog():boolean {
           return this.structureIrdService.editStructureIrdDialog;
       }
      set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog= value;
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
     viewVieInstitutionnelleDetails(p: VieInstitutionnelleDetailVo){
        this.selectedVieInstitutionnelleDetails=p;
     }
}
