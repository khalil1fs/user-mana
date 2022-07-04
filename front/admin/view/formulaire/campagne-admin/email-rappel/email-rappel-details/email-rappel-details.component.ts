import { Component, Input, OnInit } from '@angular/core';
import { CampagneRappelVo } from 'src/app/controller/model/formulaire/CampagneRappel.model';
import { CampagneRappelChercheurVo } from 'src/app/controller/model/formulaire/CampagneRappelChercheur.model';
import { CampagneRappelService } from 'src/app/controller/service/formulaire/CampagneRappel.service';
import { CampagneRappelChercheurService } from 'src/app/controller/service/formulaire/CampagneRappelChercheur.service';


@Component({
  selector: 'app-email-rappel-details',
  templateUrl: './email-rappel-details.component.html',
  styleUrls: ['./email-rappel-details.component.scss']
})
export class EmailRappelDetailsComponent implements OnInit {


  constructor(private campagneRappelChercheurService: CampagneRappelChercheurService,
    private campagneRappelService: CampagneRappelService) { }

  ngOnInit(): void {

  }



  hideDetailRappelDialog() {
    this.emailRappelDetailsDialog = false;
  }

  get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    return this.campagneRappelChercheurService.campagneRappelChercheurs;
  }
  set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
    this.campagneRappelChercheurService.campagneRappelChercheurs = value;
  }

  get emailRappelDetailsDialog(): boolean {
    return this.campagneRappelService.emailRappelDetailsDialog;
  }
  set emailRappelDetailsDialog(value: boolean) {
    this.campagneRappelService.emailRappelDetailsDialog = value;
  }

  get selectedCampagneRappel(): CampagneRappelVo {
    return this.campagneRappelService.selectedCampagneRappel;
  }
  set selectedCampagneRappel(value: CampagneRappelVo) {
    this.campagneRappelService.selectedCampagneRappel = value;
  }

}
