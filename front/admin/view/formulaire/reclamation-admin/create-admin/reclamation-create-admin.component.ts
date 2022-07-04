import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-reclamation-create-admin',
  templateUrl: './reclamation-create-admin.component.html',
  styleUrls: ['./reclamation-create-admin.component.css']
})
export class ReclamationCreateAdminComponent implements OnInit {

constructor(private reclamationService: ReclamationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private typeReclamationService :TypeReclamationService
  ,       private etatReclamationService :EtatReclamationService
  ,       private chercheurService :ChercheurService
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

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.reclamationService.save().subscribe(reclamation=>{
       this.reclamations.push({...reclamation});
       this.createReclamationDialog = false;
       this.selectedReclamation = new ReclamationVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreatetypeReclamation(typeReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'add');
                       if(isPermistted){
         this.selectedTypeReclamation = new TypeReclamationVo();
        this.createTypeReclamationDialog = true;
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
        this.createEtatReclamationDialog = true;
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

hideCreateDialog(){
    this.createReclamationDialog  = false;
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

   get createReclamationDialog(): boolean {
           return this.reclamationService.createReclamationDialog;

       }
    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
       }

       get selectedTypeReclamation(): TypeReclamationVo {
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
       get createTypeReclamationDialog(): boolean {
           return this.typeReclamationService.createTypeReclamationDialog;
       }
      set createTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.createTypeReclamationDialog= value;
       }
       get selectedEtatReclamation(): EtatReclamationVo {
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
       get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
      set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
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

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
