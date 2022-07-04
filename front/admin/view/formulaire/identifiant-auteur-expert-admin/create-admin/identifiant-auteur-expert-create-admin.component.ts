import {Component, OnInit, Input} from '@angular/core';
import {IdentifiantAuteurExpertService} from 'src/app/controller/service/formulaire/IdentifiantAuteurExpert.service';
import {IdentifiantAuteurExpertVo} from 'src/app/controller/model/formulaire/IdentifiantAuteurExpert.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {IdentifiantRechercheVo} from 'src/app/controller/model/referentiel/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from 'src/app/controller/service/referentiel/IdentifiantRecherche.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-identifiant-auteur-expert-create-admin',
  templateUrl: './identifiant-auteur-expert-create-admin.component.html',
  styleUrls: ['./identifiant-auteur-expert-create-admin.component.css']
})
export class IdentifiantAuteurExpertCreateAdminComponent implements OnInit {

constructor(private identifiantAuteurExpertService: IdentifiantAuteurExpertService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private identifiantRechercheService :IdentifiantRechercheService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

    this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
    this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.identifiantAuteurExpertService.save().subscribe(identifiantAuteurExpert=>{
       this.identifiantAuteurExperts.push({...identifiantAuteurExpert});
       this.createIdentifiantAuteurExpertDialog = false;
       this.selectedIdentifiantAuteurExpert = new IdentifiantAuteurExpertVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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
              public async openCreateidentifiantRecherche(identifiantRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'add');
                       if(isPermistted){
         this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
        this.createIdentifiantRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createIdentifiantAuteurExpertDialog  = false;
}

// getters and setters

get identifiantAuteurExperts(): Array<IdentifiantAuteurExpertVo> {
    return this.identifiantAuteurExpertService.identifiantAuteurExperts;
       }
set identifiantAuteurExperts(value: Array<IdentifiantAuteurExpertVo>) {
        this.identifiantAuteurExpertService.identifiantAuteurExperts = value;
       }

 get selectedIdentifiantAuteurExpert():IdentifiantAuteurExpertVo {
           return this.identifiantAuteurExpertService.selectedIdentifiantAuteurExpert;
       }
    set selectedIdentifiantAuteurExpert(value: IdentifiantAuteurExpertVo) {
        this.identifiantAuteurExpertService.selectedIdentifiantAuteurExpert = value;
       }

   get createIdentifiantAuteurExpertDialog(): boolean {
           return this.identifiantAuteurExpertService.createIdentifiantAuteurExpertDialog;

       }
    set createIdentifiantAuteurExpertDialog(value: boolean) {
        this.identifiantAuteurExpertService.createIdentifiantAuteurExpertDialog= value;
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
       get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches():Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get createIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.createIdentifiantRechercheDialog;
       }
      set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
