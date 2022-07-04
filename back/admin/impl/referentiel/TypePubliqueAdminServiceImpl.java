package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypePublique;
import com.ird.faa.dao.referentiel.TypePubliqueDao;
import com.ird.faa.service.admin.facade.referentiel.TypePubliqueAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypePubliqueVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypePubliqueAdminServiceImpl extends AbstractServiceImpl<TypePublique> implements TypePubliqueAdminService {

    @Autowired
    private TypePubliqueDao typePubliqueDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypePublique> findAll() {
        return typePubliqueDao.findAll();
    }

    @Override
    public TypePublique findByCode(String code) {
        if (code == null) return null;
        return typePubliqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typePubliqueDao.deleteByCode(code);
    }

    @Override
    public TypePublique findByIdOrCode(TypePublique typePublique) {
        TypePublique resultat = null;
        if (typePublique == null || (typePublique.getCode() == null && typePublique.getId() == null))
            return resultat;
        else {
            if (typePublique.getId() != null) {
                resultat = typePubliqueDao.findById(typePublique.getId()).get();
            } else if (StringUtil.isNotEmpty(typePublique.getCode())) {
                resultat = typePubliqueDao.findByCode(typePublique.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypePublique findById(Long id) {
        if (id == null) return null;
        return typePubliqueDao.getOne(id);
    }

    @Override
    public TypePublique findByIdWithAssociatedList(Long id) {
        TypePublique typePublique = findById(id);
        return typePublique;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typePubliqueDao.findById(id) == null) return 0;
        else {
            typePubliqueDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypePublique update(TypePublique typePublique) {
        TypePublique foundedTypePublique = findById(typePublique.getId());
        if (foundedTypePublique == null) return null;
        else {
            prepare(typePublique);

            return typePubliqueDao.save(typePublique);
        }
    }

    @Override
    public TypePublique save(TypePublique typePublique) {
        TypePublique foundedTypePublique = findByCode(typePublique.getCode());
        if (foundedTypePublique != null) return null;

        prepare(typePublique);

        TypePublique savedTypePublique = typePubliqueDao.save(typePublique);
        return savedTypePublique;
    }

    @Override
    public List<TypePublique> save(List<TypePublique> typePubliques) {
        List<TypePublique> list = new ArrayList<TypePublique>();
        for (TypePublique typePublique : typePubliques) {
            list.add(save(typePublique));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypePublique typePublique) {
        if (typePublique.getCode() == null) return -1;

        TypePublique foundedTypePublique = findByCode(typePublique.getCode());
        if (foundedTypePublique == null) return -1;
        typePubliqueDao.delete(foundedTypePublique);
        return 1;
    }


    public List<TypePublique> findByCriteria(TypePubliqueVo typePubliqueVo) {

        String query = "SELECT o FROM TypePublique o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typePubliqueVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typePubliqueVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typePubliqueVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypePublique> typePubliques) {
        if (ListUtil.isNotEmpty(typePubliques)) {
            typePubliques.forEach(e -> typePubliqueDao.delete(e));
        }
    }

    @Override
    public void update(List<TypePublique> typePubliques) {
        if (ListUtil.isNotEmpty(typePubliques)) {
            typePubliques.forEach(e -> typePubliqueDao.save(e));
        }
    }


    @Override
    public List<List<TypePublique>> getToBeSavedAndToBeDeleted(List<TypePublique> oldList, List<TypePublique> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
