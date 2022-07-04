package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EcoleDoctorale;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.EcoleDoctoraleDao;
import com.ird.faa.service.admin.facade.formulaire.EcoleDoctoraleAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EcoleDoctoraleVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EcoleDoctoraleAdminServiceImpl extends AbstractServiceImpl<EcoleDoctorale> implements EcoleDoctoraleAdminService {

@Autowired
private EcoleDoctoraleDao ecoleDoctoraleDao;

        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EcoleDoctorale> findAll(){
return ecoleDoctoraleDao.findAll();
}

        @Override
        public List<EcoleDoctorale> findByPaysCode(String code){
        return ecoleDoctoraleDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return ecoleDoctoraleDao.deleteByPaysCode(code);
        }

        @Override
        public List<EcoleDoctorale> findByPaysId(Long id){
        return ecoleDoctoraleDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return ecoleDoctoraleDao.deleteByPaysId(id);
        }

    @Override
    public EcoleDoctorale findByIntitule(String intitule){
    if( intitule==null) return null;
    return ecoleDoctoraleDao.findByIntitule(intitule);
    }

    @Override
    @Transactional
    public int deleteByIntitule(String  intitule) {
    return ecoleDoctoraleDao.deleteByIntitule(intitule);
    }
    @Override
    public EcoleDoctorale findByIdOrIntitule(EcoleDoctorale ecoleDoctorale){
    EcoleDoctorale resultat=null;
    if(ecoleDoctorale == null || ( ecoleDoctorale.getIntitule()==null && ecoleDoctorale.getId()==null))
    return resultat;
    else{
    if(ecoleDoctorale.getId() != null){
    resultat= ecoleDoctoraleDao.findById(ecoleDoctorale.getId()).get();
    }else if(StringUtil.isNotEmpty(ecoleDoctorale.getIntitule())) {
    resultat= ecoleDoctoraleDao.findByIntitule(ecoleDoctorale.getIntitule());
    }
    return resultat;
    }
    }

@Override
public EcoleDoctorale findById(Long id){
if(id==null) return null;
return ecoleDoctoraleDao.getOne(id);
}

@Override
public EcoleDoctorale findByIdWithAssociatedList(Long id){
EcoleDoctorale ecoleDoctorale  = findById(id);
return ecoleDoctorale;
}


@Transactional
public int deleteById(Long id){
if(ecoleDoctoraleDao.findById(id) == null) return 0;
else{
ecoleDoctoraleDao.deleteById(id);
return 1;
}
}


@Override
public EcoleDoctorale update(EcoleDoctorale ecoleDoctorale){
EcoleDoctorale foundedEcoleDoctorale = findById(ecoleDoctorale.getId());
if(foundedEcoleDoctorale==null) return null;
else{
return  ecoleDoctoraleDao.save(ecoleDoctorale);
}
}

@Override
public EcoleDoctorale save (EcoleDoctorale ecoleDoctorale){
    EcoleDoctorale foundedEcoleDoctorale = findByIntitule(ecoleDoctorale.getIntitule());
   if(foundedEcoleDoctorale!=null) return null;


    findPays(ecoleDoctorale);

EcoleDoctorale savedEcoleDoctorale = ecoleDoctoraleDao.save(ecoleDoctorale);
return savedEcoleDoctorale;
}

@Override
public List<EcoleDoctorale> save(List<EcoleDoctorale> ecoleDoctorales){
List<EcoleDoctorale> list = new ArrayList<EcoleDoctorale>();
for(EcoleDoctorale ecoleDoctorale: ecoleDoctorales){
list.add(save(ecoleDoctorale));
}
return list;
}



@Override
@Transactional
public int delete(EcoleDoctorale ecoleDoctorale){
    if(ecoleDoctorale.getIntitule()==null) return -1;

    EcoleDoctorale foundedEcoleDoctorale = findByIntitule(ecoleDoctorale.getIntitule());
    if(foundedEcoleDoctorale==null) return -1;
ecoleDoctoraleDao.delete(foundedEcoleDoctorale);
return 1;
}


public List<EcoleDoctorale> findByCriteria(EcoleDoctoraleVo ecoleDoctoraleVo){

String query = "SELECT o FROM EcoleDoctorale o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",ecoleDoctoraleVo.getId());
            query += SearchUtil.addConstraint( "o", "intitule","LIKE",ecoleDoctoraleVo.getIntitule());
            query += SearchUtil.addConstraint( "o", "international","=",ecoleDoctoraleVo.getInternational());
    if(ecoleDoctoraleVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",ecoleDoctoraleVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",ecoleDoctoraleVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPays(EcoleDoctorale ecoleDoctorale){
        Pays loadedPays =paysService.findByIdOrCode(ecoleDoctorale.getPays());

    if(loadedPays==null ) {
        return;
    }
    ecoleDoctorale.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<EcoleDoctorale> ecoleDoctorales){
        if(ListUtil.isNotEmpty(ecoleDoctorales)){
        ecoleDoctorales.forEach(e->ecoleDoctoraleDao.delete(e));
        }
}
@Override
public void update(List<EcoleDoctorale> ecoleDoctorales){
if(ListUtil.isNotEmpty(ecoleDoctorales)){
ecoleDoctorales.forEach(e->ecoleDoctoraleDao.save(e));
}
}



@Override
public List<List<EcoleDoctorale>>  getToBeSavedAndToBeDeleted(List<EcoleDoctorale> oldList,List<EcoleDoctorale> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
