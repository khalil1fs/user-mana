package com.ird.faa.service.admin.facade.formulaire;

import com.ird.faa.bean.formulaire.CategorieFaq;
import com.ird.faa.bean.formulaire.Faq;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.FaqVo;

import java.util.List;

public interface FaqAdminService extends AbstractService<Faq, Long, FaqVo> {

    public Faq findByOrdreAndCategorieFaqId(Integer ordre, Long categorieFaqId);

    List<Faq> findByCategorieOrderByOrdre(CategorieFaq categiorieFaq);


    /**
     * find Faq from database by ordre (reference)
     *
     * @param ordre - reference of Faq
     * @return the founded Faq , If no Faq were
     * found in database return  null.
     */
    Faq findByOrdre(Integer ordre);

    /**
     * find Faq from database by id (PK) or ordre (reference)
     *
     * @param id    - id of Faq
     * @param ordre - reference of Faq
     * @return the founded Faq , If no Faq were
     * found in database return  null.
     */
    Faq findByIdOrOrdre(Faq faq);


    /**
     * delete Faq from database
     *
     * @param id - id of Faq to be deleted
     */
    int deleteById(Long id);


    List<Faq> findByCategorieFaqOrdre(Integer ordre);

    int deleteByCategorieFaqOrdre(Integer ordre);

    List<Faq> findByCategorieFaqId(Long id);

    int deleteByCategorieFaqId(Long id);


    /**
     * delete Faq from database by ordre (reference)
     *
     * @param ordre - reference of Faq to be deleted
     * @return 1 if Faq deleted successfully
     */
    int deleteByOrdre(Integer ordre);


}
