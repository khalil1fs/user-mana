import {Component, OnInit} from '@angular/core';
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
  selector: 'app-culture-scientifique-outil-pedagogique-view-admin',
  templateUrl: './culture-sci-outil-peda-view-admin.html',
  styleUrls: ['./culture-sci-outil-peda-view-admin.css']
})
export class CultureScientifiqueOutilPedagogiqueViewAdminComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etablissementCultureScientifiqueOutilPedagogiqueService :EtablissementCultureScientifiqueOutilPedagogiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private typeOutilService :TypeOutilService
    ,private publicCibleService :PublicCibleService
    ,private etablissementService :EtablissementService
    ,private paysTypeOutilCultureScientifiqueOutilPedagogiqueService :PaysTypeOutilCultureScientifiqueOutilPedagogiqueService
    ,private typeOutilCultureScientifiqueOutilPedagogiqueService :TypeOutilCultureScientifiqueOutilPedagogiqueService
    ,private campagneService :CampagneService
    ,private publicCibleCultureScientifiqueOutilPedagogiqueService :PublicCibleCultureScientifiqueOutilPedagogiqueService
    ,private paysService :PaysService
    ,private chercheurService :ChercheurService
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

hideViewDialog(){
    this.viewCultureScientifiqueOutilPedagogiqueDialog  = false;
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

   get viewCultureScientifiqueOutilPedagogiqueDialog():boolean {
           return this.cultureScientifiqueOutilPedagogiqueService.viewCultureScientifiqueOutilPedagogiqueDialog;

       }
    set viewCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.viewCultureScientifiqueOutilPedagogiqueDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
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
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedPublicCible():PublicCibleVo {
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
       get editPublicCibleDialog():boolean {
           return this.publicCibleService.editPublicCibleDialog;
       }
      set editPublicCibleDialog(value: boolean) {
        this.publicCibleService.editPublicCibleDialog= value;
       }
       get selectedTypeOutil():TypeOutilVo {
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
       get editTypeOutilDialog():boolean {
           return this.typeOutilService.editTypeOutilDialog;
       }
      set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog= value;
       }
       get selectedCampagne():CampagneVo {
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
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur():ChercheurVo {
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
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
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
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedPays():PaysVo {
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
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
