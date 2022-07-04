package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.CategorieFaq;
import com.ird.faa.bean.formulaire.Faq;
import com.ird.faa.dao.formulaire.FaqDao;
import com.ird.faa.service.admin.facade.formulaire.CategorieFaqAdminService;
import com.ird.faa.service.admin.facade.formulaire.FaqAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.FaqVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class FaqAdminServiceImpl extends AbstractServiceImpl<Faq> implements FaqAdminService {

    @Autowired
    private FaqDao faqDao;


    @Autowired
    private CategorieFaqAdminService categorieFaqService;


    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Faq> findByCategorieOrderByOrdre(CategorieFaq categiorieFaq) {
        return faqDao.findByCategorieFaqOrderByOrdre(categiorieFaq);
    }

    @Override
    public Faq findByOrdre(Integer ordre) {
        return faqDao.findByOrdre(ordre);
    }

    @Override
    public List<Faq> findAll() {
        return faqDao.findAll();
    }

    @Override
    public List<Faq> findByCategorieFaqOrdre(Integer ordre) {
        return faqDao.findByCategorieFaqOrdre(ordre);
    }

    @Override
    @Transactional
    public int deleteByCategorieFaqOrdre(Integer ordre) {
        return faqDao.deleteByCategorieFaqOrdre(ordre);
    }

    @Override
    public List<Faq> findByCategorieFaqId(Long id) {
        return faqDao.findByCategorieFaqId(id);
    }

    @Override
    @Transactional
    public int deleteByCategorieFaqId(Long id) {
        return faqDao.deleteByCategorieFaqId(id);
    }


    @Override
    public Faq findByOrdreAndCategorieFaqId(Integer ordre, Long categorieFaqId) {
        if (ordre == null) return null;
        return faqDao.findByOrdreAndCategorieFaqId(ordre, categorieFaqId);
    }

    @Override
    @Transactional
    public int deleteByOrdre(Integer ordre) {
        return faqDao.deleteByOrdre(ordre);
    }

    @Override
    public Faq findByIdOrOrdre(Faq faq) {
        Faq resultat = null;
        if (faq == null || (faq.getOrdre() == null && faq.getId() == null))
            return resultat;
        else {
            if (faq.getId() != null) {
                resultat = faqDao.findById(faq.getId()).get();
            } else if (StringUtil.isNotEmpty(faq.getOrdre())) {
                resultat = faqDao.findByOrdre(faq.getOrdre());
            }
            return resultat;
        }
    }

    @Override
    public Faq findById(Long id) {
        if (id == null) return null;
        return faqDao.getOne(id);
    }

    @Override
    public Faq findByIdWithAssociatedList(Long id) {
        Faq faq = findById(id);
        return faq;
    }


    @Transactional
    public int deleteById(Long id) {
        if (faqDao.findById(id) == null) return 0;
        else {
            faqDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Faq update(Faq faq) {
        Faq foundedFaq = findById(faq.getId());
        if (foundedFaq == null) return null;
        else {
            return faqDao.save(faq);
        }
    }

    @Override
    public Faq save(Faq faq) {
        //Faq foundedFaq = faqDao.findByOrdreAndCategorieFaqId(faq.getOrdre(), faq.getCategorieFaq().getId());
        //if (foundedFaq != null) return null;

        findCategorieFaq(faq);
        Faq savedFaq = faqDao.save(faq);
        return savedFaq;
    }

    @Override
    public List<Faq> save(List<Faq> faqs) {
        List<Faq> list = new ArrayList<Faq>();
        for (Faq faq : faqs) {
            list.add(save(faq));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Faq faq) {
        if (faq.getOrdre() == null) return -1;

        Faq foundedFaq = findByOrdre(faq.getOrdre());
        if (foundedFaq == null) return -1;
        faqDao.delete(foundedFaq);
        return 1;
    }


    public List<Faq> findByCriteria(FaqVo faqVo) {

        String query = "SELECT o FROM Faq o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", faqVo.getId());
        query += SearchUtil.addConstraint("o", "question", "LIKE", faqVo.getQuestion());
        query += SearchUtil.addConstraint("o", "reponse", "LIKE", faqVo.getReponse());
        query += SearchUtil.addConstraint("o", "contact", "LIKE", faqVo.getContact());
        query += SearchUtil.addConstraint("o", "ordre", "=", faqVo.getOrdre());
        query += SearchUtil.addConstraint("o", "archive", "=", faqVo.getArchive());
        query += SearchUtil.addConstraint("o", "lien", "LIKE", faqVo.getLien());
        query += SearchUtil.addConstraintDate("o", "dernierMisAJour", "=", faqVo.getDernierMisAJour());
        query += SearchUtil.addConstraintMinMax("o", "ordre", faqVo.getOrdreMin(), faqVo.getOrdreMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dernierMisAJour", faqVo.getDernierMisAJourMin(), faqVo.getDernierMisAJourMax());
        if (faqVo.getCategorieFaqVo() != null) {
            query += SearchUtil.addConstraint("o", "categorieFaq.id", "=", faqVo.getCategorieFaqVo().getId());
            query += SearchUtil.addConstraint("o", "categorieFaq.ordre", "=", faqVo.getCategorieFaqVo().getOrdre());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findCategorieFaq(Faq faq) {
        CategorieFaq loadedCategorieFaq = categorieFaqService.findByIdOrOrdre(faq.getCategorieFaq());

        if (loadedCategorieFaq == null) {
            return;
        }
        faq.setCategorieFaq(loadedCategorieFaq);
    }

    @Override
    @Transactional
    public void delete(List<Faq> faqs) {
        if (ListUtil.isNotEmpty(faqs)) {
            faqs.forEach(e -> faqDao.delete(e));
        }
    }

    @Override
    public void update(List<Faq> faqs) {
        if (ListUtil.isNotEmpty(faqs)) {
            faqs.forEach(e -> faqDao.save(e));
        }
    }


    @Override
    public List<List<Faq>> getToBeSavedAndToBeDeleted(List<Faq> oldList, List<Faq> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
