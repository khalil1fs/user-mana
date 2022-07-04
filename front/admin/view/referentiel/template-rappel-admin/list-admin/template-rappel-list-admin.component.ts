import {Component, OnInit} from '@angular/core';
import {TemplateRappelService} from 'src/app/controller/service/referentiel/TemplateRappel.service';
import {TemplateRappelVo} from 'src/app/controller/model/referentiel/TemplateRappel.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-template-rappel-list-admin',
  templateUrl: './template-rappel-list-admin.component.html',
  styleUrls: ['./template-rappel-list-admin.component.css']
})
export class TemplateRappelListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateRappel';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateRappels();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTemplateRappels(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'list');
        isPermistted ? this.templateRappelService.findAll().subscribe(templateRappels => this.templateRappels = templateRappels,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateRappelService.findByCriteria(this.searchTemplateRappel).subscribe(templateRappels=>{
            
            this.templateRappels = templateRappels;
           // this.searchTemplateRappel = new TemplateRappelVo();
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
    
    public async editTemplateRappel(templateRappel: TemplateRappelVo){
        const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'edit');
         if(isPermistted){
          this.templateRappelService.findByIdWithAssociatedList(templateRappel).subscribe(res => {
           this.selectedTemplateRappel = res;
           this.selectedTemplateRappel.dateArchivage = DateUtils.convert(this.selectedTemplateRappel.dateArchivage);

            this.editTemplateRappelDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateRappel(templateRappel: TemplateRappelVo){
        const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'view');
        if(isPermistted){
           this.templateRappelService.findByIdWithAssociatedList(templateRappel).subscribe(res => {
           this.selectedTemplateRappel = res;
           this.selectedTemplateRappel.dateArchivage = DateUtils.convert(this.selectedTemplateRappel.dateArchivage);
           this.selectedTemplateRappel.dateCreation = new Date(this.selectedTemplateRappel.dateCreation);

            this.viewTemplateRappelDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateRappel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateRappel = new TemplateRappelVo();
            this.createTemplateRappelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateRappel(templateRappel: TemplateRappelVo){
       const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template rappel) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateRappelService.delete(templateRappel).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateRappels.indexOf(templateRappel);
                          position > -1 ? this.templateRappels.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template rappel Supprimé',
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


public async duplicateTemplateRappel(templateRappel: TemplateRappelVo) {

     this.templateRappelService.findByIdWithAssociatedList(templateRappel).subscribe(
	 res => {
	       this.initDuplicateTemplateRappel(res);
	       this.selectedTemplateRappel = res;
	       this.selectedTemplateRappel.id = null;

            this.selectedTemplateRappel.dateCreation = null;
            this.selectedTemplateRappel.dateArchivage = DateUtils.convert(this.selectedTemplateRappel.dateArchivage);

            this.createTemplateRappelDialog = true;

});

	}

	initDuplicateTemplateRappel(res: TemplateRappelVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateRappels.map(e => {
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
            'Code': this.searchTemplateRappel.code ? this.searchTemplateRappel.code : environment.emptyForExport ,
            'Objet': this.searchTemplateRappel.objet ? this.searchTemplateRappel.objet : environment.emptyForExport ,
            'Message': this.searchTemplateRappel.message ? this.searchTemplateRappel.message : environment.emptyForExport ,
            'Archive': this.searchTemplateRappel.archive ? (this.searchTemplateRappel.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTemplateRappel.dateArchivageMin ? this.datePipe.transform(this.searchTemplateRappel.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTemplateRappel.dateArchivageMax ? this.datePipe.transform(this.searchTemplateRappel.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTemplateRappel.dateCreationMin ? this.datePipe.transform(this.searchTemplateRappel.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTemplateRappel.dateCreationMax ? this.datePipe.transform(this.searchTemplateRappel.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateRappels() : Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
    set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }

    get templateRappelSelections() : Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappelSelections;
       }
    set templateRappelSelections(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappelSelections = value;
       }
   
     


    get selectedTemplateRappel() : TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
    
    get createTemplateRappelDialog() :boolean {
           return this.templateRappelService.createTemplateRappelDialog;
       }
    set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
       }
    
    get editTemplateRappelDialog() :boolean {
           return this.templateRappelService.editTemplateRappelDialog;
       }
    set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog= value;
       }
    get viewTemplateRappelDialog() :boolean {
           return this.templateRappelService.viewTemplateRappelDialog;
       }
    set viewTemplateRappelDialog(value: boolean) {
        this.templateRappelService.viewTemplateRappelDialog = value;
       }
       
     get searchTemplateRappel() : TemplateRappelVo {
        return this.templateRappelService.searchTemplateRappel;
       }
    set searchTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.searchTemplateRappel = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
