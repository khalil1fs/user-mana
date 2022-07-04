import {Component, OnInit} from '@angular/core';
import {ReclamationService} from 'src/app/controller/service/formulaire/Reclamation.service';
import {ReclamationVo} from 'src/app/controller/model/formulaire/Reclamation.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {TypeReclamationVo} from 'src/app/controller/model/referentiel/TypeReclamation.model';
import {TypeReclamationService} from 'src/app/controller/service/referentiel/TypeReclamation.service';
import {EtatReclamationVo} from 'src/app/controller/model/config/EtatReclamation.model';
import {EtatReclamationService} from 'src/app/controller/service/config/EtatReclamation.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-reclamation-edit-admin',
  templateUrl: './reclamation-edit-admin.component.html',
  styleUrls: ['./reclamation-edit-admin.component.css']
})
export class ReclamationEditAdminComponent implements OnInit {


constructor(private reclamationService: ReclamationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeReclamationService: TypeReclamationService
 ,       private etatReclamationService: EtatReclamationService
 ,       private chercheurService: ChercheurService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedReclamation.dateReclamation = DateUtils.toDate(this.selectedReclamation.dateReclamation);
            this.selectedReclamation.dateTraitement = DateUtils.toDate(this.selectedReclamation.dateTraitement);
    this.reclamationService.edit().subscribe(reclamation=>{
    const myIndex = this.reclamations.findIndex(e => e.id === this.selectedReclamation.id);
    this.reclamations[myIndex] = this.selectedReclamation;
    this.editReclamationDialog = false;
    this.selectedReclamation = new ReclamationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeReclamation(typeReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'add');
                       if(isPermistted){
         this.selectedTypeReclamation = new TypeReclamationVo();
        this.editTypeReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatReclamation(etatReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'add');
                       if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
        this.editEtatReclamationDialog = true;
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
        this.editChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editReclamationDialog  = false;
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation(): ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get editReclamationDialog(): boolean {
           return this.reclamationService.editReclamationDialog;

       }
    set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog = value;
       }

       get selectedTypeReclamation(): TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
      set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
       get typeReclamations(): Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
       set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }
       get editTypeReclamationDialog(): boolean {
           return this.typeReclamationService.editTypeReclamationDialog;
       }
      set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog= value;
       }
       get selectedEtatReclamation(): EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get editEtatReclamationDialog(): boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
      set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
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
       get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
