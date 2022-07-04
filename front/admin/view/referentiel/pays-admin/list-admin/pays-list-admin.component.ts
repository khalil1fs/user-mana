import {Component, OnInit} from '@angular/core';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';

import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-pays-list-admin',
  templateUrl: './pays-list-admin.component.html',
  styleUrls: ['./pays-list-admin.component.css']
})
export class PaysListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Pays';
     yesOrNoArchive :any[] =[];
    continents :Array<ContinentVo>;


    constructor(private datePipe: DatePipe, private paysService: PaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private continentService: ContinentService
) { }

    ngOnInit() : void {
      this.loadPayss();
      this.initExport();
      this.initCol();
      this.loadContinent();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Pays', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysService.findByCriteria(this.searchPays).subscribe(payss=>{
            
            this.payss = payss;
           // this.searchPays = new PaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'continent?.libelle', header: 'Continent'},
                            {field: 'idGraph', header: 'Id graph'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editPays(pays: PaysVo){
        const isPermistted = await this.roleService.isPermitted('Pays', 'edit');
         if(isPermistted){
          this.paysService.findByIdWithAssociatedList(pays).subscribe(res => {
           this.selectedPays = res;
           this.selectedPays.dateArchivage = DateUtils.convert(this.selectedPays.dateArchivage);

            this.editPaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPays(pays: PaysVo){
        const isPermistted = await this.roleService.isPermitted('Pays', 'view');
        if(isPermistted){
           this.paysService.findByIdWithAssociatedList(pays).subscribe(res => {
           this.selectedPays = res;
           this.selectedPays.dateArchivage = DateUtils.convert(this.selectedPays.dateArchivage);
           this.selectedPays.dateCreation = new Date(this.selectedPays.dateCreation);

            this.viewPaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePays(pays: PaysVo){
       const isPermistted = await this.roleService.isPermitted('Pays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysService.delete(pays).subscribe(status=>{
                          if(status > 0){
                          const position = this.payss.indexOf(pays);
                          position > -1 ? this.payss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays Supprimé',
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

public async loadContinent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Pays', 'list');
    isPermistted ? this.continentService.findAll().subscribe(continents => this.continents = continents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePays(pays: PaysVo) {

     this.paysService.findByIdWithAssociatedList(pays).subscribe(
	 res => {
	       this.initDuplicatePays(res);
	       this.selectedPays = res;
	       this.selectedPays.id = null;

            this.selectedPays.dateCreation = null;
            this.selectedPays.dateArchivage = DateUtils.convert(this.selectedPays.dateArchivage);

            this.createPaysDialog = true;

});

	}

	initDuplicatePays(res: PaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.payss.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
            'Continent': e.continentVo?.libelle ,
                    'Id graph': e.idGraph ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchPays.libelle ? this.searchPays.libelle : environment.emptyForExport ,
            'Code': this.searchPays.code ? this.searchPays.code : environment.emptyForExport ,
        'Continent': this.searchPays.continentVo?.libelle ? this.searchPays.continentVo?.libelle : environment.emptyForExport ,
            'Id graph': this.searchPays.idGraph ? this.searchPays.idGraph : environment.emptyForExport ,
            'Archive': this.searchPays.archive ? (this.searchPays.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPays.dateArchivageMin ? this.datePipe.transform(this.searchPays.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPays.dateArchivageMax ? this.datePipe.transform(this.searchPays.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPays.dateCreationMin ? this.datePipe.transform(this.searchPays.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPays.dateCreationMax ? this.datePipe.transform(this.searchPays.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get payss() : Array<PaysVo> {
           return this.paysService.payss;
       }
    set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

    get paysSelections() : Array<PaysVo> {
           return this.paysService.paysSelections;
       }
    set paysSelections(value: Array<PaysVo>) {
        this.paysService.paysSelections = value;
       }
   
     


    get selectedPays() : PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
    
    get createPaysDialog() :boolean {
           return this.paysService.createPaysDialog;
       }
    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
    
    get editPaysDialog() :boolean {
           return this.paysService.editPaysDialog;
       }
    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }
    get viewPaysDialog() :boolean {
           return this.paysService.viewPaysDialog;
       }
    set viewPaysDialog(value: boolean) {
        this.paysService.viewPaysDialog = value;
       }
       
     get searchPays() : PaysVo {
        return this.paysService.searchPays;
       }
    set searchPays(value: PaysVo) {
        this.paysService.searchPays = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
