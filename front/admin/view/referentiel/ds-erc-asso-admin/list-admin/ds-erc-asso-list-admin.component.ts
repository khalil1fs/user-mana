import {Component, OnInit} from '@angular/core';
import {
    DisciplineScientifiqueErcAssociationService
} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErcAssociation.service';
import {DisciplineScientifiqueErcAssociationVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErcAssociation.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';


import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {SemanticRelationshipService} from 'src/app/controller/service/referentiel/SemanticRelationship.service';

import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {SemanticRelationshipVo} from 'src/app/controller/model/referentiel/SemanticRelationship.model';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-discipline-scientifique-erc-association-list-admin',
  templateUrl: './ds-erc-asso-list-admin.component.html',
  styleUrls: ['./ds-erc-asso-list-admin.component.css']
})
export class DisciplineScientifiqueErcAssociationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueErcAssociation';
     yesOrNoArchive :any[] =[];
    disciplineScientifiqueErcs :Array<DisciplineScientifiqueErcVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    semanticRelationships :Array<SemanticRelationshipVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueErcAssociationService: DisciplineScientifiqueErcAssociationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private semanticRelationshipService: SemanticRelationshipService
) { }

    ngOnInit() : void {
      this.loadDisciplineScientifiqueErcAssociations();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifiqueErc();
      this.loadDisciplineScientifique();
      this.loadSemanticRelationship();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDisciplineScientifiqueErcAssociations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'list');
        isPermistted ? this.disciplineScientifiqueErcAssociationService.findAll().subscribe(disciplineScientifiqueErcAssociations => this.disciplineScientifiqueErcAssociations = disciplineScientifiqueErcAssociations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueErcAssociationService.findByCriteria(this.searchDisciplineScientifiqueErcAssociation).subscribe(disciplineScientifiqueErcAssociations=>{
            
            this.disciplineScientifiqueErcAssociations = disciplineScientifiqueErcAssociations;
           // this.searchDisciplineScientifiqueErcAssociation = new DisciplineScientifiqueErcAssociationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifiqueErc?.libelleFr', header: 'Discipline scientifique erc'},
                        {field: 'disciplineScientifique?.libelleFr', header: 'Discipline scientifique'},
                        {field: 'semanticRelationship?.libelle', header: 'Semantic relationship'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editDisciplineScientifiqueErcAssociation(disciplineScientifiqueErcAssociation: DisciplineScientifiqueErcAssociationVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueErcAssociationService.findByIdWithAssociatedList(disciplineScientifiqueErcAssociation).subscribe(res => {
           this.selectedDisciplineScientifiqueErcAssociation = res;
           this.selectedDisciplineScientifiqueErcAssociation.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifiqueErcAssociation.dateArchivage);

            this.editDisciplineScientifiqueErcAssociationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueErcAssociation(disciplineScientifiqueErcAssociation: DisciplineScientifiqueErcAssociationVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'view');
        if(isPermistted){
           this.disciplineScientifiqueErcAssociationService.findByIdWithAssociatedList(disciplineScientifiqueErcAssociation).subscribe(res => {
           this.selectedDisciplineScientifiqueErcAssociation = res;
           this.selectedDisciplineScientifiqueErcAssociation.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifiqueErcAssociation.dateArchivage);
           this.selectedDisciplineScientifiqueErcAssociation.dateCreation = new Date(this.selectedDisciplineScientifiqueErcAssociation.dateCreation);

            this.viewDisciplineScientifiqueErcAssociationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueErcAssociation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueErcAssociation = new DisciplineScientifiqueErcAssociationVo();
            this.createDisciplineScientifiqueErcAssociationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueErcAssociation(disciplineScientifiqueErcAssociation: DisciplineScientifiqueErcAssociationVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique erc association) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueErcAssociationService.delete(disciplineScientifiqueErcAssociation).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueErcAssociations.indexOf(disciplineScientifiqueErcAssociation);
                          position > -1 ? this.disciplineScientifiqueErcAssociations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique erc association Supprimé',
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

public async loadDisciplineScientifiqueErc(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'list');
    isPermistted ? this.disciplineScientifiqueErcService.findAll().subscribe(disciplineScientifiqueErcs => this.disciplineScientifiqueErcs = disciplineScientifiqueErcs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSemanticRelationship(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcAssociation', 'list');
    isPermistted ? this.semanticRelationshipService.findAll().subscribe(semanticRelationships => this.semanticRelationships = semanticRelationships,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueErcAssociation(disciplineScientifiqueErcAssociation: DisciplineScientifiqueErcAssociationVo) {

     this.disciplineScientifiqueErcAssociationService.findByIdWithAssociatedList(disciplineScientifiqueErcAssociation).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueErcAssociation(res);
	       this.selectedDisciplineScientifiqueErcAssociation = res;
	       this.selectedDisciplineScientifiqueErcAssociation.id = null;

            this.selectedDisciplineScientifiqueErcAssociation.dateCreation = null;
            this.selectedDisciplineScientifiqueErcAssociation.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifiqueErcAssociation.dateArchivage);

            this.createDisciplineScientifiqueErcAssociationDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueErcAssociation(res: DisciplineScientifiqueErcAssociationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.disciplineScientifiqueErcAssociations.map(e => {
    return {
            'Discipline scientifique erc': e.disciplineScientifiqueErcVo?.libelleFr ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleFr ,
            'Semantic relationship': e.semanticRelationshipVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
        'Discipline scientifique erc': this.searchDisciplineScientifiqueErcAssociation.disciplineScientifiqueErcVo?.libelleFr ? this.searchDisciplineScientifiqueErcAssociation.disciplineScientifiqueErcVo?.libelleFr : environment.emptyForExport ,
        'Discipline scientifique': this.searchDisciplineScientifiqueErcAssociation.disciplineScientifiqueVo?.libelleFr ? this.searchDisciplineScientifiqueErcAssociation.disciplineScientifiqueVo?.libelleFr : environment.emptyForExport ,
        'Semantic relationship': this.searchDisciplineScientifiqueErcAssociation.semanticRelationshipVo?.libelle ? this.searchDisciplineScientifiqueErcAssociation.semanticRelationshipVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchDisciplineScientifiqueErcAssociation.archive ? (this.searchDisciplineScientifiqueErcAssociation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDisciplineScientifiqueErcAssociation.dateArchivageMin ? this.datePipe.transform(this.searchDisciplineScientifiqueErcAssociation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDisciplineScientifiqueErcAssociation.dateArchivageMax ? this.datePipe.transform(this.searchDisciplineScientifiqueErcAssociation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDisciplineScientifiqueErcAssociation.dateCreationMin ? this.datePipe.transform(this.searchDisciplineScientifiqueErcAssociation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDisciplineScientifiqueErcAssociation.dateCreationMax ? this.datePipe.transform(this.searchDisciplineScientifiqueErcAssociation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueErcAssociations() : Array<DisciplineScientifiqueErcAssociationVo> {
           return this.disciplineScientifiqueErcAssociationService.disciplineScientifiqueErcAssociations;
       }
    set disciplineScientifiqueErcAssociations(value: Array<DisciplineScientifiqueErcAssociationVo>) {
        this.disciplineScientifiqueErcAssociationService.disciplineScientifiqueErcAssociations = value;
       }

    get disciplineScientifiqueErcAssociationSelections() : Array<DisciplineScientifiqueErcAssociationVo> {
           return this.disciplineScientifiqueErcAssociationService.disciplineScientifiqueErcAssociationSelections;
       }
    set disciplineScientifiqueErcAssociationSelections(value: Array<DisciplineScientifiqueErcAssociationVo>) {
        this.disciplineScientifiqueErcAssociationService.disciplineScientifiqueErcAssociationSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueErcAssociation() : DisciplineScientifiqueErcAssociationVo {
           return this.disciplineScientifiqueErcAssociationService.selectedDisciplineScientifiqueErcAssociation;
       }
    set selectedDisciplineScientifiqueErcAssociation(value: DisciplineScientifiqueErcAssociationVo) {
        this.disciplineScientifiqueErcAssociationService.selectedDisciplineScientifiqueErcAssociation = value;
       }
    
    get createDisciplineScientifiqueErcAssociationDialog() :boolean {
           return this.disciplineScientifiqueErcAssociationService.createDisciplineScientifiqueErcAssociationDialog;
       }
    set createDisciplineScientifiqueErcAssociationDialog(value: boolean) {
        this.disciplineScientifiqueErcAssociationService.createDisciplineScientifiqueErcAssociationDialog= value;
       }
    
    get editDisciplineScientifiqueErcAssociationDialog() :boolean {
           return this.disciplineScientifiqueErcAssociationService.editDisciplineScientifiqueErcAssociationDialog;
       }
    set editDisciplineScientifiqueErcAssociationDialog(value: boolean) {
        this.disciplineScientifiqueErcAssociationService.editDisciplineScientifiqueErcAssociationDialog= value;
       }
    get viewDisciplineScientifiqueErcAssociationDialog() :boolean {
           return this.disciplineScientifiqueErcAssociationService.viewDisciplineScientifiqueErcAssociationDialog;
       }
    set viewDisciplineScientifiqueErcAssociationDialog(value: boolean) {
        this.disciplineScientifiqueErcAssociationService.viewDisciplineScientifiqueErcAssociationDialog = value;
       }
       
     get searchDisciplineScientifiqueErcAssociation() : DisciplineScientifiqueErcAssociationVo {
        return this.disciplineScientifiqueErcAssociationService.searchDisciplineScientifiqueErcAssociation;
       }
    set searchDisciplineScientifiqueErcAssociation(value: DisciplineScientifiqueErcAssociationVo) {
        this.disciplineScientifiqueErcAssociationService.searchDisciplineScientifiqueErcAssociation = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
