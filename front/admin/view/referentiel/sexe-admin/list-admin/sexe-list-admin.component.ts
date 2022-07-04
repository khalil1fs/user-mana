import {Component, OnInit} from '@angular/core';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-sexe-list-admin',
  templateUrl: './sexe-list-admin.component.html',
  styleUrls: ['./sexe-list-admin.component.css']
})
export class SexeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Sexe';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private sexeService: SexeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadSexes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadSexes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Sexe', 'list');
        isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.sexeService.findByCriteria(this.searchSexe).subscribe(sexes=>{
            
            this.sexes = sexes;
           // this.searchSexe = new SexeVo();
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
    
    public async editSexe(sexe: SexeVo){
        const isPermistted = await this.roleService.isPermitted('Sexe', 'edit');
         if(isPermistted){
          this.sexeService.findByIdWithAssociatedList(sexe).subscribe(res => {
           this.selectedSexe = res;
           this.selectedSexe.dateArchivage = DateUtils.convert(this.selectedSexe.dateArchivage);

            this.editSexeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSexe(sexe: SexeVo){
        const isPermistted = await this.roleService.isPermitted('Sexe', 'view');
        if(isPermistted){
           this.sexeService.findByIdWithAssociatedList(sexe).subscribe(res => {
           this.selectedSexe = res;
           this.selectedSexe.dateArchivage = DateUtils.convert(this.selectedSexe.dateArchivage);
           this.selectedSexe.dateCreation = new Date(this.selectedSexe.dateCreation);

            this.viewSexeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSexe(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSexe = new SexeVo();
            this.createSexeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSexe(sexe: SexeVo){
       const isPermistted = await this.roleService.isPermitted('Sexe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Sexe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.sexeService.delete(sexe).subscribe(status=>{
                          if(status > 0){
                          const position = this.sexes.indexOf(sexe);
                          position > -1 ? this.sexes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Sexe Supprimé',
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


public async duplicateSexe(sexe: SexeVo) {

     this.sexeService.findByIdWithAssociatedList(sexe).subscribe(
	 res => {
	       this.initDuplicateSexe(res);
	       this.selectedSexe = res;
	       this.selectedSexe.id = null;

            this.selectedSexe.dateCreation = null;
            this.selectedSexe.dateArchivage = DateUtils.convert(this.selectedSexe.dateArchivage);

            this.createSexeDialog = true;

});

	}

	initDuplicateSexe(res: SexeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.sexes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchSexe.libelle ? this.searchSexe.libelle : environment.emptyForExport ,
            'Code': this.searchSexe.code ? this.searchSexe.code : environment.emptyForExport ,
            'Archive': this.searchSexe.archive ? (this.searchSexe.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchSexe.dateArchivageMin ? this.datePipe.transform(this.searchSexe.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchSexe.dateArchivageMax ? this.datePipe.transform(this.searchSexe.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchSexe.dateCreationMin ? this.datePipe.transform(this.searchSexe.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchSexe.dateCreationMax ? this.datePipe.transform(this.searchSexe.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get sexes() : Array<SexeVo> {
           return this.sexeService.sexes;
       }
    set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }

    get sexeSelections() : Array<SexeVo> {
           return this.sexeService.sexeSelections;
       }
    set sexeSelections(value: Array<SexeVo>) {
        this.sexeService.sexeSelections = value;
       }
   
     


    get selectedSexe() : SexeVo {
           return this.sexeService.selectedSexe;
       }
    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
    
    get createSexeDialog() :boolean {
           return this.sexeService.createSexeDialog;
       }
    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
       }
    
    get editSexeDialog() :boolean {
           return this.sexeService.editSexeDialog;
       }
    set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog= value;
       }
    get viewSexeDialog() :boolean {
           return this.sexeService.viewSexeDialog;
       }
    set viewSexeDialog(value: boolean) {
        this.sexeService.viewSexeDialog = value;
       }
       
     get searchSexe() : SexeVo {
        return this.sexeService.searchSexe;
       }
    set searchSexe(value: SexeVo) {
        this.sexeService.searchSexe = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
