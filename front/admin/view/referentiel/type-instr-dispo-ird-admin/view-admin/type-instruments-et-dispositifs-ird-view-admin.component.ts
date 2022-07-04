import {Component, OnInit} from '@angular/core';
import {TypeInstrumentsEtDispositifsIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentsEtDispositifsIrd.service';
import {TypeInstrumentsEtDispositifsIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentsEtDispositifsIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-type-instruments-et-dispositifs-ird-view-admin',
  templateUrl: './type-instruments-et-dispositifs-ird-view-admin.component.html',
  styleUrls: ['./type-instruments-et-dispositifs-ird-view-admin.component.css']
})
export class TypeInstrumentsEtDispositifsIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentsEtDispositifsIrdService: TypeInstrumentsEtDispositifsIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeInstrumentsEtDispositifsIrdDialog  = false;
}

// getters and setters

get typeInstrumentsEtDispositifsIrds(): Array<TypeInstrumentsEtDispositifsIrdVo> {
    return this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds;
       }
set typeInstrumentsEtDispositifsIrds(value: Array<TypeInstrumentsEtDispositifsIrdVo>) {
        this.typeInstrumentsEtDispositifsIrdService.typeInstrumentsEtDispositifsIrds = value;
       }

 get selectedTypeInstrumentsEtDispositifsIrd(): TypeInstrumentsEtDispositifsIrdVo {
           return this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd;
       }
    set selectedTypeInstrumentsEtDispositifsIrd(value: TypeInstrumentsEtDispositifsIrdVo) {
        this.typeInstrumentsEtDispositifsIrdService.selectedTypeInstrumentsEtDispositifsIrd = value;
       }

   get viewTypeInstrumentsEtDispositifsIrdDialog(): boolean {
           return this.typeInstrumentsEtDispositifsIrdService.viewTypeInstrumentsEtDispositifsIrdDialog;

       }
    set viewTypeInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.typeInstrumentsEtDispositifsIrdService.viewTypeInstrumentsEtDispositifsIrdDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
