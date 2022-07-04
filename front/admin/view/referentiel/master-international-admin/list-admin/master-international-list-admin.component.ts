import {Component, OnInit} from '@angular/core';
import {MasterInternationalService} from 'src/app/controller/service/referentiel/MasterInternational.service';
import {MasterInternationalVo} from 'src/app/controller/model/referentiel/MasterInternational.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-master-international-list-admin',
  templateUrl: './master-international-list-admin.component.html',
  styleUrls: ['./master-international-list-admin.component.css']
})
export class MasterInternationalListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'MasterInternational';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadMasterInternationals();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadMasterInternationals(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('MasterInternational', 'list');
        isPermistted ? this.masterInternationalService.findAll().subscribe(masterInternationals => this.masterInternationals = masterInternationals,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.masterInternationalService.findByCriteria(this.searchMasterInternational).subscribe(masterInternationals=>{
            
            this.masterInternationals = masterInternationals;
           // this.searchMasterInternational = new MasterInternationalVo();
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
    
    public async editMasterInternational(masterInternational: MasterInternationalVo){
        const isPermistted = await this.roleService.isPermitted('MasterInternational', 'edit');
         if(isPermistted){
          this.masterInternationalService.findByIdWithAssociatedList(masterInternational).subscribe(res => {
           this.selectedMasterInternational = res;
           this.selectedMasterInternational.dateArchivage = DateUtils.convert(this.selectedMasterInternational.dateArchivage);

            this.editMasterInternationalDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewMasterInternational(masterInternational: MasterInternationalVo){
        const isPermistted = await this.roleService.isPermitted('MasterInternational', 'view');
        if(isPermistted){
           this.masterInternationalService.findByIdWithAssociatedList(masterInternational).subscribe(res => {
           this.selectedMasterInternational = res;
           this.selectedMasterInternational.dateArchivage = DateUtils.convert(this.selectedMasterInternational.dateArchivage);
           this.selectedMasterInternational.dateCreation = new Date(this.selectedMasterInternational.dateCreation);

            this.viewMasterInternationalDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateMasterInternational(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedMasterInternational = new MasterInternationalVo();
            this.createMasterInternationalDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteMasterInternational(masterInternational: MasterInternationalVo){
       const isPermistted = await this.roleService.isPermitted('MasterInternational', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Master international) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.masterInternationalService.delete(masterInternational).subscribe(status=>{
                          if(status > 0){
                          const position = this.masterInternationals.indexOf(masterInternational);
                          position > -1 ? this.masterInternationals.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Master international Supprimé',
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


public async duplicateMasterInternational(masterInternational: MasterInternationalVo) {

     this.masterInternationalService.findByIdWithAssociatedList(masterInternational).subscribe(
	 res => {
	       this.initDuplicateMasterInternational(res);
	       this.selectedMasterInternational = res;
	       this.selectedMasterInternational.id = null;

            this.selectedMasterInternational.dateCreation = null;
            this.selectedMasterInternational.dateArchivage = DateUtils.convert(this.selectedMasterInternational.dateArchivage);

            this.createMasterInternationalDialog = true;

});

	}

	initDuplicateMasterInternational(res: MasterInternationalVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.masterInternationals.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchMasterInternational.libelle ? this.searchMasterInternational.libelle : environment.emptyForExport ,
            'Code': this.searchMasterInternational.code ? this.searchMasterInternational.code : environment.emptyForExport ,
            'Archive': this.searchMasterInternational.archive ? (this.searchMasterInternational.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchMasterInternational.dateArchivageMin ? this.datePipe.transform(this.searchMasterInternational.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchMasterInternational.dateArchivageMax ? this.datePipe.transform(this.searchMasterInternational.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchMasterInternational.dateCreationMin ? this.datePipe.transform(this.searchMasterInternational.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchMasterInternational.dateCreationMax ? this.datePipe.transform(this.searchMasterInternational.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get masterInternationals() : Array<MasterInternationalVo> {
           return this.masterInternationalService.masterInternationals;
       }
    set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

    get masterInternationalSelections() : Array<MasterInternationalVo> {
           return this.masterInternationalService.masterInternationalSelections;
       }
    set masterInternationalSelections(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationalSelections = value;
       }
   
     


    get selectedMasterInternational() : MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }
    
    get createMasterInternationalDialog() :boolean {
           return this.masterInternationalService.createMasterInternationalDialog;
       }
    set createMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.createMasterInternationalDialog= value;
       }
    
    get editMasterInternationalDialog() :boolean {
           return this.masterInternationalService.editMasterInternationalDialog;
       }
    set editMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.editMasterInternationalDialog= value;
       }
    get viewMasterInternationalDialog() :boolean {
           return this.masterInternationalService.viewMasterInternationalDialog;
       }
    set viewMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.viewMasterInternationalDialog = value;
       }
       
     get searchMasterInternational() : MasterInternationalVo {
        return this.masterInternationalService.searchMasterInternational;
       }
    set searchMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.searchMasterInternational = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
