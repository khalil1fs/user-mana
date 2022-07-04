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
import { CampagneRappelService } from 'src/app/controller/service/formulaire/CampagneRappel.service';
import { CampagneRappelVo } from 'src/app/controller/model/formulaire/CampagneRappel.model';
import { CampagneRappelChercheurService } from 'src/app/controller/service/formulaire/CampagneRappelChercheur.service';
import { CampagneRappelChercheurVo } from 'src/app/controller/model/formulaire/CampagneRappelChercheur.model';

@Component({
  selector: 'app-email-rappel',
  templateUrl: './email-rappel.component.html',
  styleUrls: ['./email-rappel.component.scss']

})
export class EmailRappelComponent implements OnInit {
  fileName = 'CampagneRappel';



  constructor(private campagneService: CampagneService, private messageService: MessageService,
    private roleService: RoleService,
    private campagneRappelService: CampagneRappelService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private chercheurService: ChercheurService,
    private campagneRappelChercheurService: CampagneRappelChercheurService,

  ) { }

  ngOnInit(): void {
    this.loadCampagneRappels();
  }

  // methods
  public async loadCampagneRappels() {
    this.campagneRappels=[];
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRappels', 'list');
    isPermistted ? this.campagneRappelService.findByCampagneId(this.selectedCampagne?.id).subscribe(campagneRappels => {
      this.campagneRappels = campagneRappels
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation' });
  }

  public async openSendEmail() {
    await this.loadSelectedChercheurs(this.selectedCampagne);
    await this.loadAvailableChercheurs(this.selectedCampagne);
    const isPermistted = await this.roleService.isPermitted('Campagne', 'edit');
    if (isPermistted) {
      this.sendEmailRappelDialog = true;
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
  async viewCampagneRappel(campagneRappel) {
    await this.findByCampagneRappelId(campagneRappel);
    const isPermistted = true;
    if (isPermistted) {
      this.selectedCampagneRappel = campagneRappel;
      this.emailRappelDetailsDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
      });
    }

  }
 
  public async findByCampagneRappelId(campagneRappel) {
    this.campagneRappelChercheurs=[];
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'list');
    isPermistted ? this.campagneRappelChercheurService.findByCampagneRappelId(campagneRappel).subscribe(campagneRappelChercheurs => {
      this.campagneRappelChercheurs = campagneRappelChercheurs.filter(data => data.dateEnvoi!==null)
    }
      , error => console.log(error))
      : this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation' });
  }


  get campagneRappels(): Array<CampagneRappelVo> {
    return this.campagneRappelService.campagneRappels;
  }
  set campagneRappels(value: Array<CampagneRappelVo>) {
    this.campagneRappelService.campagneRappels = value;
  }

  get emailRappelDetailsDialog(): boolean {
    return this.campagneRappelService.emailRappelDetailsDialog;
  }
  set emailRappelDetailsDialog(value: boolean) {
    this.campagneRappelService.emailRappelDetailsDialog = value;
  }

  get sendEmailRappelDialog(): boolean {
    return this.campagneRappelService.sendEmailRappelDialog;
  }

  set sendEmailRappelDialog(value: boolean) {
    this.campagneRappelService.sendEmailRappelDialog = value;
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
  
  get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    return this.campagneRappelChercheurService.campagneRappelChercheurs;
  }
  set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
    this.campagneRappelChercheurService.campagneRappelChercheurs = value;
  }





}
