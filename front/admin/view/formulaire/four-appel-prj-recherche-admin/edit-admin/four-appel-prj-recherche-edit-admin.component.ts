import {Component, OnInit} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from 'src/app/controller/service/formulaire/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from 'src/app/controller/model/formulaire/FournisseurAppelProjetRecherche.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-fournisseur-appel-projet-recherche-edit-admin',
  templateUrl: './four-appel-prj-recherche-edit-admin.component.html',
  styleUrls: ['./four-appel-prj-recherche-edit-admin.component.css']
})
export class FournisseurAppelProjetRechercheEditAdminComponent implements OnInit {


constructor(private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.fournisseurAppelProjetRechercheService.edit().subscribe(fournisseurAppelProjetRecherche=>{
    const myIndex = this.fournisseurAppelProjetRecherches.findIndex(e => e.id === this.selectedFournisseurAppelProjetRecherche.id);
    this.fournisseurAppelProjetRecherches[myIndex] = this.selectedFournisseurAppelProjetRecherche;
    this.editFournisseurAppelProjetRechercheDialog = false;
    this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();


    }, error => {
        console.log(error);
    });

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
    this.editFournisseurAppelProjetRechercheDialog  = false;
}

// getters and setters

get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

 get selectedFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }

   get editFournisseurAppelProjetRechercheDialog(): boolean {
           return this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog;

       }
    set editFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog = value;
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
