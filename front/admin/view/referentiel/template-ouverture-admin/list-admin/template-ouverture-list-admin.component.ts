import {Component, OnInit} from '@angular/core';
import {TemplateOuvertureService} from 'src/app/controller/service/referentiel/TemplateOuverture.service';
import {TemplateOuvertureVo} from 'src/app/controller/model/referentiel/TemplateOuverture.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-template-ouverture-list-admin',
  templateUrl: './template-ouverture-list-admin.component.html',
  styleUrls: ['./template-ouverture-list-admin.component.css']
})
export class TemplateOuvertureListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateOuverture';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateOuvertures();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTemplateOuvertures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'list');
        isPermistted ? this.templateOuvertureService.findAll().subscribe(templateOuvertures => this.templateOuvertures = templateOuvertures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateOuvertureService.findByCriteria(this.searchTemplateOuverture).subscribe(templateOuvertures=>{
            
            this.templateOuvertures = templateOuvertures;
           // this.searchTemplateOuverture = new TemplateOuvertureVo();
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
    
    public async editTemplateOuverture(templateOuverture: TemplateOuvertureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'edit');
         if(isPermistted){
          this.templateOuvertureService.findByIdWithAssociatedList(templateOuverture).subscribe(res => {
           this.selectedTemplateOuverture = res;
           this.selectedTemplateOuverture.dateArchivage = DateUtils.convert(this.selectedTemplateOuverture.dateArchivage);

            this.editTemplateOuvertureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateOuverture(templateOuverture: TemplateOuvertureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'view');
        if(isPermistted){
           this.templateOuvertureService.findByIdWithAssociatedList(templateOuverture).subscribe(res => {
           this.selectedTemplateOuverture = res;
           this.selectedTemplateOuverture.dateArchivage = DateUtils.convert(this.selectedTemplateOuverture.dateArchivage);
           this.selectedTemplateOuverture.dateCreation = new Date(this.selectedTemplateOuverture.dateCreation);

            this.viewTemplateOuvertureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateOuverture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateOuverture = new TemplateOuvertureVo();
            this.createTemplateOuvertureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateOuverture(templateOuverture: TemplateOuvertureVo){
       const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template ouverture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateOuvertureService.delete(templateOuverture).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateOuvertures.indexOf(templateOuverture);
                          position > -1 ? this.templateOuvertures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template ouverture Supprimé',
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


public async duplicateTemplateOuverture(templateOuverture: TemplateOuvertureVo) {

     this.templateOuvertureService.findByIdWithAssociatedList(templateOuverture).subscribe(
	 res => {
	       this.initDuplicateTemplateOuverture(res);
	       this.selectedTemplateOuverture = res;
	       this.selectedTemplateOuverture.id = null;

            this.selectedTemplateOuverture.dateCreation = null;
            this.selectedTemplateOuverture.dateArchivage = DateUtils.convert(this.selectedTemplateOuverture.dateArchivage);

            this.createTemplateOuvertureDialog = true;

});

	}

	initDuplicateTemplateOuverture(res: TemplateOuvertureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateOuvertures.map(e => {
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
            'Code': this.searchTemplateOuverture.code ? this.searchTemplateOuverture.code : environment.emptyForExport ,
            'Objet': this.searchTemplateOuverture.objet ? this.searchTemplateOuverture.objet : environment.emptyForExport ,
            'Message': this.searchTemplateOuverture.message ? this.searchTemplateOuverture.message : environment.emptyForExport ,
            'Archive': this.searchTemplateOuverture.archive ? (this.searchTemplateOuverture.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTemplateOuverture.dateArchivageMin ? this.datePipe.transform(this.searchTemplateOuverture.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTemplateOuverture.dateArchivageMax ? this.datePipe.transform(this.searchTemplateOuverture.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTemplateOuverture.dateCreationMin ? this.datePipe.transform(this.searchTemplateOuverture.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTemplateOuverture.dateCreationMax ? this.datePipe.transform(this.searchTemplateOuverture.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateOuvertures() : Array<TemplateOuvertureVo> {
           return this.templateOuvertureService.templateOuvertures;
       }
    set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

    get templateOuvertureSelections() : Array<TemplateOuvertureVo> {
           return this.templateOuvertureService.templateOuvertureSelections;
       }
    set templateOuvertureSelections(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertureSelections = value;
       }
   
     


    get selectedTemplateOuverture() : TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }
    
    get createTemplateOuvertureDialog() :boolean {
           return this.templateOuvertureService.createTemplateOuvertureDialog;
       }
    set createTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.createTemplateOuvertureDialog= value;
       }
    
    get editTemplateOuvertureDialog() :boolean {
           return this.templateOuvertureService.editTemplateOuvertureDialog;
       }
    set editTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.editTemplateOuvertureDialog= value;
       }
    get viewTemplateOuvertureDialog() :boolean {
           return this.templateOuvertureService.viewTemplateOuvertureDialog;
       }
    set viewTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.viewTemplateOuvertureDialog = value;
       }
       
     get searchTemplateOuverture() : TemplateOuvertureVo {
        return this.templateOuvertureService.searchTemplateOuverture;
       }
    set searchTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.searchTemplateOuverture = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
