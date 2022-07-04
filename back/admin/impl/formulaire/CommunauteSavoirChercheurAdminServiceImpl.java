package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirChercheur;
        import com.ird.faa.bean.referentiel.CommunauteSavoir;
        import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.CommunauteSavoirChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirChercheurAdminService;
        import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirChercheurAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirChercheur> implements CommunauteSavoirChercheurAdminService {

@Autowired
private CommunauteSavoirChercheurDao communauteSavoirChercheurDao;

        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirChercheur> findAll(){
return communauteSavoirChercheurDao.findAll();
}

        @Override
        public List<CommunauteSavoirChercheur> findByCommunauteSavoirCode(String code){
        return communauteSavoirChercheurDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirChercheurDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirChercheur> findByCommunauteSavoirId(Long id){
        return communauteSavoirChercheurDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirChercheurDao.deleteByCommunauteSavoirId(id);
        }


        @Override
        public List<CommunauteSavoirChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return communauteSavoirChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return communauteSavoirChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CommunauteSavoirChercheur> findByChercheurId(Long id){
        return communauteSavoirChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return communauteSavoirChercheurDao.deleteByChercheurId(id);
        }


@Override
public CommunauteSavoirChercheur findById(Long id){
if(id==null) return null;
return communauteSavoirChercheurDao.getOne(id);
}

@Override
public CommunauteSavoirChercheur findByIdWithAssociatedList(Long id){
CommunauteSavoirChercheur communauteSavoirChercheur  = findById(id);
return communauteSavoirChercheur;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirChercheurDao.findById(id) == null) return 0;
else{
communauteSavoirChercheurDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirChercheur update(CommunauteSavoirChercheur communauteSavoirChercheur){
CommunauteSavoirChercheur foundedCommunauteSavoirChercheur = findById(communauteSavoirChercheur.getId());
if(foundedCommunauteSavoirChercheur==null) return null;
else{
return  communauteSavoirChercheurDao.save(communauteSavoirChercheur);
}
}

@Override
public CommunauteSavoirChercheur save (CommunauteSavoirChercheur communauteSavoirChercheur){


    findCommunauteSavoir(communauteSavoirChercheur);
    findChercheur(communauteSavoirChercheur);

CommunauteSavoirChercheur savedCommunauteSavoirChercheur = communauteSavoirChercheurDao.save(communauteSavoirChercheur);
return savedCommunauteSavoirChercheur;
}

@Override
public List<CommunauteSavoirChercheur> save(List<CommunauteSavoirChercheur> communauteSavoirChercheurs){
List<CommunauteSavoirChercheur> list = new ArrayList<CommunauteSavoirChercheur>();
for(CommunauteSavoirChercheur communauteSavoirChercheur: communauteSavoirChercheurs){
list.add(save(communauteSavoirChercheur));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirChercheur communauteSavoirChercheur){
    if(communauteSavoirChercheur.getId()==null) return -1;
    CommunauteSavoirChercheur foundedCommunauteSavoirChercheur = findById(communauteSavoirChercheur.getId());
    if(foundedCommunauteSavoirChercheur==null) return -1;
communauteSavoirChercheurDao.delete(foundedCommunauteSavoirChercheur);
return 1;
}


public List<CommunauteSavoirChercheur> findByCriteria(CommunauteSavoirChercheurVo communauteSavoirChercheurVo){

String query = "SELECT o FROM CommunauteSavoirChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirChercheurVo.getId());
    if(communauteSavoirChercheurVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirChercheurVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirChercheurVo.getCommunauteSavoirVo().getCode());
    }

    if(communauteSavoirChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",communauteSavoirChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",communauteSavoirChercheurVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommunauteSavoir(CommunauteSavoirChercheur communauteSavoirChercheur){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirChercheur.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirChercheur.setCommunauteSavoir(loadedCommunauteSavoir);
    }
    private void findChercheur(CommunauteSavoirChercheur communauteSavoirChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(communauteSavoirChercheur.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    communauteSavoirChercheur.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirChercheur> communauteSavoirChercheurs){
        if(ListUtil.isNotEmpty(communauteSavoirChercheurs)){
        communauteSavoirChercheurs.forEach(e->communauteSavoirChercheurDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirChercheur> communauteSavoirChercheurs){
if(ListUtil.isNotEmpty(communauteSavoirChercheurs)){
communauteSavoirChercheurs.forEach(e->communauteSavoirChercheurDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirChercheur>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirChercheur> oldList,List<CommunauteSavoirChercheur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
