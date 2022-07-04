import {Component, OnInit} from '@angular/core';
import {NiveauFormationService} from 'src/app/controller/service/referentiel/NiveauFormation.service';
import {NiveauFormationVo} from 'src/app/controller/model/referentiel/NiveauFormation.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-niveau-formation-list-admin',
  templateUrl: './niveau-formation-list-admin.component.html',
  styleUrls: ['./niveau-formation-list-admin.component.css']
})
export class NiveauFormationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauFormation';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private niveauFormationService: NiveauFormationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadNiveauFormations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNiveauFormations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauFormation', 'list');
        isPermistted ? this.niveauFormationService.findAll().subscribe(niveauFormations => this.niveauFormations = niveauFormations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauFormationService.findByCriteria(this.searchNiveauFormation).subscribe(niveauFormations=>{
            
            this.niveauFormations = niveauFormations;
           // this.searchNiveauFormation = new NiveauFormationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelleMicro', header: 'Libelle micro'},
                            {field: 'libelleMacro', header: 'Libelle macro'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editNiveauFormation(niveauFormation: NiveauFormationVo){
        const isPermistted = await this.roleService.isPermitted('NiveauFormation', 'edit');
         if(isPermistted){
          this.niveauFormationService.findByIdWithAssociatedList(niveauFormation).subscribe(res => {
           this.selectedNiveauFormation = res;
           this.selectedNiveauFormation.dateArchivage = DateUtils.convert(this.selectedNiveauFormation.dateArchivage);

            this.editNiveauFormationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauFormation(niveauFormation: NiveauFormationVo){
        const isPermistted = await this.roleService.isPermitted('NiveauFormation', 'view');
        if(isPermistted){
           this.niveauFormationService.findByIdWithAssociatedList(niveauFormation).subscribe(res => {
           this.selectedNiveauFormation = res;
           this.selectedNiveauFormation.dateArchivage = DateUtils.convert(this.selectedNiveauFormation.dateArchivage);
           this.selectedNiveauFormation.dateCreation = new Date(this.selectedNiveauFormation.dateCreation);

            this.viewNiveauFormationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauFormation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauFormation = new NiveauFormationVo();
            this.createNiveauFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauFormation(niveauFormation: NiveauFormationVo){
       const isPermistted = await this.roleService.isPermitted('NiveauFormation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau formation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauFormationService.delete(niveauFormation).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauFormations.indexOf(niveauFormation);
                          position > -1 ? this.niveauFormations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau formation Supprimé',
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


public async duplicateNiveauFormation(niveauFormation: NiveauFormationVo) {

     this.niveauFormationService.findByIdWithAssociatedList(niveauFormation).subscribe(
	 res => {
	       this.initDuplicateNiveauFormation(res);
	       this.selectedNiveauFormation = res;
	       this.selectedNiveauFormation.id = null;

            this.selectedNiveauFormation.dateCreation = null;
            this.selectedNiveauFormation.dateArchivage = DateUtils.convert(this.selectedNiveauFormation.dateArchivage);

            this.createNiveauFormationDialog = true;

});

	}

	initDuplicateNiveauFormation(res: NiveauFormationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.niveauFormations.map(e => {
    return {
                    'Libelle micro': e.libelleMicro ,
                    'Libelle macro': e.libelleMacro ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle micro': this.searchNiveauFormation.libelleMicro ? this.searchNiveauFormation.libelleMicro : environment.emptyForExport ,
            'Libelle macro': this.searchNiveauFormation.libelleMacro ? this.searchNiveauFormation.libelleMacro : environment.emptyForExport ,
            'Code': this.searchNiveauFormation.code ? this.searchNiveauFormation.code : environment.emptyForExport ,
            'Archive': this.searchNiveauFormation.archive ? (this.searchNiveauFormation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNiveauFormation.dateArchivageMin ? this.datePipe.transform(this.searchNiveauFormation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNiveauFormation.dateArchivageMax ? this.datePipe.transform(this.searchNiveauFormation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNiveauFormation.dateCreationMin ? this.datePipe.transform(this.searchNiveauFormation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNiveauFormation.dateCreationMax ? this.datePipe.transform(this.searchNiveauFormation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauFormations() : Array<NiveauFormationVo> {
           return this.niveauFormationService.niveauFormations;
       }
    set niveauFormations(value: Array<NiveauFormationVo>) {
        this.niveauFormationService.niveauFormations = value;
       }

    get niveauFormationSelections() : Array<NiveauFormationVo> {
           return this.niveauFormationService.niveauFormationSelections;
       }
    set niveauFormationSelections(value: Array<NiveauFormationVo>) {
        this.niveauFormationService.niveauFormationSelections = value;
       }
   
     


    get selectedNiveauFormation() : NiveauFormationVo {
           return this.niveauFormationService.selectedNiveauFormation;
       }
    set selectedNiveauFormation(value: NiveauFormationVo) {
        this.niveauFormationService.selectedNiveauFormation = value;
       }
    
    get createNiveauFormationDialog() :boolean {
           return this.niveauFormationService.createNiveauFormationDialog;
       }
    set createNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.createNiveauFormationDialog= value;
       }
    
    get editNiveauFormationDialog() :boolean {
           return this.niveauFormationService.editNiveauFormationDialog;
       }
    set editNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.editNiveauFormationDialog= value;
       }
    get viewNiveauFormationDialog() :boolean {
           return this.niveauFormationService.viewNiveauFormationDialog;
       }
    set viewNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.viewNiveauFormationDialog = value;
       }
       
     get searchNiveauFormation() : NiveauFormationVo {
        return this.niveauFormationService.searchNiveauFormation;
       }
    set searchNiveauFormation(value: NiveauFormationVo) {
        this.niveauFormationService.searchNiveauFormation = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
