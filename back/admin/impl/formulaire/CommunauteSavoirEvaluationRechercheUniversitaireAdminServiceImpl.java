package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirEvaluationRechercheUniversitaire;
        import com.ird.faa.bean.formulaire.EvaluationRechercheUniversitaire;
        import com.ird.faa.bean.referentiel.CommunauteSavoir;
import com.ird.faa.dao.formulaire.CommunauteSavoirEvaluationRechercheUniversitaireDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirEvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.formulaire.EvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEvaluationRechercheUniversitaireVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirEvaluationRechercheUniversitaireAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirEvaluationRechercheUniversitaire> implements CommunauteSavoirEvaluationRechercheUniversitaireAdminService {

@Autowired
private CommunauteSavoirEvaluationRechercheUniversitaireDao communauteSavoirEvaluationRechercheUniversitaireDao;

        @Autowired
        private EvaluationRechercheUniversitaireAdminService evaluationRechercheUniversitaireService ;
        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirEvaluationRechercheUniversitaire> findAll(){
return communauteSavoirEvaluationRechercheUniversitaireDao.findAll();
}

        @Override
        public List<CommunauteSavoirEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireAnnee(Integer annee){
        return communauteSavoirEvaluationRechercheUniversitaireDao.findByEvaluationRechercheUniversitaireAnnee(annee);
        }

        @Override
        @Transactional
        public int deleteByEvaluationRechercheUniversitaireAnnee(Integer annee){
        return communauteSavoirEvaluationRechercheUniversitaireDao.deleteByEvaluationRechercheUniversitaireAnnee(annee);
        }

        @Override
        public List<CommunauteSavoirEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireId(Long id){
        return communauteSavoirEvaluationRechercheUniversitaireDao.findByEvaluationRechercheUniversitaireId(id);
        }

        @Override
        @Transactional
        public int deleteByEvaluationRechercheUniversitaireId(Long id){
        return communauteSavoirEvaluationRechercheUniversitaireDao.deleteByEvaluationRechercheUniversitaireId(id);
        }


        @Override
        public List<CommunauteSavoirEvaluationRechercheUniversitaire> findByCommunauteSavoirCode(String code){
        return communauteSavoirEvaluationRechercheUniversitaireDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirEvaluationRechercheUniversitaireDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirEvaluationRechercheUniversitaire> findByCommunauteSavoirId(Long id){
        return communauteSavoirEvaluationRechercheUniversitaireDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirEvaluationRechercheUniversitaireDao.deleteByCommunauteSavoirId(id);
        }


@Override
public CommunauteSavoirEvaluationRechercheUniversitaire findById(Long id){
if(id==null) return null;
return communauteSavoirEvaluationRechercheUniversitaireDao.getOne(id);
}

@Override
public CommunauteSavoirEvaluationRechercheUniversitaire findByIdWithAssociatedList(Long id){
CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire  = findById(id);
return communauteSavoirEvaluationRechercheUniversitaire;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirEvaluationRechercheUniversitaireDao.findById(id) == null) return 0;
else{
communauteSavoirEvaluationRechercheUniversitaireDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirEvaluationRechercheUniversitaire update(CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire){
CommunauteSavoirEvaluationRechercheUniversitaire foundedCommunauteSavoirEvaluationRechercheUniversitaire = findById(communauteSavoirEvaluationRechercheUniversitaire.getId());
if(foundedCommunauteSavoirEvaluationRechercheUniversitaire==null) return null;
else{
return  communauteSavoirEvaluationRechercheUniversitaireDao.save(communauteSavoirEvaluationRechercheUniversitaire);
}
}

@Override
public CommunauteSavoirEvaluationRechercheUniversitaire save (CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire){


    findEvaluationRechercheUniversitaire(communauteSavoirEvaluationRechercheUniversitaire);
    findCommunauteSavoir(communauteSavoirEvaluationRechercheUniversitaire);

CommunauteSavoirEvaluationRechercheUniversitaire savedCommunauteSavoirEvaluationRechercheUniversitaire = communauteSavoirEvaluationRechercheUniversitaireDao.save(communauteSavoirEvaluationRechercheUniversitaire);
return savedCommunauteSavoirEvaluationRechercheUniversitaire;
}

@Override
public List<CommunauteSavoirEvaluationRechercheUniversitaire> save(List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaires){
List<CommunauteSavoirEvaluationRechercheUniversitaire> list = new ArrayList<CommunauteSavoirEvaluationRechercheUniversitaire>();
for(CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire: communauteSavoirEvaluationRechercheUniversitaires){
list.add(save(communauteSavoirEvaluationRechercheUniversitaire));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire){
    if(communauteSavoirEvaluationRechercheUniversitaire.getId()==null) return -1;
    CommunauteSavoirEvaluationRechercheUniversitaire foundedCommunauteSavoirEvaluationRechercheUniversitaire = findById(communauteSavoirEvaluationRechercheUniversitaire.getId());
    if(foundedCommunauteSavoirEvaluationRechercheUniversitaire==null) return -1;
communauteSavoirEvaluationRechercheUniversitaireDao.delete(foundedCommunauteSavoirEvaluationRechercheUniversitaire);
return 1;
}


public List<CommunauteSavoirEvaluationRechercheUniversitaire> findByCriteria(CommunauteSavoirEvaluationRechercheUniversitaireVo communauteSavoirEvaluationRechercheUniversitaireVo){

String query = "SELECT o FROM CommunauteSavoirEvaluationRechercheUniversitaire o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirEvaluationRechercheUniversitaireVo.getId());
    if(communauteSavoirEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo()!=null){
        query += SearchUtil.addConstraint( "o", "evaluationRechercheUniversitaire.id","=",communauteSavoirEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo().getId());
            query += SearchUtil.addConstraint( "o", "evaluationRechercheUniversitaire.annee","=",communauteSavoirEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo().getAnnee());
    }

    if(communauteSavoirEvaluationRechercheUniversitaireVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirEvaluationRechercheUniversitaireVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirEvaluationRechercheUniversitaireVo.getCommunauteSavoirVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEvaluationRechercheUniversitaire(CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire){
        EvaluationRechercheUniversitaire loadedEvaluationRechercheUniversitaire =evaluationRechercheUniversitaireService.findByIdOrAnnee(communauteSavoirEvaluationRechercheUniversitaire.getEvaluationRechercheUniversitaire());

    if(loadedEvaluationRechercheUniversitaire==null ) {
        return;
    }
    communauteSavoirEvaluationRechercheUniversitaire.setEvaluationRechercheUniversitaire(loadedEvaluationRechercheUniversitaire);
    }
    private void findCommunauteSavoir(CommunauteSavoirEvaluationRechercheUniversitaire communauteSavoirEvaluationRechercheUniversitaire){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirEvaluationRechercheUniversitaire.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirEvaluationRechercheUniversitaire.setCommunauteSavoir(loadedCommunauteSavoir);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaires){
        if(ListUtil.isNotEmpty(communauteSavoirEvaluationRechercheUniversitaires)){
        communauteSavoirEvaluationRechercheUniversitaires.forEach(e->communauteSavoirEvaluationRechercheUniversitaireDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaires){
if(ListUtil.isNotEmpty(communauteSavoirEvaluationRechercheUniversitaires)){
communauteSavoirEvaluationRechercheUniversitaires.forEach(e->communauteSavoirEvaluationRechercheUniversitaireDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirEvaluationRechercheUniversitaire>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirEvaluationRechercheUniversitaire> oldList,List<CommunauteSavoirEvaluationRechercheUniversitaire> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
