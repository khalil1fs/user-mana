import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from 'src/app/controller/service/referentiel/TypeExpert.service';
import {TypeExpertVo} from 'src/app/controller/model/referentiel/TypeExpert.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-expert-list-admin',
  templateUrl: './type-expert-list-admin.component.html',
  styleUrls: ['./type-expert-list-admin.component.css']
})
export class TypeExpertListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeExpert';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeExperts();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeExperts(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'list');
        isPermistted ? this.typeExpertService.findAll().subscribe(typeExperts => this.typeExperts = typeExperts,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeExpertService.findByCriteria(this.searchTypeExpert).subscribe(typeExperts=>{
            
            this.typeExperts = typeExperts;
           // this.searchTypeExpert = new TypeExpertVo();
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
    
    public async editTypeExpert(typeExpert: TypeExpertVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'edit');
         if(isPermistted){
          this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(res => {
           this.selectedTypeExpert = res;
           this.selectedTypeExpert.dateArchivage = DateUtils.convert(this.selectedTypeExpert.dateArchivage);

            this.editTypeExpertDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeExpert(typeExpert: TypeExpertVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'view');
        if(isPermistted){
           this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(res => {
           this.selectedTypeExpert = res;
           this.selectedTypeExpert.dateArchivage = DateUtils.convert(this.selectedTypeExpert.dateArchivage);
           this.selectedTypeExpert.dateCreation = new Date(this.selectedTypeExpert.dateCreation);

            this.viewTypeExpertDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeExpert(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeExpert = new TypeExpertVo();
            this.createTypeExpertDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeExpert(typeExpert: TypeExpertVo){
       const isPermistted = await this.roleService.isPermitted('TypeExpert', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type expert) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeExpertService.delete(typeExpert).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeExperts.indexOf(typeExpert);
                          position > -1 ? this.typeExperts.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type expert Supprimé',
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


public async duplicateTypeExpert(typeExpert: TypeExpertVo) {

     this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(
	 res => {
	       this.initDuplicateTypeExpert(res);
	       this.selectedTypeExpert = res;
	       this.selectedTypeExpert.id = null;

            this.selectedTypeExpert.dateCreation = null;
            this.selectedTypeExpert.dateArchivage = DateUtils.convert(this.selectedTypeExpert.dateArchivage);

            this.createTypeExpertDialog = true;

});

	}

	initDuplicateTypeExpert(res: TypeExpertVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeExperts.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeExpert.libelle ? this.searchTypeExpert.libelle : environment.emptyForExport ,
            'Code': this.searchTypeExpert.code ? this.searchTypeExpert.code : environment.emptyForExport ,
            'Archive': this.searchTypeExpert.archive ? (this.searchTypeExpert.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeExpert.dateArchivageMin ? this.datePipe.transform(this.searchTypeExpert.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeExpert.dateArchivageMax ? this.datePipe.transform(this.searchTypeExpert.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeExpert.dateCreationMin ? this.datePipe.transform(this.searchTypeExpert.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeExpert.dateCreationMax ? this.datePipe.transform(this.searchTypeExpert.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeExperts() : Array<TypeExpertVo> {
           return this.typeExpertService.typeExperts;
       }
    set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

    get typeExpertSelections() : Array<TypeExpertVo> {
           return this.typeExpertService.typeExpertSelections;
       }
    set typeExpertSelections(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExpertSelections = value;
       }
   
     


    get selectedTypeExpert() : TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }
    
    get createTypeExpertDialog() :boolean {
           return this.typeExpertService.createTypeExpertDialog;
       }
    set createTypeExpertDialog(value: boolean) {
        this.typeExpertService.createTypeExpertDialog= value;
       }
    
    get editTypeExpertDialog() :boolean {
           return this.typeExpertService.editTypeExpertDialog;
       }
    set editTypeExpertDialog(value: boolean) {
        this.typeExpertService.editTypeExpertDialog= value;
       }
    get viewTypeExpertDialog() :boolean {
           return this.typeExpertService.viewTypeExpertDialog;
       }
    set viewTypeExpertDialog(value: boolean) {
        this.typeExpertService.viewTypeExpertDialog = value;
       }
       
     get searchTypeExpert() : TypeExpertVo {
        return this.typeExpertService.searchTypeExpert;
       }
    set searchTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.searchTypeExpert = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
