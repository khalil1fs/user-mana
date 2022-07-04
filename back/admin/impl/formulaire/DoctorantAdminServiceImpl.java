package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.Doctorant;
        import com.ird.faa.bean.referentiel.Sexe;
        import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.DoctorantDao;
import com.ird.faa.service.admin.facade.formulaire.DoctorantAdminService;
        import com.ird.faa.service.admin.facade.referentiel.SexeAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DoctorantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DoctorantAdminServiceImpl extends AbstractServiceImpl<Doctorant> implements DoctorantAdminService {

@Autowired
private DoctorantDao doctorantDao;

        @Autowired
        private SexeAdminService sexeService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Doctorant> findAll(){
return doctorantDao.findAll();
}

        @Override
        public List<Doctorant> findBySexeCode(String code){
        return doctorantDao.findBySexeCode(code);
        }

        @Override
        @Transactional
        public int deleteBySexeCode(String code){
        return doctorantDao.deleteBySexeCode(code);
        }

        @Override
        public List<Doctorant> findBySexeId(Long id){
        return doctorantDao.findBySexeId(id);
        }

        @Override
        @Transactional
        public int deleteBySexeId(Long id){
        return doctorantDao.deleteBySexeId(id);
        }


        @Override
        public List<Doctorant> findByPaysCode(String code){
        return doctorantDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return doctorantDao.deleteByPaysCode(code);
        }

        @Override
        public List<Doctorant> findByPaysId(Long id){
        return doctorantDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return doctorantDao.deleteByPaysId(id);
        }


@Override
public Doctorant findById(Long id){
if(id==null) return null;
return doctorantDao.getOne(id);
}

@Override
public Doctorant findByIdWithAssociatedList(Long id){
Doctorant doctorant  = findById(id);
return doctorant;
}


@Transactional
public int deleteById(Long id){
if(doctorantDao.findById(id) == null) return 0;
else{
doctorantDao.deleteById(id);
return 1;
}
}


@Override
public Doctorant update(Doctorant doctorant){
Doctorant foundedDoctorant = findById(doctorant.getId());
if(foundedDoctorant==null) return null;
else{
return  doctorantDao.save(doctorant);
}
}

@Override
public Doctorant save (Doctorant doctorant){


    findSexe(doctorant);
    findPays(doctorant);

Doctorant savedDoctorant = doctorantDao.save(doctorant);
return savedDoctorant;
}

@Override
public List<Doctorant> save(List<Doctorant> doctorants){
List<Doctorant> list = new ArrayList<Doctorant>();
for(Doctorant doctorant: doctorants){
list.add(save(doctorant));
}
return list;
}



@Override
@Transactional
public int delete(Doctorant doctorant){
    if(doctorant.getId()==null) return -1;
    Doctorant foundedDoctorant = findById(doctorant.getId());
    if(foundedDoctorant==null) return -1;
doctorantDao.delete(foundedDoctorant);
return 1;
}


public List<Doctorant> findByCriteria(DoctorantVo doctorantVo){

String query = "SELECT o FROM Doctorant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",doctorantVo.getId());
            query += SearchUtil.addConstraint( "o", "nom","LIKE",doctorantVo.getNom());
            query += SearchUtil.addConstraint( "o", "prenom","LIKE",doctorantVo.getPrenom());
            query += SearchUtil.addConstraint( "o", "anneeNaissance","=",doctorantVo.getAnneeNaissance());
            query += SearchUtil.addConstraintMinMax("o","anneeNaissance",doctorantVo.getAnneeNaissanceMin(),doctorantVo.getAnneeNaissanceMax());
    if(doctorantVo.getSexeVo()!=null){
        query += SearchUtil.addConstraint( "o", "sexe.id","=",doctorantVo.getSexeVo().getId());
            query += SearchUtil.addConstraint( "o", "sexe.code","LIKE",doctorantVo.getSexeVo().getCode());
    }

    if(doctorantVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",doctorantVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",doctorantVo.getPaysVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findSexe(Doctorant doctorant){
        Sexe loadedSexe =sexeService.findByIdOrCode(doctorant.getSexe());

    if(loadedSexe==null ) {
        return;
    }
    doctorant.setSexe(loadedSexe);
    }
    private void findPays(Doctorant doctorant){
        Pays loadedPays =paysService.findByIdOrCode(doctorant.getPays());

    if(loadedPays==null ) {
        return;
    }
    doctorant.setPays(loadedPays);
    }

@Override
@Transactional
public void delete(List<Doctorant> doctorants){
        if(ListUtil.isNotEmpty(doctorants)){
        doctorants.forEach(e->doctorantDao.delete(e));
        }
}
@Override
public void update(List<Doctorant> doctorants){
if(ListUtil.isNotEmpty(doctorants)){
doctorants.forEach(e->doctorantDao.save(e));
}
}



@Override
public List<List<Doctorant>>  getToBeSavedAndToBeDeleted(List<Doctorant> oldList,List<Doctorant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
