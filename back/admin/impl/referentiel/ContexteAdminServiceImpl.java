package com.ird.faa.service.admin.impl.referentiel;

import java.util.List;
import java.util.ArrayList;

import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.service.core.facade.ArchivableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.referentiel.Contexte;
import com.ird.faa.dao.referentiel.ContexteDao;
import com.ird.faa.service.admin.facade.referentiel.ContexteAdminService;

import com.ird.faa.ws.rest.provided.vo.referentiel.ContexteVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ContexteAdminServiceImpl extends AbstractServiceImpl<Contexte> implements ContexteAdminService {

@Autowired
private ContexteDao contexteDao;




@Autowired
private EntityManager entityManager;


@Override
public List<Contexte> findAll(){
return contexteDao.findAll();
}
    @Override
    public Contexte findByCode(String code){
    if( code==null) return null;
    return contexteDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return contexteDao.deleteByCode(code);
    }
    @Override
    public Contexte findByIdOrCode(Contexte contexte){
    Contexte resultat=null;
    if(contexte == null || ( contexte.getCode()==null && contexte.getId()==null))
    return resultat;
    else{
    if(contexte.getId() != null){
    resultat= contexteDao.findById(contexte.getId()).get();
    }else if(StringUtil.isNotEmpty(contexte.getCode())) {
    resultat= contexteDao.findByCode(contexte.getCode());
    }
    return resultat;
    }
    }

@Override
public Contexte findById(Long id){
if(id==null) return null;
return contexteDao.getOne(id);
}

@Override
public Contexte findByIdWithAssociatedList(Long id){
Contexte contexte  = findById(id);
return contexte;
}


@Transactional
public int deleteById(Long id){
if(contexteDao.findById(id) == null) return 0;
else{
contexteDao.deleteById(id);
return 1;
}
}


@Override
public Contexte update(Contexte contexte){
Contexte foundedContexte = findById(contexte.getId());
if(foundedContexte==null) return null;
else{
    prepare(contexte);
    return  contexteDao.save(contexte);
}
}

@Override
public Contexte save (Contexte contexte){
    Contexte foundedContexte = findByCode(contexte.getCode());
   if(foundedContexte!=null) return null;


    prepare(contexte);

Contexte savedContexte = contexteDao.save(contexte);
return savedContexte;
}

@Override
public List<Contexte> save(List<Contexte> contextes){
List<Contexte> list = new ArrayList<Contexte>();
for(Contexte contexte: contextes){
list.add(save(contexte));
}
return list;
}



@Override
@Transactional
public int delete(Contexte contexte){
    if(contexte.getCode()==null) return -1;

    Contexte foundedContexte = findByCode(contexte.getCode());
    if(foundedContexte==null) return -1;
contexteDao.delete(foundedContexte);
return 1;
}


public List<Contexte> findByCriteria(ContexteVo contexteVo){

String query = "SELECT o FROM Contexte o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",contexteVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",contexteVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",contexteVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<Contexte> contextes){
        if(ListUtil.isNotEmpty(contextes)){
        contextes.forEach(e->contexteDao.delete(e));
        }
}
@Override
public void update(List<Contexte> contextes){
if(ListUtil.isNotEmpty(contextes)){
contextes.forEach(e->contexteDao.save(e));
}
}



@Override
public List<List<Contexte>>  getToBeSavedAndToBeDeleted(List<Contexte> oldList,List<Contexte> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
