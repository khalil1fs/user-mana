import {Component, OnInit} from '@angular/core';
import {EtatEtapeCampagneService} from '../../../../../../controller/service/config/EtatEtapeCampagne.service';
import {EtatEtapeCampagneVo} from '../../../../../../controller/model/config/EtatEtapeCampagne.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/formulaire/Role.service';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-etat-etape-campagne-list-admin',
  templateUrl: './etat-etape-campagne-list-admin.component.html',
  styleUrls: ['./etat-etape-campagne-list-admin.component.css']
})
export class EtatEtapeCampagneListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EtatEtapeCampagne';
    yesno :any[] =[];


    constructor(private etatEtapeCampagneService: EtatEtapeCampagneService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router
) { }

    ngOnInit(): void {
      this.loadEtatEtapeCampagnes();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
    public async loadEtatEtapeCampagnes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'list');
        isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

 public searchRequest(){
        this.etatEtapeCampagneService.findByCriteria(this.searchEtatEtapeCampagne).subscribe(etatEtapeCampagnes=>{
            
            this.etatEtapeCampagnes = etatEtapeCampagnes;
           // this.searchEtatEtapeCampagne = new EtatEtapeCampagneVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatEtapeCampagne(etatEtapeCampagne:EtatEtapeCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'edit');
         if(isPermistted){
          this.etatEtapeCampagneService.findByIdWithAssociatedList(etatEtapeCampagne).subscribe(res => {
           this.selectedEtatEtapeCampagne = res;
            this.editEtatEtapeCampagneDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatEtapeCampagne(etatEtapeCampagne:EtatEtapeCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'view');
        if(isPermistted){
           this.etatEtapeCampagneService.findByIdWithAssociatedList(etatEtapeCampagne).subscribe(res => {
           this.selectedEtatEtapeCampagne = res;
            this.viewEtatEtapeCampagneDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatEtapeCampagne(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
            this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }

    public async deleteEtatEtapeCampagne(etatEtapeCampagne:EtatEtapeCampagneVo){
       const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimé cet élément (Etat etape campagne) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatEtapeCampagneService.delete(etatEtapeCampagne).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatEtapeCampagnes.indexOf(etatEtapeCampagne);
                          position > -1 ? this.etatEtapeCampagnes.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat etape campagne Supprimé',
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


public async duplicateEtatEtapeCampagne(etatEtapeCampagne: EtatEtapeCampagneVo) {

     this.etatEtapeCampagneService.findByIdWithAssociatedList(etatEtapeCampagne).subscribe(
	 res => {
	       this.initDuplicateEtatEtapeCampagne(res);
	       this.selectedEtatEtapeCampagne = res;
	       this.selectedEtatEtapeCampagne.id = null;
            this.createEtatEtapeCampagneDialog = true;

});

	}

	initDuplicateEtatEtapeCampagne(res: EtatEtapeCampagneVo) {


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
    this.exportData = this.etatEtapeCampagnes.map(e => {
    return {
           'Libelle': e.libelle ,
           'Code': e.code ,
     }
      });
      }

    // getters and setters

    get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
    set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }

    get etatEtapeCampagneSelections(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagneSelections;
       }
    set etatEtapeCampagneSelections(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagneSelections = value;
       }
   
     


    get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
    set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
    
    get createEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
    set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
    
    get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
    set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
    get viewEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.viewEtatEtapeCampagneDialog;
       }
    set viewEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.viewEtatEtapeCampagneDialog = value;
       }
       
     get searchEtatEtapeCampagne(): EtatEtapeCampagneVo {
        return this.etatEtapeCampagneService.searchEtatEtapeCampagne;
       }
    set searchEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.searchEtatEtapeCampagne = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
