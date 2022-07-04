import {Component, OnInit} from '@angular/core';
import {DistinctionService} from 'src/app/controller/service/formulaire/Distinction.service';
import {DistinctionVo} from 'src/app/controller/model/formulaire/Distinction.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {OrganismeVo} from 'src/app/controller/model/referentiel/Organisme.model';
import {OrganismeService} from 'src/app/controller/service/referentiel/Organisme.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import { PaysService } from 'src/app/controller/service/referentiel/Pays.service';
import { PaysVo } from 'src/app/controller/model/referentiel/Pays.model';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { TypeParticipationVo } from 'src/app/controller/model/referentiel/TypeParticipation.model';
import { TypeParticipationService } from 'src/app/controller/service/referentiel/TypeParticipation.service';

@Component({
  selector: 'app-distinction-view-admin',
  templateUrl: './distinction-view-admin.component.html',
  styleUrls: ['./distinction-view-admin.component.css']
})
export class DistinctionViewAdminComponent implements OnInit {


constructor(private distinctionService: DistinctionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private organismeService :OrganismeService
    ,private paysService:PaysService
    ,private typeParticipationService :TypeParticipationService
    ,private etablissementService: EtablissementService
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.typeParticipationService.findAll().subscribe((data) => this.typeParticipations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewDistinctionDialog  = false;
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
// getters and setters

get distinctions(): Array<DistinctionVo> {
    return this.distinctionService.distinctions;
       }
set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
       }

 get selectedDistinction():DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
    set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }

   get viewDistinctionDialog():boolean {
           return this.distinctionService.viewDistinctionDialog;

       }
    set viewDistinctionDialog(value: boolean) {
        this.distinctionService.viewDistinctionDialog= value;
       }

       get selectedOrganisme():OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
      set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
       get organismes():Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
       set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }
       get editOrganismeDialog():boolean {
           return this.organismeService.editOrganismeDialog;
       }
      set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog= value;
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
       get etablissements(): Array<EtablissementVo> {
        return this.etablissementService.etablissements;
    }
    set etablissements(value: Array<EtablissementVo>) {
     this.etablissementService.etablissements = value;
    }
    get typeParticipations(): Array<TypeParticipationVo> {
        return this.typeParticipationService.typeParticipations;
    }
    set typeParticipations(value: Array<TypeParticipationVo>) {
     this.typeParticipationService.typeParticipations = value;
    }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
     get selectedPays(): PaysVo {
        return this.paysService.selectedPays;
    }
   set selectedPays(value: PaysVo) {
     this.paysService.selectedPays = value;
    }
    get payss(): Array<PaysVo> {
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
    get selectedTypeParticipationCode(){
        return this.typeParticipationService.selectedTypeParticipationCode;
    }
    set selectedTypeParticipationCode(value){
        this.typeParticipationService.selectedTypeParticipationCode=value;
    }
}
