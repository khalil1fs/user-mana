import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirChercheurService} from 'src/app/controller/service/formulaire/CommunauteSavoirChercheur.service';
import {CommunauteSavoirChercheurVo} from 'src/app/controller/model/formulaire/CommunauteSavoirChercheur.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {CommunauteSavoirVo} from 'src/app/controller/model/referentiel/CommunauteSavoir.model';
import {CommunauteSavoirService} from 'src/app/controller/service/referentiel/CommunauteSavoir.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-communaute-savoir-chercheur-create-admin',
  templateUrl: './cosav-chercheur-create-admin.html',
  styleUrls: ['./cosav-chercheur-create-admin.css']
})
export class CommunauteSavoirChercheurCreateAdminComponent implements OnInit {

constructor(private communauteSavoirChercheurService: CommunauteSavoirChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private communauteSavoirService :CommunauteSavoirService
  ,       private chercheurService :ChercheurService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.communauteSavoirChercheurService.save().subscribe(communauteSavoirChercheur=>{
       this.communauteSavoirChercheurs.push({...communauteSavoirChercheur});
       this.createCommunauteSavoirChercheurDialog = false;
       this.selectedCommunauteSavoirChercheur = new CommunauteSavoirChercheurVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
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
    this.createCommunauteSavoirChercheurDialog  = false;
}

// getters and setters

get communauteSavoirChercheurs(): Array<CommunauteSavoirChercheurVo> {
    return this.communauteSavoirChercheurService.communauteSavoirChercheurs;
       }
set communauteSavoirChercheurs(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurs = value;
       }

 get selectedCommunauteSavoirChercheur():CommunauteSavoirChercheurVo {
           return this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur;
       }
    set selectedCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur = value;
       }

   get createCommunauteSavoirChercheurDialog(): boolean {
           return this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog;

       }
    set createCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog= value;
       }

       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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
