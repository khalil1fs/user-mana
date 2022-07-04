import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';
import {KeyWordDisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/KeyWordDisciplineScientifiqueErc.model';

@Component({
    selector: 'app-discipline-scientifique-erc-view-admin',
    templateUrl: './discipline-scientifique-erc-view-admin.component.html',
    styleUrls: ['./discipline-scientifique-erc-view-admin.component.css']
})
export class DisciplineScientifiqueErcViewAdminComponent implements OnInit {

    selectedKeyWordDisciplineScientifiqueErcs: KeyWordDisciplineScientifiqueErcVo = new KeyWordDisciplineScientifiqueErcVo();
    keyWordDisciplineScientifiqueErcsListe: Array<KeyWordDisciplineScientifiqueErcVo> = [];

    myKeyWords: Array<KeyWordVo> = [];


    constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
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

    hideViewDialog() {
        this.viewDisciplineScientifiqueErcDialog = false;
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

    get viewDisciplineScientifiqueErcDialog(): boolean {
        return this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog;

    }

    set viewDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog = value;
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

    get editKeyWordDialog(): boolean {
        return this.keyWordService.editKeyWordDialog;
    }

    set editKeyWordDialog(value: boolean) {
        this.keyWordService.editKeyWordDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
