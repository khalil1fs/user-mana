import {Component, OnInit} from '@angular/core';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-instruments-et-dispositifs-ird-list-admin',
  templateUrl: './type-instruments-et-dispositifs-ird-list-admin.component.html',
  styleUrls: ['./type-instruments-et-dispositifs-ird-list-admin.component.css']
})
export class TypeInstrumentsEtDispositifsIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstrumentsEtDispositifsIrd';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeInstrumentsEtDispositifsIrdService: TypeInstrumentsEtDispositifsIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeInstrumentsEtDispositifsIrds();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeInstrumentsEtDispositifsIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentsEtDispositifsIrd', 'list');
        isPermistted ? this.typeInstrumentsEtDispositifsIrdService.findAll().subscribe(typeInstrumentsEtDispositifsIrds => this.typeInstrumentsEtDispositifsIrds = typeInstrumentsEtDispositifsIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstrumentsEtDispositifsIrdService.findByCriteria(this.searchTypeInstrumentsEtDispositifsIrd).subscribe(typeInstrumentsEtDispositifsIrds=>{
            
            this.typeInstrumentsEtDispositifsIrds = typeInstrumentsEtDispositifsIrds;
           // this.searchTypeInstrumentsEtDispositifsIrd = new TypeInstrumentsEtDispositifsIrdVo();
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
    
    public async editTypeInstrumentsEtDispositifsIrd(typeInstrumentsEtDispositifsIrd: TypeInstrumentsEtDispositifsIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentsEtDispositifsIrd', 'edit');
         if(isPermistted){
          this.typeInstrumentsEtDispositifsIrdService.findByIdWithAssociatedList(typeInstrumentsEtDispositifsIrd).subscribe(res => {
           this.selectedTypeInstrumentsEtDispositifsIrd = res;
           this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage);

            this.editTypeInstrumentsEtDispositifsIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstrumentsEtDispositifsIrd(typeInstrumentsEtDispositifsIrd: TypeInstrumentsEtDispositifsIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentsEtDispositifsIrd', 'view');
        if(isPermistted){
           this.typeInstrumentsEtDispositifsIrdService.findByIdWithAssociatedList(typeInstrumentsEtDispositifsIrd).subscribe(res => {
           this.selectedTypeInstrumentsEtDispositifsIrd = res;
           this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage);
           this.selectedTypeInstrumentsEtDispositifsIrd.dateCreation = new Date(this.selectedTypeInstrumentsEtDispositifsIrd.dateCreation);

            this.viewTypeInstrumentsEtDispositifsIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstrumentsEtDispositifsIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstrumentsEtDispositifsIrd = new TypeInstrumentsEtDispositifsIrdVo();
            this.createTypeInstrumentsEtDispositifsIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstrumentsEtDispositifsIrd(typeInstrumentsEtDispositifsIrd: TypeInstrumentsEtDispositifsIrdVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstrumentsEtDispositifsIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instruments et dispositifs ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstrumentsEtDispositifsIrdService.delete(typeInstrumentsEtDispositifsIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstrumentsEtDispositifsIrds.indexOf(typeInstrumentsEtDispositifsIrd);
                          position > -1 ? this.typeInstrumentsEtDispositifsIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instruments et dispositifs ird Supprimé',
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


public async duplicateTypeInstrumentsEtDispositifsIrd(typeInstrumentsEtDispositifsIrd: TypeInstrumentsEtDispositifsIrdVo) {

     this.typeInstrumentsEtDispositifsIrdService.findByIdWithAssociatedList(typeInstrumentsEtDispositifsIrd).subscribe(
	 res => {
	       this.initDuplicateTypeInstrumentsEtDispositifsIrd(res);
	       this.selectedTypeInstrumentsEtDispositifsIrd = res;
	       this.selectedTypeInstrumentsEtDispositifsIrd.id = null;

            this.selectedTypeInstrumentsEtDispositifsIrd.dateCreation = null;
            this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentsEtDispositifsIrd.dateArchivage);

            this.createTypeInstrumentsEtDispositifsIrdDialog = true;

});

	}

	initDuplicateTypeInstrumentsEtDispositifsIrd(res: TypeInstrumentsEtDispositifsIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeInstrumentsEtDispositifsIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeInstrumentsEtDispositifsIrd.libelle ? this.searchTypeInstrumentsEtDispositifsIrd.libelle : environment.emptyForExport ,
            'Code': this.searchTypeInstrumentsEtDispositifsIrd.code ? this.searchTypeInstrumentsEtDispositifsIrd.code : environment.emptyForExport ,
            'Archive': this.searchTypeInstrumentsEtDispositifsIrd.archive ? (this.searchTypeInstrumentsEtDispositifsIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeInstrumentsEtDispositifsIrd.dateArchivageMin ? this.datePipe.transform(this.searchTypeInstrumentsEtDispositifsIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeInstrumentsEtDispositifsIrd.dateArchivageMax ? this.datePipe.transform(this.searchTypeInstrumentsEtDispositifsIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeInstrumentsEtDispositifsIrd.dateCreationMin ? this.datePipe.transform(this.searchTypeInstrumentsEtDispositifsIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeInstrumentsEtDispositifsIrd.dateCreationMax ? this.datePipe.transform(this.searchTypeInstrumentsEtDispositifsIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstrumentsEtDispositifsIrds() : Array<TypeInstrumentsEtDispositifsIrdVo> {
           return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
       }
    set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
       }

    get typeInstrumentsEtDispositifsIrdSelections() : Array<TypeInstrumentsEtDispositifsIrdVo> {
           return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrdSelections;
       }
    set typeInstrumentsEtDispositifsIrdSelections(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrdSelections = value;
       }
   
     


    get selectedTypeInstrumentsEtDispositifsIrd() : TypeInstrumentsEtDispositifsIrdVo {
           return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
       }
    set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
       }
    
    get createTypeInstrumentsEtDispositifsIrdDialog() :boolean {
           return this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog;
       }
    set createTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.createTypeInstrumentsEtDispositifsIrdDialog= value;
       }
    
    get editTypeInstrumentsEtDispositifsIrdDialog() :boolean {
           return this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog;
       }
    set editTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.editTypeInstrumentsEtDispositifsIrdDialog= value;
       }
    get viewTypeInstrumentsEtDispositifsIrdDialog() :boolean {
           return this.typeInstrumentsEtDispositifsIrdService.viewTypeInstrumentsEtDispositifsIrdDialog;
       }
    set viewTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.viewTypeInstrumentsEtDispositifsIrdDialog = value;
       }
       
     get searchTypeInstrumentsEtDispositifsIrd() : TypeInstrumentsEtDispositifsIrdVo {
        return this.typeInstrumentsEtDispositifsIrdService.searchTypeInstrumentsEtDispositifsIrd;
       }
    set searchTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.searchTypeInstrumentsEtDispositifsIrd = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
