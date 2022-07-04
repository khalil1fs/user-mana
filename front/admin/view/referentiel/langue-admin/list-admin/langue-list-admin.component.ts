import {Component, OnInit} from '@angular/core';
import {LangueService} from 'src/app/controller/service/referentiel/Langue.service';
import {LangueVo} from 'src/app/controller/model/referentiel/Langue.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-langue-list-admin',
  templateUrl: './langue-list-admin.component.html',
  styleUrls: ['./langue-list-admin.component.css']
})
export class LangueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Langue';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private langueService: LangueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadLangues();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadLangues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Langue', 'list');
        isPermistted ? this.langueService.findAll().subscribe(langues => this.langues = langues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.langueService.findByCriteria(this.searchLangue).subscribe(langues=>{
            
            this.langues = langues;
           // this.searchLangue = new LangueVo();
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
    
    public async editLangue(langue: LangueVo){
        const isPermistted = await this.roleService.isPermitted('Langue', 'edit');
         if(isPermistted){
          this.langueService.findByIdWithAssociatedList(langue).subscribe(res => {
           this.selectedLangue = res;
           this.selectedLangue.dateArchivage = DateUtils.convert(this.selectedLangue.dateArchivage);

            this.editLangueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewLangue(langue: LangueVo){
        const isPermistted = await this.roleService.isPermitted('Langue', 'view');
        if(isPermistted){
           this.langueService.findByIdWithAssociatedList(langue).subscribe(res => {
           this.selectedLangue = res;
           this.selectedLangue.dateArchivage = DateUtils.convert(this.selectedLangue.dateArchivage);
           this.selectedLangue.dateCreation = new Date(this.selectedLangue.dateCreation);

            this.viewLangueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateLangue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedLangue = new LangueVo();
            this.createLangueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteLangue(langue: LangueVo){
       const isPermistted = await this.roleService.isPermitted('Langue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Langue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.langueService.delete(langue).subscribe(status=>{
                          if(status > 0){
                          const position = this.langues.indexOf(langue);
                          position > -1 ? this.langues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Langue Supprimé',
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


public async duplicateLangue(langue: LangueVo) {

     this.langueService.findByIdWithAssociatedList(langue).subscribe(
	 res => {
	       this.initDuplicateLangue(res);
	       this.selectedLangue = res;
	       this.selectedLangue.id = null;

            this.selectedLangue.dateCreation = null;
            this.selectedLangue.dateArchivage = DateUtils.convert(this.selectedLangue.dateArchivage);

            this.createLangueDialog = true;

});

	}

	initDuplicateLangue(res: LangueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.langues.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchLangue.libelle ? this.searchLangue.libelle : environment.emptyForExport ,
            'Code': this.searchLangue.code ? this.searchLangue.code : environment.emptyForExport ,
            'Archive': this.searchLangue.archive ? (this.searchLangue.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchLangue.dateArchivageMin ? this.datePipe.transform(this.searchLangue.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchLangue.dateArchivageMax ? this.datePipe.transform(this.searchLangue.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchLangue.dateCreationMin ? this.datePipe.transform(this.searchLangue.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchLangue.dateCreationMax ? this.datePipe.transform(this.searchLangue.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get langues() : Array<LangueVo> {
           return this.langueService.langues;
       }
    set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

    get langueSelections() : Array<LangueVo> {
           return this.langueService.langueSelections;
       }
    set langueSelections(value: Array<LangueVo>) {
        this.langueService.langueSelections = value;
       }
   
     


    get selectedLangue() : LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
    
    get createLangueDialog() :boolean {
           return this.langueService.createLangueDialog;
       }
    set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
       }
    
    get editLangueDialog() :boolean {
           return this.langueService.editLangueDialog;
       }
    set editLangueDialog(value: boolean) {
        this.langueService.editLangueDialog= value;
       }
    get viewLangueDialog() :boolean {
           return this.langueService.viewLangueDialog;
       }
    set viewLangueDialog(value: boolean) {
        this.langueService.viewLangueDialog = value;
       }
       
     get searchLangue() : LangueVo {
        return this.langueService.searchLangue;
       }
    set searchLangue(value: LangueVo) {
        this.langueService.searchLangue = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
