package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.NiveauEtudeEnseignement;
import com.ird.faa.bean.referentiel.NiveauEtude;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.dao.referentiel.NiveauEtudeEnseignementDao;
import com.ird.faa.service.admin.facade.referentiel.NiveauEtudeEnseignementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.NiveauEtudeAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.NiveauEtudeEnseignementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class NiveauEtudeEnseignementAdminServiceImpl extends AbstractServiceImpl<NiveauEtudeEnseignement> implements NiveauEtudeEnseignementAdminService {

@Autowired
private NiveauEtudeEnseignementDao niveauEtudeEnseignementDao;

        @Autowired
        private EnseignementAdminService enseignementService ;
        @Autowired
        private NiveauEtudeAdminService niveauEtudeService ;


@Autowired
private EntityManager entityManager;


@Override
public List<NiveauEtudeEnseignement> findAll(){
        return niveauEtudeEnseignementDao.findAll();
}

        @Override
        public List<NiveauEtudeEnseignement> findByNiveauEtudeCode(String code){
        return niveauEtudeEnseignementDao.findByNiveauEtudeCode(code);
        }

        @Override
        @Transactional
        public int deleteByNiveauEtudeCode(String code){
        return niveauEtudeEnseignementDao.deleteByNiveauEtudeCode(code);
        }

        @Override
        public List<NiveauEtudeEnseignement> findByNiveauEtudeId(Long id){
        return niveauEtudeEnseignementDao.findByNiveauEtudeId(id);
        }

        @Override
        @Transactional
        public int deleteByNiveauEtudeId(Long id){
        return niveauEtudeEnseignementDao.deleteByNiveauEtudeId(id);
        }

        @Override
        public List<NiveauEtudeEnseignement> findByEnseignementId(Long id){
        return niveauEtudeEnseignementDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return niveauEtudeEnseignementDao.deleteByEnseignementId(id);
        }


@Override
public NiveauEtudeEnseignement findById(Long id){
if(id==null) return null;
return niveauEtudeEnseignementDao.getOne(id);
}

@Override
public NiveauEtudeEnseignement findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(niveauEtudeEnseignementDao.findById(id).isPresent())  {
niveauEtudeEnseignementDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public NiveauEtudeEnseignement update(NiveauEtudeEnseignement niveauEtudeEnseignement){
NiveauEtudeEnseignement foundedNiveauEtudeEnseignement = findById(niveauEtudeEnseignement.getId());
if(foundedNiveauEtudeEnseignement==null) return null;
else{
return  niveauEtudeEnseignementDao.save(niveauEtudeEnseignement);
}
}

@Override
public NiveauEtudeEnseignement save (NiveauEtudeEnseignement niveauEtudeEnseignement){



    findNiveauEtude(niveauEtudeEnseignement);
    findEnseignement(niveauEtudeEnseignement);

return niveauEtudeEnseignementDao.save(niveauEtudeEnseignement);


}

@Override
public List<NiveauEtudeEnseignement> save(List<NiveauEtudeEnseignement> niveauEtudeEnseignements){
List<NiveauEtudeEnseignement> list = new ArrayList<>();
for(NiveauEtudeEnseignement niveauEtudeEnseignement: niveauEtudeEnseignements){
list.add(save(niveauEtudeEnseignement));
}
return list;
}



@Override
@Transactional
public int delete(NiveauEtudeEnseignement niveauEtudeEnseignement){
    if(niveauEtudeEnseignement.getId()==null) return -1;
    NiveauEtudeEnseignement foundedNiveauEtudeEnseignement = findById(niveauEtudeEnseignement.getId());
    if(foundedNiveauEtudeEnseignement==null) return -1;
niveauEtudeEnseignementDao.delete(foundedNiveauEtudeEnseignement);
return 1;
}


public List<NiveauEtudeEnseignement> findByCriteria(NiveauEtudeEnseignementVo niveauEtudeEnseignementVo){

String query = "SELECT o FROM NiveauEtudeEnseignement o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",niveauEtudeEnseignementVo.getId());
    if(niveauEtudeEnseignementVo.getNiveauEtudeVo()!=null){
        query += SearchUtil.addConstraint( "o", "niveauEtude.id","=",niveauEtudeEnseignementVo.getNiveauEtudeVo().getId());
            query += SearchUtil.addConstraint( "o", "niveauEtude.code","LIKE",niveauEtudeEnseignementVo.getNiveauEtudeVo().getCode());
    }

    if(niveauEtudeEnseignementVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",niveauEtudeEnseignementVo.getEnseignementVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findNiveauEtude(NiveauEtudeEnseignement niveauEtudeEnseignement){
        NiveauEtude loadedNiveauEtude =niveauEtudeService.findByIdOrCode(niveauEtudeEnseignement.getNiveauEtude());

    if(loadedNiveauEtude==null ) {
        return;
    }
    niveauEtudeEnseignement.setNiveauEtude(loadedNiveauEtude);
    }
    private void findEnseignement(NiveauEtudeEnseignement niveauEtudeEnseignement){
        Enseignement loadedEnseignement = null;
        if(niveauEtudeEnseignement.getEnseignement() != null && niveauEtudeEnseignement.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(niveauEtudeEnseignement.getEnseignement().getId());

    if(loadedEnseignement==null ) {
        return;
    }
    niveauEtudeEnseignement.setEnseignement(loadedEnseignement);
    }

@Override
@Transactional
public void delete(List<NiveauEtudeEnseignement> niveauEtudeEnseignements){
        if(ListUtil.isNotEmpty(niveauEtudeEnseignements)){
        niveauEtudeEnseignements.forEach(e->niveauEtudeEnseignementDao.delete(e));
        }
}
@Override
public void update(List<NiveauEtudeEnseignement> niveauEtudeEnseignements){
if(ListUtil.isNotEmpty(niveauEtudeEnseignements)){
niveauEtudeEnseignements.forEach(e->niveauEtudeEnseignementDao.save(e));
}
}



}
