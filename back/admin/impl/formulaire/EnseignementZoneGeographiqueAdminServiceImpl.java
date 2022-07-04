package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementZoneGeographique;
        import com.ird.faa.bean.formulaire.Enseignement;
        import com.ird.faa.bean.referentiel.ZoneGeographique;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.EnseignementZoneGeographiqueDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementZoneGeographiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
        import com.ird.faa.service.admin.facade.referentiel.ZoneGeographiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementZoneGeographiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementZoneGeographiqueAdminServiceImpl extends AbstractServiceImpl<EnseignementZoneGeographique> implements EnseignementZoneGeographiqueAdminService {

@Autowired
private EnseignementZoneGeographiqueDao enseignementZoneGeographiqueDao;

        @Autowired
        private EnseignementAdminService enseignementService ;
        @Autowired
        private ZoneGeographiqueAdminService zoneGeographiqueService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnseignementZoneGeographique> findAll(){
        return enseignementZoneGeographiqueDao.findAll();
}
        @Override
        public List<EnseignementZoneGeographique> findByEnseignementId(Long id){
        return enseignementZoneGeographiqueDao.findByEnseignementId(id);
        }

        @Override
        @Transactional
        public int deleteByEnseignementId(Long id){
        return enseignementZoneGeographiqueDao.deleteByEnseignementId(id);
        }


        @Override
        public List<EnseignementZoneGeographique> findByZoneGeographiqueCode(String code){
        return enseignementZoneGeographiqueDao.findByZoneGeographiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByZoneGeographiqueCode(String code){
        return enseignementZoneGeographiqueDao.deleteByZoneGeographiqueCode(code);
        }

        @Override
        public List<EnseignementZoneGeographique> findByZoneGeographiqueId(Long id){
        return enseignementZoneGeographiqueDao.findByZoneGeographiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByZoneGeographiqueId(Long id){
        return enseignementZoneGeographiqueDao.deleteByZoneGeographiqueId(id);
        }


        @Override
        public List<EnseignementZoneGeographique> findByPaysCode(String code){
        return enseignementZoneGeographiqueDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return enseignementZoneGeographiqueDao.deleteByPaysCode(code);
        }

        @Override
        public List<EnseignementZoneGeographique> findByPaysId(Long id){
        return enseignementZoneGeographiqueDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return enseignementZoneGeographiqueDao.deleteByPaysId(id);
        }


@Override
public EnseignementZoneGeographique findById(Long id){
if(id==null) return null;
return enseignementZoneGeographiqueDao.getOne(id);
}

@Override
public EnseignementZoneGeographique findByIdWithAssociatedList(Long id){
    return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(enseignementZoneGeographiqueDao.findById(id).isPresent())  {
enseignementZoneGeographiqueDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public EnseignementZoneGeographique update(EnseignementZoneGeographique enseignementZoneGeographique){
EnseignementZoneGeographique foundedEnseignementZoneGeographique = findById(enseignementZoneGeographique.getId());
if(foundedEnseignementZoneGeographique==null) return null;
else{
return  enseignementZoneGeographiqueDao.save(enseignementZoneGeographique);
}
}

@Override
public EnseignementZoneGeographique save (EnseignementZoneGeographique enseignementZoneGeographique){



    findEnseignement(enseignementZoneGeographique);
    findZoneGeographique(enseignementZoneGeographique);
    findPays(enseignementZoneGeographique);

    return enseignementZoneGeographiqueDao.save(enseignementZoneGeographique);


}

@Override
public List<EnseignementZoneGeographique> save(List<EnseignementZoneGeographique> enseignementZoneGeographiques){
List<EnseignementZoneGeographique> list = new ArrayList<>();
for(EnseignementZoneGeographique enseignementZoneGeographique: enseignementZoneGeographiques){
list.add(save(enseignementZoneGeographique));
}
return list;
}



@Override
@Transactional
public int delete(EnseignementZoneGeographique enseignementZoneGeographique){
    if(enseignementZoneGeographique.getId()==null) return -1;
    EnseignementZoneGeographique foundedEnseignementZoneGeographique = findById(enseignementZoneGeographique.getId());
    if(foundedEnseignementZoneGeographique==null) return -1;
enseignementZoneGeographiqueDao.delete(foundedEnseignementZoneGeographique);
return 1;
}


public List<EnseignementZoneGeographique> findByCriteria(EnseignementZoneGeographiqueVo enseignementZoneGeographiqueVo){

String query = "SELECT o FROM EnseignementZoneGeographique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enseignementZoneGeographiqueVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",enseignementZoneGeographiqueVo.getLibelle());
    if(enseignementZoneGeographiqueVo.getEnseignementVo()!=null){
        query += SearchUtil.addConstraint( "o", "enseignement.id","=",enseignementZoneGeographiqueVo.getEnseignementVo().getId());
    }

    if(enseignementZoneGeographiqueVo.getZoneGeographiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "zoneGeographique.id","=",enseignementZoneGeographiqueVo.getZoneGeographiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "zoneGeographique.code","LIKE",enseignementZoneGeographiqueVo.getZoneGeographiqueVo().getCode());
    }

    if(enseignementZoneGeographiqueVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",enseignementZoneGeographiqueVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",enseignementZoneGeographiqueVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnseignement(EnseignementZoneGeographique enseignementZoneGeographique){
        Enseignement loadedEnseignement = null;
        if(enseignementZoneGeographique.getEnseignement() != null && enseignementZoneGeographique.getEnseignement().getId() !=null)
        loadedEnseignement =enseignementService.findById(enseignementZoneGeographique.getEnseignement().getId());

    if(loadedEnseignement==null ) {
    return;
    }
    enseignementZoneGeographique.setEnseignement(loadedEnseignement);
    }
    private void findZoneGeographique(EnseignementZoneGeographique enseignementZoneGeographique){
        ZoneGeographique loadedZoneGeographique =zoneGeographiqueService.findByIdOrCode(enseignementZoneGeographique.getZoneGeographique());

    if(loadedZoneGeographique==null ) {
    return;
    }
    enseignementZoneGeographique.setZoneGeographique(loadedZoneGeographique);
    }
    private void findPays(EnseignementZoneGeographique enseignementZoneGeographique){
        Pays loadedPays =paysService.findByIdOrCode(enseignementZoneGeographique.getPays());

    if(loadedPays==null ) {
    return;
    }
    enseignementZoneGeographique.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<EnseignementZoneGeographique> enseignementZoneGeographiques){
if(ListUtil.isNotEmpty(enseignementZoneGeographiques)){
enseignementZoneGeographiques.forEach(e->enseignementZoneGeographiqueDao.delete(e));
}
}
@Override
public void update(List<EnseignementZoneGeographique> enseignementZoneGeographiques){
if(ListUtil.isNotEmpty(enseignementZoneGeographiques)){
enseignementZoneGeographiques.forEach(e->enseignementZoneGeographiqueDao.save(e));
}
}





    }
