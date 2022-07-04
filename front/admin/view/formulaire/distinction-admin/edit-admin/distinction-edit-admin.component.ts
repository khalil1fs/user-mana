import {Component, OnInit} from '@angular/core';
import {DistinctionService} from 'src/app/controller/service/formulaire/Distinction.service';
import {DistinctionVo} from 'src/app/controller/model/formulaire/Distinction.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {OrganismeVo} from 'src/app/controller/model/referentiel/Organisme.model';
import {OrganismeService} from 'src/app/controller/service/referentiel/Organisme.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import { PaysVo } from 'src/app/controller/model/referentiel/Pays.model';
import { PaysService } from 'src/app/controller/service/referentiel/Pays.service';
import { TypeParticipationService } from 'src/app/controller/service/referentiel/TypeParticipation.service';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';
import { DistinctionEtablissementPaysVo } from 'src/app/controller/model/formulaire/DistinctionEtablissementPays.model';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { TypeParticipationVo } from 'src/app/controller/model/referentiel/TypeParticipation.model';
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';

@Component({
  selector: 'app-distinction-edit-admin',
  templateUrl: './distinction-edit-admin.component.html',
  styleUrls: ['./distinction-edit-admin.component.css']
})
export class DistinctionEditAdminComponent implements OnInit {

