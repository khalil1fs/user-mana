package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirProjetActiviteRecherche;
import com.ird.faa.bean.formulaire.ProjetActiviteRecherche;
import com.ird.faa.bean.referentiel.CommunauteSavoir;
import com.ird.faa.dao.formulaire.CommunauteSavoirProjetActiviteRechercheDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirProjetActiviteRechercheAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheAdminService;
import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirProjetActiviteRechercheVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirProjetActiviteRechercheAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirProjetActiviteRecherche> implements CommunauteSavoirProjetActiviteRechercheAdminService {

@Autowired
private CommunauteSavoirProjetActiviteRechercheDao communauteSavoirProjetActiviteRechercheDao;

        @Autowired
        private ProjetActiviteRechercheAdminService projetActiviteRechercheService ;
        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirProjetActiviteRecherche> findAll(){
return communauteSavoirProjetActiviteRechercheDao.findAll();
}
        @Override
        public List<CommunauteSavoirProjetActiviteRecherche> findByProjetActiviteRechercheId(Long id){
        return communauteSavoirProjetActiviteRechercheDao.findByProjetActiviteRechercheId(id);
        }

        @Override
        @Transactional
        public int deleteByProjetActiviteRechercheId(Long id){
        return communauteSavoirProjetActiviteRechercheDao.deleteByProjetActiviteRechercheId(id);
        }


        @Override
        public List<CommunauteSavoirProjetActiviteRecherche> findByCommunauteSavoirCode(String code){
        return communauteSavoirProjetActiviteRechercheDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirProjetActiviteRechercheDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirProjetActiviteRecherche> findByCommunauteSavoirId(Long id){
        return communauteSavoirProjetActiviteRechercheDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirProjetActiviteRechercheDao.deleteByCommunauteSavoirId(id);
        }


@Override
public CommunauteSavoirProjetActiviteRecherche findById(Long id){
if(id==null) return null;
return communauteSavoirProjetActiviteRechercheDao.getOne(id);
}

@Override
public CommunauteSavoirProjetActiviteRecherche findByIdWithAssociatedList(Long id){
CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche  = findById(id);
return communauteSavoirProjetActiviteRecherche;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirProjetActiviteRechercheDao.findById(id) == null) return 0;
else{
communauteSavoirProjetActiviteRechercheDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirProjetActiviteRecherche update(CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche){
CommunauteSavoirProjetActiviteRecherche foundedCommunauteSavoirProjetActiviteRecherche = findById(communauteSavoirProjetActiviteRecherche.getId());
if(foundedCommunauteSavoirProjetActiviteRecherche==null) return null;
else{
return  communauteSavoirProjetActiviteRechercheDao.save(communauteSavoirProjetActiviteRecherche);
}
}

@Override
public CommunauteSavoirProjetActiviteRecherche save (CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche){


    findProjetActiviteRecherche(communauteSavoirProjetActiviteRecherche);
    findCommunauteSavoir(communauteSavoirProjetActiviteRecherche);

CommunauteSavoirProjetActiviteRecherche savedCommunauteSavoirProjetActiviteRecherche = communauteSavoirProjetActiviteRechercheDao.save(communauteSavoirProjetActiviteRecherche);
return savedCommunauteSavoirProjetActiviteRecherche;
}

@Override
public List<CommunauteSavoirProjetActiviteRecherche> save(List<CommunauteSavoirProjetActiviteRecherche> communauteSavoirProjetActiviteRecherches){
List<CommunauteSavoirProjetActiviteRecherche> list = new ArrayList<CommunauteSavoirProjetActiviteRecherche>();
for(CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche: communauteSavoirProjetActiviteRecherches){
list.add(save(communauteSavoirProjetActiviteRecherche));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche){
    if(communauteSavoirProjetActiviteRecherche.getId()==null) return -1;
    CommunauteSavoirProjetActiviteRecherche foundedCommunauteSavoirProjetActiviteRecherche = findById(communauteSavoirProjetActiviteRecherche.getId());
    if(foundedCommunauteSavoirProjetActiviteRecherche==null) return -1;
communauteSavoirProjetActiviteRechercheDao.delete(foundedCommunauteSavoirProjetActiviteRecherche);
return 1;
}


public List<CommunauteSavoirProjetActiviteRecherche> findByCriteria(CommunauteSavoirProjetActiviteRechercheVo communauteSavoirProjetActiviteRechercheVo){

String query = "SELECT o FROM CommunauteSavoirProjetActiviteRecherche o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirProjetActiviteRechercheVo.getId());
    if(communauteSavoirProjetActiviteRechercheVo.getProjetActiviteRechercheVo()!=null){
        query += SearchUtil.addConstraint( "o", "projetActiviteRecherche.id","=",communauteSavoirProjetActiviteRechercheVo.getProjetActiviteRechercheVo().getId());
    }

    if(communauteSavoirProjetActiviteRechercheVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirProjetActiviteRechercheVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirProjetActiviteRechercheVo.getCommunauteSavoirVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findProjetActiviteRecherche(CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche){
        ProjetActiviteRecherche loadedProjetActiviteRecherche = null;
        if(communauteSavoirProjetActiviteRecherche.getProjetActiviteRecherche() != null && communauteSavoirProjetActiviteRecherche.getProjetActiviteRecherche().getId() !=null)
        loadedProjetActiviteRecherche =projetActiviteRechercheService.findById(communauteSavoirProjetActiviteRecherche.getProjetActiviteRecherche().getId());

    if(loadedProjetActiviteRecherche==null ) {
        return;
    }
    communauteSavoirProjetActiviteRecherche.setProjetActiviteRecherche(loadedProjetActiviteRecherche);
    }
    private void findCommunauteSavoir(CommunauteSavoirProjetActiviteRecherche communauteSavoirProjetActiviteRecherche){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirProjetActiviteRecherche.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirProjetActiviteRecherche.setCommunauteSavoir(loadedCommunauteSavoir);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirProjetActiviteRecherche> communauteSavoirProjetActiviteRecherches){
        if(ListUtil.isNotEmpty(communauteSavoirProjetActiviteRecherches)){
        communauteSavoirProjetActiviteRecherches.forEach(e->communauteSavoirProjetActiviteRechercheDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirProjetActiviteRecherche> communauteSavoirProjetActiviteRecherches){
if(ListUtil.isNotEmpty(communauteSavoirProjetActiviteRecherches)){
communauteSavoirProjetActiviteRecherches.forEach(e->communauteSavoirProjetActiviteRechercheDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirProjetActiviteRecherche>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirProjetActiviteRecherche> oldList,List<CommunauteSavoirProjetActiviteRecherche> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
