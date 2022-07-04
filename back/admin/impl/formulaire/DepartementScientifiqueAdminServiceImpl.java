package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DepartementScientifique;
import com.ird.faa.dao.formulaire.DepartementScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DepartementScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DepartementScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DepartementScientifiqueAdminServiceImpl extends AbstractServiceImpl<DepartementScientifique> implements DepartementScientifiqueAdminService {

@Autowired
private DepartementScientifiqueDao departementScientifiqueDao;



@Autowired
private EntityManager entityManager;


@Override
public List<DepartementScientifique> findAll(){
return departementScientifiqueDao.findAll();
}
    @Override
    public DepartementScientifique findByCode(String code){
    if( code==null) return null;
    return departementScientifiqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return departementScientifiqueDao.deleteByCode(code);
    }
    @Override
    public DepartementScientifique findByIdOrCode(DepartementScientifique departementScientifique){
    DepartementScientifique resultat=null;
    if(departementScientifique == null || ( departementScientifique.getCode()==null && departementScientifique.getId()==null))
    return resultat;
    else{
    if(departementScientifique.getId() != null){
    resultat= departementScientifiqueDao.findById(departementScientifique.getId()).get();
    }else if(StringUtil.isNotEmpty(departementScientifique.getCode())) {
    resultat= departementScientifiqueDao.findByCode(departementScientifique.getCode());
    }
    return resultat;
    }
    }

@Override
public DepartementScientifique findById(Long id){
if(id==null) return null;
return departementScientifiqueDao.getOne(id);
}

@Override
public DepartementScientifique findByIdWithAssociatedList(Long id){
DepartementScientifique departementScientifique  = findById(id);
return departementScientifique;
}


@Transactional
public int deleteById(Long id){
if(departementScientifiqueDao.findById(id) == null) return 0;
else{
departementScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public DepartementScientifique update(DepartementScientifique departementScientifique){
DepartementScientifique foundedDepartementScientifique = findById(departementScientifique.getId());
if(foundedDepartementScientifique==null) return null;
else{
return  departementScientifiqueDao.save(departementScientifique);
}
}

@Override
public DepartementScientifique save (DepartementScientifique departementScientifique){
    DepartementScientifique foundedDepartementScientifique = findByCode(departementScientifique.getCode());
   if(foundedDepartementScientifique!=null) return null;



DepartementScientifique savedDepartementScientifique = departementScientifiqueDao.save(departementScientifique);
return savedDepartementScientifique;
}

@Override
public List<DepartementScientifique> save(List<DepartementScientifique> departementScientifiques){
List<DepartementScientifique> list = new ArrayList<DepartementScientifique>();
for(DepartementScientifique departementScientifique: departementScientifiques){
list.add(save(departementScientifique));
}
return list;
}



@Override
@Transactional
public int delete(DepartementScientifique departementScientifique){
    if(departementScientifique.getCode()==null) return -1;

    DepartementScientifique foundedDepartementScientifique = findByCode(departementScientifique.getCode());
    if(foundedDepartementScientifique==null) return -1;
departementScientifiqueDao.delete(foundedDepartementScientifique);
return 1;
}


public List<DepartementScientifique> findByCriteria(DepartementScientifiqueVo departementScientifiqueVo){

String query = "SELECT o FROM DepartementScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",departementScientifiqueVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",departementScientifiqueVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",departementScientifiqueVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<DepartementScientifique> departementScientifiques){
        if(ListUtil.isNotEmpty(departementScientifiques)){
        departementScientifiques.forEach(e->departementScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<DepartementScientifique> departementScientifiques){
if(ListUtil.isNotEmpty(departementScientifiques)){
departementScientifiques.forEach(e->departementScientifiqueDao.save(e));
}
}



@Override
public List<List<DepartementScientifique>>  getToBeSavedAndToBeDeleted(List<DepartementScientifique> oldList,List<DepartementScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
