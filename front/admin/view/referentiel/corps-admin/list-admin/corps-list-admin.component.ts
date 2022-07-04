import {Component, OnInit} from '@angular/core';
import {CorpsService} from 'src/app/controller/service/referentiel/Corps.service';
import {CorpsVo} from 'src/app/controller/model/referentiel/Corps.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';


import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-corps-list-admin',
  templateUrl: './corps-list-admin.component.html',
  styleUrls: ['./corps-list-admin.component.css']
})
export class CorpsListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Corps';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private corpsService: CorpsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadCorpss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCorpss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Corps', 'list');
        isPermistted ? this.corpsService.findAll().subscribe(corpss => this.corpss = corpss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.corpsService.findByCriteria(this.searchCorps).subscribe(corpss=>{
            
            this.corpss = corpss;
           // this.searchCorps = new CorpsVo();
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
    
    public async editCorps(corps: CorpsVo){
        const isPermistted = await this.roleService.isPermitted('Corps', 'edit');
         if(isPermistted){
          this.corpsService.findByIdWithAssociatedList(corps).subscribe(res => {
           this.selectedCorps = res;
           this.selectedCorps.dateArchivage = DateUtils.convert(this.selectedCorps.dateArchivage);

            this.editCorpsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCorps(corps: CorpsVo){
        const isPermistted = await this.roleService.isPermitted('Corps', 'view');
        if(isPermistted){
           this.corpsService.findByIdWithAssociatedList(corps).subscribe(res => {
           this.selectedCorps = res;
           this.selectedCorps.dateArchivage = DateUtils.convert(this.selectedCorps.dateArchivage);
           this.selectedCorps.dateCreation = new Date(this.selectedCorps.dateCreation);

            this.viewCorpsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCorps(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCorps = new CorpsVo();
            this.createCorpsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCorps(corps: CorpsVo){
       const isPermistted = await this.roleService.isPermitted('Corps', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Corps) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.corpsService.delete(corps).subscribe(status=>{
                          if(status > 0){
                          const position = this.corpss.indexOf(corps);
                          position > -1 ? this.corpss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Corps Supprimé',
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


public async duplicateCorps(corps: CorpsVo) {

     this.corpsService.findByIdWithAssociatedList(corps).subscribe(
	 res => {
	       this.initDuplicateCorps(res);
	       this.selectedCorps = res;
	       this.selectedCorps.id = null;

            this.selectedCorps.dateCreation = null;
            this.selectedCorps.dateArchivage = DateUtils.convert(this.selectedCorps.dateArchivage);

            this.createCorpsDialog = true;

});

	}

	initDuplicateCorps(res: CorpsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.corpss.map(e => {
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
            'Libelle': this.searchCorps.libelle ? this.searchCorps.libelle : environment.emptyForExport ,
            'Code': this.searchCorps.code ? this.searchCorps.code : environment.emptyForExport ,
            'Description': this.searchCorps.description ? this.searchCorps.description : environment.emptyForExport ,
            'Id graph': this.searchCorps.idGraph ? this.searchCorps.idGraph : environment.emptyForExport ,
            'Archive': this.searchCorps.archive ? (this.searchCorps.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCorps.dateArchivageMin ? this.datePipe.transform(this.searchCorps.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCorps.dateArchivageMax ? this.datePipe.transform(this.searchCorps.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCorps.dateCreationMin ? this.datePipe.transform(this.searchCorps.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCorps.dateCreationMax ? this.datePipe.transform(this.searchCorps.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get corpss() : Array<CorpsVo> {
           return this.corpsService.corpss;
       }
    set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }

    get corpsSelections() : Array<CorpsVo> {
           return this.corpsService.corpsSelections;
       }
    set corpsSelections(value: Array<CorpsVo>) {
        this.corpsService.corpsSelections = value;
       }
   
     


    get selectedCorps() : CorpsVo {
           return this.corpsService.selectedCorps;
       }
    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
    
    get createCorpsDialog() :boolean {
           return this.corpsService.createCorpsDialog;
       }
    set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog= value;
       }
    
    get editCorpsDialog() :boolean {
           return this.corpsService.editCorpsDialog;
       }
    set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog= value;
       }
    get viewCorpsDialog() :boolean {
           return this.corpsService.viewCorpsDialog;
       }
    set viewCorpsDialog(value: boolean) {
        this.corpsService.viewCorpsDialog = value;
       }
       
     get searchCorps() : CorpsVo {
        return this.corpsService.searchCorps;
       }
    set searchCorps(value: CorpsVo) {
        this.corpsService.searchCorps = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
