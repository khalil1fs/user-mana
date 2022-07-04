package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementEnjeuxIrd;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.dao.formulaire.EnseignementEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementEnjeuxIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementEnjeuxIrdAdminServiceImpl extends AbstractServiceImpl<EnseignementEnjeuxIrd> implements EnseignementEnjeuxIrdAdminService {

@Autowired
private EnseignementEnjeuxIrdDao enseignementEnjeuxIrdDao;

        @Autowired
        private EnseignementAdminService enseignementService ;
        @Autowired
        private EnjeuxIrdAdminService enjeuxIrdService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnseignementEnjeuxIrd> findAll(){
        return enseignementEnjeuxIrdDao.findAll();
}
        @Override
        public List<EnseignementEnjeuxIrd> findByEnseignementId(Long id){
        return enseignementEnjeuxIrdDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return enseignementEnjeuxIrdDao.deleteByEnseignementId(id);
        }


        @Override
        public List<EnseignementEnjeuxIrd> findByEnjeuxIrdCode(String code){
        return enseignementEnjeuxIrdDao.findByEnjeuxIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdCode(String code){
        return enseignementEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
        }

        @Override
        public List<EnseignementEnjeuxIrd> findByEnjeuxIrdId(Long id){
        return enseignementEnjeuxIrdDao.findByEnjeuxIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdId(Long id){
        return enseignementEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
        }


@Override
public EnseignementEnjeuxIrd findById(Long id){
if(id==null) return null;
return enseignementEnjeuxIrdDao.getOne(id);
}

@Override
public EnseignementEnjeuxIrd findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(enseignementEnjeuxIrdDao.findById(id).isPresent())  {
enseignementEnjeuxIrdDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public EnseignementEnjeuxIrd update(EnseignementEnjeuxIrd enseignementEnjeuxIrd){
EnseignementEnjeuxIrd foundedEnseignementEnjeuxIrd = findById(enseignementEnjeuxIrd.getId());
if(foundedEnseignementEnjeuxIrd==null) return null;
else{
return  enseignementEnjeuxIrdDao.save(enseignementEnjeuxIrd);
}
}

@Override
public EnseignementEnjeuxIrd save (EnseignementEnjeuxIrd enseignementEnjeuxIrd){



    findEnseignement(enseignementEnjeuxIrd);
    findEnjeuxIrd(enseignementEnjeuxIrd);

return enseignementEnjeuxIrdDao.save(enseignementEnjeuxIrd);


}

@Override
public List<EnseignementEnjeuxIrd> save(List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds){
List<EnseignementEnjeuxIrd> list = new ArrayList<>();
for(EnseignementEnjeuxIrd enseignementEnjeuxIrd: enseignementEnjeuxIrds){
list.add(save(enseignementEnjeuxIrd));
}
return list;
}



@Override
@Transactional
public int delete(EnseignementEnjeuxIrd enseignementEnjeuxIrd){
    if(enseignementEnjeuxIrd.getId()==null) return -1;
    EnseignementEnjeuxIrd foundedEnseignementEnjeuxIrd = findById(enseignementEnjeuxIrd.getId());
    if(foundedEnseignementEnjeuxIrd==null) return -1;
enseignementEnjeuxIrdDao.delete(foundedEnseignementEnjeuxIrd);
return 1;
}


public List<EnseignementEnjeuxIrd> findByCriteria(EnseignementEnjeuxIrdVo enseignementEnjeuxIrdVo){

String query = "SELECT o FROM EnseignementEnjeuxIrd o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enseignementEnjeuxIrdVo.getId());
    if(enseignementEnjeuxIrdVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",enseignementEnjeuxIrdVo.getEnseignementVo().getId());
    }

    if(enseignementEnjeuxIrdVo.getEnjeuxIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "enjeuxIrd.id","=",enseignementEnjeuxIrdVo.getEnjeuxIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "enjeuxIrd.code","LIKE",enseignementEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnseignement(EnseignementEnjeuxIrd enseignementEnjeuxIrd){
        Enseignement loadedEnseignement = null;
        if(enseignementEnjeuxIrd.getEnseignement() != null && enseignementEnjeuxIrd.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(enseignementEnjeuxIrd.getEnseignement().getId());

    if(loadedEnseignement==null ) {
        return;
    }
    enseignementEnjeuxIrd.setEnseignement(loadedEnseignement);
    }
    private void findEnjeuxIrd(EnseignementEnjeuxIrd enseignementEnjeuxIrd){
        EnjeuxIrd loadedEnjeuxIrd =enjeuxIrdService.findByIdOrCode(enseignementEnjeuxIrd.getEnjeuxIrd());

    if(loadedEnjeuxIrd==null ) {
        return;
    }
    enseignementEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
    }

@Override
@Transactional
public void delete(List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds){
        if(ListUtil.isNotEmpty(enseignementEnjeuxIrds)){
        enseignementEnjeuxIrds.forEach(e->enseignementEnjeuxIrdDao.delete(e));
        }
}
@Override
public void update(List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds){
if(ListUtil.isNotEmpty(enseignementEnjeuxIrds)){
enseignementEnjeuxIrds.forEach(e->enseignementEnjeuxIrdDao.save(e));
}
}



}
