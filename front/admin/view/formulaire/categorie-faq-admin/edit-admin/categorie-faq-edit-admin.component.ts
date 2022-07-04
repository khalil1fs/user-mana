import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';


@Component({
  selector: 'app-categorie-faq-edit-admin',
  templateUrl: './categorie-faq-edit-admin.component.html',
  styleUrls: ['./categorie-faq-edit-admin.component.css']
})
export class CategorieFaqEditAdminComponent implements OnInit {

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

public async edit(){
    this.submitted=true;
    if(await this.isValid()){
        this.editWithShowOption(false);
    }
}
public editWithShowOption(showList: boolean){
    this.categorieFaqService.edit().subscribe(categorieFaq=>{
    const myIndex = this.categorieFaqs.findIndex(e => e.id === this.selectedCategorieFaq.id);
    this.categorieFaqs[myIndex] = this.selectedCategorieFaq;
    this.editCategorieFaqDialog = false;
    this.selectedCategorieFaq = new CategorieFaqVo();
    this.submitted=false;
    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCategorieFaqDialog  = false;
}

// getters and setters

get categorieFaqs(): Array<CategorieFaqVo> {
    return this.categorieFaqService.categorieFaqs;
       }
set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }

 get selectedCategorieFaq(): CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }

   get editCategorieFaqDialog(): boolean {
           return this.categorieFaqService.editCategorieFaqDialog;

       }
    set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
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
            if(categorie.id===this.selectedCategorieFaq.id){
                this.foundedOrdre=false;
            }
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
