import {Component, OnInit, Input} from '@angular/core';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-categorie-faq-create-admin',
  templateUrl: './categorie-faq-create-admin.component.html',
  styleUrls: ['./categorie-faq-create-admin.component.css']
})
export class CategorieFaqCreateAdminComponent implements OnInit {
    submitted:boolean=false;
    foundedOrdre:boolean=false;
constructor(private categorieFaqService: CategorieFaqService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}

public async save(){
    this.submitted=true;
    if(await this.isValid()){
        this.saveWithShowOption(false);
    }
}

public saveWithShowOption(showList: boolean){
     this.categorieFaqService.save().subscribe(categorieFaq=>{
       this.categorieFaqs.push({...categorieFaq});
       this.createCategorieFaqDialog = false;
       this.selectedCategorieFaq = new CategorieFaqVo();
        this.submitted=false;

    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createCategorieFaqDialog  = false;
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
    async findCategorieByOrdre(){
        let categorie= await this.categorieFaqService.findByOrdre(this.selectedCategorieFaq).toPromise();
        if(categorie!=null){
            this.foundedOrdre=true;
        }else{
            this.foundedOrdre=false;
        }
    }
    async onBlurOrdre(){
        if(this.selectedCategorieFaq.ordre){
            await this.findCategorieByOrdre();
        }else{
            this.foundedOrdre=false;
        }
    }
    async isValid(){
        if(this.selectedCategorieFaq.ordre){
            await this.findCategorieByOrdre();
        }else{
            this.foundedOrdre=false;
        }
        return !this.empty(this.selectedCategorieFaq.libelle) && (!this.selectedCategorieFaq.ordre || (this.selectedCategorieFaq.ordre && !this.foundedOrdre));
    }
}
