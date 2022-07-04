package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementNature;
import com.ird.faa.bean.referentiel.NatureEnseignement;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.dao.formulaire.EnseignementNatureDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementNatureAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.NatureEnseignementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementNatureVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementNatureAdminServiceImpl extends AbstractServiceImpl<EnseignementNature> implements EnseignementNatureAdminService {

@Autowired
private EnseignementNatureDao enseignementNatureDao;

        @Autowired
        private EnseignementAdminService enseignementService ;
        @Autowired
        private NatureEnseignementAdminService natureEnseignementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnseignementNature> findAll(){
        return enseignementNatureDao.findAll();
}

        @Override
        public List<EnseignementNature> findByNatureEnseignementCode(String code){
        return enseignementNatureDao.findByNatureEnseignementCode(code);
        }

        @Override
        @Transactional
        public int deleteByNatureEnseignementCode(String code){
        return enseignementNatureDao.deleteByNatureEnseignementCode(code);
        }

        @Override
        public List<EnseignementNature> findByNatureEnseignementId(Long id){
        return enseignementNatureDao.findByNatureEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByNatureEnseignementId(Long id){
        return enseignementNatureDao.deleteByNatureEnseignementId(id);
        }

        @Override
        public List<EnseignementNature> findByEnseignementId(Long id){
        return enseignementNatureDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return enseignementNatureDao.deleteByEnseignementId(id);
        }


@Override
public EnseignementNature findById(Long id){
if(id==null) return null;
return enseignementNatureDao.getOne(id);
}

@Override
public EnseignementNature findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(enseignementNatureDao.findById(id).isPresent())  {
enseignementNatureDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public EnseignementNature update(EnseignementNature enseignementNature){
EnseignementNature foundedEnseignementNature = findById(enseignementNature.getId());
if(foundedEnseignementNature==null) return null;
else{
return  enseignementNatureDao.save(enseignementNature);
}
}

@Override
public EnseignementNature save (EnseignementNature enseignementNature){



    findNatureEnseignement(enseignementNature);
    findEnseignement(enseignementNature);

return enseignementNatureDao.save(enseignementNature);


}

@Override
public List<EnseignementNature> save(List<EnseignementNature> enseignementNatures){
List<EnseignementNature> list = new ArrayList<>();
for(EnseignementNature enseignementNature: enseignementNatures){
list.add(save(enseignementNature));
}
return list;
}



@Override
@Transactional
public int delete(EnseignementNature enseignementNature){
    if(enseignementNature.getId()==null) return -1;
    EnseignementNature foundedEnseignementNature = findById(enseignementNature.getId());
    if(foundedEnseignementNature==null) return -1;
enseignementNatureDao.delete(foundedEnseignementNature);
return 1;
}


public List<EnseignementNature> findByCriteria(EnseignementNatureVo enseignementNatureVo){

String query = "SELECT o FROM EnseignementNature o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enseignementNatureVo.getId());
    if(enseignementNatureVo.getNatureEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "natureEnseignement.id","=",enseignementNatureVo.getNatureEnseignementVo().getId());
            query += SearchUtil.addConstraint( "o", "natureEnseignement.code","LIKE",enseignementNatureVo.getNatureEnseignementVo().getCode());
    }

    if(enseignementNatureVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",enseignementNatureVo.getEnseignementVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findNatureEnseignement(EnseignementNature enseignementNature){
        NatureEnseignement loadedNatureEnseignement =natureEnseignementService.findByIdOrCode(enseignementNature.getNatureEnseignement());

    if(loadedNatureEnseignement==null ) {
        return;
    }
    enseignementNature.setNatureEnseignement(loadedNatureEnseignement);
    }
    private void findEnseignement(EnseignementNature enseignementNature){
        Enseignement loadedEnseignement = null;
        if(enseignementNature.getEnseignement() != null && enseignementNature.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(enseignementNature.getEnseignement().getId());

    if(loadedEnseignement==null ) {
        return;
    }
    enseignementNature.setEnseignement(loadedEnseignement);
    }

@Override
@Transactional
public void delete(List<EnseignementNature> enseignementNatures){
        if(ListUtil.isNotEmpty(enseignementNatures)){
        enseignementNatures.forEach(e->enseignementNatureDao.delete(e));
        }
}
@Override
public void update(List<EnseignementNature> enseignementNatures){
if(ListUtil.isNotEmpty(enseignementNatures)){
enseignementNatures.forEach(e->enseignementNatureDao.save(e));
}
}



}
