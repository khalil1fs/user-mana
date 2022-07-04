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
import com.ird.faa.bean.formulaire.CampagneRappel;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.CampagneChercheurOuverture;
import com.ird.faa.bean.referentiel.TemplateRappel;
import com.ird.faa.dao.formulaire.CampagneRappelDao;
import com.ird.faa.mail.service.facade.EmailService;
import com.ird.faa.service.admin.facade.formulaire.CampagneRappelAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneRappelChercheurAdminService;
import com.ird.faa.service.admin.facade.referentiel.TemplateRappelAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurOuvertureAdminService;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRappelVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.CampagneRappelChercheur;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneRappelAdminServiceImpl extends AbstractServiceImpl<CampagneRappel>
		implements CampagneRappelAdminService {

	@Autowired
	private CampagneRappelDao campagneRappelDao;

	@Autowired
	private CampagneRappelChercheurAdminService campagneRappelChercheurService;
	@Autowired
	private TemplateRappelAdminService templateRappelService;
	@Autowired
	private CampagneAdminService campagneService;

	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private CampagneChercheurOuvertureAdminService campagneChercheurOuvertureAdminService;

	@Override
	public List<CampagneRappel> findAll() {
		return campagneRappelDao.findAll();
	}

	@Override
	public List<CampagneRappel> findByCampagneCode(String code) {
		return campagneRappelDao.findByCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByCampagneCode(String code) {
		return campagneRappelDao.deleteByCampagneCode(code);
	}

	@Override
	public List<CampagneRappel> findByCampagneId(Long id) {
		return campagneRappelDao.findByCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByCampagneId(Long id) {
		return campagneRappelDao.deleteByCampagneId(id);
	}

	@Override
	public List<CampagneRappel> findByTemplateRappelCode(String code) {
		return campagneRappelDao.findByTemplateRappelCode(code);
	}

	@Override
	@Transactional
	public int deleteByTemplateRappelCode(String code) {
		return campagneRappelDao.deleteByTemplateRappelCode(code);
	}

	@Override
	public List<CampagneRappel> findByTemplateRappelId(Long id) {
		return campagneRappelDao.findByTemplateRappelId(id);
	}

	@Override
	@Transactional
	public int deleteByTemplateRappelId(Long id) {
		return campagneRappelDao.deleteByTemplateRappelId(id);
	}

	@Override
	public CampagneRappel findById(Long id) {
		if (id == null)
			return null;
		return campagneRappelDao.getOne(id);
	}

	@Override
	public CampagneRappel findByIdWithAssociatedList(Long id) {
		CampagneRappel campagneRappel = findById(id);
		findAssociatedLists(campagneRappel);
		return campagneRappel;
	}

	private void findAssociatedLists(CampagneRappel campagneRappel) {
		if (campagneRappel == null || campagneRappel.getId() == null)
			return;
		else {
			List<CampagneRappelChercheur> campagneRappelChercheurs = campagneRappelChercheurService
					.findByCampagneRappelId(campagneRappel.getId());
			campagneRappel.setCampagneRappelChercheurs(campagneRappelChercheurs);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			campagneRappelChercheurService.deleteByCampagneRappelId(id);
		}
	}

	private void updateAssociatedLists(CampagneRappel campagneRappel) {
		if (campagneRappel == null || campagneRappel.getId() == null)
			return;
		else {
			List<List<CampagneRappelChercheur>> resultCampagneRappelChercheurs = campagneRappelChercheurService
					.getToBeSavedAndToBeDeleted(
							campagneRappelChercheurService.findByCampagneRappelId(campagneRappel.getId()),
							campagneRappel.getCampagneRappelChercheurs());
			campagneRappelChercheurService.delete(resultCampagneRappelChercheurs.get(1));
			associateCampagneRappelChercheur(campagneRappel, resultCampagneRappelChercheurs.get(0));
			campagneRappelChercheurService.update(resultCampagneRappelChercheurs.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (campagneRappelDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			campagneRappelDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public CampagneRappel update(CampagneRappel campagneRappel) {
		CampagneRappel foundedCampagneRappel = findById(campagneRappel.getId());
		if (foundedCampagneRappel == null)
			return null;
		else {
			updateAssociatedLists(campagneRappel);
			return campagneRappelDao.save(campagneRappel);
		}
	}

	@Override
	public CampagneRappel save(CampagneRappel campagneRappel) {

		findCampagne(campagneRappel);
		findTemplateRappel(campagneRappel);

		CampagneRappel savedCampagneRappel = campagneRappelDao.save(campagneRappel);
		saveCampagneRappelChercheurs(savedCampagneRappel, campagneRappel.getCampagneRappelChercheurs());
		return savedCampagneRappel;
	}

	@Override
	public List<CampagneRappel> save(List<CampagneRappel> campagneRappels) {
		List<CampagneRappel> list = new ArrayList<CampagneRappel>();
		for (CampagneRappel campagneRappel : campagneRappels) {
			list.add(save(campagneRappel));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(CampagneRappel campagneRappel) {
		if (campagneRappel.getId() == null)
			return -1;
		CampagneRappel foundedCampagneRappel = findById(campagneRappel.getId());
		if (foundedCampagneRappel == null)
			return -1;
		campagneRappelDao.delete(foundedCampagneRappel);
		return 1;
	}

	public List<CampagneRappel> findByCriteria(CampagneRappelVo campagneRappelVo) {

		String query = "SELECT o FROM CampagneRappel o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", campagneRappelVo.getId());
		query += SearchUtil.addConstraintDate("o", "dateRappel", "=", campagneRappelVo.getDateRappel());
		query += SearchUtil.addConstraint("o", "objetRappel", "LIKE", campagneRappelVo.getObjetRappel());
		query += SearchUtil.addConstraint("o", "messageRappel", "LIKE", campagneRappelVo.getMessageRappel());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateRappel", campagneRappelVo.getDateRappelMin(),
				campagneRappelVo.getDateRappelMax());
		if (campagneRappelVo.getCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "campagne.id", "=", campagneRappelVo.getCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "campagne.code", "LIKE", campagneRappelVo.getCampagneVo().getCode());
		}

		if (campagneRappelVo.getTemplateRappelVo() != null) {
			query += SearchUtil.addConstraint("o", "templateRappel.id", "=",
					campagneRappelVo.getTemplateRappelVo().getId());
			query += SearchUtil.addConstraint("o", "templateRappel.code", "LIKE",
					campagneRappelVo.getTemplateRappelVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveCampagneRappelChercheurs(CampagneRappel campagneRappel,
			List<CampagneRappelChercheur> campagneRappelChercheurs) {

		if (ListUtil.isNotEmpty(campagneRappel.getCampagneRappelChercheurs())) {
			List<CampagneRappelChercheur> savedCampagneRappelChercheurs = new ArrayList<>();
			campagneRappelChercheurs.forEach(element -> {
				element.setCampagneRappel(campagneRappel);
				campagneRappelChercheurService.save(element);
			});
			campagneRappel.setCampagneRappelChercheurs(savedCampagneRappelChercheurs);
		}
	}

	private void findCampagne(CampagneRappel campagneRappel) {
		Campagne loadedCampagne = campagneService.findByIdOrCode(campagneRappel.getCampagne());

		if (loadedCampagne == null) {
			return;
		}
		campagneRappel.setCampagne(loadedCampagne);
	}

	private void findTemplateRappel(CampagneRappel campagneRappel) {
		TemplateRappel loadedTemplateRappel = templateRappelService.findByIdOrCode(campagneRappel.getTemplateRappel());

		if (loadedTemplateRappel == null) {
			return;
		}
		campagneRappel.setTemplateRappel(loadedTemplateRappel);
	}

	@Override
	@Transactional
	public void delete(List<CampagneRappel> campagneRappels) {
		if (ListUtil.isNotEmpty(campagneRappels)) {
			campagneRappels.forEach(e -> campagneRappelDao.delete(e));
		}
	}

	@Override
	public void update(List<CampagneRappel> campagneRappels) {
		if (ListUtil.isNotEmpty(campagneRappels)) {
			campagneRappels.forEach(e -> campagneRappelDao.save(e));
		}
	}

	private void associateCampagneRappelChercheur(CampagneRappel campagneRappel,
			List<CampagneRappelChercheur> campagneRappelChercheur) {
		if (ListUtil.isNotEmpty(campagneRappelChercheur)) {
			campagneRappelChercheur.forEach(e -> e.setCampagneRappel(campagneRappel));
		}
	}

	
	@Override
	public List<List<CampagneRappel>> getToBeSavedAndToBeDeleted(List<CampagneRappel> oldList,
			List<CampagneRappel> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

	
	@Override
	public void sendEmailRappel(CampagneRappel campagneRappel) {
		if (campagneRappel.getCampagneRappelChercheurs() != null) {
			emailService.sendEmailRappel(campagneRappel, campagneRappel.getCampagneRappelChercheurs());
		}
	}

	@Scheduled(cron = "${cron.expression}")
	public void SendAutoEmailRappel() {
	    System.out.println("send email auto Rappel");
	    List<CampagneRappel> campagneRappels = findCampagneRappelByDateRappel();
	    campagneRappels.forEach(campagneRappel -> {
	        List<CampagneChercheurOuverture> campagneChercheurOuvertures = this.campagneChercheurOuvertureAdminService
	                .findByCampagneId(campagneRappel.getCampagne().getId());
	        if(campagneChercheurOuvertures!=null) {
	            emailService.sendAutoEmailRappel(campagneRappel, campagneChercheurOuvertures);
	        }
	    });
	    
	    
	}
	
	
	public List<CampagneRappel> findCampagneRappelByDateRappel() {
		SimpleDateFormat  sdf=new SimpleDateFormat("YYYY-MM-dd");
		String dateString=sdf.format(new Date());
		String query = "SELECT o FROM CampagneRappel o  where 1=1";
		query+=" AND to_date(to_char(o.dateRappel, 'YYYY/MM/DD'), 'YYYY/MM/DD')"+" = "+"\'"+ dateString+"\'";
		List<CampagneRappel> campagneRappels = entityManager.createQuery(query).getResultList();		
		return campagneRappels;
	}
	
	
	  @Override
      public List<CampagneRappel> findByCampagneIdOrderByDateRappel(Long id){
      	String query = "SELECT cr FROM CampagneRappel cr ";
  		query += "inner join  Campagne c on cr.campagne.id = c.id   where 1=1";
  		query += SearchUtil.addConstraint("cr", "campagne.id", "=", id);
  		query += " ORDER BY cr.dateRappel DESC";
  		List<CampagneRappel> campagnesRappel = entityManager.createQuery(query).getResultList();
  		return campagnesRappel;
      	
      }

}
