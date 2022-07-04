import {Component, OnInit} from '@angular/core';
import {ObjetGlobalService} from 'src/app/controller/service/referentiel/ObjetGlobal.service';
import {ObjetGlobalVo} from 'src/app/controller/model/referentiel/ObjetGlobal.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-objet-global-list-admin',
  templateUrl: './objet-global-list-admin.component.html',
  styleUrls: ['./objet-global-list-admin.component.css']
})
export class ObjetGlobalListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ObjetGlobal';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private objetGlobalService: ObjetGlobalService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadObjetGlobals();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadObjetGlobals(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ObjetGlobal', 'list');
        isPermistted ? this.objetGlobalService.findAll().subscribe(objetGlobals => this.objetGlobals = objetGlobals,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.objetGlobalService.findByCriteria(this.searchObjetGlobal).subscribe(objetGlobals=>{
            
            this.objetGlobals = objetGlobals;
           // this.searchObjetGlobal = new ObjetGlobalVo();
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
    
    public async editObjetGlobal(objetGlobal: ObjetGlobalVo){
        const isPermistted = await this.roleService.isPermitted('ObjetGlobal', 'edit');
         if(isPermistted){
          this.objetGlobalService.findByIdWithAssociatedList(objetGlobal).subscribe(res => {
           this.selectedObjetGlobal = res;
           this.selectedObjetGlobal.dateArchivage = DateUtils.convert(this.selectedObjetGlobal.dateArchivage);

            this.editObjetGlobalDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewObjetGlobal(objetGlobal: ObjetGlobalVo){
        const isPermistted = await this.roleService.isPermitted('ObjetGlobal', 'view');
        if(isPermistted){
           this.objetGlobalService.findByIdWithAssociatedList(objetGlobal).subscribe(res => {
           this.selectedObjetGlobal = res;
           this.selectedObjetGlobal.dateArchivage = DateUtils.convert(this.selectedObjetGlobal.dateArchivage);
           this.selectedObjetGlobal.dateCreation = new Date(this.selectedObjetGlobal.dateCreation);

            this.viewObjetGlobalDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateObjetGlobal(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedObjetGlobal = new ObjetGlobalVo();
            this.createObjetGlobalDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteObjetGlobal(objetGlobal: ObjetGlobalVo){
       const isPermistted = await this.roleService.isPermitted('ObjetGlobal', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Objet global) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.objetGlobalService.delete(objetGlobal).subscribe(status=>{
                          if(status > 0){
                          const position = this.objetGlobals.indexOf(objetGlobal);
                          position > -1 ? this.objetGlobals.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Objet global Supprimé',
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


public async duplicateObjetGlobal(objetGlobal: ObjetGlobalVo) {

     this.objetGlobalService.findByIdWithAssociatedList(objetGlobal).subscribe(
	 res => {
	       this.initDuplicateObjetGlobal(res);
	       this.selectedObjetGlobal = res;
	       this.selectedObjetGlobal.id = null;

            this.selectedObjetGlobal.dateCreation = null;
            this.selectedObjetGlobal.dateArchivage = DateUtils.convert(this.selectedObjetGlobal.dateArchivage);

            this.createObjetGlobalDialog = true;

});

	}

	initDuplicateObjetGlobal(res: ObjetGlobalVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.objetGlobals.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchObjetGlobal.libelle ? this.searchObjetGlobal.libelle : environment.emptyForExport ,
            'Code': this.searchObjetGlobal.code ? this.searchObjetGlobal.code : environment.emptyForExport ,
            'Archive': this.searchObjetGlobal.archive ? (this.searchObjetGlobal.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchObjetGlobal.dateArchivageMin ? this.datePipe.transform(this.searchObjetGlobal.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchObjetGlobal.dateArchivageMax ? this.datePipe.transform(this.searchObjetGlobal.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchObjetGlobal.dateCreationMin ? this.datePipe.transform(this.searchObjetGlobal.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchObjetGlobal.dateCreationMax ? this.datePipe.transform(this.searchObjetGlobal.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get objetGlobals() : Array<ObjetGlobalVo> {
           return this.objetGlobalService.objetGlobals;
       }
    set objetGlobals(value: Array<ObjetGlobalVo>) {
        this.objetGlobalService.objetGlobals = value;
       }

    get objetGlobalSelections() : Array<ObjetGlobalVo> {
           return this.objetGlobalService.objetGlobalSelections;
       }
    set objetGlobalSelections(value: Array<ObjetGlobalVo>) {
        this.objetGlobalService.objetGlobalSelections = value;
       }
   
     


    get selectedObjetGlobal() : ObjetGlobalVo {
           return this.objetGlobalService.selectedObjetGlobal;
       }
    set selectedObjetGlobal(value: ObjetGlobalVo) {
        this.objetGlobalService.selectedObjetGlobal = value;
       }
    
    get createObjetGlobalDialog() :boolean {
           return this.objetGlobalService.createObjetGlobalDialog;
       }
    set createObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.createObjetGlobalDialog= value;
       }
    
    get editObjetGlobalDialog() :boolean {
           return this.objetGlobalService.editObjetGlobalDialog;
       }
    set editObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.editObjetGlobalDialog= value;
       }
    get viewObjetGlobalDialog() :boolean {
           return this.objetGlobalService.viewObjetGlobalDialog;
       }
    set viewObjetGlobalDialog(value: boolean) {
        this.objetGlobalService.viewObjetGlobalDialog = value;
       }
       
     get searchObjetGlobal() : ObjetGlobalVo {
        return this.objetGlobalService.searchObjetGlobal;
       }
    set searchObjetGlobal(value: ObjetGlobalVo) {
        this.objetGlobalService.searchObjetGlobal = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
