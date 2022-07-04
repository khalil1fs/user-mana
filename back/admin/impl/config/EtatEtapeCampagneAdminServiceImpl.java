package com.ird.faa.service.admin.impl.config;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.config.EtatEtapeCampagneDao;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;

import com.ird.faa.ws.rest.provided.vo.config.EtatEtapeCampagneVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtatEtapeCampagneAdminServiceImpl extends AbstractServiceImpl<EtatEtapeCampagne> implements EtatEtapeCampagneAdminService {

@Autowired
private EtatEtapeCampagneDao etatEtapeCampagneDao;



@Autowired
private EntityManager entityManager;


@Override
public List<EtatEtapeCampagne> findAll(){
return etatEtapeCampagneDao.findAll();
}
    @Override
    public EtatEtapeCampagne findByCode(String code){
    if( code==null) return null;
    return etatEtapeCampagneDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return etatEtapeCampagneDao.deleteByCode(code);
    }
    @Override
    public EtatEtapeCampagne findByIdOrCode(EtatEtapeCampagne etatEtapeCampagne){
    EtatEtapeCampagne resultat=null;
    if(etatEtapeCampagne == null || ( etatEtapeCampagne.getCode()==null && etatEtapeCampagne.getId()==null))
    return resultat;
    else{
    if(etatEtapeCampagne.getId() != null){
    resultat= etatEtapeCampagneDao.findById(etatEtapeCampagne.getId()).get();
    }else if(StringUtil.isNotEmpty(etatEtapeCampagne.getCode())) {
    resultat= etatEtapeCampagneDao.findByCode(etatEtapeCampagne.getCode());
    }
    return resultat;
    }
    }

@Override
public EtatEtapeCampagne findById(Long id){
if(id==null) return null;
return etatEtapeCampagneDao.getOne(id);
}

@Override
public EtatEtapeCampagne findByIdWithAssociatedList(Long id){
EtatEtapeCampagne etatEtapeCampagne  = findById(id);
return etatEtapeCampagne;
}


@Transactional
public int deleteById(Long id){
if(etatEtapeCampagneDao.findById(id) == null) return 0;
else{
etatEtapeCampagneDao.deleteById(id);
return 1;
}
}


@Override
public EtatEtapeCampagne update(EtatEtapeCampagne etatEtapeCampagne){
EtatEtapeCampagne foundedEtatEtapeCampagne = findById(etatEtapeCampagne.getId());
if(foundedEtatEtapeCampagne==null) return null;
else{
return  etatEtapeCampagneDao.save(etatEtapeCampagne);
}
}

@Override
public EtatEtapeCampagne save (EtatEtapeCampagne etatEtapeCampagne){
    EtatEtapeCampagne foundedEtatEtapeCampagne = findByCode(etatEtapeCampagne.getCode());
   if(foundedEtatEtapeCampagne!=null) return null;



EtatEtapeCampagne savedEtatEtapeCampagne = etatEtapeCampagneDao.save(etatEtapeCampagne);
return savedEtatEtapeCampagne;
}

@Override
public List<EtatEtapeCampagne> save(List<EtatEtapeCampagne> etatEtapeCampagnes){
List<EtatEtapeCampagne> list = new ArrayList<EtatEtapeCampagne>();
for(EtatEtapeCampagne etatEtapeCampagne: etatEtapeCampagnes){
list.add(save(etatEtapeCampagne));
}
return list;
}



@Override
@Transactional
public int delete(EtatEtapeCampagne etatEtapeCampagne){
    if(etatEtapeCampagne.getCode()==null) return -1;

    EtatEtapeCampagne foundedEtatEtapeCampagne = findByCode(etatEtapeCampagne.getCode());
    if(foundedEtatEtapeCampagne==null) return -1;
etatEtapeCampagneDao.delete(foundedEtatEtapeCampagne);
return 1;
}


public List<EtatEtapeCampagne> findByCriteria(EtatEtapeCampagneVo etatEtapeCampagneVo){

String query = "SELECT o FROM EtatEtapeCampagne o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etatEtapeCampagneVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",etatEtapeCampagneVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",etatEtapeCampagneVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<EtatEtapeCampagne> etatEtapeCampagnes){
        if(ListUtil.isNotEmpty(etatEtapeCampagnes)){
        etatEtapeCampagnes.forEach(e->etatEtapeCampagneDao.delete(e));
        }
}
@Override
public void update(List<EtatEtapeCampagne> etatEtapeCampagnes){
if(ListUtil.isNotEmpty(etatEtapeCampagnes)){
etatEtapeCampagnes.forEach(e->etatEtapeCampagneDao.save(e));
}
}



@Override
public List<List<EtatEtapeCampagne>>  getToBeSavedAndToBeDeleted(List<EtatEtapeCampagne> oldList,List<EtatEtapeCampagne> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
