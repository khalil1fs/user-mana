package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EncadrementEtudiantEnjeuxIrd;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.dao.formulaire.EncadrementEtudiantEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementEtudiantEnjeuxIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EncadrementEtudiantEnjeuxIrdAdminServiceImpl extends AbstractServiceImpl<EncadrementEtudiantEnjeuxIrd> implements EncadrementEtudiantEnjeuxIrdAdminService {

@Autowired
private EncadrementEtudiantEnjeuxIrdDao encadrementEtudiantEnjeuxIrdDao;

        @Autowired
        private EncadrementEtudiantAdminService encadrementEtudiantService ;
        @Autowired
        private EnjeuxIrdAdminService enjeuxIrdService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EncadrementEtudiantEnjeuxIrd> findAll(){
return encadrementEtudiantEnjeuxIrdDao.findAll();
}
        @Override
        public List<EncadrementEtudiantEnjeuxIrd> findByEncadrementEtudiantId(Long id){
        return encadrementEtudiantEnjeuxIrdDao.findByEncadrementEtudiantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementEtudiantId(Long id){
        return encadrementEtudiantEnjeuxIrdDao.deleteByEncadrementEtudiantId(id);
        }


        @Override
        public List<EncadrementEtudiantEnjeuxIrd> findByEnjeuxIrdCode(String code){
        return encadrementEtudiantEnjeuxIrdDao.findByEnjeuxIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdCode(String code){
        return encadrementEtudiantEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
        }

        @Override
        public List<EncadrementEtudiantEnjeuxIrd> findByEnjeuxIrdId(Long id){
        return encadrementEtudiantEnjeuxIrdDao.findByEnjeuxIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdId(Long id){
        return encadrementEtudiantEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
        }


@Override
public EncadrementEtudiantEnjeuxIrd findById(Long id){
if(id==null) return null;
return encadrementEtudiantEnjeuxIrdDao.getOne(id);
}

@Override
public EncadrementEtudiantEnjeuxIrd findByIdWithAssociatedList(Long id){
EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd  = findById(id);
return encadrementEtudiantEnjeuxIrd;
}


@Transactional
public int deleteById(Long id){
if(encadrementEtudiantEnjeuxIrdDao.findById(id) == null) return 0;
else{
encadrementEtudiantEnjeuxIrdDao.deleteById(id);
return 1;
}
}


@Override
public EncadrementEtudiantEnjeuxIrd update(EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd){
EncadrementEtudiantEnjeuxIrd foundedEncadrementEtudiantEnjeuxIrd = findById(encadrementEtudiantEnjeuxIrd.getId());
if(foundedEncadrementEtudiantEnjeuxIrd==null) return null;
else{
return  encadrementEtudiantEnjeuxIrdDao.save(encadrementEtudiantEnjeuxIrd);
}
}

@Override
public EncadrementEtudiantEnjeuxIrd save (EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd){


    findEncadrementEtudiant(encadrementEtudiantEnjeuxIrd);
    findEnjeuxIrd(encadrementEtudiantEnjeuxIrd);

EncadrementEtudiantEnjeuxIrd savedEncadrementEtudiantEnjeuxIrd = encadrementEtudiantEnjeuxIrdDao.save(encadrementEtudiantEnjeuxIrd);
return savedEncadrementEtudiantEnjeuxIrd;
}

@Override
public List<EncadrementEtudiantEnjeuxIrd> save(List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrds){
List<EncadrementEtudiantEnjeuxIrd> list = new ArrayList<EncadrementEtudiantEnjeuxIrd>();
for(EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd: encadrementEtudiantEnjeuxIrds){
list.add(save(encadrementEtudiantEnjeuxIrd));
}
return list;
}



@Override
@Transactional
public int delete(EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd){
    if(encadrementEtudiantEnjeuxIrd.getId()==null) return -1;
    EncadrementEtudiantEnjeuxIrd foundedEncadrementEtudiantEnjeuxIrd = findById(encadrementEtudiantEnjeuxIrd.getId());
    if(foundedEncadrementEtudiantEnjeuxIrd==null) return -1;
encadrementEtudiantEnjeuxIrdDao.delete(foundedEncadrementEtudiantEnjeuxIrd);
return 1;
}


public List<EncadrementEtudiantEnjeuxIrd> findByCriteria(EncadrementEtudiantEnjeuxIrdVo encadrementEtudiantEnjeuxIrdVo){

String query = "SELECT o FROM EncadrementEtudiantEnjeuxIrd o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",encadrementEtudiantEnjeuxIrdVo.getId());
    if(encadrementEtudiantEnjeuxIrdVo.getEncadrementEtudiantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementEtudiant.id","=",encadrementEtudiantEnjeuxIrdVo.getEncadrementEtudiantVo().getId());
    }

    if(encadrementEtudiantEnjeuxIrdVo.getEnjeuxIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "enjeuxIrd.id","=",encadrementEtudiantEnjeuxIrdVo.getEnjeuxIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "enjeuxIrd.code","LIKE",encadrementEtudiantEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEncadrementEtudiant(EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd){
        EncadrementEtudiant loadedEncadrementEtudiant = null;
        if(encadrementEtudiantEnjeuxIrd.getEncadrementEtudiant() != null && encadrementEtudiantEnjeuxIrd.getEncadrementEtudiant().getId() !=null)
        loadedEncadrementEtudiant =encadrementEtudiantService.findById(encadrementEtudiantEnjeuxIrd.getEncadrementEtudiant().getId());

    if(loadedEncadrementEtudiant==null ) {
        return;
    }
    encadrementEtudiantEnjeuxIrd.setEncadrementEtudiant(loadedEncadrementEtudiant);
    }
    private void findEnjeuxIrd(EncadrementEtudiantEnjeuxIrd encadrementEtudiantEnjeuxIrd){
        EnjeuxIrd loadedEnjeuxIrd =enjeuxIrdService.findByIdOrCode(encadrementEtudiantEnjeuxIrd.getEnjeuxIrd());

    if(loadedEnjeuxIrd==null ) {
        return;
    }
    encadrementEtudiantEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
    }

@Override
@Transactional
public void delete(List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrds){
        if(ListUtil.isNotEmpty(encadrementEtudiantEnjeuxIrds)){
        encadrementEtudiantEnjeuxIrds.forEach(e->encadrementEtudiantEnjeuxIrdDao.delete(e));
        }
}
@Override
public void update(List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrds){
if(ListUtil.isNotEmpty(encadrementEtudiantEnjeuxIrds)){
encadrementEtudiantEnjeuxIrds.forEach(e->encadrementEtudiantEnjeuxIrdDao.save(e));
}
}



@Override
public List<List<EncadrementEtudiantEnjeuxIrd>>  getToBeSavedAndToBeDeleted(List<EncadrementEtudiantEnjeuxIrd> oldList,List<EncadrementEtudiantEnjeuxIrd> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
