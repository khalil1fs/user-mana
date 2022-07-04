import {Component, OnInit} from '@angular/core';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';
import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

@Component({
  selector: 'app-key-word-edit-admin',
  templateUrl: './key-word-edit-admin.component.html',
  styleUrls: ['./key-word-edit-admin.component.css']
})
export class KeyWordEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validKeyWordLibelleFr = true;
   _validKeyWordLibelleEng = true;
   _validKeyWordCode = true;




constructor(private datePipe: DatePipe, private keyWordService: KeyWordService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validKeyWordLibelleFr = value;
    this.validKeyWordLibelleEng = value;
    this.validKeyWordCode = value;
    }


public edit(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.editWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public editWithShowOption(showList: boolean){
     this.keyWordService.edit().subscribe(keyWord=>{
     const myIndex = this.keyWords.findIndex(e => e.id === this.selectedKeyWord.id);
     this.keyWords[myIndex] = keyWord;
     this.editKeyWordDialog = false;
     this.submitted = false;
     this.selectedKeyWord = new KeyWordVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateKeyWordLibelleFr();
this.validateKeyWordLibelleEng();
this.validateKeyWordCode();

    }

private validateKeyWordLibelleFr(){
        if (this.stringUtilService.isEmpty(this.selectedKeyWord.libelleFr)) {
            this.errorMessages.push('Libelle fr non valide');
            this.validKeyWordLibelleFr = false;
        } else {
            this.validKeyWordLibelleFr = true;
        }
    }
private validateKeyWordLibelleEng(){
        if (this.stringUtilService.isEmpty(this.selectedKeyWord.libelleEng)) {
            this.errorMessages.push('Libelle eng non valide');
            this.validKeyWordLibelleEng = false;
        } else {
            this.validKeyWordLibelleEng = true;
        }
    }
private validateKeyWordCode(){
        if (this.stringUtilService.isEmpty(this.selectedKeyWord.code)) {
            this.errorMessages.push('Code non valide');
            this.validKeyWordCode = false;
        } else {
            this.validKeyWordCode = true;
        }
    }










//openPopup
// methods

hideEditDialog(){
    this.editKeyWordDialog  = false;
    this.setValidation(true);
}

// getters and setters

get keyWords(): Array<KeyWordVo> {
    return this.keyWordService.keyWords;
       }
set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }

 get selectedKeyWord(): KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
    set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }

   get editKeyWordDialog(): boolean {
           return this.keyWordService.editKeyWordDialog;

       }
    set editKeyWordDialog(value: boolean) {
        this.keyWordService.editKeyWordDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatEdit;
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

    get validKeyWordLibelleFr(): boolean {
    return this._validKeyWordLibelleFr;
    }

    set validKeyWordLibelleFr(value: boolean) {
    this._validKeyWordLibelleFr = value;
    }
    get validKeyWordLibelleEng(): boolean {
    return this._validKeyWordLibelleEng;
    }

    set validKeyWordLibelleEng(value: boolean) {
    this._validKeyWordLibelleEng = value;
    }
    get validKeyWordCode(): boolean {
    return this._validKeyWordCode;
    }

    set validKeyWordCode(value: boolean) {
    this._validKeyWordCode = value;
    }

}
