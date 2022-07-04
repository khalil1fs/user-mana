import {Component, OnInit} from '@angular/core';
import {OutilFormationContinueService} from 'src/app/controller/service/formulaire/OutilFormationContinue.service';
import {OutilFormationContinueVo} from 'src/app/controller/model/referentiel/OutilFormationContinue.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-outil-formation-continue-list-admin',
  templateUrl: './outil-formation-continue-list-admin.component.html',
  styleUrls: ['./outil-formation-continue-list-admin.component.css']
})
export class OutilFormationContinueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilFormationContinue';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private outilFormationContinueService: OutilFormationContinueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadOutilFormationContinues();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadOutilFormationContinues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilFormationContinue', 'list');
        isPermistted ? this.outilFormationContinueService.findAll().subscribe(outilFormationContinues => this.outilFormationContinues = outilFormationContinues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilFormationContinueService.findByCriteria(this.searchOutilFormationContinue).subscribe(outilFormationContinues=>{
            
            this.outilFormationContinues = outilFormationContinues;
           // this.searchOutilFormationContinue = new OutilFormationContinueVo();
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
    
    public async editOutilFormationContinue(outilFormationContinue: OutilFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('OutilFormationContinue', 'edit');
         if(isPermistted){
          this.outilFormationContinueService.findByIdWithAssociatedList(outilFormationContinue).subscribe(res => {
           this.selectedOutilFormationContinue = res;
           this.selectedOutilFormationContinue.dateArchivage = DateUtils.convert(this.selectedOutilFormationContinue.dateArchivage);

            this.editOutilFormationContinueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilFormationContinue(outilFormationContinue: OutilFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('OutilFormationContinue', 'view');
        if(isPermistted){
           this.outilFormationContinueService.findByIdWithAssociatedList(outilFormationContinue).subscribe(res => {
           this.selectedOutilFormationContinue = res;
           this.selectedOutilFormationContinue.dateArchivage = DateUtils.convert(this.selectedOutilFormationContinue.dateArchivage);
           this.selectedOutilFormationContinue.dateCreation = new Date(this.selectedOutilFormationContinue.dateCreation);

            this.viewOutilFormationContinueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilFormationContinue = new OutilFormationContinueVo();
            this.createOutilFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilFormationContinue(outilFormationContinue: OutilFormationContinueVo){
       const isPermistted = await this.roleService.isPermitted('OutilFormationContinue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil formation continue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilFormationContinueService.delete(outilFormationContinue).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilFormationContinues.indexOf(outilFormationContinue);
                          position > -1 ? this.outilFormationContinues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil formation continue Supprimé',
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


public async duplicateOutilFormationContinue(outilFormationContinue: OutilFormationContinueVo) {

     this.outilFormationContinueService.findByIdWithAssociatedList(outilFormationContinue).subscribe(
	 res => {
	       this.initDuplicateOutilFormationContinue(res);
	       this.selectedOutilFormationContinue = res;
	       this.selectedOutilFormationContinue.id = null;

            this.selectedOutilFormationContinue.dateCreation = null;
            this.selectedOutilFormationContinue.dateArchivage = DateUtils.convert(this.selectedOutilFormationContinue.dateArchivage);

            this.createOutilFormationContinueDialog = true;

});

	}

	initDuplicateOutilFormationContinue(res: OutilFormationContinueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.outilFormationContinues.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchOutilFormationContinue.libelle ? this.searchOutilFormationContinue.libelle : environment.emptyForExport ,
            'Code': this.searchOutilFormationContinue.code ? this.searchOutilFormationContinue.code : environment.emptyForExport ,
            'Archive': this.searchOutilFormationContinue.archive ? (this.searchOutilFormationContinue.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchOutilFormationContinue.dateArchivageMin ? this.datePipe.transform(this.searchOutilFormationContinue.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchOutilFormationContinue.dateArchivageMax ? this.datePipe.transform(this.searchOutilFormationContinue.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchOutilFormationContinue.dateCreationMin ? this.datePipe.transform(this.searchOutilFormationContinue.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchOutilFormationContinue.dateCreationMax ? this.datePipe.transform(this.searchOutilFormationContinue.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilFormationContinues() : Array<OutilFormationContinueVo> {
           return this.outilFormationContinueService.outilFormationContinues;
       }
    set outilFormationContinues(value: Array<OutilFormationContinueVo>) {
        this.outilFormationContinueService.outilFormationContinues = value;
       }

    get outilFormationContinueSelections() : Array<OutilFormationContinueVo> {
           return this.outilFormationContinueService.outilFormationContinueSelections;
       }
    set outilFormationContinueSelections(value: Array<OutilFormationContinueVo>) {
        this.outilFormationContinueService.outilFormationContinueSelections = value;
       }
   
     


    get selectedOutilFormationContinue() : OutilFormationContinueVo {
           return this.outilFormationContinueService.selectedOutilFormationContinue;
       }
    set selectedOutilFormationContinue(value: OutilFormationContinueVo) {
        this.outilFormationContinueService.selectedOutilFormationContinue = value;
       }
    
    get createOutilFormationContinueDialog() :boolean {
           return this.outilFormationContinueService.createOutilFormationContinueDialog;
       }
    set createOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.createOutilFormationContinueDialog= value;
       }
    
    get editOutilFormationContinueDialog() :boolean {
           return this.outilFormationContinueService.editOutilFormationContinueDialog;
       }
    set editOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.editOutilFormationContinueDialog= value;
       }
    get viewOutilFormationContinueDialog() :boolean {
           return this.outilFormationContinueService.viewOutilFormationContinueDialog;
       }
    set viewOutilFormationContinueDialog(value: boolean) {
        this.outilFormationContinueService.viewOutilFormationContinueDialog = value;
       }
       
     get searchOutilFormationContinue() : OutilFormationContinueVo {
        return this.outilFormationContinueService.searchOutilFormationContinue;
       }
    set searchOutilFormationContinue(value: OutilFormationContinueVo) {
        this.outilFormationContinueService.searchOutilFormationContinue = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
