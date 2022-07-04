package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CommunauteSavoirEncadrementEtudiant;
import com.ird.faa.bean.referentiel.CommunauteSavoir;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.dao.formulaire.CommunauteSavoirEncadrementEtudiantDao;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirEncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.referentiel.CommunauteSavoirAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEncadrementEtudiantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommunauteSavoirEncadrementEtudiantAdminServiceImpl extends AbstractServiceImpl<CommunauteSavoirEncadrementEtudiant> implements CommunauteSavoirEncadrementEtudiantAdminService {

@Autowired
private CommunauteSavoirEncadrementEtudiantDao communauteSavoirEncadrementEtudiantDao;

        @Autowired
        private EncadrementEtudiantAdminService encadrementEtudiantService ;
        @Autowired
        private CommunauteSavoirAdminService communauteSavoirService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommunauteSavoirEncadrementEtudiant> findAll(){
return communauteSavoirEncadrementEtudiantDao.findAll();
}

        @Override
        public List<CommunauteSavoirEncadrementEtudiant> findByCommunauteSavoirCode(String code){
        return communauteSavoirEncadrementEtudiantDao.findByCommunauteSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirCode(String code){
        return communauteSavoirEncadrementEtudiantDao.deleteByCommunauteSavoirCode(code);
        }

        @Override
        public List<CommunauteSavoirEncadrementEtudiant> findByCommunauteSavoirId(Long id){
        return communauteSavoirEncadrementEtudiantDao.findByCommunauteSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByCommunauteSavoirId(Long id){
        return communauteSavoirEncadrementEtudiantDao.deleteByCommunauteSavoirId(id);
        }

        @Override
        public List<CommunauteSavoirEncadrementEtudiant> findByEncadrementEtudiantId(Long id){
        return communauteSavoirEncadrementEtudiantDao.findByEncadrementEtudiantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementEtudiantId(Long id){
        return communauteSavoirEncadrementEtudiantDao.deleteByEncadrementEtudiantId(id);
        }


@Override
public CommunauteSavoirEncadrementEtudiant findById(Long id){
if(id==null) return null;
return communauteSavoirEncadrementEtudiantDao.getOne(id);
}

@Override
public CommunauteSavoirEncadrementEtudiant findByIdWithAssociatedList(Long id){
CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant  = findById(id);
return communauteSavoirEncadrementEtudiant;
}


@Transactional
public int deleteById(Long id){
if(communauteSavoirEncadrementEtudiantDao.findById(id) == null) return 0;
else{
communauteSavoirEncadrementEtudiantDao.deleteById(id);
return 1;
}
}


@Override
public CommunauteSavoirEncadrementEtudiant update(CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant){
CommunauteSavoirEncadrementEtudiant foundedCommunauteSavoirEncadrementEtudiant = findById(communauteSavoirEncadrementEtudiant.getId());
if(foundedCommunauteSavoirEncadrementEtudiant==null) return null;
else{
return  communauteSavoirEncadrementEtudiantDao.save(communauteSavoirEncadrementEtudiant);
}
}

@Override
public CommunauteSavoirEncadrementEtudiant save (CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant){


    findCommunauteSavoir(communauteSavoirEncadrementEtudiant);
    findEncadrementEtudiant(communauteSavoirEncadrementEtudiant);

CommunauteSavoirEncadrementEtudiant savedCommunauteSavoirEncadrementEtudiant = communauteSavoirEncadrementEtudiantDao.save(communauteSavoirEncadrementEtudiant);
return savedCommunauteSavoirEncadrementEtudiant;
}

@Override
public List<CommunauteSavoirEncadrementEtudiant> save(List<CommunauteSavoirEncadrementEtudiant> communauteSavoirEncadrementEtudiants){
List<CommunauteSavoirEncadrementEtudiant> list = new ArrayList<CommunauteSavoirEncadrementEtudiant>();
for(CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant: communauteSavoirEncadrementEtudiants){
list.add(save(communauteSavoirEncadrementEtudiant));
}
return list;
}



@Override
@Transactional
public int delete(CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant){
    if(communauteSavoirEncadrementEtudiant.getId()==null) return -1;
    CommunauteSavoirEncadrementEtudiant foundedCommunauteSavoirEncadrementEtudiant = findById(communauteSavoirEncadrementEtudiant.getId());
    if(foundedCommunauteSavoirEncadrementEtudiant==null) return -1;
communauteSavoirEncadrementEtudiantDao.delete(foundedCommunauteSavoirEncadrementEtudiant);
return 1;
}


public List<CommunauteSavoirEncadrementEtudiant> findByCriteria(CommunauteSavoirEncadrementEtudiantVo communauteSavoirEncadrementEtudiantVo){

String query = "SELECT o FROM CommunauteSavoirEncadrementEtudiant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",communauteSavoirEncadrementEtudiantVo.getId());
    if(communauteSavoirEncadrementEtudiantVo.getCommunauteSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "communauteSavoir.id","=",communauteSavoirEncadrementEtudiantVo.getCommunauteSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "communauteSavoir.code","LIKE",communauteSavoirEncadrementEtudiantVo.getCommunauteSavoirVo().getCode());
    }

    if(communauteSavoirEncadrementEtudiantVo.getEncadrementEtudiantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementEtudiant.id","=",communauteSavoirEncadrementEtudiantVo.getEncadrementEtudiantVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommunauteSavoir(CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant){
        CommunauteSavoir loadedCommunauteSavoir =communauteSavoirService.findByIdOrCode(communauteSavoirEncadrementEtudiant.getCommunauteSavoir());

    if(loadedCommunauteSavoir==null ) {
        return;
    }
    communauteSavoirEncadrementEtudiant.setCommunauteSavoir(loadedCommunauteSavoir);
    }
    private void findEncadrementEtudiant(CommunauteSavoirEncadrementEtudiant communauteSavoirEncadrementEtudiant){
        EncadrementEtudiant loadedEncadrementEtudiant = null;
        if(communauteSavoirEncadrementEtudiant.getEncadrementEtudiant() != null && communauteSavoirEncadrementEtudiant.getEncadrementEtudiant().getId() !=null)
        loadedEncadrementEtudiant =encadrementEtudiantService.findById(communauteSavoirEncadrementEtudiant.getEncadrementEtudiant().getId());

    if(loadedEncadrementEtudiant==null ) {
        return;
    }
    communauteSavoirEncadrementEtudiant.setEncadrementEtudiant(loadedEncadrementEtudiant);
    }

@Override
@Transactional
public void delete(List<CommunauteSavoirEncadrementEtudiant> communauteSavoirEncadrementEtudiants){
        if(ListUtil.isNotEmpty(communauteSavoirEncadrementEtudiants)){
        communauteSavoirEncadrementEtudiants.forEach(e->communauteSavoirEncadrementEtudiantDao.delete(e));
        }
}
@Override
public void update(List<CommunauteSavoirEncadrementEtudiant> communauteSavoirEncadrementEtudiants){
if(ListUtil.isNotEmpty(communauteSavoirEncadrementEtudiants)){
communauteSavoirEncadrementEtudiants.forEach(e->communauteSavoirEncadrementEtudiantDao.save(e));
}
}



@Override
public List<List<CommunauteSavoirEncadrementEtudiant>>  getToBeSavedAndToBeDeleted(List<CommunauteSavoirEncadrementEtudiant> oldList,List<CommunauteSavoirEncadrementEtudiant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
