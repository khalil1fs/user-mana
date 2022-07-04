package com.ird.faa.service.admin.impl.config;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.config.EtatCampagneChercheur;
import com.ird.faa.dao.config.EtatCampagneChercheurDao;
import com.ird.faa.service.admin.facade.config.EtatCampagneChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.config.EtatCampagneChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtatCampagneChercheurAdminServiceImpl extends AbstractServiceImpl<EtatCampagneChercheur> implements EtatCampagneChercheurAdminService {

@Autowired
private EtatCampagneChercheurDao etatCampagneChercheurDao;



@Autowired
private EntityManager entityManager;


@Override
public List<EtatCampagneChercheur> findAll(){
return etatCampagneChercheurDao.findAll();
}
    @Override
    public EtatCampagneChercheur findByCode(String code){
    if( code==null) return null;
    return etatCampagneChercheurDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return etatCampagneChercheurDao.deleteByCode(code);
    }
    @Override
    public EtatCampagneChercheur findByIdOrCode(EtatCampagneChercheur etatCampagneChercheur){
    EtatCampagneChercheur resultat=null;
    if(etatCampagneChercheur == null || ( etatCampagneChercheur.getCode()==null && etatCampagneChercheur.getId()==null))
    return resultat;
    else{
    if(etatCampagneChercheur.getId() != null){
    resultat= etatCampagneChercheurDao.findById(etatCampagneChercheur.getId()).get();
    }else if(StringUtil.isNotEmpty(etatCampagneChercheur.getCode())) {
    resultat= etatCampagneChercheurDao.findByCode(etatCampagneChercheur.getCode());
    }
    return resultat;
    }
    }

@Override
public EtatCampagneChercheur findById(Long id){
if(id==null) return null;
return etatCampagneChercheurDao.getOne(id);
}

@Override
public EtatCampagneChercheur findByIdWithAssociatedList(Long id){
EtatCampagneChercheur etatCampagneChercheur  = findById(id);
return etatCampagneChercheur;
}


@Transactional
public int deleteById(Long id){
if(etatCampagneChercheurDao.findById(id) == null) return 0;
else{
etatCampagneChercheurDao.deleteById(id);
return 1;
}
}


@Override
public EtatCampagneChercheur update(EtatCampagneChercheur etatCampagneChercheur){
EtatCampagneChercheur foundedEtatCampagneChercheur = findById(etatCampagneChercheur.getId());
if(foundedEtatCampagneChercheur==null) return null;
else{
return  etatCampagneChercheurDao.save(etatCampagneChercheur);
}
}

@Override
public EtatCampagneChercheur save (EtatCampagneChercheur etatCampagneChercheur){
    EtatCampagneChercheur foundedEtatCampagneChercheur = findByCode(etatCampagneChercheur.getCode());
   if(foundedEtatCampagneChercheur!=null) return null;



EtatCampagneChercheur savedEtatCampagneChercheur = etatCampagneChercheurDao.save(etatCampagneChercheur);
return savedEtatCampagneChercheur;
}

@Override
public List<EtatCampagneChercheur> save(List<EtatCampagneChercheur> etatCampagneChercheurs){
List<EtatCampagneChercheur> list = new ArrayList<EtatCampagneChercheur>();
for(EtatCampagneChercheur etatCampagneChercheur: etatCampagneChercheurs){
list.add(save(etatCampagneChercheur));
}
return list;
}



@Override
@Transactional
public int delete(EtatCampagneChercheur etatCampagneChercheur){
    if(etatCampagneChercheur.getCode()==null) return -1;

    EtatCampagneChercheur foundedEtatCampagneChercheur = findByCode(etatCampagneChercheur.getCode());
    if(foundedEtatCampagneChercheur==null) return -1;
etatCampagneChercheurDao.delete(foundedEtatCampagneChercheur);
return 1;
}


public List<EtatCampagneChercheur> findByCriteria(EtatCampagneChercheurVo etatCampagneChercheurVo){

String query = "SELECT o FROM EtatCampagneChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etatCampagneChercheurVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",etatCampagneChercheurVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",etatCampagneChercheurVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<EtatCampagneChercheur> etatCampagneChercheurs){
        if(ListUtil.isNotEmpty(etatCampagneChercheurs)){
        etatCampagneChercheurs.forEach(e->etatCampagneChercheurDao.delete(e));
        }
}
@Override
public void update(List<EtatCampagneChercheur> etatCampagneChercheurs){
if(ListUtil.isNotEmpty(etatCampagneChercheurs)){
etatCampagneChercheurs.forEach(e->etatCampagneChercheurDao.save(e));
}
}



@Override
public List<List<EtatCampagneChercheur>>  getToBeSavedAndToBeDeleted(List<EtatCampagneChercheur> oldList,List<EtatCampagneChercheur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
