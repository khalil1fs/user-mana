import {Component, OnInit} from '@angular/core';
import {StatutEcoleDoctoraleService} from 'src/app/controller/service/formulaire/StatutEcoleDoctorale.service';
import {StatutEcoleDoctoraleVo} from 'src/app/controller/model/referentiel/StatutEcoleDoctorale.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-statut-ecole-doctorale-list-admin',
  templateUrl: './statut-ecole-doctorale-list-admin.component.html',
  styleUrls: ['./statut-ecole-doctorale-list-admin.component.css']
})
export class StatutEcoleDoctoraleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatutEcoleDoctorale';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private statutEcoleDoctoraleService: StatutEcoleDoctoraleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadStatutEcoleDoctorales();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadStatutEcoleDoctorales(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatutEcoleDoctorale', 'list');
        isPermistted ? this.statutEcoleDoctoraleService.findAll().subscribe(statutEcoleDoctorales => this.statutEcoleDoctorales = statutEcoleDoctorales,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statutEcoleDoctoraleService.findByCriteria(this.searchStatutEcoleDoctorale).subscribe(statutEcoleDoctorales=>{
            
            this.statutEcoleDoctorales = statutEcoleDoctorales;
           // this.searchStatutEcoleDoctorale = new StatutEcoleDoctoraleVo();
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
    
    public async editStatutEcoleDoctorale(statutEcoleDoctorale: StatutEcoleDoctoraleVo){
        const isPermistted = await this.roleService.isPermitted('StatutEcoleDoctorale', 'edit');
         if(isPermistted){
          this.statutEcoleDoctoraleService.findByIdWithAssociatedList(statutEcoleDoctorale).subscribe(res => {
           this.selectedStatutEcoleDoctorale = res;
           this.selectedStatutEcoleDoctorale.dateArchivage = DateUtils.convert(this.selectedStatutEcoleDoctorale.dateArchivage);

            this.editStatutEcoleDoctoraleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatutEcoleDoctorale(statutEcoleDoctorale: StatutEcoleDoctoraleVo){
        const isPermistted = await this.roleService.isPermitted('StatutEcoleDoctorale', 'view');
        if(isPermistted){
           this.statutEcoleDoctoraleService.findByIdWithAssociatedList(statutEcoleDoctorale).subscribe(res => {
           this.selectedStatutEcoleDoctorale = res;
           this.selectedStatutEcoleDoctorale.dateArchivage = DateUtils.convert(this.selectedStatutEcoleDoctorale.dateArchivage);
           this.selectedStatutEcoleDoctorale.dateCreation = new Date(this.selectedStatutEcoleDoctorale.dateCreation);

            this.viewStatutEcoleDoctoraleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatutEcoleDoctorale(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatutEcoleDoctorale = new StatutEcoleDoctoraleVo();
            this.createStatutEcoleDoctoraleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatutEcoleDoctorale(statutEcoleDoctorale: StatutEcoleDoctoraleVo){
       const isPermistted = await this.roleService.isPermitted('StatutEcoleDoctorale', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Statut ecole doctorale) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statutEcoleDoctoraleService.delete(statutEcoleDoctorale).subscribe(status=>{
                          if(status > 0){
                          const position = this.statutEcoleDoctorales.indexOf(statutEcoleDoctorale);
                          position > -1 ? this.statutEcoleDoctorales.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Statut ecole doctorale Supprimé',
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


public async duplicateStatutEcoleDoctorale(statutEcoleDoctorale: StatutEcoleDoctoraleVo) {

     this.statutEcoleDoctoraleService.findByIdWithAssociatedList(statutEcoleDoctorale).subscribe(
	 res => {
	       this.initDuplicateStatutEcoleDoctorale(res);
	       this.selectedStatutEcoleDoctorale = res;
	       this.selectedStatutEcoleDoctorale.id = null;

            this.selectedStatutEcoleDoctorale.dateCreation = null;
            this.selectedStatutEcoleDoctorale.dateArchivage = DateUtils.convert(this.selectedStatutEcoleDoctorale.dateArchivage);

            this.createStatutEcoleDoctoraleDialog = true;

});

	}

	initDuplicateStatutEcoleDoctorale(res: StatutEcoleDoctoraleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.statutEcoleDoctorales.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchStatutEcoleDoctorale.libelle ? this.searchStatutEcoleDoctorale.libelle : environment.emptyForExport ,
            'Code': this.searchStatutEcoleDoctorale.code ? this.searchStatutEcoleDoctorale.code : environment.emptyForExport ,
            'Archive': this.searchStatutEcoleDoctorale.archive ? (this.searchStatutEcoleDoctorale.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchStatutEcoleDoctorale.dateArchivageMin ? this.datePipe.transform(this.searchStatutEcoleDoctorale.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchStatutEcoleDoctorale.dateArchivageMax ? this.datePipe.transform(this.searchStatutEcoleDoctorale.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchStatutEcoleDoctorale.dateCreationMin ? this.datePipe.transform(this.searchStatutEcoleDoctorale.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchStatutEcoleDoctorale.dateCreationMax ? this.datePipe.transform(this.searchStatutEcoleDoctorale.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statutEcoleDoctorales() : Array<StatutEcoleDoctoraleVo> {
           return this.statutEcoleDoctoraleService.statutEcoleDoctorales;
       }
    set statutEcoleDoctorales(value: Array<StatutEcoleDoctoraleVo>) {
        this.statutEcoleDoctoraleService.statutEcoleDoctorales = value;
       }

    get statutEcoleDoctoraleSelections() : Array<StatutEcoleDoctoraleVo> {
           return this.statutEcoleDoctoraleService.statutEcoleDoctoraleSelections;
       }
    set statutEcoleDoctoraleSelections(value: Array<StatutEcoleDoctoraleVo>) {
        this.statutEcoleDoctoraleService.statutEcoleDoctoraleSelections = value;
       }
   
     


    get selectedStatutEcoleDoctorale() : StatutEcoleDoctoraleVo {
           return this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale;
       }
    set selectedStatutEcoleDoctorale(value: StatutEcoleDoctoraleVo) {
        this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale = value;
       }
    
    get createStatutEcoleDoctoraleDialog() :boolean {
           return this.statutEcoleDoctoraleService.createStatutEcoleDoctoraleDialog;
       }
    set createStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.createStatutEcoleDoctoraleDialog= value;
       }
    
    get editStatutEcoleDoctoraleDialog() :boolean {
           return this.statutEcoleDoctoraleService.editStatutEcoleDoctoraleDialog;
       }
    set editStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.editStatutEcoleDoctoraleDialog= value;
       }
    get viewStatutEcoleDoctoraleDialog() :boolean {
           return this.statutEcoleDoctoraleService.viewStatutEcoleDoctoraleDialog;
       }
    set viewStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.viewStatutEcoleDoctoraleDialog = value;
       }
       
     get searchStatutEcoleDoctorale() : StatutEcoleDoctoraleVo {
        return this.statutEcoleDoctoraleService.searchStatutEcoleDoctorale;
       }
    set searchStatutEcoleDoctorale(value: StatutEcoleDoctoraleVo) {
        this.statutEcoleDoctoraleService.searchStatutEcoleDoctorale = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
