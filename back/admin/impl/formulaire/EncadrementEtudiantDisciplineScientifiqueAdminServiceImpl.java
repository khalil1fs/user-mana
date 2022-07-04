package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EncadrementEtudiantDisciplineScientifique;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.dao.formulaire.EncadrementEtudiantDisciplineScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementEtudiantDisciplineScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EncadrementEtudiantDisciplineScientifiqueAdminServiceImpl extends AbstractServiceImpl<EncadrementEtudiantDisciplineScientifique> implements EncadrementEtudiantDisciplineScientifiqueAdminService {

@Autowired
private EncadrementEtudiantDisciplineScientifiqueDao encadrementEtudiantDisciplineScientifiqueDao;

        @Autowired
        private EncadrementEtudiantAdminService encadrementEtudiantService ;
        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EncadrementEtudiantDisciplineScientifique> findAll(){
return encadrementEtudiantDisciplineScientifiqueDao.findAll();
}
        @Override
        public List<EncadrementEtudiantDisciplineScientifique> findByEncadrementEtudiantId(Long id){
        return encadrementEtudiantDisciplineScientifiqueDao.findByEncadrementEtudiantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementEtudiantId(Long id){
        return encadrementEtudiantDisciplineScientifiqueDao.deleteByEncadrementEtudiantId(id);
        }


        @Override
        public List<EncadrementEtudiantDisciplineScientifique> findByDisciplineScientifiqueCode(String code){
        return encadrementEtudiantDisciplineScientifiqueDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return encadrementEtudiantDisciplineScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<EncadrementEtudiantDisciplineScientifique> findByDisciplineScientifiqueId(Long id){
        return encadrementEtudiantDisciplineScientifiqueDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return encadrementEtudiantDisciplineScientifiqueDao.deleteByDisciplineScientifiqueId(id);
        }


@Override
public EncadrementEtudiantDisciplineScientifique findById(Long id){
if(id==null) return null;
return encadrementEtudiantDisciplineScientifiqueDao.getOne(id);
}

@Override
public EncadrementEtudiantDisciplineScientifique findByIdWithAssociatedList(Long id){
EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique  = findById(id);
return encadrementEtudiantDisciplineScientifique;
}


@Transactional
public int deleteById(Long id){
if(encadrementEtudiantDisciplineScientifiqueDao.findById(id) == null) return 0;
else{
encadrementEtudiantDisciplineScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public EncadrementEtudiantDisciplineScientifique update(EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique){
EncadrementEtudiantDisciplineScientifique foundedEncadrementEtudiantDisciplineScientifique = findById(encadrementEtudiantDisciplineScientifique.getId());
if(foundedEncadrementEtudiantDisciplineScientifique==null) return null;
else{
return  encadrementEtudiantDisciplineScientifiqueDao.save(encadrementEtudiantDisciplineScientifique);
}
}

@Override
public EncadrementEtudiantDisciplineScientifique save (EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique){


    findEncadrementEtudiant(encadrementEtudiantDisciplineScientifique);
    findDisciplineScientifique(encadrementEtudiantDisciplineScientifique);

EncadrementEtudiantDisciplineScientifique savedEncadrementEtudiantDisciplineScientifique = encadrementEtudiantDisciplineScientifiqueDao.save(encadrementEtudiantDisciplineScientifique);
return savedEncadrementEtudiantDisciplineScientifique;
}

@Override
public List<EncadrementEtudiantDisciplineScientifique> save(List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifiques){
List<EncadrementEtudiantDisciplineScientifique> list = new ArrayList<EncadrementEtudiantDisciplineScientifique>();
for(EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique: encadrementEtudiantDisciplineScientifiques){
list.add(save(encadrementEtudiantDisciplineScientifique));
}
return list;
}



@Override
@Transactional
public int delete(EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique){
    if(encadrementEtudiantDisciplineScientifique.getId()==null) return -1;
    EncadrementEtudiantDisciplineScientifique foundedEncadrementEtudiantDisciplineScientifique = findById(encadrementEtudiantDisciplineScientifique.getId());
    if(foundedEncadrementEtudiantDisciplineScientifique==null) return -1;
encadrementEtudiantDisciplineScientifiqueDao.delete(foundedEncadrementEtudiantDisciplineScientifique);
return 1;
}


public List<EncadrementEtudiantDisciplineScientifique> findByCriteria(EncadrementEtudiantDisciplineScientifiqueVo encadrementEtudiantDisciplineScientifiqueVo){

String query = "SELECT o FROM EncadrementEtudiantDisciplineScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",encadrementEtudiantDisciplineScientifiqueVo.getId());
    if(encadrementEtudiantDisciplineScientifiqueVo.getEncadrementEtudiantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementEtudiant.id","=",encadrementEtudiantDisciplineScientifiqueVo.getEncadrementEtudiantVo().getId());
    }

    if(encadrementEtudiantDisciplineScientifiqueVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",encadrementEtudiantDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",encadrementEtudiantDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEncadrementEtudiant(EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique){
        EncadrementEtudiant loadedEncadrementEtudiant = null;
        if(encadrementEtudiantDisciplineScientifique.getEncadrementEtudiant() != null && encadrementEtudiantDisciplineScientifique.getEncadrementEtudiant().getId() !=null)
        loadedEncadrementEtudiant =encadrementEtudiantService.findById(encadrementEtudiantDisciplineScientifique.getEncadrementEtudiant().getId());

    if(loadedEncadrementEtudiant==null ) {
        return;
    }
    encadrementEtudiantDisciplineScientifique.setEncadrementEtudiant(loadedEncadrementEtudiant);
    }
    private void findDisciplineScientifique(EncadrementEtudiantDisciplineScientifique encadrementEtudiantDisciplineScientifique){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(encadrementEtudiantDisciplineScientifique.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    encadrementEtudiantDisciplineScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
    }

@Override
@Transactional
public void delete(List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifiques){
        if(ListUtil.isNotEmpty(encadrementEtudiantDisciplineScientifiques)){
        encadrementEtudiantDisciplineScientifiques.forEach(e->encadrementEtudiantDisciplineScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifiques){
if(ListUtil.isNotEmpty(encadrementEtudiantDisciplineScientifiques)){
encadrementEtudiantDisciplineScientifiques.forEach(e->encadrementEtudiantDisciplineScientifiqueDao.save(e));
}
}



@Override
public List<List<EncadrementEtudiantDisciplineScientifique>>  getToBeSavedAndToBeDeleted(List<EncadrementEtudiantDisciplineScientifique> oldList,List<EncadrementEtudiantDisciplineScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
