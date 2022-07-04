import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEcoleDoctoraleService} from 'src/app/controller/service/formulaire/ResponsabilitePedagogiqueEcoleDoctorale.service';
import {ResponsabilitePedagogiqueEcoleDoctoraleVo} from 'src/app/controller/model/formulaire/ResponsabilitePedagogiqueEcoleDoctorale.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {EcoleDoctoraleVo} from 'src/app/controller/model/formulaire/EcoleDoctorale.model';
import {EcoleDoctoraleService} from 'src/app/controller/service/formulaire/EcoleDoctorale.service';
import {StatutEcoleDoctoraleVo} from 'src/app/controller/model/referentiel/StatutEcoleDoctorale.model';
import {StatutEcoleDoctoraleService} from 'src/app/controller/service/formulaire/StatutEcoleDoctorale.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-responsabilite-pedagogique-ecole-doctorale-view-admin',
  templateUrl: './resp-ped-ecole-doctorale-view-admin.component.html',
  styleUrls: ['./resp-ped-ecole-doctorale-view-admin.component.css']
})
export class ResponsabilitePedagogiqueEcoleDoctoraleViewAdminComponent implements OnInit {


constructor(private responsabilitePedagogiqueEcoleDoctoraleService: ResponsabilitePedagogiqueEcoleDoctoraleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private ecoleDoctoraleService :EcoleDoctoraleService
    ,private statutEcoleDoctoraleService :StatutEcoleDoctoraleService
    ,private etablissementService :EtablissementService
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedStatutEcoleDoctorale = new StatutEcoleDoctoraleVo();
    this.statutEcoleDoctoraleService.findAll().subscribe((data) => this.statutEcoleDoctorales = data);
    this.selectedEcoleDoctorale = new EcoleDoctoraleVo();
    this.ecoleDoctoraleService.findAll().subscribe((data) => this.ecoleDoctorales = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}

hideViewDialog(){
    this.viewResponsabilitePedagogiqueEcoleDoctoraleDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueEcoleDoctorales(): Array<ResponsabilitePedagogiqueEcoleDoctoraleVo> {
    return this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctorales;
       }
set responsabilitePedagogiqueEcoleDoctorales(value: Array<ResponsabilitePedagogiqueEcoleDoctoraleVo>) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.responsabilitePedagogiqueEcoleDoctorales = value;
       }

 get selectedResponsabilitePedagogiqueEcoleDoctorale():ResponsabilitePedagogiqueEcoleDoctoraleVo {
           return this.responsabilitePedagogiqueEcoleDoctoraleService.selectedResponsabilitePedagogiqueEcoleDoctorale;
       }
    set selectedResponsabilitePedagogiqueEcoleDoctorale(value: ResponsabilitePedagogiqueEcoleDoctoraleVo) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.selectedResponsabilitePedagogiqueEcoleDoctorale = value;
       }

   get viewResponsabilitePedagogiqueEcoleDoctoraleDialog():boolean {
           return this.responsabilitePedagogiqueEcoleDoctoraleService.viewResponsabilitePedagogiqueEcoleDoctoraleDialog;

       }
    set viewResponsabilitePedagogiqueEcoleDoctoraleDialog(value: boolean) {
        this.responsabilitePedagogiqueEcoleDoctoraleService.viewResponsabilitePedagogiqueEcoleDoctoraleDialog= value;
       }

       get selectedEcoleDoctorale():EcoleDoctoraleVo {
           return this.ecoleDoctoraleService.selectedEcoleDoctorale;
       }
      set selectedEcoleDoctorale(value: EcoleDoctoraleVo) {
        this.ecoleDoctoraleService.selectedEcoleDoctorale = value;
       }
       get ecoleDoctorales():Array<EcoleDoctoraleVo> {
           return this.ecoleDoctoraleService.ecoleDoctorales;
       }
       set ecoleDoctorales(value: Array<EcoleDoctoraleVo>) {
        this.ecoleDoctoraleService.ecoleDoctorales = value;
       }
       get editEcoleDoctoraleDialog():boolean {
           return this.ecoleDoctoraleService.editEcoleDoctoraleDialog;
       }
      set editEcoleDoctoraleDialog(value: boolean) {
        this.ecoleDoctoraleService.editEcoleDoctoraleDialog= value;
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
       get selectedStatutEcoleDoctorale():StatutEcoleDoctoraleVo {
           return this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale;
       }
      set selectedStatutEcoleDoctorale(value: StatutEcoleDoctoraleVo) {
        this.statutEcoleDoctoraleService.selectedStatutEcoleDoctorale = value;
       }
       get statutEcoleDoctorales():Array<StatutEcoleDoctoraleVo> {
           return this.statutEcoleDoctoraleService.statutEcoleDoctorales;
       }
       set statutEcoleDoctorales(value: Array<StatutEcoleDoctoraleVo>) {
        this.statutEcoleDoctoraleService.statutEcoleDoctorales = value;
       }
       get editStatutEcoleDoctoraleDialog():boolean {
           return this.statutEcoleDoctoraleService.editStatutEcoleDoctoraleDialog;
       }
      set editStatutEcoleDoctoraleDialog(value: boolean) {
        this.statutEcoleDoctoraleService.editStatutEcoleDoctoraleDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
