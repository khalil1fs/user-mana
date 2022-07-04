import {Component, OnInit} from '@angular/core';
import {SemanticRelationshipService} from 'src/app/controller/service/referentiel/SemanticRelationship.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/referentiel/SemanticRelationship.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-semantic-relationship-view-admin',
  templateUrl: './semantic-relationship-view-admin.component.html',
  styleUrls: ['./semantic-relationship-view-admin.component.css']
})
export class SemanticRelationshipViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private semanticRelationshipService: SemanticRelationshipService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewSemanticRelationshipDialog  = false;
}

// getters and setters

get semanticRelationships(): Array<SemanticRelationshipVo> {
    return this.semanticRelationshipService.semanticRelationships;
       }
set semanticRelationships(value: Array<SemanticRelationshipVo>) {
        this.semanticRelationshipService.semanticRelationships = value;
       }

 get selectedSemanticRelationship(): SemanticRelationshipVo {
           return this.semanticRelationshipService.selectedSemanticRelationship;
       }
    set selectedSemanticRelationship(value: SemanticRelationshipVo) {
        this.semanticRelationshipService.selectedSemanticRelationship = value;
       }

   get viewSemanticRelationshipDialog(): boolean {
           return this.semanticRelationshipService.viewSemanticRelationshipDialog;

       }
    set viewSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.viewSemanticRelationshipDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
