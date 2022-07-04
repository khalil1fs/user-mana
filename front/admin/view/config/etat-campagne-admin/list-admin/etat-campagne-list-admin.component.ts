import {Component, OnInit} from '@angular/core';
import {EtatCampagneService} from '../../../../../../controller/service/config/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../../controller/model/config/EtatCampagne.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/formulaire/Role.service';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-etat-campagne-list-admin',
  templateUrl: './etat-campagne-list-admin.component.html',
  styleUrls: ['./etat-campagne-list-admin.component.css']
})
export class EtatCampagneListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EtatCampagne';
    yesno :any[] =[];


    constructor(private etatCampagneService: EtatCampagneService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router
) { }

    ngOnInit(): void {
      this.loadEtatCampagnes();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
    public async loadEtatCampagnes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'list');
        isPermistted ? this.etatCampagneService.findAll().subscribe(etatCampagnes => this.etatCampagnes = etatCampagnes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

 public searchRequest(){
        this.etatCampagneService.findByCriteria(this.searchEtatCampagne).subscribe(etatCampagnes=>{
            
            this.etatCampagnes = etatCampagnes;
           // this.searchEtatCampagne = new EtatCampagneVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatCampagne(etatCampagne:EtatCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'edit');
         if(isPermistted){
          this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(res => {
           this.selectedEtatCampagne = res;
            this.editEtatCampagneDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatCampagne(etatCampagne:EtatCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'view');
        if(isPermistted){
           this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(res => {
           this.selectedEtatCampagne = res;
            this.viewEtatCampagneDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatCampagne(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatCampagne = new EtatCampagneVo();
            this.createEtatCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }

    public async deleteEtatCampagne(etatCampagne:EtatCampagneVo){
       const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimé cet élément (Etat campagne) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatCampagneService.delete(etatCampagne).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatCampagnes.indexOf(etatCampagne);
                          position > -1 ? this.etatCampagnes.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat campagne Supprimé',
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


public async duplicateEtatCampagne(etatCampagne: EtatCampagneVo) {

     this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(
	 res => {
	       this.initDuplicateEtatCampagne(res);
	       this.selectedEtatCampagne = res;
	       this.selectedEtatCampagne.id = null;
            this.createEtatCampagneDialog = true;

});

	}

	initDuplicateEtatCampagne(res: EtatCampagneVo) {


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
    this.exportData = this.etatCampagnes.map(e => {
    return {
           'Libelle': e.libelle ,
           'Code': e.code ,
     }
      });
      }

    // getters and setters

    get etatCampagnes(): Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagnes;
       }
    set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

    get etatCampagneSelections(): Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagneSelections;
       }
    set etatCampagneSelections(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagneSelections = value;
       }
   
     


    get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }
    
    get createEtatCampagneDialog():boolean {
           return this.etatCampagneService.createEtatCampagneDialog;
       }
    set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog= value;
       }
    
    get editEtatCampagneDialog():boolean {
           return this.etatCampagneService.editEtatCampagneDialog;
       }
    set editEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.editEtatCampagneDialog= value;
       }
    get viewEtatCampagneDialog():boolean {
           return this.etatCampagneService.viewEtatCampagneDialog;
       }
    set viewEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.viewEtatCampagneDialog = value;
       }
       
     get searchEtatCampagne(): EtatCampagneVo {
        return this.etatCampagneService.searchEtatCampagne;
       }
    set searchEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.searchEtatCampagne = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
