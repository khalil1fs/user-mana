import {Component, OnInit} from '@angular/core';
import {NatureEtudeService} from 'src/app/controller/service/referentiel/NatureEtude.service';
import {NatureEtudeVo} from 'src/app/controller/model/referentiel/NatureEtude.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-nature-etude-list-admin',
  templateUrl: './nature-etude-list-admin.component.html',
  styleUrls: ['./nature-etude-list-admin.component.css']
})
export class NatureEtudeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureEtude';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadNatureEtudes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNatureEtudes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'list');
        isPermistted ? this.natureEtudeService.findAll().subscribe(natureEtudes => this.natureEtudes = natureEtudes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.natureEtudeService.findByCriteria(this.searchNatureEtude).subscribe(natureEtudes=>{
            
            this.natureEtudes = natureEtudes;
           // this.searchNatureEtude = new NatureEtudeVo();
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
    
    public async editNatureEtude(natureEtude: NatureEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'edit');
         if(isPermistted){
          this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(res => {
           this.selectedNatureEtude = res;
           this.selectedNatureEtude.dateArchivage = DateUtils.convert(this.selectedNatureEtude.dateArchivage);

            this.editNatureEtudeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNatureEtude(natureEtude: NatureEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'view');
        if(isPermistted){
           this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(res => {
           this.selectedNatureEtude = res;
           this.selectedNatureEtude.dateArchivage = DateUtils.convert(this.selectedNatureEtude.dateArchivage);
           this.selectedNatureEtude.dateCreation = new Date(this.selectedNatureEtude.dateCreation);

            this.viewNatureEtudeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNatureEtude(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNatureEtude = new NatureEtudeVo();
            this.createNatureEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNatureEtude(natureEtude: NatureEtudeVo){
       const isPermistted = await this.roleService.isPermitted('NatureEtude', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Nature etude) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.natureEtudeService.delete(natureEtude).subscribe(status=>{
                          if(status > 0){
                          const position = this.natureEtudes.indexOf(natureEtude);
                          position > -1 ? this.natureEtudes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Nature etude Supprimé',
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


public async duplicateNatureEtude(natureEtude: NatureEtudeVo) {

     this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(
	 res => {
	       this.initDuplicateNatureEtude(res);
	       this.selectedNatureEtude = res;
	       this.selectedNatureEtude.id = null;

            this.selectedNatureEtude.dateCreation = null;
            this.selectedNatureEtude.dateArchivage = DateUtils.convert(this.selectedNatureEtude.dateArchivage);

            this.createNatureEtudeDialog = true;

});

	}

	initDuplicateNatureEtude(res: NatureEtudeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.natureEtudes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchNatureEtude.libelle ? this.searchNatureEtude.libelle : environment.emptyForExport ,
            'Code': this.searchNatureEtude.code ? this.searchNatureEtude.code : environment.emptyForExport ,
            'Archive': this.searchNatureEtude.archive ? (this.searchNatureEtude.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNatureEtude.dateArchivageMin ? this.datePipe.transform(this.searchNatureEtude.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNatureEtude.dateArchivageMax ? this.datePipe.transform(this.searchNatureEtude.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNatureEtude.dateCreationMin ? this.datePipe.transform(this.searchNatureEtude.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNatureEtude.dateCreationMax ? this.datePipe.transform(this.searchNatureEtude.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get natureEtudes() : Array<NatureEtudeVo> {
           return this.natureEtudeService.natureEtudes;
       }
    set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

    get natureEtudeSelections() : Array<NatureEtudeVo> {
           return this.natureEtudeService.natureEtudeSelections;
       }
    set natureEtudeSelections(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudeSelections = value;
       }
   
     


    get selectedNatureEtude() : NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }
    
    get createNatureEtudeDialog() :boolean {
           return this.natureEtudeService.createNatureEtudeDialog;
       }
    set createNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.createNatureEtudeDialog= value;
       }
    
    get editNatureEtudeDialog() :boolean {
           return this.natureEtudeService.editNatureEtudeDialog;
       }
    set editNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.editNatureEtudeDialog= value;
       }
    get viewNatureEtudeDialog() :boolean {
           return this.natureEtudeService.viewNatureEtudeDialog;
       }
    set viewNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.viewNatureEtudeDialog = value;
       }
       
     get searchNatureEtude() : NatureEtudeVo {
        return this.natureEtudeService.searchNatureEtude;
       }
    set searchNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.searchNatureEtude = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
