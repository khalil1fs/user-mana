import {Component, OnInit} from '@angular/core';
import {MasterService} from 'src/app/controller/service/referentiel/Master.service';
import {MasterVo} from 'src/app/controller/model/referentiel/Master.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-master-list-admin',
  templateUrl: './master-list-admin.component.html',
  styleUrls: ['./master-list-admin.component.css']
})
export class MasterListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Master';
     yesOrNoInternational :any[] =[];
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private masterService: MasterService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadMasters();
      this.initExport();
      this.initCol();
    this.yesOrNoInternational =  [{label: 'International', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadMasters(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Master', 'list');
        isPermistted ? this.masterService.findAll().subscribe(masters => this.masters = masters,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.masterService.findByCriteria(this.searchMaster).subscribe(masters=>{
            
            this.masters = masters;
           // this.searchMaster = new MasterVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'intitule', header: 'Intitule'},
                            {field: 'code', header: 'Code'},
                            {field: 'international', header: 'International'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editMaster(master: MasterVo){
        const isPermistted = await this.roleService.isPermitted('Master', 'edit');
         if(isPermistted){
          this.masterService.findByIdWithAssociatedList(master).subscribe(res => {
           this.selectedMaster = res;
           this.selectedMaster.dateArchivage = DateUtils.convert(this.selectedMaster.dateArchivage);

            this.editMasterDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewMaster(master: MasterVo){
        const isPermistted = await this.roleService.isPermitted('Master', 'view');
        if(isPermistted){
           this.masterService.findByIdWithAssociatedList(master).subscribe(res => {
           this.selectedMaster = res;
           this.selectedMaster.dateArchivage = DateUtils.convert(this.selectedMaster.dateArchivage);
           this.selectedMaster.dateCreation = new Date(this.selectedMaster.dateCreation);

            this.viewMasterDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateMaster(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedMaster = new MasterVo();
            this.createMasterDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteMaster(master: MasterVo){
       const isPermistted = await this.roleService.isPermitted('Master', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Master) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.masterService.delete(master).subscribe(status=>{
                          if(status > 0){
                          const position = this.masters.indexOf(master);
                          position > -1 ? this.masters.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Master Supprimé',
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


public async duplicateMaster(master: MasterVo) {

     this.masterService.findByIdWithAssociatedList(master).subscribe(
	 res => {
	       this.initDuplicateMaster(res);
	       this.selectedMaster = res;
	       this.selectedMaster.id = null;

            this.selectedMaster.dateCreation = null;
            this.selectedMaster.dateArchivage = DateUtils.convert(this.selectedMaster.dateArchivage);

            this.createMasterDialog = true;

});

	}

	initDuplicateMaster(res: MasterVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.masters.map(e => {
    return {
                    'Intitule': e.intitule ,
                    'Code': e.code ,
                    'International': e.international? 'Vrai' : 'Faux' ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Intitule': this.searchMaster.intitule ? this.searchMaster.intitule : environment.emptyForExport ,
            'Code': this.searchMaster.code ? this.searchMaster.code : environment.emptyForExport ,
            'International': this.searchMaster.international ? (this.searchMaster.international ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Archive': this.searchMaster.archive ? (this.searchMaster.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchMaster.dateArchivageMin ? this.datePipe.transform(this.searchMaster.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchMaster.dateArchivageMax ? this.datePipe.transform(this.searchMaster.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchMaster.dateCreationMin ? this.datePipe.transform(this.searchMaster.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchMaster.dateCreationMax ? this.datePipe.transform(this.searchMaster.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get masters() : Array<MasterVo> {
           return this.masterService.masters;
       }
    set masters(value: Array<MasterVo>) {
        this.masterService.masters = value;
       }

    get masterSelections() : Array<MasterVo> {
           return this.masterService.masterSelections;
       }
    set masterSelections(value: Array<MasterVo>) {
        this.masterService.masterSelections = value;
       }
   
     


    get selectedMaster() : MasterVo {
           return this.masterService.selectedMaster;
       }
    set selectedMaster(value: MasterVo) {
        this.masterService.selectedMaster = value;
       }
    
    get createMasterDialog() :boolean {
           return this.masterService.createMasterDialog;
       }
    set createMasterDialog(value: boolean) {
        this.masterService.createMasterDialog= value;
       }
    
    get editMasterDialog() :boolean {
           return this.masterService.editMasterDialog;
       }
    set editMasterDialog(value: boolean) {
        this.masterService.editMasterDialog= value;
       }
    get viewMasterDialog() :boolean {
           return this.masterService.viewMasterDialog;
       }
    set viewMasterDialog(value: boolean) {
        this.masterService.viewMasterDialog = value;
       }
       
     get searchMaster() : MasterVo {
        return this.masterService.searchMaster;
       }
    set searchMaster(value: MasterVo) {
        this.masterService.searchMaster = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
