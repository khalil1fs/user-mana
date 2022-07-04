import {Component, OnInit} from '@angular/core';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-structure-ird-list-admin',
  templateUrl: './structure-ird-list-admin.component.html',
  styleUrls: ['./structure-ird-list-admin.component.css']
})
export class StructureIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StructureIrd';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadStructureIrds();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadStructureIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StructureIrd', 'list');
        isPermistted ? this.structureIrdService.findAll().subscribe(structureIrds => this.structureIrds = structureIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.structureIrdService.findByCriteria(this.searchStructureIrd).subscribe(structureIrds=>{
            
            this.structureIrds = structureIrds;
           // this.searchStructureIrd = new StructureIrdVo();
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
    
    public async editStructureIrd(structureIrd: StructureIrdVo){
        const isPermistted = await this.roleService.isPermitted('StructureIrd', 'edit');
         if(isPermistted){
          this.structureIrdService.findByIdWithAssociatedList(structureIrd).subscribe(res => {
           this.selectedStructureIrd = res;
           this.selectedStructureIrd.dateArchivage = DateUtils.convert(this.selectedStructureIrd.dateArchivage);

            this.editStructureIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStructureIrd(structureIrd: StructureIrdVo){
        const isPermistted = await this.roleService.isPermitted('StructureIrd', 'view');
        if(isPermistted){
           this.structureIrdService.findByIdWithAssociatedList(structureIrd).subscribe(res => {
           this.selectedStructureIrd = res;
           this.selectedStructureIrd.dateArchivage = DateUtils.convert(this.selectedStructureIrd.dateArchivage);
           this.selectedStructureIrd.dateCreation = new Date(this.selectedStructureIrd.dateCreation);

            this.viewStructureIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStructureIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStructureIrd = new StructureIrdVo();
            this.createStructureIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStructureIrd(structureIrd: StructureIrdVo){
       const isPermistted = await this.roleService.isPermitted('StructureIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Structure ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.structureIrdService.delete(structureIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.structureIrds.indexOf(structureIrd);
                          position > -1 ? this.structureIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Structure ird Supprimé',
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


public async duplicateStructureIrd(structureIrd: StructureIrdVo) {

     this.structureIrdService.findByIdWithAssociatedList(structureIrd).subscribe(
	 res => {
	       this.initDuplicateStructureIrd(res);
	       this.selectedStructureIrd = res;
	       this.selectedStructureIrd.id = null;

            this.selectedStructureIrd.dateCreation = null;
            this.selectedStructureIrd.dateArchivage = DateUtils.convert(this.selectedStructureIrd.dateArchivage);

            this.createStructureIrdDialog = true;

});

	}

	initDuplicateStructureIrd(res: StructureIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.structureIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchStructureIrd.libelle ? this.searchStructureIrd.libelle : environment.emptyForExport ,
            'Code': this.searchStructureIrd.code ? this.searchStructureIrd.code : environment.emptyForExport ,
            'Archive': this.searchStructureIrd.archive ? (this.searchStructureIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchStructureIrd.dateArchivageMin ? this.datePipe.transform(this.searchStructureIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchStructureIrd.dateArchivageMax ? this.datePipe.transform(this.searchStructureIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchStructureIrd.dateCreationMin ? this.datePipe.transform(this.searchStructureIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchStructureIrd.dateCreationMax ? this.datePipe.transform(this.searchStructureIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get structureIrds() : Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
    set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

    get structureIrdSelections() : Array<StructureIrdVo> {
           return this.structureIrdService.structureIrdSelections;
       }
    set structureIrdSelections(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrdSelections = value;
       }
   
     


    get selectedStructureIrd() : StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
    
    get createStructureIrdDialog() :boolean {
           return this.structureIrdService.createStructureIrdDialog;
       }
    set createStructureIrdDialog(value: boolean) {
        this.structureIrdService.createStructureIrdDialog= value;
       }
    
    get editStructureIrdDialog() :boolean {
           return this.structureIrdService.editStructureIrdDialog;
       }
    set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog= value;
       }
    get viewStructureIrdDialog() :boolean {
           return this.structureIrdService.viewStructureIrdDialog;
       }
    set viewStructureIrdDialog(value: boolean) {
        this.structureIrdService.viewStructureIrdDialog = value;
       }
       
     get searchStructureIrd() : StructureIrdVo {
        return this.structureIrdService.searchStructureIrd;
       }
    set searchStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.searchStructureIrd = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
