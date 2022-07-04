import {Component, OnInit, Input} from '@angular/core';
import {CultureScientifiqueOutilPedagogiqueService} from 'src/app/controller/service/formulaire/CultureScientifiqueOutilPedagogique.service';
import {CultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/CultureScientifiqueOutilPedagogique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {EtablissementCultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/EtablissementCultureScientifiqueOutilPedagogique.model';
import {EtablissementCultureScientifiqueOutilPedagogiqueService} from 'src/app/controller/service/formulaire/EtablissementCultureScientifiqueOutilPedagogique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';
import {PublicCibleVo} from 'src/app/controller/model/referentiel/PublicCible.model';
import {PublicCibleService} from 'src/app/controller/service/referentiel/PublicCible.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/PaysTypeOutilCultureScientifiqueOutilPedagogique.model';
import {PaysTypeOutilCultureScientifiqueOutilPedagogiqueService} from 'src/app/controller/service/formulaire/PaysTypeOutilCultureScientifiqueOutilPedagogique.service';
import {TypeOutilCultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.model';
import {TypeOutilCultureScientifiqueOutilPedagogiqueService} from 'src/app/controller/service/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PublicCibleCultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/PublicCibleCultureScientifiqueOutilPedagogique.model';
import {PublicCibleCultureScientifiqueOutilPedagogiqueService} from 'src/app/controller/service/formulaire/PublicCibleCultureScientifiqueOutilPedagogique.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-culture-scientifique-outil-pedagogique-create-admin',
  templateUrl: './culture-sci-outil-peda-create-admin.html',
  styleUrls: ['./culture-sci-outil-peda-create-admin.css']
})
export class CultureScientifiqueOutilPedagogiqueCreateAdminComponent implements OnInit {

        selectedPublicCibleCultureScientifiqueOutilPedagogiques: PublicCibleCultureScientifiqueOutilPedagogiqueVo = new PublicCibleCultureScientifiqueOutilPedagogiqueVo();
        publicCibleCultureScientifiqueOutilPedagogiquesListe: Array<PublicCibleCultureScientifiqueOutilPedagogiqueVo> = [];

        myPublicCibles: Array<PublicCibleVo> = [];
        myPayss: Array<PaysVo> = [];

        selectedTypeOutilCultureScientifiqueOutilPedagogiques: TypeOutilCultureScientifiqueOutilPedagogiqueVo = new TypeOutilCultureScientifiqueOutilPedagogiqueVo();
        typeOutilCultureScientifiqueOutilPedagogiquesListe: Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo> = [];

        myTypeOutils: Array<TypeOutilVo> = [];

        selectedPaysTypeOutilCultureScientifiqueOutilPedagogiques: PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo = new PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo();
        paysTypeOutilCultureScientifiqueOutilPedagogiquesListe: Array<PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo> = [];


        selectedEtablissementCultureScientifiqueOutilPedagogiques: EtablissementCultureScientifiqueOutilPedagogiqueVo = new EtablissementCultureScientifiqueOutilPedagogiqueVo();
        etablissementCultureScientifiqueOutilPedagogiquesListe: Array<EtablissementCultureScientifiqueOutilPedagogiqueVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

constructor(private cultureScientifiqueOutilPedagogiqueService: CultureScientifiqueOutilPedagogiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private etablissementCultureScientifiqueOutilPedagogiqueService :EtablissementCultureScientifiqueOutilPedagogiqueService
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private typeOutilService :TypeOutilService
  ,       private publicCibleService :PublicCibleService
  ,       private etablissementService :EtablissementService
  ,       private paysTypeOutilCultureScientifiqueOutilPedagogiqueService :PaysTypeOutilCultureScientifiqueOutilPedagogiqueService
  ,       private typeOutilCultureScientifiqueOutilPedagogiqueService :TypeOutilCultureScientifiqueOutilPedagogiqueService
  ,       private campagneService :CampagneService
  ,       private publicCibleCultureScientifiqueOutilPedagogiqueService :PublicCibleCultureScientifiqueOutilPedagogiqueService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

                this.selectedPublicCibleCultureScientifiqueOutilPedagogiques.publicCibleVo = new PublicCibleVo();
                this.publicCibleService.findAll().subscribe((data) => this.publicCibles = data);
                this.selectedPublicCibleCultureScientifiqueOutilPedagogiques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedTypeOutilCultureScientifiqueOutilPedagogiques.typeOutilVo = new TypeOutilVo();
                this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
                this.selectedPaysTypeOutilCultureScientifiqueOutilPedagogiques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEtablissementCultureScientifiqueOutilPedagogiques.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addPublicCibleCultureScientifiqueOutilPedagogiques() {
        if( this.selectedCultureScientifiqueOutilPedagogique.publicCibleCultureScientifiqueOutilPedagogiquesVo == null ){
            this.selectedCultureScientifiqueOutilPedagogique.publicCibleCultureScientifiqueOutilPedagogiquesVo = new Array<PublicCibleCultureScientifiqueOutilPedagogiqueVo>();
        }
        this.selectedCultureScientifiqueOutilPedagogique.publicCibleCultureScientifiqueOutilPedagogiquesVo.push(this.selectedPublicCibleCultureScientifiqueOutilPedagogiques);
        this.selectedPublicCibleCultureScientifiqueOutilPedagogiques = new PublicCibleCultureScientifiqueOutilPedagogiqueVo();
        }

        deletePublicCibleCultureScientifiqueOutilPedagogiques(p: PublicCibleCultureScientifiqueOutilPedagogiqueVo) {
        this.publicCibleCultureScientifiqueOutilPedagogiquesListe.forEach((element, index) => {
            if (element === p) { this.publicCibleCultureScientifiqueOutilPedagogiquesListe.splice(index, 1); }
        });
    }
        addTypeOutilCultureScientifiqueOutilPedagogiques() {
        if( this.selectedCultureScientifiqueOutilPedagogique.typeOutilCultureScientifiqueOutilPedagogiquesVo == null ){
            this.selectedCultureScientifiqueOutilPedagogique.typeOutilCultureScientifiqueOutilPedagogiquesVo = new Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo>();
        }
        this.selectedCultureScientifiqueOutilPedagogique.typeOutilCultureScientifiqueOutilPedagogiquesVo.push(this.selectedTypeOutilCultureScientifiqueOutilPedagogiques);
        this.selectedTypeOutilCultureScientifiqueOutilPedagogiques = new TypeOutilCultureScientifiqueOutilPedagogiqueVo();
        }

        deleteTypeOutilCultureScientifiqueOutilPedagogiques(p: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        this.typeOutilCultureScientifiqueOutilPedagogiquesListe.forEach((element, index) => {
            if (element === p) { this.typeOutilCultureScientifiqueOutilPedagogiquesListe.splice(index, 1); }
        });
    }
        addPaysTypeOutilCultureScientifiqueOutilPedagogiques() {
        if( this.selectedCultureScientifiqueOutilPedagogique.paysTypeOutilCultureScientifiqueOutilPedagogiquesVo == null ){
            this.selectedCultureScientifiqueOutilPedagogique.paysTypeOutilCultureScientifiqueOutilPedagogiquesVo = new Array<PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo>();
        }
        this.selectedCultureScientifiqueOutilPedagogique.paysTypeOutilCultureScientifiqueOutilPedagogiquesVo.push(this.selectedPaysTypeOutilCultureScientifiqueOutilPedagogiques);
        this.selectedPaysTypeOutilCultureScientifiqueOutilPedagogiques = new PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo();
        }

        deletePaysTypeOutilCultureScientifiqueOutilPedagogiques(p: PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        this.paysTypeOutilCultureScientifiqueOutilPedagogiquesListe.forEach((element, index) => {
            if (element === p) { this.paysTypeOutilCultureScientifiqueOutilPedagogiquesListe.splice(index, 1); }
        });
    }
        addEtablissementCultureScientifiqueOutilPedagogiques() {
        if( this.selectedCultureScientifiqueOutilPedagogique.etablissementCultureScientifiqueOutilPedagogiquesVo == null ){
            this.selectedCultureScientifiqueOutilPedagogique.etablissementCultureScientifiqueOutilPedagogiquesVo = new Array<EtablissementCultureScientifiqueOutilPedagogiqueVo>();
        }
        this.selectedCultureScientifiqueOutilPedagogique.etablissementCultureScientifiqueOutilPedagogiquesVo.push(this.selectedEtablissementCultureScientifiqueOutilPedagogiques);
        this.selectedEtablissementCultureScientifiqueOutilPedagogiques = new EtablissementCultureScientifiqueOutilPedagogiqueVo();
        }

        deleteEtablissementCultureScientifiqueOutilPedagogiques(p: EtablissementCultureScientifiqueOutilPedagogiqueVo) {
        this.etablissementCultureScientifiqueOutilPedagogiquesListe.forEach((element, index) => {
            if (element === p) { this.etablissementCultureScientifiqueOutilPedagogiquesListe.splice(index, 1); }
        });
    }

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.cultureScientifiqueOutilPedagogiqueService.save().subscribe(cultureScientifiqueOutilPedagogique=>{
       this.cultureScientifiqueOutilPedagogiques.push({...cultureScientifiqueOutilPedagogique});
       this.createCultureScientifiqueOutilPedagogiqueDialog = false;
       this.selectedCultureScientifiqueOutilPedagogique = new CultureScientifiqueOutilPedagogiqueVo();


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
              public async openCreatepublicCible(publicCible: string) {
                      const isPermistted = await this.roleService.isPermitted('PublicCible', 'add');
                       if(isPermistted){
         this.selectedPublicCible = new PublicCibleVo();
        this.createPublicCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeOutil(typeOutil: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
                       if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
        this.createTypeOutilDialog = true;
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
// methods

hideCreateDialog(){
    this.createCultureScientifiqueOutilPedagogiqueDialog  = false;
}

// getters and setters

get cultureScientifiqueOutilPedagogiques(): Array<CultureScientifiqueOutilPedagogiqueVo> {
    return this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques;
       }
set cultureScientifiqueOutilPedagogiques(value: Array<CultureScientifiqueOutilPedagogiqueVo>) {
        this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques = value;
       }

 get selectedCultureScientifiqueOutilPedagogique():CultureScientifiqueOutilPedagogiqueVo {
           return this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique;
       }
    set selectedCultureScientifiqueOutilPedagogique(value: CultureScientifiqueOutilPedagogiqueVo) {
        this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique = value;
       }

   get createCultureScientifiqueOutilPedagogiqueDialog(): boolean {
           return this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog;

       }
    set createCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog= value;
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
       get selectedPublicCible(): PublicCibleVo {
           return this.publicCibleService.selectedPublicCible;
       }
      set selectedPublicCible(value: PublicCibleVo) {
        this.publicCibleService.selectedPublicCible = value;
       }
       get publicCibles():Array<PublicCibleVo> {
           return this.publicCibleService.publicCibles;
       }
       set publicCibles(value: Array<PublicCibleVo>) {
        this.publicCibleService.publicCibles = value;
       }
       get createPublicCibleDialog(): boolean {
           return this.publicCibleService.createPublicCibleDialog;
       }
      set createPublicCibleDialog(value: boolean) {
        this.publicCibleService.createPublicCibleDialog= value;
       }
       get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils():Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
      set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
