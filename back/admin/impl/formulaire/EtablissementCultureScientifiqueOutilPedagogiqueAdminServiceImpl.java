package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EtablissementCultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.formulaire.CultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.dao.formulaire.EtablissementCultureScientifiqueOutilPedagogiqueDao;
import com.ird.faa.service.admin.facade.formulaire.EtablissementCultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtablissementCultureScientifiqueOutilPedagogiqueAdminServiceImpl extends AbstractServiceImpl<EtablissementCultureScientifiqueOutilPedagogique> implements EtablissementCultureScientifiqueOutilPedagogiqueAdminService {

@Autowired
private EtablissementCultureScientifiqueOutilPedagogiqueDao etablissementCultureScientifiqueOutilPedagogiqueDao;

        @Autowired
        private CultureScientifiqueOutilPedagogiqueAdminService cultureScientifiqueOutilPedagogiqueService ;
        @Autowired
        private EtablissementAdminService etablissementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EtablissementCultureScientifiqueOutilPedagogique> findAll(){
return etablissementCultureScientifiqueOutilPedagogiqueDao.findAll();
}
        @Override
        public List<EtablissementCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.findByCultureScientifiqueOutilPedagogiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueOutilPedagogiqueId(Long id){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.deleteByCultureScientifiqueOutilPedagogiqueId(id);
        }


        @Override
        public List<EtablissementCultureScientifiqueOutilPedagogique> findByEtablissementCode(String code){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<EtablissementCultureScientifiqueOutilPedagogique> findByEtablissementId(Long id){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return etablissementCultureScientifiqueOutilPedagogiqueDao.deleteByEtablissementId(id);
        }


@Override
public EtablissementCultureScientifiqueOutilPedagogique findById(Long id){
if(id==null) return null;
return etablissementCultureScientifiqueOutilPedagogiqueDao.getOne(id);
}

@Override
public EtablissementCultureScientifiqueOutilPedagogique findByIdWithAssociatedList(Long id){
EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique  = findById(id);
return etablissementCultureScientifiqueOutilPedagogique;
}


@Transactional
public int deleteById(Long id){
if(etablissementCultureScientifiqueOutilPedagogiqueDao.findById(id) == null) return 0;
else{
etablissementCultureScientifiqueOutilPedagogiqueDao.deleteById(id);
return 1;
}
}


@Override
public EtablissementCultureScientifiqueOutilPedagogique update(EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique){
EtablissementCultureScientifiqueOutilPedagogique foundedEtablissementCultureScientifiqueOutilPedagogique = findById(etablissementCultureScientifiqueOutilPedagogique.getId());
if(foundedEtablissementCultureScientifiqueOutilPedagogique==null) return null;
else{
return  etablissementCultureScientifiqueOutilPedagogiqueDao.save(etablissementCultureScientifiqueOutilPedagogique);
}
}

@Override
public EtablissementCultureScientifiqueOutilPedagogique save (EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique){


    findCultureScientifiqueOutilPedagogique(etablissementCultureScientifiqueOutilPedagogique);
    findEtablissement(etablissementCultureScientifiqueOutilPedagogique);

EtablissementCultureScientifiqueOutilPedagogique savedEtablissementCultureScientifiqueOutilPedagogique = etablissementCultureScientifiqueOutilPedagogiqueDao.save(etablissementCultureScientifiqueOutilPedagogique);
return savedEtablissementCultureScientifiqueOutilPedagogique;
}

@Override
public List<EtablissementCultureScientifiqueOutilPedagogique> save(List<EtablissementCultureScientifiqueOutilPedagogique> etablissementCultureScientifiqueOutilPedagogiques){
List<EtablissementCultureScientifiqueOutilPedagogique> list = new ArrayList<EtablissementCultureScientifiqueOutilPedagogique>();
for(EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique: etablissementCultureScientifiqueOutilPedagogiques){
list.add(save(etablissementCultureScientifiqueOutilPedagogique));
}
return list;
}



@Override
@Transactional
public int delete(EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique){
    if(etablissementCultureScientifiqueOutilPedagogique.getId()==null) return -1;
    EtablissementCultureScientifiqueOutilPedagogique foundedEtablissementCultureScientifiqueOutilPedagogique = findById(etablissementCultureScientifiqueOutilPedagogique.getId());
    if(foundedEtablissementCultureScientifiqueOutilPedagogique==null) return -1;
etablissementCultureScientifiqueOutilPedagogiqueDao.delete(foundedEtablissementCultureScientifiqueOutilPedagogique);
return 1;
}


public List<EtablissementCultureScientifiqueOutilPedagogique> findByCriteria(EtablissementCultureScientifiqueOutilPedagogiqueVo etablissementCultureScientifiqueOutilPedagogiqueVo){

String query = "SELECT o FROM EtablissementCultureScientifiqueOutilPedagogique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etablissementCultureScientifiqueOutilPedagogiqueVo.getId());
    if(etablissementCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueOutilPedagogique.id","=",etablissementCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo().getId());
    }

    if(etablissementCultureScientifiqueOutilPedagogiqueVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",etablissementCultureScientifiqueOutilPedagogiqueVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",etablissementCultureScientifiqueOutilPedagogiqueVo.getEtablissementVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCultureScientifiqueOutilPedagogique(EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique){
        CultureScientifiqueOutilPedagogique loadedCultureScientifiqueOutilPedagogique = null;
        if(etablissementCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique() != null && etablissementCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId() !=null)
        loadedCultureScientifiqueOutilPedagogique =cultureScientifiqueOutilPedagogiqueService.findById(etablissementCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId());

    if(loadedCultureScientifiqueOutilPedagogique==null ) {
        return;
    }
    etablissementCultureScientifiqueOutilPedagogique.setCultureScientifiqueOutilPedagogique(loadedCultureScientifiqueOutilPedagogique);
    }
    private void findEtablissement(EtablissementCultureScientifiqueOutilPedagogique etablissementCultureScientifiqueOutilPedagogique){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(etablissementCultureScientifiqueOutilPedagogique.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    etablissementCultureScientifiqueOutilPedagogique.setEtablissement(loadedEtablissement);
    }

@Override
@Transactional
public void delete(List<EtablissementCultureScientifiqueOutilPedagogique> etablissementCultureScientifiqueOutilPedagogiques){
        if(ListUtil.isNotEmpty(etablissementCultureScientifiqueOutilPedagogiques)){
        etablissementCultureScientifiqueOutilPedagogiques.forEach(e->etablissementCultureScientifiqueOutilPedagogiqueDao.delete(e));
        }
}
@Override
public void update(List<EtablissementCultureScientifiqueOutilPedagogique> etablissementCultureScientifiqueOutilPedagogiques){
if(ListUtil.isNotEmpty(etablissementCultureScientifiqueOutilPedagogiques)){
etablissementCultureScientifiqueOutilPedagogiques.forEach(e->etablissementCultureScientifiqueOutilPedagogiqueDao.save(e));
}
}



@Override
public List<List<EtablissementCultureScientifiqueOutilPedagogique>>  getToBeSavedAndToBeDeleted(List<EtablissementCultureScientifiqueOutilPedagogique> oldList,List<EtablissementCultureScientifiqueOutilPedagogique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
