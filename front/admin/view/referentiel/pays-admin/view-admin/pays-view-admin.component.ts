import {Component, OnInit} from '@angular/core';
import {PaysService} from 'src/app/controller/service/referentiel/Pays.service';
import {PaysVo} from 'src/app/controller/model/referentiel/Pays.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pays-view-admin',
  templateUrl: './pays-view-admin.component.html',
  styleUrls: ['./pays-view-admin.component.css']
})
export class PaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysService: PaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private continentService: ContinentService
) {
}

// methods
ngOnInit(): void {
    this.selectedContinent = new ContinentVo();
    this.continentService.findAll().subscribe((data) => this.continents = data);
}

hideViewDialog(){
    this.viewPaysDialog  = false;
}

// getters and setters

get payss(): Array<PaysVo> {
    return this.paysService.payss;
       }
set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

 get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }

   get viewPaysDialog(): boolean {
           return this.paysService.viewPaysDialog;

       }
    set viewPaysDialog(value: boolean) {
        this.paysService.viewPaysDialog= value;
       }

       get selectedContinent(): ContinentVo {
           return this.continentService.selectedContinent;
       }
      set selectedContinent(value: ContinentVo) {
        this.continentService.selectedContinent = value;
       }
       get continents():Array<ContinentVo> {
           return this.continentService.continents;
       }
       set continents(value: Array<ContinentVo>) {
        this.continentService.continents = value;
       }
       get editContinentDialog(): boolean {
           return this.continentService.editContinentDialog;
       }
      set editContinentDialog(value: boolean) {
        this.continentService.editContinentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
