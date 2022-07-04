package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.PublicCibleCultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.referentiel.PublicCible;
        import com.ird.faa.bean.formulaire.CultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.PublicCibleCultureScientifiqueOutilPedagogiqueDao;
import com.ird.faa.service.admin.facade.formulaire.PublicCibleCultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PublicCibleAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.PublicCibleCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PublicCibleCultureScientifiqueOutilPedagogiqueAdminServiceImpl extends AbstractServiceImpl<PublicCibleCultureScientifiqueOutilPedagogique> implements PublicCibleCultureScientifiqueOutilPedagogiqueAdminService {

@Autowired
private PublicCibleCultureScientifiqueOutilPedagogiqueDao publicCibleCultureScientifiqueOutilPedagogiqueDao;

        @Autowired
        private PublicCibleAdminService publicCibleService ;
        @Autowired
        private CultureScientifiqueOutilPedagogiqueAdminService cultureScientifiqueOutilPedagogiqueService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PublicCibleCultureScientifiqueOutilPedagogique> findAll(){
return publicCibleCultureScientifiqueOutilPedagogiqueDao.findAll();
}

        @Override
        public List<PublicCibleCultureScientifiqueOutilPedagogique> findByPublicCibleCode(String code){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.findByPublicCibleCode(code);
        }

        @Override
        @Transactional
        public int deleteByPublicCibleCode(String code){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteByPublicCibleCode(code);
        }

        @Override
        public List<PublicCibleCultureScientifiqueOutilPedagogique> findByPublicCibleId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.findByPublicCibleId(id);
        }

        @Override
        @Transactional
        public int deleteByPublicCibleId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteByPublicCibleId(id);
        }

        @Override
        public List<PublicCibleCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.findByCultureScientifiqueOutilPedagogiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueOutilPedagogiqueId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteByCultureScientifiqueOutilPedagogiqueId(id);
        }


        @Override
        public List<PublicCibleCultureScientifiqueOutilPedagogique> findByPaysCode(String code){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteByPaysCode(code);
        }

        @Override
        public List<PublicCibleCultureScientifiqueOutilPedagogique> findByPaysId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteByPaysId(id);
        }


@Override
public PublicCibleCultureScientifiqueOutilPedagogique findById(Long id){
if(id==null) return null;
return publicCibleCultureScientifiqueOutilPedagogiqueDao.getOne(id);
}

@Override
public PublicCibleCultureScientifiqueOutilPedagogique findByIdWithAssociatedList(Long id){
PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique  = findById(id);
return publicCibleCultureScientifiqueOutilPedagogique;
}


@Transactional
public int deleteById(Long id){
if(publicCibleCultureScientifiqueOutilPedagogiqueDao.findById(id) == null) return 0;
else{
publicCibleCultureScientifiqueOutilPedagogiqueDao.deleteById(id);
return 1;
}
}


@Override
public PublicCibleCultureScientifiqueOutilPedagogique update(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){
PublicCibleCultureScientifiqueOutilPedagogique foundedPublicCibleCultureScientifiqueOutilPedagogique = findById(publicCibleCultureScientifiqueOutilPedagogique.getId());
if(foundedPublicCibleCultureScientifiqueOutilPedagogique==null) return null;
else{
return  publicCibleCultureScientifiqueOutilPedagogiqueDao.save(publicCibleCultureScientifiqueOutilPedagogique);
}
}

@Override
public PublicCibleCultureScientifiqueOutilPedagogique save (PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){


    findPublicCible(publicCibleCultureScientifiqueOutilPedagogique);
    findCultureScientifiqueOutilPedagogique(publicCibleCultureScientifiqueOutilPedagogique);
    findPays(publicCibleCultureScientifiqueOutilPedagogique);

PublicCibleCultureScientifiqueOutilPedagogique savedPublicCibleCultureScientifiqueOutilPedagogique = publicCibleCultureScientifiqueOutilPedagogiqueDao.save(publicCibleCultureScientifiqueOutilPedagogique);
return savedPublicCibleCultureScientifiqueOutilPedagogique;
}

@Override
public List<PublicCibleCultureScientifiqueOutilPedagogique> save(List<PublicCibleCultureScientifiqueOutilPedagogique> publicCibleCultureScientifiqueOutilPedagogiques){
List<PublicCibleCultureScientifiqueOutilPedagogique> list = new ArrayList<PublicCibleCultureScientifiqueOutilPedagogique>();
for(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique: publicCibleCultureScientifiqueOutilPedagogiques){
list.add(save(publicCibleCultureScientifiqueOutilPedagogique));
}
return list;
}



