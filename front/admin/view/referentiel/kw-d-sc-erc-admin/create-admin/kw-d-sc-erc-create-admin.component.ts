import {Component, OnInit} from '@angular/core';
import {KeyWordDisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/KeyWordDisciplineScientifiqueErc.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';

@Component({
  selector: 'app-key-word-discipline-scientifique-erc-create-admin',
  templateUrl: './kw-d-sc-erc-create-admin.component.html',
  styleUrls: ['./kw-d-sc-erc-create-admin.component.css']
})
export class KeyWordDisciplineScientifiqueErcCreateAdminComponent implements OnInit {

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
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
,       private keyWordService: KeyWordService
) {

}



ngOnInit(): void {

    this.selectedKeyWord = new KeyWordVo();
    this.keyWordService.findAll().subscribe((data) => this.keyWords = data);
    this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
    this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
}




private setValidation(value: boolean){
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
     this.keyWordDisciplineScientifiqueErcService.save().subscribe(keyWordDisciplineScientifiqueErc=>{
      if(keyWordDisciplineScientifiqueErc != null){
       this.keyWordDisciplineScientifiqueErcs.push({...keyWordDisciplineScientifiqueErc});
       this.createKeyWordDisciplineScientifiqueErcDialog = false;
       this.submitted = false;
       this.selectedKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Key word discipline scientifique erc existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }










       public async openCreateDisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
          const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'add');
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
          const isPermistted = await this.roleService.isPermitted('KeyWord', 'add');
         if(isPermistted) {
         this.selectedKeyWord = new KeyWordVo();
         this.createKeyWordDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createKeyWordDisciplineScientifiqueErcDialog  = false;
    this.setValidation(true);
}

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

   get createKeyWordDisciplineScientifiqueErcDialog(): boolean {
           return this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog;

       }
    set createKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog= value;
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
