import {Component, OnInit, Input} from '@angular/core';
import {EtablissementProjetService} from 'src/app/controller/service/formulaire/EtablissementProjet.service';
import {EtablissementProjetVo} from 'src/app/controller/model/formulaire/EtablissementProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-etablissement-projet-create-admin',
  templateUrl: './etablissement-projet-create-admin.component.html',
  styleUrls: ['./etablissement-projet-create-admin.component.css']
})
export class EtablissementProjetCreateAdminComponent implements OnInit {

constructor(private etablissementProjetService: EtablissementProjetService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private villeService :VilleService
  ,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.etablissementProjetService.save().subscribe(etablissementProjet=>{
       this.etablissementProjets.push({...etablissementProjet});
       this.createEtablissementProjetDialog = false;
       this.selectedEtablissementProjet = new EtablissementProjetVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
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
// methods

hideCreateDialog(){
    this.createEtablissementProjetDialog  = false;
}

// getters and setters

get etablissementProjets(): Array<EtablissementProjetVo> {
    return this.etablissementProjetService.etablissementProjets;
       }
set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjets = value;
       }

 get selectedEtablissementProjet():EtablissementProjetVo {
           return this.etablissementProjetService.selectedEtablissementProjet;
       }
    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.selectedEtablissementProjet = value;
       }

   get createEtablissementProjetDialog(): boolean {
           return this.etablissementProjetService.createEtablissementProjetDialog;

       }
    set createEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.createEtablissementProjetDialog= value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
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

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
