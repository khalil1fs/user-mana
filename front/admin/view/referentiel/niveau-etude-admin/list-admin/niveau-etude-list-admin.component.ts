import {Component, OnInit} from '@angular/core';
import {NiveauEtudeService} from 'src/app/controller/service/referentiel/NiveauEtude.service';
import {NiveauEtudeVo} from 'src/app/controller/model/referentiel/NiveauEtude.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-niveau-etude-list-admin',
  templateUrl: './niveau-etude-list-admin.component.html',
  styleUrls: ['./niveau-etude-list-admin.component.css']
})
export class NiveauEtudeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauEtude';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private niveauEtudeService: NiveauEtudeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadNiveauEtudes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNiveauEtudes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'list');
        isPermistted ? this.niveauEtudeService.findAll().subscribe(niveauEtudes => this.niveauEtudes = niveauEtudes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauEtudeService.findByCriteria(this.searchNiveauEtude).subscribe(niveauEtudes=>{
            
            this.niveauEtudes = niveauEtudes;
           // this.searchNiveauEtude = new NiveauEtudeVo();
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
    
    public async editNiveauEtude(niveauEtude: NiveauEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'edit');
         if(isPermistted){
          this.niveauEtudeService.findByIdWithAssociatedList(niveauEtude).subscribe(res => {
           this.selectedNiveauEtude = res;
           this.selectedNiveauEtude.dateArchivage = DateUtils.convert(this.selectedNiveauEtude.dateArchivage);

            this.editNiveauEtudeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauEtude(niveauEtude: NiveauEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'view');
        if(isPermistted){
           this.niveauEtudeService.findByIdWithAssociatedList(niveauEtude).subscribe(res => {
           this.selectedNiveauEtude = res;
           this.selectedNiveauEtude.dateArchivage = DateUtils.convert(this.selectedNiveauEtude.dateArchivage);
           this.selectedNiveauEtude.dateCreation = new Date(this.selectedNiveauEtude.dateCreation);

            this.viewNiveauEtudeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauEtude(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauEtude = new NiveauEtudeVo();
            this.createNiveauEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauEtude(niveauEtude: NiveauEtudeVo){
       const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau etude) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauEtudeService.delete(niveauEtude).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauEtudes.indexOf(niveauEtude);
                          position > -1 ? this.niveauEtudes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau etude Supprimé',
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


public async duplicateNiveauEtude(niveauEtude: NiveauEtudeVo) {

     this.niveauEtudeService.findByIdWithAssociatedList(niveauEtude).subscribe(
	 res => {
	       this.initDuplicateNiveauEtude(res);
	       this.selectedNiveauEtude = res;
	       this.selectedNiveauEtude.id = null;

            this.selectedNiveauEtude.dateCreation = null;
            this.selectedNiveauEtude.dateArchivage = DateUtils.convert(this.selectedNiveauEtude.dateArchivage);

            this.createNiveauEtudeDialog = true;

});

	}

	initDuplicateNiveauEtude(res: NiveauEtudeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.niveauEtudes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchNiveauEtude.libelle ? this.searchNiveauEtude.libelle : environment.emptyForExport ,
            'Code': this.searchNiveauEtude.code ? this.searchNiveauEtude.code : environment.emptyForExport ,
            'Archive': this.searchNiveauEtude.archive ? (this.searchNiveauEtude.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNiveauEtude.dateArchivageMin ? this.datePipe.transform(this.searchNiveauEtude.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNiveauEtude.dateArchivageMax ? this.datePipe.transform(this.searchNiveauEtude.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNiveauEtude.dateCreationMin ? this.datePipe.transform(this.searchNiveauEtude.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNiveauEtude.dateCreationMax ? this.datePipe.transform(this.searchNiveauEtude.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauEtudes() : Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
    set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }

    get niveauEtudeSelections() : Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudeSelections;
       }
    set niveauEtudeSelections(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudeSelections = value;
       }
   
     


    get selectedNiveauEtude() : NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
    set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
    
    get createNiveauEtudeDialog() :boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;
       }
    set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
       }
    
    get editNiveauEtudeDialog() :boolean {
           return this.niveauEtudeService.editNiveauEtudeDialog;
       }
    set editNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.editNiveauEtudeDialog= value;
       }
    get viewNiveauEtudeDialog() :boolean {
           return this.niveauEtudeService.viewNiveauEtudeDialog;
       }
    set viewNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.viewNiveauEtudeDialog = value;
       }
       
     get searchNiveauEtude() : NiveauEtudeVo {
        return this.niveauEtudeService.searchNiveauEtude;
       }
    set searchNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.searchNiveauEtude = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
