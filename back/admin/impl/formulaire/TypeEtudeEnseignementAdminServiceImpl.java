package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.TypeEtudeEnseignement;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.bean.referentiel.TypeEtude;
import com.ird.faa.dao.referentiel.TypeEtudeEnseignementDao;
import com.ird.faa.service.admin.facade.formulaire.TypeEtudeEnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeEtudeAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.TypeEtudeEnseignementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class TypeEtudeEnseignementAdminServiceImpl extends AbstractServiceImpl<TypeEtudeEnseignement> implements TypeEtudeEnseignementAdminService {

@Autowired
private TypeEtudeEnseignementDao typeEtudeEnseignementDao;

        @Autowired
        private TypeEtudeAdminService typeEtudeService ;
        @Autowired
        private EnseignementAdminService enseignementService ;


@Autowired
private EntityManager entityManager;


@Override
public List<TypeEtudeEnseignement> findAll(){
        return typeEtudeEnseignementDao.findAll();
}
        @Override
        public List<TypeEtudeEnseignement> findByEnseignementId(Long id){
        return typeEtudeEnseignementDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return typeEtudeEnseignementDao.deleteByEnseignementId(id);
        }


        @Override
        public List<TypeEtudeEnseignement> findByTypeEtudeCode(String code){
        return typeEtudeEnseignementDao.findByTypeEtudeCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeEtudeCode(String code){
        return typeEtudeEnseignementDao.deleteByTypeEtudeCode(code);
        }

        @Override
        public List<TypeEtudeEnseignement> findByTypeEtudeId(Long id){
        return typeEtudeEnseignementDao.findByTypeEtudeId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeEtudeId(Long id){
        return typeEtudeEnseignementDao.deleteByTypeEtudeId(id);
        }


@Override
public TypeEtudeEnseignement findById(Long id){
if(id==null) return null;
return typeEtudeEnseignementDao.getOne(id);
}

@Override
public TypeEtudeEnseignement findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(typeEtudeEnseignementDao.findById(id).isPresent())  {
typeEtudeEnseignementDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public TypeEtudeEnseignement update(TypeEtudeEnseignement typeEtudeEnseignement){
TypeEtudeEnseignement foundedTypeEtudeEnseignement = findById(typeEtudeEnseignement.getId());
if(foundedTypeEtudeEnseignement==null) return null;
else{
return  typeEtudeEnseignementDao.save(typeEtudeEnseignement);
}
}

@Override
public TypeEtudeEnseignement save (TypeEtudeEnseignement typeEtudeEnseignement){



    findEnseignement(typeEtudeEnseignement);
    findTypeEtude(typeEtudeEnseignement);

return typeEtudeEnseignementDao.save(typeEtudeEnseignement);


}

@Override
public List<TypeEtudeEnseignement> save(List<TypeEtudeEnseignement> typeEtudeEnseignements){
List<TypeEtudeEnseignement> list = new ArrayList<>();
for(TypeEtudeEnseignement typeEtudeEnseignement: typeEtudeEnseignements){
list.add(save(typeEtudeEnseignement));
}
return list;
}



@Override
@Transactional
public int delete(TypeEtudeEnseignement typeEtudeEnseignement){
    if(typeEtudeEnseignement.getId()==null) return -1;
    TypeEtudeEnseignement foundedTypeEtudeEnseignement = findById(typeEtudeEnseignement.getId());
    if(foundedTypeEtudeEnseignement==null) return -1;
typeEtudeEnseignementDao.delete(foundedTypeEtudeEnseignement);
return 1;
}


public List<TypeEtudeEnseignement> findByCriteria(TypeEtudeEnseignementVo typeEtudeEnseignementVo){

String query = "SELECT o FROM TypeEtudeEnseignement o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",typeEtudeEnseignementVo.getId());
    if(typeEtudeEnseignementVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",typeEtudeEnseignementVo.getEnseignementVo().getId());
    }

    if(typeEtudeEnseignementVo.getTypeEtudeVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeEtude.id","=",typeEtudeEnseignementVo.getTypeEtudeVo().getId());
            query += SearchUtil.addConstraint( "o", "typeEtude.code","LIKE",typeEtudeEnseignementVo.getTypeEtudeVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnseignement(TypeEtudeEnseignement typeEtudeEnseignement){
        Enseignement loadedEnseignement = null;
        if(typeEtudeEnseignement.getEnseignement() != null && typeEtudeEnseignement.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(typeEtudeEnseignement.getEnseignement().getId());

    if(loadedEnseignement==null ) {
        return;
    }
    typeEtudeEnseignement.setEnseignement(loadedEnseignement);
    }
    private void findTypeEtude(TypeEtudeEnseignement typeEtudeEnseignement){
        TypeEtude loadedTypeEtude =typeEtudeService.findByIdOrCode(typeEtudeEnseignement.getTypeEtude());

    if(loadedTypeEtude==null ) {
        return;
    }
    typeEtudeEnseignement.setTypeEtude(loadedTypeEtude);
    }

@Override
@Transactional
public void delete(List<TypeEtudeEnseignement> typeEtudeEnseignements){
        if(ListUtil.isNotEmpty(typeEtudeEnseignements)){
        typeEtudeEnseignements.forEach(e->typeEtudeEnseignementDao.delete(e));
        }
}
@Override
public void update(List<TypeEtudeEnseignement> typeEtudeEnseignements){
if(ListUtil.isNotEmpty(typeEtudeEnseignements)){
typeEtudeEnseignements.forEach(e->typeEtudeEnseignementDao.save(e));
}
}



}
