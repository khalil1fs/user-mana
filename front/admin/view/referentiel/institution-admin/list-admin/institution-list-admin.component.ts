import {Component, OnInit} from '@angular/core';
import {InstitutionService} from 'src/app/controller/service/referentiel/Institution.service';
import {InstitutionVo} from 'src/app/controller/model/referentiel/Institution.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-institution-list-admin',
  templateUrl: './institution-list-admin.component.html',
  styleUrls: ['./institution-list-admin.component.css']
})
export class InstitutionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Institution';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private institutionService: InstitutionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadInstitutions();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadInstitutions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Institution', 'list');
        isPermistted ? this.institutionService.findAll().subscribe(institutions => this.institutions = institutions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.institutionService.findByCriteria(this.searchInstitution).subscribe(institutions=>{
            
            this.institutions = institutions;
           // this.searchInstitution = new InstitutionVo();
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
    
    public async editInstitution(institution: InstitutionVo){
        const isPermistted = await this.roleService.isPermitted('Institution', 'edit');
         if(isPermistted){
          this.institutionService.findByIdWithAssociatedList(institution).subscribe(res => {
           this.selectedInstitution = res;
           this.selectedInstitution.dateArchivage = DateUtils.convert(this.selectedInstitution.dateArchivage);

            this.editInstitutionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstitution(institution: InstitutionVo){
        const isPermistted = await this.roleService.isPermitted('Institution', 'view');
        if(isPermistted){
           this.institutionService.findByIdWithAssociatedList(institution).subscribe(res => {
           this.selectedInstitution = res;
           this.selectedInstitution.dateArchivage = DateUtils.convert(this.selectedInstitution.dateArchivage);
           this.selectedInstitution.dateCreation = new Date(this.selectedInstitution.dateCreation);

            this.viewInstitutionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstitution(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstitution = new InstitutionVo();
            this.createInstitutionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstitution(institution: InstitutionVo){
       const isPermistted = await this.roleService.isPermitted('Institution', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Institution) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.institutionService.delete(institution).subscribe(status=>{
                          if(status > 0){
                          const position = this.institutions.indexOf(institution);
                          position > -1 ? this.institutions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Institution Supprimé',
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


public async duplicateInstitution(institution: InstitutionVo) {

     this.institutionService.findByIdWithAssociatedList(institution).subscribe(
	 res => {
	       this.initDuplicateInstitution(res);
	       this.selectedInstitution = res;
	       this.selectedInstitution.id = null;

            this.selectedInstitution.dateCreation = null;
            this.selectedInstitution.dateArchivage = DateUtils.convert(this.selectedInstitution.dateArchivage);

            this.createInstitutionDialog = true;

});

	}

	initDuplicateInstitution(res: InstitutionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.institutions.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchInstitution.libelle ? this.searchInstitution.libelle : environment.emptyForExport ,
            'Code': this.searchInstitution.code ? this.searchInstitution.code : environment.emptyForExport ,
            'Archive': this.searchInstitution.archive ? (this.searchInstitution.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchInstitution.dateArchivageMin ? this.datePipe.transform(this.searchInstitution.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchInstitution.dateArchivageMax ? this.datePipe.transform(this.searchInstitution.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchInstitution.dateCreationMin ? this.datePipe.transform(this.searchInstitution.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchInstitution.dateCreationMax ? this.datePipe.transform(this.searchInstitution.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get institutions() : Array<InstitutionVo> {
           return this.institutionService.institutions;
       }
    set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

    get institutionSelections() : Array<InstitutionVo> {
           return this.institutionService.institutionSelections;
       }
    set institutionSelections(value: Array<InstitutionVo>) {
        this.institutionService.institutionSelections = value;
       }
   
     


    get selectedInstitution() : InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }
    
    get createInstitutionDialog() :boolean {
           return this.institutionService.createInstitutionDialog;
       }
    set createInstitutionDialog(value: boolean) {
        this.institutionService.createInstitutionDialog= value;
       }
    
    get editInstitutionDialog() :boolean {
           return this.institutionService.editInstitutionDialog;
       }
    set editInstitutionDialog(value: boolean) {
        this.institutionService.editInstitutionDialog= value;
       }
    get viewInstitutionDialog() :boolean {
           return this.institutionService.viewInstitutionDialog;
       }
    set viewInstitutionDialog(value: boolean) {
        this.institutionService.viewInstitutionDialog = value;
       }
       
     get searchInstitution() : InstitutionVo {
        return this.institutionService.searchInstitution;
       }
    set searchInstitution(value: InstitutionVo) {
        this.institutionService.searchInstitution = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
