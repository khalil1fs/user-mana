import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from 'src/app/controller/service/formulaire/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from 'src/app/controller/model/formulaire/EncadrementEtudiant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {DisciplineScientifiqueVo} from 'src/app/controller/model/referentiel/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/referentiel/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from 'src/app/controller/model/config/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from 'src/app/controller/service/config/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/referentiel/EnjeuxIrd.model';
import {EnjeuxIrdService} from 'src/app/controller/service/referentiel/EnjeuxIrd.service';
import {ResponsabiliteEncadrementEtudiantVo} from 'src/app/controller/model/referentiel/ResponsabiliteEncadrementEtudiant.model';
import {ResponsabiliteEncadrementEtudiantService} from 'src/app/controller/service/referentiel/ResponsabiliteEncadrementEtudiant.service';
import {EncadrementVo} from 'src/app/controller/model/formulaire/Encadrement.model';
import {EncadrementService} from 'src/app/controller/service/formulaire/Encadrement.service';
import {EncadrementEtudiantEnjeuxIrdVo} from 'src/app/controller/model/formulaire/EncadrementEtudiantEnjeuxIrd.model';
import {EncadrementEtudiantEnjeuxIrdService} from 'src/app/controller/service/formulaire/EncadrementEtudiantEnjeuxIrd.service';
import {NiveauFormationPostBacVo} from 'src/app/controller/model/referentiel/NiveauFormationPostBac.model';
import {NiveauFormationPostBacService} from 'src/app/controller/service/referentiel/NiveauFormationPostBac.service';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {EncadrementEtudiantDisciplineScientifiqueVo} from 'src/app/controller/model/formulaire/EncadrementEtudiantDisciplineScientifique.model';
import {EncadrementEtudiantDisciplineScientifiqueService} from 'src/app/controller/service/formulaire/EncadrementEtudiantDisciplineScientifique.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-encadrement-etudiant-edit-admin',
  templateUrl: './encadrement-etudiant-edit-admin.component.html',
  styleUrls: ['./encadrement-etudiant-edit-admin.component.css']
})
export class EncadrementEtudiantEditAdminComponent implements OnInit {

        selectedEncadrementEtudiantEnjeuxIrds: EncadrementEtudiantEnjeuxIrdVo = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrdsListe: Array<EncadrementEtudiantEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedEncadrementEtudiantDisciplineScientifiques: EncadrementEtudiantDisciplineScientifiqueVo = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifiquesListe: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private encadrementEtudiantService: EncadrementEtudiantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private responsabiliteEncadrementEtudiantService: ResponsabiliteEncadrementEtudiantService
 ,       private encadrementService: EncadrementService
 ,       private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService
 ,       private niveauFormationPostBacService: NiveauFormationPostBacService
 ,       private etablissementService: EtablissementService
 ,       private encadrementEtudiantDisciplineScientifiqueService: EncadrementEtudiantDisciplineScientifiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedEncadrementEtudiantEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedEncadrementEtudiantDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
    this.niveauFormationPostBacService.findAll().subscribe((data) => this.niveauFormationPostBacs = data);
    this.selectedResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();
    this.responsabiliteEncadrementEtudiantService.findAll().subscribe((data) => this.responsabiliteEncadrementEtudiants = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEncadrement = new EncadrementVo();
    this.encadrementService.findAll().subscribe((data) => this.encadrements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
       addencadrementEtudiantEnjeuxIrds() {
        if( this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo == null ){
            this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo = new Array<EncadrementEtudiantEnjeuxIrdVo>();
        }
        this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.push(this.selectedEncadrementEtudiantEnjeuxIrds);
        this.selectedEncadrementEtudiantEnjeuxIrds = new EncadrementEtudiantEnjeuxIrdVo();
        }

        deleteEncadrementEtudiantEnjeuxIrds(p: EncadrementEtudiantEnjeuxIrdVo) {
        this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.splice(index, 1); }
        });
    }
       addencadrementEtudiantDisciplineScientifiques() {
        if( this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo == null ){
            this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo = new Array<EncadrementEtudiantDisciplineScientifiqueVo>();
        }
        this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.push(this.selectedEncadrementEtudiantDisciplineScientifiques);
        this.selectedEncadrementEtudiantDisciplineScientifiques = new EncadrementEtudiantDisciplineScientifiqueVo();
        }

        deleteEncadrementEtudiantDisciplineScientifiques(p: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.encadrementEtudiantService.edit().subscribe(encadrementEtudiant=>{
    const myIndex = this.encadrementEtudiants.findIndex(e => e.id === this.selectedEncadrementEtudiant.id);
    this.encadrementEtudiants[myIndex] = this.selectedEncadrementEtudiant;
    this.editEncadrementEtudiantDialog = false;
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();


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
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateniveauFormationPostBac(niveauFormationPostBac: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'add');
                       if(isPermistted){
         this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
        this.createNiveauFormationPostBacDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateresponsabiliteEncadrementEtudiant(responsabiliteEncadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedResponsabiliteEncadrementEtudiant = new ResponsabiliteEncadrementEtudiantVo();
        this.createResponsabiliteEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateencadrement(encadrement: string) {
                      const isPermistted = await this.roleService.isPermitted('Encadrement', 'add');
                       if(isPermistted){
         this.selectedEncadrement = new EncadrementVo();
        this.createEncadrementDialog = true;
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

hideEditDialog(){
    this.editEncadrementEtudiantDialog  = false;
}

// getters and setters

get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    return this.encadrementEtudiantService.encadrementEtudiants;
       }
set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

 get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }

   get editEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.editEncadrementEtudiantDialog;

       }
    set editEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.editEncadrementEtudiantDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
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
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
      set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
       get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
       set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }
       get createNiveauFormationPostBacDialog(): boolean {
           return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;
       }
      set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog= value;
       }
       get selectedResponsabiliteEncadrementEtudiant(): ResponsabiliteEncadrementEtudiantVo {
           return this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant;
       }
      set selectedResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant = value;
       }
       get responsabiliteEncadrementEtudiants(): Array<ResponsabiliteEncadrementEtudiantVo> {
           return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants;
       }
       set responsabiliteEncadrementEtudiants(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants = value;
       }
       get createResponsabiliteEncadrementEtudiantDialog(): boolean {
           return this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog;
       }
      set createResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.createResponsabiliteEncadrementEtudiantDialog= value;
       }
       get selectedEncadrement(): EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
      set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
       get encadrements(): Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
       set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }
       get createEncadrementDialog(): boolean {
           return this.encadrementService.createEncadrementDialog;
       }
      set createEncadrementDialog(value: boolean) {
        this.encadrementService.createEncadrementDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
