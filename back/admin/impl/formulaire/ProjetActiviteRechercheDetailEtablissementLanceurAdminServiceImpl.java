package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailEtablissementLanceur;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;
import com.ird.faa.dao.formulaire.ProjetActiviteRechercheDetailEtablissementLanceurDao;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailEtablissementLanceurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailEtablissementLanceurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ProjetActiviteRechercheDetailEtablissementLanceurAdminServiceImpl extends AbstractServiceImpl<ProjetActiviteRechercheDetailEtablissementLanceur> implements ProjetActiviteRechercheDetailEtablissementLanceurAdminService {

@Autowired
private ProjetActiviteRechercheDetailEtablissementLanceurDao projetActiviteRechercheDetailEtablissementLanceurDao;

        @Autowired
        private ProjetActiviteRechercheDetailAdminService projetActiviteRechercheDetailService ;
        @Autowired
        private EtablissementAdminService etablissementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ProjetActiviteRechercheDetailEtablissementLanceur> findAll(){
return projetActiviteRechercheDetailEtablissementLanceurDao.findAll();
}

        @Override
        public List<ProjetActiviteRechercheDetailEtablissementLanceur> findByEtablissementCode(String code){
        return projetActiviteRechercheDetailEtablissementLanceurDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return projetActiviteRechercheDetailEtablissementLanceurDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetailEtablissementLanceur> findByEtablissementId(Long id){
        return projetActiviteRechercheDetailEtablissementLanceurDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return projetActiviteRechercheDetailEtablissementLanceurDao.deleteByEtablissementId(id);
        }

        @Override
        public List<ProjetActiviteRechercheDetailEtablissementLanceur> findByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailEtablissementLanceurDao.findByProjetActiviteRechercheDetailId(id);
        }

        @Override
        @Transactional
        public int deleteByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailEtablissementLanceurDao.deleteByProjetActiviteRechercheDetailId(id);
        }


@Override
public ProjetActiviteRechercheDetailEtablissementLanceur findById(Long id){
if(id==null) return null;
return projetActiviteRechercheDetailEtablissementLanceurDao.getOne(id);
}

@Override
public ProjetActiviteRechercheDetailEtablissementLanceur findByIdWithAssociatedList(Long id){
ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur  = findById(id);
return projetActiviteRechercheDetailEtablissementLanceur;
}


@Transactional
public int deleteById(Long id){
if(projetActiviteRechercheDetailEtablissementLanceurDao.findById(id) == null) return 0;
else{
projetActiviteRechercheDetailEtablissementLanceurDao.deleteById(id);
return 1;
}
}


@Override
public ProjetActiviteRechercheDetailEtablissementLanceur update(ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur){
ProjetActiviteRechercheDetailEtablissementLanceur foundedProjetActiviteRechercheDetailEtablissementLanceur = findById(projetActiviteRechercheDetailEtablissementLanceur.getId());
if(foundedProjetActiviteRechercheDetailEtablissementLanceur==null) return null;
else{
return  projetActiviteRechercheDetailEtablissementLanceurDao.save(projetActiviteRechercheDetailEtablissementLanceur);
}
}

@Override
public ProjetActiviteRechercheDetailEtablissementLanceur save (ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur){


    findEtablissement(projetActiviteRechercheDetailEtablissementLanceur);
    findProjetActiviteRechercheDetail(projetActiviteRechercheDetailEtablissementLanceur);

ProjetActiviteRechercheDetailEtablissementLanceur savedProjetActiviteRechercheDetailEtablissementLanceur = projetActiviteRechercheDetailEtablissementLanceurDao.save(projetActiviteRechercheDetailEtablissementLanceur);
return savedProjetActiviteRechercheDetailEtablissementLanceur;
}

