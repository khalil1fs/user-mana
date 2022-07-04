import {Component, OnInit} from '@angular/core';
import {KeyWordService} from 'src/app/controller/service/referentiel/KeyWord.service';
import {KeyWordVo} from 'src/app/controller/model/referentiel/KeyWord.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-key-word-view-admin',
  templateUrl: './key-word-view-admin.component.html',
  styleUrls: ['./key-word-view-admin.component.css']
})
export class KeyWordViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private keyWordService: KeyWordService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewKeyWordDialog  = false;
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

   get viewKeyWordDialog(): boolean {
           return this.keyWordService.viewKeyWordDialog;

       }
    set viewKeyWordDialog(value: boolean) {
        this.keyWordService.viewKeyWordDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
