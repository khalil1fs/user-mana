package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.VieInstitutionnelle;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.formulaire.VieInstitutionnelleDao;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleDetailAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetail;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class VieInstitutionnelleAdminServiceImpl extends AbstractServiceImpl<VieInstitutionnelle> implements VieInstitutionnelleAdminService {

@Autowired
private VieInstitutionnelleDao vieInstitutionnelleDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private VieInstitutionnelleDetailAdminService vieInstitutionnelleDetailService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<VieInstitutionnelle> findAll(){
return vieInstitutionnelleDao.findAll();
}

        @Override
        public List<VieInstitutionnelle> findByCampagneCode(String code){
        return vieInstitutionnelleDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return vieInstitutionnelleDao.deleteByCampagneCode(code);
        }

        @Override
        public List<VieInstitutionnelle> findByCampagneId(Long id){
        return vieInstitutionnelleDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return vieInstitutionnelleDao.deleteByCampagneId(id);
        }


        @Override
        public List<VieInstitutionnelle> findByChercheurNumeroMatricule(String numeroMatricule){
        return vieInstitutionnelleDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return vieInstitutionnelleDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<VieInstitutionnelle> findByChercheurId(Long id){
        return vieInstitutionnelleDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return vieInstitutionnelleDao.deleteByChercheurId(id);
        }


        @Override
        public List<VieInstitutionnelle> findByEtatEtapeCampagneCode(String code){
        return vieInstitutionnelleDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return vieInstitutionnelleDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<VieInstitutionnelle> findByEtatEtapeCampagneId(Long id){
        return vieInstitutionnelleDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return vieInstitutionnelleDao.deleteByEtatEtapeCampagneId(id);
        }


@Override
public VieInstitutionnelle findById(Long id){
if(id==null) return null;
return vieInstitutionnelleDao.getOne(id);
}

@Override
public VieInstitutionnelle findByIdWithAssociatedList(Long id){
VieInstitutionnelle vieInstitutionnelle  = findById(id);
    findAssociatedLists(vieInstitutionnelle);
return vieInstitutionnelle;
}
private void findAssociatedLists(VieInstitutionnelle vieInstitutionnelle){
if(vieInstitutionnelle==null || vieInstitutionnelle.getId()==null) return ;
else{
        List<VieInstitutionnelleDetail> vieInstitutionnelleDetails = vieInstitutionnelleDetailService.findByVieInstitutionnelleId(vieInstitutionnelle.getId());
        vieInstitutionnelle.setVieInstitutionnelleDetails(vieInstitutionnelleDetails);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        vieInstitutionnelleDetailService.deleteByVieInstitutionnelleId(id);
}
}

    private void updateAssociatedLists(VieInstitutionnelle vieInstitutionnelle){
    if(vieInstitutionnelle==null || vieInstitutionnelle.getId()==null) return ;
    else{
            List<List<VieInstitutionnelleDetail>> resultVieInstitutionnelleDetails= vieInstitutionnelleDetailService.getToBeSavedAndToBeDeleted(vieInstitutionnelleDetailService.findByVieInstitutionnelleId(vieInstitutionnelle.getId()),vieInstitutionnelle.getVieInstitutionnelleDetails());
            vieInstitutionnelleDetailService.delete(resultVieInstitutionnelleDetails.get(1));
            associateVieInstitutionnelleDetail(vieInstitutionnelle,resultVieInstitutionnelleDetails.get(0));
            vieInstitutionnelleDetailService.update(resultVieInstitutionnelleDetails.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(vieInstitutionnelleDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
vieInstitutionnelleDao.deleteById(id);
return 1;
}
}


@Override
public VieInstitutionnelle update(VieInstitutionnelle vieInstitutionnelle){
VieInstitutionnelle foundedVieInstitutionnelle = findById(vieInstitutionnelle.getId());
if(foundedVieInstitutionnelle==null) return null;
else{
    updateAssociatedLists(vieInstitutionnelle);
return  vieInstitutionnelleDao.save(vieInstitutionnelle);
}
}

@Override
public VieInstitutionnelle save (VieInstitutionnelle vieInstitutionnelle){


    findCampagne(vieInstitutionnelle);
    findChercheur(vieInstitutionnelle);
    findEtatEtapeCampagne(vieInstitutionnelle);

VieInstitutionnelle savedVieInstitutionnelle = vieInstitutionnelleDao.save(vieInstitutionnelle);
       saveVieInstitutionnelleDetails(savedVieInstitutionnelle,vieInstitutionnelle.getVieInstitutionnelleDetails());
return savedVieInstitutionnelle;
}

@Override
public List<VieInstitutionnelle> save(List<VieInstitutionnelle> vieInstitutionnelles){
List<VieInstitutionnelle> list = new ArrayList<VieInstitutionnelle>();
for(VieInstitutionnelle vieInstitutionnelle: vieInstitutionnelles){
list.add(save(vieInstitutionnelle));
}
return list;
}



@Override
@Transactional
public int delete(VieInstitutionnelle vieInstitutionnelle){
    if(vieInstitutionnelle.getId()==null) return -1;
    VieInstitutionnelle foundedVieInstitutionnelle = findById(vieInstitutionnelle.getId());
    if(foundedVieInstitutionnelle==null) return -1;
vieInstitutionnelleDao.delete(foundedVieInstitutionnelle);
return 1;
}


public List<VieInstitutionnelle> findByCriteria(VieInstitutionnelleVo vieInstitutionnelleVo){

String query = "SELECT o FROM VieInstitutionnelle o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",vieInstitutionnelleVo.getId());
            query += SearchUtil.addConstraint( "o", "tempsEstime","=",vieInstitutionnelleVo.getTempsEstime());
            query += SearchUtil.addConstraint( "o", "annee","=",vieInstitutionnelleVo.getAnnee());
            query += SearchUtil.addConstraintMinMax("o","tempsEstime",vieInstitutionnelleVo.getTempsEstimeMin(),vieInstitutionnelleVo.getTempsEstimeMax());
            query += SearchUtil.addConstraintMinMax("o","annee",vieInstitutionnelleVo.getAnneeMin(),vieInstitutionnelleVo.getAnneeMax());
    if(vieInstitutionnelleVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",vieInstitutionnelleVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",vieInstitutionnelleVo.getCampagneVo().getCode());
    }

    if(vieInstitutionnelleVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",vieInstitutionnelleVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",vieInstitutionnelleVo.getChercheurVo().getNumeroMatricule());
    }

    if(vieInstitutionnelleVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",vieInstitutionnelleVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",vieInstitutionnelleVo.getEtatEtapeCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveVieInstitutionnelleDetails(VieInstitutionnelle vieInstitutionnelle,List<VieInstitutionnelleDetail> vieInstitutionnelleDetails){

        if (ListUtil.isNotEmpty(vieInstitutionnelle.getVieInstitutionnelleDetails())) {
        List<VieInstitutionnelleDetail> savedVieInstitutionnelleDetails = new ArrayList<>();
        vieInstitutionnelleDetails.forEach(element -> {
        element.setVieInstitutionnelle(vieInstitutionnelle);
        vieInstitutionnelleDetailService.save(element);
        });
        vieInstitutionnelle.setVieInstitutionnelleDetails(savedVieInstitutionnelleDetails);
        }
        }

    private void findCampagne(VieInstitutionnelle vieInstitutionnelle){
        Campagne loadedCampagne =campagneService.findByIdOrCode(vieInstitutionnelle.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    vieInstitutionnelle.setCampagne(loadedCampagne);
    }
    private void findChercheur(VieInstitutionnelle vieInstitutionnelle){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(vieInstitutionnelle.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    vieInstitutionnelle.setChercheur(loadedChercheur);
    }
    private void findEtatEtapeCampagne(VieInstitutionnelle vieInstitutionnelle){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(vieInstitutionnelle.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    vieInstitutionnelle.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }

@Override
@Transactional
public void delete(List<VieInstitutionnelle> vieInstitutionnelles){
        if(ListUtil.isNotEmpty(vieInstitutionnelles)){
        vieInstitutionnelles.forEach(e->vieInstitutionnelleDao.delete(e));
        }
}
@Override
public void update(List<VieInstitutionnelle> vieInstitutionnelles){
if(ListUtil.isNotEmpty(vieInstitutionnelles)){
vieInstitutionnelles.forEach(e->vieInstitutionnelleDao.save(e));
}
}

private void associateVieInstitutionnelleDetail(VieInstitutionnelle vieInstitutionnelle, List<VieInstitutionnelleDetail> vieInstitutionnelleDetail) {
    if (ListUtil.isNotEmpty(vieInstitutionnelleDetail)) {
        vieInstitutionnelleDetail.forEach(e -> e.setVieInstitutionnelle(vieInstitutionnelle));
    }
    }


@Override
public List<List<VieInstitutionnelle>>  getToBeSavedAndToBeDeleted(List<VieInstitutionnelle> oldList,List<VieInstitutionnelle> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
