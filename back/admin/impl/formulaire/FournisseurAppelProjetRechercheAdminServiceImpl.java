package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FournisseurAppelProjetRecherche;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.FournisseurAppelProjetRechercheDao;
import com.ird.faa.service.admin.facade.formulaire.FournisseurAppelProjetRechercheAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FournisseurAppelProjetRechercheVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FournisseurAppelProjetRechercheAdminServiceImpl extends AbstractServiceImpl<FournisseurAppelProjetRecherche> implements FournisseurAppelProjetRechercheAdminService {

@Autowired
private FournisseurAppelProjetRechercheDao fournisseurAppelProjetRechercheDao;

        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<FournisseurAppelProjetRecherche> findAll(){
return fournisseurAppelProjetRechercheDao.findAll();
}

        @Override
        public List<FournisseurAppelProjetRecherche> findByPaysCode(String code){
        return fournisseurAppelProjetRechercheDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return fournisseurAppelProjetRechercheDao.deleteByPaysCode(code);
        }

        @Override
        public List<FournisseurAppelProjetRecherche> findByPaysId(Long id){
        return fournisseurAppelProjetRechercheDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return fournisseurAppelProjetRechercheDao.deleteByPaysId(id);
        }

    @Override
    public FournisseurAppelProjetRecherche findByCode(String code){
    if( code==null) return null;
    return fournisseurAppelProjetRechercheDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return fournisseurAppelProjetRechercheDao.deleteByCode(code);
    }
    @Override
    public FournisseurAppelProjetRecherche findByIdOrCode(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche){
    FournisseurAppelProjetRecherche resultat=null;
    if(fournisseurAppelProjetRecherche == null || ( fournisseurAppelProjetRecherche.getCode()==null && fournisseurAppelProjetRecherche.getId()==null))
    return resultat;
    else{
    if(fournisseurAppelProjetRecherche.getId() != null){
    resultat= fournisseurAppelProjetRechercheDao.findById(fournisseurAppelProjetRecherche.getId()).get();
    }else if(StringUtil.isNotEmpty(fournisseurAppelProjetRecherche.getCode())) {
    resultat= fournisseurAppelProjetRechercheDao.findByCode(fournisseurAppelProjetRecherche.getCode());
    }
    return resultat;
    }
    }

@Override
public FournisseurAppelProjetRecherche findById(Long id){
if(id==null) return null;
return fournisseurAppelProjetRechercheDao.getOne(id);
}

@Override
public FournisseurAppelProjetRecherche findByIdWithAssociatedList(Long id){
FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche  = findById(id);
return fournisseurAppelProjetRecherche;
}


@Transactional
public int deleteById(Long id){
if(fournisseurAppelProjetRechercheDao.findById(id) == null) return 0;
else{
fournisseurAppelProjetRechercheDao.deleteById(id);
return 1;
}
}


@Override
public FournisseurAppelProjetRecherche update(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche){
FournisseurAppelProjetRecherche foundedFournisseurAppelProjetRecherche = findById(fournisseurAppelProjetRecherche.getId());
if(foundedFournisseurAppelProjetRecherche==null) return null;
else{
return  fournisseurAppelProjetRechercheDao.save(fournisseurAppelProjetRecherche);
}
}

@Override
public FournisseurAppelProjetRecherche save (FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche){
    FournisseurAppelProjetRecherche foundedFournisseurAppelProjetRecherche = findByCode(fournisseurAppelProjetRecherche.getCode());
   if(foundedFournisseurAppelProjetRecherche!=null) return null;


    findPays(fournisseurAppelProjetRecherche);

FournisseurAppelProjetRecherche savedFournisseurAppelProjetRecherche = fournisseurAppelProjetRechercheDao.save(fournisseurAppelProjetRecherche);
return savedFournisseurAppelProjetRecherche;
}

@Override
public List<FournisseurAppelProjetRecherche> save(List<FournisseurAppelProjetRecherche> fournisseurAppelProjetRecherches){
List<FournisseurAppelProjetRecherche> list = new ArrayList<FournisseurAppelProjetRecherche>();
for(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche: fournisseurAppelProjetRecherches){
list.add(save(fournisseurAppelProjetRecherche));
}
return list;
}



@Override
@Transactional
public int delete(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche){
    if(fournisseurAppelProjetRecherche.getCode()==null) return -1;

    FournisseurAppelProjetRecherche foundedFournisseurAppelProjetRecherche = findByCode(fournisseurAppelProjetRecherche.getCode());
    if(foundedFournisseurAppelProjetRecherche==null) return -1;
fournisseurAppelProjetRechercheDao.delete(foundedFournisseurAppelProjetRecherche);
return 1;
}


public List<FournisseurAppelProjetRecherche> findByCriteria(FournisseurAppelProjetRechercheVo fournisseurAppelProjetRechercheVo){

String query = "SELECT o FROM FournisseurAppelProjetRecherche o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",fournisseurAppelProjetRechercheVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",fournisseurAppelProjetRechercheVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",fournisseurAppelProjetRechercheVo.getCode());
            query += SearchUtil.addConstraint( "o", "description","LIKE",fournisseurAppelProjetRechercheVo.getDescription());
    if(fournisseurAppelProjetRechercheVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",fournisseurAppelProjetRechercheVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",fournisseurAppelProjetRechercheVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPays(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche){
        Pays loadedPays =paysService.findByIdOrCode(fournisseurAppelProjetRecherche.getPays());

    if(loadedPays==null ) {
        return;
    }
    fournisseurAppelProjetRecherche.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<FournisseurAppelProjetRecherche> fournisseurAppelProjetRecherches){
        if(ListUtil.isNotEmpty(fournisseurAppelProjetRecherches)){
        fournisseurAppelProjetRecherches.forEach(e->fournisseurAppelProjetRechercheDao.delete(e));
        }
}
@Override
public void update(List<FournisseurAppelProjetRecherche> fournisseurAppelProjetRecherches){
if(ListUtil.isNotEmpty(fournisseurAppelProjetRecherches)){
fournisseurAppelProjetRecherches.forEach(e->fournisseurAppelProjetRechercheDao.save(e));
}
}



@Override
public List<List<FournisseurAppelProjetRecherche>>  getToBeSavedAndToBeDeleted(List<FournisseurAppelProjetRecherche> oldList,List<FournisseurAppelProjetRecherche> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
