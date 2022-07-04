package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementDisciplineScientifique;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.dao.formulaire.EnseignementDisciplineScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementDisciplineScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementDisciplineScientifiqueAdminServiceImpl extends AbstractServiceImpl<EnseignementDisciplineScientifique> implements EnseignementDisciplineScientifiqueAdminService {

@Autowired
private EnseignementDisciplineScientifiqueDao enseignementDisciplineScientifiqueDao;

        @Autowired
        private EnseignementAdminService enseignementService ;
        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnseignementDisciplineScientifique> findAll(){
        return enseignementDisciplineScientifiqueDao.findAll();
}

        @Override
        public List<EnseignementDisciplineScientifique> findByDisciplineScientifiqueCode(String code){
        return enseignementDisciplineScientifiqueDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return enseignementDisciplineScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<EnseignementDisciplineScientifique> findByDisciplineScientifiqueId(Long id){
        return enseignementDisciplineScientifiqueDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return enseignementDisciplineScientifiqueDao.deleteByDisciplineScientifiqueId(id);
        }

        @Override
        public List<EnseignementDisciplineScientifique> findByEnseignementId(Long id){
        return enseignementDisciplineScientifiqueDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return enseignementDisciplineScientifiqueDao.deleteByEnseignementId(id);
        }


@Override
public EnseignementDisciplineScientifique findById(Long id){
if(id==null) return null;
return enseignementDisciplineScientifiqueDao.getOne(id);
}

@Override
public EnseignementDisciplineScientifique findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(enseignementDisciplineScientifiqueDao.findById(id).isPresent())  {
enseignementDisciplineScientifiqueDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public EnseignementDisciplineScientifique update(EnseignementDisciplineScientifique enseignementDisciplineScientifique){
EnseignementDisciplineScientifique foundedEnseignementDisciplineScientifique = findById(enseignementDisciplineScientifique.getId());
if(foundedEnseignementDisciplineScientifique==null) return null;
else{
return  enseignementDisciplineScientifiqueDao.save(enseignementDisciplineScientifique);
}
}

@Override
public EnseignementDisciplineScientifique save (EnseignementDisciplineScientifique enseignementDisciplineScientifique){



    findDisciplineScientifique(enseignementDisciplineScientifique);
    findEnseignement(enseignementDisciplineScientifique);

return enseignementDisciplineScientifiqueDao.save(enseignementDisciplineScientifique);


}

@Override
public List<EnseignementDisciplineScientifique> save(List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques){
List<EnseignementDisciplineScientifique> list = new ArrayList<>();
for(EnseignementDisciplineScientifique enseignementDisciplineScientifique: enseignementDisciplineScientifiques){
list.add(save(enseignementDisciplineScientifique));
}
return list;
}



@Override
@Transactional
public int delete(EnseignementDisciplineScientifique enseignementDisciplineScientifique){
    if(enseignementDisciplineScientifique.getId()==null) return -1;
    EnseignementDisciplineScientifique foundedEnseignementDisciplineScientifique = findById(enseignementDisciplineScientifique.getId());
    if(foundedEnseignementDisciplineScientifique==null) return -1;
enseignementDisciplineScientifiqueDao.delete(foundedEnseignementDisciplineScientifique);
return 1;
}


public List<EnseignementDisciplineScientifique> findByCriteria(EnseignementDisciplineScientifiqueVo enseignementDisciplineScientifiqueVo){

String query = "SELECT o FROM EnseignementDisciplineScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enseignementDisciplineScientifiqueVo.getId());
    if(enseignementDisciplineScientifiqueVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",enseignementDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",enseignementDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getCode());
    }

    if(enseignementDisciplineScientifiqueVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",enseignementDisciplineScientifiqueVo.getEnseignementVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifique(EnseignementDisciplineScientifique enseignementDisciplineScientifique){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(enseignementDisciplineScientifique.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    enseignementDisciplineScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
    }
    private void findEnseignement(EnseignementDisciplineScientifique enseignementDisciplineScientifique){
        Enseignement loadedEnseignement = null;
        if(enseignementDisciplineScientifique.getEnseignement() != null && enseignementDisciplineScientifique.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(enseignementDisciplineScientifique.getEnseignement().getId());

    if(loadedEnseignement==null ) {
        return;
    }
    enseignementDisciplineScientifique.setEnseignement(loadedEnseignement);
    }

@Override
@Transactional
public void delete(List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques){
        if(ListUtil.isNotEmpty(enseignementDisciplineScientifiques)){
        enseignementDisciplineScientifiques.forEach(e->enseignementDisciplineScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques){
if(ListUtil.isNotEmpty(enseignementDisciplineScientifiques)){
enseignementDisciplineScientifiques.forEach(e->enseignementDisciplineScientifiqueDao.save(e));
}
}



}
