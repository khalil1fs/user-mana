import {Component, OnInit} from '@angular/core';
import {FaqService} from 'src/app/controller/service/formulaire/Faq.service';
import {FaqVo} from 'src/app/controller/model/formulaire/Faq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';

@Component({
  selector: 'app-faq-view-admin',
  templateUrl: './faq-view-admin.component.html',
  styleUrls: ['./faq-view-admin.component.css']
})
export class FaqViewAdminComponent implements OnInit {


constructor(private faqService: FaqService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categorieFaqService :CategorieFaqService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategorieFaq = new CategorieFaqVo();
    this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
}

hideViewDialog(){
    this.viewFaqDialog  = false;
}

// getters and setters

get faqs(): Array<FaqVo> {
    return this.faqService.faqs;
       }
set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
       }

 get selectedFaq():FaqVo {
           return this.faqService.selectedFaq;
       }
    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
       }

   get viewFaqDialog():boolean {
           return this.faqService.viewFaqDialog;

       }
    set viewFaqDialog(value: boolean) {
        this.faqService.viewFaqDialog= value;
       }

       get selectedCategorieFaq():CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
      set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }
       get categorieFaqs():Array<CategorieFaqVo> {
           return this.categorieFaqService.categorieFaqs;
       }
       set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }
       get editCategorieFaqDialog():boolean {
           return this.categorieFaqService.editCategorieFaqDialog;
       }
      set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
