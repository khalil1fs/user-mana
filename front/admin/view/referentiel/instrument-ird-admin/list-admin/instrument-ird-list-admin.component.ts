import {Component, OnInit} from '@angular/core';
import {InstrumentIrdService} from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import {InstrumentIrdVo} from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';

import {TypeInstrumentIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentIrd.service';

import {TypeInstrumentIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentIrd.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';

import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-instrument-ird-list-admin',
  templateUrl: './instrument-ird-list-admin.component.html',
  styleUrls: ['./instrument-ird-list-admin.component.css']
})
export class InstrumentIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InstrumentIrd';
     yesOrNoArchive :any[] =[];
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;


    constructor(private datePipe: DatePipe, private instrumentIrdService: InstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private typeInstrumentIrdService: TypeInstrumentIrdService
) { }

    ngOnInit() : void {
      this.loadInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadTypeInstrumentIrd();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'list');
        isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.instrumentIrdService.findByCriteria(this.searchInstrumentIrd).subscribe(instrumentIrds=>{
            
            this.instrumentIrds = instrumentIrds;
           // this.searchInstrumentIrd = new InstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editInstrumentIrd(instrumentIrd: InstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'edit');
         if(isPermistted){
          this.instrumentIrdService.findByIdWithAssociatedList(instrumentIrd).subscribe(res => {
           this.selectedInstrumentIrd = res;
           this.selectedInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedInstrumentIrd.dateArchivage);

            this.editInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstrumentIrd(instrumentIrd: InstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'view');
        if(isPermistted){
           this.instrumentIrdService.findByIdWithAssociatedList(instrumentIrd).subscribe(res => {
           this.selectedInstrumentIrd = res;
           this.selectedInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedInstrumentIrd.dateArchivage);
           this.selectedInstrumentIrd.dateCreation = new Date(this.selectedInstrumentIrd.dateCreation);

            this.viewInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
            this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstrumentIrd(instrumentIrd: InstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.instrumentIrdService.delete(instrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.instrumentIrds.indexOf(instrumentIrd);
                          position > -1 ? this.instrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Instrument ird Supprimé',
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

public async loadTypeInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInstrumentIrd(instrumentIrd: InstrumentIrdVo) {

     this.instrumentIrdService.findByIdWithAssociatedList(instrumentIrd).subscribe(
	 res => {
	       this.initDuplicateInstrumentIrd(res);
	       this.selectedInstrumentIrd = res;
	       this.selectedInstrumentIrd.id = null;

            this.selectedInstrumentIrd.dateCreation = null;
            this.selectedInstrumentIrd.dateArchivage = DateUtils.convert(this.selectedInstrumentIrd.dateArchivage);

            this.createInstrumentIrdDialog = true;

});

	}

	initDuplicateInstrumentIrd(res: InstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.instrumentIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchInstrumentIrd.libelle ? this.searchInstrumentIrd.libelle : environment.emptyForExport ,
            'Code': this.searchInstrumentIrd.code ? this.searchInstrumentIrd.code : environment.emptyForExport ,
        'Type instrument ird': this.searchInstrumentIrd.typeInstrumentIrdVo?.libelle ? this.searchInstrumentIrd.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchInstrumentIrd.archive ? (this.searchInstrumentIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchInstrumentIrd.dateArchivageMin ? this.datePipe.transform(this.searchInstrumentIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchInstrumentIrd.dateArchivageMax ? this.datePipe.transform(this.searchInstrumentIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchInstrumentIrd.dateCreationMin ? this.datePipe.transform(this.searchInstrumentIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchInstrumentIrd.dateCreationMax ? this.datePipe.transform(this.searchInstrumentIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get instrumentIrds() : Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
    set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }

    get instrumentIrdSelections() : Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrdSelections;
       }
    set instrumentIrdSelections(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrdSelections = value;
       }
   
     


    get selectedInstrumentIrd() : InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
    
    get createInstrumentIrdDialog() :boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
    set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }
    
    get editInstrumentIrdDialog() :boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
    set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
       }
    get viewInstrumentIrdDialog() :boolean {
           return this.instrumentIrdService.viewInstrumentIrdDialog;
       }
    set viewInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.viewInstrumentIrdDialog = value;
       }
       
     get searchInstrumentIrd() : InstrumentIrdVo {
        return this.instrumentIrdService.searchInstrumentIrd;
       }
    set searchInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.searchInstrumentIrd = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
