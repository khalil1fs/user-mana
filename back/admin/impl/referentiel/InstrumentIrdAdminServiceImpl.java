package com.ird.faa.service.admin.impl.referentiel;

import java.util.List;
import java.util.ArrayList;

import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.service.core.facade.ArchivableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.bean.referentiel.TypeInstrumentIrd;
import com.ird.faa.dao.referentiel.InstrumentIrdDao;
import com.ird.faa.service.admin.facade.referentiel.InstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeInstrumentIrdAdminService;

import com.ird.faa.ws.rest.provided.vo.referentiel.InstrumentIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class InstrumentIrdAdminServiceImpl extends AbstractServiceImpl<InstrumentIrd> implements InstrumentIrdAdminService {

@Autowired
private InstrumentIrdDao instrumentIrdDao;

        @Autowired
        private TypeInstrumentIrdAdminService typeInstrumentIrdService ;



@Autowired
private EntityManager entityManager;


@Override
public List<InstrumentIrd> findAll(){
return instrumentIrdDao.findAll();
}

        @Override
        public List<InstrumentIrd> findByTypeInstrumentIrdCode(String code){
        return instrumentIrdDao.findByTypeInstrumentIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeInstrumentIrdCode(String code){
        return instrumentIrdDao.deleteByTypeInstrumentIrdCode(code);
        }

        @Override
        public List<InstrumentIrd> findByTypeInstrumentIrdId(Long id){
        return instrumentIrdDao.findByTypeInstrumentIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeInstrumentIrdId(Long id){
        return instrumentIrdDao.deleteByTypeInstrumentIrdId(id);
        }

    @Override
    public InstrumentIrd findByCode(String code){
    if( code==null) return null;
    return instrumentIrdDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return instrumentIrdDao.deleteByCode(code);
    }
    @Override
    public InstrumentIrd findByIdOrCode(InstrumentIrd instrumentIrd){
    InstrumentIrd resultat=null;
    if(instrumentIrd == null || ( instrumentIrd.getCode()==null && instrumentIrd.getId()==null))
    return resultat;
    else{
    if(instrumentIrd.getId() != null){
    resultat= instrumentIrdDao.findById(instrumentIrd.getId()).get();
    }else if(StringUtil.isNotEmpty(instrumentIrd.getCode())) {
    resultat= instrumentIrdDao.findByCode(instrumentIrd.getCode());
    }
    return resultat;
    }
    }

@Override
public InstrumentIrd findById(Long id){
if(id==null) return null;
return instrumentIrdDao.getOne(id);
}

@Override
public InstrumentIrd findByIdWithAssociatedList(Long id){
InstrumentIrd instrumentIrd  = findById(id);
return instrumentIrd;
}


@Transactional
public int deleteById(Long id){
if(instrumentIrdDao.findById(id) == null) return 0;
else{
instrumentIrdDao.deleteById(id);
return 1;
}
}


@Override
public InstrumentIrd update(InstrumentIrd instrumentIrd){
InstrumentIrd foundedInstrumentIrd = findById(instrumentIrd.getId());
if(foundedInstrumentIrd==null) return null;
else{
    prepare(instrumentIrd);

    return  instrumentIrdDao.save(instrumentIrd);
}
}

@Override
public InstrumentIrd save (InstrumentIrd instrumentIrd){
    InstrumentIrd foundedInstrumentIrd = findByCode(instrumentIrd.getCode());
   if(foundedInstrumentIrd!=null) return null;


    findTypeInstrumentIrd(instrumentIrd);
    prepare(instrumentIrd);

InstrumentIrd savedInstrumentIrd = instrumentIrdDao.save(instrumentIrd);
return savedInstrumentIrd;
}

@Override
public List<InstrumentIrd> save(List<InstrumentIrd> instrumentIrds){
List<InstrumentIrd> list = new ArrayList<InstrumentIrd>();
for(InstrumentIrd instrumentIrd: instrumentIrds){
list.add(save(instrumentIrd));
}
return list;
}



@Override
@Transactional
public int delete(InstrumentIrd instrumentIrd){
    if(instrumentIrd.getCode()==null) return -1;

    InstrumentIrd foundedInstrumentIrd = findByCode(instrumentIrd.getCode());
    if(foundedInstrumentIrd==null) return -1;
instrumentIrdDao.delete(foundedInstrumentIrd);
return 1;
}


public List<InstrumentIrd> findByCriteria(InstrumentIrdVo instrumentIrdVo){

String query = "SELECT o FROM InstrumentIrd o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",instrumentIrdVo.getId());
            query += SearchUtil.addConstraint( "o", "code","LIKE",instrumentIrdVo.getCode());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",instrumentIrdVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "archive","=",instrumentIrdVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",instrumentIrdVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",instrumentIrdVo.getDateArchivageMin(),instrumentIrdVo.getDateArchivageMax());
    if(instrumentIrdVo.getTypeInstrumentIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeInstrumentIrd.id","=",instrumentIrdVo.getTypeInstrumentIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "typeInstrumentIrd.code","LIKE",instrumentIrdVo.getTypeInstrumentIrdVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findTypeInstrumentIrd(InstrumentIrd instrumentIrd){
        TypeInstrumentIrd loadedTypeInstrumentIrd =typeInstrumentIrdService.findByIdOrCode(instrumentIrd.getTypeInstrumentIrd());

    if(loadedTypeInstrumentIrd==null ) {
        return;
    }
    instrumentIrd.setTypeInstrumentIrd(loadedTypeInstrumentIrd);
    }

@Override
@Transactional
public void delete(List<InstrumentIrd> instrumentIrds){
        if(ListUtil.isNotEmpty(instrumentIrds)){
        instrumentIrds.forEach(e->instrumentIrdDao.delete(e));
        }
}
@Override
public void update(List<InstrumentIrd> instrumentIrds){
if(ListUtil.isNotEmpty(instrumentIrds)){
instrumentIrds.forEach(e->instrumentIrdDao.save(e));
}
}



@Override
public List<List<InstrumentIrd>>  getToBeSavedAndToBeDeleted(List<InstrumentIrd> oldList,List<InstrumentIrd> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
