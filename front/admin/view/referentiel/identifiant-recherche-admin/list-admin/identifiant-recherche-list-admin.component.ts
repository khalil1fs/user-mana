import {Component, OnInit} from '@angular/core';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-identifiant-recherche-list-admin',
  templateUrl: './identifiant-recherche-list-admin.component.html',
  styleUrls: ['./identifiant-recherche-list-admin.component.css']
})
export class IdentifiantRechercheListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'IdentifiantRecherche';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private identifiantRechercheService: IdentifiantRechercheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadIdentifiantRecherches();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadIdentifiantRecherches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'list');
        isPermistted ? this.identifiantRechercheService.findAll().subscribe(identifiantRecherches => this.identifiantRecherches = identifiantRecherches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'});
    }


  public searchRequest(){
        this.identifiantRechercheService.findByCriteria(this.searchIdentifiantRecherche).subscribe(identifiantRecherches=>{
            
            this.identifiantRecherches = identifiantRecherches;
           // this.searchIdentifiantRecherche = new IdentifiantRechercheVo();
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
    
    public async editIdentifiantRecherche(identifiantRecherche: IdentifiantRechercheVo){
        const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'edit');
         if(isPermistted){
          this.identifiantRechercheService.findByIdWithAssociatedList(identifiantRecherche).subscribe(res => {
           this.selectedIdentifiantRecherche = res;
           this.selectedIdentifiantRecherche.dateArchivage = DateUtils.convert(this.selectedIdentifiantRecherche.dateArchivage);

            this.editIdentifiantRechercheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probl??me de permission'
            });
         }
       
    }
    


   public async viewIdentifiantRecherche(identifiantRecherche: IdentifiantRechercheVo){
        const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'view');
        if(isPermistted){
           this.identifiantRechercheService.findByIdWithAssociatedList(identifiantRecherche).subscribe(res => {
           this.selectedIdentifiantRecherche = res;
           this.selectedIdentifiantRecherche.dateArchivage = DateUtils.convert(this.selectedIdentifiantRecherche.dateArchivage);
           this.selectedIdentifiantRecherche.dateCreation = new Date(this.selectedIdentifiantRecherche.dateCreation);

            this.viewIdentifiantRechercheDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
        
    }
    
    public async openCreateIdentifiantRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
            this.createIdentifiantRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
       
    }


    public async deleteIdentifiantRecherche(identifiantRecherche: IdentifiantRechercheVo){
       const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet ??l??ment (Identifiant recherche) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.identifiantRechercheService.delete(identifiantRecherche).subscribe(status=>{
                          if(status > 0){
                          const position = this.identifiantRecherches.indexOf(identifiantRecherche);
                          position > -1 ? this.identifiantRecherches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succ??s',
                        detail: 'Identifiant recherche Supprim??',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
              });
             }
    }


public async duplicateIdentifiantRecherche(identifiantRecherche: IdentifiantRechercheVo) {

     this.identifiantRechercheService.findByIdWithAssociatedList(identifiantRecherche).subscribe(
	 res => {
	       this.initDuplicateIdentifiantRecherche(res);
	       this.selectedIdentifiantRecherche = res;
	       this.selectedIdentifiantRecherche.id = null;

            this.selectedIdentifiantRecherche.dateCreation = null;
            this.selectedIdentifiantRecherche.dateArchivage = DateUtils.convert(this.selectedIdentifiantRecherche.dateArchivage);

            this.createIdentifiantRechercheDialog = true;

});

	}

	initDuplicateIdentifiantRecherche(res: IdentifiantRechercheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.identifiantRecherches.map(e => {
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
            'Libelle': this.searchIdentifiantRecherche.libelle ? this.searchIdentifiantRecherche.libelle : environment.emptyForExport ,
            'Code': this.searchIdentifiantRecherche.code ? this.searchIdentifiantRecherche.code : environment.emptyForExport ,
            'Description': this.searchIdentifiantRecherche.description ? this.searchIdentifiantRecherche.description : environment.emptyForExport ,
            'Archive': this.searchIdentifiantRecherche.archive ? (this.searchIdentifiantRecherche.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchIdentifiantRecherche.dateArchivageMin ? this.datePipe.transform(this.searchIdentifiantRecherche.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchIdentifiantRecherche.dateArchivageMax ? this.datePipe.transform(this.searchIdentifiantRecherche.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchIdentifiantRecherche.dateCreationMin ? this.datePipe.transform(this.searchIdentifiantRecherche.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchIdentifiantRecherche.dateCreationMax ? this.datePipe.transform(this.searchIdentifiantRecherche.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get identifiantRecherches() : Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
    set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }

    get identifiantRechercheSelections() : Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRechercheSelections;
       }
    set identifiantRechercheSelections(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRechercheSelections = value;
       }
   
     


    get selectedIdentifiantRecherche() : IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
    set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
    
    get createIdentifiantRechercheDialog() :boolean {
           return this.identifiantRechercheService.createIdentifiantRechercheDialog;
       }
    set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog= value;
       }
    
    get editIdentifiantRechercheDialog() :boolean {
           return this.identifiantRechercheService.editIdentifiantRechercheDialog;
       }
    set editIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.editIdentifiantRechercheDialog= value;
       }
    get viewIdentifiantRechercheDialog() :boolean {
           return this.identifiantRechercheService.viewIdentifiantRechercheDialog;
       }
    set viewIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.viewIdentifiantRechercheDialog = value;
       }
       
     get searchIdentifiantRecherche() : IdentifiantRechercheVo {
        return this.identifiantRechercheService.searchIdentifiantRecherche;
       }
    set searchIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.searchIdentifiantRecherche = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
