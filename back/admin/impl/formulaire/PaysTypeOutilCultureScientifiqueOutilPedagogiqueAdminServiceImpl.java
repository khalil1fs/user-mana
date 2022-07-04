package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.formulaire.CultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogiqueDao;
import com.ird.faa.service.admin.facade.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaysTypeOutilCultureScientifiqueOutilPedagogiqueAdminServiceImpl extends AbstractServiceImpl<PaysTypeOutilCultureScientifiqueOutilPedagogique> implements PaysTypeOutilCultureScientifiqueOutilPedagogiqueAdminService {

@Autowired
private PaysTypeOutilCultureScientifiqueOutilPedagogiqueDao paysTypeOutilCultureScientifiqueOutilPedagogiqueDao;

        @Autowired
        private CultureScientifiqueOutilPedagogiqueAdminService cultureScientifiqueOutilPedagogiqueService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findAll(){
return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.findAll();
}
        @Override
        public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.findByCultureScientifiqueOutilPedagogiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueOutilPedagogiqueId(Long id){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByCultureScientifiqueOutilPedagogiqueId(id);
        }


        @Override
        public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByPaysCode(String code){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByPaysCode(code);
        }

        @Override
        public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByPaysId(Long id){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByPaysId(id);
        }


@Override
public PaysTypeOutilCultureScientifiqueOutilPedagogique findById(Long id){
if(id==null) return null;
return paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.getOne(id);
}

@Override
public PaysTypeOutilCultureScientifiqueOutilPedagogique findByIdWithAssociatedList(Long id){
PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique  = findById(id);
return paysTypeOutilCultureScientifiqueOutilPedagogique;
}


@Transactional
public int deleteById(Long id){
if(paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.findById(id) == null) return 0;
else{
paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.deleteById(id);
return 1;
}
}


@Override
public PaysTypeOutilCultureScientifiqueOutilPedagogique update(PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique){
PaysTypeOutilCultureScientifiqueOutilPedagogique foundedPaysTypeOutilCultureScientifiqueOutilPedagogique = findById(paysTypeOutilCultureScientifiqueOutilPedagogique.getId());
if(foundedPaysTypeOutilCultureScientifiqueOutilPedagogique==null) return null;
else{
return  paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.save(paysTypeOutilCultureScientifiqueOutilPedagogique);
}
}

@Override
public PaysTypeOutilCultureScientifiqueOutilPedagogique save (PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique){


    findCultureScientifiqueOutilPedagogique(paysTypeOutilCultureScientifiqueOutilPedagogique);
    findPays(paysTypeOutilCultureScientifiqueOutilPedagogique);

PaysTypeOutilCultureScientifiqueOutilPedagogique savedPaysTypeOutilCultureScientifiqueOutilPedagogique = paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.save(paysTypeOutilCultureScientifiqueOutilPedagogique);
return savedPaysTypeOutilCultureScientifiqueOutilPedagogique;
}

@Override
public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> save(List<PaysTypeOutilCultureScientifiqueOutilPedagogique> paysTypeOutilCultureScientifiqueOutilPedagogiques){
List<PaysTypeOutilCultureScientifiqueOutilPedagogique> list = new ArrayList<PaysTypeOutilCultureScientifiqueOutilPedagogique>();
for(PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique: paysTypeOutilCultureScientifiqueOutilPedagogiques){
list.add(save(paysTypeOutilCultureScientifiqueOutilPedagogique));
}
return list;
}



@Override
@Transactional
public int delete(PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique){
    if(paysTypeOutilCultureScientifiqueOutilPedagogique.getId()==null) return -1;
    PaysTypeOutilCultureScientifiqueOutilPedagogique foundedPaysTypeOutilCultureScientifiqueOutilPedagogique = findById(paysTypeOutilCultureScientifiqueOutilPedagogique.getId());
    if(foundedPaysTypeOutilCultureScientifiqueOutilPedagogique==null) return -1;
paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.delete(foundedPaysTypeOutilCultureScientifiqueOutilPedagogique);
return 1;
}


public List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByCriteria(PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo paysTypeOutilCultureScientifiqueOutilPedagogiqueVo){

String query = "SELECT o FROM PaysTypeOutilCultureScientifiqueOutilPedagogique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getId());
    if(paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueOutilPedagogique.id","=",paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo().getId());
    }

    if(paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",paysTypeOutilCultureScientifiqueOutilPedagogiqueVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCultureScientifiqueOutilPedagogique(PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique){
        CultureScientifiqueOutilPedagogique loadedCultureScientifiqueOutilPedagogique = null;
        if(paysTypeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique() != null && paysTypeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId() !=null)
        loadedCultureScientifiqueOutilPedagogique =cultureScientifiqueOutilPedagogiqueService.findById(paysTypeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId());

    if(loadedCultureScientifiqueOutilPedagogique==null ) {
        return;
    }
    paysTypeOutilCultureScientifiqueOutilPedagogique.setCultureScientifiqueOutilPedagogique(loadedCultureScientifiqueOutilPedagogique);
    }
    private void findPays(PaysTypeOutilCultureScientifiqueOutilPedagogique paysTypeOutilCultureScientifiqueOutilPedagogique){
        Pays loadedPays =paysService.findByIdOrCode(paysTypeOutilCultureScientifiqueOutilPedagogique.getPays());

    if(loadedPays==null ) {
        return;
    }
    paysTypeOutilCultureScientifiqueOutilPedagogique.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<PaysTypeOutilCultureScientifiqueOutilPedagogique> paysTypeOutilCultureScientifiqueOutilPedagogiques){
        if(ListUtil.isNotEmpty(paysTypeOutilCultureScientifiqueOutilPedagogiques)){
        paysTypeOutilCultureScientifiqueOutilPedagogiques.forEach(e->paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.delete(e));
        }
}
@Override
public void update(List<PaysTypeOutilCultureScientifiqueOutilPedagogique> paysTypeOutilCultureScientifiqueOutilPedagogiques){
if(ListUtil.isNotEmpty(paysTypeOutilCultureScientifiqueOutilPedagogiques)){
paysTypeOutilCultureScientifiqueOutilPedagogiques.forEach(e->paysTypeOutilCultureScientifiqueOutilPedagogiqueDao.save(e));
}
}



@Override
public List<List<PaysTypeOutilCultureScientifiqueOutilPedagogique>>  getToBeSavedAndToBeDeleted(List<PaysTypeOutilCultureScientifiqueOutilPedagogique> oldList,List<PaysTypeOutilCultureScientifiqueOutilPedagogique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