@Override
@Transactional
public int delete(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){
    if(publicCibleCultureScientifiqueOutilPedagogique.getId()==null) return -1;
    PublicCibleCultureScientifiqueOutilPedagogique foundedPublicCibleCultureScientifiqueOutilPedagogique = findById(publicCibleCultureScientifiqueOutilPedagogique.getId());
    if(foundedPublicCibleCultureScientifiqueOutilPedagogique==null) return -1;
publicCibleCultureScientifiqueOutilPedagogiqueDao.delete(foundedPublicCibleCultureScientifiqueOutilPedagogique);
return 1;
}


public List<PublicCibleCultureScientifiqueOutilPedagogique> findByCriteria(PublicCibleCultureScientifiqueOutilPedagogiqueVo publicCibleCultureScientifiqueOutilPedagogiqueVo){

String query = "SELECT o FROM PublicCibleCultureScientifiqueOutilPedagogique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",publicCibleCultureScientifiqueOutilPedagogiqueVo.getId());
    if(publicCibleCultureScientifiqueOutilPedagogiqueVo.getPublicCibleVo()!=null){
        query += SearchUtil.addConstraint( "o", "publicCible.id","=",publicCibleCultureScientifiqueOutilPedagogiqueVo.getPublicCibleVo().getId());
            query += SearchUtil.addConstraint( "o", "publicCible.code","LIKE",publicCibleCultureScientifiqueOutilPedagogiqueVo.getPublicCibleVo().getCode());
    }

    if(publicCibleCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueOutilPedagogique.id","=",publicCibleCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo().getId());
    }

    if(publicCibleCultureScientifiqueOutilPedagogiqueVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",publicCibleCultureScientifiqueOutilPedagogiqueVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",publicCibleCultureScientifiqueOutilPedagogiqueVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPublicCible(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){
        PublicCible loadedPublicCible =publicCibleService.findByIdOrCode(publicCibleCultureScientifiqueOutilPedagogique.getPublicCible());

    if(loadedPublicCible==null ) {
        return;
    }
    publicCibleCultureScientifiqueOutilPedagogique.setPublicCible(loadedPublicCible);
    }
    private void findCultureScientifiqueOutilPedagogique(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){
        CultureScientifiqueOutilPedagogique loadedCultureScientifiqueOutilPedagogique = null;
        if(publicCibleCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique() != null && publicCibleCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId() !=null)
        loadedCultureScientifiqueOutilPedagogique =cultureScientifiqueOutilPedagogiqueService.findById(publicCibleCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId());

    if(loadedCultureScientifiqueOutilPedagogique==null ) {
        return;
    }
    publicCibleCultureScientifiqueOutilPedagogique.setCultureScientifiqueOutilPedagogique(loadedCultureScientifiqueOutilPedagogique);
    }
    private void findPays(PublicCibleCultureScientifiqueOutilPedagogique publicCibleCultureScientifiqueOutilPedagogique){
        Pays loadedPays =paysService.findByIdOrCode(publicCibleCultureScientifiqueOutilPedagogique.getPays());

    if(loadedPays==null ) {
        return;
    }
    publicCibleCultureScientifiqueOutilPedagogique.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<PublicCibleCultureScientifiqueOutilPedagogique> publicCibleCultureScientifiqueOutilPedagogiques){
        if(ListUtil.isNotEmpty(publicCibleCultureScientifiqueOutilPedagogiques)){
        publicCibleCultureScientifiqueOutilPedagogiques.forEach(e->publicCibleCultureScientifiqueOutilPedagogiqueDao.delete(e));
        }
}
@Override
public void update(List<PublicCibleCultureScientifiqueOutilPedagogique> publicCibleCultureScientifiqueOutilPedagogiques){
if(ListUtil.isNotEmpty(publicCibleCultureScientifiqueOutilPedagogiques)){
publicCibleCultureScientifiqueOutilPedagogiques.forEach(e->publicCibleCultureScientifiqueOutilPedagogiqueDao.save(e));
}
}



@Override
public List<List<PublicCibleCultureScientifiqueOutilPedagogique>>  getToBeSavedAndToBeDeleted(List<PublicCibleCultureScientifiqueOutilPedagogique> oldList,List<PublicCibleCultureScientifiqueOutilPedagogique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
