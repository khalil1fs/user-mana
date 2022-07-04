package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublic;
        import com.ird.faa.bean.referentiel.PublicCible;
        import com.ird.faa.bean.referentiel.Pays;
        import com.ird.faa.bean.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.dao.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublicDao;
import com.ird.faa.service.admin.facade.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublicAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PublicCibleAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublicVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PublicCibleCultureScientifiqueRecontreGrandPublicAdminServiceImpl extends AbstractServiceImpl<PublicCibleCultureScientifiqueRecontreGrandPublic> implements PublicCibleCultureScientifiqueRecontreGrandPublicAdminService {

@Autowired
private PublicCibleCultureScientifiqueRecontreGrandPublicDao publicCibleCultureScientifiqueRecontreGrandPublicDao;

        @Autowired
        private PublicCibleAdminService publicCibleService ;
        @Autowired
        private CultureScientifiqueRecontreGrandPublicJeunePublicAdminService cultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findAll(){
return publicCibleCultureScientifiqueRecontreGrandPublicDao.findAll();
}

        @Override
        public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPublicCibleCode(String code){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.findByPublicCibleCode(code);
        }

        @Override
        @Transactional
        public int deleteByPublicCibleCode(String code){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteByPublicCibleCode(code);
        }

        @Override
        public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPublicCibleId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.findByPublicCibleId(id);
        }

        @Override
        @Transactional
        public int deleteByPublicCibleId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteByPublicCibleId(id);
        }


        @Override
        public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPaysCode(String code){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteByPaysCode(code);
        }

        @Override
        public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPaysId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteByPaysId(id);
        }

        @Override
        public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }


@Override
public PublicCibleCultureScientifiqueRecontreGrandPublic findById(Long id){
if(id==null) return null;
return publicCibleCultureScientifiqueRecontreGrandPublicDao.getOne(id);
}

@Override
public PublicCibleCultureScientifiqueRecontreGrandPublic findByIdWithAssociatedList(Long id){
PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic  = findById(id);
return publicCibleCultureScientifiqueRecontreGrandPublic;
}


@Transactional
public int deleteById(Long id){
if(publicCibleCultureScientifiqueRecontreGrandPublicDao.findById(id) == null) return 0;
else{
publicCibleCultureScientifiqueRecontreGrandPublicDao.deleteById(id);
return 1;
}
}


@Override
public PublicCibleCultureScientifiqueRecontreGrandPublic update(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){
PublicCibleCultureScientifiqueRecontreGrandPublic foundedPublicCibleCultureScientifiqueRecontreGrandPublic = findById(publicCibleCultureScientifiqueRecontreGrandPublic.getId());
if(foundedPublicCibleCultureScientifiqueRecontreGrandPublic==null) return null;
else{
return  publicCibleCultureScientifiqueRecontreGrandPublicDao.save(publicCibleCultureScientifiqueRecontreGrandPublic);
}
}

@Override
public PublicCibleCultureScientifiqueRecontreGrandPublic save (PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){


    findPublicCible(publicCibleCultureScientifiqueRecontreGrandPublic);
    findPays(publicCibleCultureScientifiqueRecontreGrandPublic);
    findCultureScientifiqueRecontreGrandPublicJeunePublic(publicCibleCultureScientifiqueRecontreGrandPublic);

PublicCibleCultureScientifiqueRecontreGrandPublic savedPublicCibleCultureScientifiqueRecontreGrandPublic = publicCibleCultureScientifiqueRecontreGrandPublicDao.save(publicCibleCultureScientifiqueRecontreGrandPublic);
return savedPublicCibleCultureScientifiqueRecontreGrandPublic;
}

@Override
public List<PublicCibleCultureScientifiqueRecontreGrandPublic> save(List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontreGrandPublics){
List<PublicCibleCultureScientifiqueRecontreGrandPublic> list = new ArrayList<PublicCibleCultureScientifiqueRecontreGrandPublic>();
for(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic: publicCibleCultureScientifiqueRecontreGrandPublics){
list.add(save(publicCibleCultureScientifiqueRecontreGrandPublic));
}
return list;
}



