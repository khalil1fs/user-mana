import {Component, OnInit, Input} from '@angular/core';
import {VieInstitutionnelleService} from 'src/app/controller/service/formulaire/VieInstitutionnelle.service';
import {VieInstitutionnelleVo} from 'src/app/controller/model/formulaire/VieInstitutionnelle.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {TypeInstanceVo} from 'src/app/controller/model/referentiel/TypeInstance.model';
import {TypeInstanceService} from 'src/app/controller/service/referentiel/TypeInstance.service';
import {StructureIrdVo} from 'src/app/controller/model/referentiel/StructureIrd.model';
import {StructureIrdService} from 'src/app/controller/service/referentiel/StructureIrd.service';
import {VieInstitutionnelleDetailVo} from 'src/app/controller/model/formulaire/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from 'src/app/controller/service/formulaire/VieInstitutionnelleDetail.service';
import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';
import { VieInstitutionnelleDetailInstrumentIrdVo } from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailInstrumentIrd.model';
import { VieInstitutionnelleDetailEtablissementVo } from 'src/app/controller/model/formulaire/VieInstitutionnelleDetailEtablissement.model';
import { InstrumentIrdService } from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import { InstrumentIrdVo } from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import { EtablissementVo } from 'src/app/controller/model/referentiel/Etablissement.model';
import { EtablissementService } from 'src/app/controller/service/referentiel/Etablissement.service';

@Component({
  selector: 'app-vie-institutionnelle-create-admin',
  templateUrl: './vie-institutionnelle-create-admin.component.html',
  styleUrls: ['./vie-institutionnelle-create-admin.component.css']
})
export class VieInstitutionnelleCreateAdminComponent implements OnInit {

        selectedVieInstitutionnelleDetails: VieInstitutionnelleDetailVo = new VieInstitutionnelleDetailVo();
        selectedVieInstitutionnelleDetailInstrumentIrds: VieInstitutionnelleDetailInstrumentIrdVo = new VieInstitutionnelleDetailInstrumentIrdVo();
        selectedVieInstitutionnelleDetailEtablissements: VieInstitutionnelleDetailEtablissementVo = new VieInstitutionnelleDetailEtablissementVo();
        vieInstitutionnelleDetailsListe: Array<VieInstitutionnelleDetailVo> = [];
        private editVieInstitDetail:boolean=false;

