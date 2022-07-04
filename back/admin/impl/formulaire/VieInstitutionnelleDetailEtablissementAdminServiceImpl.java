package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetailEtablissement;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetail;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.dao.formulaire.VieInstitutionnelleDetailEtablissementDao;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleDetailEtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleDetailAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleDetailEtablissementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class VieInstitutionnelleDetailEtablissementAdminServiceImpl extends AbstractServiceImpl<VieInstitutionnelleDetailEtablissement> implements VieInstitutionnelleDetailEtablissementAdminService {

@Autowired
private VieInstitutionnelleDetailEtablissementDao vieInstitutionnelleDetailEtablissementDao;

        @Autowired
        private VieInstitutionnelleDetailAdminService vieInstitutionnelleDetailService ;
        @Autowired
        private EtablissementAdminService etablissementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<VieInstitutionnelleDetailEtablissement> findAll(){
return vieInstitutionnelleDetailEtablissementDao.findAll();
}
        @Override
        public List<VieInstitutionnelleDetailEtablissement> findByVieInstitutionnelleDetailId(Long id){
        return vieInstitutionnelleDetailEtablissementDao.findByVieInstitutionnelleDetailId(id);
        }

        @Override
        @Transactional
        public int deleteByVieInstitutionnelleDetailId(Long id){
        return vieInstitutionnelleDetailEtablissementDao.deleteByVieInstitutionnelleDetailId(id);
        }


        @Override
        public List<VieInstitutionnelleDetailEtablissement> findByEtablissementCode(String code){
        return vieInstitutionnelleDetailEtablissementDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return vieInstitutionnelleDetailEtablissementDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<VieInstitutionnelleDetailEtablissement> findByEtablissementId(Long id){
        return vieInstitutionnelleDetailEtablissementDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return vieInstitutionnelleDetailEtablissementDao.deleteByEtablissementId(id);
        }


@Override
public VieInstitutionnelleDetailEtablissement findById(Long id){
if(id==null) return null;
return vieInstitutionnelleDetailEtablissementDao.getOne(id);
}

@Override
public VieInstitutionnelleDetailEtablissement findByIdWithAssociatedList(Long id){
VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement  = findById(id);
return vieInstitutionnelleDetailEtablissement;
}


@Transactional
public int deleteById(Long id){
if(vieInstitutionnelleDetailEtablissementDao.findById(id) == null) return 0;
else{
vieInstitutionnelleDetailEtablissementDao.deleteById(id);
return 1;
}
}


@Override
public VieInstitutionnelleDetailEtablissement update(VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement){
VieInstitutionnelleDetailEtablissement foundedVieInstitutionnelleDetailEtablissement = findById(vieInstitutionnelleDetailEtablissement.getId());
if(foundedVieInstitutionnelleDetailEtablissement==null) return null;
else{
return  vieInstitutionnelleDetailEtablissementDao.save(vieInstitutionnelleDetailEtablissement);
}
}

@Override
public VieInstitutionnelleDetailEtablissement save (VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement){


    findVieInstitutionnelleDetail(vieInstitutionnelleDetailEtablissement);
    findEtablissement(vieInstitutionnelleDetailEtablissement);

VieInstitutionnelleDetailEtablissement savedVieInstitutionnelleDetailEtablissement = vieInstitutionnelleDetailEtablissementDao.save(vieInstitutionnelleDetailEtablissement);
return savedVieInstitutionnelleDetailEtablissement;
}

@Override
public List<VieInstitutionnelleDetailEtablissement> save(List<VieInstitutionnelleDetailEtablissement> vieInstitutionnelleDetailEtablissements){
List<VieInstitutionnelleDetailEtablissement> list = new ArrayList<VieInstitutionnelleDetailEtablissement>();
for(VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement: vieInstitutionnelleDetailEtablissements){
list.add(save(vieInstitutionnelleDetailEtablissement));
}
return list;
}



@Override
@Transactional
public int delete(VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement){
    if(vieInstitutionnelleDetailEtablissement.getId()==null) return -1;
    VieInstitutionnelleDetailEtablissement foundedVieInstitutionnelleDetailEtablissement = findById(vieInstitutionnelleDetailEtablissement.getId());
    if(foundedVieInstitutionnelleDetailEtablissement==null) return -1;
vieInstitutionnelleDetailEtablissementDao.delete(foundedVieInstitutionnelleDetailEtablissement);
return 1;
}


public List<VieInstitutionnelleDetailEtablissement> findByCriteria(VieInstitutionnelleDetailEtablissementVo vieInstitutionnelleDetailEtablissementVo){

String query = "SELECT o FROM VieInstitutionnelleDetailEtablissement o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",vieInstitutionnelleDetailEtablissementVo.getId());
    if(vieInstitutionnelleDetailEtablissementVo.getVieInstitutionnelleDetailVo()!=null){
        query += SearchUtil.addConstraint( "o", "vieInstitutionnelleDetail.id","=",vieInstitutionnelleDetailEtablissementVo.getVieInstitutionnelleDetailVo().getId());
    }

    if(vieInstitutionnelleDetailEtablissementVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",vieInstitutionnelleDetailEtablissementVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",vieInstitutionnelleDetailEtablissementVo.getEtablissementVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findVieInstitutionnelleDetail(VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement){
        VieInstitutionnelleDetail loadedVieInstitutionnelleDetail = null;
        if(vieInstitutionnelleDetailEtablissement.getVieInstitutionnelleDetail() != null && vieInstitutionnelleDetailEtablissement.getVieInstitutionnelleDetail().getId() !=null)
        loadedVieInstitutionnelleDetail =vieInstitutionnelleDetailService.findById(vieInstitutionnelleDetailEtablissement.getVieInstitutionnelleDetail().getId());

    if(loadedVieInstitutionnelleDetail==null ) {
        return;
    }
    vieInstitutionnelleDetailEtablissement.setVieInstitutionnelleDetail(loadedVieInstitutionnelleDetail);
    }
    private void findEtablissement(VieInstitutionnelleDetailEtablissement vieInstitutionnelleDetailEtablissement){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(vieInstitutionnelleDetailEtablissement.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    vieInstitutionnelleDetailEtablissement.setEtablissement(loadedEtablissement);
    }

@Override
@Transactional
public void delete(List<VieInstitutionnelleDetailEtablissement> vieInstitutionnelleDetailEtablissements){
        if(ListUtil.isNotEmpty(vieInstitutionnelleDetailEtablissements)){
        vieInstitutionnelleDetailEtablissements.forEach(e->vieInstitutionnelleDetailEtablissementDao.delete(e));
        }
}
@Override
public void update(List<VieInstitutionnelleDetailEtablissement> vieInstitutionnelleDetailEtablissements){
if(ListUtil.isNotEmpty(vieInstitutionnelleDetailEtablissements)){
vieInstitutionnelleDetailEtablissements.forEach(e->vieInstitutionnelleDetailEtablissementDao.save(e));
}
}



@Override
public List<List<VieInstitutionnelleDetailEtablissement>>  getToBeSavedAndToBeDeleted(List<VieInstitutionnelleDetailEtablissement> oldList,List<VieInstitutionnelleDetailEtablissement> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
