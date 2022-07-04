import {Component, OnInit, Input} from '@angular/core';
import {FaqService} from 'src/app/controller/service/formulaire/Faq.service';
import {FaqVo} from 'src/app/controller/model/formulaire/Faq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-faq-create-admin',
  templateUrl: './faq-create-admin.component.html',
  styleUrls: ['./faq-create-admin.component.css']
})
export class FaqCreateAdminComponent implements OnInit {
    submitted:boolean=false;
    foundedOrdre:boolean=false;
constructor(private faqService: FaqService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
  ,       private categorieFaqService :CategorieFaqService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategorieFaq = new CategorieFaqVo();
    this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
}

public async save(){
    this.submitted=true;
    if(await this.isValid()){
        this.saveWithShowOption(false);
    }
}

public saveWithShowOption(showList: boolean){
     this.faqService.save().subscribe(faq=>{
       this.faqs.push({...faq});
       this.createFaqDialog = false;
       this.selectedFaq = new FaqVo();
       this.submitted=false;
    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreatecategorieFaq(categorieFaq: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'add');
                       if(isPermistted){
         this.selectedCategorieFaq = new CategorieFaqVo();
        this.createCategorieFaqDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createFaqDialog  = false;
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

   get createFaqDialog(): boolean {
           return this.faqService.createFaqDialog;

       }
    set createFaqDialog(value: boolean) {
        this.faqService.createFaqDialog= value;
       }

       get selectedCategorieFaq(): CategorieFaqVo {
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
       get createCategorieFaqDialog(): boolean {
           return this.categorieFaqService.createCategorieFaqDialog;
       }
      set createCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.createCategorieFaqDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     empty(str){
        return !str || !/[^\s]+/.test(str);
    }
    async findByOrdreAndCategorie(){
        let faq= await this.faqService.findByOrdreAndCategorieFaqId(this.selectedFaq).toPromise();
        if(faq!=null){
            this.foundedOrdre=true;
        }else{
            this.foundedOrdre=false;
        }
    }
    async onBlurOrdre(){
        if(this.selectedFaq.categorieFaqVo && this.selectedFaq.ordre){
            await this.findByOrdreAndCategorie();
        }else{
            this.foundedOrdre=false;
        }
    }
    async isValid(){
        if(this.selectedFaq.categorieFaqVo && this.selectedFaq.ordre){
            await this.findByOrdreAndCategorie();
        }else{
            this.foundedOrdre=false;
        }
        return !this.empty(this.selectedFaq.question) && !this.empty(this.selectedFaq.reponse) && (!this.selectedFaq.ordre || (this.selectedFaq.ordre && !this.foundedOrdre)) && this.isValidLibelleLength() && this.isValidMailLength() && this.isValidURLLength() &&  this.isValidReponseLength();
    }

    isValidLibelleLength(){
        return (!this.empty(this.selectedFaq.question) && Utils.isValidLength(this.selectedFaq.question,255)) || this.empty(this.selectedFaq.question);
    }
    isValidMailLength(){
        return (!this.empty(this.selectedFaq.contact) && Utils.isValidLength(this.selectedFaq.contact,255)) || this.empty(this.selectedFaq.contact);
    }
    isValidURLLength(){
        return (!this.empty(this.selectedFaq.lien) && Utils.isValidLength(this.selectedFaq.lien,255)) || this.empty(this.selectedFaq.lien);
    }
    isValidReponseLength(){
        return (!this.empty(this.selectedFaq.reponse) && Utils.isValidLength(this.selectedFaq.reponse,2000)) || this.empty(this.selectedFaq.reponse);
    }
}
