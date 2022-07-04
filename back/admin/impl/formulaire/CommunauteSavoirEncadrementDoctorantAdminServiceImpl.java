package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirEncadrementDoctorant;
import com.ird.faa.bean.referentiel.CommunauteSavoir;
import com.ird.faa.bean.formulaire.EncadrementDoctorant;
import com.ird.faa.dao.formulaire.CommunauteSavoirEncadrementDoctorantDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEncadrementDoctorantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirEncadrementDoctorantAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirEncadrementDoctorant> implements CommunauteSavoirEncadrementDoctorantAdminService {

@Autowired
private CommunauteSavoirEncadrementDoctorantDao communauteSavoirEncadrementDoctorantDao;

        @Autowired
        private EncadrementDoctorantAdminService encadrementDoctorantService ;
        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirEncadrementDoctorant> findAll(){
return communauteSavoirEncadrementDoctorantDao.findAll();
}

        @Override
        public List<CommunauteSavoirEncadrementDoctorant> findByCommunauteSavoirCode(String code){
        return communauteSavoirEncadrementDoctorantDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirEncadrementDoctorantDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirEncadrementDoctorant> findByCommunauteSavoirId(Long id){
        return communauteSavoirEncadrementDoctorantDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirEncadrementDoctorantDao.deleteByCommunauteSavoirId(id);
        }

        @Override
        public List<CommunauteSavoirEncadrementDoctorant> findByEncadrementDoctorantId(Long id){
        return communauteSavoirEncadrementDoctorantDao.findByEncadrementDoctorantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementDoctorantId(Long id){
        return communauteSavoirEncadrementDoctorantDao.deleteByEncadrementDoctorantId(id);
        }


@Override
public CommunauteSavoirEncadrementDoctorant findById(Long id){
if(id==null) return null;
return communauteSavoirEncadrementDoctorantDao.getOne(id);
}

@Override
public CommunauteSavoirEncadrementDoctorant findByIdWithAssociatedList(Long id){
CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant  = findById(id);
return communauteSavoirEncadrementDoctorant;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirEncadrementDoctorantDao.findById(id) == null) return 0;
else{
communauteSavoirEncadrementDoctorantDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirEncadrementDoctorant update(CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant){
CommunauteSavoirEncadrementDoctorant foundedCommunauteSavoirEncadrementDoctorant = findById(communauteSavoirEncadrementDoctorant.getId());
if(foundedCommunauteSavoirEncadrementDoctorant==null) return null;
else{
return  communauteSavoirEncadrementDoctorantDao.save(communauteSavoirEncadrementDoctorant);
}
}

@Override
public CommunauteSavoirEncadrementDoctorant save (CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant){


    findCommunauteSavoir(communauteSavoirEncadrementDoctorant);
    findEncadrementDoctorant(communauteSavoirEncadrementDoctorant);

CommunauteSavoirEncadrementDoctorant savedCommunauteSavoirEncadrementDoctorant = communauteSavoirEncadrementDoctorantDao.save(communauteSavoirEncadrementDoctorant);
return savedCommunauteSavoirEncadrementDoctorant;
}

@Override
public List<CommunauteSavoirEncadrementDoctorant> save(List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorants){
List<CommunauteSavoirEncadrementDoctorant> list = new ArrayList<CommunauteSavoirEncadrementDoctorant>();
for(CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant: communauteSavoirEncadrementDoctorants){
list.add(save(communauteSavoirEncadrementDoctorant));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant){
    if(communauteSavoirEncadrementDoctorant.getId()==null) return -1;
    CommunauteSavoirEncadrementDoctorant foundedCommunauteSavoirEncadrementDoctorant = findById(communauteSavoirEncadrementDoctorant.getId());
    if(foundedCommunauteSavoirEncadrementDoctorant==null) return -1;
communauteSavoirEncadrementDoctorantDao.delete(foundedCommunauteSavoirEncadrementDoctorant);
return 1;
}


public List<CommunauteSavoirEncadrementDoctorant> findByCriteria(CommunauteSavoirEncadrementDoctorantVo communauteSavoirEncadrementDoctorantVo){

String query = "SELECT o FROM CommunauteSavoirEncadrementDoctorant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirEncadrementDoctorantVo.getId());
    if(communauteSavoirEncadrementDoctorantVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirEncadrementDoctorantVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirEncadrementDoctorantVo.getCommunauteSavoirVo().getCode());
    }

    if(communauteSavoirEncadrementDoctorantVo.getEncadrementDoctorantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementDoctorant.id","=",communauteSavoirEncadrementDoctorantVo.getEncadrementDoctorantVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommunauteSavoir(CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirEncadrementDoctorant.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirEncadrementDoctorant.setCommunauteSavoir(loadedCommunauteSavoir);
    }
    private void findEncadrementDoctorant(CommunauteSavoirEncadrementDoctorant communauteSavoirEncadrementDoctorant){
        EncadrementDoctorant loadedEncadrementDoctorant = null;
        if(communauteSavoirEncadrementDoctorant.getEncadrementDoctorant() != null && communauteSavoirEncadrementDoctorant.getEncadrementDoctorant().getId() !=null)
        loadedEncadrementDoctorant =encadrementDoctorantService.findById(communauteSavoirEncadrementDoctorant.getEncadrementDoctorant().getId());

    if(loadedEncadrementDoctorant==null ) {
        return;
    }
    communauteSavoirEncadrementDoctorant.setEncadrementDoctorant(loadedEncadrementDoctorant);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorants){
        if(ListUtil.isNotEmpty(communauteSavoirEncadrementDoctorants)){
        communauteSavoirEncadrementDoctorants.forEach(e->communauteSavoirEncadrementDoctorantDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorants){
if(ListUtil.isNotEmpty(communauteSavoirEncadrementDoctorants)){
communauteSavoirEncadrementDoctorants.forEach(e->communauteSavoirEncadrementDoctorantDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirEncadrementDoctorant>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirEncadrementDoctorant> oldList,List<CommunauteSavoirEncadrementDoctorant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
