import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {DatePipe} from '@angular/common';


import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';
import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/KeyWordDisciplineScientifiqueErc.model';
import {KeyWordDisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';
import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';

@Component({
    selector: 'app-discipline-scientifique-erc-edit-admin',
    templateUrl: './discipline-scientifique-erc-edit-admin.component.html',
    styleUrls: ['./discipline-scientifique-erc-edit-admin.component.css']
})
export class DisciplineScientifiqueErcEditAdminComponent implements OnInit {

    selectedKeyWordDisciplineScientifiqueErcs: KeyWordDisciplineScientifiqueErcVo = new KeyWordDisciplineScientifiqueErcVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

    _validDisciplineScientifiqueErcLibelleFr = true;
    _validDisciplineScientifiqueErcLibelleEng = true;
    _validDisciplineScientifiqueErcCode = true;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService
        , private keyWordService: KeyWordService
    ) {

    }


// methods
    ngOnInit(): void {


        this.selectedKeyWordDisciplineScientifiqueErcs.keyWordVo = new KeyWordVo();
        this.keyWordService.findAll().subscribe((data) => this.keyWords = data);


    }


    validateKeyWordDisciplineScientifiqueErcs() {
        this.errorMessages = new Array();
    }


    private setValidation(value: boolean) {
        this.validDisciplineScientifiqueErcLibelleFr = value;
        this.validDisciplineScientifiqueErcLibelleEng = value;
        this.validDisciplineScientifiqueErcCode = value;
    }

    addKeyWordDisciplineScientifiqueErcs() {
        if (this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo == null) {
            this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo = new Array<KeyWordDisciplineScientifiqueErcVo>();
        }
        this.validateKeyWordDisciplineScientifiqueErcs();
        if (this.errorMessages.length === 0) {
            this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.push(this.selectedKeyWordDisciplineScientifiqueErcs);
            this.selectedKeyWordDisciplineScientifiqueErcs = new KeyWordDisciplineScientifiqueErcVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteKeyWordDisciplineScientifiqueErcs(p: KeyWordDisciplineScientifiqueErcVo) {
        this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.splice(index, 1);
            }
        });
    }

    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public editWithShowOption(showList: boolean) {
        this.disciplineScientifiqueErcService.edit().subscribe(disciplineScientifiqueErc => {
            const myIndex = this.disciplineScientifiqueErcs.findIndex(e => e.id === this.selectedDisciplineScientifiqueErc.id);
            this.disciplineScientifiqueErcs[myIndex] = disciplineScientifiqueErc;
            this.editDisciplineScientifiqueErcDialog = false;
            this.submitted = false;
            this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateDisciplineScientifiqueErcLibelleFr();
        this.validateDisciplineScientifiqueErcLibelleEng();
        this.validateDisciplineScientifiqueErcCode();

    }

    private validateDisciplineScientifiqueErcLibelleFr() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueErc.libelleFr)) {
            this.errorMessages.push('Libelle fr non valide');
            this.validDisciplineScientifiqueErcLibelleFr = false;
        } else {
            this.validDisciplineScientifiqueErcLibelleFr = true;
        }
    }

    private validateDisciplineScientifiqueErcLibelleEng() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueErc.libelleEng)) {
            this.errorMessages.push('Libelle eng non valide');
            this.validDisciplineScientifiqueErcLibelleEng = false;
        } else {
            this.validDisciplineScientifiqueErcLibelleEng = true;
        }
    }

    private validateDisciplineScientifiqueErcCode() {
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueErc.code)) {
            this.errorMessages.push('Code non valide');
            this.validDisciplineScientifiqueErcCode = false;
        } else {
            this.validDisciplineScientifiqueErcCode = true;
        }
    }


//openPopup
    public async openCreateKeyWord(keyWord: string) {
        const isPermistted = await this.roleService.isPermitted('KeyWord', 'edit');
        if (isPermistted) {
            this.selectedKeyWord = new KeyWordVo();
            this.createKeyWordDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editDisciplineScientifiqueErcDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
        return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
    }

    set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
    }

    get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
        return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
    }

    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
    }

    get editDisciplineScientifiqueErcDialog(): boolean {
        return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;

    }

    set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog = value;
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
        this.keyWordService.createKeyWordDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
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
