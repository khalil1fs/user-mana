import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetail.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailInstrumentIrd.model';
import {VieInstitutionnelleDetailInstrumentIrdService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetailInstrumentIrd.service';
import {InstrumentIrdVo} from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import {InstrumentIrdService} from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {VieInstitutionnelleDetailEtablissementVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailEtablissement.model';
import {VieInstitutionnelleDetailEtablissementService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetailEtablissement.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-edit-admin',
  templateUrl: './vie-inst-detail-edit-admin.component.html',
  styleUrls: ['./vie-inst-detail-edit-admin.component.css']
})
export class VieInstitutionnelleDetailEditAdminComponent implements OnInit {

        selectedVieInstitutionnelleDetailInstrumentIrds: VieInstitutionnelleDetailInstrumentIrdVo = new VieInstitutionnelleDetailInstrumentIrdVo();
        vieInstitutionnelleDetailInstrumentIrdsListe: Array<VieInstitutionnelleDetailInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedVieInstitutionnelleDetailEtablissements: VieInstitutionnelleDetailEtablissementVo = new VieInstitutionnelleDetailEtablissementVo();
        vieInstitutionnelleDetailEtablissementsListe: Array<VieInstitutionnelleDetailEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];


constructor(private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etablissementService: EtablissementService
 ,       private typeInstanceService: TypeInstanceService
 ,       private vieInstitutionnelleService: VieInstitutionnelleService
 ,       private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private structureIrdService: StructureIrdService
 ,       private paysService: PaysService
 ,       private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService
) {
}

// methods
ngOnInit(): void {
                this.selectedVieInstitutionnelleDetailInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedVieInstitutionnelleDetailEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedTypeInstance = new TypeInstanceVo();
    this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
    this.selectedStructureIrd = new StructureIrdVo();
    this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
    this.vieInstitutionnelleService.findAll().subscribe((data) => this.vieInstitutionnelles = data);
}
       addvieInstitutionnelleDetailInstrumentIrds() {
        if( this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailInstrumentIrdsVo == null ){
            this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailInstrumentIrdsVo = new Array<VieInstitutionnelleDetailInstrumentIrdVo>();
        }
        this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailInstrumentIrdsVo.push(this.selectedVieInstitutionnelleDetailInstrumentIrds);
        this.selectedVieInstitutionnelleDetailInstrumentIrds = new VieInstitutionnelleDetailInstrumentIrdVo();
        }

        deleteVieInstitutionnelleDetailInstrumentIrds(p: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailInstrumentIrdsVo.splice(index, 1); }
        });
    }
       addvieInstitutionnelleDetailEtablissements() {
        if( this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailEtablissementsVo == null ){
            this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailEtablissementsVo = new Array<VieInstitutionnelleDetailEtablissementVo>();
        }
        this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailEtablissementsVo.push(this.selectedVieInstitutionnelleDetailEtablissements);
        this.selectedVieInstitutionnelleDetailEtablissements = new VieInstitutionnelleDetailEtablissementVo();
        }

        deleteVieInstitutionnelleDetailEtablissements(p: VieInstitutionnelleDetailEtablissementVo) {
        this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailEtablissementsVo.forEach((element, index) => {
            if (element === p) { this.selectedVieInstitutionnelleDetail.vieInstitutionnelleDetailEtablissementsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.vieInstitutionnelleDetailService.edit().subscribe(vieInstitutionnelleDetail=>{
    const myIndex = this.vieInstitutionnelleDetails.findIndex(e => e.id === this.selectedVieInstitutionnelleDetail.id);
    this.vieInstitutionnelleDetails[myIndex] = this.selectedVieInstitutionnelleDetail;
    this.editVieInstitutionnelleDetailDialog = false;
    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();


    }, error => {
        console.log(error);
    });

}

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
              public async openCreatetypeInstance(typeInstance: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstance', 'add');
                       if(isPermistted){
         this.selectedTypeInstance = new TypeInstanceVo();
        this.createTypeInstanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatevieInstitutionnelle(vieInstitutionnelle: string) {
                      const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'add');
                       if(isPermistted){
         this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
        this.createVieInstitutionnelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestructureIrd(structureIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('StructureIrd', 'add');
                       if(isPermistted){
         this.selectedStructureIrd = new StructureIrdVo();
        this.createStructureIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editVieInstitutionnelleDetailDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
    return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }

 get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }

   get editVieInstitutionnelleDetailDialog(): boolean {
           return this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog;

       }
    set editVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog = value;
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
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
      set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
       get typeInstances(): Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
       set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }
       get createTypeInstanceDialog(): boolean {
           return this.typeInstanceService.createTypeInstanceDialog;
       }
      set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
       }
       get selectedVieInstitutionnelle(): VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
      set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }
       get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
           return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
       set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }
       get createVieInstitutionnelleDialog(): boolean {
           return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;
       }
      set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }
       get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
      set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
       get structureIrds(): Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
       set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }
       get createStructureIrdDialog(): boolean {
           return this.structureIrdService.createStructureIrdDialog;
       }
      set createStructureIrdDialog(value: boolean) {
        this.structureIrdService.createStructureIrdDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
