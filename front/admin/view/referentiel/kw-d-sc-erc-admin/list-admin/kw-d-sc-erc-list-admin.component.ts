import {Component, OnInit} from '@angular/core';
import {KeyWordDisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/KeyWordDisciplineScientifiqueErc.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';


import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';

import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';

@Component({
  selector: 'app-key-word-discipline-scientifique-erc-list-admin',
  templateUrl: './kw-d-sc-erc-list-admin.component.html',
  styleUrls: ['./kw-d-sc-erc-list-admin.component.css']
})
export class KeyWordDisciplineScientifiqueErcListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'KeyWordDisciplineScientifiqueErc';
     yesOrNoArchive :any[] =[];
    keyWords :Array<KeyWordVo>;
    disciplineScientifiqueErcs :Array<DisciplineScientifiqueErcVo>;


    constructor(private datePipe: DatePipe, private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private keyWordService: KeyWordService
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
) { }

    ngOnInit() : void {
      this.loadKeyWordDisciplineScientifiqueErcs();
      this.initExport();
      this.initCol();
      this.loadKeyWord();
      this.loadDisciplineScientifiqueErc();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadKeyWordDisciplineScientifiqueErcs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
        isPermistted ? this.keyWordDisciplineScientifiqueErcService.findAll().subscribe(keyWordDisciplineScientifiqueErcs => this.keyWordDisciplineScientifiqueErcs = keyWordDisciplineScientifiqueErcs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.keyWordDisciplineScientifiqueErcService.findByCriteria(this.searchKeyWordDisciplineScientifiqueErc).subscribe(keyWordDisciplineScientifiqueErcs=>{
            
            this.keyWordDisciplineScientifiqueErcs = keyWordDisciplineScientifiqueErcs;
           // this.searchKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'keyWord?.libelleFr', header: 'Key word'},
                        {field: 'disciplineScientifiqueErc?.libelleFr', header: 'Discipline scientifique erc'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc: KeyWordDisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'edit');
         if(isPermistted){
          this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(res => {
           this.selectedKeyWordDisciplineScientifiqueErc = res;
           this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage = DateUtils.convert(this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage);

            this.editKeyWordDisciplineScientifiqueErcDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc: KeyWordDisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'view');
        if(isPermistted){
           this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(res => {
           this.selectedKeyWordDisciplineScientifiqueErc = res;
           this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage = DateUtils.convert(this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage);
           this.selectedKeyWordDisciplineScientifiqueErc.dateCreation = new Date(this.selectedKeyWordDisciplineScientifiqueErc.dateCreation);

            this.viewKeyWordDisciplineScientifiqueErcDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateKeyWordDisciplineScientifiqueErc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();
            this.createKeyWordDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc: KeyWordDisciplineScientifiqueErcVo){
       const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Key word discipline scientifique erc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.keyWordDisciplineScientifiqueErcService.delete(keyWordDisciplineScientifiqueErc).subscribe(status=>{
                          if(status > 0){
                          const position = this.keyWordDisciplineScientifiqueErcs.indexOf(keyWordDisciplineScientifiqueErc);
                          position > -1 ? this.keyWordDisciplineScientifiqueErcs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Key word discipline scientifique erc Supprimé',
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

public async loadKeyWord(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
    isPermistted ? this.keyWordService.findAll().subscribe(keyWords => this.keyWords = keyWords,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifiqueErc(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
    isPermistted ? this.disciplineScientifiqueErcService.findAll().subscribe(disciplineScientifiqueErcs => this.disciplineScientifiqueErcs = disciplineScientifiqueErcs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc: KeyWordDisciplineScientifiqueErcVo) {

     this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(
	 res => {
	       this.initDuplicateKeyWordDisciplineScientifiqueErc(res);
	       this.selectedKeyWordDisciplineScientifiqueErc = res;
	       this.selectedKeyWordDisciplineScientifiqueErc.id = null;

            this.selectedKeyWordDisciplineScientifiqueErc.dateCreation = null;
            this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage = DateUtils.convert(this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage);

            this.createKeyWordDisciplineScientifiqueErcDialog = true;

});

	}

	initDuplicateKeyWordDisciplineScientifiqueErc(res: KeyWordDisciplineScientifiqueErcVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.keyWordDisciplineScientifiqueErcs.map(e => {
    return {
            'Key word': e.keyWordVo?.libelleFr ,
            'Discipline scientifique erc': e.disciplineScientifiqueErcVo?.libelleFr ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
        'Key word': this.searchKeyWordDisciplineScientifiqueErc.keyWordVo?.libelleFr ? this.searchKeyWordDisciplineScientifiqueErc.keyWordVo?.libelleFr : environment.emptyForExport ,
        'Discipline scientifique erc': this.searchKeyWordDisciplineScientifiqueErc.disciplineScientifiqueErcVo?.libelleFr ? this.searchKeyWordDisciplineScientifiqueErc.disciplineScientifiqueErcVo?.libelleFr : environment.emptyForExport ,
            'Archive': this.searchKeyWordDisciplineScientifiqueErc.archive ? (this.searchKeyWordDisciplineScientifiqueErc.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMin ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMax ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchKeyWordDisciplineScientifiqueErc.dateCreationMin ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchKeyWordDisciplineScientifiqueErc.dateCreationMax ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get keyWordDisciplineScientifiqueErcs() : Array<KeyWordDisciplineScientifiqueErcVo> {
           return this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs;
       }
    set keyWordDisciplineScientifiqueErcs(value: Array<KeyWordDisciplineScientifiqueErcVo>) {
        this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs = value;
       }

    get keyWordDisciplineScientifiqueErcSelections() : Array<KeyWordDisciplineScientifiqueErcVo> {
           return this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcSelections;
       }
    set keyWordDisciplineScientifiqueErcSelections(value: Array<KeyWordDisciplineScientifiqueErcVo>) {
        this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcSelections = value;
       }
   
     


    get selectedKeyWordDisciplineScientifiqueErc() : KeyWordDisciplineScientifiqueErcVo {
           return this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc;
       }
    set selectedKeyWordDisciplineScientifiqueErc(value: KeyWordDisciplineScientifiqueErcVo) {
        this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc = value;
       }
    
    get createKeyWordDisciplineScientifiqueErcDialog() :boolean {
           return this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog;
       }
    set createKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog= value;
       }
    
    get editKeyWordDisciplineScientifiqueErcDialog() :boolean {
           return this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog;
       }
    set editKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog= value;
       }
    get viewKeyWordDisciplineScientifiqueErcDialog() :boolean {
           return this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog;
       }
    set viewKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog = value;
       }
       
     get searchKeyWordDisciplineScientifiqueErc() : KeyWordDisciplineScientifiqueErcVo {
        return this.keyWordDisciplineScientifiqueErcService.searchKeyWordDisciplineScientifiqueErc;
       }
    set searchKeyWordDisciplineScientifiqueErc(value: KeyWordDisciplineScientifiqueErcVo) {
        this.keyWordDisciplineScientifiqueErcService.searchKeyWordDisciplineScientifiqueErc = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
