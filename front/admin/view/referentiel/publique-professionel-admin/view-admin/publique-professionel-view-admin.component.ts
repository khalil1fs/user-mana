import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {PubliqueProfessionelVo} from 'src/app/controller/model/referentiel/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from 'src/app/controller/service/referentiel/PubliqueProfessionel.service';

@Component({
    selector: 'app-publique-professionel-view-admin',
    templateUrl: './publique-professionel-view-admin.component.html',
    styleUrls: ['./publique-professionel-view-admin.component.css']
})
export class PubliqueProfessionelViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewPubliqueProfessionelDialog = false;
    }

// getters and setters

    get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
        return this.publiqueProfessionelService.publiqueProfessionels;
    }

    set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
    }

    get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
        return this.publiqueProfessionelService.selectedPubliqueProfessionel;
    }

    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
    }

    get viewPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.viewPubliqueProfessionelDialog;

    }

    set viewPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.viewPubliqueProfessionelDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
