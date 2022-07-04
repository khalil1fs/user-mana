import { Component, Input, OnInit } from '@angular/core';
import { ChercheurVo } from 'src/app/controller/model/formulaire/Chercheur.model';
import { ChercheurService } from 'src/app/controller/service/formulaire/Chercheur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CampagneService } from 'src/app/controller/service/formulaire/Campagne.service';
import { MailService } from 'src/app/controller/service/config/mail/mail.service';
import { Request } from 'src/app/controller/service/config/mail/Request.model';
import { CampagneVo } from 'src/app/controller/model/formulaire/Campagne.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { TemplateRappelVo } from 'src/app/controller/model/referentiel/TemplateRappel.model';
import { TemplateRappelService } from 'src/app/controller/service/referentiel/TemplateRappel.service';
import { CampagneChercheurVo } from 'src/app/controller/model/formulaire/CampagneChercheur.model';
import { CampagneChercheurService } from 'src/app/controller/service/formulaire/CampagneChercheur.service';
import { Router } from '@angular/router';
import { CampagneRappelService } from 'src/app/controller/service/formulaire/CampagneRappel.service';
import { CampagneRappelVo } from 'src/app/controller/model/formulaire/CampagneRappel.model';
import { environment } from 'src/environments/environment';
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import { CampagneChercheurOuvertureVo } from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import { CampagneRappelChercheurVo } from 'src/app/controller/model/formulaire/CampagneRappelChercheur.model';
import { CampagneRappelChercheurService } from 'src/app/controller/service/formulaire/CampagneRappelChercheur.service';
import * as moment from 'moment';


@Component({
    selector: 'app-campagne-send-email-rappel',
    templateUrl: './campagne-send-email-rappel.component.html',
    styleUrls: ['./campagne-send-email-rappel.component.css']
})
export class CampagneSendEmailRappelComponent implements OnInit {

    findByCriteriaShow: boolean = false;
    isTemplateRappel = false;
    submitted: boolean;
    isOverlappingDepartDate: boolean = false;
    minDate: Date;
    maxDate: Date;
    constructor(private campagneRappelService: CampagneRappelService,
        private chercheurService: ChercheurService,
        private messageService: MessageService,
        private roleService: RoleService,
        private templateRappelService: TemplateRappelService,
        private campagneChercheurService: CampagneChercheurService,
        private router: Router,
        private campagneService: CampagneService,
        private campagneRappelChercheurService: CampagneRappelChercheurService

    ) {



    }

