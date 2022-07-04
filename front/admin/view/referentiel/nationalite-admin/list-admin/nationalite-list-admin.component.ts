import {Component, OnInit} from '@angular/core';
import {NationaliteService} from 'src/app/controller/service/referentiel/Nationalite.service';
import {NationaliteVo} from 'src/app/controller/model/referentiel/Nationalite.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-nationalite-list-admin',
  templateUrl: './nationalite-list-admin.component.html',
  styleUrls: ['./nationalite-list-admin.component.css']
})
export class NationaliteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Nationalite';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private nationaliteService: NationaliteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadNationalites();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNationalites(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Nationalite', 'list');
        isPermistted ? this.nationaliteService.findAll().subscribe(nationalites => this.nationalites = nationalites,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.nationaliteService.findByCriteria(this.searchNationalite).subscribe(nationalites=>{
            
            this.nationalites = nationalites;
           // this.searchNationalite = new NationaliteVo();
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
    
    public async editNationalite(nationalite: NationaliteVo){
        const isPermistted = await this.roleService.isPermitted('Nationalite', 'edit');
         if(isPermistted){
          this.nationaliteService.findByIdWithAssociatedList(nationalite).subscribe(res => {
           this.selectedNationalite = res;
           this.selectedNationalite.dateArchivage = DateUtils.convert(this.selectedNationalite.dateArchivage);

            this.editNationaliteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNationalite(nationalite: NationaliteVo){
        const isPermistted = await this.roleService.isPermitted('Nationalite', 'view');
        if(isPermistted){
           this.nationaliteService.findByIdWithAssociatedList(nationalite).subscribe(res => {
           this.selectedNationalite = res;
           this.selectedNationalite.dateArchivage = DateUtils.convert(this.selectedNationalite.dateArchivage);
           this.selectedNationalite.dateCreation = new Date(this.selectedNationalite.dateCreation);

            this.viewNationaliteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNationalite(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNationalite = new NationaliteVo();
            this.createNationaliteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNationalite(nationalite: NationaliteVo){
       const isPermistted = await this.roleService.isPermitted('Nationalite', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Nationalite) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.nationaliteService.delete(nationalite).subscribe(status=>{
                          if(status > 0){
                          const position = this.nationalites.indexOf(nationalite);
                          position > -1 ? this.nationalites.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Nationalite Supprimé',
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


public async duplicateNationalite(nationalite: NationaliteVo) {

     this.nationaliteService.findByIdWithAssociatedList(nationalite).subscribe(
	 res => {
	       this.initDuplicateNationalite(res);
	       this.selectedNationalite = res;
	       this.selectedNationalite.id = null;

            this.selectedNationalite.dateCreation = null;
            this.selectedNationalite.dateArchivage = DateUtils.convert(this.selectedNationalite.dateArchivage);

            this.createNationaliteDialog = true;

});

	}

	initDuplicateNationalite(res: NationaliteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.nationalites.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchNationalite.libelle ? this.searchNationalite.libelle : environment.emptyForExport ,
            'Code': this.searchNationalite.code ? this.searchNationalite.code : environment.emptyForExport ,
            'Archive': this.searchNationalite.archive ? (this.searchNationalite.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNationalite.dateArchivageMin ? this.datePipe.transform(this.searchNationalite.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNationalite.dateArchivageMax ? this.datePipe.transform(this.searchNationalite.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNationalite.dateCreationMin ? this.datePipe.transform(this.searchNationalite.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNationalite.dateCreationMax ? this.datePipe.transform(this.searchNationalite.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get nationalites() : Array<NationaliteVo> {
           return this.nationaliteService.nationalites;
       }
    set nationalites(value: Array<NationaliteVo>) {
        this.nationaliteService.nationalites = value;
       }

    get nationaliteSelections() : Array<NationaliteVo> {
           return this.nationaliteService.nationaliteSelections;
       }
    set nationaliteSelections(value: Array<NationaliteVo>) {
        this.nationaliteService.nationaliteSelections = value;
       }
   
     


    get selectedNationalite() : NationaliteVo {
           return this.nationaliteService.selectedNationalite;
       }
    set selectedNationalite(value: NationaliteVo) {
        this.nationaliteService.selectedNationalite = value;
       }
    
    get createNationaliteDialog() :boolean {
           return this.nationaliteService.createNationaliteDialog;
       }
    set createNationaliteDialog(value: boolean) {
        this.nationaliteService.createNationaliteDialog= value;
       }
    
    get editNationaliteDialog() :boolean {
           return this.nationaliteService.editNationaliteDialog;
       }
    set editNationaliteDialog(value: boolean) {
        this.nationaliteService.editNationaliteDialog= value;
       }
    get viewNationaliteDialog() :boolean {
           return this.nationaliteService.viewNationaliteDialog;
       }
    set viewNationaliteDialog(value: boolean) {
        this.nationaliteService.viewNationaliteDialog = value;
       }
       
     get searchNationalite() : NationaliteVo {
        return this.nationaliteService.searchNationalite;
       }
    set searchNationalite(value: NationaliteVo) {
        this.nationaliteService.searchNationalite = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
