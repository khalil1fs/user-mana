package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EtablissementProjet;
        import com.ird.faa.bean.referentiel.Ville;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.EtablissementProjetDao;
import com.ird.faa.service.admin.facade.formulaire.EtablissementProjetAdminService;
        import com.ird.faa.service.admin.facade.referentiel.VilleAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementProjetVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtablissementProjetAdminServiceImpl extends AbstractServiceImpl<EtablissementProjet> implements EtablissementProjetAdminService {

@Autowired
private EtablissementProjetDao etablissementProjetDao;

        @Autowired
        private VilleAdminService villeService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EtablissementProjet> findAll(){
return etablissementProjetDao.findAll();
}

        @Override
        public List<EtablissementProjet> findByVilleCode(String code){
        return etablissementProjetDao.findByVilleCode(code);
        }

        @Override
        @Transactional
        public int deleteByVilleCode(String code){
        return etablissementProjetDao.deleteByVilleCode(code);
        }

        @Override
        public List<EtablissementProjet> findByVilleId(Long id){
        return etablissementProjetDao.findByVilleId(id);
        }

        @Override
        @Transactional
        public int deleteByVilleId(Long id){
        return etablissementProjetDao.deleteByVilleId(id);
        }


        @Override
        public List<EtablissementProjet> findByPaysCode(String code){
        return etablissementProjetDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return etablissementProjetDao.deleteByPaysCode(code);
        }

        @Override
        public List<EtablissementProjet> findByPaysId(Long id){
        return etablissementProjetDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return etablissementProjetDao.deleteByPaysId(id);
        }

    @Override
    public EtablissementProjet findByCode(String code){
    if( code==null) return null;
    return etablissementProjetDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return etablissementProjetDao.deleteByCode(code);
    }
    @Override
    public EtablissementProjet findByIdOrCode(EtablissementProjet etablissementProjet){
    EtablissementProjet resultat=null;
    if(etablissementProjet == null || ( etablissementProjet.getCode()==null && etablissementProjet.getId()==null))
    return resultat;
    else{
    if(etablissementProjet.getId() != null){
    resultat= etablissementProjetDao.findById(etablissementProjet.getId()).get();
    }else if(StringUtil.isNotEmpty(etablissementProjet.getCode())) {
    resultat= etablissementProjetDao.findByCode(etablissementProjet.getCode());
    }
    return resultat;
    }
    }

@Override
public EtablissementProjet findById(Long id){
if(id==null) return null;
return etablissementProjetDao.getOne(id);
}

@Override
public EtablissementProjet findByIdWithAssociatedList(Long id){
EtablissementProjet etablissementProjet  = findById(id);
return etablissementProjet;
}


@Transactional
public int deleteById(Long id){
if(etablissementProjetDao.findById(id) == null) return 0;
else{
etablissementProjetDao.deleteById(id);
return 1;
}
}


@Override
public EtablissementProjet update(EtablissementProjet etablissementProjet){
EtablissementProjet foundedEtablissementProjet = findById(etablissementProjet.getId());
if(foundedEtablissementProjet==null) return null;
else{
return  etablissementProjetDao.save(etablissementProjet);
}
}

@Override
public EtablissementProjet save (EtablissementProjet etablissementProjet){
    EtablissementProjet foundedEtablissementProjet = findByCode(etablissementProjet.getCode());
   if(foundedEtablissementProjet!=null) return null;


    findVille(etablissementProjet);
    findPays(etablissementProjet);

EtablissementProjet savedEtablissementProjet = etablissementProjetDao.save(etablissementProjet);
return savedEtablissementProjet;
}

@Override
public List<EtablissementProjet> save(List<EtablissementProjet> etablissementProjets){
List<EtablissementProjet> list = new ArrayList<EtablissementProjet>();
for(EtablissementProjet etablissementProjet: etablissementProjets){
list.add(save(etablissementProjet));
}
return list;
}



@Override
@Transactional
public int delete(EtablissementProjet etablissementProjet){
    if(etablissementProjet.getCode()==null) return -1;

    EtablissementProjet foundedEtablissementProjet = findByCode(etablissementProjet.getCode());
    if(foundedEtablissementProjet==null) return -1;
etablissementProjetDao.delete(foundedEtablissementProjet);
return 1;
}


public List<EtablissementProjet> findByCriteria(EtablissementProjetVo etablissementProjetVo){

String query = "SELECT o FROM EtablissementProjet o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",etablissementProjetVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",etablissementProjetVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",etablissementProjetVo.getCode());
            query += SearchUtil.addConstraint( "o", "description","LIKE",etablissementProjetVo.getDescription());
            query += SearchUtil.addConstraint( "o", "sigleOfficiel","LIKE",etablissementProjetVo.getSigleOfficiel());
            query += SearchUtil.addConstraint( "o", "nomEnFrancais","LIKE",etablissementProjetVo.getNomEnFrancais());
            query += SearchUtil.addConstraint( "o", "sigleEnFrancais","LIKE",etablissementProjetVo.getSigleEnFrancais());
            query += SearchUtil.addConstraint( "o", "anciensNom","LIKE",etablissementProjetVo.getAnciensNom());
            query += SearchUtil.addConstraint( "o", "champIntervention","LIKE",etablissementProjetVo.getChampIntervention());
            query += SearchUtil.addConstraint( "o", "valide","=",etablissementProjetVo.getValide());
    if(etablissementProjetVo.getVilleVo()!=null){
        query += SearchUtil.addConstraint( "o", "ville.id","=",etablissementProjetVo.getVilleVo().getId());
            query += SearchUtil.addConstraint( "o", "ville.code","LIKE",etablissementProjetVo.getVilleVo().getCode());
    }

    if(etablissementProjetVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",etablissementProjetVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",etablissementProjetVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findVille(EtablissementProjet etablissementProjet){
        Ville loadedVille =villeService.findByIdOrCode(etablissementProjet.getVille());

    if(loadedVille==null ) {
        return;
    }
    etablissementProjet.setVille(loadedVille);
    }
    private void findPays(EtablissementProjet etablissementProjet){
        Pays loadedPays =paysService.findByIdOrCode(etablissementProjet.getPays());

    if(loadedPays==null ) {
        return;
    }
    etablissementProjet.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<EtablissementProjet> etablissementProjets){
        if(ListUtil.isNotEmpty(etablissementProjets)){
        etablissementProjets.forEach(e->etablissementProjetDao.delete(e));
        }
}
@Override
public void update(List<EtablissementProjet> etablissementProjets){
if(ListUtil.isNotEmpty(etablissementProjets)){
etablissementProjets.forEach(e->etablissementProjetDao.save(e));
}
}



@Override
public List<List<EtablissementProjet>>  getToBeSavedAndToBeDeleted(List<EtablissementProjet> oldList,List<EtablissementProjet> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
