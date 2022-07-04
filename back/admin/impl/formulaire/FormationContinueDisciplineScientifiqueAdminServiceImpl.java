package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinueDisciplineScientifique;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.dao.formulaire.FormationContinueDisciplineScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueDisciplineScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueDisciplineScientifiqueAdminServiceImpl
		extends AbstractServiceImpl<FormationContinueDisciplineScientifique>
		implements FormationContinueDisciplineScientifiqueAdminService {

	@Autowired
	private FormationContinueDisciplineScientifiqueDao formationContinueDisciplineScientifiqueDao;

	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private DisciplineScientifiqueAdminService disciplineScientifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinueDisciplineScientifique> findAll() {
		return formationContinueDisciplineScientifiqueDao.findAll();
	}

	@Override
	public List<FormationContinueDisciplineScientifique> findByFormationContinueId(Long id) {
		return formationContinueDisciplineScientifiqueDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinueDisciplineScientifiqueDao.deleteByFormationContinueId(id);
	}

	@Override
	public List<FormationContinueDisciplineScientifique> findByDisciplineScientifiqueCode(String code) {
		return formationContinueDisciplineScientifiqueDao.findByDisciplineScientifiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueCode(String code) {
		return formationContinueDisciplineScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
	}

	@Override
	public List<FormationContinueDisciplineScientifique> findByDisciplineScientifiqueId(Long id) {
		return formationContinueDisciplineScientifiqueDao.findByDisciplineScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueId(Long id) {
		return formationContinueDisciplineScientifiqueDao.deleteByDisciplineScientifiqueId(id);
	}

	@Override
	public FormationContinueDisciplineScientifique findById(Long id) {
		if (id == null)
			return null;
		return formationContinueDisciplineScientifiqueDao.getOne(id);
	}

	@Override
	public FormationContinueDisciplineScientifique findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueDisciplineScientifiqueDao.findById(id).isPresent()) {
			formationContinueDisciplineScientifiqueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinueDisciplineScientifique update(
			FormationContinueDisciplineScientifique formationContinueDisciplineScientifique) {
		FormationContinueDisciplineScientifique foundedFormationContinueDisciplineScientifique = findById(
				formationContinueDisciplineScientifique.getId());
		if (foundedFormationContinueDisciplineScientifique == null)
			return null;
		else {
			return formationContinueDisciplineScientifiqueDao.save(formationContinueDisciplineScientifique);
		}
	}

	@Override
	public FormationContinueDisciplineScientifique save(
			FormationContinueDisciplineScientifique formationContinueDisciplineScientifique) {

		findFormationContinue(formationContinueDisciplineScientifique);
		findDisciplineScientifique(formationContinueDisciplineScientifique);

		return formationContinueDisciplineScientifiqueDao.save(formationContinueDisciplineScientifique);

	}

	@Override
	public List<FormationContinueDisciplineScientifique> save(
			List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques) {
		List<FormationContinueDisciplineScientifique> list = new ArrayList<>();
		for (FormationContinueDisciplineScientifique formationContinueDisciplineScientifique : formationContinueDisciplineScientifiques) {
			list.add(save(formationContinueDisciplineScientifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinueDisciplineScientifique formationContinueDisciplineScientifique) {
		if (formationContinueDisciplineScientifique.getId() == null)
			return -1;
		FormationContinueDisciplineScientifique foundedFormationContinueDisciplineScientifique = findById(
				formationContinueDisciplineScientifique.getId());
		if (foundedFormationContinueDisciplineScientifique == null)
			return -1;
		formationContinueDisciplineScientifiqueDao.delete(foundedFormationContinueDisciplineScientifique);
		return 1;
	}

	public List<FormationContinueDisciplineScientifique> findByCriteria(
			FormationContinueDisciplineScientifiqueVo formationContinueDisciplineScientifiqueVo) {

		String query = "SELECT o FROM FormationContinueDisciplineScientifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueDisciplineScientifiqueVo.getId());
		if (formationContinueDisciplineScientifiqueVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinueDisciplineScientifiqueVo.getFormationContinueVo().getId());
		}

		if (formationContinueDisciplineScientifiqueVo.getDisciplineScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "disciplineScientifique.id", "=",
					formationContinueDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getId());
			query += SearchUtil.addConstraint("o", "disciplineScientifique.code", "LIKE",
					formationContinueDisciplineScientifiqueVo.getDisciplineScientifiqueVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findFormationContinue(
			FormationContinueDisciplineScientifique formationContinueDisciplineScientifique) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinueDisciplineScientifique.getFormationContinue() != null
				&& formationContinueDisciplineScientifique.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinueDisciplineScientifique.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinueDisciplineScientifique.setFormationContinue(loadedFormationContinue);
	}

	private void findDisciplineScientifique(
			FormationContinueDisciplineScientifique formationContinueDisciplineScientifique) {
		DisciplineScientifique loadedDisciplineScientifique = disciplineScientifiqueService
				.findByIdOrCode(formationContinueDisciplineScientifique.getDisciplineScientifique());

		if (loadedDisciplineScientifique == null) {
			return;
		}
		formationContinueDisciplineScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques) {
		if (ListUtil.isNotEmpty(formationContinueDisciplineScientifiques)) {
			formationContinueDisciplineScientifiques.forEach(e -> formationContinueDisciplineScientifiqueDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques) {
		if (ListUtil.isNotEmpty(formationContinueDisciplineScientifiques)) {
			formationContinueDisciplineScientifiques.forEach(e -> formationContinueDisciplineScientifiqueDao.save(e));
		}
	}

}
