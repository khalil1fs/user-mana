import {Component, OnInit} from '@angular/core';
import {ModaliteFormationContinueService} from 'src/app/controller/service/referentiel/ModaliteFormationContinue.service';
import {ModaliteFormationContinueVo} from 'src/app/controller/model/referentiel/ModaliteFormationContinue.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-modalite-formation-continue-list-admin',
  templateUrl: './modalite-formation-continue-list-admin.component.html',
  styleUrls: ['./modalite-formation-continue-list-admin.component.css']
})
export class ModaliteFormationContinueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ModaliteFormationContinue';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private modaliteFormationContinueService: ModaliteFormationContinueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadModaliteFormationContinues();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModaliteFormationContinues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'list');
        isPermistted ? this.modaliteFormationContinueService.findAll().subscribe(modaliteFormationContinues => this.modaliteFormationContinues = modaliteFormationContinues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modaliteFormationContinueService.findByCriteria(this.searchModaliteFormationContinue).subscribe(modaliteFormationContinues=>{
            
            this.modaliteFormationContinues = modaliteFormationContinues;
           // this.searchModaliteFormationContinue = new ModaliteFormationContinueVo();
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
    
    public async editModaliteFormationContinue(modaliteFormationContinue: ModaliteFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'edit');
         if(isPermistted){
          this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(res => {
           this.selectedModaliteFormationContinue = res;
           this.selectedModaliteFormationContinue.dateArchivage = DateUtils.convert(this.selectedModaliteFormationContinue.dateArchivage);

            this.editModaliteFormationContinueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModaliteFormationContinue(modaliteFormationContinue: ModaliteFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'view');
        if(isPermistted){
           this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(res => {
           this.selectedModaliteFormationContinue = res;
           this.selectedModaliteFormationContinue.dateArchivage = DateUtils.convert(this.selectedModaliteFormationContinue.dateArchivage);
           this.selectedModaliteFormationContinue.dateCreation = new Date(this.selectedModaliteFormationContinue.dateCreation);

            this.viewModaliteFormationContinueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModaliteFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
            this.createModaliteFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteModaliteFormationContinue(modaliteFormationContinue: ModaliteFormationContinueVo){
       const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Modalite formation continue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modaliteFormationContinueService.delete(modaliteFormationContinue).subscribe(status=>{
                          if(status > 0){
                          const position = this.modaliteFormationContinues.indexOf(modaliteFormationContinue);
                          position > -1 ? this.modaliteFormationContinues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Modalite formation continue Supprimé',
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


public async duplicateModaliteFormationContinue(modaliteFormationContinue: ModaliteFormationContinueVo) {

     this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(
	 res => {
	       this.initDuplicateModaliteFormationContinue(res);
	       this.selectedModaliteFormationContinue = res;
	       this.selectedModaliteFormationContinue.id = null;

            this.selectedModaliteFormationContinue.dateCreation = null;
            this.selectedModaliteFormationContinue.dateArchivage = DateUtils.convert(this.selectedModaliteFormationContinue.dateArchivage);

            this.createModaliteFormationContinueDialog = true;

});

	}

	initDuplicateModaliteFormationContinue(res: ModaliteFormationContinueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.modaliteFormationContinues.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchModaliteFormationContinue.libelle ? this.searchModaliteFormationContinue.libelle : environment.emptyForExport ,
            'Code': this.searchModaliteFormationContinue.code ? this.searchModaliteFormationContinue.code : environment.emptyForExport ,
            'Archive': this.searchModaliteFormationContinue.archive ? (this.searchModaliteFormationContinue.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModaliteFormationContinue.dateArchivageMin ? this.datePipe.transform(this.searchModaliteFormationContinue.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModaliteFormationContinue.dateArchivageMax ? this.datePipe.transform(this.searchModaliteFormationContinue.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModaliteFormationContinue.dateCreationMin ? this.datePipe.transform(this.searchModaliteFormationContinue.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModaliteFormationContinue.dateCreationMax ? this.datePipe.transform(this.searchModaliteFormationContinue.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modaliteFormationContinues() : Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
    set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }

    get modaliteFormationContinueSelections() : Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinueSelections;
       }
    set modaliteFormationContinueSelections(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinueSelections = value;
       }
   
     


    get selectedModaliteFormationContinue() : ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
    
    get createModaliteFormationContinueDialog() :boolean {
           return this.modaliteFormationContinueService.createModaliteFormationContinueDialog;
       }
    set createModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog= value;
       }
    
    get editModaliteFormationContinueDialog() :boolean {
           return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;
       }
    set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog= value;
       }
    get viewModaliteFormationContinueDialog() :boolean {
           return this.modaliteFormationContinueService.viewModaliteFormationContinueDialog;
       }
    set viewModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.viewModaliteFormationContinueDialog = value;
       }
       
     get searchModaliteFormationContinue() : ModaliteFormationContinueVo {
        return this.modaliteFormationContinueService.searchModaliteFormationContinue;
       }
    set searchModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.searchModaliteFormationContinue = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
