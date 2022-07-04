package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommissionScientifique;
import com.ird.faa.dao.formulaire.CommissionScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.CommissionScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommissionScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommissionScientifiqueAdminServiceImpl extends AbstractServiceImpl<CommissionScientifique> implements CommissionScientifiqueAdminService {

@Autowired
private CommissionScientifiqueDao commissionScientifiqueDao;



@Autowired
private EntityManager entityManager;


@Override
public List<CommissionScientifique> findAll(){
return commissionScientifiqueDao.findAll();
}
    @Override
    public CommissionScientifique findByCode(String code){
    if( code==null) return null;
    return commissionScientifiqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return commissionScientifiqueDao.deleteByCode(code);
    }
    @Override
    public CommissionScientifique findByIdOrCode(CommissionScientifique commissionScientifique){
    CommissionScientifique resultat=null;
    if(commissionScientifique == null || ( commissionScientifique.getCode()==null && commissionScientifique.getId()==null))
    return resultat;
    else{
    if(commissionScientifique.getId() != null){
    resultat= commissionScientifiqueDao.findById(commissionScientifique.getId()).get();
    }else if(StringUtil.isNotEmpty(commissionScientifique.getCode())) {
    resultat= commissionScientifiqueDao.findByCode(commissionScientifique.getCode());
    }
    return resultat;
    }
    }

@Override
public CommissionScientifique findById(Long id){
if(id==null) return null;
return commissionScientifiqueDao.getOne(id);
}

@Override
public CommissionScientifique findByIdWithAssociatedList(Long id){
CommissionScientifique commissionScientifique  = findById(id);
return commissionScientifique;
}


@Transactional
public int deleteById(Long id){
if(commissionScientifiqueDao.findById(id) == null) return 0;
else{
commissionScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public CommissionScientifique update(CommissionScientifique commissionScientifique){
CommissionScientifique foundedCommissionScientifique = findById(commissionScientifique.getId());
if(foundedCommissionScientifique==null) return null;
else{
return  commissionScientifiqueDao.save(commissionScientifique);
}
}

@Override
public CommissionScientifique save (CommissionScientifique commissionScientifique){
    CommissionScientifique foundedCommissionScientifique = findByCode(commissionScientifique.getCode());
   if(foundedCommissionScientifique!=null) return null;



CommissionScientifique savedCommissionScientifique = commissionScientifiqueDao.save(commissionScientifique);
return savedCommissionScientifique;
}

@Override
public List<CommissionScientifique> save(List<CommissionScientifique> commissionScientifiques){
List<CommissionScientifique> list = new ArrayList<CommissionScientifique>();
for(CommissionScientifique commissionScientifique: commissionScientifiques){
list.add(save(commissionScientifique));
}
return list;
}



@Override
@Transactional
public int delete(CommissionScientifique commissionScientifique){
    if(commissionScientifique.getCode()==null) return -1;

    CommissionScientifique foundedCommissionScientifique = findByCode(commissionScientifique.getCode());
    if(foundedCommissionScientifique==null) return -1;
commissionScientifiqueDao.delete(foundedCommissionScientifique);
return 1;
}


public List<CommissionScientifique> findByCriteria(CommissionScientifiqueVo commissionScientifiqueVo){

String query = "SELECT o FROM CommissionScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",commissionScientifiqueVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",commissionScientifiqueVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",commissionScientifiqueVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<CommissionScientifique> commissionScientifiques){
        if(ListUtil.isNotEmpty(commissionScientifiques)){
        commissionScientifiques.forEach(e->commissionScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<CommissionScientifique> commissionScientifiques){
if(ListUtil.isNotEmpty(commissionScientifiques)){
commissionScientifiques.forEach(e->commissionScientifiqueDao.save(e));
}
}



@Override
public List<List<CommissionScientifique>>  getToBeSavedAndToBeDeleted(List<CommissionScientifique> oldList,List<CommissionScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
