import {Component, OnInit, Input} from '@angular/core';
import {DoctorantService} from 'src/app/controller/service/formulaire/Doctorant.service';
import {DoctorantVo} from 'src/app/controller/model/formulaire/Doctorant.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {SexeVo} from 'src/app/controller/model/referentiel/Sexe.model';
import {SexeService} from 'src/app/controller/service/referentiel/Sexe.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';

@Component({
  selector: 'app-doctorant-create-admin',
  templateUrl: './doctorant-create-admin.component.html',
  styleUrls: ['./doctorant-create-admin.component.css']
})
export class DoctorantCreateAdminComponent implements OnInit {

constructor(private doctorantService: DoctorantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private sexeService :SexeService
  ,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public save(){
this.saveWithShowOption(false);
}

public saveWithShowOption(showList: boolean){
     this.doctorantService.save().subscribe(doctorant=>{
       this.doctorants.push({...doctorant});
       this.createDoctorantDialog = false;
       this.selectedDoctorant = new DoctorantVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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

hideCreateDialog(){
    this.createDoctorantDialog  = false;
}

// getters and setters

get doctorants(): Array<DoctorantVo> {
    return this.doctorantService.doctorants;
       }
set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }

 get selectedDoctorant():DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
    set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }

   get createDoctorantDialog(): boolean {
           return this.doctorantService.createDoctorantDialog;

       }
    set createDoctorantDialog(value: boolean) {
        this.doctorantService.createDoctorantDialog= value;
       }

       get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes():Array<SexeVo> {
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
       get payss():Array<PaysVo> {
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
