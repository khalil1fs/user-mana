package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.ird.faa.bean.formulaire.InstrumentIrdChercheur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.dao.formulaire.InstrumentIrdChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.InstrumentIrdChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.referentiel.InstrumentIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstrumentIrdChercheurVo;

@Service
public class InstrumentIrdChercheurAdminServiceImpl extends AbstractServiceImpl<InstrumentIrdChercheur> implements InstrumentIrdChercheurAdminService {

@Autowired
private InstrumentIrdChercheurDao instrumentIrdChercheurDao;

        @Autowired
        private InstrumentIrdAdminService instrumentIrdService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<InstrumentIrdChercheur> findAll(){
        return instrumentIrdChercheurDao.findAll();
}

        @Override
        public List<InstrumentIrdChercheur> findByInstrumentIrdCode(String code){
        return instrumentIrdChercheurDao.findByInstrumentIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByInstrumentIrdCode(String code){
        return instrumentIrdChercheurDao.deleteByInstrumentIrdCode(code);
        }

        @Override
        public List<InstrumentIrdChercheur> findByInstrumentIrdId(Long id){
        return instrumentIrdChercheurDao.findByInstrumentIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByInstrumentIrdId(Long id){
        return instrumentIrdChercheurDao.deleteByInstrumentIrdId(id);
        }


        @Override
        public List<InstrumentIrdChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return instrumentIrdChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return instrumentIrdChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<InstrumentIrdChercheur> findByChercheurId(Long id){
        return instrumentIrdChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return instrumentIrdChercheurDao.deleteByChercheurId(id);
        }


@Override
public InstrumentIrdChercheur findById(Long id){
if(id==null) return null;
return instrumentIrdChercheurDao.getOne(id);
}

@Override
public InstrumentIrdChercheur findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(instrumentIrdChercheurDao.findById(id).isPresent())  {
instrumentIrdChercheurDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public InstrumentIrdChercheur update(InstrumentIrdChercheur instrumentIrdChercheur){
InstrumentIrdChercheur foundedInstrumentIrdChercheur = findById(instrumentIrdChercheur.getId());
if(foundedInstrumentIrdChercheur==null) return null;
else{
return  instrumentIrdChercheurDao.save(instrumentIrdChercheur);
}
}

@Override
public InstrumentIrdChercheur save (InstrumentIrdChercheur instrumentIrdChercheur){



    findInstrumentIrd(instrumentIrdChercheur);
    findChercheur(instrumentIrdChercheur);

return instrumentIrdChercheurDao.save(instrumentIrdChercheur);


}

@Override
public List<InstrumentIrdChercheur> save(List<InstrumentIrdChercheur> instrumentIrdChercheurs){
List<InstrumentIrdChercheur> list = new ArrayList<>();
for(InstrumentIrdChercheur instrumentIrdChercheur: instrumentIrdChercheurs){
list.add(save(instrumentIrdChercheur));
}
return list;
}



@Override
@Transactional
public int delete(InstrumentIrdChercheur instrumentIrdChercheur){
    if(instrumentIrdChercheur.getId()==null) return -1;
    InstrumentIrdChercheur foundedInstrumentIrdChercheur = findById(instrumentIrdChercheur.getId());
    if(foundedInstrumentIrdChercheur==null) return -1;
instrumentIrdChercheurDao.delete(foundedInstrumentIrdChercheur);
return 1;
}


public List<InstrumentIrdChercheur> findByCriteria(InstrumentIrdChercheurVo instrumentIrdChercheurVo){

String query = "SELECT o FROM InstrumentIrdChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",instrumentIrdChercheurVo.getId());
            query += SearchUtil.addConstraint( "o", "natureImplication","LIKE",instrumentIrdChercheurVo.getNatureImplication());
    if(instrumentIrdChercheurVo.getInstrumentIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "instrumentIrd.id","=",instrumentIrdChercheurVo.getInstrumentIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "instrumentIrd.code","LIKE",instrumentIrdChercheurVo.getInstrumentIrdVo().getCode());
    }

    if(instrumentIrdChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",instrumentIrdChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",instrumentIrdChercheurVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findInstrumentIrd(InstrumentIrdChercheur instrumentIrdChercheur){
        InstrumentIrd loadedInstrumentIrd =instrumentIrdService.findByIdOrCode(instrumentIrdChercheur.getInstrumentIrd());

    if(loadedInstrumentIrd==null ) {
        return;
    }
    instrumentIrdChercheur.setInstrumentIrd(loadedInstrumentIrd);
    }
    private void findChercheur(InstrumentIrdChercheur instrumentIrdChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(instrumentIrdChercheur.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    instrumentIrdChercheur.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<InstrumentIrdChercheur> instrumentIrdChercheurs){
        if(ListUtil.isNotEmpty(instrumentIrdChercheurs)){
        instrumentIrdChercheurs.forEach(e->instrumentIrdChercheurDao.delete(e));
        }
}
@Override
public void update(List<InstrumentIrdChercheur> instrumentIrdChercheurs){
if(ListUtil.isNotEmpty(instrumentIrdChercheurs)){
instrumentIrdChercheurs.forEach(e->instrumentIrdChercheurDao.save(e));
}
}



}
