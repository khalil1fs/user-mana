import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentIrd.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-instrument-ird-list-admin',
  templateUrl: './type-instrument-ird-list-admin.component.html',
  styleUrls: ['./type-instrument-ird-list-admin.component.css']
})
export class TypeInstrumentIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstrumentIrd';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeInstrumentIrds();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'list');
        isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstrumentIrdService.findByCriteria(this.searchTypeInstrumentIrd).subscribe(typeInstrumentIrds=>{
            
            this.typeInstrumentIrds = typeInstrumentIrds;
           // this.searchTypeInstrumentIrd = new TypeInstrumentIrdVo();
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
    
    public async editTypeInstrumentIrd(typeInstrumentIrd: TypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'edit');
         if(isPermistted){
          this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(res => {
           this.selectedTypeInstrumentIrd = res;
           this.selectedTypeInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentIrd.dateArchivage);

            this.editTypeInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstrumentIrd(typeInstrumentIrd: TypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'view');
        if(isPermistted){
           this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(res => {
           this.selectedTypeInstrumentIrd = res;
           this.selectedTypeInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentIrd.dateArchivage);
           this.selectedTypeInstrumentIrd.dateCreation = new Date(this.selectedTypeInstrumentIrd.dateCreation);

            this.viewTypeInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
            this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstrumentIrd(typeInstrumentIrd: TypeInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstrumentIrdService.delete(typeInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstrumentIrds.indexOf(typeInstrumentIrd);
                          position > -1 ? this.typeInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instrument ird Supprimé',
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


public async duplicateTypeInstrumentIrd(typeInstrumentIrd: TypeInstrumentIrdVo) {

     this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateTypeInstrumentIrd(res);
	       this.selectedTypeInstrumentIrd = res;
	       this.selectedTypeInstrumentIrd.id = null;

            this.selectedTypeInstrumentIrd.dateCreation = null;
            this.selectedTypeInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedTypeInstrumentIrd.dateArchivage);

            this.createTypeInstrumentIrdDialog = true;

});

	}

	initDuplicateTypeInstrumentIrd(res: TypeInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeInstrumentIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeInstrumentIrd.libelle ? this.searchTypeInstrumentIrd.libelle : environment.emptyForExport ,
            'Code': this.searchTypeInstrumentIrd.code ? this.searchTypeInstrumentIrd.code : environment.emptyForExport ,
            'Archive': this.searchTypeInstrumentIrd.archive ? (this.searchTypeInstrumentIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeInstrumentIrd.dateArchivageMin ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeInstrumentIrd.dateArchivageMax ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeInstrumentIrd.dateCreationMin ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeInstrumentIrd.dateCreationMax ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstrumentIrds() : Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
    set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

    get typeInstrumentIrdSelections() : Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrdSelections;
       }
    set typeInstrumentIrdSelections(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrdSelections = value;
       }
   
     


    get selectedTypeInstrumentIrd() : TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
    
    get createTypeInstrumentIrdDialog() :boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
    set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
    
    get editTypeInstrumentIrdDialog() :boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
    set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
    get viewTypeInstrumentIrdDialog() :boolean {
           return this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog;
       }
    set viewTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog = value;
       }
       
     get searchTypeInstrumentIrd() : TypeInstrumentIrdVo {
        return this.typeInstrumentIrdService.searchTypeInstrumentIrd;
       }
    set searchTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.searchTypeInstrumentIrd = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
