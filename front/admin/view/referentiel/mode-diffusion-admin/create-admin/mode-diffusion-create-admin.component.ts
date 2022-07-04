import {Component, OnInit} from '@angular/core';
import {ModeDiffusionService} from 'src/app/controller/service/referentiel/ModeDiffusion.service';
import {ModeDiffusionVo} from 'src/app/controller/model/referentiel/ModeDiffusion.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {TypeSavoirVo} from 'src/app/controller/model/referentiel/TypeSavoir.model';
import {TypeSavoirService} from 'src/app/controller/service/referentiel/TypeSavoir.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mode-diffusion-create-admin',
  templateUrl: './mode-diffusion-create-admin.component.html',
  styleUrls: ['./mode-diffusion-create-admin.component.css']
})
export class ModeDiffusionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModeDiffusionLibelle = true;
   _validModeDiffusionCode = true;

    _validTypeSavoirLibelle = true;
    _validTypeSavoirCode = true;



constructor(private datePipe: DatePipe, private modeDiffusionService: ModeDiffusionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeSavoirService: TypeSavoirService
) {

}



ngOnInit(): void {

    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
}




private setValidation(value: boolean){
    this.validModeDiffusionLibelle = value;
    this.validModeDiffusionCode = value;
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
     this.modeDiffusionService.save().subscribe(modeDiffusion=>{
      if(modeDiffusion != null){
       this.modeDiffusions.push({...modeDiffusion});
       this.createModeDiffusionDialog = false;
       this.submitted = false;
       this.selectedModeDiffusion = new ModeDiffusionVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Mode diffusion existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModeDiffusionLibelle();
this.validateModeDiffusionCode();

    }

private validateModeDiffusionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModeDiffusion.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModeDiffusionLibelle = false;
        } else {
            this.validModeDiffusionLibelle = true;
        }
    }
private validateModeDiffusionCode(){
        if (this.stringUtilService.isEmpty(this.selectedModeDiffusion.code)) {
            this.errorMessages.push('Code non valide');
            this.validModeDiffusionCode = false;
        } else {
            this.validModeDiffusionCode = true;
        }
    }










       public async openCreateTypeSavoir(typeSavoir: string) {
          const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
         if(isPermistted) {
         this.selectedTypeSavoir = new TypeSavoirVo();
         this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createModeDiffusionDialog  = false;
    this.setValidation(true);
}

get modeDiffusions(): Array<ModeDiffusionVo> {
    return this.modeDiffusionService.modeDiffusions;
       }
set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }

 get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }

   get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;

       }
    set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
       }

       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
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

    get validModeDiffusionLibelle(): boolean {
    return this._validModeDiffusionLibelle;
    }

    set validModeDiffusionLibelle(value: boolean) {
    this._validModeDiffusionLibelle = value;
    }
    get validModeDiffusionCode(): boolean {
    return this._validModeDiffusionCode;
    }

    set validModeDiffusionCode(value: boolean) {
    this._validModeDiffusionCode = value;
    }

    get validTypeSavoirLibelle(): boolean {
    return this._validTypeSavoirLibelle;
    }

    set validTypeSavoirLibelle(value: boolean) {
    this._validTypeSavoirLibelle = value;
    }
    get validTypeSavoirCode(): boolean {
    return this._validTypeSavoirCode;
    }

    set validTypeSavoirCode(value: boolean) {
    this._validTypeSavoirCode = value;
    }

}
