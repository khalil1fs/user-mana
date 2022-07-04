import { Component, Input, OnInit } from '@angular/core';
import { CampagneService } from 'src/app/controller/service/formulaire/Campagne.service';
import { CampagneVo } from 'src/app/controller/model/formulaire/Campagne.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';

import { EtatCampagneService } from 'src/app/controller/service/config/EtatCampagne.service';

import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { ChercheurService } from 'src/app/controller/service/formulaire/Chercheur.service';
import { ChercheurVo } from 'src/app/controller/model/formulaire/Chercheur.model';
import { CampagneRelanceService } from 'src/app/controller/service/formulaire/CampagneRelance.service';
import { CampagneRelanceVo } from 'src/app/controller/model/formulaire/CampagneRelance.model';
import { CampagneRelanceChercheurService } from 'src/app/controller/service/formulaire/CampagneRelanceChercheur.service';
import { CampagneRelanceChercheurVo } from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';

@Component({
  selector: 'app-email-relance',
  templateUrl: './email-relance.component.html',
  styleUrls: ['./email-relance.component.scss']

})
export class EmailRelanceComponent implements OnInit {
  fileName = 'CampagneRelance';



  constructor(private campagneService: CampagneService, private messageService: MessageService,
    private roleService: RoleService,
    private campagneRelanceService: CampagneRelanceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private chercheurService: ChercheurService,
    private campagneRelanceChercheurService: CampagneRelanceChercheurService,

  ) { }

  ngOnInit(): void {
    this.loadCampagneRelances();
  }

  // methods
  public async loadCampagneRelances() {
    this.campagneRelances=[];
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRelances', 'list');
    isPermistted ? this.campagneRelanceService.findByCampagneId(this.selectedCampagne?.id).subscribe(campagneRelances => {
      this.campagneRelances = campagneRelances
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation' });
  }

  public async openSendEmail() {
    await this.loadSelectedChercheurs(this.selectedCampagne);
    await this.loadAvailableChercheurs(this.selectedCampagne);
    const isPermistted = await this.roleService.isPermitted('Campagne', 'edit');
    if (isPermistted) {
      this.sendEmailCampagneDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
      });
    }

  }
  public async loadSelectedChercheurs(campagne) {
    this.selectedChercheurs = []
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.chercheurService.findByCampagne(campagne).subscribe(selectedChercheurs => {
      this.selectedChercheurs = selectedChercheurs;
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: '', detail: 'permission problem' });
  }
  public async loadAvailableChercheurs(campagne) {
    this.availableChercheurs = [];
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.chercheurService.findAvailableChercheurs(campagne).subscribe(chercheurs => {
      this.availableChercheurs = chercheurs;
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: '', detail: 'permission problem' });
  }
  async viewCampagneRelance(campagneRelance) {
    await this.findByCampagneRelanceId(campagneRelance);
    const isPermistted = true;
    if (isPermistted) {
      this.selectedCampagneRelance = campagneRelance;
      this.emailRelanceDetailsDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
      });
    }

  }
  


  public async findByCampagneRelanceId(campagneRelance) {
    this.campagneRelanceChercheurs = [];
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'list');
    isPermistted ? this.campagneRelanceChercheurService.findByCampagneRelanceId(campagneRelance).subscribe(campagneRelanceChercheurs => {
      this.campagneRelanceChercheurs = campagneRelanceChercheurs.filter(data => data.dateEnvoi !== null)
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation' });
  }


  get campagneRelances(): Array<CampagneRelanceVo> {
    return this.campagneRelanceService.campagneRelances;
  }
  set campagneRelances(value: Array<CampagneRelanceVo>) {
    this.campagneRelanceService.campagneRelances = value;
  }

  get emailRelanceDetailsDialog(): boolean {
    return this.campagneRelanceService.emailRelanceDetailsDialog;
  }
  set emailRelanceDetailsDialog(value: boolean) {
    this.campagneRelanceService.emailRelanceDetailsDialog = value;
  }

  get sendEmailCampagneDialog(): boolean {
    return this.campagneRelanceService.sendEmailCampagneDialog;
  }

  set sendEmailCampagneDialog(value: boolean) {
    this.campagneRelanceService.sendEmailCampagneDialog = value;
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


  get selectedChercheurs(): Array<ChercheurVo> {
    return this.chercheurService.selectedChercheurs;
  }

  set selectedChercheurs(value: Array<ChercheurVo>) {
    this.chercheurService.selectedChercheurs = value;
  }


  get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
  }

  set chercheurs(value: Array<ChercheurVo>) {
    this.chercheurService.chercheurs = value;
  }



  get availableChercheurs(): Array<ChercheurVo> {
    return this.chercheurService.availableChercheurs;
  }

  set availableChercheurs(value: Array<ChercheurVo>) {
    this.chercheurService.availableChercheurs = value;
  }

  get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
  }
  set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
    this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
  }





}
