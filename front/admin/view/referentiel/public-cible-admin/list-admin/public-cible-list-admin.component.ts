import {Component, OnInit} from '@angular/core';
import {PublicCibleService} from 'src/app/controller/service/referentiel/PublicCible.service';
import {PublicCibleVo} from 'src/app/controller/model/referentiel/PublicCible.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-public-cible-list-admin',
  templateUrl: './public-cible-list-admin.component.html',
  styleUrls: ['./public-cible-list-admin.component.css']
})
export class PublicCibleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PublicCible';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private publicCibleService: PublicCibleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadPublicCibles();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPublicCibles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PublicCible', 'list');
        isPermistted ? this.publicCibleService.findAll().subscribe(publicCibles => this.publicCibles = publicCibles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.publicCibleService.findByCriteria(this.searchPublicCible).subscribe(publicCibles=>{
            
            this.publicCibles = publicCibles;
           // this.searchPublicCible = new PublicCibleVo();
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
    
    public async editPublicCible(publicCible: PublicCibleVo){
        const isPermistted = await this.roleService.isPermitted('PublicCible', 'edit');
         if(isPermistted){
          this.publicCibleService.findByIdWithAssociatedList(publicCible).subscribe(res => {
           this.selectedPublicCible = res;
           this.selectedPublicCible.dateArchivage = DateUtils.convert(this.selectedPublicCible.dateArchivage);

            this.editPublicCibleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPublicCible(publicCible: PublicCibleVo){
        const isPermistted = await this.roleService.isPermitted('PublicCible', 'view');
        if(isPermistted){
           this.publicCibleService.findByIdWithAssociatedList(publicCible).subscribe(res => {
           this.selectedPublicCible = res;
           this.selectedPublicCible.dateArchivage = DateUtils.convert(this.selectedPublicCible.dateArchivage);
           this.selectedPublicCible.dateCreation = new Date(this.selectedPublicCible.dateCreation);

            this.viewPublicCibleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePublicCible(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPublicCible = new PublicCibleVo();
            this.createPublicCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePublicCible(publicCible: PublicCibleVo){
       const isPermistted = await this.roleService.isPermitted('PublicCible', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Public cible) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.publicCibleService.delete(publicCible).subscribe(status=>{
                          if(status > 0){
                          const position = this.publicCibles.indexOf(publicCible);
                          position > -1 ? this.publicCibles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Public cible Supprimé',
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


public async duplicatePublicCible(publicCible: PublicCibleVo) {

     this.publicCibleService.findByIdWithAssociatedList(publicCible).subscribe(
	 res => {
	       this.initDuplicatePublicCible(res);
	       this.selectedPublicCible = res;
	       this.selectedPublicCible.id = null;

            this.selectedPublicCible.dateCreation = null;
            this.selectedPublicCible.dateArchivage = DateUtils.convert(this.selectedPublicCible.dateArchivage);

            this.createPublicCibleDialog = true;

});

	}

	initDuplicatePublicCible(res: PublicCibleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.publicCibles.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchPublicCible.libelle ? this.searchPublicCible.libelle : environment.emptyForExport ,
            'Code': this.searchPublicCible.code ? this.searchPublicCible.code : environment.emptyForExport ,
            'Archive': this.searchPublicCible.archive ? (this.searchPublicCible.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPublicCible.dateArchivageMin ? this.datePipe.transform(this.searchPublicCible.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPublicCible.dateArchivageMax ? this.datePipe.transform(this.searchPublicCible.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPublicCible.dateCreationMin ? this.datePipe.transform(this.searchPublicCible.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPublicCible.dateCreationMax ? this.datePipe.transform(this.searchPublicCible.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get publicCibles() : Array<PublicCibleVo> {
           return this.publicCibleService.publicCibles;
       }
    set publicCibles(value: Array<PublicCibleVo>) {
        this.publicCibleService.publicCibles = value;
       }

    get publicCibleSelections() : Array<PublicCibleVo> {
           return this.publicCibleService.publicCibleSelections;
       }
    set publicCibleSelections(value: Array<PublicCibleVo>) {
        this.publicCibleService.publicCibleSelections = value;
       }
   
     


    get selectedPublicCible() : PublicCibleVo {
           return this.publicCibleService.selectedPublicCible;
       }
    set selectedPublicCible(value: PublicCibleVo) {
        this.publicCibleService.selectedPublicCible = value;
       }
    
    get createPublicCibleDialog() :boolean {
           return this.publicCibleService.createPublicCibleDialog;
       }
    set createPublicCibleDialog(value: boolean) {
        this.publicCibleService.createPublicCibleDialog= value;
       }
    
    get editPublicCibleDialog() :boolean {
           return this.publicCibleService.editPublicCibleDialog;
       }
    set editPublicCibleDialog(value: boolean) {
        this.publicCibleService.editPublicCibleDialog= value;
       }
    get viewPublicCibleDialog() :boolean {
           return this.publicCibleService.viewPublicCibleDialog;
       }
    set viewPublicCibleDialog(value: boolean) {
        this.publicCibleService.viewPublicCibleDialog = value;
       }
       
     get searchPublicCible() : PublicCibleVo {
        return this.publicCibleService.searchPublicCible;
       }
    set searchPublicCible(value: PublicCibleVo) {
        this.publicCibleService.searchPublicCible = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
