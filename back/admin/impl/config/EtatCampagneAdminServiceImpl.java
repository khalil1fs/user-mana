package com.ird.faa.service.admin.impl.config;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.config.EtatCampagne;
import com.ird.faa.dao.config.EtatCampagneDao;
import com.ird.faa.service.admin.facade.config.EtatCampagneAdminService;

import com.ird.faa.ws.rest.provided.vo.config.EtatCampagneVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtatCampagneAdminServiceImpl extends AbstractServiceImpl<EtatCampagne> implements EtatCampagneAdminService {

@Autowired
private EtatCampagneDao etatCampagneDao;



@Autowired
private EntityManager entityManager;


@Override
public List<EtatCampagne> findAll(){
return etatCampagneDao.findAll();
}
    @Override
    public EtatCampagne findByCode(String code){
    if( code==null) return null;
    return etatCampagneDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return etatCampagneDao.deleteByCode(code);
    }
    @Override
    public EtatCampagne findByIdOrCode(EtatCampagne etatCampagne){
    EtatCampagne resultat=null;
    if(etatCampagne == null || ( etatCampagne.getCode()==null && etatCampagne.getId()==null))
    return resultat;
    else{
    if(etatCampagne.getId() != null){
    resultat= etatCampagneDao.findById(etatCampagne.getId()).get();
    }else if(StringUtil.isNotEmpty(etatCampagne.getCode())) {
    resultat= etatCampagneDao.findByCode(etatCampagne.getCode());
    }
    return resultat;
    }
    }

@Override
public EtatCampagne findById(Long id){
if(id==null) return null;
return etatCampagneDao.getOne(id);
}

@Override
public EtatCampagne findByIdWithAssociatedList(Long id){
EtatCampagne etatCampagne  = findById(id);
return etatCampagne;
}


@Transactional
public int deleteById(Long id){
if(etatCampagneDao.findById(id) == null) return 0;
else{
etatCampagneDao.deleteById(id);
return 1;
}
}


@Override
public EtatCampagne update(EtatCampagne etatCampagne){
EtatCampagne foundedEtatCampagne = findById(etatCampagne.getId());
if(foundedEtatCampagne==null) return null;
else{
return  etatCampagneDao.save(etatCampagne);
}
}

@Override
public EtatCampagne save (EtatCampagne etatCampagne){
    EtatCampagne foundedEtatCampagne = findByCode(etatCampagne.getCode());
   if(foundedEtatCampagne!=null) return null;



EtatCampagne savedEtatCampagne = etatCampagneDao.save(etatCampagne);
return savedEtatCampagne;
}

@Override
public List<EtatCampagne> save(List<EtatCampagne> etatCampagnes){
List<EtatCampagne> list = new ArrayList<EtatCampagne>();
for(EtatCampagne etatCampagne: etatCampagnes){
list.add(save(etatCampagne));
}
return list;
}



@Override
@Transactional
public int delete(EtatCampagne etatCampagne){
    if(etatCampagne.getCode()==null) return -1;

    EtatCampagne foundedEtatCampagne = findByCode(etatCampagne.getCode());
    if(foundedEtatCampagne==null) return -1;
etatCampagneDao.delete(foundedEtatCampagne);
return 1;
}


public List<EtatCampagne> findByCriteria(EtatCampagneVo etatCampagneVo){

String query = "SELECT o FROM EtatCampagne o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etatCampagneVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",etatCampagneVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",etatCampagneVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<EtatCampagne> etatCampagnes){
        if(ListUtil.isNotEmpty(etatCampagnes)){
        etatCampagnes.forEach(e->etatCampagneDao.delete(e));
        }
}
@Override
public void update(List<EtatCampagne> etatCampagnes){
if(ListUtil.isNotEmpty(etatCampagnes)){
etatCampagnes.forEach(e->etatCampagneDao.save(e));
}
}



@Override
public List<List<EtatCampagne>>  getToBeSavedAndToBeDeleted(List<EtatCampagne> oldList,List<EtatCampagne> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
