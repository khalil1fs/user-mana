import {Component, OnInit} from '@angular/core';
import {StatutMasterService} from 'src/app/controller/service/referentiel/StatutMaster.service';
import {StatutMasterVo} from 'src/app/controller/model/referentiel/StatutMaster.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-statut-master-list-admin',
  templateUrl: './statut-master-list-admin.component.html',
  styleUrls: ['./statut-master-list-admin.component.css']
})
export class StatutMasterListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatutMaster';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private statutMasterService: StatutMasterService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadStatutMasters();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadStatutMasters(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatutMaster', 'list');
        isPermistted ? this.statutMasterService.findAll().subscribe(statutMasters => this.statutMasters = statutMasters,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statutMasterService.findByCriteria(this.searchStatutMaster).subscribe(statutMasters=>{
            
            this.statutMasters = statutMasters;
           // this.searchStatutMaster = new StatutMasterVo();
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
    
    public async editStatutMaster(statutMaster: StatutMasterVo){
        const isPermistted = await this.roleService.isPermitted('StatutMaster', 'edit');
         if(isPermistted){
          this.statutMasterService.findByIdWithAssociatedList(statutMaster).subscribe(res => {
           this.selectedStatutMaster = res;
           this.selectedStatutMaster.dateArchivage = DateUtils.convert(this.selectedStatutMaster.dateArchivage);

            this.editStatutMasterDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatutMaster(statutMaster: StatutMasterVo){
        const isPermistted = await this.roleService.isPermitted('StatutMaster', 'view');
        if(isPermistted){
           this.statutMasterService.findByIdWithAssociatedList(statutMaster).subscribe(res => {
           this.selectedStatutMaster = res;
           this.selectedStatutMaster.dateArchivage = DateUtils.convert(this.selectedStatutMaster.dateArchivage);
           this.selectedStatutMaster.dateCreation = new Date(this.selectedStatutMaster.dateCreation);

            this.viewStatutMasterDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatutMaster(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatutMaster = new StatutMasterVo();
            this.createStatutMasterDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatutMaster(statutMaster: StatutMasterVo){
       const isPermistted = await this.roleService.isPermitted('StatutMaster', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Statut master) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statutMasterService.delete(statutMaster).subscribe(status=>{
                          if(status > 0){
                          const position = this.statutMasters.indexOf(statutMaster);
                          position > -1 ? this.statutMasters.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Statut master Supprimé',
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


public async duplicateStatutMaster(statutMaster: StatutMasterVo) {

     this.statutMasterService.findByIdWithAssociatedList(statutMaster).subscribe(
	 res => {
	       this.initDuplicateStatutMaster(res);
	       this.selectedStatutMaster = res;
	       this.selectedStatutMaster.id = null;

            this.selectedStatutMaster.dateCreation = null;
            this.selectedStatutMaster.dateArchivage = DateUtils.convert(this.selectedStatutMaster.dateArchivage);

            this.createStatutMasterDialog = true;

});

	}

	initDuplicateStatutMaster(res: StatutMasterVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.statutMasters.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchStatutMaster.libelle ? this.searchStatutMaster.libelle : environment.emptyForExport ,
            'Code': this.searchStatutMaster.code ? this.searchStatutMaster.code : environment.emptyForExport ,
            'Archive': this.searchStatutMaster.archive ? (this.searchStatutMaster.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchStatutMaster.dateArchivageMin ? this.datePipe.transform(this.searchStatutMaster.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchStatutMaster.dateArchivageMax ? this.datePipe.transform(this.searchStatutMaster.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchStatutMaster.dateCreationMin ? this.datePipe.transform(this.searchStatutMaster.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchStatutMaster.dateCreationMax ? this.datePipe.transform(this.searchStatutMaster.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statutMasters() : Array<StatutMasterVo> {
           return this.statutMasterService.statutMasters;
       }
    set statutMasters(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasters = value;
       }

    get statutMasterSelections() : Array<StatutMasterVo> {
           return this.statutMasterService.statutMasterSelections;
       }
    set statutMasterSelections(value: Array<StatutMasterVo>) {
        this.statutMasterService.statutMasterSelections = value;
       }
   
     


    get selectedStatutMaster() : StatutMasterVo {
           return this.statutMasterService.selectedStatutMaster;
       }
    set selectedStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.selectedStatutMaster = value;
       }
    
    get createStatutMasterDialog() :boolean {
           return this.statutMasterService.createStatutMasterDialog;
       }
    set createStatutMasterDialog(value: boolean) {
        this.statutMasterService.createStatutMasterDialog= value;
       }
    
    get editStatutMasterDialog() :boolean {
           return this.statutMasterService.editStatutMasterDialog;
       }
    set editStatutMasterDialog(value: boolean) {
        this.statutMasterService.editStatutMasterDialog= value;
       }
    get viewStatutMasterDialog() :boolean {
           return this.statutMasterService.viewStatutMasterDialog;
       }
    set viewStatutMasterDialog(value: boolean) {
        this.statutMasterService.viewStatutMasterDialog = value;
       }
       
     get searchStatutMaster() : StatutMasterVo {
        return this.statutMasterService.searchStatutMaster;
       }
    set searchStatutMaster(value: StatutMasterVo) {
        this.statutMasterService.searchStatutMaster = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