    ngOnInit(): void {
        this.sendEmailRappelDisabled = false;
        this.selectedTemplateRappel = new TemplateRappelVo();
        this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);
        this.minDate = this.selectedCampagne?.dateDepart ? new Date(this.selectedCampagne.dateDepart) : new Date();
        this.maxDate = this.selectedCampagne?.dateFin ? new Date(this.selectedCampagne.dateFin) : null;

    }

    isValid() {
        if (this.selectedCampagneRappel.objetRappel
            && this.selectedCampagneRappel.messageRappel
        ) {
            return true;
        }
        return false;
    }


    hideEditDialog() {
        this.sendEmailRappelDialog = false;
    }



    public preparedRappelEmail(selectedChercheurs) {
        if (this.selectedCampagneRappel.objetRappel && this.selectedCampagneRappel.messageRappel &&
            this.selectedCampagneRappel.objetRappel !== "" && this.selectedCampagneRappel.messageRappel !== "") {
            this.selectedCampagneRappel.campagneRappelChercheursVo = [];
            this.selectedCampagne.campagneRappelsVo = [];
            this.selectedCampagneRappel.campagneVo = this.selectedCampagne;
            selectedChercheurs.forEach(chercheur => {
                this.selectedCampagneRappelChercheur.chercheurVo = chercheur;
                this.selectedCampagneRappel.campagneRappelChercheursVo.push({ ...this.selectedCampagneRappelChercheur });
            })
            this.sendEmailRappelDisabled = true;
            this.campagneRappelService.sendEmailRappel().subscribe(campagne => {
                this.messageService.add({ severity: 'info', summary: '', detail: 'Email envoyé' });
                this.sendEmailRappelDialog = false;
                this.router.navigate(['app/admin/campagne/list']);
                window.location.reload();
                this.selectedCampagneRappel = new CampagneRappelVo();
            }, error => {
                console.log(error);
            });

        }

        else this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir l\'objet et le message de rappel' });


    }

    sendEmailRappel() {
        this.submitted = true;
        if (this.isValid()) {
            if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
                this.preparedRappelEmail(this.selectedChercheurs);

            }
            else {
                this.messageService.add({ severity: 'error', summary: '', detail: 'Aucun chercheur sélectionné' });
            }
        }



    }

    public searchRequest() {
        this.chercheurService.findByCriteria(this.searchChercheur).subscribe(chercheurs => {
            if (this.searchChercheur) {
                if (chercheurs) {
                    this.availableChercheurs = [];
                    this.availableChercheurs = chercheurs.filter(chercheur => !this.contains(this.selectedChercheurs, chercheur));
                }
                else {
                    this.availableChercheurs = [];
                }

            }

        }, error => console.log(error));
    }

    contains(array, obj) {
        var i = array.length;
        while (i--) {
            if (array[i]['id'] === obj['id']) {
                return true;
            }
        }
        return false;
    }

    public changeTemplateRappel($event) {
        if (this.selectedCampagneRappel.templateRappelVo && this.selectedCampagneRappel.templateRappelVo !== null) {
            this.selectedCampagneRappel.objetRappel = $event?.value.objet;
            this.selectedCampagneRappel.messageRappel = $event?.value.message;
        }
        else {
            this.selectedCampagneRappel.objetRappel = "";
            this.selectedCampagneRappel.messageRappel = "";
        }
    }


    public async openCreatetemplateRappel(templateRappel: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'add');
        if (isPermistted) {
            this.selectedTemplateRappel = new TemplateRappelVo();
            this.createTemplateRappelDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }




    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
    }


    get searchChercheur(): ChercheurVo {
        return this.chercheurService.searchChercheur;
    }

    set searchChercheur(value: ChercheurVo) {
        this.chercheurService.searchChercheur = value;
    }

    get selectedTemplateRappel(): TemplateRappelVo {
        return this.templateRappelService.selectedTemplateRappel;
    }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
    }

    get templateRappels(): Array<TemplateRappelVo> {
        return this.templateRappelService.templateRappels;
    }
    set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
    }
    get createTemplateRappelDialog(): boolean {
        return this.templateRappelService.createTemplateRappelDialog;
    }
    set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog = value;
    }

    get selectedCampagneChercheur(): CampagneChercheurVo {
        return this.campagneChercheurService.selectedCampagneChercheur;
    }

    set selectedCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.selectedCampagneChercheur = value;
    }


    get selectedCampagneRappelChercheur(): CampagneRappelChercheurVo {
        return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
    }

    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
    }




    get selectedChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.selectedChercheurs;
    }

    set selectedChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.selectedChercheurs = value;
    }

    get availableChercheurs(): Array<ChercheurVo> {
        return this.chercheurService.availableChercheurs;
    }

    set availableChercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.availableChercheurs = value;
    }



    get selectedCampagneRappel(): CampagneRappelVo {
        return this.campagneRappelService.selectedCampagneRappel;
    }

    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
    }

    get selectedCampagne(): CampagneVo {
        return this.campagneService.selectedCampagne;
    }

    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
    }
    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get sendEmailRappelDialog(): boolean {
        return this.campagneRappelService.sendEmailRappelDialog;
    }

    set sendEmailRappelDialog(value: boolean) {
        this.campagneRappelService.sendEmailRappelDialog = value;
    }

    get sendEmailRappelDisabled(): boolean {
        return this.campagneRappelService.sendEmailRappelDisabled;
    }

    set sendEmailRappelDisabled(value: boolean) {
        this.campagneRappelService.sendEmailRappelDisabled = value;
    }

}
