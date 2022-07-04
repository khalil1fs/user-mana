import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FaqVo} from 'src/app/controller/model/formulaire/Faq.model';
import {CategorieFaqService} from 'src/app/controller/service/formulaire/CategorieFaq.service';
import {CategorieFaqVo} from 'src/app/controller/model/formulaire/CategorieFaq.model';
import {Utils} from 'src/app/utils/Utils';


@Component({
    selector: 'app-faq-visualisation-admin',
    templateUrl: './faq-chercheur.component.html',
    styleUrls: ['./faq-chercheur.component.scss']
})
export class FaqVisualisationAdminComponent implements OnInit {
    categorieFaqs: Array<CategorieFaqVo>;
    categorieFaqsSearched: Array<CategorieFaqVo> = [];
    searchQuery = '';

    constructor(private categorieFaqService: CategorieFaqService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.findAllCategorieFaqsOrdreByOrdre();
    }

    public findAllCategorieFaqsOrdreByOrdre() {
        this.categorieFaqService.findAllOrderByCategorieAndOrdre().subscribe(categorieFaqs => {
            this.categorieFaqs = categorieFaqs;
            this.categorieFaqsSearched = categorieFaqs;
        }, error => console.log(error));
    }

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        navigator['clipboard'].writeText(selBox.value).then().catch(e => console.error(e));
        document.body.removeChild(selBox);
        this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            life: 1300,
            detail: 'L’adresse ' + val + ' a bien été copiée dans le presse-papier '
        });
    }

    search() {
        const inputValue = this.searchQuery;
        this.categorieFaqsSearched = [];
        console.log(this.categorieFaqs);
        if (inputValue != '') {
            for (var cat of this.categorieFaqs) {
                if (cat.libelle.indexOf(inputValue) != -1) {
                    if (!this.catInArray(this.categorieFaqsSearched, cat.libelle)) {
                        let catSearched: CategorieFaqVo = {...cat};
                        catSearched.selected = true;
                        catSearched.libelle = catSearched.libelle.replace(inputValue, '<mark>' + inputValue + '</mark>');
                        this.categorieFaqsSearched.push(catSearched);
                    }
                } else if (cat.faqs !== null && cat.faqs.length != 0) {
                    let faqs: Array<FaqVo> = [];
                    let addCat = false;
                    for (var faq of cat.faqs) {
                        if (faq.question.indexOf(inputValue) != -1 || faq.reponse.indexOf(inputValue) != -1) {
                            let faqVo: FaqVo = {...faq};
                            faqVo.isResult = true;
                            faqVo.question = faqVo.question.replace(inputValue, '<mark>' + inputValue + '</mark>');
                            faqVo.reponse = faqVo.reponse.replace(inputValue, '<mark>' + inputValue + '</mark>');
                            faqs.push(faqVo);
                            if (!this.catInArray(this.categorieFaqsSearched, cat.libelle)) {
                                addCat = true;
                            }
                        }
                    }
                    if (addCat) {
                        let catSearched: CategorieFaqVo = {...cat};
                        catSearched.libelle = catSearched.libelle.replace(inputValue, '<mark>' + inputValue + '</mark>');
                        catSearched.faqs = faqs;
                        catSearched.selected = true;
                        this.categorieFaqsSearched.push(catSearched);
                    }
                }
            }
        } else {
            this.findAllCategorieFaqsOrdreByOrdre();
        }
    }

    catInArray(categorieSearched: Array<CategorieFaqVo>, libelle) {
        for (var cat of categorieSearched) {
            if (cat.libelle === libelle) {
                return true;
            }
        }
    }

    ToutReplier() {
        this.categorieFaqsSearched?.forEach((cat, index) => {
            cat.selected = false;
            cat.faqs?.forEach(faq => {
                faq.isResult = false;
            });
        });
    }

    onOpen(faq: FaqVo) {
        faq.isResult = true;
    }

    onOpenCat(cat: CategorieFaqVo) {
        cat.selected = true;
    }

    empty(str) {
        return Utils.empty(str);
    }
}