@Override
public List<ProjetActiviteRechercheDetailEtablissementLanceur> save(List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceurs){
List<ProjetActiviteRechercheDetailEtablissementLanceur> list = new ArrayList<ProjetActiviteRechercheDetailEtablissementLanceur>();
for(ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur: projetActiviteRechercheDetailEtablissementLanceurs){
list.add(save(projetActiviteRechercheDetailEtablissementLanceur));
}
return list;
}



@Override
@Transactional
public int delete(ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur){
    if(projetActiviteRechercheDetailEtablissementLanceur.getId()==null) return -1;
    ProjetActiviteRechercheDetailEtablissementLanceur foundedProjetActiviteRechercheDetailEtablissementLanceur = findById(projetActiviteRechercheDetailEtablissementLanceur.getId());
    if(foundedProjetActiviteRechercheDetailEtablissementLanceur==null) return -1;
projetActiviteRechercheDetailEtablissementLanceurDao.delete(foundedProjetActiviteRechercheDetailEtablissementLanceur);
return 1;
}


public List<ProjetActiviteRechercheDetailEtablissementLanceur> findByCriteria(ProjetActiviteRechercheDetailEtablissementLanceurVo projetActiviteRechercheDetailEtablissementLanceurVo){

String query = "SELECT o FROM ProjetActiviteRechercheDetailEtablissementLanceur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",projetActiviteRechercheDetailEtablissementLanceurVo.getId());
    if(projetActiviteRechercheDetailEtablissementLanceurVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",projetActiviteRechercheDetailEtablissementLanceurVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",projetActiviteRechercheDetailEtablissementLanceurVo.getEtablissementVo().getCode());
    }

    if(projetActiviteRechercheDetailEtablissementLanceurVo.getProjetActiviteRechercheDetailVo()!=null){
        query += SearchUtil.addConstraint( "o", "projetActiviteRechercheDetail.id","=",projetActiviteRechercheDetailEtablissementLanceurVo.getProjetActiviteRechercheDetailVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEtablissement(ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(projetActiviteRechercheDetailEtablissementLanceur.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    projetActiviteRechercheDetailEtablissementLanceur.setEtablissement(loadedEtablissement);
    }
    private void findProjetActiviteRechercheDetail(ProjetActiviteRechercheDetailEtablissementLanceur projetActiviteRechercheDetailEtablissementLanceur){
        ProjetActiviteRechercheDetail loadedProjetActiviteRechercheDetail = null;
        if(projetActiviteRechercheDetailEtablissementLanceur.getProjetActiviteRechercheDetail() != null && projetActiviteRechercheDetailEtablissementLanceur.getProjetActiviteRechercheDetail().getId() !=null)
        loadedProjetActiviteRechercheDetail =projetActiviteRechercheDetailService.findById(projetActiviteRechercheDetailEtablissementLanceur.getProjetActiviteRechercheDetail().getId());

    if(loadedProjetActiviteRechercheDetail==null ) {
        return;
    }
    projetActiviteRechercheDetailEtablissementLanceur.setProjetActiviteRechercheDetail(loadedProjetActiviteRechercheDetail);
    }

@Override
@Transactional
public void delete(List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceurs){
        if(ListUtil.isNotEmpty(projetActiviteRechercheDetailEtablissementLanceurs)){
        projetActiviteRechercheDetailEtablissementLanceurs.forEach(e->projetActiviteRechercheDetailEtablissementLanceurDao.delete(e));
        }
}
@Override
public void update(List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceurs){
if(ListUtil.isNotEmpty(projetActiviteRechercheDetailEtablissementLanceurs)){
projetActiviteRechercheDetailEtablissementLanceurs.forEach(e->projetActiviteRechercheDetailEtablissementLanceurDao.save(e));
}
}



@Override
public List<List<ProjetActiviteRechercheDetailEtablissementLanceur>>  getToBeSavedAndToBeDeleted(List<ProjetActiviteRechercheDetailEtablissementLanceur> oldList,List<ProjetActiviteRechercheDetailEtablissementLanceur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
