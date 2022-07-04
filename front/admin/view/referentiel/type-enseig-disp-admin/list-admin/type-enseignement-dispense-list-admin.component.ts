import {Component, OnInit} from '@angular/core';
import {TypeEnseignementDispenseService} from 'src/app/controller/service/referentiel/TypeEnseignementDispense.service';
import {TypeEnseignementDispenseVo} from 'src/app/controller/model/referentiel/TypeEnseignementDispense.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-enseignement-dispense-list-admin',
  templateUrl: './type-enseignement-dispense-list-admin.component.html',
  styleUrls: ['./type-enseignement-dispense-list-admin.component.css']
})
export class TypeEnseignementDispenseListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEnseignementDispense';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeEnseignementDispenseService: TypeEnseignementDispenseService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeEnseignementDispenses();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeEnseignementDispenses(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEnseignementDispense', 'list');
        isPermistted ? this.typeEnseignementDispenseService.findAll().subscribe(typeEnseignementDispenses => this.typeEnseignementDispenses = typeEnseignementDispenses,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEnseignementDispenseService.findByCriteria(this.searchTypeEnseignementDispense).subscribe(typeEnseignementDispenses=>{
            
            this.typeEnseignementDispenses = typeEnseignementDispenses;
           // this.searchTypeEnseignementDispense = new TypeEnseignementDispenseVo();
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
    
    public async editTypeEnseignementDispense(typeEnseignementDispense: TypeEnseignementDispenseVo){
        const isPermistted = await this.roleService.isPermitted('TypeEnseignementDispense', 'edit');
         if(isPermistted){
          this.typeEnseignementDispenseService.findByIdWithAssociatedList(typeEnseignementDispense).subscribe(res => {
           this.selectedTypeEnseignementDispense = res;
           this.selectedTypeEnseignementDispense.dateArchivage = DateUtils.convert(this.selectedTypeEnseignementDispense.dateArchivage);

            this.editTypeEnseignementDispenseDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEnseignementDispense(typeEnseignementDispense: TypeEnseignementDispenseVo){
        const isPermistted = await this.roleService.isPermitted('TypeEnseignementDispense', 'view');
        if(isPermistted){
           this.typeEnseignementDispenseService.findByIdWithAssociatedList(typeEnseignementDispense).subscribe(res => {
           this.selectedTypeEnseignementDispense = res;
           this.selectedTypeEnseignementDispense.dateArchivage = DateUtils.convert(this.selectedTypeEnseignementDispense.dateArchivage);
           this.selectedTypeEnseignementDispense.dateCreation = new Date(this.selectedTypeEnseignementDispense.dateCreation);

            this.viewTypeEnseignementDispenseDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEnseignementDispense(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEnseignementDispense = new TypeEnseignementDispenseVo();
            this.createTypeEnseignementDispenseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEnseignementDispense(typeEnseignementDispense: TypeEnseignementDispenseVo){
       const isPermistted = await this.roleService.isPermitted('TypeEnseignementDispense', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type enseignement dispense) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEnseignementDispenseService.delete(typeEnseignementDispense).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEnseignementDispenses.indexOf(typeEnseignementDispense);
                          position > -1 ? this.typeEnseignementDispenses.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type enseignement dispense Supprimé',
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


public async duplicateTypeEnseignementDispense(typeEnseignementDispense: TypeEnseignementDispenseVo) {

     this.typeEnseignementDispenseService.findByIdWithAssociatedList(typeEnseignementDispense).subscribe(
	 res => {
	       this.initDuplicateTypeEnseignementDispense(res);
	       this.selectedTypeEnseignementDispense = res;
	       this.selectedTypeEnseignementDispense.id = null;

            this.selectedTypeEnseignementDispense.dateCreation = null;
            this.selectedTypeEnseignementDispense.dateArchivage = DateUtils.convert(this.selectedTypeEnseignementDispense.dateArchivage);

            this.createTypeEnseignementDispenseDialog = true;

});

	}

	initDuplicateTypeEnseignementDispense(res: TypeEnseignementDispenseVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeEnseignementDispenses.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeEnseignementDispense.libelle ? this.searchTypeEnseignementDispense.libelle : environment.emptyForExport ,
            'Code': this.searchTypeEnseignementDispense.code ? this.searchTypeEnseignementDispense.code : environment.emptyForExport ,
            'Archive': this.searchTypeEnseignementDispense.archive ? (this.searchTypeEnseignementDispense.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeEnseignementDispense.dateArchivageMin ? this.datePipe.transform(this.searchTypeEnseignementDispense.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeEnseignementDispense.dateArchivageMax ? this.datePipe.transform(this.searchTypeEnseignementDispense.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeEnseignementDispense.dateCreationMin ? this.datePipe.transform(this.searchTypeEnseignementDispense.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeEnseignementDispense.dateCreationMax ? this.datePipe.transform(this.searchTypeEnseignementDispense.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEnseignementDispenses() : Array<TypeEnseignementDispenseVo> {
           return this.typeEnseignementDispenseService.typeEnseignementDispenses;
       }
    set typeEnseignementDispenses(value: Array<TypeEnseignementDispenseVo>) {
        this.typeEnseignementDispenseService.typeEnseignementDispenses = value;
       }

    get typeEnseignementDispenseSelections() : Array<TypeEnseignementDispenseVo> {
           return this.typeEnseignementDispenseService.typeEnseignementDispenseSelections;
       }
    set typeEnseignementDispenseSelections(value: Array<TypeEnseignementDispenseVo>) {
        this.typeEnseignementDispenseService.typeEnseignementDispenseSelections = value;
       }
   
     


    get selectedTypeEnseignementDispense() : TypeEnseignementDispenseVo {
           return this.typeEnseignementDispenseService.selectedTypeEnseignementDispense;
       }
    set selectedTypeEnseignementDispense(value: TypeEnseignementDispenseVo) {
        this.typeEnseignementDispenseService.selectedTypeEnseignementDispense = value;
       }
    
    get createTypeEnseignementDispenseDialog() :boolean {
           return this.typeEnseignementDispenseService.createTypeEnseignementDispenseDialog;
       }
    set createTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.createTypeEnseignementDispenseDialog= value;
       }
    
    get editTypeEnseignementDispenseDialog() :boolean {
           return this.typeEnseignementDispenseService.editTypeEnseignementDispenseDialog;
       }
    set editTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.editTypeEnseignementDispenseDialog= value;
       }
    get viewTypeEnseignementDispenseDialog() :boolean {
           return this.typeEnseignementDispenseService.viewTypeEnseignementDispenseDialog;
       }
    set viewTypeEnseignementDispenseDialog(value: boolean) {
        this.typeEnseignementDispenseService.viewTypeEnseignementDispenseDialog = value;
       }
       
     get searchTypeEnseignementDispense() : TypeEnseignementDispenseVo {
        return this.typeEnseignementDispenseService.searchTypeEnseignementDispense;
       }
    set searchTypeEnseignementDispense(value: TypeEnseignementDispenseVo) {
        this.typeEnseignementDispenseService.searchTypeEnseignementDispense = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
