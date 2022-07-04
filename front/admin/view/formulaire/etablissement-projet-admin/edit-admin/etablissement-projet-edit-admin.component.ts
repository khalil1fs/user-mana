import {Component, OnInit} from '@angular/core';
import {EtablissementProjetService} from 'src/app/controller/service/formulaire/EtablissementProjet.service';
import {EtablissementProjetVo} from 'src/app/controller/model/formulaire/EtablissementProjet.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-etablissement-projet-edit-admin',
  templateUrl: './etablissement-projet-edit-admin.component.html',
  styleUrls: ['./etablissement-projet-edit-admin.component.css']
})
export class EtablissementProjetEditAdminComponent implements OnInit {


constructor(private etablissementProjetService: EtablissementProjetService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private villeService: VilleService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etablissementProjetService.edit().subscribe(etablissementProjet=>{
    const myIndex = this.etablissementProjets.findIndex(e => e.id === this.selectedEtablissementProjet.id);
    this.etablissementProjets[myIndex] = this.selectedEtablissementProjet;
    this.editEtablissementProjetDialog = false;
    this.selectedEtablissementProjet = new EtablissementProjetVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.editVilleDialog = true;
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
        this.editPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEtablissementProjetDialog  = false;
}

// getters and setters

get etablissementProjets(): Array<EtablissementProjetVo> {
    return this.etablissementProjetService.etablissementProjets;
       }
set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjets = value;
       }

 get selectedEtablissementProjet(): EtablissementProjetVo {
           return this.etablissementProjetService.selectedEtablissementProjet;
       }
    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.selectedEtablissementProjet = value;
       }

   get editEtablissementProjetDialog(): boolean {
           return this.etablissementProjetService.editEtablissementProjetDialog;

       }
    set editEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.editEtablissementProjetDialog = value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog(): boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
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
       get editPaysDialog(): boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
