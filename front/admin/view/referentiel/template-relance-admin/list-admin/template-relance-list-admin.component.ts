import {Component, OnInit} from '@angular/core';
import {TemplateRelanceService} from 'src/app/controller/service/referentiel/TemplateRelance.service';
import {TemplateRelanceVo} from 'src/app/controller/model/referentiel/TemplateRelance.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-template-relance-list-admin',
  templateUrl: './template-relance-list-admin.component.html',
  styleUrls: ['./template-relance-list-admin.component.css']
})
export class TemplateRelanceListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateRelance';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private templateRelanceService: TemplateRelanceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateRelances();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTemplateRelances(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'list');
        isPermistted ? this.templateRelanceService.findAll().subscribe(templateRelances => this.templateRelances = templateRelances,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateRelanceService.findByCriteria(this.searchTemplateRelance).subscribe(templateRelances=>{
            
            this.templateRelances = templateRelances;
           // this.searchTemplateRelance = new TemplateRelanceVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'objet', header: 'Objet'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editTemplateRelance(templateRelance: TemplateRelanceVo){
        const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'edit');
         if(isPermistted){
          this.templateRelanceService.findByIdWithAssociatedList(templateRelance).subscribe(res => {
           this.selectedTemplateRelance = res;
           this.selectedTemplateRelance.dateArchivage = DateUtils.convert(this.selectedTemplateRelance.dateArchivage);

            this.editTemplateRelanceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateRelance(templateRelance: TemplateRelanceVo){
        const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'view');
        if(isPermistted){
           this.templateRelanceService.findByIdWithAssociatedList(templateRelance).subscribe(res => {
           this.selectedTemplateRelance = res;
           this.selectedTemplateRelance.dateArchivage = DateUtils.convert(this.selectedTemplateRelance.dateArchivage);
           this.selectedTemplateRelance.dateCreation = new Date(this.selectedTemplateRelance.dateCreation);

            this.viewTemplateRelanceDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateRelance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateRelance = new TemplateRelanceVo();
            this.createTemplateRelanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateRelance(templateRelance: TemplateRelanceVo){
       const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template relance) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateRelanceService.delete(templateRelance).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateRelances.indexOf(templateRelance);
                          position > -1 ? this.templateRelances.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template relance Supprimé',
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


public async duplicateTemplateRelance(templateRelance: TemplateRelanceVo) {

     this.templateRelanceService.findByIdWithAssociatedList(templateRelance).subscribe(
	 res => {
	       this.initDuplicateTemplateRelance(res);
	       this.selectedTemplateRelance = res;
	       this.selectedTemplateRelance.id = null;

            this.selectedTemplateRelance.dateCreation = null;
            this.selectedTemplateRelance.dateArchivage = DateUtils.convert(this.selectedTemplateRelance.dateArchivage);

            this.createTemplateRelanceDialog = true;

});

	}

	initDuplicateTemplateRelance(res: TemplateRelanceVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateRelances.map(e => {
    return {
                    'Code': e.code ,
                    'Objet': e.objet ,
                    'Message': e.message ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateRelance.code ? this.searchTemplateRelance.code : environment.emptyForExport ,
            'Objet': this.searchTemplateRelance.objet ? this.searchTemplateRelance.objet : environment.emptyForExport ,
            'Message': this.searchTemplateRelance.message ? this.searchTemplateRelance.message : environment.emptyForExport ,
            'Archive': this.searchTemplateRelance.archive ? (this.searchTemplateRelance.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTemplateRelance.dateArchivageMin ? this.datePipe.transform(this.searchTemplateRelance.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTemplateRelance.dateArchivageMax ? this.datePipe.transform(this.searchTemplateRelance.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTemplateRelance.dateCreationMin ? this.datePipe.transform(this.searchTemplateRelance.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTemplateRelance.dateCreationMax ? this.datePipe.transform(this.searchTemplateRelance.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateRelances() : Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelances;
       }
    set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }

    get templateRelanceSelections() : Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelanceSelections;
       }
    set templateRelanceSelections(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelanceSelections = value;
       }
   
     


    get selectedTemplateRelance() : TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }
    
    get createTemplateRelanceDialog() :boolean {
           return this.templateRelanceService.createTemplateRelanceDialog;
       }
    set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog= value;
       }
    
    get editTemplateRelanceDialog() :boolean {
           return this.templateRelanceService.editTemplateRelanceDialog;
       }
    set editTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.editTemplateRelanceDialog= value;
       }
    get viewTemplateRelanceDialog() :boolean {
           return this.templateRelanceService.viewTemplateRelanceDialog;
       }
    set viewTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.viewTemplateRelanceDialog = value;
       }
       
     get searchTemplateRelance() : TemplateRelanceVo {
        return this.templateRelanceService.searchTemplateRelance;
       }
    set searchTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.searchTemplateRelance = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
