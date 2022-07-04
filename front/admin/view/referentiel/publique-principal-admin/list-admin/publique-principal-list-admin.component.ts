import {Component, OnInit} from '@angular/core';
import {PubliquePrincipalService} from 'src/app/controller/service/referentiel/PubliquePrincipal.service';
import {PubliquePrincipalVo} from 'src/app/controller/model/referentiel/PubliquePrincipal.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-publique-principal-list-admin',
  templateUrl: './publique-principal-list-admin.component.html',
  styleUrls: ['./publique-principal-list-admin.component.css']
})
export class PubliquePrincipalListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PubliquePrincipal';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private publiquePrincipalService: PubliquePrincipalService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadPubliquePrincipals();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPubliquePrincipals(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PubliquePrincipal', 'list');
        isPermistted ? this.publiquePrincipalService.findAll().subscribe(publiquePrincipals => this.publiquePrincipals = publiquePrincipals,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.publiquePrincipalService.findByCriteria(this.searchPubliquePrincipal).subscribe(publiquePrincipals=>{
            
            this.publiquePrincipals = publiquePrincipals;
           // this.searchPubliquePrincipal = new PubliquePrincipalVo();
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
    
    public async editPubliquePrincipal(publiquePrincipal: PubliquePrincipalVo){
        const isPermistted = await this.roleService.isPermitted('PubliquePrincipal', 'edit');
         if(isPermistted){
          this.publiquePrincipalService.findByIdWithAssociatedList(publiquePrincipal).subscribe(res => {
           this.selectedPubliquePrincipal = res;
           this.selectedPubliquePrincipal.dateArchivage = DateUtils.convert(this.selectedPubliquePrincipal.dateArchivage);

            this.editPubliquePrincipalDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPubliquePrincipal(publiquePrincipal: PubliquePrincipalVo){
        const isPermistted = await this.roleService.isPermitted('PubliquePrincipal', 'view');
        if(isPermistted){
           this.publiquePrincipalService.findByIdWithAssociatedList(publiquePrincipal).subscribe(res => {
           this.selectedPubliquePrincipal = res;
           this.selectedPubliquePrincipal.dateArchivage = DateUtils.convert(this.selectedPubliquePrincipal.dateArchivage);
           this.selectedPubliquePrincipal.dateCreation = new Date(this.selectedPubliquePrincipal.dateCreation);

            this.viewPubliquePrincipalDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePubliquePrincipal(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPubliquePrincipal = new PubliquePrincipalVo();
            this.createPubliquePrincipalDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePubliquePrincipal(publiquePrincipal: PubliquePrincipalVo){
       const isPermistted = await this.roleService.isPermitted('PubliquePrincipal', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Publique principal) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.publiquePrincipalService.delete(publiquePrincipal).subscribe(status=>{
                          if(status > 0){
                          const position = this.publiquePrincipals.indexOf(publiquePrincipal);
                          position > -1 ? this.publiquePrincipals.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Publique principal Supprimé',
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


public async duplicatePubliquePrincipal(publiquePrincipal: PubliquePrincipalVo) {

     this.publiquePrincipalService.findByIdWithAssociatedList(publiquePrincipal).subscribe(
	 res => {
	       this.initDuplicatePubliquePrincipal(res);
	       this.selectedPubliquePrincipal = res;
	       this.selectedPubliquePrincipal.id = null;

            this.selectedPubliquePrincipal.dateCreation = null;
            this.selectedPubliquePrincipal.dateArchivage = DateUtils.convert(this.selectedPubliquePrincipal.dateArchivage);

            this.createPubliquePrincipalDialog = true;

});

	}

	initDuplicatePubliquePrincipal(res: PubliquePrincipalVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.publiquePrincipals.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchPubliquePrincipal.libelle ? this.searchPubliquePrincipal.libelle : environment.emptyForExport ,
            'Code': this.searchPubliquePrincipal.code ? this.searchPubliquePrincipal.code : environment.emptyForExport ,
            'Archive': this.searchPubliquePrincipal.archive ? (this.searchPubliquePrincipal.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPubliquePrincipal.dateArchivageMin ? this.datePipe.transform(this.searchPubliquePrincipal.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPubliquePrincipal.dateArchivageMax ? this.datePipe.transform(this.searchPubliquePrincipal.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPubliquePrincipal.dateCreationMin ? this.datePipe.transform(this.searchPubliquePrincipal.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPubliquePrincipal.dateCreationMax ? this.datePipe.transform(this.searchPubliquePrincipal.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get publiquePrincipals() : Array<PubliquePrincipalVo> {
           return this.publiquePrincipalService.publiquePrincipals;
       }
    set publiquePrincipals(value: Array<PubliquePrincipalVo>) {
        this.publiquePrincipalService.publiquePrincipals = value;
       }

    get publiquePrincipalSelections() : Array<PubliquePrincipalVo> {
           return this.publiquePrincipalService.publiquePrincipalSelections;
       }
    set publiquePrincipalSelections(value: Array<PubliquePrincipalVo>) {
        this.publiquePrincipalService.publiquePrincipalSelections = value;
       }
   
     


    get selectedPubliquePrincipal() : PubliquePrincipalVo {
           return this.publiquePrincipalService.selectedPubliquePrincipal;
       }
    set selectedPubliquePrincipal(value: PubliquePrincipalVo) {
        this.publiquePrincipalService.selectedPubliquePrincipal = value;
       }
    
    get createPubliquePrincipalDialog() :boolean {
           return this.publiquePrincipalService.createPubliquePrincipalDialog;
       }
    set createPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.createPubliquePrincipalDialog= value;
       }
    
    get editPubliquePrincipalDialog() :boolean {
           return this.publiquePrincipalService.editPubliquePrincipalDialog;
       }
    set editPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.editPubliquePrincipalDialog= value;
       }
    get viewPubliquePrincipalDialog() :boolean {
           return this.publiquePrincipalService.viewPubliquePrincipalDialog;
       }
    set viewPubliquePrincipalDialog(value: boolean) {
        this.publiquePrincipalService.viewPubliquePrincipalDialog = value;
       }
       
     get searchPubliquePrincipal() : PubliquePrincipalVo {
        return this.publiquePrincipalService.searchPubliquePrincipal;
       }
    set searchPubliquePrincipal(value: PubliquePrincipalVo) {
        this.publiquePrincipalService.searchPubliquePrincipal = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
