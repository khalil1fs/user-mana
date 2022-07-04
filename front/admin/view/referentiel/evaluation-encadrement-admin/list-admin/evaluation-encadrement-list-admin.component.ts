import {Component, OnInit} from '@angular/core';
import {EvaluationEncadrementService} from 'src/app/controller/service/referentiel/EvaluationEncadrement.service';
import {EvaluationEncadrementVo} from 'src/app/controller/model/referentiel/EvaluationEncadrement.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-evaluation-encadrement-list-admin',
  templateUrl: './evaluation-encadrement-list-admin.component.html',
  styleUrls: ['./evaluation-encadrement-list-admin.component.css']
})
export class EvaluationEncadrementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EvaluationEncadrement';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private evaluationEncadrementService: EvaluationEncadrementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEvaluationEncadrements();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEvaluationEncadrements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvaluationEncadrement', 'list');
        isPermistted ? this.evaluationEncadrementService.findAll().subscribe(evaluationEncadrements => this.evaluationEncadrements = evaluationEncadrements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.evaluationEncadrementService.findByCriteria(this.searchEvaluationEncadrement).subscribe(evaluationEncadrements=>{
            
            this.evaluationEncadrements = evaluationEncadrements;
           // this.searchEvaluationEncadrement = new EvaluationEncadrementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editEvaluationEncadrement(evaluationEncadrement: EvaluationEncadrementVo){
        const isPermistted = await this.roleService.isPermitted('EvaluationEncadrement', 'edit');
         if(isPermistted){
          this.evaluationEncadrementService.findByIdWithAssociatedList(evaluationEncadrement).subscribe(res => {
           this.selectedEvaluationEncadrement = res;
           this.selectedEvaluationEncadrement.dateArchivage = DateUtils.convert(this.selectedEvaluationEncadrement.dateArchivage);

            this.editEvaluationEncadrementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEvaluationEncadrement(evaluationEncadrement: EvaluationEncadrementVo){
        const isPermistted = await this.roleService.isPermitted('EvaluationEncadrement', 'view');
        if(isPermistted){
           this.evaluationEncadrementService.findByIdWithAssociatedList(evaluationEncadrement).subscribe(res => {
           this.selectedEvaluationEncadrement = res;
           this.selectedEvaluationEncadrement.dateArchivage = DateUtils.convert(this.selectedEvaluationEncadrement.dateArchivage);
           this.selectedEvaluationEncadrement.dateCreation = new Date(this.selectedEvaluationEncadrement.dateCreation);

            this.viewEvaluationEncadrementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEvaluationEncadrement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEvaluationEncadrement = new EvaluationEncadrementVo();
            this.createEvaluationEncadrementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEvaluationEncadrement(evaluationEncadrement: EvaluationEncadrementVo){
       const isPermistted = await this.roleService.isPermitted('EvaluationEncadrement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Evaluation encadrement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.evaluationEncadrementService.delete(evaluationEncadrement).subscribe(status=>{
                          if(status > 0){
                          const position = this.evaluationEncadrements.indexOf(evaluationEncadrement);
                          position > -1 ? this.evaluationEncadrements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Evaluation encadrement Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }


public async duplicateEvaluationEncadrement(evaluationEncadrement: EvaluationEncadrementVo) {

     this.evaluationEncadrementService.findByIdWithAssociatedList(evaluationEncadrement).subscribe(
	 res => {
	       this.initDuplicateEvaluationEncadrement(res);
	       this.selectedEvaluationEncadrement = res;
	       this.selectedEvaluationEncadrement.id = null;

            this.selectedEvaluationEncadrement.dateCreation = null;
            this.selectedEvaluationEncadrement.dateArchivage = DateUtils.convert(this.selectedEvaluationEncadrement.dateArchivage);

            this.createEvaluationEncadrementDialog = true;

});

	}

	initDuplicateEvaluationEncadrement(res: EvaluationEncadrementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.evaluationEncadrements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEvaluationEncadrement.libelle ? this.searchEvaluationEncadrement.libelle : environment.emptyForExport ,
            'Code': this.searchEvaluationEncadrement.code ? this.searchEvaluationEncadrement.code : environment.emptyForExport ,
            'Archive': this.searchEvaluationEncadrement.archive ? (this.searchEvaluationEncadrement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEvaluationEncadrement.dateArchivageMin ? this.datePipe.transform(this.searchEvaluationEncadrement.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEvaluationEncadrement.dateArchivageMax ? this.datePipe.transform(this.searchEvaluationEncadrement.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEvaluationEncadrement.dateCreationMin ? this.datePipe.transform(this.searchEvaluationEncadrement.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEvaluationEncadrement.dateCreationMax ? this.datePipe.transform(this.searchEvaluationEncadrement.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get evaluationEncadrements() : Array<EvaluationEncadrementVo> {
           return this.evaluationEncadrementService.evaluationEncadrements;
       }
    set evaluationEncadrements(value: Array<EvaluationEncadrementVo>) {
        this.evaluationEncadrementService.evaluationEncadrements = value;
       }

    get evaluationEncadrementSelections() : Array<EvaluationEncadrementVo> {
           return this.evaluationEncadrementService.evaluationEncadrementSelections;
       }
    set evaluationEncadrementSelections(value: Array<EvaluationEncadrementVo>) {
        this.evaluationEncadrementService.evaluationEncadrementSelections = value;
       }
   
     


    get selectedEvaluationEncadrement() : EvaluationEncadrementVo {
           return this.evaluationEncadrementService.selectedEvaluationEncadrement;
       }
    set selectedEvaluationEncadrement(value: EvaluationEncadrementVo) {
        this.evaluationEncadrementService.selectedEvaluationEncadrement = value;
       }
    
    get createEvaluationEncadrementDialog() :boolean {
           return this.evaluationEncadrementService.createEvaluationEncadrementDialog;
       }
    set createEvaluationEncadrementDialog(value: boolean) {
        this.evaluationEncadrementService.createEvaluationEncadrementDialog= value;
       }
    
    get editEvaluationEncadrementDialog() :boolean {
           return this.evaluationEncadrementService.editEvaluationEncadrementDialog;
       }
    set editEvaluationEncadrementDialog(value: boolean) {
        this.evaluationEncadrementService.editEvaluationEncadrementDialog= value;
       }
    get viewEvaluationEncadrementDialog() :boolean {
           return this.evaluationEncadrementService.viewEvaluationEncadrementDialog;
       }
    set viewEvaluationEncadrementDialog(value: boolean) {
        this.evaluationEncadrementService.viewEvaluationEncadrementDialog = value;
       }
       
     get searchEvaluationEncadrement() : EvaluationEncadrementVo {
        return this.evaluationEncadrementService.searchEvaluationEncadrement;
       }
    set searchEvaluationEncadrement(value: EvaluationEncadrementVo) {
        this.evaluationEncadrementService.searchEvaluationEncadrement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
