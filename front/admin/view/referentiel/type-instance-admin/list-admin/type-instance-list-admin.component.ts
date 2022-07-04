import {Component, OnInit} from '@angular/core';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-instance-list-admin',
  templateUrl: './type-instance-list-admin.component.html',
  styleUrls: ['./type-instance-list-admin.component.css']
})
export class TypeInstanceListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstance';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeInstances();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeInstances(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'list');
        isPermistted ? this.typeInstanceService.findAll().subscribe(typeInstances => this.typeInstances = typeInstances,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstanceService.findByCriteria(this.searchTypeInstance).subscribe(typeInstances=>{
            
            this.typeInstances = typeInstances;
           // this.searchTypeInstance = new TypeInstanceVo();
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
    
    public async editTypeInstance(typeInstance: TypeInstanceVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'edit');
         if(isPermistted){
          this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(res => {
           this.selectedTypeInstance = res;
           this.selectedTypeInstance.dateArchivage = DateUtils.convert(this.selectedTypeInstance.dateArchivage);

            this.editTypeInstanceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstance(typeInstance: TypeInstanceVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'view');
        if(isPermistted){
           this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(res => {
           this.selectedTypeInstance = res;
           this.selectedTypeInstance.dateArchivage = DateUtils.convert(this.selectedTypeInstance.dateArchivage);
           this.selectedTypeInstance.dateCreation = new Date(this.selectedTypeInstance.dateCreation);

            this.viewTypeInstanceDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstance = new TypeInstanceVo();
            this.createTypeInstanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstance(typeInstance: TypeInstanceVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstance', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instance) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstanceService.delete(typeInstance).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstances.indexOf(typeInstance);
                          position > -1 ? this.typeInstances.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instance Supprimé',
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


public async duplicateTypeInstance(typeInstance: TypeInstanceVo) {

     this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(
	 res => {
	       this.initDuplicateTypeInstance(res);
	       this.selectedTypeInstance = res;
	       this.selectedTypeInstance.id = null;

            this.selectedTypeInstance.dateCreation = null;
            this.selectedTypeInstance.dateArchivage = DateUtils.convert(this.selectedTypeInstance.dateArchivage);

            this.createTypeInstanceDialog = true;

});

	}

	initDuplicateTypeInstance(res: TypeInstanceVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeInstances.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeInstance.libelle ? this.searchTypeInstance.libelle : environment.emptyForExport ,
            'Code': this.searchTypeInstance.code ? this.searchTypeInstance.code : environment.emptyForExport ,
            'Archive': this.searchTypeInstance.archive ? (this.searchTypeInstance.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeInstance.dateArchivageMin ? this.datePipe.transform(this.searchTypeInstance.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeInstance.dateArchivageMax ? this.datePipe.transform(this.searchTypeInstance.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeInstance.dateCreationMin ? this.datePipe.transform(this.searchTypeInstance.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeInstance.dateCreationMax ? this.datePipe.transform(this.searchTypeInstance.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstances() : Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
    set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

    get typeInstanceSelections() : Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstanceSelections;
       }
    set typeInstanceSelections(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstanceSelections = value;
       }
   
     


    get selectedTypeInstance() : TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
    
    get createTypeInstanceDialog() :boolean {
           return this.typeInstanceService.createTypeInstanceDialog;
       }
    set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
       }
    
    get editTypeInstanceDialog() :boolean {
           return this.typeInstanceService.editTypeInstanceDialog;
       }
    set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog= value;
       }
    get viewTypeInstanceDialog() :boolean {
           return this.typeInstanceService.viewTypeInstanceDialog;
       }
    set viewTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.viewTypeInstanceDialog = value;
       }
       
     get searchTypeInstance() : TypeInstanceVo {
        return this.typeInstanceService.searchTypeInstance;
       }
    set searchTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.searchTypeInstance = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
