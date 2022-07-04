import {Component, OnInit} from '@angular/core';
import {ContinentService} from 'src/app/controller/service/referentiel/Continent.service';
import {ContinentVo} from 'src/app/controller/model/referentiel/Continent.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-continent-view-admin',
  templateUrl: './continent-view-admin.component.html',
  styleUrls: ['./continent-view-admin.component.css']
})
export class ContinentViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private continentService: ContinentService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewContinentDialog  = false;
}

// getters and setters

get continents(): Array<ContinentVo> {
    return this.continentService.continents;
       }
set continents(value: Array<ContinentVo>) {
        this.continentService.continents = value;
       }

 get selectedContinent(): ContinentVo {
           return this.continentService.selectedContinent;
       }
    set selectedContinent(value: ContinentVo) {
        this.continentService.selectedContinent = value;
       }

   get viewContinentDialog(): boolean {
           return this.continentService.viewContinentDialog;

       }
    set viewContinentDialog(value: boolean) {
        this.continentService.viewContinentDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