        myTypeInstances: Array<TypeInstanceVo> = [];
        myStructureIrds: Array<StructureIrdVo> = [];
        myPayss: Array<PaysVo> = [];
        private showStructure:boolean=false;
        private showInstrumentsIrd:boolean=false;
        private submitted:boolean=false;
        private submittedDetail:boolean=false;

constructor(private vieInstitutionnelleService: VieInstitutionnelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private instrumentIrdService:InstrumentIrdService
 ,       private etablissementService :EtablissementService
  ,       private etatEtapeCampagneService :EtatEtapeCampagneService
  ,       private typeInstanceService :TypeInstanceService
  ,       private structureIrdService :StructureIrdService
  ,       private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
  ,       private campagneService :CampagneService
  ,       private paysService :PaysService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {
                this.selectedVieInstitutionnelle=new VieInstitutionnelleVo();
               // this.selectedVieInstitutionnelleDetails.typeInstanceVo = new TypeInstanceVo();
                this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
               // this.selectedVieInstitutionnelleDetails.structureIrdVo = new StructureIrdVo();
                this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
                //this.selectedVieInstitutionnelleDetails.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addVieInstitutionnelleDetails() {
            this.submittedDetail=true;
            if(this.isValideDetailVieInstit()){
                if(!this.editVieInstitDetail){
                    if( this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo == null ){
                        this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo = new Array<VieInstitutionnelleDetailVo>();
                    }
                    this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.push(this.selectedVieInstitutionnelleDetails);
                    this.selectedVieInstitutionnelleDetails = new VieInstitutionnelleDetailVo();
                }else{
                    this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.forEach((element, index) => {
                        if (element === this.selectedVieInstitutionnelleDetails) { this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo[index]=this.selectedVieInstitutionnelleDetails; }
                    }); 
                    this.editVieInstitDetail=false;
                    this.selectedVieInstitutionnelleDetails=new VieInstitutionnelleDetailVo();
                }  
                this.submittedDetail=false;
                this.showStructure=false;
                this.showInstrumentsIrd=false;
            }
        }

        deleteVieInstitutionnelleDetails(p: VieInstitutionnelleDetailVo) {
            this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.forEach((element, index) => {
                if (element === p) { this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.splice(index, 1); }
            });
         }
         editVieInstitutionnelleDetails(p: VieInstitutionnelleDetailVo) {
            this.selectedVieInstitutionnelleDetails=p;
            if(this.selectedVieInstitutionnelleDetails.cooreleInstrumentIrd){
                this.showInstrumentsIrd=true;
            }
            if(this.selectedVieInstitutionnelleDetails.cooreleStructureIrd){
                this.showStructure=true;
            }
            this.editVieInstitDetail=true;
        }

public save(){
    this.submitted=true;
    if(this.isValideVieInstit()){
        this.saveWithShowOption(false);
    }else{
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
    }
}

public saveWithShowOption(showList: boolean){
     this.vieInstitutionnelleService.save().subscribe(vieInstitutionnelle=>{
       this.vieInstitutionnelles.push({...vieInstitutionnelle});
       this.createVieInstitutionnelleDialog = false;
       this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
       this.submitted=false;
       this.showInstrumentsIrd=false;
       this.showStructure=false;
       this.submittedDetail=false;
    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreatetypeInstance(typeInstance: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstance', 'add');
                       if(isPermistted){
         this.selectedTypeInstance = new TypeInstanceVo();
        this.createTypeInstanceDialog = true;
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
              public async openCreatestructureIrd(structureIrd: string) {
                  console.log("structure ird");
                      const isPermistted = await this.roleService.isPermitted('StructureIrd', 'add');
                       if(isPermistted){
         this.selectedStructureIrd = new StructureIrdVo();
        this.createStructureIrdDialog = true;
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
public async openCreateinstrumentIrd(instrumentIrd: string) {
    const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
     if(isPermistted){
this.selectedInstrumentIrd = new InstrumentIrdVo();
this.createInstrumentIrdDialog = true;
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'problème de permission'
});
}
}
// methods

hideCreateDialog(){
    this.createVieInstitutionnelleDialog  = false;
}

// getters and setters

get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
    return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }

 get selectedVieInstitutionnelle():VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }

   get createVieInstitutionnelleDialog(): boolean {
           return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;

       }
    set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog= value;
       }

       get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
      set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
       get typeInstances():Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
       set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }
       get createTypeInstanceDialog(): boolean {
           return this.typeInstanceService.createTypeInstanceDialog;
       }
      set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
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
       get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
      set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
       get structureIrds():Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
       set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }
       get createStructureIrdDialog(): boolean {
           return this.structureIrdService.createStructureIrdDialog;
       }
      set createStructureIrdDialog(value: boolean) {
        this.structureIrdService.createStructureIrdDialog= value;
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
       get instrumentIrds():Array<InstrumentIrdVo> {
        return this.instrumentIrdService.instrumentIrds;
        }
        set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
        }
        addVieInstitutionnelleDetailInstrumentIrds() {
            if( this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo == null ){
                this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo = new Array<VieInstitutionnelleDetailInstrumentIrdVo>();
            }
            if(!this.isInListInstruments(this.selectedVieInstitutionnelleDetailInstrumentIrds,this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo)){
                this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo.push(this.selectedVieInstitutionnelleDetailInstrumentIrds);
                this.selectedVieInstitutionnelleDetailInstrumentIrds = new VieInstitutionnelleDetailInstrumentIrdVo();
            }   
        }
    
            deleteVieInstitutionnelleDetailInstrumentIrds(p: VieInstitutionnelleDetailInstrumentIrdVo) {
            this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo.forEach((element, index) => {
                if (element === p) { this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo.splice(index, 1); }
            });
        }

        get etablissements():Array<EtablissementVo> {
            return this.etablissementService.etablissements;
        }
        set etablissements(value: Array<EtablissementVo>) {
         this.etablissementService.etablissements = value;
        }
        addVieInstitutionnelleDetailEtablissements() {
            if( this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo == null ){
                this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo = new Array<VieInstitutionnelleDetailEtablissementVo>();
            }
            if(!this.isInListEtablissement(this.selectedVieInstitutionnelleDetailEtablissements,this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo)){
                this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo.push(this.selectedVieInstitutionnelleDetailEtablissements);
                this.selectedVieInstitutionnelleDetailEtablissements = new VieInstitutionnelleDetailEtablissementVo();
             }    
        }
    
            deleteVieInstitutionnelleDetailEtablissements(p: VieInstitutionnelleDetailEtablissementVo) {
                this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo.forEach((element, index) => {
                if (element === p) { this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo.splice(index, 1); }
            });
        }
        isInListEtablissement(element,liste:Array<any>){
            for(let i=0 ;i<liste.length;i++){
                if(liste[i].etablissementVo.id===element.etablissementVo.id){
                    return true;
                }
            }
            return false;
        }
        isInListInstruments(element,liste:Array<any>){
            for(let i=0 ;i<liste.length;i++){
                if(liste[i].instrumentIrdVo.id===element.instrumentIrdVo.id){
                    return true;
                }
            }
            return false;
        }
    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
     get selectedInstrumentIrd(): InstrumentIrdVo {
        return this.instrumentIrdService.selectedInstrumentIrd;
    }
   set selectedInstrumentIrd(value: InstrumentIrdVo) {
     this.instrumentIrdService.selectedInstrumentIrd = value;
    }
    get createInstrumentIrdDialog(): boolean {
        return this.instrumentIrdService.createInstrumentIrdDialog;
    }
   set createInstrumentIrdDialog(value: boolean) {
     this.instrumentIrdService.createInstrumentIrdDialog= value;
    }
    handleChangeCorreleStructure(e) {
        let isChecked = e.checked;
        if(isChecked){
            this.showStructure=true;
        }else{
            this.showStructure=false;
            this.selectedVieInstitutionnelleDetails.structureIrdVo=null;
        }
    }
    handleChangeCorreleInstrumentsIrd(e) {
        let isChecked = e.checked;
        if(isChecked){
            this.showInstrumentsIrd=true;
        }else{
            this.showInstrumentsIrd=false;
            this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo=null;
        }
    }
    isValideVieInstit(){
        if((this.selectedVieInstitutionnelle.tempsEstime!=null && this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo!=null)
        && this.selectedVieInstitutionnelle.campagneVo!=null
        && this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo!=null
        && this.selectedVieInstitutionnelle.chercheurVo!=null
        ){
            return true;
        }else{
            return false;
        }
    }
    isValideDetailVieInstit(){
        console.log(this.showStructure);
        if(this.selectedVieInstitutionnelleDetails.typeInstanceVo!=null
            && ((this.showStructure && this.selectedVieInstitutionnelleDetails.structureIrdVo!=null) || !this.showStructure) 
            && ((this.showInstrumentsIrd && this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailInstrumentIrdsVo!=null) || !this.showInstrumentsIrd) 
            && (this.selectedVieInstitutionnelleDetails.libelle!=null && this.selectedVieInstitutionnelleDetails.libelle!="")
            && (this.selectedVieInstitutionnelleDetails.vieInstitutionnelleDetailEtablissementsVo!=null) 
            ){
                return true;
        }else{
            return false;
        }
    }
    onChangetypeInstances(){
        if(this.selectedVieInstitutionnelleDetails.typeInstanceVo!=null){
            this.selectedVieInstitutionnelleDetails.libelle=this.selectedVieInstitutionnelleDetails.typeInstanceVo.libelle;
        }
    }
}
