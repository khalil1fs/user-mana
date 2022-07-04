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
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/referentiel/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/referentiel/DisciplineScientifiqueErc.model';

@Component({
  selector: 'app-key-word-discipline-scientifique-erc-view-admin',
  templateUrl: './kw-d-sc-erc-view-admin.component.html',
  styleUrls: ['./kw-d-sc-erc-view-admin.component.css']
})
export class KeyWordDisciplineScientifiqueErcViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private keyWordService: KeyWordService
    ,private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
) {
}

// methods
ngOnInit(): void {
    this.selectedKeyWord = new KeyWordVo();
    this.keyWordService.findAll().subscribe((data) => this.keyWords = data);
    this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
    this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
}

hideViewDialog(){
    this.viewKeyWordDisciplineScientifiqueErcDialog  = false;
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

   get viewKeyWordDisciplineScientifiqueErcDialog(): boolean {
           return this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog;

       }
    set viewKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog= value;
       }

       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs():Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get editDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;
       }
      set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog= value;
       }
       get selectedKeyWord(): KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
      set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }
       get keyWords():Array<KeyWordVo> {
           return this.keyWordService.keyWords;
       }
       set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }
       get editKeyWordDialog(): boolean {
           return this.keyWordService.editKeyWordDialog;
       }
      set editKeyWordDialog(value: boolean) {
        this.keyWordService.editKeyWordDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
