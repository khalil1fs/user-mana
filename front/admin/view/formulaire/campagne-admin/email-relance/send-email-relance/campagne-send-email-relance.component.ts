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
import { TemplateRelanceVo } from 'src/app/controller/model/referentiel/TemplateRelance.model';
import { TemplateRelanceService } from 'src/app/controller/service/referentiel/TemplateRelance.service';
import { CampagneChercheurVo } from 'src/app/controller/model/formulaire/CampagneChercheur.model';
import { CampagneChercheurService } from 'src/app/controller/service/formulaire/CampagneChercheur.service';
import { Router } from '@angular/router';
import { CampagneRelanceService } from 'src/app/controller/service/formulaire/CampagneRelance.service';
import { CampagneRelanceVo } from 'src/app/controller/model/formulaire/CampagneRelance.model';
import { environment } from 'src/environments/environment';
import { CampagneChercheurOuvertureService } from 'src/app/controller/service/formulaire/CampagneChercheurOuverture.service';
import { CampagneChercheurOuvertureVo } from 'src/app/controller/model/formulaire/CampagneChercheurOuverture.model';
import { CampagneRelanceChercheurVo } from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';
import { CampagneRelanceChercheurService } from 'src/app/controller/service/formulaire/CampagneRelanceChercheur.service';
import * as moment from 'moment';


@Component({
    selector: 'app-campagne-send-email-relance',
    templateUrl: './campagne-send-email-relance.component.html',
    styleUrls: ['./campagne-send-email-relance.component.css']
})
export class CampagneSendEmailRelanceComponent implements OnInit {

    findByCriteriaShow: boolean = false;
    isTemplateRelance = false;
    submitted: boolean;
    isOverlappingDepartDate: boolean = false;
    constructor(private campagneRelanceService: CampagneRelanceService,
        private chercheurService: ChercheurService,
        private messageService: MessageService,
        private roleService: RoleService,
        private templateRelanceService: TemplateRelanceService,
        private campagneChercheurService: CampagneChercheurService,
        private router: Router,
        private campagneService: CampagneService,
        private campagneRelanceChercheurService: CampagneRelanceChercheurService

    ) {



    }

    ngOnInit(): void {
        this.sendEmailRelanceDisabled = false;
        this.selectedTemplateRelance = new TemplateRelanceVo();
        this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);


    }


    isValid() {
        if (
            this.selectedCampagneRelance.objetRelance
            && this.selectedCampagneRelance.messageRelance
        ) {
            return true;
        }
        return false;
    }


    hideEditDialog() {
        this.sendEmailCampagneDialog = false;
    }



    public preparedRelanceEmail(selectedChercheurs) {

        if (this.selectedCampagneRelance.objetRelance && this.selectedCampagneRelance.messageRelance &&
            this.selectedCampagneRelance.objetRelance !== "" && this.selectedCampagneRelance.messageRelance !== "") {
            this.selectedCampagneRelance.campagneRelanceChercheursVo = [];
            this.selectedCampagne.campagneRelancesVo = [];
            this.selectedCampagneRelance.campagneVo = this.selectedCampagne;
            selectedChercheurs.forEach(chercheur => {
                this.selectedCampagneRelanceChercheur.chercheurVo = chercheur;
                this.selectedCampagneRelance.campagneRelanceChercheursVo.push({ ...this.selectedCampagneRelanceChercheur });
            })

            this.selectedCampagneRelance.campagneVo = this.selectedCampagne;
            this.sendEmailRelanceDisabled = true;

            this.campagneRelanceService.sendEmailRelance().subscribe(campagne => {
                this.messageService.add({ severity: 'info', summary: '', detail: 'Email envoyé' });
                this.sendEmailCampagneDialog = false;
                this.router.navigate(['app/admin/campagne/list']);
                window.location.reload();
                this.selectedCampagneRelance = new CampagneRelanceVo();
            }, error => {
                console.log(error);
            });


        }

        else this.messageService.add({ severity: 'error', summary: '', detail: 'Saisir l\'objet et le message de relance' });


    }

    sendEmailRelance() {
        this.submitted = true;
        if (this.isValid()) {
            if (this.selectedChercheurs && this.selectedChercheurs.length > 0) {
                this.preparedRelanceEmail(this.selectedChercheurs);

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

    public changeTemplateRelance($event) {
        if (this.selectedCampagneRelance.templateRelanceVo && this.selectedCampagneRelance.templateRelanceVo !== null) {
            this.selectedCampagneRelance.objetRelance = $event?.value.objet;
            this.selectedCampagneRelance.messageRelance = $event?.value.message;
        }
        else {
            this.selectedCampagneRelance.objetRelance = "";
            this.selectedCampagneRelance.messageRelance = "";
        }
    }


    public async openCreatetemplateRelance(templateRelance: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'add');
        if (isPermistted) {
            this.selectedTemplateRelance = new TemplateRelanceVo();
            this.createTemplateRelanceDialog = true;
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

    get selectedTemplateRelance(): TemplateRelanceVo {
        return this.templateRelanceService.selectedTemplateRelance;
    }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
    }

    get templateRelances(): Array<TemplateRelanceVo> {
        return this.templateRelanceService.templateRelances;
    }
    set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
    }
    get createTemplateRelanceDialog(): boolean {
        return this.templateRelanceService.createTemplateRelanceDialog;
    }
    set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog = value;
    }

    get selectedCampagneChercheur(): CampagneChercheurVo {
        return this.campagneChercheurService.selectedCampagneChercheur;
    }

    set selectedCampagneChercheur(value: CampagneChercheurVo) {
        this.campagneChercheurService.selectedCampagneChercheur = value;
    }


    get selectedCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
        return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
    }

    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
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



    get selectedCampagneRelance(): CampagneRelanceVo {
        return this.campagneRelanceService.selectedCampagneRelance;
    }

    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
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

    get sendEmailCampagneDialog(): boolean {
        return this.campagneRelanceService.sendEmailCampagneDialog;
    }

    set sendEmailCampagneDialog(value: boolean) {
        this.campagneRelanceService.sendEmailCampagneDialog = value;
    }


    get sendEmailRelanceDisabled(): boolean {
        return this.campagneRelanceService.sendEmailRelanceDisabled;
    }

    set sendEmailRelanceDisabled(value: boolean) {
        this.campagneRelanceService.sendEmailRelanceDisabled = value;
    }

}
