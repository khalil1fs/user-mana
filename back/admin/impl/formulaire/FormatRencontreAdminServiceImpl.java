package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormatRencontre;
import com.ird.faa.dao.formulaire.FormatRencontreDao;
import com.ird.faa.service.admin.facade.formulaire.FormatRencontreAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormatRencontreVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormatRencontreAdminServiceImpl extends AbstractServiceImpl<FormatRencontre> implements FormatRencontreAdminService {

@Autowired
private FormatRencontreDao formatRencontreDao;



@Autowired
private EntityManager entityManager;


@Override
public List<FormatRencontre> findAll(){
return formatRencontreDao.findAll();
}
    @Override
    public FormatRencontre findByCode(String code){
    if( code==null) return null;
    return formatRencontreDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return formatRencontreDao.deleteByCode(code);
    }
    @Override
    public FormatRencontre findByIdOrCode(FormatRencontre formatRencontre){
    FormatRencontre resultat=null;
    if(formatRencontre == null || ( formatRencontre.getCode()==null && formatRencontre.getId()==null))
    return resultat;
    else{
    if(formatRencontre.getId() != null){
    resultat= formatRencontreDao.findById(formatRencontre.getId()).get();
    }else if(StringUtil.isNotEmpty(formatRencontre.getCode())) {
    resultat= formatRencontreDao.findByCode(formatRencontre.getCode());
    }
    return resultat;
    }
    }

@Override
public FormatRencontre findById(Long id){
if(id==null) return null;
return formatRencontreDao.getOne(id);
}

@Override
public FormatRencontre findByIdWithAssociatedList(Long id){
FormatRencontre formatRencontre  = findById(id);
return formatRencontre;
}


@Transactional
public int deleteById(Long id){
if(formatRencontreDao.findById(id) == null) return 0;
else{
formatRencontreDao.deleteById(id);
return 1;
}
}


@Override
public FormatRencontre update(FormatRencontre formatRencontre){
FormatRencontre foundedFormatRencontre = findById(formatRencontre.getId());
if(foundedFormatRencontre==null) return null;
else{
return  formatRencontreDao.save(formatRencontre);
}
}

@Override
public FormatRencontre save (FormatRencontre formatRencontre){
    FormatRencontre foundedFormatRencontre = findByCode(formatRencontre.getCode());
   if(foundedFormatRencontre!=null) return null;



FormatRencontre savedFormatRencontre = formatRencontreDao.save(formatRencontre);
return savedFormatRencontre;
}

@Override
public List<FormatRencontre> save(List<FormatRencontre> formatRencontres){
List<FormatRencontre> list = new ArrayList<FormatRencontre>();
for(FormatRencontre formatRencontre: formatRencontres){
list.add(save(formatRencontre));
}
return list;
}



@Override
@Transactional
public int delete(FormatRencontre formatRencontre){
    if(formatRencontre.getCode()==null) return -1;

    FormatRencontre foundedFormatRencontre = findByCode(formatRencontre.getCode());
    if(foundedFormatRencontre==null) return -1;
formatRencontreDao.delete(foundedFormatRencontre);
return 1;
}


public List<FormatRencontre> findByCriteria(FormatRencontreVo formatRencontreVo){

String query = "SELECT o FROM FormatRencontre o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",formatRencontreVo.getId());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",formatRencontreVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "code","LIKE",formatRencontreVo.getCode());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<FormatRencontre> formatRencontres){
        if(ListUtil.isNotEmpty(formatRencontres)){
        formatRencontres.forEach(e->formatRencontreDao.delete(e));
        }
}
@Override
public void update(List<FormatRencontre> formatRencontres){
if(ListUtil.isNotEmpty(formatRencontres)){
formatRencontres.forEach(e->formatRencontreDao.save(e));
}
}



@Override
public List<List<FormatRencontre>>  getToBeSavedAndToBeDeleted(List<FormatRencontre> oldList,List<FormatRencontre> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
