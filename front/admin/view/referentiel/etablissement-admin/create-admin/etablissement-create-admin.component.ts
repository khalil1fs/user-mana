import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EtablissementService} from 'src/app/controller/service/referentiel/Etablissement.service';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {VilleService} from 'src/app/controller/service/referentiel/Ville.service';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {VilleVo} from 'src/app/controller/model/referentiel/Ville.model';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {EtablissementVo} from 'src/app/controller/model/referentiel/Etablissement.model';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
  selector: 'app-etablissement-create-admin',
  templateUrl: './etablissement-create-admin.component.html',
  styleUrls: ['./etablissement-create-admin.component.css']
})
export class EtablissementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtablissementLibelle = true;
   _validEtablissementCode = true;

    _validVilleLibelle = true;
    _validVilleCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private etablissementService: EtablissementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private villeService: VilleService
,       private paysService: PaysService
) {

}



ngOnInit(): void {

    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}




private setValidation(value: boolean){
    this.validEtablissementLibelle = value;
    this.validEtablissementCode = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.etablissementService.save().subscribe(etablissement=>{
      if(etablissement != null){
       this.etablissements.push({...etablissement});
       this.createEtablissementDialog = false;
       this.submitted = false;
       this.selectedEtablissement = new EtablissementVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Etablissement existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtablissementLibelle();
this.validateEtablissementCode();

    }

private validateEtablissementLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtablissementLibelle = false;
        } else {
            this.validEtablissementLibelle = true;
        }
    }
private validateEtablissementCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissement.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtablissementCode = false;
        } else {
            this.validEtablissementCode = true;
        }
    }


















       public async openCreateVille(ville: string) {
          const isPermistted = await this.roleService.isPermitted('Ville', 'add');
         if(isPermistted) {
         this.selectedVille = new VilleVo();
         this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreatePays(pays: string) {
          const isPermistted = await this.roleService.isPermitted('Pays', 'add');
         if(isPermistted) {
         this.selectedPays = new PaysVo();
         this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createEtablissementDialog  = false;
    this.setValidation(true);
}

get etablissements(): Array<EtablissementVo> {
    return this.etablissementService.etablissements;
       }
set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }

 get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
    set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }

   get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;

       }
    set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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
       get payss(): Array<PaysVo> {
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
            return environment.dateFormatCreate;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }
    get validEtablissementCode(): boolean {
    return this._validEtablissementCode;
    }

    set validEtablissementCode(value: boolean) {
    this._validEtablissementCode = value;
    }

    get validVilleLibelle(): boolean {
    return this._validVilleLibelle;
    }

    set validVilleLibelle(value: boolean) {
    this._validVilleLibelle = value;
    }
    get validVilleCode(): boolean {
    return this._validVilleCode;
    }

    set validVilleCode(value: boolean) {
    this._validVilleCode = value;
    }
    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }

}
