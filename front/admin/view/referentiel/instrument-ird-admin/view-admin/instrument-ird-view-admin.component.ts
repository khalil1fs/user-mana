import {Component, OnInit} from '@angular/core';
import {InstrumentIrdService} from 'src/app/controller/service/referentiel/InstrumentIrd.service';
import {InstrumentIrdVo} from 'src/app/controller/model/referentiel/InstrumentIrd.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

import {TypeInstrumentIrdVo} from 'src/app/controller/model/referentiel/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from 'src/app/controller/service/referentiel/TypeInstrumentIrd.service';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-instrument-ird-view-admin',
  templateUrl: './instrument-ird-view-admin.component.html',
  styleUrls: ['./instrument-ird-view-admin.component.css']
})
export class InstrumentIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdService: InstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
}

hideViewDialog(){
    this.viewInstrumentIrdDialog  = false;
}

// getters and setters

get instrumentIrds(): Array<InstrumentIrdVo> {
    return this.instrumentIrdService.instrumentIrds;
       }
set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }

 get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }

   get viewInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.viewInstrumentIrdDialog;

       }
    set viewInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.viewInstrumentIrdDialog= value;
       }

       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
