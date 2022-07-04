package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.referentiel.Pays;
        import com.ird.faa.bean.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.dao.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublicDao;
import com.ird.faa.service.admin.facade.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminServiceImpl extends AbstractServiceImpl<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> implements PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminService {

@Autowired
private PaysCultureScientifiqueRecontreGrandPublicJeunePublicDao paysCultureScientifiqueRecontreGrandPublicJeunePublicDao;

        @Autowired
        private CultureScientifiqueRecontreGrandPublicJeunePublicAdminService cultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findAll(){
return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.findAll();
}

        @Override
        public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByPaysCode(String code){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByPaysCode(code);
        }

        @Override
        public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByPaysId(Long id){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByPaysId(id);
        }

        @Override
        public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }


@Override
public PaysCultureScientifiqueRecontreGrandPublicJeunePublic findById(Long id){
if(id==null) return null;
return paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.getOne(id);
}

@Override
public PaysCultureScientifiqueRecontreGrandPublicJeunePublic findByIdWithAssociatedList(Long id){
PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic  = findById(id);
return paysCultureScientifiqueRecontreGrandPublicJeunePublic;
}


@Transactional
public int deleteById(Long id){
if(paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.findById(id) == null) return 0;
else{
paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteById(id);
return 1;
}
}


@Override
public PaysCultureScientifiqueRecontreGrandPublicJeunePublic update(PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic){
PaysCultureScientifiqueRecontreGrandPublicJeunePublic foundedPaysCultureScientifiqueRecontreGrandPublicJeunePublic = findById(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
if(foundedPaysCultureScientifiqueRecontreGrandPublicJeunePublic==null) return null;
else{
return  paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(paysCultureScientifiqueRecontreGrandPublicJeunePublic);
}
}

@Override
public PaysCultureScientifiqueRecontreGrandPublicJeunePublic save (PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic){


    findPays(paysCultureScientifiqueRecontreGrandPublicJeunePublic);
    findCultureScientifiqueRecontreGrandPublicJeunePublic(paysCultureScientifiqueRecontreGrandPublicJeunePublic);

PaysCultureScientifiqueRecontreGrandPublicJeunePublic savedPaysCultureScientifiqueRecontreGrandPublicJeunePublic = paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(paysCultureScientifiqueRecontreGrandPublicJeunePublic);
return savedPaysCultureScientifiqueRecontreGrandPublicJeunePublic;
}

@Override
public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> save(List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublics){
List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> list = new ArrayList<PaysCultureScientifiqueRecontreGrandPublicJeunePublic>();
for(PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic: paysCultureScientifiqueRecontreGrandPublicJeunePublics){
list.add(save(paysCultureScientifiqueRecontreGrandPublicJeunePublic));
}
return list;
}



@Override
@Transactional
public int delete(PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic){
    if(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return -1;
    PaysCultureScientifiqueRecontreGrandPublicJeunePublic foundedPaysCultureScientifiqueRecontreGrandPublicJeunePublic = findById(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
    if(foundedPaysCultureScientifiqueRecontreGrandPublicJeunePublic==null) return -1;
paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(foundedPaysCultureScientifiqueRecontreGrandPublicJeunePublic);
return 1;
}


public List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByCriteria(PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo paysCultureScientifiqueRecontreGrandPublicJeunePublicVo){

String query = "SELECT o FROM PaysCultureScientifiqueRecontreGrandPublicJeunePublic o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getId());
    if(paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getPaysVo().getCode());
    }

    if(paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueRecontreGrandPublicJeunePublic.id","=",paysCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPays(PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic){
        Pays loadedPays =paysService.findByIdOrCode(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getPays());

    if(loadedPays==null ) {
        return;
    }
    paysCultureScientifiqueRecontreGrandPublicJeunePublic.setPays(loadedPays);
    }
    private void findCultureScientifiqueRecontreGrandPublicJeunePublic(PaysCultureScientifiqueRecontreGrandPublicJeunePublic paysCultureScientifiqueRecontreGrandPublicJeunePublic){
        CultureScientifiqueRecontreGrandPublicJeunePublic loadedCultureScientifiqueRecontreGrandPublicJeunePublic = null;
        if(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic() != null && paysCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId() !=null)
        loadedCultureScientifiqueRecontreGrandPublicJeunePublic =cultureScientifiqueRecontreGrandPublicJeunePublicService.findById(paysCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId());

    if(loadedCultureScientifiqueRecontreGrandPublicJeunePublic==null ) {
        return;
    }
    paysCultureScientifiqueRecontreGrandPublicJeunePublic.setCultureScientifiqueRecontreGrandPublicJeunePublic(loadedCultureScientifiqueRecontreGrandPublicJeunePublic);
    }

@Override
@Transactional
public void delete(List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublics){
        if(ListUtil.isNotEmpty(paysCultureScientifiqueRecontreGrandPublicJeunePublics)){
        paysCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(e));
        }
}
@Override
public void update(List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublics){
if(ListUtil.isNotEmpty(paysCultureScientifiqueRecontreGrandPublicJeunePublics)){
paysCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->paysCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(e));
}
}



@Override
public List<List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic>>  getToBeSavedAndToBeDeleted(List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> oldList,List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
