import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-enjeux-ird-list-admin',
  templateUrl: './enjeux-ird-list-admin.component.html',
  styleUrls: ['./enjeux-ird-list-admin.component.css']
})
export class EnjeuxIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnjeuxIrd';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private enjeuxIrdService: EnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEnjeuxIrds();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'list');
        isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enjeuxIrdService.findByCriteria(this.searchEnjeuxIrd).subscribe(enjeuxIrds=>{
            
            this.enjeuxIrds = enjeuxIrds;
           // this.searchEnjeuxIrd = new EnjeuxIrdVo();
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
    
    public async editEnjeuxIrd(enjeuxIrd: EnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'edit');
         if(isPermistted){
          this.enjeuxIrdService.findByIdWithAssociatedList(enjeuxIrd).subscribe(res => {
           this.selectedEnjeuxIrd = res;
           this.selectedEnjeuxIrd.dateArchivage = DateUtils.convert(this.selectedEnjeuxIrd.dateArchivage);

            this.editEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnjeuxIrd(enjeuxIrd: EnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'view');
        if(isPermistted){
           this.enjeuxIrdService.findByIdWithAssociatedList(enjeuxIrd).subscribe(res => {
           this.selectedEnjeuxIrd = res;
           this.selectedEnjeuxIrd.dateArchivage = DateUtils.convert(this.selectedEnjeuxIrd.dateArchivage);
           this.selectedEnjeuxIrd.dateCreation = new Date(this.selectedEnjeuxIrd.dateCreation);

            this.viewEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
            this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnjeuxIrd(enjeuxIrd: EnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enjeuxIrdService.delete(enjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.enjeuxIrds.indexOf(enjeuxIrd);
                          position > -1 ? this.enjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enjeux ird Supprimé',
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


public async duplicateEnjeuxIrd(enjeuxIrd: EnjeuxIrdVo) {

     this.enjeuxIrdService.findByIdWithAssociatedList(enjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateEnjeuxIrd(res);
	       this.selectedEnjeuxIrd = res;
	       this.selectedEnjeuxIrd.id = null;

            this.selectedEnjeuxIrd.dateCreation = null;
            this.selectedEnjeuxIrd.dateArchivage = DateUtils.convert(this.selectedEnjeuxIrd.dateArchivage);

            this.createEnjeuxIrdDialog = true;

});

	}

	initDuplicateEnjeuxIrd(res: EnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.enjeuxIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEnjeuxIrd.libelle ? this.searchEnjeuxIrd.libelle : environment.emptyForExport ,
            'Code': this.searchEnjeuxIrd.code ? this.searchEnjeuxIrd.code : environment.emptyForExport ,
            'Description': this.searchEnjeuxIrd.description ? this.searchEnjeuxIrd.description : environment.emptyForExport ,
            'Archive': this.searchEnjeuxIrd.archive ? (this.searchEnjeuxIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEnjeuxIrd.dateArchivageMin ? this.datePipe.transform(this.searchEnjeuxIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEnjeuxIrd.dateArchivageMax ? this.datePipe.transform(this.searchEnjeuxIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEnjeuxIrd.dateCreationMin ? this.datePipe.transform(this.searchEnjeuxIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEnjeuxIrd.dateCreationMax ? this.datePipe.transform(this.searchEnjeuxIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enjeuxIrds() : Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
    set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }

    get enjeuxIrdSelections() : Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrdSelections;
       }
    set enjeuxIrdSelections(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrdSelections = value;
       }
   
     


    get selectedEnjeuxIrd() : EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
    set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
    
    get createEnjeuxIrdDialog() :boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
    set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
    
    get editEnjeuxIrdDialog() :boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
    set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
    get viewEnjeuxIrdDialog() :boolean {
           return this.enjeuxIrdService.viewEnjeuxIrdDialog;
       }
    set viewEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.viewEnjeuxIrdDialog = value;
       }
       
     get searchEnjeuxIrd() : EnjeuxIrdVo {
        return this.enjeuxIrdService.searchEnjeuxIrd;
       }
    set searchEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.searchEnjeuxIrd = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
