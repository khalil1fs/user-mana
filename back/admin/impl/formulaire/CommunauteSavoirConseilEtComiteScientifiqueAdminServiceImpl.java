package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirConseilEtComiteScientifique;
        import com.ird.faa.bean.referentiel.CommunauteSavoir;
        import com.ird.faa.bean.formulaire.ConseilEtComiteScientifique;
import com.ird.faa.dao.formulaire.CommunauteSavoirConseilEtComiteScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirConseilEtComiteScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ConseilEtComiteScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirConseilEtComiteScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirConseilEtComiteScientifiqueAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirConseilEtComiteScientifique> implements CommunauteSavoirConseilEtComiteScientifiqueAdminService {

@Autowired
private CommunauteSavoirConseilEtComiteScientifiqueDao communauteSavoirConseilEtComiteScientifiqueDao;

        @Autowired
        private ConseilEtComiteScientifiqueAdminService conseilEtComiteScientifiqueService ;
        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirConseilEtComiteScientifique> findAll(){
return communauteSavoirConseilEtComiteScientifiqueDao.findAll();
}

        @Override
        public List<CommunauteSavoirConseilEtComiteScientifique> findByCommunauteSavoirCode(String code){
        return communauteSavoirConseilEtComiteScientifiqueDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirConseilEtComiteScientifiqueDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirConseilEtComiteScientifique> findByCommunauteSavoirId(Long id){
        return communauteSavoirConseilEtComiteScientifiqueDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirConseilEtComiteScientifiqueDao.deleteByCommunauteSavoirId(id);
        }


        @Override
        public List<CommunauteSavoirConseilEtComiteScientifique> findByConseilEtComiteScientifiqueAnnee(Integer annee){
        return communauteSavoirConseilEtComiteScientifiqueDao.findByConseilEtComiteScientifiqueAnnee(annee);
        }

        @Override
        @Transactional
        public int deleteByConseilEtComiteScientifiqueAnnee(Integer annee){
        return communauteSavoirConseilEtComiteScientifiqueDao.deleteByConseilEtComiteScientifiqueAnnee(annee);
        }

        @Override
        public List<CommunauteSavoirConseilEtComiteScientifique> findByConseilEtComiteScientifiqueId(Long id){
        return communauteSavoirConseilEtComiteScientifiqueDao.findByConseilEtComiteScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByConseilEtComiteScientifiqueId(Long id){
        return communauteSavoirConseilEtComiteScientifiqueDao.deleteByConseilEtComiteScientifiqueId(id);
        }


@Override
public CommunauteSavoirConseilEtComiteScientifique findById(Long id){
if(id==null) return null;
return communauteSavoirConseilEtComiteScientifiqueDao.getOne(id);
}

@Override
public CommunauteSavoirConseilEtComiteScientifique findByIdWithAssociatedList(Long id){
CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique  = findById(id);
return communauteSavoirConseilEtComiteScientifique;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirConseilEtComiteScientifiqueDao.findById(id) == null) return 0;
else{
communauteSavoirConseilEtComiteScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirConseilEtComiteScientifique update(CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique){
CommunauteSavoirConseilEtComiteScientifique foundedCommunauteSavoirConseilEtComiteScientifique = findById(communauteSavoirConseilEtComiteScientifique.getId());
if(foundedCommunauteSavoirConseilEtComiteScientifique==null) return null;
else{
return  communauteSavoirConseilEtComiteScientifiqueDao.save(communauteSavoirConseilEtComiteScientifique);
}
}

@Override
public CommunauteSavoirConseilEtComiteScientifique save (CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique){


    findCommunauteSavoir(communauteSavoirConseilEtComiteScientifique);
    findConseilEtComiteScientifique(communauteSavoirConseilEtComiteScientifique);

CommunauteSavoirConseilEtComiteScientifique savedCommunauteSavoirConseilEtComiteScientifique = communauteSavoirConseilEtComiteScientifiqueDao.save(communauteSavoirConseilEtComiteScientifique);
return savedCommunauteSavoirConseilEtComiteScientifique;
}

@Override
public List<CommunauteSavoirConseilEtComiteScientifique> save(List<CommunauteSavoirConseilEtComiteScientifique> communauteSavoirConseilEtComiteScientifiques){
List<CommunauteSavoirConseilEtComiteScientifique> list = new ArrayList<CommunauteSavoirConseilEtComiteScientifique>();
for(CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique: communauteSavoirConseilEtComiteScientifiques){
list.add(save(communauteSavoirConseilEtComiteScientifique));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique){
    if(communauteSavoirConseilEtComiteScientifique.getId()==null) return -1;
    CommunauteSavoirConseilEtComiteScientifique foundedCommunauteSavoirConseilEtComiteScientifique = findById(communauteSavoirConseilEtComiteScientifique.getId());
    if(foundedCommunauteSavoirConseilEtComiteScientifique==null) return -1;
communauteSavoirConseilEtComiteScientifiqueDao.delete(foundedCommunauteSavoirConseilEtComiteScientifique);
return 1;
}


public List<CommunauteSavoirConseilEtComiteScientifique> findByCriteria(CommunauteSavoirConseilEtComiteScientifiqueVo communauteSavoirConseilEtComiteScientifiqueVo){

String query = "SELECT o FROM CommunauteSavoirConseilEtComiteScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirConseilEtComiteScientifiqueVo.getId());
    if(communauteSavoirConseilEtComiteScientifiqueVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirConseilEtComiteScientifiqueVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirConseilEtComiteScientifiqueVo.getCommunauteSavoirVo().getCode());
    }

    if(communauteSavoirConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "conseilEtComiteScientifique.id","=",communauteSavoirConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "conseilEtComiteScientifique.annee","=",communauteSavoirConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo().getAnnee());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommunauteSavoir(CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirConseilEtComiteScientifique.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirConseilEtComiteScientifique.setCommunauteSavoir(loadedCommunauteSavoir);
    }
    private void findConseilEtComiteScientifique(CommunauteSavoirConseilEtComiteScientifique communauteSavoirConseilEtComiteScientifique){
        ConseilEtComiteScientifique loadedConseilEtComiteScientifique =conseilEtComiteScientifiqueService.findByIdOrAnnee(communauteSavoirConseilEtComiteScientifique.getConseilEtComiteScientifique());

    if(loadedConseilEtComiteScientifique==null ) {
        return;
    }
    communauteSavoirConseilEtComiteScientifique.setConseilEtComiteScientifique(loadedConseilEtComiteScientifique);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirConseilEtComiteScientifique> communauteSavoirConseilEtComiteScientifiques){
        if(ListUtil.isNotEmpty(communauteSavoirConseilEtComiteScientifiques)){
        communauteSavoirConseilEtComiteScientifiques.forEach(e->communauteSavoirConseilEtComiteScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirConseilEtComiteScientifique> communauteSavoirConseilEtComiteScientifiques){
if(ListUtil.isNotEmpty(communauteSavoirConseilEtComiteScientifiques)){
communauteSavoirConseilEtComiteScientifiques.forEach(e->communauteSavoirConseilEtComiteScientifiqueDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirConseilEtComiteScientifique>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirConseilEtComiteScientifique> oldList,List<CommunauteSavoirConseilEtComiteScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
