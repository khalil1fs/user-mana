import {Component, OnInit} from '@angular/core';
import {
    TypeOutilCultureScientifiqueOutilPedagogiqueService
} from 'src/app/controller/service/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.service';
import {
    TypeOutilCultureScientifiqueOutilPedagogiqueVo
} from 'src/app/controller/model/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {
    CultureScientifiqueOutilPedagogiqueService
} from 'src/app/controller/service/formulaire/CultureScientifiqueOutilPedagogique.service';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';

import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {CultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/CultureScientifiqueOutilPedagogique.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-type-outil-culture-scientifique-outil-pedagogique-list-admin',
    templateUrl: './t-cu-sc-outil-ped-list-admin.component.html',
    styleUrls: ['./t-cu-sc-outil-ped-list-admin.component.css']
})
export class TypeOutilCultureScientifiqueOutilPedagogiqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'TypeOutilCultureScientifiqueOutilPedagogique';
    yesno: any[] = [];
    cultureScientifiqueOutilPedagogiques: Array<CultureScientifiqueOutilPedagogiqueVo>;
    typeOutils: Array<TypeOutilVo>;


    constructor(private typeOutilCultureScientifiqueOutilPedagogiqueService: TypeOutilCultureScientifiqueOutilPedagogiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router
        , private cultureScientifiqueOutilPedagogiqueService: CultureScientifiqueOutilPedagogiqueService
        , private typeOutilService: TypeOutilService
    ) {
    }

    get typeOutilCultureScientifiqueOutilPedagogiques(): Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo> {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiques;
    }

    set typeOutilCultureScientifiqueOutilPedagogiques(value: Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo>) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiques = value;
    }

    get typeOutilCultureScientifiqueOutilPedagogiqueSelections(): Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo> {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiqueSelections;
    }

    set typeOutilCultureScientifiqueOutilPedagogiqueSelections(value: Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo>) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiqueSelections = value;
    }

    get selectedTypeOutilCultureScientifiqueOutilPedagogique(): TypeOutilCultureScientifiqueOutilPedagogiqueVo {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.selectedTypeOutilCultureScientifiqueOutilPedagogique;
    }

    set selectedTypeOutilCultureScientifiqueOutilPedagogique(value: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.selectedTypeOutilCultureScientifiqueOutilPedagogique = value;
    }

    get createTypeOutilCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog;
    }

    set createTypeOutilCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get editTypeOutilCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.editTypeOutilCultureScientifiqueOutilPedagogiqueDialog;
    }

    set editTypeOutilCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.editTypeOutilCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get viewTypeOutilCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.viewTypeOutilCultureScientifiqueOutilPedagogiqueDialog;
    }

    set viewTypeOutilCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.viewTypeOutilCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get searchTypeOutilCultureScientifiqueOutilPedagogique(): TypeOutilCultureScientifiqueOutilPedagogiqueVo {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.searchTypeOutilCultureScientifiqueOutilPedagogique;
    }

    set searchTypeOutilCultureScientifiqueOutilPedagogique(value: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.searchTypeOutilCultureScientifiqueOutilPedagogique = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

    ngOnInit(): void {
        this.loadTypeOutilCultureScientifiqueOutilPedagogiques();
        this.initExport();
        this.initCol();
        this.loadCultureScientifiqueOutilPedagogique();
        this.loadTypeOutil();
        this.yesno = [{label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
    }

    // methods
    public async loadTypeOutilCultureScientifiqueOutilPedagogiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.typeOutilCultureScientifiqueOutilPedagogiqueService.findAll().subscribe(typeOutilCultureScientifiqueOutilPedagogiques => this.typeOutilCultureScientifiqueOutilPedagogiques = typeOutilCultureScientifiqueOutilPedagogiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.findByCriteria(this.searchTypeOutilCultureScientifiqueOutilPedagogique).subscribe(typeOutilCultureScientifiqueOutilPedagogiques => {

            this.typeOutilCultureScientifiqueOutilPedagogiques = typeOutilCultureScientifiqueOutilPedagogiques;
            // this.searchTypeOutilCultureScientifiqueOutilPedagogique = new TypeOutilCultureScientifiqueOutilPedagogiqueVo();
        }, error => console.log(error));
    }

    // getters and setters

    public async editTypeOutilCultureScientifiqueOutilPedagogique(typeOutilCultureScientifiqueOutilPedagogique: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'edit');
        if (isPermistted) {
            this.typeOutilCultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilCultureScientifiqueOutilPedagogique).subscribe(res => {
                this.selectedTypeOutilCultureScientifiqueOutilPedagogique = res;
                this.editTypeOutilCultureScientifiqueOutilPedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }

    public async viewTypeOutilCultureScientifiqueOutilPedagogique(typeOutilCultureScientifiqueOutilPedagogique: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'view');
        if (isPermistted) {
            this.typeOutilCultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilCultureScientifiqueOutilPedagogique).subscribe(res => {
                this.selectedTypeOutilCultureScientifiqueOutilPedagogique = res;
                this.viewTypeOutilCultureScientifiqueOutilPedagogiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateTypeOutilCultureScientifiqueOutilPedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypeOutilCultureScientifiqueOutilPedagogique = new TypeOutilCultureScientifiqueOutilPedagogiqueVo();
            this.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteTypeOutilCultureScientifiqueOutilPedagogique(typeOutilCultureScientifiqueOutilPedagogique: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimé cet élément (Type outil culture scientifique outil pedagogique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeOutilCultureScientifiqueOutilPedagogiqueService.delete(typeOutilCultureScientifiqueOutilPedagogique).subscribe(status => {
                        if (status > 0) {
                            const position = this.typeOutilCultureScientifiqueOutilPedagogiques.indexOf(typeOutilCultureScientifiqueOutilPedagogique);
                            position > -1 ? this.typeOutilCultureScientifiqueOutilPedagogiques.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Type outil culture scientifique outil pedagogique Supprimé',
                            life: 3000
                        });
                    }, error => console.log(error))
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadCultureScientifiqueOutilPedagogique() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.cultureScientifiqueOutilPedagogiqueService.findAll().subscribe(cultureScientifiqueOutilPedagogiques => this.cultureScientifiqueOutilPedagogiques = cultureScientifiqueOutilPedagogiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTypeOutil() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOutilCultureScientifiqueOutilPedagogique', 'list');
        isPermistted ? this.typeOutilService.findAll().subscribe(typeOutils => this.typeOutils = typeOutils, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateTypeOutilCultureScientifiqueOutilPedagogique(typeOutilCultureScientifiqueOutilPedagogique: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {

        this.typeOutilCultureScientifiqueOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilCultureScientifiqueOutilPedagogique).subscribe(
            res => {
                this.initDuplicateTypeOutilCultureScientifiqueOutilPedagogique(res);
                this.selectedTypeOutilCultureScientifiqueOutilPedagogique = res;
                this.selectedTypeOutilCultureScientifiqueOutilPedagogique.id = null;
                this.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = true;

            });

    }

    initDuplicateTypeOutilCultureScientifiqueOutilPedagogique(res: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {


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
                {header: 'Culture scientifique outil pedagogique', dataKey: 'Culture scientifique outil pedagogique'},
                {header: 'Type outil', dataKey: 'Type outil'},
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
        var blob = new Blob([csvArray], {type: 'text/csv'})
        saveAs(blob, this.fileName + ".csv");
    }

    prepareColumnExport(): void {
        this.exportData = this.typeOutilCultureScientifiqueOutilPedagogiques.map(e => {
            return {
                'Culture scientifique outil pedagogique': e.cultureScientifiqueOutilPedagogiqueVo?.id,
                'Type outil': e.typeOutilVo?.libelle,
            }
        });
    }

    private initCol() {
        this.cols = [
            {field: 'cultureScientifiqueOutilPedagogique?.id', header: 'Culture scientifique outil pedagogique'},
            {field: 'typeOutil?.libelle', header: 'Type outil'},
        ];
    }


}
