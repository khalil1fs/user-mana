import {Component, OnInit} from '@angular/core';
import {FaqService} from 'src/app/controller/service/formulaire/Faq.service';
import {FaqVo} from 'src/app/controller/model/formulaire/Faq.model';
import {RoleService} from 'src/app/controller/service/formulaire/Role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';

import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Utils } from 'src/app/utils/Utils';


@Component({
    selector: 'app-faq-edit-admin',
    templateUrl: './faq-edit-admin.component.html',
    styleUrls: ['./faq-edit-admin.component.css']
})
export class FaqEditAdminComponent implements OnInit {

    public displayDrag = false;
    faqsDrag: Array<FaqVo>;
    orderChanged: boolean;
    submitted:boolean=false;

    constructor(private faqService: FaqService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private categorieFaqService: CategorieFaqService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedCategorieFaq = new CategorieFaqVo();
        this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
        this.orderChanged = false;
    }

    public edit() {
        this.submitted=true;
        if(this.isValid()){
            this.editWithShowOption(false);
        }
    }

    public editWithShowOption(showList: boolean) {
        this.selectedFaq.dernierMisAJour=new Date();
        this.selectedFaq.dernierMisAJour = DateUtils.toDate(this.selectedFaq.dernierMisAJour);
        this.faqService.edit().subscribe(faq => {
            const myIndex = this.faqs.findIndex(e => e.id === this.selectedFaq.id);
            this.faqs[myIndex] = this.selectedFaq;
            this.editFaqDialog = false;
            this.selectedFaq = new FaqVo();
            this.submitted=false;
        }, error => {
            console.log(error);
        });
        this.reloadList();

    }

    public async openCreatecategorieFaq(categorieFaq: string) {
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'add');
        if (isPermistted) {
            this.selectedCategorieFaq = new CategorieFaqVo();
            this.editCategorieFaqDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.faqsDrag, event.previousIndex, event.currentIndex);
    }

    openOrdreDrag(categorieFaqVo: CategorieFaqVo) {
        this.displayDrag = true;
        let faqVo: FaqVo = new FaqVo();
        faqVo.categorieFaqVo = categorieFaqVo;
        this.faqService.findByCategory(faqVo).subscribe(faqs => {
                this.faqsDrag = faqs;
            }
            , error => console.log(error));
    }

    saveDrag() {
        this.faqsDrag.forEach((faq, index) => {
            let ordre = index + 1;
            faq.ordre = ordre;
            if (faq.id === this.selectedFaq.id) {
                this.selectedFaq.ordre = faq.ordre;
            }
        });
        this.faqService.update(this.faqsDrag).subscribe(faqsVo => {
            console.log(faqsVo);
        }, error => {
            console.log(error);
        });
        this.displayDrag = false;
        this.orderChanged = true;
    }

    hideDrag() {
        this.displayDrag = false;
    }

    isActive(id) {
        if (this.selectedFaq.id === id) {
            return true;
        }
        return false;
    }

    reloadList() {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        if (this.orderChanged) {
            this.router.navigate(['app/admin/faq/list']);
        }
    }

// methods

    hideEditDialog() {
        this.editFaqDialog = false;
        this.reloadList();
    }

// getters and setters

    get faqs(): Array<FaqVo> {
        return this.faqService.faqs;
    }

    set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
    }

    get selectedFaq(): FaqVo {
        return this.faqService.selectedFaq;
    }

    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
    }

    get editFaqDialog(): boolean {
        return this.faqService.editFaqDialog;

    }

    set editFaqDialog(value: boolean) {
        this.faqService.editFaqDialog = value;
    }

    get selectedCategorieFaq(): CategorieFaqVo {
        return this.categorieFaqService.selectedCategorieFaq;
    }

    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
    }

    get categorieFaqs(): Array<CategorieFaqVo> {
        return this.categorieFaqService.categorieFaqs;
    }

    set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
    }

    get editCategorieFaqDialog(): boolean {
        return this.categorieFaqService.editCategorieFaqDialog;
    }

    set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
    empty(str){
        return !str || !/[^\s]+/.test(str);
    }
    isValid(){
        return !this.empty(this.selectedFaq.question) && !this.empty(this.selectedFaq.reponse) && this.isValidLibelleLength() && this.isValidMailLength() && this.isValidURLLength() && this.isValidReponseLength();
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
