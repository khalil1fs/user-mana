package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailEnjeuxIrd;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;
import com.ird.faa.dao.formulaire.ProjetActiviteRechercheDetailEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailEnjeuxIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ProjetActiviteRechercheDetailEnjeuxIrdAdminServiceImpl extends AbstractServiceImpl<ProjetActiviteRechercheDetailEnjeuxIrd> implements ProjetActiviteRechercheDetailEnjeuxIrdAdminService {

@Autowired
private ProjetActiviteRechercheDetailEnjeuxIrdDao projetActiviteRechercheDetailEnjeuxIrdDao;

        @Autowired
        private EnjeuxIrdAdminService enjeuxIrdService ;
        @Autowired
        private ProjetActiviteRechercheDetailAdminService projetActiviteRechercheDetailService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ProjetActiviteRechercheDetailEnjeuxIrd> findAll(){
return projetActiviteRechercheDetailEnjeuxIrdDao.findAll();
}

        @Override
        public List<ProjetActiviteRechercheDetailEnjeuxIrd> findByEnjeuxIrdCode(String code){
        return projetActiviteRechercheDetailEnjeuxIrdDao.findByEnjeuxIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdCode(String code){
        return projetActiviteRechercheDetailEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetailEnjeuxIrd> findByEnjeuxIrdId(Long id){
        return projetActiviteRechercheDetailEnjeuxIrdDao.findByEnjeuxIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdId(Long id){
        return projetActiviteRechercheDetailEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
        }

        @Override
        public List<ProjetActiviteRechercheDetailEnjeuxIrd> findByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailEnjeuxIrdDao.findByProjetActiviteRechercheDetailId(id);
        }

        @Override
        @Transactional
        public int deleteByProjetActiviteRechercheDetailId(Long id){
        return projetActiviteRechercheDetailEnjeuxIrdDao.deleteByProjetActiviteRechercheDetailId(id);
        }


@Override
public ProjetActiviteRechercheDetailEnjeuxIrd findById(Long id){
if(id==null) return null;
return projetActiviteRechercheDetailEnjeuxIrdDao.getOne(id);
}

@Override
public ProjetActiviteRechercheDetailEnjeuxIrd findByIdWithAssociatedList(Long id){
ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd  = findById(id);
return projetActiviteRechercheDetailEnjeuxIrd;
}


@Transactional
public int deleteById(Long id){
if(projetActiviteRechercheDetailEnjeuxIrdDao.findById(id) == null) return 0;
else{
projetActiviteRechercheDetailEnjeuxIrdDao.deleteById(id);
return 1;
}
}


@Override
public ProjetActiviteRechercheDetailEnjeuxIrd update(ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd){
ProjetActiviteRechercheDetailEnjeuxIrd foundedProjetActiviteRechercheDetailEnjeuxIrd = findById(projetActiviteRechercheDetailEnjeuxIrd.getId());
if(foundedProjetActiviteRechercheDetailEnjeuxIrd==null) return null;
else{
return  projetActiviteRechercheDetailEnjeuxIrdDao.save(projetActiviteRechercheDetailEnjeuxIrd);
}
}

@Override
public ProjetActiviteRechercheDetailEnjeuxIrd save (ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd){


    findEnjeuxIrd(projetActiviteRechercheDetailEnjeuxIrd);
    findProjetActiviteRechercheDetail(projetActiviteRechercheDetailEnjeuxIrd);

ProjetActiviteRechercheDetailEnjeuxIrd savedProjetActiviteRechercheDetailEnjeuxIrd = projetActiviteRechercheDetailEnjeuxIrdDao.save(projetActiviteRechercheDetailEnjeuxIrd);
return savedProjetActiviteRechercheDetailEnjeuxIrd;
}

@Override
public List<ProjetActiviteRechercheDetailEnjeuxIrd> save(List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrds){
List<ProjetActiviteRechercheDetailEnjeuxIrd> list = new ArrayList<ProjetActiviteRechercheDetailEnjeuxIrd>();
for(ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd: projetActiviteRechercheDetailEnjeuxIrds){
list.add(save(projetActiviteRechercheDetailEnjeuxIrd));
}
return list;
}



@Override
@Transactional
public int delete(ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd){
    if(projetActiviteRechercheDetailEnjeuxIrd.getId()==null) return -1;
    ProjetActiviteRechercheDetailEnjeuxIrd foundedProjetActiviteRechercheDetailEnjeuxIrd = findById(projetActiviteRechercheDetailEnjeuxIrd.getId());
    if(foundedProjetActiviteRechercheDetailEnjeuxIrd==null) return -1;
projetActiviteRechercheDetailEnjeuxIrdDao.delete(foundedProjetActiviteRechercheDetailEnjeuxIrd);
return 1;
}


public List<ProjetActiviteRechercheDetailEnjeuxIrd> findByCriteria(ProjetActiviteRechercheDetailEnjeuxIrdVo projetActiviteRechercheDetailEnjeuxIrdVo){

String query = "SELECT o FROM ProjetActiviteRechercheDetailEnjeuxIrd o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",projetActiviteRechercheDetailEnjeuxIrdVo.getId());
    if(projetActiviteRechercheDetailEnjeuxIrdVo.getEnjeuxIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "enjeuxIrd.id","=",projetActiviteRechercheDetailEnjeuxIrdVo.getEnjeuxIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "enjeuxIrd.code","LIKE",projetActiviteRechercheDetailEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
    }

    if(projetActiviteRechercheDetailEnjeuxIrdVo.getProjetActiviteRechercheDetailVo()!=null){
        query += SearchUtil.addConstraint( "o", "projetActiviteRechercheDetail.id","=",projetActiviteRechercheDetailEnjeuxIrdVo.getProjetActiviteRechercheDetailVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnjeuxIrd(ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd){
        EnjeuxIrd loadedEnjeuxIrd =enjeuxIrdService.findByIdOrCode(projetActiviteRechercheDetailEnjeuxIrd.getEnjeuxIrd());

    if(loadedEnjeuxIrd==null ) {
        return;
    }
    projetActiviteRechercheDetailEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
    }
    private void findProjetActiviteRechercheDetail(ProjetActiviteRechercheDetailEnjeuxIrd projetActiviteRechercheDetailEnjeuxIrd){
        ProjetActiviteRechercheDetail loadedProjetActiviteRechercheDetail = null;
        if(projetActiviteRechercheDetailEnjeuxIrd.getProjetActiviteRechercheDetail() != null && projetActiviteRechercheDetailEnjeuxIrd.getProjetActiviteRechercheDetail().getId() !=null)
        loadedProjetActiviteRechercheDetail =projetActiviteRechercheDetailService.findById(projetActiviteRechercheDetailEnjeuxIrd.getProjetActiviteRechercheDetail().getId());

    if(loadedProjetActiviteRechercheDetail==null ) {
        return;
    }
    projetActiviteRechercheDetailEnjeuxIrd.setProjetActiviteRechercheDetail(loadedProjetActiviteRechercheDetail);
    }

@Override
@Transactional
public void delete(List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrds){
        if(ListUtil.isNotEmpty(projetActiviteRechercheDetailEnjeuxIrds)){
        projetActiviteRechercheDetailEnjeuxIrds.forEach(e->projetActiviteRechercheDetailEnjeuxIrdDao.delete(e));
        }
}
@Override
public void update(List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrds){
if(ListUtil.isNotEmpty(projetActiviteRechercheDetailEnjeuxIrds)){
projetActiviteRechercheDetailEnjeuxIrds.forEach(e->projetActiviteRechercheDetailEnjeuxIrdDao.save(e));
}
}



@Override
public List<List<ProjetActiviteRechercheDetailEnjeuxIrd>>  getToBeSavedAndToBeDeleted(List<ProjetActiviteRechercheDetailEnjeuxIrd> oldList,List<ProjetActiviteRechercheDetailEnjeuxIrd> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
