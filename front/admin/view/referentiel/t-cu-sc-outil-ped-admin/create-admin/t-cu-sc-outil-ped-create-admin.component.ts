import {Component, OnInit} from '@angular/core';
import {
    TypeOutilCultureScientifiqueOutilPedagogiqueService
} from 'src/app/controller/service/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.service';
import {
    TypeOutilCultureScientifiqueOutilPedagogiqueVo
} from 'src/app/controller/model/formulaire/TypeOutilCultureScientifiqueOutilPedagogique.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {TypeOutilVo} from 'src/app/controller/model/referentiel/TypeOutil.model';
import {TypeOutilService} from 'src/app/controller/service/referentiel/TypeOutil.service';
import {CultureScientifiqueOutilPedagogiqueVo} from 'src/app/controller/model/formulaire/CultureScientifiqueOutilPedagogique.model';
import {
    CultureScientifiqueOutilPedagogiqueService
} from 'src/app/controller/service/formulaire/CultureScientifiqueOutilPedagogique.service';

@Component({
    selector: 'app-type-outil-culture-scientifique-outil-pedagogique-create-admin',
    templateUrl: './t-cu-sc-outil-ped-create-admin.component.html',
    styleUrls: ['./t-cu-sc-outil-ped-create-admin.component.css']
})
export class TypeOutilCultureScientifiqueOutilPedagogiqueCreateAdminComponent implements OnInit {

    constructor(private typeOutilCultureScientifiqueOutilPedagogiqueService: TypeOutilCultureScientifiqueOutilPedagogiqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private typeOutilService: TypeOutilService
        , private cultureScientifiqueOutilPedagogiqueService: CultureScientifiqueOutilPedagogiqueService
    ) {

    }

    get typeOutilCultureScientifiqueOutilPedagogiques(): Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo> {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiques;
    }

    set typeOutilCultureScientifiqueOutilPedagogiques(value: Array<TypeOutilCultureScientifiqueOutilPedagogiqueVo>) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.typeOutilCultureScientifiqueOutilPedagogiques = value;
    }

    get selectedTypeOutilCultureScientifiqueOutilPedagogique(): TypeOutilCultureScientifiqueOutilPedagogiqueVo {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.selectedTypeOutilCultureScientifiqueOutilPedagogique;
    }

    set selectedTypeOutilCultureScientifiqueOutilPedagogique(value: TypeOutilCultureScientifiqueOutilPedagogiqueVo) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.selectedTypeOutilCultureScientifiqueOutilPedagogique = value;
    }

    get createTypeOutilCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.typeOutilCultureScientifiqueOutilPedagogiqueService.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog;

    }

// methods

    set createTypeOutilCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = value;
    }

// getters and setters

    get selectedTypeOutil(): TypeOutilVo {
        return this.typeOutilService.selectedTypeOutil;
    }

    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
    }

    get typeOutils(): Array<TypeOutilVo> {
        return this.typeOutilService.typeOutils;
    }

    set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
    }

    get createTypeOutilDialog(): boolean {
        return this.typeOutilService.createTypeOutilDialog;
    }

    set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog = value;
    }

    get selectedCultureScientifiqueOutilPedagogique(): CultureScientifiqueOutilPedagogiqueVo {
        return this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique;
    }

    set selectedCultureScientifiqueOutilPedagogique(value: CultureScientifiqueOutilPedagogiqueVo) {
        this.cultureScientifiqueOutilPedagogiqueService.selectedCultureScientifiqueOutilPedagogique = value;
    }

    get cultureScientifiqueOutilPedagogiques(): Array<CultureScientifiqueOutilPedagogiqueVo> {
        return this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques;
    }

    set cultureScientifiqueOutilPedagogiques(value: Array<CultureScientifiqueOutilPedagogiqueVo>) {
        this.cultureScientifiqueOutilPedagogiqueService.cultureScientifiqueOutilPedagogiques = value;
    }

    get createCultureScientifiqueOutilPedagogiqueDialog(): boolean {
        return this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog;
    }

    set createCultureScientifiqueOutilPedagogiqueDialog(value: boolean) {
        this.cultureScientifiqueOutilPedagogiqueService.createCultureScientifiqueOutilPedagogiqueDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

// methods
    ngOnInit(): void {

        this.selectedCultureScientifiqueOutilPedagogique = new CultureScientifiqueOutilPedagogiqueVo();
        this.cultureScientifiqueOutilPedagogiqueService.findAll().subscribe((data) => this.cultureScientifiqueOutilPedagogiques = data);
        this.selectedTypeOutil = new TypeOutilVo();
        this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
    }

    public save() {
        this.saveWithShowOption(false);
    }

    public saveWithShowOption(showList: boolean) {
        this.typeOutilCultureScientifiqueOutilPedagogiqueService.save().subscribe(typeOutilCultureScientifiqueOutilPedagogique => {
            this.typeOutilCultureScientifiqueOutilPedagogiques.push({...typeOutilCultureScientifiqueOutilPedagogique});
            this.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = false;
            this.selectedTypeOutilCultureScientifiqueOutilPedagogique = new TypeOutilCultureScientifiqueOutilPedagogiqueVo();


        }, error => {
            console.log(error);
        });

    }

//openPopup
    public async openCreatetypeOutil(typeOutil: string) {
        const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
        if (isPermistted) {
            this.selectedTypeOutil = new TypeOutilVo();
            this.createTypeOutilDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatecultureScientifiqueOutilPedagogique(cultureScientifiqueOutilPedagogique: string) {
        const isPermistted = await this.roleService.isPermitted('CultureScientifiqueOutilPedagogique', 'add');
        if (isPermistted) {
            this.selectedCultureScientifiqueOutilPedagogique = new CultureScientifiqueOutilPedagogiqueVo();
            this.createCultureScientifiqueOutilPedagogiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createTypeOutilCultureScientifiqueOutilPedagogiqueDialog = false;
    }
}
