package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DomaineScientifique;
import com.ird.faa.dao.formulaire.DomaineScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DomaineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DomaineScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DomaineScientifiqueAdminServiceImpl extends AbstractServiceImpl<DomaineScientifique> implements DomaineScientifiqueAdminService {

@Autowired
private DomaineScientifiqueDao domaineScientifiqueDao;



@Autowired
private EntityManager entityManager;


@Override
public List<DomaineScientifique> findAll(){
return domaineScientifiqueDao.findAll();
}
    @Override
    public DomaineScientifique findByCode(String code){
    if( code==null) return null;
    return domaineScientifiqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return domaineScientifiqueDao.deleteByCode(code);
    }
    @Override
    public DomaineScientifique findByIdOrCode(DomaineScientifique domaineScientifique){
    DomaineScientifique resultat=null;
    if(domaineScientifique == null || ( domaineScientifique.getCode()==null && domaineScientifique.getId()==null))
    return resultat;
    else{
    if(domaineScientifique.getId() != null){
    resultat= domaineScientifiqueDao.findById(domaineScientifique.getId()).get();
    }else if(StringUtil.isNotEmpty(domaineScientifique.getCode())) {
    resultat= domaineScientifiqueDao.findByCode(domaineScientifique.getCode());
    }
    return resultat;
    }
    }

@Override
public DomaineScientifique findById(Long id){
if(id==null) return null;
return domaineScientifiqueDao.getOne(id);
}

@Override
public DomaineScientifique findByIdWithAssociatedList(Long id){
DomaineScientifique domaineScientifique  = findById(id);
return domaineScientifique;
}


@Transactional
public int deleteById(Long id){
if(domaineScientifiqueDao.findById(id) == null) return 0;
else{
domaineScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public DomaineScientifique update(DomaineScientifique domaineScientifique){
DomaineScientifique foundedDomaineScientifique = findById(domaineScientifique.getId());
if(foundedDomaineScientifique==null) return null;
else{
return  domaineScientifiqueDao.save(domaineScientifique);
}
}

@Override
public DomaineScientifique save (DomaineScientifique domaineScientifique){
    DomaineScientifique foundedDomaineScientifique = findByCode(domaineScientifique.getCode());
   if(foundedDomaineScientifique!=null) return null;



DomaineScientifique savedDomaineScientifique = domaineScientifiqueDao.save(domaineScientifique);
return savedDomaineScientifique;
}

@Override
public List<DomaineScientifique> save(List<DomaineScientifique> domaineScientifiques){
List<DomaineScientifique> list = new ArrayList<DomaineScientifique>();
for(DomaineScientifique domaineScientifique: domaineScientifiques){
list.add(save(domaineScientifique));
}
return list;
}



@Override
@Transactional
public int delete(DomaineScientifique domaineScientifique){
    if(domaineScientifique.getCode()==null) return -1;

    DomaineScientifique foundedDomaineScientifique = findByCode(domaineScientifique.getCode());
    if(foundedDomaineScientifique==null) return -1;
domaineScientifiqueDao.delete(foundedDomaineScientifique);
return 1;
}


public List<DomaineScientifique> findByCriteria(DomaineScientifiqueVo domaineScientifiqueVo){

String query = "SELECT o FROM DomaineScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",domaineScientifiqueVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",domaineScientifiqueVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",domaineScientifiqueVo.getCode());
            query += SearchUtil.addConstraint( "o", "description","LIKE",domaineScientifiqueVo.getDescription());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<DomaineScientifique> domaineScientifiques){
        if(ListUtil.isNotEmpty(domaineScientifiques)){
        domaineScientifiques.forEach(e->domaineScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<DomaineScientifique> domaineScientifiques){
if(ListUtil.isNotEmpty(domaineScientifiques)){
domaineScientifiques.forEach(e->domaineScientifiqueDao.save(e));
}
}



@Override
public List<List<DomaineScientifique>>  getToBeSavedAndToBeDeleted(List<DomaineScientifique> oldList,List<DomaineScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
