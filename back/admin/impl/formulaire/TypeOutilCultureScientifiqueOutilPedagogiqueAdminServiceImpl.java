package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.TypeOutilCultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.formulaire.CultureScientifiqueOutilPedagogique;
        import com.ird.faa.bean.referentiel.TypeOutil;
import com.ird.faa.dao.formulaire.TypeOutilCultureScientifiqueOutilPedagogiqueDao;
import com.ird.faa.service.admin.facade.formulaire.TypeOutilCultureScientifiqueOutilPedagogiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TypeOutilAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueOutilPedagogiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.TypeOutilCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class TypeOutilCultureScientifiqueOutilPedagogiqueAdminServiceImpl extends AbstractServiceImpl<TypeOutilCultureScientifiqueOutilPedagogique> implements TypeOutilCultureScientifiqueOutilPedagogiqueAdminService {

@Autowired
private TypeOutilCultureScientifiqueOutilPedagogiqueDao typeOutilCultureScientifiqueOutilPedagogiqueDao;

        @Autowired
        private TypeOutilAdminService typeOutilService ;
        @Autowired
        private CultureScientifiqueOutilPedagogiqueAdminService cultureScientifiqueOutilPedagogiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<TypeOutilCultureScientifiqueOutilPedagogique> findAll(){
return typeOutilCultureScientifiqueOutilPedagogiqueDao.findAll();
}
        @Override
        public List<TypeOutilCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.findByCultureScientifiqueOutilPedagogiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueOutilPedagogiqueId(Long id){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByCultureScientifiqueOutilPedagogiqueId(id);
        }


        @Override
        public List<TypeOutilCultureScientifiqueOutilPedagogique> findByTypeOutilCode(String code){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.findByTypeOutilCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeOutilCode(String code){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByTypeOutilCode(code);
        }

        @Override
        public List<TypeOutilCultureScientifiqueOutilPedagogique> findByTypeOutilId(Long id){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.findByTypeOutilId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeOutilId(Long id){
        return typeOutilCultureScientifiqueOutilPedagogiqueDao.deleteByTypeOutilId(id);
        }


@Override
public TypeOutilCultureScientifiqueOutilPedagogique findById(Long id){
if(id==null) return null;
return typeOutilCultureScientifiqueOutilPedagogiqueDao.getOne(id);
}

@Override
public TypeOutilCultureScientifiqueOutilPedagogique findByIdWithAssociatedList(Long id){
TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique  = findById(id);
return typeOutilCultureScientifiqueOutilPedagogique;
}


@Transactional
public int deleteById(Long id){
if(typeOutilCultureScientifiqueOutilPedagogiqueDao.findById(id) == null) return 0;
else{
typeOutilCultureScientifiqueOutilPedagogiqueDao.deleteById(id);
return 1;
}
}


@Override
public TypeOutilCultureScientifiqueOutilPedagogique update(TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique){
TypeOutilCultureScientifiqueOutilPedagogique foundedTypeOutilCultureScientifiqueOutilPedagogique = findById(typeOutilCultureScientifiqueOutilPedagogique.getId());
if(foundedTypeOutilCultureScientifiqueOutilPedagogique==null) return null;
else{
return  typeOutilCultureScientifiqueOutilPedagogiqueDao.save(typeOutilCultureScientifiqueOutilPedagogique);
}
}

@Override
public TypeOutilCultureScientifiqueOutilPedagogique save (TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique){


    findCultureScientifiqueOutilPedagogique(typeOutilCultureScientifiqueOutilPedagogique);
    findTypeOutil(typeOutilCultureScientifiqueOutilPedagogique);

TypeOutilCultureScientifiqueOutilPedagogique savedTypeOutilCultureScientifiqueOutilPedagogique = typeOutilCultureScientifiqueOutilPedagogiqueDao.save(typeOutilCultureScientifiqueOutilPedagogique);
return savedTypeOutilCultureScientifiqueOutilPedagogique;
}

@Override
public List<TypeOutilCultureScientifiqueOutilPedagogique> save(List<TypeOutilCultureScientifiqueOutilPedagogique> typeOutilCultureScientifiqueOutilPedagogiques){
List<TypeOutilCultureScientifiqueOutilPedagogique> list = new ArrayList<TypeOutilCultureScientifiqueOutilPedagogique>();
for(TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique: typeOutilCultureScientifiqueOutilPedagogiques){
list.add(save(typeOutilCultureScientifiqueOutilPedagogique));
}
return list;
}



@Override
@Transactional
public int delete(TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique){
    if(typeOutilCultureScientifiqueOutilPedagogique.getId()==null) return -1;
    TypeOutilCultureScientifiqueOutilPedagogique foundedTypeOutilCultureScientifiqueOutilPedagogique = findById(typeOutilCultureScientifiqueOutilPedagogique.getId());
    if(foundedTypeOutilCultureScientifiqueOutilPedagogique==null) return -1;
typeOutilCultureScientifiqueOutilPedagogiqueDao.delete(foundedTypeOutilCultureScientifiqueOutilPedagogique);
return 1;
}


public List<TypeOutilCultureScientifiqueOutilPedagogique> findByCriteria(TypeOutilCultureScientifiqueOutilPedagogiqueVo typeOutilCultureScientifiqueOutilPedagogiqueVo){

String query = "SELECT o FROM TypeOutilCultureScientifiqueOutilPedagogique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",typeOutilCultureScientifiqueOutilPedagogiqueVo.getId());
    if(typeOutilCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueOutilPedagogique.id","=",typeOutilCultureScientifiqueOutilPedagogiqueVo.getCultureScientifiqueOutilPedagogiqueVo().getId());
    }

    if(typeOutilCultureScientifiqueOutilPedagogiqueVo.getTypeOutilVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeOutil.id","=",typeOutilCultureScientifiqueOutilPedagogiqueVo.getTypeOutilVo().getId());
            query += SearchUtil.addConstraint( "o", "typeOutil.code","LIKE",typeOutilCultureScientifiqueOutilPedagogiqueVo.getTypeOutilVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCultureScientifiqueOutilPedagogique(TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique){
        CultureScientifiqueOutilPedagogique loadedCultureScientifiqueOutilPedagogique = null;
        if(typeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique() != null && typeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId() !=null)
        loadedCultureScientifiqueOutilPedagogique =cultureScientifiqueOutilPedagogiqueService.findById(typeOutilCultureScientifiqueOutilPedagogique.getCultureScientifiqueOutilPedagogique().getId());

    if(loadedCultureScientifiqueOutilPedagogique==null ) {
        return;
    }
    typeOutilCultureScientifiqueOutilPedagogique.setCultureScientifiqueOutilPedagogique(loadedCultureScientifiqueOutilPedagogique);
    }
    private void findTypeOutil(TypeOutilCultureScientifiqueOutilPedagogique typeOutilCultureScientifiqueOutilPedagogique){
        TypeOutil loadedTypeOutil =typeOutilService.findByIdOrCode(typeOutilCultureScientifiqueOutilPedagogique.getTypeOutil());

    if(loadedTypeOutil==null ) {
        return;
    }
    typeOutilCultureScientifiqueOutilPedagogique.setTypeOutil(loadedTypeOutil);
    }

@Override
@Transactional
public void delete(List<TypeOutilCultureScientifiqueOutilPedagogique> typeOutilCultureScientifiqueOutilPedagogiques){
        if(ListUtil.isNotEmpty(typeOutilCultureScientifiqueOutilPedagogiques)){
        typeOutilCultureScientifiqueOutilPedagogiques.forEach(e->typeOutilCultureScientifiqueOutilPedagogiqueDao.delete(e));
        }
}
@Override
public void update(List<TypeOutilCultureScientifiqueOutilPedagogique> typeOutilCultureScientifiqueOutilPedagogiques){
if(ListUtil.isNotEmpty(typeOutilCultureScientifiqueOutilPedagogiques)){
typeOutilCultureScientifiqueOutilPedagogiques.forEach(e->typeOutilCultureScientifiqueOutilPedagogiqueDao.save(e));
}
}



@Override
public List<List<TypeOutilCultureScientifiqueOutilPedagogique>>  getToBeSavedAndToBeDeleted(List<TypeOutilCultureScientifiqueOutilPedagogique> oldList,List<TypeOutilCultureScientifiqueOutilPedagogique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
