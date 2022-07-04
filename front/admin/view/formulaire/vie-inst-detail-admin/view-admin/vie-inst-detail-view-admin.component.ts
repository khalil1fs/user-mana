import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetail.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';
import {
    VieInstitutionnelleDetailInstrumentIrdVo
} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailInstrumentIrd.model';
import {
    VieInstitutionnelleDetailInstrumentIrdService
} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetailInstrumentIrd.service';
import {InstrumentIrdVo} from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import {InstrumentIrdService} from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {
    VieInstitutionnelleDetailEtablissementVo
} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailEtablissement.model';
import {
    VieInstitutionnelleDetailEtablissementService
} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetailEtablissement.service';

@Component({
    selector: 'app-vie-institutionnelle-detail-view-admin',
    templateUrl: './vie-inst-detail-view-admin.component.html',
    styleUrls: ['./vie-inst-detail-view-admin.component.css']
})
export class VieInstitutionnelleDetailViewAdminComponent implements OnInit {

    selectedVieInstitutionnelleDetailInstrumentIrds: VieInstitutionnelleDetailInstrumentIrdVo = new VieInstitutionnelleDetailInstrumentIrdVo();
    vieInstitutionnelleDetailInstrumentIrdsListe: Array<VieInstitutionnelleDetailInstrumentIrdVo> = [];

    myInstrumentIrds: Array<InstrumentIrdVo> = [];

    selectedVieInstitutionnelleDetailEtablissements: VieInstitutionnelleDetailEtablissementVo = new VieInstitutionnelleDetailEtablissementVo();
    vieInstitutionnelleDetailEtablissementsListe: Array<VieInstitutionnelleDetailEtablissementVo> = [];

    myEtablissements: Array<EtablissementVo> = [];


    constructor(private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private etablissementService: EtablissementService
        , private typeInstanceService: TypeInstanceService
        , private vieInstitutionnelleService: VieInstitutionnelleService
        , private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService
        , private instrumentIrdService: InstrumentIrdService
        , private structureIrdService: StructureIrdService
        , private paysService: PaysService
        , private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService
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

    hideViewDialog() {
        this.viewVieInstitutionnelleDetailDialog = false;
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

    get viewVieInstitutionnelleDetailDialog(): boolean {
        return this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog;

    }

    set viewVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog = value;
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
        this.etablissementService.editEtablissementDialog = value;
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

    get editTypeInstanceDialog(): boolean {
        return this.typeInstanceService.editTypeInstanceDialog;
    }

    set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog = value;
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

    get editVieInstitutionnelleDialog(): boolean {
        return this.vieInstitutionnelleService.editVieInstitutionnelleDialog;
    }

    set editVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.editVieInstitutionnelleDialog = value;
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

    get editInstrumentIrdDialog(): boolean {
        return this.instrumentIrdService.editInstrumentIrdDialog;
    }

    set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog = value;
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

    get editStructureIrdDialog(): boolean {
        return this.structureIrdService.editStructureIrdDialog;
    }

    set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog = value;
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

    get editPaysDialog(): boolean {
        return this.paysService.editPaysDialog;
    }

    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
