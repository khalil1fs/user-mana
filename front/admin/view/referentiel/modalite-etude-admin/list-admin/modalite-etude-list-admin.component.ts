import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from 'src/app/controller/service/referentiel/ModaliteEtude.service';
import {ModaliteEtudeVo} from 'src/app/controller/model/referentiel/ModaliteEtude.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-modalite-etude-list-admin',
  templateUrl: './modalite-etude-list-admin.component.html',
  styleUrls: ['./modalite-etude-list-admin.component.css']
})
export class ModaliteEtudeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ModaliteEtude';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadModaliteEtudes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModaliteEtudes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'list');
        isPermistted ? this.modaliteEtudeService.findAll().subscribe(modaliteEtudes => this.modaliteEtudes = modaliteEtudes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modaliteEtudeService.findByCriteria(this.searchModaliteEtude).subscribe(modaliteEtudes=>{
            
            this.modaliteEtudes = modaliteEtudes;
           // this.searchModaliteEtude = new ModaliteEtudeVo();
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
    
    public async editModaliteEtude(modaliteEtude: ModaliteEtudeVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'edit');
         if(isPermistted){
          this.modaliteEtudeService.findByIdWithAssociatedList(modaliteEtude).subscribe(res => {
           this.selectedModaliteEtude = res;
           this.selectedModaliteEtude.dateArchivage = DateUtils.convert(this.selectedModaliteEtude.dateArchivage);

            this.editModaliteEtudeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModaliteEtude(modaliteEtude: ModaliteEtudeVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'view');
        if(isPermistted){
           this.modaliteEtudeService.findByIdWithAssociatedList(modaliteEtude).subscribe(res => {
           this.selectedModaliteEtude = res;
           this.selectedModaliteEtude.dateArchivage = DateUtils.convert(this.selectedModaliteEtude.dateArchivage);
           this.selectedModaliteEtude.dateCreation = new Date(this.selectedModaliteEtude.dateCreation);

            this.viewModaliteEtudeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModaliteEtude(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModaliteEtude = new ModaliteEtudeVo();
            this.createModaliteEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteModaliteEtude(modaliteEtude: ModaliteEtudeVo){
       const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Modalite etude) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modaliteEtudeService.delete(modaliteEtude).subscribe(status=>{
                          if(status > 0){
                          const position = this.modaliteEtudes.indexOf(modaliteEtude);
                          position > -1 ? this.modaliteEtudes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Modalite etude Supprimé',
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


public async duplicateModaliteEtude(modaliteEtude: ModaliteEtudeVo) {

     this.modaliteEtudeService.findByIdWithAssociatedList(modaliteEtude).subscribe(
	 res => {
	       this.initDuplicateModaliteEtude(res);
	       this.selectedModaliteEtude = res;
	       this.selectedModaliteEtude.id = null;

            this.selectedModaliteEtude.dateCreation = null;
            this.selectedModaliteEtude.dateArchivage = DateUtils.convert(this.selectedModaliteEtude.dateArchivage);

            this.createModaliteEtudeDialog = true;

});

	}

	initDuplicateModaliteEtude(res: ModaliteEtudeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.modaliteEtudes.map(e => {
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
            'Libelle': this.searchModaliteEtude.libelle ? this.searchModaliteEtude.libelle : environment.emptyForExport ,
            'Code': this.searchModaliteEtude.code ? this.searchModaliteEtude.code : environment.emptyForExport ,
            'Description': this.searchModaliteEtude.description ? this.searchModaliteEtude.description : environment.emptyForExport ,
            'Archive': this.searchModaliteEtude.archive ? (this.searchModaliteEtude.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModaliteEtude.dateArchivageMin ? this.datePipe.transform(this.searchModaliteEtude.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModaliteEtude.dateArchivageMax ? this.datePipe.transform(this.searchModaliteEtude.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModaliteEtude.dateCreationMin ? this.datePipe.transform(this.searchModaliteEtude.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModaliteEtude.dateCreationMax ? this.datePipe.transform(this.searchModaliteEtude.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modaliteEtudes() : Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
    set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

    get modaliteEtudeSelections() : Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudeSelections;
       }
    set modaliteEtudeSelections(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudeSelections = value;
       }
   
     


    get selectedModaliteEtude() : ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
    
    get createModaliteEtudeDialog() :boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;
       }
    set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
       }
    
    get editModaliteEtudeDialog() :boolean {
           return this.modaliteEtudeService.editModaliteEtudeDialog;
       }
    set editModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.editModaliteEtudeDialog= value;
       }
    get viewModaliteEtudeDialog() :boolean {
           return this.modaliteEtudeService.viewModaliteEtudeDialog;
       }
    set viewModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.viewModaliteEtudeDialog = value;
       }
       
     get searchModaliteEtude() : ModaliteEtudeVo {
        return this.modaliteEtudeService.searchModaliteEtude;
       }
    set searchModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.searchModaliteEtude = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
