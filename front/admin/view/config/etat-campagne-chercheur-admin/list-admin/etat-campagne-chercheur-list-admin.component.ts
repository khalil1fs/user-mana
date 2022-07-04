import {Component, OnInit} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../../controller/service/config/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../../controller/model/config/EtatCampagneChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/formulaire/Role.service';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-etat-campagne-chercheur-list-admin',
  templateUrl: './etat-campagne-chercheur-list-admin.component.html',
  styleUrls: ['./etat-campagne-chercheur-list-admin.component.css']
})
export class EtatCampagneChercheurListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'EtatCampagneChercheur';
    yesno :any[] =[];


    constructor(private etatCampagneChercheurService: EtatCampagneChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router
) { }

    ngOnInit(): void {
      this.loadEtatCampagneChercheurs();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
    public async loadEtatCampagneChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'list');
        isPermistted ? this.etatCampagneChercheurService.findAll().subscribe(etatCampagneChercheurs => this.etatCampagneChercheurs = etatCampagneChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

 public searchRequest(){
        this.etatCampagneChercheurService.findByCriteria(this.searchEtatCampagneChercheur).subscribe(etatCampagneChercheurs=>{
            
            this.etatCampagneChercheurs = etatCampagneChercheurs;
           // this.searchEtatCampagneChercheur = new EtatCampagneChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'edit');
         if(isPermistted){
          this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(res => {
           this.selectedEtatCampagneChercheur = res;
            this.editEtatCampagneChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'view');
        if(isPermistted){
           this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(res => {
           this.selectedEtatCampagneChercheur = res;
            this.viewEtatCampagneChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatCampagneChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
            this.createEtatCampagneChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }

    public async deleteEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
       const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimé cet élément (Etat campagne chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatCampagneChercheurService.delete(etatCampagneChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatCampagneChercheurs.indexOf(etatCampagneChercheur);
                          position > -1 ? this.etatCampagneChercheurs.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat campagne chercheur Supprimé',
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


public async duplicateEtatCampagneChercheur(etatCampagneChercheur: EtatCampagneChercheurVo) {

     this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(
	 res => {
	       this.initDuplicateEtatCampagneChercheur(res);
	       this.selectedEtatCampagneChercheur = res;
	       this.selectedEtatCampagneChercheur.id = null;
            this.createEtatCampagneChercheurDialog = true;

});

	}

	initDuplicateEtatCampagneChercheur(res: EtatCampagneChercheurVo) {


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
    this.exportData = this.etatCampagneChercheurs.map(e => {
    return {
           'Libelle': e.libelle ,
           'Code': e.code ,
     }
      });
      }

    // getters and setters

    get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
    set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

    get etatCampagneChercheurSelections(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurSelections;
       }
    set etatCampagneChercheurSelections(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurSelections = value;
       }
   
     


    get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
    
    get createEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
       }
    set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
       }
    
    get editEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
       }
    set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog= value;
       }
    get viewEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog;
       }
    set viewEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog = value;
       }
       
     get searchEtatCampagneChercheur(): EtatCampagneChercheurVo {
        return this.etatCampagneChercheurService.searchEtatCampagneChercheur;
       }
    set searchEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.searchEtatCampagneChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
