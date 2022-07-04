import {Component, OnInit} from '@angular/core';
import {InstrumentsEtDispositifsIrdService} from 'src/app/controller/service/formulaire/InstrumentsEtDispositifsIrd.service';
import {InstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/formulaire/InstrumentsEtDispositifsIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {CampagneVo} from 'src/app/controller/model/formulaire/Campagne.model';
import {CampagneService} from 'src/app/controller/service/formulaire/Campagne.service';
import {ChercheurVo} from 'src/app/controller/model/formulaire/Chercheur.model';
import {ChercheurService} from 'src/app/controller/service/formulaire/Chercheur.service';

@Component({
  selector: 'app-instruments-et-dispositifs-ird-edit-admin',
  templateUrl: './instr-disposi-ird-edit-admin.component.html',
  styleUrls: ['./instr-disposi-ird-edit-admin.component.css']
})
export class InstrumentsEtDispositifsIrdEditAdminComponent implements OnInit {


constructor(private instrumentsEtDispositifsIrdService: InstrumentsEtDispositifsIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.instrumentsEtDispositifsIrdService.edit().subscribe(instrumentsEtDispositifsIrd=>{
    const myIndex = this.instrumentsEtDispositifsIrds.findIndex(e => e.id === this.selectedInstrumentsEtDispositifsIrd.id);
    this.instrumentsEtDispositifsIrds[myIndex] = this.selectedInstrumentsEtDispositifsIrd;
    this.editInstrumentsEtDispositifsIrdDialog = false;
    this.selectedInstrumentsEtDispositifsIrd = new InstrumentsEtDispositifsIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.editCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.editChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editInstrumentsEtDispositifsIrdDialog  = false;
}

// getters and setters

get instrumentsEtDispositifsIrds(): Array<InstrumentsEtDispositifsIrdVo> {
    return this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds;
       }
set instrumentsEtDispositifsIrds(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds = value;
       }

 get selectedInstrumentsEtDispositifsIrd(): InstrumentsEtDispositifsIrdVo {
           return this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd;
       }
    set selectedInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd = value;
       }

   get editInstrumentsEtDispositifsIrdDialog(): boolean {
           return this.instrumentsEtDispositifsIrdService.editInstrumentsEtDispositifsIrdDialog;

       }
    set editInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.instrumentsEtDispositifsIrdService.editInstrumentsEtDispositifsIrdDialog = value;
       }

       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog(): boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
