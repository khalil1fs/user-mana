package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinuePubliqueProfessionel;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.PubliqueProfessionel;
import com.ird.faa.dao.formulaire.FormationContinuePubliqueProfessionelDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinuePubliqueProfessionelAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PubliqueProfessionelAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinuePubliqueProfessionelVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinuePubliqueProfessionelAdminServiceImpl
		extends AbstractServiceImpl<FormationContinuePubliqueProfessionel>
		implements FormationContinuePubliqueProfessionelAdminService {

	@Autowired
	private FormationContinuePubliqueProfessionelDao formationContinuePubliqueProfessionelDao;

	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private PubliqueProfessionelAdminService publiqueProfessionelService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinuePubliqueProfessionel> findAll() {
		return formationContinuePubliqueProfessionelDao.findAll();
	}

	@Override
	public List<FormationContinuePubliqueProfessionel> findByFormationContinueId(Long id) {
		return formationContinuePubliqueProfessionelDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinuePubliqueProfessionelDao.deleteByFormationContinueId(id);
	}

	@Override
	public List<FormationContinuePubliqueProfessionel> findByPubliqueProfessionelId(Long id) {
		return formationContinuePubliqueProfessionelDao.findByPubliqueProfessionelId(id);
	}

	@Override
	@Transactional
	public int deleteByPubliqueProfessionelId(Long id) {
		return formationContinuePubliqueProfessionelDao.deleteByPubliqueProfessionelId(id);
	}

	@Override
	public FormationContinuePubliqueProfessionel findById(Long id) {
		if (id == null)
			return null;
		return formationContinuePubliqueProfessionelDao.getOne(id);
	}

	@Override
	public FormationContinuePubliqueProfessionel findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinuePubliqueProfessionelDao.findById(id).isPresent()) {
			formationContinuePubliqueProfessionelDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinuePubliqueProfessionel update(
			FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel) {
		FormationContinuePubliqueProfessionel foundedFormationContinuePubliqueProfessionel = findById(
				formationContinuePubliqueProfessionel.getId());
		if (foundedFormationContinuePubliqueProfessionel == null)
			return null;
		else {
			return formationContinuePubliqueProfessionelDao.save(formationContinuePubliqueProfessionel);
		}
	}

	@Override
	public FormationContinuePubliqueProfessionel save(
			FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel) {

		findFormationContinue(formationContinuePubliqueProfessionel);
		findPubliqueProfessionel(formationContinuePubliqueProfessionel);

		return formationContinuePubliqueProfessionelDao.save(formationContinuePubliqueProfessionel);

	}

	@Override
	public List<FormationContinuePubliqueProfessionel> save(
			List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels) {
		List<FormationContinuePubliqueProfessionel> list = new ArrayList<>();
		for (FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel : formationContinuePubliqueProfessionels) {
			list.add(save(formationContinuePubliqueProfessionel));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel) {
		if (formationContinuePubliqueProfessionel.getId() == null)
			return -1;
		FormationContinuePubliqueProfessionel foundedFormationContinuePubliqueProfessionel = findById(
				formationContinuePubliqueProfessionel.getId());
		if (foundedFormationContinuePubliqueProfessionel == null)
			return -1;
		formationContinuePubliqueProfessionelDao.delete(foundedFormationContinuePubliqueProfessionel);
		return 1;
	}

	public List<FormationContinuePubliqueProfessionel> findByCriteria(
			FormationContinuePubliqueProfessionelVo formationContinuePubliqueProfessionelVo) {

		String query = "SELECT o FROM FormationContinuePubliqueProfessionel o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinuePubliqueProfessionelVo.getId());
		if (formationContinuePubliqueProfessionelVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinuePubliqueProfessionelVo.getFormationContinueVo().getId());
		}

		if (formationContinuePubliqueProfessionelVo.getPubliqueProfessionelVo() != null) {
			query += SearchUtil.addConstraint("o", "publiqueProfessionel.id", "=",
					formationContinuePubliqueProfessionelVo.getPubliqueProfessionelVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findFormationContinue(FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinuePubliqueProfessionel.getFormationContinue() != null
				&& formationContinuePubliqueProfessionel.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinuePubliqueProfessionel.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinuePubliqueProfessionel.setFormationContinue(loadedFormationContinue);
	}

	private void findPubliqueProfessionel(FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel) {
		PubliqueProfessionel loadedPubliqueProfessionel = null;
		if (formationContinuePubliqueProfessionel.getPubliqueProfessionel() != null
				&& formationContinuePubliqueProfessionel.getPubliqueProfessionel().getId() != null)
			loadedPubliqueProfessionel = publiqueProfessionelService
					.findById(formationContinuePubliqueProfessionel.getPubliqueProfessionel().getId());

		if (loadedPubliqueProfessionel == null) {
			return;
		}
		formationContinuePubliqueProfessionel.setPubliqueProfessionel(loadedPubliqueProfessionel);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels) {
		if (ListUtil.isNotEmpty(formationContinuePubliqueProfessionels)) {
			formationContinuePubliqueProfessionels.forEach(e -> formationContinuePubliqueProfessionelDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels) {
		if (ListUtil.isNotEmpty(formationContinuePubliqueProfessionels)) {
			formationContinuePubliqueProfessionels.forEach(e -> formationContinuePubliqueProfessionelDao.save(e));
		}
	}

}
