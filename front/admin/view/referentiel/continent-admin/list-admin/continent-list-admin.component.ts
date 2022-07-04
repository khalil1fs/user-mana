import {Component, OnInit} from '@angular/core';
import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';
import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-continent-list-admin',
  templateUrl: './continent-list-admin.component.html',
  styleUrls: ['./continent-list-admin.component.css']
})
export class ContinentListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Continent';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private continentService: ContinentService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadContinents();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadContinents(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Continent', 'list');
        isPermistted ? this.continentService.findAll().subscribe(continents => this.continents = continents,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.continentService.findByCriteria(this.searchContinent).subscribe(continents=>{
            
            this.continents = continents;
           // this.searchContinent = new ContinentVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'idGraph', header: 'Id graph'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editContinent(continent: ContinentVo){
        const isPermistted = await this.roleService.isPermitted('Continent', 'edit');
         if(isPermistted){
          this.continentService.findByIdWithAssociatedList(continent).subscribe(res => {
           this.selectedContinent = res;
           this.selectedContinent.dateArchivage = DateUtils.convert(this.selectedContinent.dateArchivage);

            this.editContinentDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewContinent(continent: ContinentVo){
        const isPermistted = await this.roleService.isPermitted('Continent', 'view');
        if(isPermistted){
           this.continentService.findByIdWithAssociatedList(continent).subscribe(res => {
           this.selectedContinent = res;
           this.selectedContinent.dateArchivage = DateUtils.convert(this.selectedContinent.dateArchivage);
           this.selectedContinent.dateCreation = new Date(this.selectedContinent.dateCreation);

            this.viewContinentDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateContinent(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedContinent = new ContinentVo();
            this.createContinentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteContinent(continent: ContinentVo){
       const isPermistted = await this.roleService.isPermitted('Continent', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Continent) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.continentService.delete(continent).subscribe(status=>{
                          if(status > 0){
                          const position = this.continents.indexOf(continent);
                          position > -1 ? this.continents.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Continent Supprimé',
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


public async duplicateContinent(continent: ContinentVo) {

     this.continentService.findByIdWithAssociatedList(continent).subscribe(
	 res => {
	       this.initDuplicateContinent(res);
	       this.selectedContinent = res;
	       this.selectedContinent.id = null;

            this.selectedContinent.dateCreation = null;
            this.selectedContinent.dateArchivage = DateUtils.convert(this.selectedContinent.dateArchivage);

            this.createContinentDialog = true;

});

	}

	initDuplicateContinent(res: ContinentVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.continents.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Id graph': e.idGraph ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchContinent.libelle ? this.searchContinent.libelle : environment.emptyForExport ,
            'Code': this.searchContinent.code ? this.searchContinent.code : environment.emptyForExport ,
            'Id graph': this.searchContinent.idGraph ? this.searchContinent.idGraph : environment.emptyForExport ,
            'Archive': this.searchContinent.archive ? (this.searchContinent.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchContinent.dateArchivageMin ? this.datePipe.transform(this.searchContinent.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchContinent.dateArchivageMax ? this.datePipe.transform(this.searchContinent.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchContinent.dateCreationMin ? this.datePipe.transform(this.searchContinent.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchContinent.dateCreationMax ? this.datePipe.transform(this.searchContinent.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get continents() : Array<ContinentVo> {
           return this.continentService.continents;
       }
    set continents(value: Array<ContinentVo>) {
        this.continentService.continents = value;
       }

    get continentSelections() : Array<ContinentVo> {
           return this.continentService.continentSelections;
       }
    set continentSelections(value: Array<ContinentVo>) {
        this.continentService.continentSelections = value;
       }
   
     


    get selectedContinent() : ContinentVo {
           return this.continentService.selectedContinent;
       }
    set selectedContinent(value: ContinentVo) {
        this.continentService.selectedContinent = value;
       }
    
    get createContinentDialog() :boolean {
           return this.continentService.createContinentDialog;
       }
    set createContinentDialog(value: boolean) {
        this.continentService.createContinentDialog= value;
       }
    
    get editContinentDialog() :boolean {
           return this.continentService.editContinentDialog;
       }
    set editContinentDialog(value: boolean) {
        this.continentService.editContinentDialog= value;
       }
    get viewContinentDialog() :boolean {
           return this.continentService.viewContinentDialog;
       }
    set viewContinentDialog(value: boolean) {
        this.continentService.viewContinentDialog = value;
       }
       
     get searchContinent() : ContinentVo {
        return this.continentService.searchContinent;
       }
    set searchContinent(value: ContinentVo) {
        this.continentService.searchContinent = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
