import {Component, OnInit, Input} from '@angular/core';
import {CultureScientifiqueRecontreGrandPublicJeunePublicService} from 'src/app/controller/service/formulaire/CultureScientifiqueRecontreGrandPublicJeunePublic.service';
import {CultureScientifiqueRecontreGrandPublicJeunePublicVo} from 'src/app/controller/model/formulaire/CultureScientifiqueRecontreGrandPublicJeunePublic.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {PublicCibleVo} from 'src/app/controller/model/referentiel/PublicCible.model';
import {PublicCibleService} from 'src/app/controller/service/referentiel/PublicCible.service';
import {PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo} from 'src/app/controller/model/formulaire/PaysCultureScientifiqueRecontreGrandPublicJeunePublic.model';
import {PaysCultureScientifiqueRecontreGrandPublicJeunePublicService} from 'src/app/controller/service/formulaire/PaysCultureScientifiqueRecontreGrandPublicJeunePublic.service';
import {PublicCibleCultureScientifiqueRecontreGrandPublicVo} from 'src/app/controller/model/formulaire/PublicCibleCultureScientifiqueRecontreGrandPublic.model';
import {PublicCibleCultureScientifiqueRecontreGrandPublicService} from 'src/app/controller/service/formulaire/PublicCibleCultureScientifiqueRecontreGrandPublic.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo} from 'src/app/controller/model/formulaire/EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic.model';
import {EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicService} from 'src/app/controller/service/formulaire/EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic.service';
import {ContexteVo} from 'src/app/controller/model/referentiel/Contexte.model';
import {ContexteService} from 'src/app/controller/service/referentiel/Contexte.service';
import {FormatRencontreVo} from 'src/app/controller/model/formulaire/FormatRencontre.model';
import {FormatRencontreService} from 'src/app/controller/service/formulaire/FormatRencontre.service';
import {ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo} from 'src/app/controller/model/formulaire/ContexteCultureScientifiqueRecontreGrandPublicJeunePublic.model';
import {ContexteCultureScientifiqueRecontreGrandPublicJeunePublicService} from 'src/app/controller/service/formulaire/ContexteCultureScientifiqueRecontreGrandPublicJeunePublic.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-culture-scientifique-recontre-grand-public-jeune-public-create-admin',
  templateUrl: './culture-sci-recontre-gpjp-create-admin.component.html',
  styleUrls: ['./culture-sci-recontre-gpjp-create-admin.component.css']
})
export class CultureSciRecontreGpjpAdminComponent implements OnInit {

        selectedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics: PublicCibleCultureScientifiqueRecontreGrandPublicVo = new PublicCibleCultureScientifiqueRecontreGrandPublicVo();
        publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsListe: Array<PublicCibleCultureScientifiqueRecontreGrandPublicVo> = [];

        myPublicCibles: Array<PublicCibleVo> = [];
        myPayss: Array<PaysVo> = [];

        selectedContexteCultureScientifiqueRecontreGrandPublicJeunePublics: ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo = new ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        contexteCultureScientifiqueRecontreGrandPublicJeunePublicsListe: Array<ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo> = [];

        myContextes: Array<ContexteVo> = [];

        selectedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics: EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo = new EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsListe: Array<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedPaysCultureScientifiqueRecontreGrandPublicJeunePublics: PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo = new PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        paysCultureScientifiqueRecontreGrandPublicJeunePublicsListe: Array<PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo> = [];


constructor(private cultureScientifiqueRecontreGrandPublicJeunePublicService: CultureScientifiqueRecontreGrandPublicJeunePublicService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private publicCibleService :PublicCibleService
  ,       private paysCultureScientifiqueRecontreGrandPublicJeunePublicService :PaysCultureScientifiqueRecontreGrandPublicJeunePublicService
  ,       private publicCibleCultureScientifiqueRecontreGrandPublicService :PublicCibleCultureScientifiqueRecontreGrandPublicService
  ,       private etablissementService :EtablissementService
  ,       private etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService :EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicService
  ,       private contexteService :ContexteService
  ,       private formatRencontreService :FormatRencontreService
  ,       private contexteCultureScientifiqueRecontreGrandPublicJeunePublicService :ContexteCultureScientifiqueRecontreGrandPublicJeunePublicService
  ,       private campagneService :CampagneService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

                this.selectedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.publicCibleVo = new PublicCibleVo();
                this.publicCibleService.findAll().subscribe((data) => this.publicCibles = data);
                this.selectedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedContexteCultureScientifiqueRecontreGrandPublicJeunePublics.contexteVo = new ContexteVo();
                this.contexteService.findAll().subscribe((data) => this.contextes = data);
                this.selectedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedPaysCultureScientifiqueRecontreGrandPublicJeunePublics.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedFormatRencontre = new FormatRencontreVo();
    this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}
        addPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics() {
        if( this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsVo == null ){
            this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsVo = new Array<PublicCibleCultureScientifiqueRecontreGrandPublicVo>();
        }
        this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsVo.push(this.selectedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics);
        this.selectedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics = new PublicCibleCultureScientifiqueRecontreGrandPublicVo();
        }

        deletePublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics(p: PublicCibleCultureScientifiqueRecontreGrandPublicVo) {
        this.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsListe.forEach((element, index) => {
            if (element === p) { this.publicCibleCultureScientifiqueRecontresGrandPublicJeunePublicsListe.splice(index, 1); }
        });
    }
        addContexteCultureScientifiqueRecontreGrandPublicJeunePublics() {
        if( this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsVo == null ){
            this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsVo = new Array<ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo>();
        }
        this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsVo.push(this.selectedContexteCultureScientifiqueRecontreGrandPublicJeunePublics);
        this.selectedContexteCultureScientifiqueRecontreGrandPublicJeunePublics = new ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        }

        deleteContexteCultureScientifiqueRecontreGrandPublicJeunePublics(p: ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsListe.forEach((element, index) => {
            if (element === p) { this.contexteCultureScientifiqueRecontreGrandPublicJeunePublicsListe.splice(index, 1); }
        });
    }
        addEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics() {
        if( this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsVo == null ){
            this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsVo = new Array<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo>();
        }
        this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsVo.push(this.selectedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics);
        this.selectedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics = new EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        }

        deleteEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics(p: EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsListe.forEach((element, index) => {
            if (element === p) { this.etablissementCultureScientifiqueRecontreGrandPublicJeunePublicsListe.splice(index, 1); }
        });
    }
        addPaysCultureScientifiqueRecontreGrandPublicJeunePublics() {
        if( this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.paysCultureScientifiqueRecontreGrandPublicJeunePublicsVo == null ){
            this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.paysCultureScientifiqueRecontreGrandPublicJeunePublicsVo = new Array<PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo>();
        }
        this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic.paysCultureScientifiqueRecontreGrandPublicJeunePublicsVo.push(this.selectedPaysCultureScientifiqueRecontreGrandPublicJeunePublics);
        this.selectedPaysCultureScientifiqueRecontreGrandPublicJeunePublics = new PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo();
        }

        deletePaysCultureScientifiqueRecontreGrandPublicJeunePublics(p: PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.paysCultureScientifiqueRecontreGrandPublicJeunePublicsListe.forEach((element, index) => {
            if (element === p) { this.paysCultureScientifiqueRecontreGrandPublicJeunePublicsListe.splice(index, 1); }
        });
    }

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.cultureScientifiqueRecontreGrandPublicJeunePublicService.save().subscribe(cultureScientifiqueRecontreGrandPublicJeunePublic=>{
       this.cultureScientifiqueRecontreGrandPublicJeunePublics.push({...cultureScientifiqueRecontreGrandPublicJeunePublic});
       this.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog = false;
       this.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = new CultureScientifiqueRecontreGrandPublicJeunePublicVo();


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
              public async openCreateformatRencontre(formatRencontre: string) {
                      const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'add');
                       if(isPermistted){
         this.selectedFormatRencontre = new FormatRencontreVo();
        this.createFormatRencontreDialog = true;
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
              public async openCreatecontexte(contexte: string) {
                      const isPermistted = await this.roleService.isPermitted('Contexte', 'add');
                       if(isPermistted){
         this.selectedContexte = new ContexteVo();
        this.createContexteDialog = true;
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
    this.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog  = false;
}

// getters and setters

get cultureScientifiqueRecontreGrandPublicJeunePublics(): Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo> {
    return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublics;
       }
set cultureScientifiqueRecontreGrandPublicJeunePublics(value: Array<CultureScientifiqueRecontreGrandPublicJeunePublicVo>) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.cultureScientifiqueRecontreGrandPublicJeunePublics = value;
       }

 get selectedCultureScientifiqueRecontreGrandPublicJeunePublic():CultureScientifiqueRecontreGrandPublicJeunePublicVo {
           return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.selectedCultureScientifiqueRecontreGrandPublicJeunePublic;
       }
    set selectedCultureScientifiqueRecontreGrandPublicJeunePublic(value: CultureScientifiqueRecontreGrandPublicJeunePublicVo) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.selectedCultureScientifiqueRecontreGrandPublicJeunePublic = value;
       }

   get createCultureScientifiqueRecontreGrandPublicJeunePublicDialog(): boolean {
           return this.cultureScientifiqueRecontreGrandPublicJeunePublicService.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog;

       }
    set createCultureScientifiqueRecontreGrandPublicJeunePublicDialog(value: boolean) {
        this.cultureScientifiqueRecontreGrandPublicJeunePublicService.createCultureScientifiqueRecontreGrandPublicJeunePublicDialog= value;
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
       get selectedFormatRencontre(): FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
      set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }
       get formatRencontres():Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontres;
       }
       set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }
       get createFormatRencontreDialog(): boolean {
           return this.formatRencontreService.createFormatRencontreDialog;
       }
      set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
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
       get selectedContexte(): ContexteVo {
           return this.contexteService.selectedContexte;
       }
      set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }
       get contextes():Array<ContexteVo> {
           return this.contexteService.contextes;
       }
       set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }
       get createContexteDialog(): boolean {
           return this.contexteService.createContexteDialog;
       }
      set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
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
