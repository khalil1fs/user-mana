import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from 'src/app/controller/service/formulaire/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from 'src/app/controller/model/formulaire/EncadrementEtudiant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

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
  selector: 'app-encadrement-etudiant-view-admin',
  templateUrl: './encadrement-etudiant-view-admin.component.html',
  styleUrls: ['./encadrement-etudiant-view-admin.component.css']
})
export class EncadrementEtudiantViewAdminComponent implements OnInit {

        selectedEncadrementEtudiantEnjeuxIrds: EncadrementEtudiantEnjeuxIrdVo = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrdsListe: Array<EncadrementEtudiantEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedEncadrementEtudiantDisciplineScientifiques: EncadrementEtudiantDisciplineScientifiqueVo = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifiquesListe: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private encadrementEtudiantService: EncadrementEtudiantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private responsabiliteEncadrementEtudiantService :ResponsabiliteEncadrementEtudiantService
    ,private encadrementService :EncadrementService
    ,private encadrementEtudiantEnjeuxIrdService :EncadrementEtudiantEnjeuxIrdService
    ,private niveauFormationPostBacService :NiveauFormationPostBacService
    ,private etablissementService :EtablissementService
    ,private encadrementEtudiantDisciplineScientifiqueService :EncadrementEtudiantDisciplineScientifiqueService
    ,private paysService :PaysService
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

hideViewDialog(){
    this.viewEncadrementEtudiantDialog  = false;
}

// getters and setters

get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    return this.encadrementEtudiantService.encadrementEtudiants;
       }
set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

 get selectedEncadrementEtudiant():EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }

   get viewEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.viewEncadrementEtudiantDialog;

       }
    set viewEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.viewEncadrementEtudiantDialog= value;
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
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedNiveauFormationPostBac():NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
      set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
       get niveauFormationPostBacs():Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
       set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }
       get editNiveauFormationPostBacDialog():boolean {
           return this.niveauFormationPostBacService.editNiveauFormationPostBacDialog;
       }
      set editNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.editNiveauFormationPostBacDialog= value;
       }
       get selectedResponsabiliteEncadrementEtudiant():ResponsabiliteEncadrementEtudiantVo {
           return this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant;
       }
      set selectedResponsabiliteEncadrementEtudiant(value: ResponsabiliteEncadrementEtudiantVo) {
        this.responsabiliteEncadrementEtudiantService.selectedResponsabiliteEncadrementEtudiant = value;
       }
       get responsabiliteEncadrementEtudiants():Array<ResponsabiliteEncadrementEtudiantVo> {
           return this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants;
       }
       set responsabiliteEncadrementEtudiants(value: Array<ResponsabiliteEncadrementEtudiantVo>) {
        this.responsabiliteEncadrementEtudiantService.responsabiliteEncadrementEtudiants = value;
       }
       get editResponsabiliteEncadrementEtudiantDialog():boolean {
           return this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog;
       }
      set editResponsabiliteEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteEncadrementEtudiantService.editResponsabiliteEncadrementEtudiantDialog= value;
       }
       get selectedEncadrement():EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
      set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
       get encadrements():Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
       set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }
       get editEncadrementDialog():boolean {
           return this.encadrementService.editEncadrementDialog;
       }
      set editEncadrementDialog(value: boolean) {
        this.encadrementService.editEncadrementDialog= value;
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
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
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
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
