import {Component, OnInit} from '@angular/core';
import {TemplateClotureService} from 'src/app/controller/service/referentiel/TemplateCloture.service';
import {TemplateClotureVo} from 'src/app/controller/model/referentiel/TemplateCloture.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-template-cloture-list-admin',
  templateUrl: './template-cloture-list-admin.component.html',
  styleUrls: ['./template-cloture-list-admin.component.css']
})
export class TemplateClotureListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateCloture';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private templateClotureService: TemplateClotureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateClotures();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTemplateClotures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'list');
        isPermistted ? this.templateClotureService.findAll().subscribe(templateClotures => this.templateClotures = templateClotures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateClotureService.findByCriteria(this.searchTemplateCloture).subscribe(templateClotures=>{
            
            this.templateClotures = templateClotures;
           // this.searchTemplateCloture = new TemplateClotureVo();
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
    
    public async editTemplateCloture(templateCloture: TemplateClotureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'edit');
         if(isPermistted){
          this.templateClotureService.findByIdWithAssociatedList(templateCloture).subscribe(res => {
           this.selectedTemplateCloture = res;
           this.selectedTemplateCloture.dateArchivage = DateUtils.convert(this.selectedTemplateCloture.dateArchivage);

            this.editTemplateClotureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateCloture(templateCloture: TemplateClotureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'view');
        if(isPermistted){
           this.templateClotureService.findByIdWithAssociatedList(templateCloture).subscribe(res => {
           this.selectedTemplateCloture = res;
           this.selectedTemplateCloture.dateArchivage = DateUtils.convert(this.selectedTemplateCloture.dateArchivage);
           this.selectedTemplateCloture.dateCreation = new Date(this.selectedTemplateCloture.dateCreation);

            this.viewTemplateClotureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateCloture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateCloture = new TemplateClotureVo();
            this.createTemplateClotureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateCloture(templateCloture: TemplateClotureVo){
       const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template cloture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateClotureService.delete(templateCloture).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateClotures.indexOf(templateCloture);
                          position > -1 ? this.templateClotures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template cloture Supprimé',
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


public async duplicateTemplateCloture(templateCloture: TemplateClotureVo) {

     this.templateClotureService.findByIdWithAssociatedList(templateCloture).subscribe(
	 res => {
	       this.initDuplicateTemplateCloture(res);
	       this.selectedTemplateCloture = res;
	       this.selectedTemplateCloture.id = null;

            this.selectedTemplateCloture.dateCreation = null;
            this.selectedTemplateCloture.dateArchivage = DateUtils.convert(this.selectedTemplateCloture.dateArchivage);

            this.createTemplateClotureDialog = true;

});

	}

	initDuplicateTemplateCloture(res: TemplateClotureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateClotures.map(e => {
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
            'Code': this.searchTemplateCloture.code ? this.searchTemplateCloture.code : environment.emptyForExport ,
            'Objet': this.searchTemplateCloture.objet ? this.searchTemplateCloture.objet : environment.emptyForExport ,
            'Message': this.searchTemplateCloture.message ? this.searchTemplateCloture.message : environment.emptyForExport ,
            'Archive': this.searchTemplateCloture.archive ? (this.searchTemplateCloture.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTemplateCloture.dateArchivageMin ? this.datePipe.transform(this.searchTemplateCloture.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTemplateCloture.dateArchivageMax ? this.datePipe.transform(this.searchTemplateCloture.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTemplateCloture.dateCreationMin ? this.datePipe.transform(this.searchTemplateCloture.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTemplateCloture.dateCreationMax ? this.datePipe.transform(this.searchTemplateCloture.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateClotures() : Array<TemplateClotureVo> {
           return this.templateClotureService.templateClotures;
       }
    set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }

    get templateClotureSelections() : Array<TemplateClotureVo> {
           return this.templateClotureService.templateClotureSelections;
       }
    set templateClotureSelections(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotureSelections = value;
       }
   
     


    get selectedTemplateCloture() : TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
    set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }
    
    get createTemplateClotureDialog() :boolean {
           return this.templateClotureService.createTemplateClotureDialog;
       }
    set createTemplateClotureDialog(value: boolean) {
        this.templateClotureService.createTemplateClotureDialog= value;
       }
    
    get editTemplateClotureDialog() :boolean {
           return this.templateClotureService.editTemplateClotureDialog;
       }
    set editTemplateClotureDialog(value: boolean) {
        this.templateClotureService.editTemplateClotureDialog= value;
       }
    get viewTemplateClotureDialog() :boolean {
           return this.templateClotureService.viewTemplateClotureDialog;
       }
    set viewTemplateClotureDialog(value: boolean) {
        this.templateClotureService.viewTemplateClotureDialog = value;
       }
       
     get searchTemplateCloture() : TemplateClotureVo {
        return this.templateClotureService.searchTemplateCloture;
       }
    set searchTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.searchTemplateCloture = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
