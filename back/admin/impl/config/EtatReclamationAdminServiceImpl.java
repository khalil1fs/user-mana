package com.ird.faa.service.admin.impl.config;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.config.EtatReclamation;
import com.ird.faa.dao.config.EtatReclamationDao;
import com.ird.faa.service.admin.facade.config.EtatReclamationAdminService;

import com.ird.faa.ws.rest.provided.vo.config.EtatReclamationVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtatReclamationAdminServiceImpl extends AbstractServiceImpl<EtatReclamation> implements EtatReclamationAdminService {

@Autowired
private EtatReclamationDao etatReclamationDao;



@Autowired
private EntityManager entityManager;


@Override
public List<EtatReclamation> findAll(){
return etatReclamationDao.findAll();
}
    @Override
    public EtatReclamation findByCode(String code){
    if( code==null) return null;
    return etatReclamationDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return etatReclamationDao.deleteByCode(code);
    }
    @Override
    public EtatReclamation findByIdOrCode(EtatReclamation etatReclamation){
    EtatReclamation resultat=null;
    if(etatReclamation == null || ( etatReclamation.getCode()==null && etatReclamation.getId()==null))
    return resultat;
    else{
    if(etatReclamation.getId() != null){
    resultat= etatReclamationDao.findById(etatReclamation.getId()).get();
    }else if(StringUtil.isNotEmpty(etatReclamation.getCode())) {
    resultat= etatReclamationDao.findByCode(etatReclamation.getCode());
    }
    return resultat;
    }
    }

@Override
public EtatReclamation findById(Long id){
if(id==null) return null;
return etatReclamationDao.getOne(id);
}

@Override
public EtatReclamation findByIdWithAssociatedList(Long id){
EtatReclamation etatReclamation  = findById(id);
return etatReclamation;
}


@Transactional
public int deleteById(Long id){
if(etatReclamationDao.findById(id) == null) return 0;
else{
etatReclamationDao.deleteById(id);
return 1;
}
}


@Override
public EtatReclamation update(EtatReclamation etatReclamation){
EtatReclamation foundedEtatReclamation = findById(etatReclamation.getId());
if(foundedEtatReclamation==null) return null;
else{
return  etatReclamationDao.save(etatReclamation);
}
}

@Override
public EtatReclamation save (EtatReclamation etatReclamation){
    EtatReclamation foundedEtatReclamation = findByCode(etatReclamation.getCode());
   if(foundedEtatReclamation!=null) return null;



EtatReclamation savedEtatReclamation = etatReclamationDao.save(etatReclamation);
return savedEtatReclamation;
}

@Override
public List<EtatReclamation> save(List<EtatReclamation> etatReclamations){
List<EtatReclamation> list = new ArrayList<EtatReclamation>();
for(EtatReclamation etatReclamation: etatReclamations){
list.add(save(etatReclamation));
}
return list;
}



@Override
@Transactional
public int delete(EtatReclamation etatReclamation){
    if(etatReclamation.getCode()==null) return -1;

    EtatReclamation foundedEtatReclamation = findByCode(etatReclamation.getCode());
    if(foundedEtatReclamation==null) return -1;
etatReclamationDao.delete(foundedEtatReclamation);
return 1;
}


public List<EtatReclamation> findByCriteria(EtatReclamationVo etatReclamationVo){

String query = "SELECT o FROM EtatReclamation o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etatReclamationVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",etatReclamationVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",etatReclamationVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<EtatReclamation> etatReclamations){
        if(ListUtil.isNotEmpty(etatReclamations)){
        etatReclamations.forEach(e->etatReclamationDao.delete(e));
        }
}
@Override
public void update(List<EtatReclamation> etatReclamations){
if(ListUtil.isNotEmpty(etatReclamations)){
etatReclamations.forEach(e->etatReclamationDao.save(e));
}
}



@Override
public List<List<EtatReclamation>>  getToBeSavedAndToBeDeleted(List<EtatReclamation> oldList,List<EtatReclamation> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
