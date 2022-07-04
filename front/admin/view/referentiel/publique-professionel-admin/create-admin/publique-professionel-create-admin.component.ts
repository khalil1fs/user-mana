import {StringUtilService} from 'src/app/controller/service/formulaire/StringUtil.service';

import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import {Component, OnInit} from '@angular/core';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {PubliqueProfessionelVo} from 'src/app/controller/model/referentiel/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from 'src/app/controller/service/referentiel/PubliqueProfessionel.service';

@Component({
    selector: 'app-publique-professionel-create-admin',
    templateUrl: './publique-professionel-create-admin.component.html',
    styleUrls: ['./publique-professionel-create-admin.component.css']
})
export class PubliqueProfessionelCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validPubliqueProfessionelLibelle = true;


    constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validPubliqueProfessionelLibelle = value;
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.publiqueProfessionelService.save().subscribe(publiqueProfessionel => {
            if (publiqueProfessionel != null) {
                this.publiqueProfessionels.push({...publiqueProfessionel});
                this.createPubliqueProfessionelDialog = false;
                this.submitted = false;
                this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Publique professionel existe déjà'});
            }

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validatePubliqueProfessionelLibelle();

    }

    private validatePubliqueProfessionelLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedPubliqueProfessionel.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPubliqueProfessionelLibelle = false;
        } else {
            this.validPubliqueProfessionelLibelle = true;
        }
    }


    hideCreateDialog() {
        this.createPubliqueProfessionelDialog = false;
        this.setValidation(true);
    }

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

    get createPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.createPubliqueProfessionelDialog;

    }

    set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
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

    get validPubliqueProfessionelLibelle(): boolean {
        return this._validPubliqueProfessionelLibelle;
    }

    set validPubliqueProfessionelLibelle(value: boolean) {
        this._validPubliqueProfessionelLibelle = value;
    }


}
