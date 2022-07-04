import {Component, OnInit} from '@angular/core';
import {RoleProjetService} from 'src/app/controller/service/referentiel/RoleProjet.service';
import {RoleProjetVo} from 'src/app/controller/model/referentiel/RoleProjet.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-role-projet-list-admin',
  templateUrl: './role-projet-list-admin.component.html',
  styleUrls: ['./role-projet-list-admin.component.css']
})
export class RoleProjetListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleProjet';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadRoleProjets();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadRoleProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'list');
        isPermistted ? this.roleProjetService.findAll().subscribe(roleProjets => this.roleProjets = roleProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.roleProjetService.findByCriteria(this.searchRoleProjet).subscribe(roleProjets=>{
            
            this.roleProjets = roleProjets;
           // this.searchRoleProjet = new RoleProjetVo();
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
    
    public async editRoleProjet(roleProjet: RoleProjetVo){
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'edit');
         if(isPermistted){
          this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(res => {
           this.selectedRoleProjet = res;
           this.selectedRoleProjet.dateArchivage = DateUtils.convert(this.selectedRoleProjet.dateArchivage);

            this.editRoleProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRoleProjet(roleProjet: RoleProjetVo){
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'view');
        if(isPermistted){
           this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(res => {
           this.selectedRoleProjet = res;
           this.selectedRoleProjet.dateArchivage = DateUtils.convert(this.selectedRoleProjet.dateArchivage);
           this.selectedRoleProjet.dateCreation = new Date(this.selectedRoleProjet.dateCreation);

            this.viewRoleProjetDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRoleProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRoleProjet = new RoleProjetVo();
            this.createRoleProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRoleProjet(roleProjet: RoleProjetVo){
       const isPermistted = await this.roleService.isPermitted('RoleProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Role projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.roleProjetService.delete(roleProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.roleProjets.indexOf(roleProjet);
                          position > -1 ? this.roleProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Role projet Supprimé',
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


public async duplicateRoleProjet(roleProjet: RoleProjetVo) {

     this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(
	 res => {
	       this.initDuplicateRoleProjet(res);
	       this.selectedRoleProjet = res;
	       this.selectedRoleProjet.id = null;

            this.selectedRoleProjet.dateCreation = null;
            this.selectedRoleProjet.dateArchivage = DateUtils.convert(this.selectedRoleProjet.dateArchivage);

            this.createRoleProjetDialog = true;

});

	}

	initDuplicateRoleProjet(res: RoleProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.roleProjets.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchRoleProjet.libelle ? this.searchRoleProjet.libelle : environment.emptyForExport ,
            'Code': this.searchRoleProjet.code ? this.searchRoleProjet.code : environment.emptyForExport ,
            'Description': this.searchRoleProjet.description ? this.searchRoleProjet.description : environment.emptyForExport ,
            'Archive': this.searchRoleProjet.archive ? (this.searchRoleProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchRoleProjet.dateArchivageMin ? this.datePipe.transform(this.searchRoleProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchRoleProjet.dateArchivageMax ? this.datePipe.transform(this.searchRoleProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchRoleProjet.dateCreationMin ? this.datePipe.transform(this.searchRoleProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchRoleProjet.dateCreationMax ? this.datePipe.transform(this.searchRoleProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get roleProjets() : Array<RoleProjetVo> {
           return this.roleProjetService.roleProjets;
       }
    set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

    get roleProjetSelections() : Array<RoleProjetVo> {
           return this.roleProjetService.roleProjetSelections;
       }
    set roleProjetSelections(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjetSelections = value;
       }
   
     


    get selectedRoleProjet() : RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }
    
    get createRoleProjetDialog() :boolean {
           return this.roleProjetService.createRoleProjetDialog;
       }
    set createRoleProjetDialog(value: boolean) {
        this.roleProjetService.createRoleProjetDialog= value;
       }
    
    get editRoleProjetDialog() :boolean {
           return this.roleProjetService.editRoleProjetDialog;
       }
    set editRoleProjetDialog(value: boolean) {
        this.roleProjetService.editRoleProjetDialog= value;
       }
    get viewRoleProjetDialog() :boolean {
           return this.roleProjetService.viewRoleProjetDialog;
       }
    set viewRoleProjetDialog(value: boolean) {
        this.roleProjetService.viewRoleProjetDialog = value;
       }
       
     get searchRoleProjet() : RoleProjetVo {
        return this.roleProjetService.searchRoleProjet;
       }
    set searchRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.searchRoleProjet = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
