import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {DateUtils} from 'src/app/utils/DateUtils';
import {DatePipe} from '@angular/common';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {ExportService} from 'src/app/controller/service/formulaire/Export.service';

@Component({
  selector: 'app-discipline-scientifique-list-admin',
  templateUrl: './discipline-scientifique-list-admin.component.html',
  styleUrls: ['./discipline-scientifique-list-admin.component.css']
})
export class DisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifique';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private disciplineScientifiqueService: DisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadDisciplineScientifiques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'list');
        isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueService.findByCriteria(this.searchDisciplineScientifique).subscribe(disciplineScientifiques=>{
            
            this.disciplineScientifiques = disciplineScientifiques;
           // this.searchDisciplineScientifique = new DisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'libelleFr', header: 'Libelle fr'},
                            {field: 'libelleEng', header: 'Libelle eng'},
                            {field: 'code', header: 'Code'},
                            {field: 'niveau', header: 'Niveau'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editDisciplineScientifique(disciplineScientifique: DisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueService.findByIdWithAssociatedList(disciplineScientifique).subscribe(res => {
           this.selectedDisciplineScientifique = res;
           this.selectedDisciplineScientifique.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifique.dateArchivage);

            this.editDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifique(disciplineScientifique: DisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'view');
        if(isPermistted){
           this.disciplineScientifiqueService.findByIdWithAssociatedList(disciplineScientifique).subscribe(res => {
           this.selectedDisciplineScientifique = res;
           this.selectedDisciplineScientifique.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifique.dateArchivage);
           this.selectedDisciplineScientifique.dateCreation = new Date(this.selectedDisciplineScientifique.dateCreation);

            this.viewDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
            this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifique(disciplineScientifique: DisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueService.delete(disciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiques.indexOf(disciplineScientifique);
                          position > -1 ? this.disciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique Supprimé',
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


public async duplicateDisciplineScientifique(disciplineScientifique: DisciplineScientifiqueVo) {

     this.disciplineScientifiqueService.findByIdWithAssociatedList(disciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifique(res);
	       this.selectedDisciplineScientifique = res;
	       this.selectedDisciplineScientifique.id = null;

            this.selectedDisciplineScientifique.dateCreation = null;
            this.selectedDisciplineScientifique.dateArchivage = DateUtils.convert(this.selectedDisciplineScientifique.dateArchivage);

            this.createDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateDisciplineScientifique(res: DisciplineScientifiqueVo) {
        if (res.disciplineScientifiqueErcAssociationsVo != null) {
             res.disciplineScientifiqueErcAssociationsVo.forEach(d => { d.disciplineScientifiqueVo = null; d.id = null; });
                }


	}

  //   async initExport()  {
  //         await this.disciplineScientifiqueService.findAssociated(this.disciplineScientifiques).subscribe(
  //             data => {
  //                 this.disciplineScientifiques = data
  //             },error => console.log(error)
  //         )
  //   this.excelPdfButons = [
  //     {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
  //     {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
  //     {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
  //  ];
  // }


     initExport() {
        console.log('hani f init');
          this.disciplineScientifiqueService.findAssociated(this.disciplineScientifiques).subscribe(
             data => {
                 this.disciplineScientifiques = data
                 this.disciplineScientifiques.forEach(e=>console.log('key:  '+e.keyWordAssosiation));
             }, error => console.log(error)
         )
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }




   async prepareColumnExport() {
        this.exportData = this.disciplineScientifiques.map(e => {
            return {
                    'Libelle': e.libelle ,
                    'Libelle fr': e.libelleFr ,
                    'Libelle eng': e.libelleEng ,
                    'Code': e.code ,
                    'Key':  e.keyWordAssosiation,
                    'Niveau': e.niveau ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd/MM/yyyy HH:mm'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd/MM/yyyy HH:mm'),
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchDisciplineScientifique.libelle ? this.searchDisciplineScientifique.libelle : environment.emptyForExport ,
            'Libelle fr': this.searchDisciplineScientifique.libelleFr ? this.searchDisciplineScientifique.libelleFr : environment.emptyForExport ,
            'Libelle eng': this.searchDisciplineScientifique.libelleEng ? this.searchDisciplineScientifique.libelleEng : environment.emptyForExport ,
            'Code': this.searchDisciplineScientifique.code ? this.searchDisciplineScientifique.code : environment.emptyForExport ,
            'Niveau Min': this.searchDisciplineScientifique.niveauMin ? this.searchDisciplineScientifique.niveauMin : environment.emptyForExport ,
            'Niveau Max': this.searchDisciplineScientifique.niveauMax ? this.searchDisciplineScientifique.niveauMax : environment.emptyForExport ,
            'Archive': this.searchDisciplineScientifique.archive ? (this.searchDisciplineScientifique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDisciplineScientifique.dateArchivageMin ? this.datePipe.transform(this.searchDisciplineScientifique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDisciplineScientifique.dateArchivageMax ? this.datePipe.transform(this.searchDisciplineScientifique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDisciplineScientifique.dateCreationMin ? this.datePipe.transform(this.searchDisciplineScientifique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDisciplineScientifique.dateCreationMax ? this.datePipe.transform(this.searchDisciplineScientifique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiques() : Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
    set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }

    get disciplineScientifiqueSelections() : Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiqueSelections;
       }
    set disciplineScientifiqueSelections(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiqueSelections = value;
       }
   
     


    get selectedDisciplineScientifique() : DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
    set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
    
    get createDisciplineScientifiqueDialog() :boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
    set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }
    
    get editDisciplineScientifiqueDialog() :boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
    set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }
    get viewDisciplineScientifiqueDialog() :boolean {
           return this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog;
       }
    set viewDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog = value;
       }
       
     get searchDisciplineScientifique() : DisciplineScientifiqueVo {
        return this.disciplineScientifiqueService.searchDisciplineScientifique;
       }
    set searchDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.searchDisciplineScientifique = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
