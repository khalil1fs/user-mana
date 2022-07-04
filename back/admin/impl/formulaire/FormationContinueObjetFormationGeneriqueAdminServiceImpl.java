package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinueObjetFormationGenerique;
import com.ird.faa.bean.referentiel.ObjetFormationGenerique;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.dao.formulaire.FormationContinueObjetFormationGeneriqueDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueObjetFormationGeneriqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.ObjetFormationGeneriqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueObjetFormationGeneriqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueObjetFormationGeneriqueAdminServiceImpl
		extends AbstractServiceImpl<FormationContinueObjetFormationGenerique>
		implements FormationContinueObjetFormationGeneriqueAdminService {

	@Autowired
	private FormationContinueObjetFormationGeneriqueDao formationContinueObjetFormationGeneriqueDao;

	@Autowired
	private ObjetFormationGeneriqueAdminService objetFormationGeneriqueService;
	@Autowired
	private FormationContinueAdminService formationContinueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinueObjetFormationGenerique> findAll() {
		return formationContinueObjetFormationGeneriqueDao.findAll();
	}

	@Override
	public List<FormationContinueObjetFormationGenerique> findByObjetFormationGeneriqueCode(String code) {
		return formationContinueObjetFormationGeneriqueDao.findByObjetFormationGeneriqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByObjetFormationGeneriqueCode(String code) {
		return formationContinueObjetFormationGeneriqueDao.deleteByObjetFormationGeneriqueCode(code);
	}

	@Override
	public List<FormationContinueObjetFormationGenerique> findByObjetFormationGeneriqueId(Long id) {
		return formationContinueObjetFormationGeneriqueDao.findByObjetFormationGeneriqueId(id);
	}

	@Override
	@Transactional
	public int deleteByObjetFormationGeneriqueId(Long id) {
		return formationContinueObjetFormationGeneriqueDao.deleteByObjetFormationGeneriqueId(id);
	}

	@Override
	public List<FormationContinueObjetFormationGenerique> findByFormationContinueId(Long id) {
		return formationContinueObjetFormationGeneriqueDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinueObjetFormationGeneriqueDao.deleteByFormationContinueId(id);
	}

	@Override
	public FormationContinueObjetFormationGenerique findById(Long id) {
		if (id == null)
			return null;
		return formationContinueObjetFormationGeneriqueDao.getOne(id);
	}

	@Override
	public FormationContinueObjetFormationGenerique findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueObjetFormationGeneriqueDao.findById(id).isPresent()) {
			formationContinueObjetFormationGeneriqueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinueObjetFormationGenerique update(
			FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique) {
		FormationContinueObjetFormationGenerique foundedFormationContinueObjetFormationGenerique = findById(
				formationContinueObjetFormationGenerique.getId());
		if (foundedFormationContinueObjetFormationGenerique == null)
			return null;
		else {
			return formationContinueObjetFormationGeneriqueDao.save(formationContinueObjetFormationGenerique);
		}
	}

	@Override
	public FormationContinueObjetFormationGenerique save(
			FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique) {

		findObjetFormationGenerique(formationContinueObjetFormationGenerique);
		findFormationContinue(formationContinueObjetFormationGenerique);

		return formationContinueObjetFormationGeneriqueDao.save(formationContinueObjetFormationGenerique);

	}

	@Override
	public List<FormationContinueObjetFormationGenerique> save(
			List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques) {
		List<FormationContinueObjetFormationGenerique> list = new ArrayList<>();
		for (FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique : formationContinueObjetFormationGeneriques) {
			list.add(save(formationContinueObjetFormationGenerique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique) {
		if (formationContinueObjetFormationGenerique.getId() == null)
			return -1;
		FormationContinueObjetFormationGenerique foundedFormationContinueObjetFormationGenerique = findById(
				formationContinueObjetFormationGenerique.getId());
		if (foundedFormationContinueObjetFormationGenerique == null)
			return -1;
		formationContinueObjetFormationGeneriqueDao.delete(foundedFormationContinueObjetFormationGenerique);
		return 1;
	}

	public List<FormationContinueObjetFormationGenerique> findByCriteria(
			FormationContinueObjetFormationGeneriqueVo formationContinueObjetFormationGeneriqueVo) {

		String query = "SELECT o FROM FormationContinueObjetFormationGenerique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueObjetFormationGeneriqueVo.getId());
		if (formationContinueObjetFormationGeneriqueVo.getObjetFormationGeneriqueVo() != null) {
			query += SearchUtil.addConstraint("o", "objetFormationGenerique.id", "=",
					formationContinueObjetFormationGeneriqueVo.getObjetFormationGeneriqueVo().getId());
			query += SearchUtil.addConstraint("o", "objetFormationGenerique.code", "LIKE",
					formationContinueObjetFormationGeneriqueVo.getObjetFormationGeneriqueVo().getCode());
		}

		if (formationContinueObjetFormationGeneriqueVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinueObjetFormationGeneriqueVo.getFormationContinueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findObjetFormationGenerique(
			FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique) {
		ObjetFormationGenerique loadedObjetFormationGenerique = objetFormationGeneriqueService
				.findByIdOrCode(formationContinueObjetFormationGenerique.getObjetFormationGenerique());

		if (loadedObjetFormationGenerique == null) {
			return;
		}
		formationContinueObjetFormationGenerique.setObjetFormationGenerique(loadedObjetFormationGenerique);
	}

	private void findFormationContinue(
			FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinueObjetFormationGenerique.getFormationContinue() != null
				&& formationContinueObjetFormationGenerique.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinueObjetFormationGenerique.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinueObjetFormationGenerique.setFormationContinue(loadedFormationContinue);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques) {
		if (ListUtil.isNotEmpty(formationContinueObjetFormationGeneriques)) {
			formationContinueObjetFormationGeneriques
					.forEach(e -> formationContinueObjetFormationGeneriqueDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques) {
		if (ListUtil.isNotEmpty(formationContinueObjetFormationGeneriques)) {
			formationContinueObjetFormationGeneriques.forEach(e -> formationContinueObjetFormationGeneriqueDao.save(e));
		}
	}

}
