import {Component, OnInit} from '@angular/core';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';
import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-outil-list-admin',
  templateUrl: './type-outil-list-admin.component.html',
  styleUrls: ['./type-outil-list-admin.component.css']
})
export class TypeOutilListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeOutil';
     yesOrNoNumerique :any[] =[];
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeOutilService: TypeOutilService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeOutils();
      this.initExport();
      this.initCol();
    this.yesOrNoNumerique =  [{label: 'Numerique', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeOutils(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOutil', 'list');
        isPermistted ? this.typeOutilService.findAll().subscribe(typeOutils => this.typeOutils = typeOutils,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeOutilService.findByCriteria(this.searchTypeOutil).subscribe(typeOutils=>{
            
            this.typeOutils = typeOutils;
           // this.searchTypeOutil = new TypeOutilVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'numerique', header: 'Numerique'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editTypeOutil(typeOutil: TypeOutilVo){
        const isPermistted = await this.roleService.isPermitted('TypeOutil', 'edit');
         if(isPermistted){
          this.typeOutilService.findByIdWithAssociatedList(typeOutil).subscribe(res => {
           this.selectedTypeOutil = res;
           this.selectedTypeOutil.dateArchivage = DateUtils.convert(this.selectedTypeOutil.dateArchivage);

            this.editTypeOutilDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeOutil(typeOutil: TypeOutilVo){
        const isPermistted = await this.roleService.isPermitted('TypeOutil', 'view');
        if(isPermistted){
           this.typeOutilService.findByIdWithAssociatedList(typeOutil).subscribe(res => {
           this.selectedTypeOutil = res;
           this.selectedTypeOutil.dateArchivage = DateUtils.convert(this.selectedTypeOutil.dateArchivage);
           this.selectedTypeOutil.dateCreation = new Date(this.selectedTypeOutil.dateCreation);

            this.viewTypeOutilDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeOutil(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
            this.createTypeOutilDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeOutil(typeOutil: TypeOutilVo){
       const isPermistted = await this.roleService.isPermitted('TypeOutil', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type outil) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeOutilService.delete(typeOutil).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeOutils.indexOf(typeOutil);
                          position > -1 ? this.typeOutils.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type outil Supprimé',
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


public async duplicateTypeOutil(typeOutil: TypeOutilVo) {

     this.typeOutilService.findByIdWithAssociatedList(typeOutil).subscribe(
	 res => {
	       this.initDuplicateTypeOutil(res);
	       this.selectedTypeOutil = res;
	       this.selectedTypeOutil.id = null;

            this.selectedTypeOutil.dateCreation = null;
            this.selectedTypeOutil.dateArchivage = DateUtils.convert(this.selectedTypeOutil.dateArchivage);

            this.createTypeOutilDialog = true;

});

	}

	initDuplicateTypeOutil(res: TypeOutilVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeOutils.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Numerique': e.numerique? 'Vrai' : 'Faux' ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeOutil.libelle ? this.searchTypeOutil.libelle : environment.emptyForExport ,
            'Code': this.searchTypeOutil.code ? this.searchTypeOutil.code : environment.emptyForExport ,
            'Numerique': this.searchTypeOutil.numerique ? (this.searchTypeOutil.numerique ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Archive': this.searchTypeOutil.archive ? (this.searchTypeOutil.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeOutil.dateArchivageMin ? this.datePipe.transform(this.searchTypeOutil.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeOutil.dateArchivageMax ? this.datePipe.transform(this.searchTypeOutil.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeOutil.dateCreationMin ? this.datePipe.transform(this.searchTypeOutil.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeOutil.dateCreationMax ? this.datePipe.transform(this.searchTypeOutil.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeOutils() : Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
    set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }

    get typeOutilSelections() : Array<TypeOutilVo> {
           return this.typeOutilService.typeOutilSelections;
       }
    set typeOutilSelections(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutilSelections = value;
       }
   
     


    get selectedTypeOutil() : TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
    
    get createTypeOutilDialog() :boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
    set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
       }
    
    get editTypeOutilDialog() :boolean {
           return this.typeOutilService.editTypeOutilDialog;
       }
    set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog= value;
       }
    get viewTypeOutilDialog() :boolean {
           return this.typeOutilService.viewTypeOutilDialog;
       }
    set viewTypeOutilDialog(value: boolean) {
        this.typeOutilService.viewTypeOutilDialog = value;
       }
       
     get searchTypeOutil() : TypeOutilVo {
        return this.typeOutilService.searchTypeOutil;
       }
    set searchTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.searchTypeOutil = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
