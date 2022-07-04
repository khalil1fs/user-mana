package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailPays;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;
import com.ird.faa.dao.formulaire.ProjetActiviteRechercheDetailPaysDao;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailPaysAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailPaysVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ProjetActiviteRechercheDetailPaysAdminServiceImpl extends AbstractServiceImpl<ProjetActiviteRechercheDetailPays> implements ProjetActiviteRechercheDetailPaysAdminService {

@Autowired
private ProjetActiviteRechercheDetailPaysDao projetActiviteRechercheDetailPaysDao;

        @Autowired
        private ProjetActiviteRechercheDetailAdminService projetActiviteRechercheDetailService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ProjetActiviteRechercheDetailPays> findAll(){
return projetActiviteRechercheDetailPaysDao.findAll();
}

        @Override
        public List<ProjetActiviteRechercheDetailPays> findByPaysCode(String code){
        return projetActiviteRechercheDetailPaysDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return projetActiviteRechercheDetailPaysDao.deleteByPaysCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetailPays> findByPaysId(Long id){
        return projetActiviteRechercheDetailPaysDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return projetActiviteRechercheDetailPaysDao.deleteByPaysId(id);
        }

        @Override
        public List<ProjetActiviteRechercheDetailPays> findByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailPaysDao.findByProjetActiviteRechercheDetailId(id);
        }

        @Override
        @Transactional
        public int deleteByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailPaysDao.deleteByProjetActiviteRechercheDetailId(id);
        }


@Override
public ProjetActiviteRechercheDetailPays findById(Long id){
if(id==null) return null;
return projetActiviteRechercheDetailPaysDao.getOne(id);
}

@Override
public ProjetActiviteRechercheDetailPays findByIdWithAssociatedList(Long id){
ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays  = findById(id);
return projetActiviteRechercheDetailPays;
}


@Transactional
public int deleteById(Long id){
if(projetActiviteRechercheDetailPaysDao.findById(id) == null) return 0;
else{
projetActiviteRechercheDetailPaysDao.deleteById(id);
return 1;
}
}


@Override
public ProjetActiviteRechercheDetailPays update(ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays){
ProjetActiviteRechercheDetailPays foundedProjetActiviteRechercheDetailPays = findById(projetActiviteRechercheDetailPays.getId());
if(foundedProjetActiviteRechercheDetailPays==null) return null;
else{
return  projetActiviteRechercheDetailPaysDao.save(projetActiviteRechercheDetailPays);
}
}

@Override
public ProjetActiviteRechercheDetailPays save (ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays){


    findPays(projetActiviteRechercheDetailPays);
    findProjetActiviteRechercheDetail(projetActiviteRechercheDetailPays);

ProjetActiviteRechercheDetailPays savedProjetActiviteRechercheDetailPays = projetActiviteRechercheDetailPaysDao.save(projetActiviteRechercheDetailPays);
return savedProjetActiviteRechercheDetailPays;
}

@Override
public List<ProjetActiviteRechercheDetailPays> save(List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPayss){
List<ProjetActiviteRechercheDetailPays> list = new ArrayList<ProjetActiviteRechercheDetailPays>();
for(ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays: projetActiviteRechercheDetailPayss){
list.add(save(projetActiviteRechercheDetailPays));
}
return list;
}



@Override
@Transactional
public int delete(ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays){
    if(projetActiviteRechercheDetailPays.getId()==null) return -1;
    ProjetActiviteRechercheDetailPays foundedProjetActiviteRechercheDetailPays = findById(projetActiviteRechercheDetailPays.getId());
    if(foundedProjetActiviteRechercheDetailPays==null) return -1;
projetActiviteRechercheDetailPaysDao.delete(foundedProjetActiviteRechercheDetailPays);
return 1;
}


public List<ProjetActiviteRechercheDetailPays> findByCriteria(ProjetActiviteRechercheDetailPaysVo projetActiviteRechercheDetailPaysVo){

String query = "SELECT o FROM ProjetActiviteRechercheDetailPays o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",projetActiviteRechercheDetailPaysVo.getId());
    if(projetActiviteRechercheDetailPaysVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",projetActiviteRechercheDetailPaysVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",projetActiviteRechercheDetailPaysVo.getPaysVo().getCode());
    }

    if(projetActiviteRechercheDetailPaysVo.getProjetActiviteRechercheDetailVo()!=null){
        query += SearchUtil.addConstraint( "o", "projetActiviteRechercheDetail.id","=",projetActiviteRechercheDetailPaysVo.getProjetActiviteRechercheDetailVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPays(ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays){
        Pays loadedPays =paysService.findByIdOrCode(projetActiviteRechercheDetailPays.getPays());

    if(loadedPays==null ) {
        return;
    }
    projetActiviteRechercheDetailPays.setPays(loadedPays);
    }
    private void findProjetActiviteRechercheDetail(ProjetActiviteRechercheDetailPays projetActiviteRechercheDetailPays){
        ProjetActiviteRechercheDetail loadedProjetActiviteRechercheDetail = null;
        if(projetActiviteRechercheDetailPays.getProjetActiviteRechercheDetail() != null && projetActiviteRechercheDetailPays.getProjetActiviteRechercheDetail().getId() !=null)
        loadedProjetActiviteRechercheDetail =projetActiviteRechercheDetailService.findById(projetActiviteRechercheDetailPays.getProjetActiviteRechercheDetail().getId());

    if(loadedProjetActiviteRechercheDetail==null ) {
        return;
    }
    projetActiviteRechercheDetailPays.setProjetActiviteRechercheDetail(loadedProjetActiviteRechercheDetail);
    }

@Override
@Transactional
public void delete(List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPayss){
        if(ListUtil.isNotEmpty(projetActiviteRechercheDetailPayss)){
        projetActiviteRechercheDetailPayss.forEach(e->projetActiviteRechercheDetailPaysDao.delete(e));
        }
}
@Override
public void update(List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPayss){
if(ListUtil.isNotEmpty(projetActiviteRechercheDetailPayss)){
projetActiviteRechercheDetailPayss.forEach(e->projetActiviteRechercheDetailPaysDao.save(e));
}
}



@Override
public List<List<ProjetActiviteRechercheDetailPays>>  getToBeSavedAndToBeDeleted(List<ProjetActiviteRechercheDetailPays> oldList,List<ProjetActiviteRechercheDetailPays> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
