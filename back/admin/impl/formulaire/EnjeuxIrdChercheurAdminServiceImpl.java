package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnjeuxIrdChercheur;
        import com.ird.faa.bean.referentiel.EnjeuxIrd;
        import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.EnjeuxIrdChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.EnjeuxIrdChercheurAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnjeuxIrdChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnjeuxIrdChercheurAdminServiceImpl extends AbstractServiceImpl<EnjeuxIrdChercheur> implements EnjeuxIrdChercheurAdminService {

@Autowired
private EnjeuxIrdChercheurDao enjeuxIrdChercheurDao;

        @Autowired
        private EnjeuxIrdAdminService enjeuxIrdService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnjeuxIrdChercheur> findAll(){
return enjeuxIrdChercheurDao.findAll();
}

        @Override
        public List<EnjeuxIrdChercheur> findByEnjeuxIrdCode(String code){
        return enjeuxIrdChercheurDao.findByEnjeuxIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdCode(String code){
        return enjeuxIrdChercheurDao.deleteByEnjeuxIrdCode(code);
        }

        @Override
        public List<EnjeuxIrdChercheur> findByEnjeuxIrdId(Long id){
        return enjeuxIrdChercheurDao.findByEnjeuxIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdId(Long id){
        return enjeuxIrdChercheurDao.deleteByEnjeuxIrdId(id);
        }


        @Override
        public List<EnjeuxIrdChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return enjeuxIrdChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return enjeuxIrdChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<EnjeuxIrdChercheur> findByChercheurId(Long id){
        return enjeuxIrdChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return enjeuxIrdChercheurDao.deleteByChercheurId(id);
        }


@Override
public EnjeuxIrdChercheur findById(Long id){
if(id==null) return null;
return enjeuxIrdChercheurDao.getOne(id);
}

@Override
public EnjeuxIrdChercheur findByIdWithAssociatedList(Long id){
EnjeuxIrdChercheur enjeuxIrdChercheur  = findById(id);
return enjeuxIrdChercheur;
}


@Transactional
public int deleteById(Long id){
if(enjeuxIrdChercheurDao.findById(id) == null) return 0;
else{
enjeuxIrdChercheurDao.deleteById(id);
return 1;
}
}


@Override
public EnjeuxIrdChercheur update(EnjeuxIrdChercheur enjeuxIrdChercheur){
EnjeuxIrdChercheur foundedEnjeuxIrdChercheur = findById(enjeuxIrdChercheur.getId());
if(foundedEnjeuxIrdChercheur==null) return null;
else{
return  enjeuxIrdChercheurDao.save(enjeuxIrdChercheur);
}
}

@Override
public EnjeuxIrdChercheur save (EnjeuxIrdChercheur enjeuxIrdChercheur){


    findEnjeuxIrd(enjeuxIrdChercheur);
    findChercheur(enjeuxIrdChercheur);

EnjeuxIrdChercheur savedEnjeuxIrdChercheur = enjeuxIrdChercheurDao.save(enjeuxIrdChercheur);
return savedEnjeuxIrdChercheur;
}

@Override
public List<EnjeuxIrdChercheur> save(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
List<EnjeuxIrdChercheur> list = new ArrayList<EnjeuxIrdChercheur>();
for(EnjeuxIrdChercheur enjeuxIrdChercheur: enjeuxIrdChercheurs){
list.add(save(enjeuxIrdChercheur));
}
return list;
}



@Override
@Transactional
public int delete(EnjeuxIrdChercheur enjeuxIrdChercheur){
    if(enjeuxIrdChercheur.getId()==null) return -1;
    EnjeuxIrdChercheur foundedEnjeuxIrdChercheur = findById(enjeuxIrdChercheur.getId());
    if(foundedEnjeuxIrdChercheur==null) return -1;
enjeuxIrdChercheurDao.delete(foundedEnjeuxIrdChercheur);
return 1;
}


public List<EnjeuxIrdChercheur> findByCriteria(EnjeuxIrdChercheurVo enjeuxIrdChercheurVo){

String query = "SELECT o FROM EnjeuxIrdChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enjeuxIrdChercheurVo.getId());
    if(enjeuxIrdChercheurVo.getEnjeuxIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "enjeuxIrd.id","=",enjeuxIrdChercheurVo.getEnjeuxIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "enjeuxIrd.code","LIKE",enjeuxIrdChercheurVo.getEnjeuxIrdVo().getCode());
    }

    if(enjeuxIrdChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",enjeuxIrdChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",enjeuxIrdChercheurVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnjeuxIrd(EnjeuxIrdChercheur enjeuxIrdChercheur){
        EnjeuxIrd loadedEnjeuxIrd =enjeuxIrdService.findByIdOrCode(enjeuxIrdChercheur.getEnjeuxIrd());

    if(loadedEnjeuxIrd==null ) {
        return;
    }
    enjeuxIrdChercheur.setEnjeuxIrd(loadedEnjeuxIrd);
    }
    private void findChercheur(EnjeuxIrdChercheur enjeuxIrdChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(enjeuxIrdChercheur.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    enjeuxIrdChercheur.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
        if(ListUtil.isNotEmpty(enjeuxIrdChercheurs)){
        enjeuxIrdChercheurs.forEach(e->enjeuxIrdChercheurDao.delete(e));
        }
}
@Override
public void update(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
if(ListUtil.isNotEmpty(enjeuxIrdChercheurs)){
enjeuxIrdChercheurs.forEach(e->enjeuxIrdChercheurDao.save(e));
}
}



@Override
public List<List<EnjeuxIrdChercheur>>  getToBeSavedAndToBeDeleted(List<EnjeuxIrdChercheur> oldList,List<EnjeuxIrdChercheur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
