package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.referentiel.Contexte;
import com.ird.faa.dao.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublicDao;
import com.ird.faa.service.admin.facade.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.referentiel.ContexteAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminServiceImpl extends AbstractServiceImpl<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> implements ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminService {

@Autowired
private ContexteCultureScientifiqueRecontreGrandPublicJeunePublicDao contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao;

        @Autowired
        private ContexteAdminService contexteService ;
        @Autowired
        private CultureScientifiqueRecontreGrandPublicJeunePublicAdminService cultureScientifiqueRecontreGrandPublicJeunePublicService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findAll(){
return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.findAll();
}
        @Override
        public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }

        @Override
        @Transactional
        public int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        }


        @Override
        public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByContexteCode(String code){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByContexteCode(code);
        }

        @Override
        @Transactional
        public int deleteByContexteCode(String code){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByContexteCode(code);
        }

        @Override
        public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByContexteId(Long id){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.findByContexteId(id);
        }

        @Override
        @Transactional
        public int deleteByContexteId(Long id){
        return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByContexteId(id);
        }


@Override
public ContexteCultureScientifiqueRecontreGrandPublicJeunePublic findById(Long id){
if(id==null) return null;
return contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.getOne(id);
}

@Override
public ContexteCultureScientifiqueRecontreGrandPublicJeunePublic findByIdWithAssociatedList(Long id){
ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic  = findById(id);
return contexteCultureScientifiqueRecontreGrandPublicJeunePublic;
}


@Transactional
public int deleteById(Long id){
if(contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.findById(id) == null) return 0;
else{
contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteById(id);
return 1;
}
}


@Override
public ContexteCultureScientifiqueRecontreGrandPublicJeunePublic update(ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic){
ContexteCultureScientifiqueRecontreGrandPublicJeunePublic foundedContexteCultureScientifiqueRecontreGrandPublicJeunePublic = findById(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
if(foundedContexteCultureScientifiqueRecontreGrandPublicJeunePublic==null) return null;
else{
return  contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(contexteCultureScientifiqueRecontreGrandPublicJeunePublic);
}
}

@Override
public ContexteCultureScientifiqueRecontreGrandPublicJeunePublic save (ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic){


    findCultureScientifiqueRecontreGrandPublicJeunePublic(contexteCultureScientifiqueRecontreGrandPublicJeunePublic);
    findContexte(contexteCultureScientifiqueRecontreGrandPublicJeunePublic);

ContexteCultureScientifiqueRecontreGrandPublicJeunePublic savedContexteCultureScientifiqueRecontreGrandPublicJeunePublic = contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(contexteCultureScientifiqueRecontreGrandPublicJeunePublic);
return savedContexteCultureScientifiqueRecontreGrandPublicJeunePublic;
}

@Override
public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> save(List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublics){
List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> list = new ArrayList<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic>();
for(ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic: contexteCultureScientifiqueRecontreGrandPublicJeunePublics){
list.add(save(contexteCultureScientifiqueRecontreGrandPublicJeunePublic));
}
return list;
}



@Override
@Transactional
public int delete(ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic){
    if(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return -1;
    ContexteCultureScientifiqueRecontreGrandPublicJeunePublic foundedContexteCultureScientifiqueRecontreGrandPublicJeunePublic = findById(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getId());
    if(foundedContexteCultureScientifiqueRecontreGrandPublicJeunePublic==null) return -1;
contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(foundedContexteCultureScientifiqueRecontreGrandPublicJeunePublic);
return 1;
}


public List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByCriteria(ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo){

String query = "SELECT o FROM ContexteCultureScientifiqueRecontreGrandPublicJeunePublic o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getId());
    if(contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo()!=null){
        query += SearchUtil.addConstraint( "o", "cultureScientifiqueRecontreGrandPublicJeunePublic.id","=",contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getCultureScientifiqueRecontreGrandPublicJeunePublicVo().getId());
    }

    if(contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getContexteVo()!=null){
        query += SearchUtil.addConstraint( "o", "contexte.id","=",contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getContexteVo().getId());
            query += SearchUtil.addConstraint( "o", "contexte.code","LIKE",contexteCultureScientifiqueRecontreGrandPublicJeunePublicVo.getContexteVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCultureScientifiqueRecontreGrandPublicJeunePublic(ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic){
        CultureScientifiqueRecontreGrandPublicJeunePublic loadedCultureScientifiqueRecontreGrandPublicJeunePublic = null;
        if(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic() != null && contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId() !=null)
        loadedCultureScientifiqueRecontreGrandPublicJeunePublic =cultureScientifiqueRecontreGrandPublicJeunePublicService.findById(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getCultureScientifiqueRecontreGrandPublicJeunePublic().getId());

    if(loadedCultureScientifiqueRecontreGrandPublicJeunePublic==null ) {
        return;
    }
    contexteCultureScientifiqueRecontreGrandPublicJeunePublic.setCultureScientifiqueRecontreGrandPublicJeunePublic(loadedCultureScientifiqueRecontreGrandPublicJeunePublic);
    }
    private void findContexte(ContexteCultureScientifiqueRecontreGrandPublicJeunePublic contexteCultureScientifiqueRecontreGrandPublicJeunePublic){
        Contexte loadedContexte =contexteService.findByIdOrCode(contexteCultureScientifiqueRecontreGrandPublicJeunePublic.getContexte());

    if(loadedContexte==null ) {
        return;
    }
    contexteCultureScientifiqueRecontreGrandPublicJeunePublic.setContexte(loadedContexte);
    }

@Override
@Transactional
public void delete(List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublics){
        if(ListUtil.isNotEmpty(contexteCultureScientifiqueRecontreGrandPublicJeunePublics)){
        contexteCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(e));
        }
}
@Override
public void update(List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublics){
if(ListUtil.isNotEmpty(contexteCultureScientifiqueRecontreGrandPublicJeunePublics)){
contexteCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->contexteCultureScientifiqueRecontreGrandPublicJeunePublicDao.save(e));
}
}



@Override
public List<List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic>>  getToBeSavedAndToBeDeleted(List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> oldList,List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
