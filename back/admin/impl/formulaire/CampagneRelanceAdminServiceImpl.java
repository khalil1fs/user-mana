package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CampagneRelance;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.CampagneChercheurOuverture;
import com.ird.faa.bean.referentiel.TemplateRelance;
import com.ird.faa.dao.formulaire.CampagneRelanceDao;
import com.ird.faa.mail.service.facade.EmailService;
import com.ird.faa.service.admin.facade.formulaire.CampagneRelanceAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TemplateRelanceAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurOuvertureAdminService;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRelanceVo;
import com.ird.faa.service.util.*;
        import com.ird.faa.bean.formulaire.CampagneRelanceChercheur;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneRelanceAdminServiceImpl extends AbstractServiceImpl<CampagneRelance> implements CampagneRelanceAdminService {

@Autowired
private CampagneRelanceDao campagneRelanceDao;

        
        @Autowired
        private TemplateRelanceAdminService templateRelanceService ;
        @Autowired
        private CampagneAdminService campagneService ;
        
        @Autowired
        private CampagneChercheurOuvertureAdminService campagneChercheurOuvertureAdminService;
        
        @Autowired
        private EmailService emailService;


@Autowired
private EntityManager entityManager;


@Override
public List<CampagneRelance> findAll(){
return campagneRelanceDao.findAll();
}

        @Override
        public List<CampagneRelance> findByCampagneCode(String code){
        return campagneRelanceDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return campagneRelanceDao.deleteByCampagneCode(code);
        }

        @Override
        public List<CampagneRelance> findByCampagneId(Long id){
        return campagneRelanceDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return campagneRelanceDao.deleteByCampagneId(id);
        }


        @Override
        public List<CampagneRelance> findByTemplateRelanceCode(String code){
        return campagneRelanceDao.findByTemplateRelanceCode(code);
        }
        
     
        
        @Override
        public List<CampagneRelance> findByCampagneIdOrderByDateRelance(Long id){
        	String query = "SELECT cr FROM CampagneRelance cr ";
    		query += "inner join  Campagne c on cr.campagne.id = c.id   where 1=1";
    		query += SearchUtil.addConstraint("cr", "campagne.id", "=", id);
    		query += " ORDER BY cr.dateRelance DESC";
    		List<CampagneRelance> campagnesRelance = entityManager.createQuery(query).getResultList();
    		return campagnesRelance;
        	
        }
        

        @Override
        @Transactional
        public int deleteByTemplateRelanceCode(String code){
        return campagneRelanceDao.deleteByTemplateRelanceCode(code);
        }

        @Override
        public List<CampagneRelance> findByTemplateRelanceId(Long id){
        return campagneRelanceDao.findByTemplateRelanceId(id);
        }

        @Override
        @Transactional
        public int deleteByTemplateRelanceId(Long id){
        return campagneRelanceDao.deleteByTemplateRelanceId(id);
        }


@Override
public CampagneRelance findById(Long id){
if(id==null) return null;
return campagneRelanceDao.getOne(id);
}




   







@Override
public List<CampagneRelance> save(List<CampagneRelance> campagneRelances){
List<CampagneRelance> list = new ArrayList<CampagneRelance>();
for(CampagneRelance campagneRelance: campagneRelances){
list.add(save(campagneRelance));
}
return list;
}



@Override
@Transactional
public int delete(CampagneRelance campagneRelance){
    if(campagneRelance.getId()==null) return -1;
    CampagneRelance foundedCampagneRelance = findById(campagneRelance.getId());
    if(foundedCampagneRelance==null) return -1;
campagneRelanceDao.delete(foundedCampagneRelance);
return 1;
}


	public List<CampagneRelance> findByCriteria(CampagneRelanceVo campagneRelanceVo) {

		String query = "SELECT o FROM CampagneRelance o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", campagneRelanceVo.getId());
		query += SearchUtil.addConstraintDate("o", "dateRelance", "=", campagneRelanceVo.getDateRelance());
		query += SearchUtil.addConstraint("o", "objetRelance", "LIKE", campagneRelanceVo.getObjetRelance());
		query += SearchUtil.addConstraint("o", "messageRelance", "LIKE", campagneRelanceVo.getMessageRelance());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateRelance", campagneRelanceVo.getDateRelanceMin(),
				campagneRelanceVo.getDateRelanceMax());
		if (campagneRelanceVo.getCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "campagne.id", "=", campagneRelanceVo.getCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "campagne.code", "LIKE",
					campagneRelanceVo.getCampagneVo().getCode());
		}

		if (campagneRelanceVo.getTemplateRelanceVo() != null) {
		}

		return entityManager.createQuery(query).getResultList();
	}
       

    private void findCampagne(CampagneRelance campagneRelance){
        Campagne loadedCampagne =campagneService.findByIdOrCode(campagneRelance.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    campagneRelance.setCampagne(loadedCampagne);
    }
    private void findTemplateRelance(CampagneRelance campagneRelance){
        TemplateRelance loadedTemplateRelance =templateRelanceService.findByIdOrCode(campagneRelance.getTemplateRelance());

    if(loadedTemplateRelance==null ) {
        return;
    }
    campagneRelance.setTemplateRelance(loadedTemplateRelance);
    }

@Override
@Transactional
public void delete(List<CampagneRelance> campagneRelances){
        if(ListUtil.isNotEmpty(campagneRelances)){
        campagneRelances.forEach(e->campagneRelanceDao.delete(e));
        }
}
@Override
public void update(List<CampagneRelance> campagneRelances){
if(ListUtil.isNotEmpty(campagneRelances)){
campagneRelances.forEach(e->campagneRelanceDao.save(e));
}
}

private void associateCampagneRelanceChercheur(CampagneRelance campagneRelance, List<CampagneRelanceChercheur> campagneRelanceChercheur) {
    if (ListUtil.isNotEmpty(campagneRelanceChercheur)) {
        campagneRelanceChercheur.forEach(e -> e.setCampagneRelance(campagneRelance));
    }
    }


@Override
public List<List<CampagneRelance>>  getToBeSavedAndToBeDeleted(List<CampagneRelance> oldList,List<CampagneRelance> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

@Override
public CampagneRelance findByIdWithAssociatedList(Long id) {
	// TODO Auto-generated method stub
	return null;
}

@Override
public CampagneRelance update(CampagneRelance T) {
	// TODO Auto-generated method stub
	return null;
}

@Override
public int deleteById(Long id) {
	// TODO Auto-generated method stub
	return 0;
}

	@Override
	public CampagneRelance save(CampagneRelance campagneRelance) {
		findCampagne(campagneRelance);
		findTemplateRelance(campagneRelance);
		CampagneRelance savedCampagneRelance = campagneRelanceDao.save(campagneRelance);
		// saveCampagneRelanceChercheurs(savedCampagneRelance,campagneRelance.getCampagneRelanceChercheurs());
		return savedCampagneRelance;
	}
	
	
	public void sendEmailRelance(CampagneRelance campagneRelance) {
		findCampagneRelanceByDateRelance();
		if (campagneRelance.getCampagneRelanceChercheurs() != null) {
			emailService.sendEmailRelance(campagneRelance, campagneRelance.getCampagneRelanceChercheurs());
		}
	}
	
	@Scheduled(cron = "${cron.expression}")
	public void SendAutoEmailRelance() {
		System.out.println("send email auto relance");
		List<CampagneRelance> campagneRelances = findCampagneRelanceByDateRelance();
		campagneRelances.forEach(campagneRelance -> {
			List<CampagneChercheurOuverture> campagneChercheurOuvertures = this.campagneChercheurOuvertureAdminService
					.findByCampagneId(campagneRelance.getCampagne().getId());
			if(campagneChercheurOuvertures!=null) {
				emailService.sendAutoEmailRelance(campagneRelance, campagneChercheurOuvertures);
			}
		});
		
		
	}
	
	
	
	public List<CampagneRelance> findCampagneRelanceByDateRelance() {
		SimpleDateFormat  sdf=new SimpleDateFormat("YYYY-MM-dd");
		String dateString=sdf.format(new Date());
		String query = "SELECT o FROM CampagneRelance o  where 1=1 ";
		query+=" AND to_date(to_char(o.dateRelance, 'YYYY/MM/DD'), 'YYYY/MM/DD')"+" = "+"\'"+ dateString+"\'";		
		return entityManager.createQuery(query).getResultList();
	}

	
}