    private _maxDateObtention;
    submitted: boolean;
    submittedOrganismePays:boolean=false;
    selectedDistinctionEtablissementPayss: DistinctionEtablissementPaysVo = new DistinctionEtablissementPaysVo();
    disableValider:boolean=false;
    showPays:boolean=false;

constructor(private distinctionService: DistinctionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paysService:PaysService
 ,      private typeParticipationService :TypeParticipationService
 ,      private etablissementService: EtablissementService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private organismeService: OrganismeService
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
 ,       private campagneChercheurOuvertureService:CampagneChercheurOuvertureService
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
    this.maxDateObtention=new Date(new Date().getFullYear(), 11, 30);

}

public edit(){
    this.submitted = true;
    if(this.isValid()){
        this.editWithShowOption(false); 
    }
}
public editWithShowOption(showList: boolean){
            this.selectedDistinction.dateObtention = DateUtils.toDate(this.selectedDistinction.dateObtention);
    this.distinctionService.edit().subscribe(distinction=>{
    const myIndex = this.distinctions.findIndex(e => e.id === this.selectedDistinction.id);
    this.distinctions[myIndex] = this.selectedDistinction;
    this.editDistinctionDialog = false;
    this.selectedDistinction = new DistinctionVo();
    this.submitted=false;
    this.selectedTypeParticipationCode=null;
    }, error => {
        console.log(error);
    });

}
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
              public async openCreateorganisme(organisme: string) {
                      const isPermistted = await this.roleService.isPermitted('Organisme', 'add');
                       if(isPermistted){
         this.selectedOrganisme = new OrganismeVo();
        this.createOrganismeDialog = true;
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
// methods

hideEditDialog(){
    this.editDistinctionDialog  = false;
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

 get selectedDistinction(): DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
    set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }

   get editDistinctionDialog(): boolean {
           return this.distinctionService.editDistinctionDialog;

       }
    set editDistinctionDialog(value: boolean) {
        this.distinctionService.editDistinctionDialog = value;
       }

       get selectedOrganisme(): OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
      set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
       get organismes(): Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
       set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }
       get createOrganismeDialog(): boolean {
           return this.organismeService.createOrganismeDialog;
       }
      set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
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
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
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
       get chercheurs(): Array<ChercheurVo> {
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

    get dateFormat(){
            return environment.dateFormatEdit;
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
    get disablePays(){
        return this.distinctionService.disablePays;
    }
    set disablePays(value){
        this.distinctionService.disablePays=value;
    }
    get maxDateObtention(){
        return this._maxDateObtention;
    }
    set maxDateObtention(value){
        this._maxDateObtention=value;
    }
  
    get selectedEtablissement(): EtablissementVo {
        return this.etablissementService.selectedEtablissement;
    }
   set selectedEtablissement(value: EtablissementVo) {
     this.etablissementService.selectedEtablissement = value;
    }
    get createEtablissementDialog(): boolean {
        return this.etablissementService.createEtablissementDialog;
    }
   set createEtablissementDialog(value: boolean) {
     this.etablissementService.createEtablissementDialog= value;
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

    isValid(){
        if(!this.empty(this.selectedDistinction.intitule)
           && this.selectedDistinction.dateObtention
           && this.selectedDistinction.typeParticipationVo
           && (this.selectedDistinction.distinctionEtablissementPayssVo && this.selectedDistinction.distinctionEtablissementPayssVo.length!=0)
           && this.selectedDistinction.campagneVo
           && this.selectedDistinction.chercheurVo
           ){
               return true;
           }
           return false;
    }
    isValidPays(){
        return this.selectedDistinctionEtablissementPayss.paysVo;
    }
    isValidOrganisme(){
        return this.selectedDistinctionEtablissementPayss.etablissementVo;
    }
    isValidOrganismePays(){
        return this.isValidPays() && this.isValidOrganisme();
    }
    onChangeOrganisme(){
        if(this.selectedDistinctionEtablissementPayss.etablissementVo){
            this.showPays=true;
        }else{
            this.showPays=false;
        }
        if (this.selectedDistinctionEtablissementPayss.etablissementVo.admin &&
            this.selectedDistinctionEtablissementPayss.etablissementVo.valide && this.selectedDistinctionEtablissementPayss.etablissementVo.paysVo) {
            this.disablePays = true;
        }
        else {
            this.disablePays = false;
        }
        this.selectedDistinctionEtablissementPayss.paysVo = this.selectedDistinctionEtablissementPayss.etablissementVo.paysVo;
    }
    addDistinctionEtablissementPayss() {
        this.submittedOrganismePays=true;
        if( this.selectedDistinction.distinctionEtablissementPayssVo == null ){
            this.selectedDistinction.distinctionEtablissementPayssVo = new Array<DistinctionEtablissementPaysVo>();
        }
        if(this.isValidOrganismePays()){
            if( this.inEtablissements().length==0){
                this.selectedDistinction.distinctionEtablissementPayssVo.push(this.selectedDistinctionEtablissementPayss);
                this.selectedDistinctionEtablissementPayss = new DistinctionEtablissementPaysVo();
                this.submittedOrganismePays=false;
                this.showPays=false;
                this.disablePays=false;
            }else{
                this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: 'L\'établissement a été déjà ajouté' });
            }
        }
        this.onBlurChamp();
    }
    inEtablissements(){
        return this.selectedDistinction.distinctionEtablissementPayssVo?.filter(d=>d.etablissementVo.id===this.selectedDistinctionEtablissementPayss.etablissementVo.id);
    }
    deleteDistinctionEtablissementPayss(p: DistinctionEtablissementPaysVo) {
        this.selectedDistinction.distinctionEtablissementPayssVo.forEach((element, index) => {
            if (element === p) { 
                this.selectedDistinction.distinctionEtablissementPayssVo.splice(index, 1); 
                this.onBlurChamp();
            }
        });
    }
    empty(str){
        return !str || !/[^\s]+/.test(str);
    }
    getTypeParticipationByCode(code){
        return this.typeParticipations.filter(type=> type.code===code)[0];
    }
    onClickTypeParticipation(){
        this.selectedDistinction.typeParticipationVo=this.getTypeParticipationByCode(this.selectedTypeParticipationCode);
    }
    onBlurChamp(){
        this.submitted=true;
        if(!this.isValid()){
            this.disableValider=true;
        }else{
            this.disableValider=false;
        }
    }
    get selectedTypeParticipationCode(){
        return this.typeParticipationService.selectedTypeParticipationCode;
    }
    set selectedTypeParticipationCode(value){
        this.typeParticipationService.selectedTypeParticipationCode=value;
    }
    onChangeCampagne(){
        this.campagneChercheurOuvertureService
            .findChercheursByCampagneId(this.selectedDistinction.campagneVo?.id)
            .subscribe((data) => this.chercheurs = data);
    }
}
