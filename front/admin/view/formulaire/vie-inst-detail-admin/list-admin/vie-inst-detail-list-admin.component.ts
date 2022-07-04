import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetail.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';

import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

@Component({
    selector: 'app-vie-institutionnelle-detail-list-admin',
    templateUrl: './vie-inst-detail-list-admin.component.html',
    styleUrls: ['./vie-inst-detail-list-admin.component.css']
})
export class VieInstitutionnelleDetailListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'VieInstitutionnelleDetail';
    yesno: any[] = [];
    typeInstances: Array<TypeInstanceVo>;
    structureIrds: Array<StructureIrdVo>;
    payss: Array<PaysVo>;
    vieInstitutionnelles: Array<VieInstitutionnelleVo>;


    constructor(private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService
        , private typeInstanceService: TypeInstanceService
        , private structureIrdService: StructureIrdService
        , private paysService: PaysService
        , private vieInstitutionnelleService: VieInstitutionnelleService
    ) {
    }

    ngOnInit(): void {
        this.loadVieInstitutionnelleDetails();
        this.initExport();
        this.initCol();
        this.loadTypeInstance();
        this.loadStructureIrd();
        this.loadPays();
        this.loadVieInstitutionnelle();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadVieInstitutionnelleDetails() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.vieInstitutionnelleDetailService.findAll().subscribe(vieInstitutionnelleDetails => this.vieInstitutionnelleDetails = vieInstitutionnelleDetails, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.vieInstitutionnelleDetailService.findByCriteria(this.searchVieInstitutionnelleDetail).subscribe(vieInstitutionnelleDetails => {

            this.vieInstitutionnelleDetails = vieInstitutionnelleDetails;
            // this.searchVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'typeInstance?.libelle', header: 'Type instance'},
            {field: 'cooreleStructureIrd', header: 'Coorele structure ird'},
            {field: 'structureIrd?.libelle', header: 'Structure ird'},
            {field: 'cooreleInstrumentIrd', header: 'Coorele instrument ird'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'pays?.libelle', header: 'Pays'},
            {field: 'vieInstitutionnelle?.id', header: 'Vie institutionnelle'},
        ];
    }

    public async editVieInstitutionnelleDetail(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'edit');
        if (isPermistted) {
            this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(res => {
                this.selectedVieInstitutionnelleDetail = res;
                this.editVieInstitutionnelleDetailDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewVieInstitutionnelleDetail(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'view');
        if (isPermistted) {
            this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(res => {
                this.selectedVieInstitutionnelleDetail = res;
                this.viewVieInstitutionnelleDetailDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateVieInstitutionnelleDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
            this.createVieInstitutionnelleDetailDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteVieInstitutionnelleDetail(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Vie institutionnelle detail) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.vieInstitutionnelleDetailService.delete(vieInstitutionnelleDetail).subscribe(status => {
                        if (status > 0) {
                            const position = this.vieInstitutionnelleDetails.indexOf(vieInstitutionnelleDetail);
                            position > -1 ? this.vieInstitutionnelleDetails.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Vie institutionnelle detail Supprimé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadTypeInstance() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.typeInstanceService.findAll().subscribe(typeInstances => this.typeInstances = typeInstances, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadStructureIrd() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.structureIrdService.findAll().subscribe(structureIrds => this.structureIrds = structureIrds, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPays() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadVieInstitutionnelle() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'list');
        isPermistted ? this.vieInstitutionnelleService.findAll().subscribe(vieInstitutionnelles => this.vieInstitutionnelles = vieInstitutionnelles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateVieInstitutionnelleDetail(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {

        this.vieInstitutionnelleDetailService.findByIdWithAssociatedList(vieInstitutionnelleDetail).subscribe(
            res => {
                this.initDuplicateVieInstitutionnelleDetail(res);
                this.selectedVieInstitutionnelleDetail = res;
                this.selectedVieInstitutionnelleDetail.id = null;
                this.createVieInstitutionnelleDetailDialog = true;

            });

    }

    initDuplicateVieInstitutionnelleDetail(res: VieInstitutionnelleDetailVo) {
        if (res.vieInstitutionnelleDetailInstrumentIrdsVo != null) {
            res.vieInstitutionnelleDetailInstrumentIrdsVo.forEach(d => {
                d.vieInstitutionnelleDetailVo = null;
                d.id = null;
            });
        }
        if (res.vieInstitutionnelleDetailEtablissementsVo != null) {
            res.vieInstitutionnelleDetailEtablissementsVo.forEach(d => {
                d.vieInstitutionnelleDetailVo = null;
                d.id = null;
            });
        }


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.exportCSV();
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.exportExcel();
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.exportPdf();
                }
            }
        ];
    }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {
            this.prepareColumnExport();
            const worksheet = xlsx.utils.json_to_sheet(this.exportData);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, this.fileName);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            FileSaver.saveAs(data, fileName + '.xlsx');
        });
    }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {
            columns: [
                {header: 'Type instance', dataKey: 'Type instance'},
                {header: 'Coorele structure ird', dataKey: 'Coorele structure ird'},
                {header: 'Structure ird', dataKey: 'Structure ird'},
                {header: 'Coorele instrument ird', dataKey: 'Coorele instrument ird'},
                {header: 'Libelle', dataKey: 'Libelle'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Vie institutionnelle', dataKey: 'Vie institutionnelle'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
        this.prepareColumnExport();
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(this.exportData[0]);
        let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csv.unshift(header.join(';'));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], {type: 'text/csv'});
        saveAs(blob, this.fileName + '.csv');
    }

    prepareColumnExport(): void {
        this.exportData = this.vieInstitutionnelleDetails.map(e => {
            return {
                'Type instance': e.typeInstanceVo?.libelle,
                'Coorele structure ird': e.cooreleStructureIrd,
                'Structure ird': e.structureIrdVo?.libelle,
                'Coorele instrument ird': e.cooreleInstrumentIrd,
                'Libelle': e.libelle,
                'Pays': e.paysVo?.libelle,
                'Vie institutionnelle': e.vieInstitutionnelleVo?.id,
            };
        });
    }

    // getters and setters

    get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
        return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
    }

    set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
    }

    get vieInstitutionnelleDetailSelections(): Array<VieInstitutionnelleDetailVo> {
        return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetailSelections;
    }

    set vieInstitutionnelleDetailSelections(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetailSelections = value;
    }


    get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
        return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
    }

    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
    }

    get createVieInstitutionnelleDetailDialog(): boolean {
        return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;
    }

    set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog = value;
    }

    get editVieInstitutionnelleDetailDialog(): boolean {
        return this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog;
    }

    set editVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog = value;
    }

    get viewVieInstitutionnelleDetailDialog(): boolean {
        return this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog;
    }

    set viewVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog = value;
    }

    get searchVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
        return this.vieInstitutionnelleDetailService.searchVieInstitutionnelleDetail;
    }

    set searchVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.searchVieInstitutionnelleDetail = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
