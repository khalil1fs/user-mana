import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CampagneRelanceVo } from 'src/app/controller/model/formulaire/CampagneRelance.model';
import { CampagneRelanceChercheurVo } from 'src/app/controller/model/formulaire/CampagneRelanceChercheur.model';
import { ChercheurVo } from 'src/app/controller/model/formulaire/Chercheur.model';
import { CampagneRelanceService } from 'src/app/controller/service/formulaire/CampagneRelance.service';
import { CampagneRelanceChercheurService } from 'src/app/controller/service/formulaire/CampagneRelanceChercheur.service';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';

@Component({
  selector: 'app-email-relance-details',
  templateUrl: './email-relance-details.component.html',
  styleUrls: ['./email-relance-details.component.scss']
})
export class EmailRelanceDetailsComponent implements OnInit {


  constructor(private campagneRelanceChercheurService: CampagneRelanceChercheurService,
    private campagneRelanceService: CampagneRelanceService) { }

  ngOnInit(): void {

  }



  hideDetailRelanceDialog() {
    this.emailRelanceDetailsDialog = false;
  }

  get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
  }
  set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
    this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
  }

  get emailRelanceDetailsDialog(): boolean {
    return this.campagneRelanceService.emailRelanceDetailsDialog;
  }
  set emailRelanceDetailsDialog(value: boolean) {
    this.campagneRelanceService.emailRelanceDetailsDialog = value;
  }

  get selectedCampagneRelance(): CampagneRelanceVo {
    return this.campagneRelanceService.selectedCampagneRelance;
  }
  set selectedCampagneRelance(value: CampagneRelanceVo) {
    this.campagneRelanceService.selectedCampagneRelance = value;
  }

}
