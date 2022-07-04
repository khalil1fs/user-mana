import {Component, OnInit} from '@angular/core';
import {EtudiantService} from 'src/app/controller/service/formulaire/Etudiant.service';
import {EtudiantVo} from 'src/app/controller/model/formulaire/Etudiant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-etudiant-edit-admin',
  templateUrl: './etudiant-edit-admin.component.html',
  styleUrls: ['./etudiant-edit-admin.component.css']
})
export class EtudiantEditAdminComponent implements OnInit {


constructor(private etudiantService: EtudiantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private sexeService: SexeService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEtudiant.dateArchivage = DateUtils.toDate(this.selectedEtudiant.dateArchivage);
    this.etudiantService.edit().subscribe(etudiant=>{
    const myIndex = this.etudiants.findIndex(e => e.id === this.selectedEtudiant.id);
    this.etudiants[myIndex] = this.selectedEtudiant;
    this.editEtudiantDialog = false;
    this.selectedEtudiant = new EtudiantVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatesexe(sexe: string) {
                      const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
                       if(isPermistted){
         this.selectedSexe = new SexeVo();
        this.createSexeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEtudiantDialog  = false;
}

// getters and setters

get etudiants(): Array<EtudiantVo> {
    return this.etudiantService.etudiants;
       }
set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
       }

 get selectedEtudiant(): EtudiantVo {
           return this.etudiantService.selectedEtudiant;
       }
    set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
       }

   get editEtudiantDialog(): boolean {
           return this.etudiantService.editEtudiantDialog;

       }
    set editEtudiantDialog(value: boolean) {
        this.etudiantService.editEtudiantDialog = value;
       }

       get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes(): Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get createSexeDialog(): boolean {
           return this.sexeService.createSexeDialog;
       }
      set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
