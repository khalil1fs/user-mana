import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-reclamation-list-admin',
  templateUrl: './type-reclamation-list-admin.component.html',
  styleUrls: ['./type-reclamation-list-admin.component.css']
})
export class TypeReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeReclamation';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeReclamations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'list');
        isPermistted ? this.typeReclamationService.findAll().subscribe(typeReclamations => this.typeReclamations = typeReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeReclamationService.findByCriteria(this.searchTypeReclamation).subscribe(typeReclamations=>{
            
            this.typeReclamations = typeReclamations;
           // this.searchTypeReclamation = new TypeReclamationVo();
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
    
    public async editTypeReclamation(typeReclamation: TypeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'edit');
         if(isPermistted){
          this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(res => {
           this.selectedTypeReclamation = res;
           this.selectedTypeReclamation.dateArchivage = DateUtils.convert(this.selectedTypeReclamation.dateArchivage);

            this.editTypeReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeReclamation(typeReclamation: TypeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'view');
        if(isPermistted){
           this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(res => {
           this.selectedTypeReclamation = res;
           this.selectedTypeReclamation.dateArchivage = DateUtils.convert(this.selectedTypeReclamation.dateArchivage);
           this.selectedTypeReclamation.dateCreation = new Date(this.selectedTypeReclamation.dateCreation);

            this.viewTypeReclamationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeReclamation = new TypeReclamationVo();
            this.createTypeReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeReclamation(typeReclamation: TypeReclamationVo){
       const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeReclamationService.delete(typeReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeReclamations.indexOf(typeReclamation);
                          position > -1 ? this.typeReclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type reclamation Supprimé',
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


public async duplicateTypeReclamation(typeReclamation: TypeReclamationVo) {

     this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(
	 res => {
	       this.initDuplicateTypeReclamation(res);
	       this.selectedTypeReclamation = res;
	       this.selectedTypeReclamation.id = null;

            this.selectedTypeReclamation.dateCreation = null;
            this.selectedTypeReclamation.dateArchivage = DateUtils.convert(this.selectedTypeReclamation.dateArchivage);

            this.createTypeReclamationDialog = true;

});

	}

	initDuplicateTypeReclamation(res: TypeReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeReclamations.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeReclamation.libelle ? this.searchTypeReclamation.libelle : environment.emptyForExport ,
            'Code': this.searchTypeReclamation.code ? this.searchTypeReclamation.code : environment.emptyForExport ,
            'Archive': this.searchTypeReclamation.archive ? (this.searchTypeReclamation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeReclamation.dateArchivageMin ? this.datePipe.transform(this.searchTypeReclamation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeReclamation.dateArchivageMax ? this.datePipe.transform(this.searchTypeReclamation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeReclamation.dateCreationMin ? this.datePipe.transform(this.searchTypeReclamation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeReclamation.dateCreationMax ? this.datePipe.transform(this.searchTypeReclamation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeReclamations() : Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
    set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

    get typeReclamationSelections() : Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamationSelections;
       }
    set typeReclamationSelections(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamationSelections = value;
       }
   
     


    get selectedTypeReclamation() : TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
    
    get createTypeReclamationDialog() :boolean {
           return this.typeReclamationService.createTypeReclamationDialog;
       }
    set createTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.createTypeReclamationDialog= value;
       }
    
    get editTypeReclamationDialog() :boolean {
           return this.typeReclamationService.editTypeReclamationDialog;
       }
    set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog= value;
       }
    get viewTypeReclamationDialog() :boolean {
           return this.typeReclamationService.viewTypeReclamationDialog;
       }
    set viewTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.viewTypeReclamationDialog = value;
       }
       
     get searchTypeReclamation() : TypeReclamationVo {
        return this.typeReclamationService.searchTypeReclamation;
       }
    set searchTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.searchTypeReclamation = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