@Override
@Transactional
public int delete(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){
    if(publicCibleCultureScientifiqueRecontreGrandPublic.getId()==null) return -1;
    PublicCibleCultureScientifiqueRecontreGrandPublic foundedPublicCibleCultureScientifiqueRecontreGrandPublic = findById(publicCibleCultureScientifiqueRecontreGrandPublic.getId());
    if(foundedPublicCibleCultureScientifiqueRecontreGrandPublic==null) return -1;
publicCibleCultureScientifiqueRecontreGrandPublicDao.delete(foundedPublicCibleCultureScientifiqueRecontreGrandPublic);
return 1;
}


public List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByCriteria(PublicCibleCultureScientifiqueRecontreGrandPublicVo publicCibleCultureScientifiqueRecontreGrandPublicVo){

String query = "SELECT o FROM PublicCibleCultureScientifiqueRecontreGrandPublic o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",publicCibleCultureScientifiqueRecontreGrandPublicVo.getId());
    if(publicCibleCultureScientifiqueRecontreGrandPublicVo.getPublicCibleVo()!=null){
        query += SearchUtil.addConstraint( "o", "publicCible.id","=",publicCibleCultureScientifiqueRecontreGrandPublicVo.getPublicCibleVo().getId());
            query += SearchUtil.addConstraint( "o", "publicCible.code","LIKE",publicCibleCultureScientifiqueRecontreGrandPublicVo.getPublicCibleVo().getCode());
    }

    if(publicCibleCultureScientifiqueRecontreGrandPublicVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",publicCibleCultureScientifiqueRecontreGrandPublicVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",publicCibleCultureScientifiqueRecontreGrandPublicVo.getPaysVo().getCode());
    }

    if(publicCibleCultureScientifiqueRecontreGrandPublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueRecontreGrandPublicJeunePublic.id","=",publicCibleCultureScientifiqueRecontreGrandPublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPublicCible(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){
        PublicCible loadedPublicCible =publicCibleService.findByIdOrCode(publicCibleCultureScientifiqueRecontreGrandPublic.getPublicCible());

    if(loadedPublicCible==null ) {
        return;
    }
    publicCibleCultureScientifiqueRecontreGrandPublic.setPublicCible(loadedPublicCible);
    }
    private void findPays(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){
        Pays loadedPays =paysService.findByIdOrCode(publicCibleCultureScientifiqueRecontreGrandPublic.getPays());

    if(loadedPays==null ) {
        return;
    }
    publicCibleCultureScientifiqueRecontreGrandPublic.setPays(loadedPays);
    }
    private void findCultureScientifiqueRecontreGrandPublicJeunePublic(PublicCibleCultureScientifiqueRecontreGrandPublic publicCibleCultureScientifiqueRecontreGrandPublic){
        CultureScientifiqueRecontreGrandPublicJeunePublic loadedCultureScientifiqueRecontreGrandPublicJeunePublic = null;
        if(publicCibleCultureScientifiqueRecontreGrandPublic.getCultureScientifiqueRecontreGrandPublicJeunePublic() != null && publicCibleCultureScientifiqueRecontreGrandPublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId() !=null)
        loadedCultureScientifiqueRecontreGrandPublicJeunePublic =cultureScientifiqueRecontreGrandPublicJeunePublicService.findById(publicCibleCultureScientifiqueRecontreGrandPublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId());

    if(loadedCultureScientifiqueRecontreGrandPublicJeunePublic==null ) {
        return;
    }
    publicCibleCultureScientifiqueRecontreGrandPublic.setCultureScientifiqueRecontreGrandPublicJeunePublic(loadedCultureScientifiqueRecontreGrandPublicJeunePublic);
    }

@Override
@Transactional
public void delete(List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontreGrandPublics){
        if(ListUtil.isNotEmpty(publicCibleCultureScientifiqueRecontreGrandPublics)){
        publicCibleCultureScientifiqueRecontreGrandPublics.forEach(e->publicCibleCultureScientifiqueRecontreGrandPublicDao.delete(e));
        }
}
@Override
public void update(List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontreGrandPublics){
if(ListUtil.isNotEmpty(publicCibleCultureScientifiqueRecontreGrandPublics)){
publicCibleCultureScientifiqueRecontreGrandPublics.forEach(e->publicCibleCultureScientifiqueRecontreGrandPublicDao.save(e));
}
}



@Override
public List<List<PublicCibleCultureScientifiqueRecontreGrandPublic>>  getToBeSavedAndToBeDeleted(List<PublicCibleCultureScientifiqueRecontreGrandPublic> oldList,List<PublicCibleCultureScientifiqueRecontreGrandPublic> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
