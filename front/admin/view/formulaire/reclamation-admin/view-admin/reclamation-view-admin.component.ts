import {Component, OnInit} from '@angular/core';
import {ReclamationService} from 'src/app/controller/service/formulaire/Reclamation.service';
import {ReclamationVo} from 'src/app/controller/model/formulaire/Reclamation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {EtatReclamationVo} from 'src/app/controller/model/config/EtatReclamation.model';
import {EtatReclamationService} from 'src/app/controller/service/config/EtatReclamation.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-reclamation-view-admin',
  templateUrl: './reclamation-view-admin.component.html',
  styleUrls: ['./reclamation-view-admin.component.css']
})
export class ReclamationViewAdminComponent implements OnInit {


constructor(private reclamationService: ReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeReclamationService :TypeReclamationService
    ,private etatReclamationService :EtatReclamationService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
    this.selectedTypeReclamation = new TypeReclamationVo();
    this.typeReclamationService.findAll().subscribe((data) => this.typeReclamations = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewReclamationDialog  = false;
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get viewReclamationDialog():boolean {
           return this.reclamationService.viewReclamationDialog;

       }
    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog= value;
       }

       get selectedTypeReclamation():TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
      set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
       get typeReclamations():Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
       set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }
       get editTypeReclamationDialog():boolean {
           return this.typeReclamationService.editTypeReclamationDialog;
       }
      set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog= value;
       }
       get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations():Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get editEtatReclamationDialog():boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
      set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
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
