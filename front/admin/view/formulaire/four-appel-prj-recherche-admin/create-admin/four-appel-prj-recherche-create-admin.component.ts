import {Component, OnInit, Input} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from 'src/app/controller/service/formulaire/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from 'src/app/controller/model/formulaire/FournisseurAppelProjetRecherche.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-fournisseur-appel-projet-recherche-create-admin',
  templateUrl: './four-appel-prj-recherche-create-admin.component.html',
  styleUrls: ['./four-appel-prj-recherche-create-admin.component.css']
})
export class FournisseurAppelProjetRechercheCreateAdminComponent implements OnInit {

constructor(private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.fournisseurAppelProjetRechercheService.save().subscribe(fournisseurAppelProjetRecherche=>{
       this.fournisseurAppelProjetRecherches.push({...fournisseurAppelProjetRecherche});
       this.createFournisseurAppelProjetRechercheDialog = false;
       this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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
    this.createFournisseurAppelProjetRechercheDialog  = false;
}

// getters and setters

get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

 get selectedFournisseurAppelProjetRecherche():FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }

   get createFournisseurAppelProjetRechercheDialog(): boolean {
           return this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog;

       }
    set createFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog= value;
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
