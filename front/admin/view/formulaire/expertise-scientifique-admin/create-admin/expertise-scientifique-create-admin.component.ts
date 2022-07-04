import {Component, OnInit, Input} from '@angular/core';
import {ExpertiseScientifiqueService} from 'src/app/controller/service/formulaire/ExpertiseScientifique.service';
import {ExpertiseScientifiqueVo} from 'src/app/controller/model/formulaire/ExpertiseScientifique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from 'src/app/controller/model/formulaire/DisciplineScientifiqueExpertiseScientifique.model';
import {DisciplineScientifiqueExpertiseScientifiqueService} from 'src/app/controller/service/formulaire/DisciplineScientifiqueExpertiseScientifique.service';
import {TypeExpertiseVo} from 'src/app/controller/model/referentiel/TypeExpertise.model';
import {TypeExpertiseService} from 'src/app/controller/service/referentiel/TypeExpertise.service';
import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {CommunauteSavoirExpertiseScientifiqueVo} from 'src/app/controller/model/formulaire/CommunauteSavoirExpertiseScientifique.model';
import {CommunauteSavoirExpertiseScientifiqueService} from 'src/app/controller/service/formulaire/CommunauteSavoirExpertiseScientifique.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-expertise-scientifique-create-admin',
  templateUrl: './expertise-scientifique-create-admin.component.html',
  styleUrls: ['./expertise-scientifique-create-admin.component.css']
})
export class ExpertiseScientifiqueCreateAdminComponent implements OnInit {

        selectedCommunauteSavoirExpertiseScientifiques: CommunauteSavoirExpertiseScientifiqueVo = new CommunauteSavoirExpertiseScientifiqueVo();
        communauteSavoirExpertiseScientifiquesListe: Array<CommunauteSavoirExpertiseScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueExpertiseScientifiques: DisciplineScientifiqueExpertiseScientifiqueVo = new DisciplineScientifiqueExpertiseScientifiqueVo();
        disciplineScientifiqueExpertiseScientifiquesListe: Array<DisciplineScientifiqueExpertiseScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

constructor(private expertiseScientifiqueService: ExpertiseScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private disciplineScientifiqueService :DisciplineScientifiqueService
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private disciplineScientifiqueExpertiseScientifiqueService :DisciplineScientifiqueExpertiseScientifiqueService
  ,       private typeExpertiseService :TypeExpertiseService
  ,       private communauteSavoirService :CommunauteSavoirService
  ,       private communauteSavoirExpertiseScientifiqueService :CommunauteSavoirExpertiseScientifiqueService
  ,       private etablissementService :EtablissementService
  ,       private campagneService :CampagneService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

                this.selectedCommunauteSavoirExpertiseScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDisciplineScientifiqueExpertiseScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedTypeExpertise = new TypeExpertiseVo();
    this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}
        addCommunauteSavoirExpertiseScientifiques() {
        if( this.selectedExpertiseScientifique.communauteSavoirExpertiseScientifiquesVo == null ){
            this.selectedExpertiseScientifique.communauteSavoirExpertiseScientifiquesVo = new Array<CommunauteSavoirExpertiseScientifiqueVo>();
        }
        this.selectedExpertiseScientifique.communauteSavoirExpertiseScientifiquesVo.push(this.selectedCommunauteSavoirExpertiseScientifiques);
        this.selectedCommunauteSavoirExpertiseScientifiques = new CommunauteSavoirExpertiseScientifiqueVo();
        }

        deleteCommunauteSavoirExpertiseScientifiques(p: CommunauteSavoirExpertiseScientifiqueVo) {
        this.communauteSavoirExpertiseScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.communauteSavoirExpertiseScientifiquesListe.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueExpertiseScientifiques() {
        if( this.selectedExpertiseScientifique.disciplineScientifiqueExpertiseScientifiquesVo == null ){
            this.selectedExpertiseScientifique.disciplineScientifiqueExpertiseScientifiquesVo = new Array<DisciplineScientifiqueExpertiseScientifiqueVo>();
        }
        this.selectedExpertiseScientifique.disciplineScientifiqueExpertiseScientifiquesVo.push(this.selectedDisciplineScientifiqueExpertiseScientifiques);
        this.selectedDisciplineScientifiqueExpertiseScientifiques = new DisciplineScientifiqueExpertiseScientifiqueVo();
        }

        deleteDisciplineScientifiqueExpertiseScientifiques(p: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this.disciplineScientifiqueExpertiseScientifiquesListe.forEach((element, index) => {
            if (element === p) { this.disciplineScientifiqueExpertiseScientifiquesListe.splice(index, 1); }
        });
    }

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.expertiseScientifiqueService.save().subscribe(expertiseScientifique=>{
       this.expertiseScientifiques.push({...expertiseScientifique});
       this.createExpertiseScientifiqueDialog = false;
       this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeExpertise(typeExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'add');
                       if(isPermistted){
         this.selectedTypeExpertise = new TypeExpertiseVo();
        this.createTypeExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createExpertiseScientifiqueDialog  = false;
}

// getters and setters

get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
    return this.expertiseScientifiqueService.expertiseScientifiques;
       }
set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
       }

 get selectedExpertiseScientifique():ExpertiseScientifiqueVo {
           return this.expertiseScientifiqueService.selectedExpertiseScientifique;
       }
    set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
       }

   get createExpertiseScientifiqueDialog(): boolean {
           return this.expertiseScientifiqueService.createExpertiseScientifiqueDialog;

       }
    set createExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.createExpertiseScientifiqueDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedTypeExpertise(): TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
      set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }
       get typeExpertises():Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertises;
       }
       set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }
       get createTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.createTypeExpertiseDialog;
       }
      set createTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.createTypeExpertiseDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
