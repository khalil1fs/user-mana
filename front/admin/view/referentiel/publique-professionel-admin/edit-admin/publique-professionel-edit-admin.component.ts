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
    selector: 'app-publique-professionel-edit-admin',
    templateUrl: './publique-professionel-edit-admin.component.html',
    styleUrls: ['./publique-professionel-edit-admin.component.css']
})
export class PubliqueProfessionelEditAdminComponent implements OnInit {

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


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
        this.validPubliqueProfessionelLibelle = value;
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
        this.publiqueProfessionelService.edit().subscribe(publiqueProfessionel => {
            const myIndex = this.publiqueProfessionels.findIndex(e => e.id === this.selectedPubliqueProfessionel.id);
            this.publiqueProfessionels[myIndex] = publiqueProfessionel;
            this.editPubliqueProfessionelDialog = false;
            this.submitted = false;
            this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
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


//openPopup
// methods

    hideEditDialog() {
        this.editPubliqueProfessionelDialog = false;
        this.setValidation(true);
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

    get editPubliqueProfessionelDialog(): boolean {
        return this.publiqueProfessionelService.editPubliqueProfessionelDialog;

    }

    set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog = value;
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

    get validPubliqueProfessionelLibelle(): boolean {
        return this._validPubliqueProfessionelLibelle;
    }

    set validPubliqueProfessionelLibelle(value: boolean) {
        this._validPubliqueProfessionelLibelle = value;
    }

}
