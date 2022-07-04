import {Component, OnInit} from '@angular/core';
import {EtatReclamationService} from '../../../../../../controller/service/config/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/config/EtatReclamation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/formulaire/Role.service';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-etat-reclamation-list-admin',
  templateUrl: './etat-reclamation-list-admin.component.html',
  styleUrls: ['./etat-reclamation-list-admin.component.css']
})
export class EtatReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'EtatReclamation';
    yesno :any[] =[];


    constructor(private etatReclamationService: EtatReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router
) { }

    ngOnInit(): void {
      this.loadEtatReclamations();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
    public async loadEtatReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'list');
        isPermistted ? this.etatReclamationService.findAll().subscribe(etatReclamations => this.etatReclamations = etatReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

 public searchRequest(){
        this.etatReclamationService.findByCriteria(this.searchEtatReclamation).subscribe(etatReclamations=>{
            
            this.etatReclamations = etatReclamations;
           // this.searchEtatReclamation = new EtatReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatReclamation(etatReclamation:EtatReclamationVo){
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'edit');
         if(isPermistted){
          this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(res => {
           this.selectedEtatReclamation = res;
            this.editEtatReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatReclamation(etatReclamation:EtatReclamationVo){
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'view');
        if(isPermistted){
           this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(res => {
           this.selectedEtatReclamation = res;
            this.viewEtatReclamationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
            this.createEtatReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }

    public async deleteEtatReclamation(etatReclamation:EtatReclamationVo){
       const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimé cet élément (Etat reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatReclamationService.delete(etatReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatReclamations.indexOf(etatReclamation);
                          position > -1 ? this.etatReclamations.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat reclamation Supprimé',
                        life: 3000
                    });
                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }


public async duplicateEtatReclamation(etatReclamation: EtatReclamationVo) {

     this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(
	 res => {
	       this.initDuplicateEtatReclamation(res);
	       this.selectedEtatReclamation = res;
	       this.selectedEtatReclamation.id = null;
            this.createEtatReclamationDialog = true;

});

	}

	initDuplicateEtatReclamation(res: EtatReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.exportCSV();}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.exportExcel();}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.exportPdf();}}
    ];
  }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {this.prepareColumnExport();
        const worksheet = xlsx.utils.json_to_sheet(this.exportData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
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
        autoTable(doc, {columns: [
        {header: 'Libelle', dataKey: 'Libelle' },
        {header: 'Code', dataKey: 'Code' },
        ],
        body: this.exportData,styles : {fontSize: 5}});
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
    this.prepareColumnExport();
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.exportData[0]);
    let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, this.fileName+".csv");
  }

    prepareColumnExport(): void {
    this.exportData = this.etatReclamations.map(e => {
    return {
           'Libelle': e.libelle ,
           'Code': e.code ,
     }
      });
      }

    // getters and setters

    get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
    set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

    get etatReclamationSelections(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamationSelections;
       }
    set etatReclamationSelections(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamationSelections = value;
       }
   
     


    get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
    
    get createEtatReclamationDialog():boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
    set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
       }
    
    get editEtatReclamationDialog():boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
    set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
       }
    get viewEtatReclamationDialog():boolean {
           return this.etatReclamationService.viewEtatReclamationDialog;
       }
    set viewEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.viewEtatReclamationDialog = value;
       }
       
     get searchEtatReclamation(): EtatReclamationVo {
        return this.etatReclamationService.searchEtatReclamation;
       }
    set searchEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.searchEtatReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
