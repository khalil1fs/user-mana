package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetailInstrumentIrd;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetail;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.dao.formulaire.VieInstitutionnelleDetailInstrumentIrdDao;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleDetailInstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.VieInstitutionnelleDetailAdminService;
import com.ird.faa.service.admin.facade.referentiel.InstrumentIrdAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleDetailInstrumentIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class VieInstitutionnelleDetailInstrumentIrdAdminServiceImpl extends AbstractServiceImpl<VieInstitutionnelleDetailInstrumentIrd> implements VieInstitutionnelleDetailInstrumentIrdAdminService {

@Autowired
private VieInstitutionnelleDetailInstrumentIrdDao vieInstitutionnelleDetailInstrumentIrdDao;

        @Autowired
        private VieInstitutionnelleDetailAdminService vieInstitutionnelleDetailService ;
        @Autowired
        private InstrumentIrdAdminService instrumentIrdService ;


@Autowired
private EntityManager entityManager;


@Override
public List<VieInstitutionnelleDetailInstrumentIrd> findAll(){
return vieInstitutionnelleDetailInstrumentIrdDao.findAll();
}
        @Override
        public List<VieInstitutionnelleDetailInstrumentIrd> findByVieInstitutionnelleDetailId(Long id){
        return vieInstitutionnelleDetailInstrumentIrdDao.findByVieInstitutionnelleDetailId(id);
        }

        @Override
        @Transactional
        public int deleteByVieInstitutionnelleDetailId(Long id){
        return vieInstitutionnelleDetailInstrumentIrdDao.deleteByVieInstitutionnelleDetailId(id);
        }


        @Override
        public List<VieInstitutionnelleDetailInstrumentIrd> findByInstrumentIrdCode(String code){
        return vieInstitutionnelleDetailInstrumentIrdDao.findByInstrumentIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByInstrumentIrdCode(String code){
        return vieInstitutionnelleDetailInstrumentIrdDao.deleteByInstrumentIrdCode(code);
        }

        @Override
        public List<VieInstitutionnelleDetailInstrumentIrd> findByInstrumentIrdId(Long id){
        return vieInstitutionnelleDetailInstrumentIrdDao.findByInstrumentIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByInstrumentIrdId(Long id){
        return vieInstitutionnelleDetailInstrumentIrdDao.deleteByInstrumentIrdId(id);
        }


@Override
public VieInstitutionnelleDetailInstrumentIrd findById(Long id){
if(id==null) return null;
return vieInstitutionnelleDetailInstrumentIrdDao.getOne(id);
}

@Override
public VieInstitutionnelleDetailInstrumentIrd findByIdWithAssociatedList(Long id){
VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd  = findById(id);
return vieInstitutionnelleDetailInstrumentIrd;
}


@Transactional
public int deleteById(Long id){
if(vieInstitutionnelleDetailInstrumentIrdDao.findById(id) == null) return 0;
else{
vieInstitutionnelleDetailInstrumentIrdDao.deleteById(id);
return 1;
}
}


@Override
public VieInstitutionnelleDetailInstrumentIrd update(VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd){
VieInstitutionnelleDetailInstrumentIrd foundedVieInstitutionnelleDetailInstrumentIrd = findById(vieInstitutionnelleDetailInstrumentIrd.getId());
if(foundedVieInstitutionnelleDetailInstrumentIrd==null) return null;
else{
return  vieInstitutionnelleDetailInstrumentIrdDao.save(vieInstitutionnelleDetailInstrumentIrd);
}
}

@Override
public VieInstitutionnelleDetailInstrumentIrd save (VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd){


    findVieInstitutionnelleDetail(vieInstitutionnelleDetailInstrumentIrd);
    findInstrumentIrd(vieInstitutionnelleDetailInstrumentIrd);

VieInstitutionnelleDetailInstrumentIrd savedVieInstitutionnelleDetailInstrumentIrd = vieInstitutionnelleDetailInstrumentIrdDao.save(vieInstitutionnelleDetailInstrumentIrd);
return savedVieInstitutionnelleDetailInstrumentIrd;
}

@Override
public List<VieInstitutionnelleDetailInstrumentIrd> save(List<VieInstitutionnelleDetailInstrumentIrd> vieInstitutionnelleDetailInstrumentIrds){
List<VieInstitutionnelleDetailInstrumentIrd> list = new ArrayList<VieInstitutionnelleDetailInstrumentIrd>();
for(VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd: vieInstitutionnelleDetailInstrumentIrds){
list.add(save(vieInstitutionnelleDetailInstrumentIrd));
}
return list;
}



@Override
@Transactional
public int delete(VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd){
    if(vieInstitutionnelleDetailInstrumentIrd.getId()==null) return -1;
    VieInstitutionnelleDetailInstrumentIrd foundedVieInstitutionnelleDetailInstrumentIrd = findById(vieInstitutionnelleDetailInstrumentIrd.getId());
    if(foundedVieInstitutionnelleDetailInstrumentIrd==null) return -1;
vieInstitutionnelleDetailInstrumentIrdDao.delete(foundedVieInstitutionnelleDetailInstrumentIrd);
return 1;
}


public List<VieInstitutionnelleDetailInstrumentIrd> findByCriteria(VieInstitutionnelleDetailInstrumentIrdVo vieInstitutionnelleDetailInstrumentIrdVo){

String query = "SELECT o FROM VieInstitutionnelleDetailInstrumentIrd o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",vieInstitutionnelleDetailInstrumentIrdVo.getId());
    if(vieInstitutionnelleDetailInstrumentIrdVo.getVieInstitutionnelleDetailVo()!=null){
        query += SearchUtil.addConstraint( "o", "vieInstitutionnelleDetail.id","=",vieInstitutionnelleDetailInstrumentIrdVo.getVieInstitutionnelleDetailVo().getId());
    }

    if(vieInstitutionnelleDetailInstrumentIrdVo.getInstrumentIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "instrumentIrd.id","=",vieInstitutionnelleDetailInstrumentIrdVo.getInstrumentIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "instrumentIrd.code","LIKE",vieInstitutionnelleDetailInstrumentIrdVo.getInstrumentIrdVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findVieInstitutionnelleDetail(VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd){
        VieInstitutionnelleDetail loadedVieInstitutionnelleDetail = null;
        if(vieInstitutionnelleDetailInstrumentIrd.getVieInstitutionnelleDetail() != null && vieInstitutionnelleDetailInstrumentIrd.getVieInstitutionnelleDetail().getId() !=null)
        loadedVieInstitutionnelleDetail =vieInstitutionnelleDetailService.findById(vieInstitutionnelleDetailInstrumentIrd.getVieInstitutionnelleDetail().getId());

    if(loadedVieInstitutionnelleDetail==null ) {
        return;
    }
    vieInstitutionnelleDetailInstrumentIrd.setVieInstitutionnelleDetail(loadedVieInstitutionnelleDetail);
    }
    private void findInstrumentIrd(VieInstitutionnelleDetailInstrumentIrd vieInstitutionnelleDetailInstrumentIrd){
        InstrumentIrd loadedInstrumentIrd =instrumentIrdService.findByIdOrCode(vieInstitutionnelleDetailInstrumentIrd.getInstrumentIrd());

    if(loadedInstrumentIrd==null ) {
        return;
    }
    vieInstitutionnelleDetailInstrumentIrd.setInstrumentIrd(loadedInstrumentIrd);
    }

@Override
@Transactional
public void delete(List<VieInstitutionnelleDetailInstrumentIrd> vieInstitutionnelleDetailInstrumentIrds){
        if(ListUtil.isNotEmpty(vieInstitutionnelleDetailInstrumentIrds)){
        vieInstitutionnelleDetailInstrumentIrds.forEach(e->vieInstitutionnelleDetailInstrumentIrdDao.delete(e));
        }
}
@Override
public void update(List<VieInstitutionnelleDetailInstrumentIrd> vieInstitutionnelleDetailInstrumentIrds){
if(ListUtil.isNotEmpty(vieInstitutionnelleDetailInstrumentIrds)){
vieInstitutionnelleDetailInstrumentIrds.forEach(e->vieInstitutionnelleDetailInstrumentIrdDao.save(e));
}
}



@Override
public List<List<VieInstitutionnelleDetailInstrumentIrd>>  getToBeSavedAndToBeDeleted(List<VieInstitutionnelleDetailInstrumentIrd> oldList,List<VieInstitutionnelleDetailInstrumentIrd> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
