import {Component, OnInit} from '@angular/core';
import {KeyWordDisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/KeyWordDisciplineScientifiqueErc.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';

import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';

@Component({
  selector: 'app-key-word-discipline-scientifique-erc-edit-admin',
  templateUrl: './kw-d-sc-erc-edit-admin.component.html',
  styleUrls: ['./kw-d-sc-erc-edit-admin.component.css']
})
export class KeyWordDisciplineScientifiqueErcEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validKeyWordLibelleFr = true;
    _validKeyWordLibelleEng = true;
    _validKeyWordCode = true;
    _validDisciplineScientifiqueErcLibelleFr = true;
    _validDisciplineScientifiqueErcLibelleEng = true;
    _validDisciplineScientifiqueErcCode = true;



constructor(private datePipe: DatePipe, private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
,       private keyWordService: KeyWordService
) {

}


// methods
ngOnInit(): void {

    this.selectedKeyWord = new KeyWordVo();
    this.keyWordService.findAll().subscribe((data) => this.keyWords = data);
    this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
    this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
}




private setValidation(value : boolean){
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
     this.keyWordDisciplineScientifiqueErcService.edit().subscribe(keyWordDisciplineScientifiqueErc=>{
     const myIndex = this.keyWordDisciplineScientifiqueErcs.findIndex(e => e.id === this.selectedKeyWordDisciplineScientifiqueErc.id);
     this.keyWordDisciplineScientifiqueErcs[myIndex] = keyWordDisciplineScientifiqueErc;
     this.editKeyWordDisciplineScientifiqueErcDialog = false;
     this.submitted = false;
     this.selectedKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }










//openPopup
      public async openCreateDisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'edit');
        if(isPermistted) {
         this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
         this.createDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateKeyWord(keyWord: string) {
        const isPermistted = await this.roleService.isPermitted('KeyWord', 'edit');
        if(isPermistted) {
         this.selectedKeyWord = new KeyWordVo();
         this.createKeyWordDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editKeyWordDisciplineScientifiqueErcDialog  = false;
    this.setValidation(true);
}

// getters and setters

get keyWordDisciplineScientifiqueErcs(): Array<KeyWordDisciplineScientifiqueErcVo> {
    return this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs;
       }
set keyWordDisciplineScientifiqueErcs(value: Array<KeyWordDisciplineScientifiqueErcVo>) {
        this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs = value;
       }

 get selectedKeyWordDisciplineScientifiqueErc(): KeyWordDisciplineScientifiqueErcVo {
           return this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc;
       }
    set selectedKeyWordDisciplineScientifiqueErc(value: KeyWordDisciplineScientifiqueErcVo) {
        this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc = value;
       }

   get editKeyWordDisciplineScientifiqueErcDialog(): boolean {
           return this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog;

       }
    set editKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog= value;
       }

       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get createDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
       }
      set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog= value;
       }
       get selectedKeyWord(): KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
      set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }
       get keyWords(): Array<KeyWordVo> {
           return this.keyWordService.keyWords;
       }
       set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }
       get createKeyWordDialog(): boolean {
           return this.keyWordService.createKeyWordDialog;
       }
      set createKeyWordDialog(value: boolean) {
        this.keyWordService.createKeyWordDialog= value;
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
    get validDisciplineScientifiqueErcLibelleFr(): boolean {
    return this._validDisciplineScientifiqueErcLibelleFr;
    }

    set validDisciplineScientifiqueErcLibelleFr(value: boolean) {
    this._validDisciplineScientifiqueErcLibelleFr = value;
    }
    get validDisciplineScientifiqueErcLibelleEng(): boolean {
    return this._validDisciplineScientifiqueErcLibelleEng;
    }

    set validDisciplineScientifiqueErcLibelleEng(value: boolean) {
    this._validDisciplineScientifiqueErcLibelleEng = value;
    }
    get validDisciplineScientifiqueErcCode(): boolean {
    return this._validDisciplineScientifiqueErcCode;
    }

    set validDisciplineScientifiqueErcCode(value: boolean) {
    this._validDisciplineScientifiqueErcCode = value;
    }
}
