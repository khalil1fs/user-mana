package com.ird.faa.service.admin.impl.referentiel;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.referentiel.NatureActiviteGrandPublique;
import com.ird.faa.dao.referentiel.NatureActiviteGrandPubliqueDao;
import com.ird.faa.service.admin.facade.referentiel.NatureActiviteGrandPubliqueAdminService;

import com.ird.faa.ws.rest.provided.vo.referentiel.NatureActiviteGrandPubliqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class NatureActiviteGrandPubliqueAdminServiceImpl extends AbstractServiceImpl<NatureActiviteGrandPublique> implements NatureActiviteGrandPubliqueAdminService {

@Autowired
private NatureActiviteGrandPubliqueDao natureActiviteGrandPubliqueDao;



@Autowired
private EntityManager entityManager;


@Override
public List<NatureActiviteGrandPublique> findAll(){
return natureActiviteGrandPubliqueDao.findAll();
}
    @Override
    public NatureActiviteGrandPublique findByCode(String code){
    if( code==null) return null;
    return natureActiviteGrandPubliqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return natureActiviteGrandPubliqueDao.deleteByCode(code);
    }
    @Override
    public NatureActiviteGrandPublique findByIdOrCode(NatureActiviteGrandPublique natureActiviteGrandPublique){
    NatureActiviteGrandPublique resultat=null;
    if(natureActiviteGrandPublique == null || ( natureActiviteGrandPublique.getCode()==null && natureActiviteGrandPublique.getId()==null))
    return resultat;
    else{
    if(natureActiviteGrandPublique.getId() != null){
    resultat= natureActiviteGrandPubliqueDao.findById(natureActiviteGrandPublique.getId()).get();
    }else if(StringUtil.isNotEmpty(natureActiviteGrandPublique.getCode())) {
    resultat= natureActiviteGrandPubliqueDao.findByCode(natureActiviteGrandPublique.getCode());
    }
    return resultat;
    }
    }

@Override
public NatureActiviteGrandPublique findById(Long id){
if(id==null) return null;
return natureActiviteGrandPubliqueDao.getOne(id);
}

@Override
public NatureActiviteGrandPublique findByIdWithAssociatedList(Long id){
NatureActiviteGrandPublique natureActiviteGrandPublique  = findById(id);
return natureActiviteGrandPublique;
}


@Transactional
public int deleteById(Long id){
if(natureActiviteGrandPubliqueDao.findById(id) == null) return 0;
else{
natureActiviteGrandPubliqueDao.deleteById(id);
return 1;
}
}


@Override
public NatureActiviteGrandPublique update(NatureActiviteGrandPublique natureActiviteGrandPublique){
NatureActiviteGrandPublique foundedNatureActiviteGrandPublique = findById(natureActiviteGrandPublique.getId());
if(foundedNatureActiviteGrandPublique==null) return null;
else{
    prepare(natureActiviteGrandPublique);
    return  natureActiviteGrandPubliqueDao.save(natureActiviteGrandPublique);
}
}

@Override
public NatureActiviteGrandPublique save (NatureActiviteGrandPublique natureActiviteGrandPublique){
    NatureActiviteGrandPublique foundedNatureActiviteGrandPublique = findByCode(natureActiviteGrandPublique.getCode());
   if(foundedNatureActiviteGrandPublique!=null) return null;


    prepare(natureActiviteGrandPublique);

NatureActiviteGrandPublique savedNatureActiviteGrandPublique = natureActiviteGrandPubliqueDao.save(natureActiviteGrandPublique);
return savedNatureActiviteGrandPublique;
}

@Override
public List<NatureActiviteGrandPublique> save(List<NatureActiviteGrandPublique> natureActiviteGrandPubliques){
List<NatureActiviteGrandPublique> list = new ArrayList<NatureActiviteGrandPublique>();
for(NatureActiviteGrandPublique natureActiviteGrandPublique: natureActiviteGrandPubliques){
list.add(save(natureActiviteGrandPublique));
}
return list;
}



@Override
@Transactional
public int delete(NatureActiviteGrandPublique natureActiviteGrandPublique){
    if(natureActiviteGrandPublique.getCode()==null) return -1;

    NatureActiviteGrandPublique foundedNatureActiviteGrandPublique = findByCode(natureActiviteGrandPublique.getCode());
    if(foundedNatureActiviteGrandPublique==null) return -1;
natureActiviteGrandPubliqueDao.delete(foundedNatureActiviteGrandPublique);
return 1;
}


public List<NatureActiviteGrandPublique> findByCriteria(NatureActiviteGrandPubliqueVo natureActiviteGrandPubliqueVo){

String query = "SELECT o FROM NatureActiviteGrandPublique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",natureActiviteGrandPubliqueVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",natureActiviteGrandPubliqueVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",natureActiviteGrandPubliqueVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<NatureActiviteGrandPublique> natureActiviteGrandPubliques){
        if(ListUtil.isNotEmpty(natureActiviteGrandPubliques)){
        natureActiviteGrandPubliques.forEach(e->natureActiviteGrandPubliqueDao.delete(e));
        }
}
@Override
public void update(List<NatureActiviteGrandPublique> natureActiviteGrandPubliques){
if(ListUtil.isNotEmpty(natureActiviteGrandPubliques)){
natureActiviteGrandPubliques.forEach(e->natureActiviteGrandPubliqueDao.save(e));
}
}



@Override
public List<List<NatureActiviteGrandPublique>>  getToBeSavedAndToBeDeleted(List<NatureActiviteGrandPublique> oldList,List<NatureActiviteGrandPublique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
