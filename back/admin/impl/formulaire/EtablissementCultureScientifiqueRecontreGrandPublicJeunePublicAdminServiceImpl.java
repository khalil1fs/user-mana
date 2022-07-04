package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.dao.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao;
import com.ird.faa.service.admin.facade.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminServiceImpl extends AbstractServiceImpl<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> implements EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminService {

@Autowired
private EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao;

        @Autowired
        private CultureScientifiqueRecontreGrandPublicJeunePublicAdminService cultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private EtablissementAdminService etablissementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findAll(){
return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.findAll();
}
        @Override
        public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }


        @Override
        public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByEtablissementCode(String code){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByEtablissementId(Long id){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByEtablissementId(id);
        }


@Override
public EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic findById(Long id){
if(id==null) return null;
return etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.getOne(id);
}

@Override
public EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic findByIdWithAssociatedList(Long id){
EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic  = findById(id);
return etablissementCultureScientifiqueRecontreGrandPublicJeunePublic;
}


@Transactional
public int deleteById(Long id){
if(etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.findById(id) == null) return 0;
else{
etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteById(id);
return 1;
}
}


@Override
public EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic update(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic){
EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic foundedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic = findById(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
if(foundedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic==null) return null;
else{
return  etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic);
}
}

@Override
public EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic save (EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic){


    findCultureScientifiqueRecontreGrandPublicJeunePublic(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic);
    findEtablissement(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic);

EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic savedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic = etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic);
return savedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic;
}

@Override
public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> save(List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublics){
List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> list = new ArrayList<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic>();
for(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic: etablissementCultureScientifiqueRecontreGrandPublicJeunePublics){
list.add(save(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic));
}
return list;
}



@Override
@Transactional
public int delete(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic){
    if(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return -1;
    EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic foundedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic = findById(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
    if(foundedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic==null) return -1;
etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(foundedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic);
return 1;
}


public List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByCriteria(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo){

String query = "SELECT o FROM EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getId());
    if(etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueRecontreGrandPublicJeunePublic.id","=",etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo().getId());
    }

    if(etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",etablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo.getEtablissementVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCultureScientifiqueRecontreGrandPublicJeunePublic(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic){
        CultureScientifiqueRecontreGrandPublicJeunePublic loadedCultureScientifiqueRecontreGrandPublicJeunePublic = null;
        if(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic() != null && etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId() !=null)
        loadedCultureScientifiqueRecontreGrandPublicJeunePublic =cultureScientifiqueRecontreGrandPublicJeunePublicService.findById(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId());

    if(loadedCultureScientifiqueRecontreGrandPublicJeunePublic==null ) {
        return;
    }
    etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.setCultureScientifiqueRecontreGrandPublicJeunePublic(loadedCultureScientifiqueRecontreGrandPublicJeunePublic);
    }
    private void findEtablissement(EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic etablissementCultureScientifiqueRecontreGrandPublicJeunePublic){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.setEtablissement(loadedEtablissement);
    }

@Override
@Transactional
public void delete(List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublics){
        if(ListUtil.isNotEmpty(etablissementCultureScientifiqueRecontreGrandPublicJeunePublics)){
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(e));
        }
}
@Override
public void update(List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublics){
if(ListUtil.isNotEmpty(etablissementCultureScientifiqueRecontreGrandPublicJeunePublics)){
etablissementCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->etablissementCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(e));
}
}



@Override
public List<List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic>>  getToBeSavedAndToBeDeleted(List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> oldList,List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
