package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.formulaire.GestionEquipe;
import com.ird.faa.bean.formulaire.GestionEquipeDetail;
import com.ird.faa.dao.formulaire.GestionEquipeDetailDao;
import com.ird.faa.service.admin.facade.formulaire.GestionEquipeAdminService;
import com.ird.faa.service.admin.facade.formulaire.GestionEquipeDetailAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.GestionEquipeDetailVo;

@Service
public class GestionEquipeDetailAdminServiceImpl extends AbstractServiceImpl<GestionEquipeDetail>
		implements GestionEquipeDetailAdminService {

	@Autowired
	private GestionEquipeDetailDao gestionEquipeDetailDao;

	@Autowired
	private GestionEquipeAdminService gestionEquipeService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<GestionEquipeDetail> findAll() {
		return gestionEquipeDetailDao.findAll();
	}

	@Override
	public List<GestionEquipeDetail> findByGestionEquipeId(Long id) {
		return gestionEquipeDetailDao.findByGestionEquipeId(id);
	}

	@Override
	@Transactional
	public int deleteByGestionEquipeId(Long id) {
		return gestionEquipeDetailDao.deleteByGestionEquipeId(id);
	}

	@Override
	public GestionEquipeDetail findById(Long id) {
		if (id == null)
			return null;
		return gestionEquipeDetailDao.getOne(id);
	}

	@Override
	public GestionEquipeDetail findByIdWithAssociatedList(Long id) {
		GestionEquipeDetail gestionEquipeDetail = findById(id);
		return gestionEquipeDetail;
	}

	@Transactional
	public int deleteById(Long id) {
		if (gestionEquipeDetailDao.findById(id) == null)
			return 0;
		else {
			gestionEquipeDetailDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public GestionEquipeDetail update(GestionEquipeDetail gestionEquipeDetail) {
		GestionEquipeDetail foundedGestionEquipeDetail = findById(gestionEquipeDetail.getId());
		if (foundedGestionEquipeDetail == null)
			return null;
		else {
			return gestionEquipeDetailDao.save(gestionEquipeDetail);
		}
	}

	@Override
	public GestionEquipeDetail save(GestionEquipeDetail gestionEquipeDetail) {

		findGestionEquipe(gestionEquipeDetail);

		GestionEquipeDetail savedGestionEquipeDetail = gestionEquipeDetailDao.save(gestionEquipeDetail);
		return savedGestionEquipeDetail;
	}

	@Override
	public List<GestionEquipeDetail> save(List<GestionEquipeDetail> gestionEquipeDetails) {
		List<GestionEquipeDetail> list = new ArrayList<GestionEquipeDetail>();
		for (GestionEquipeDetail gestionEquipeDetail : gestionEquipeDetails) {
			list.add(save(gestionEquipeDetail));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(GestionEquipeDetail gestionEquipeDetail) {
		if (gestionEquipeDetail.getId() == null)
			return -1;
		GestionEquipeDetail foundedGestionEquipeDetail = findById(gestionEquipeDetail.getId());
		if (foundedGestionEquipeDetail == null)
			return -1;
		gestionEquipeDetailDao.delete(foundedGestionEquipeDetail);
		return 1;
	}

	public List<GestionEquipeDetail> findByCriteria(GestionEquipeDetailVo gestionEquipeDetailVo) {

		String query = "SELECT o FROM GestionEquipeDetail o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", gestionEquipeDetailVo.getId());
		query += SearchUtil.addConstraint("o", "nombrePersonneEncadre", "=",
				gestionEquipeDetailVo.getNombrePersonneEncadre());
		query += SearchUtil.addConstraint("o", "nombrePersonneHorsIrd", "=",
				gestionEquipeDetailVo.getNombrePersonneHorsIrd());
		query += SearchUtil.addConstraint("o", "nombrePersonneSousConventions", "=",
				gestionEquipeDetailVo.getNombrePersonneSousConventions());
		query += SearchUtil.addConstraint("o", "formationManagement", "=",
				gestionEquipeDetailVo.getFormationManagement());
		query += SearchUtil.addConstraintMinMax("o", "nombrePersonneEncadre",
				gestionEquipeDetailVo.getNombrePersonneEncadreMin(),
				gestionEquipeDetailVo.getNombrePersonneEncadreMax());
		query += SearchUtil.addConstraintMinMax("o", "nombrePersonneHorsIrd",
				gestionEquipeDetailVo.getNombrePersonneHorsIrdMin(),
				gestionEquipeDetailVo.getNombrePersonneHorsIrdMax());
		query += SearchUtil.addConstraintMinMax("o", "nombrePersonneSousConventions",
				gestionEquipeDetailVo.getNombrePersonneSousConventionsMin(),
				gestionEquipeDetailVo.getNombrePersonneSousConventionsMax());
		if (gestionEquipeDetailVo.getGestionEquipeVo() != null) {
			query += SearchUtil.addConstraint("o", "gestionEquipe.id", "=",
					gestionEquipeDetailVo.getGestionEquipeVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findGestionEquipe(GestionEquipeDetail gestionEquipeDetail) {
		GestionEquipe loadedGestionEquipe = null;
		if (gestionEquipeDetail.getGestionEquipe() != null && gestionEquipeDetail.getGestionEquipe().getId() != null)
			loadedGestionEquipe = gestionEquipeService.findById(gestionEquipeDetail.getGestionEquipe().getId());

		if (loadedGestionEquipe == null) {
			return;
		}
		gestionEquipeDetail.setGestionEquipe(loadedGestionEquipe);
	}

	@Override
	@Transactional
	public void delete(List<GestionEquipeDetail> gestionEquipeDetails) {
		if (ListUtil.isNotEmpty(gestionEquipeDetails)) {
			gestionEquipeDetails.forEach(e -> gestionEquipeDetailDao.delete(e));
		}
	}

	@Override
	public void update(List<GestionEquipeDetail> gestionEquipeDetails) {
		if (ListUtil.isNotEmpty(gestionEquipeDetails)) {
			gestionEquipeDetails.forEach(e -> gestionEquipeDetailDao.save(e));
		}
	}

	@Override
	public List<List<GestionEquipeDetail>> getToBeSavedAndToBeDeleted(List<GestionEquipeDetail> oldList,
			List<GestionEquipeDetail> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
