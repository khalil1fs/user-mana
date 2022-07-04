package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.InstitutionCoContractant;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.referentiel.Institution;
import com.ird.faa.dao.formulaire.InstitutionCoContractantDao;
import com.ird.faa.service.admin.facade.formulaire.InstitutionCoContractantAdminService;
        import com.ird.faa.service.admin.facade.referentiel.InstitutionAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.InstitutionCoContractantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class InstitutionCoContractantAdminServiceImpl extends AbstractServiceImpl<InstitutionCoContractant> implements InstitutionCoContractantAdminService {

@Autowired
private InstitutionCoContractantDao institutionCoContractantDao;

        @Autowired
        private InstitutionAdminService institutionService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<InstitutionCoContractant> findAll(){
return institutionCoContractantDao.findAll();
}

        @Override
        public List<InstitutionCoContractant> findByChercheurNumeroMatricule(String numeroMatricule){
        return institutionCoContractantDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return institutionCoContractantDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<InstitutionCoContractant> findByChercheurId(Long id){
        return institutionCoContractantDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return institutionCoContractantDao.deleteByChercheurId(id);
        }


        @Override
        public List<InstitutionCoContractant> findByInstitutionCode(String code){
        return institutionCoContractantDao.findByInstitutionCode(code);
        }

        @Override
        @Transactional
        public int deleteByInstitutionCode(String code){
        return institutionCoContractantDao.deleteByInstitutionCode(code);
        }

        @Override
        public List<InstitutionCoContractant> findByInstitutionId(Long id){
        return institutionCoContractantDao.findByInstitutionId(id);
        }

        @Override
        @Transactional
        public int deleteByInstitutionId(Long id){
        return institutionCoContractantDao.deleteByInstitutionId(id);
        }


@Override
public InstitutionCoContractant findById(Long id){
if(id==null) return null;
return institutionCoContractantDao.getOne(id);
}

@Override
public InstitutionCoContractant findByIdWithAssociatedList(Long id){
InstitutionCoContractant institutionCoContractant  = findById(id);
return institutionCoContractant;
}


@Transactional
public int deleteById(Long id){
if(institutionCoContractantDao.findById(id) == null) return 0;
else{
institutionCoContractantDao.deleteById(id);
return 1;
}
}


@Override
public InstitutionCoContractant update(InstitutionCoContractant institutionCoContractant){
InstitutionCoContractant foundedInstitutionCoContractant = findById(institutionCoContractant.getId());
if(foundedInstitutionCoContractant==null) return null;
else{
return  institutionCoContractantDao.save(institutionCoContractant);
}
}

@Override
public InstitutionCoContractant save (InstitutionCoContractant institutionCoContractant){


    findChercheur(institutionCoContractant);
    findInstitution(institutionCoContractant);

InstitutionCoContractant savedInstitutionCoContractant = institutionCoContractantDao.save(institutionCoContractant);
return savedInstitutionCoContractant;
}

@Override
public List<InstitutionCoContractant> save(List<InstitutionCoContractant> institutionCoContractants){
List<InstitutionCoContractant> list = new ArrayList<InstitutionCoContractant>();
for(InstitutionCoContractant institutionCoContractant: institutionCoContractants){
list.add(save(institutionCoContractant));
}
return list;
}



@Override
@Transactional
public int delete(InstitutionCoContractant institutionCoContractant){
    if(institutionCoContractant.getId()==null) return -1;
    InstitutionCoContractant foundedInstitutionCoContractant = findById(institutionCoContractant.getId());
    if(foundedInstitutionCoContractant==null) return -1;
institutionCoContractantDao.delete(foundedInstitutionCoContractant);
return 1;
}


public List<InstitutionCoContractant> findByCriteria(InstitutionCoContractantVo institutionCoContractantVo){

String query = "SELECT o FROM InstitutionCoContractant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",institutionCoContractantVo.getId());
    if(institutionCoContractantVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",institutionCoContractantVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",institutionCoContractantVo.getChercheurVo().getNumeroMatricule());
    }

    if(institutionCoContractantVo.getInstitutionVo()!=null){
        query += SearchUtil.addConstraint( "o", "institution.id","=",institutionCoContractantVo.getInstitutionVo().getId());
            query += SearchUtil.addConstraint( "o", "institution.code","LIKE",institutionCoContractantVo.getInstitutionVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findChercheur(InstitutionCoContractant institutionCoContractant){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(institutionCoContractant.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    institutionCoContractant.setChercheur(loadedChercheur);
    }
    private void findInstitution(InstitutionCoContractant institutionCoContractant){
        Institution loadedInstitution =institutionService.findByIdOrCode(institutionCoContractant.getInstitution());

    if(loadedInstitution==null ) {
        return;
    }
    institutionCoContractant.setInstitution(loadedInstitution);
    }

@Override
@Transactional
public void delete(List<InstitutionCoContractant> institutionCoContractants){
        if(ListUtil.isNotEmpty(institutionCoContractants)){
        institutionCoContractants.forEach(e->institutionCoContractantDao.delete(e));
        }
}
@Override
public void update(List<InstitutionCoContractant> institutionCoContractants){
if(ListUtil.isNotEmpty(institutionCoContractants)){
institutionCoContractants.forEach(e->institutionCoContractantDao.save(e));
}
}



@Override
public List<List<InstitutionCoContractant>>  getToBeSavedAndToBeDeleted(List<InstitutionCoContractant> oldList,List<InstitutionCoContractant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
