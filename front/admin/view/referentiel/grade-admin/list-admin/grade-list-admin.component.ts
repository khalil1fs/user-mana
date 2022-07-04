import {Component, OnInit} from '@angular/core';
import {GradeService} from 'src/app/controller/service/referentiel/Grade.service';
import {GradeVo} from 'src/app/controller/model/referentiel/Grade.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-grade-list-admin',
  templateUrl: './grade-list-admin.component.html',
  styleUrls: ['./grade-list-admin.component.css']
})
export class GradeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Grade';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private gradeService: GradeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadGrades();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadGrades(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Grade', 'list');
        isPermistted ? this.gradeService.findAll().subscribe(grades => this.grades = grades,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.gradeService.findByCriteria(this.searchGrade).subscribe(grades=>{
            
            this.grades = grades;
           // this.searchGrade = new GradeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'idGraph', header: 'Id graph'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editGrade(grade: GradeVo){
        const isPermistted = await this.roleService.isPermitted('Grade', 'edit');
         if(isPermistted){
          this.gradeService.findByIdWithAssociatedList(grade).subscribe(res => {
           this.selectedGrade = res;
           this.selectedGrade.dateArchivage = DateUtils.convert(this.selectedGrade.dateArchivage);

            this.editGradeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewGrade(grade: GradeVo){
        const isPermistted = await this.roleService.isPermitted('Grade', 'view');
        if(isPermistted){
           this.gradeService.findByIdWithAssociatedList(grade).subscribe(res => {
           this.selectedGrade = res;
           this.selectedGrade.dateArchivage = DateUtils.convert(this.selectedGrade.dateArchivage);
           this.selectedGrade.dateCreation = new Date(this.selectedGrade.dateCreation);

            this.viewGradeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateGrade(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedGrade = new GradeVo();
            this.createGradeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteGrade(grade: GradeVo){
       const isPermistted = await this.roleService.isPermitted('Grade', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Grade) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.gradeService.delete(grade).subscribe(status=>{
                          if(status > 0){
                          const position = this.grades.indexOf(grade);
                          position > -1 ? this.grades.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Grade Supprimé',
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


public async duplicateGrade(grade: GradeVo) {

     this.gradeService.findByIdWithAssociatedList(grade).subscribe(
	 res => {
	       this.initDuplicateGrade(res);
	       this.selectedGrade = res;
	       this.selectedGrade.id = null;

            this.selectedGrade.dateCreation = null;
            this.selectedGrade.dateArchivage = DateUtils.convert(this.selectedGrade.dateArchivage);

            this.createGradeDialog = true;

});

	}

	initDuplicateGrade(res: GradeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.grades.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Id graph': e.idGraph ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchGrade.libelle ? this.searchGrade.libelle : environment.emptyForExport ,
            'Code': this.searchGrade.code ? this.searchGrade.code : environment.emptyForExport ,
            'Description': this.searchGrade.description ? this.searchGrade.description : environment.emptyForExport ,
            'Id graph': this.searchGrade.idGraph ? this.searchGrade.idGraph : environment.emptyForExport ,
            'Archive': this.searchGrade.archive ? (this.searchGrade.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchGrade.dateArchivageMin ? this.datePipe.transform(this.searchGrade.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchGrade.dateArchivageMax ? this.datePipe.transform(this.searchGrade.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchGrade.dateCreationMin ? this.datePipe.transform(this.searchGrade.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchGrade.dateCreationMax ? this.datePipe.transform(this.searchGrade.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get grades() : Array<GradeVo> {
           return this.gradeService.grades;
       }
    set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }

    get gradeSelections() : Array<GradeVo> {
           return this.gradeService.gradeSelections;
       }
    set gradeSelections(value: Array<GradeVo>) {
        this.gradeService.gradeSelections = value;
       }
   
     


    get selectedGrade() : GradeVo {
           return this.gradeService.selectedGrade;
       }
    set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
    
    get createGradeDialog() :boolean {
           return this.gradeService.createGradeDialog;
       }
    set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog= value;
       }
    
    get editGradeDialog() :boolean {
           return this.gradeService.editGradeDialog;
       }
    set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog= value;
       }
    get viewGradeDialog() :boolean {
           return this.gradeService.viewGradeDialog;
       }
    set viewGradeDialog(value: boolean) {
        this.gradeService.viewGradeDialog = value;
       }
       
     get searchGrade() : GradeVo {
        return this.gradeService.searchGrade;
       }
    set searchGrade(value: GradeVo) {
        this.gradeService.searchGrade = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
