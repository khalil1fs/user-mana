package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
        import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
        import com.ird.faa.bean.referentiel.TypeSavoir;
import com.ird.faa.dao.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TypeSavoirAdminService;
        import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminServiceImpl extends AbstractServiceImpl<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> implements TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminService {

@Autowired
private TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao;

        @Autowired
        private TypeSavoirAdminService typeSavoirService ;
        @Autowired
        private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> findAll(){
return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.findAll();
}
        @Override
        public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> findByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
        }


        @Override
        public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> findByTypeSavoirCode(String code){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.findByTypeSavoirCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeSavoirCode(String code){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByTypeSavoirCode(code);
        }

        @Override
        public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> findByTypeSavoirId(Long id){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.findByTypeSavoirId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeSavoirId(Long id){
        return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByTypeSavoirId(id);
        }


@Override
public TypeSavoirDeveloppementDeSavoirEtInnovationScientifique findById(Long id){
if(id==null) return null;
return typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.getOne(id);
}

@Override
public TypeSavoirDeveloppementDeSavoirEtInnovationScientifique findByIdWithAssociatedList(Long id){
TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique  = findById(id);
return typeSavoirDeveloppementDeSavoirEtInnovationScientifique;
}


@Transactional
public int deleteById(Long id){
if(typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.findById(id) == null) return 0;
else{
typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public TypeSavoirDeveloppementDeSavoirEtInnovationScientifique update(TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique){
TypeSavoirDeveloppementDeSavoirEtInnovationScientifique foundedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = findById(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getId());
if(foundedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique==null) return null;
else{
return  typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.save(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
}
}

@Override
public TypeSavoirDeveloppementDeSavoirEtInnovationScientifique save (TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique){


    findDeveloppementDeSavoirEtInnovationScientifique(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
    findTypeSavoir(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);

TypeSavoirDeveloppementDeSavoirEtInnovationScientifique savedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.save(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
return savedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
}

@Override
public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> save(List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifiques){
List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> list = new ArrayList<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique>();
for(TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique: typeSavoirDeveloppementDeSavoirEtInnovationScientifiques){
list.add(save(typeSavoirDeveloppementDeSavoirEtInnovationScientifique));
}
return list;
}



@Override
@Transactional
public int delete(TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique){
    if(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getId()==null) return -1;
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifique foundedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = findById(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getId());
    if(foundedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique==null) return -1;
typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.delete(foundedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique);
return 1;
}


public List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> findByCriteria(TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo){

String query = "SELECT o FROM TypeSavoirDeveloppementDeSavoirEtInnovationScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getId());
    if(typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getDeveloppementDeSavoirEtInnovationScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "developpementDeSavoirEtInnovationScientifique.id","=",typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
    }

    if(typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getTypeSavoirVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeSavoir.id","=",typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getTypeSavoirVo().getId());
            query += SearchUtil.addConstraint( "o", "typeSavoir.code","LIKE",typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo.getTypeSavoirVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDeveloppementDeSavoirEtInnovationScientifique(TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique){
        DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
        if(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique() != null && typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique().getId() !=null)
        loadedDeveloppementDeSavoirEtInnovationScientifique =developpementDeSavoirEtInnovationScientifiqueService.findById(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique().getId());

    if(loadedDeveloppementDeSavoirEtInnovationScientifique==null ) {
        return;
    }
    typeSavoirDeveloppementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
    }
    private void findTypeSavoir(TypeSavoirDeveloppementDeSavoirEtInnovationScientifique typeSavoirDeveloppementDeSavoirEtInnovationScientifique){
        TypeSavoir loadedTypeSavoir =typeSavoirService.findByIdOrCode(typeSavoirDeveloppementDeSavoirEtInnovationScientifique.getTypeSavoir());

    if(loadedTypeSavoir==null ) {
        return;
    }
    typeSavoirDeveloppementDeSavoirEtInnovationScientifique.setTypeSavoir(loadedTypeSavoir);
    }

@Override
@Transactional
public void delete(List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifiques){
        if(ListUtil.isNotEmpty(typeSavoirDeveloppementDeSavoirEtInnovationScientifiques)){
        typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.forEach(e->typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifiques){
if(ListUtil.isNotEmpty(typeSavoirDeveloppementDeSavoirEtInnovationScientifiques)){
typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.forEach(e->typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDao.save(e));
}
}



@Override
public List<List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique>>  getToBeSavedAndToBeDeleted(List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> oldList,List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
