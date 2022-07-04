import {Component, OnInit} from '@angular/core';
import {TypeSavoirService} from 'src/app/controller/service/referentiel/TypeSavoir.service';
import {TypeSavoirVo} from 'src/app/controller/model/referentiel/TypeSavoir.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-type-savoir-list-admin',
  templateUrl: './type-savoir-list-admin.component.html',
  styleUrls: ['./type-savoir-list-admin.component.css']
})
export class TypeSavoirListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeSavoir';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTypeSavoirs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeSavoirs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'list');
        isPermistted ? this.typeSavoirService.findAll().subscribe(typeSavoirs => this.typeSavoirs = typeSavoirs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeSavoirService.findByCriteria(this.searchTypeSavoir).subscribe(typeSavoirs=>{
            
            this.typeSavoirs = typeSavoirs;
           // this.searchTypeSavoir = new TypeSavoirVo();
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
    
    public async editTypeSavoir(typeSavoir: TypeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'edit');
         if(isPermistted){
          this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(res => {
           this.selectedTypeSavoir = res;
           this.selectedTypeSavoir.dateArchivage = DateUtils.convert(this.selectedTypeSavoir.dateArchivage);

            this.editTypeSavoirDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeSavoir(typeSavoir: TypeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'view');
        if(isPermistted){
           this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(res => {
           this.selectedTypeSavoir = res;
           this.selectedTypeSavoir.dateArchivage = DateUtils.convert(this.selectedTypeSavoir.dateArchivage);
           this.selectedTypeSavoir.dateCreation = new Date(this.selectedTypeSavoir.dateCreation);

            this.viewTypeSavoirDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
            this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeSavoir(typeSavoir: TypeSavoirVo){
       const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type savoir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeSavoirService.delete(typeSavoir).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeSavoirs.indexOf(typeSavoir);
                          position > -1 ? this.typeSavoirs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type savoir Supprimé',
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


public async duplicateTypeSavoir(typeSavoir: TypeSavoirVo) {

     this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(
	 res => {
	       this.initDuplicateTypeSavoir(res);
	       this.selectedTypeSavoir = res;
	       this.selectedTypeSavoir.id = null;

            this.selectedTypeSavoir.dateCreation = null;
            this.selectedTypeSavoir.dateArchivage = DateUtils.convert(this.selectedTypeSavoir.dateArchivage);

            this.createTypeSavoirDialog = true;

});

	}

	initDuplicateTypeSavoir(res: TypeSavoirVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.typeSavoirs.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeSavoir.libelle ? this.searchTypeSavoir.libelle : environment.emptyForExport ,
            'Code': this.searchTypeSavoir.code ? this.searchTypeSavoir.code : environment.emptyForExport ,
            'Archive': this.searchTypeSavoir.archive ? (this.searchTypeSavoir.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeSavoir.dateArchivageMin ? this.datePipe.transform(this.searchTypeSavoir.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeSavoir.dateArchivageMax ? this.datePipe.transform(this.searchTypeSavoir.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeSavoir.dateCreationMin ? this.datePipe.transform(this.searchTypeSavoir.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeSavoir.dateCreationMax ? this.datePipe.transform(this.searchTypeSavoir.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeSavoirs() : Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
    set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

    get typeSavoirSelections() : Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirSelections;
       }
    set typeSavoirSelections(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirSelections = value;
       }
   
     


    get selectedTypeSavoir() : TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
    
    get createTypeSavoirDialog() :boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
    set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }
    
    get editTypeSavoirDialog() :boolean {
           return this.typeSavoirService.editTypeSavoirDialog;
       }
    set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog= value;
       }
    get viewTypeSavoirDialog() :boolean {
           return this.typeSavoirService.viewTypeSavoirDialog;
       }
    set viewTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.viewTypeSavoirDialog = value;
       }
       
     get searchTypeSavoir() : TypeSavoirVo {
        return this.typeSavoirService.searchTypeSavoir;
       }
    set searchTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.searchTypeSavoir = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
