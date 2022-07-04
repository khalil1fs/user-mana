import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categorie-faq-view-admin',
  templateUrl: './categorie-faq-view-admin.component.html',
  styleUrls: ['./categorie-faq-view-admin.component.css']
})
export class CategorieFaqViewAdminComponent implements OnInit {


constructor(private categorieFaqService: CategorieFaqService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCategorieFaqDialog  = false;
}

// getters and setters

get categorieFaqs(): Array<CategorieFaqVo> {
    return this.categorieFaqService.categorieFaqs;
       }
set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }

 get selectedCategorieFaq():CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }

   get viewCategorieFaqDialog():boolean {
           return this.categorieFaqService.viewCategorieFaqDialog;

       }
    set viewCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.viewCategorieFaqDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
