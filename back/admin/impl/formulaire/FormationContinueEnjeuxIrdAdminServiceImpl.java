package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinueEnjeuxIrd;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.dao.formulaire.FormationContinueEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueEnjeuxIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueEnjeuxIrdAdminServiceImpl extends AbstractServiceImpl<FormationContinueEnjeuxIrd>
		implements FormationContinueEnjeuxIrdAdminService {

	@Autowired
	private FormationContinueEnjeuxIrdDao formationContinueEnjeuxIrdDao;

	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private EnjeuxIrdAdminService enjeuxIrdService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinueEnjeuxIrd> findAll() {
		return formationContinueEnjeuxIrdDao.findAll();
	}

	@Override
	public List<FormationContinueEnjeuxIrd> findByEnjeuxIrdCode(String code) {
		return formationContinueEnjeuxIrdDao.findByEnjeuxIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdCode(String code) {
		return formationContinueEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
	}

	@Override
	public List<FormationContinueEnjeuxIrd> findByEnjeuxIrdId(Long id) {
		return formationContinueEnjeuxIrdDao.findByEnjeuxIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdId(Long id) {
		return formationContinueEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
	}

	@Override
	public List<FormationContinueEnjeuxIrd> findByFormationContinueId(Long id) {
		return formationContinueEnjeuxIrdDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinueEnjeuxIrdDao.deleteByFormationContinueId(id);
	}

	@Override
	public FormationContinueEnjeuxIrd findById(Long id) {
		if (id == null)
			return null;
		return formationContinueEnjeuxIrdDao.getOne(id);
	}

	@Override
	public FormationContinueEnjeuxIrd findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueEnjeuxIrdDao.findById(id).isPresent()) {
			formationContinueEnjeuxIrdDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinueEnjeuxIrd update(FormationContinueEnjeuxIrd formationContinueEnjeuxIrd) {
		FormationContinueEnjeuxIrd foundedFormationContinueEnjeuxIrd = findById(formationContinueEnjeuxIrd.getId());
		if (foundedFormationContinueEnjeuxIrd == null)
			return null;
		else {
			return formationContinueEnjeuxIrdDao.save(formationContinueEnjeuxIrd);
		}
	}

	@Override
	public FormationContinueEnjeuxIrd save(FormationContinueEnjeuxIrd formationContinueEnjeuxIrd) {

		findEnjeuxIrd(formationContinueEnjeuxIrd);
		findFormationContinue(formationContinueEnjeuxIrd);

		return formationContinueEnjeuxIrdDao.save(formationContinueEnjeuxIrd);

	}

	@Override
	public List<FormationContinueEnjeuxIrd> save(List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds) {
		List<FormationContinueEnjeuxIrd> list = new ArrayList<>();
		for (FormationContinueEnjeuxIrd formationContinueEnjeuxIrd : formationContinueEnjeuxIrds) {
			list.add(save(formationContinueEnjeuxIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinueEnjeuxIrd formationContinueEnjeuxIrd) {
		if (formationContinueEnjeuxIrd.getId() == null)
			return -1;
		FormationContinueEnjeuxIrd foundedFormationContinueEnjeuxIrd = findById(formationContinueEnjeuxIrd.getId());
		if (foundedFormationContinueEnjeuxIrd == null)
			return -1;
		formationContinueEnjeuxIrdDao.delete(foundedFormationContinueEnjeuxIrd);
		return 1;
	}

	public List<FormationContinueEnjeuxIrd> findByCriteria(FormationContinueEnjeuxIrdVo formationContinueEnjeuxIrdVo) {

		String query = "SELECT o FROM FormationContinueEnjeuxIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueEnjeuxIrdVo.getId());
		if (formationContinueEnjeuxIrdVo.getEnjeuxIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "enjeuxIrd.id", "=",
					formationContinueEnjeuxIrdVo.getEnjeuxIrdVo().getId());
			query += SearchUtil.addConstraint("o", "enjeuxIrd.code", "LIKE",
					formationContinueEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
		}

		if (formationContinueEnjeuxIrdVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinueEnjeuxIrdVo.getFormationContinueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEnjeuxIrd(FormationContinueEnjeuxIrd formationContinueEnjeuxIrd) {
		EnjeuxIrd loadedEnjeuxIrd = enjeuxIrdService.findByIdOrCode(formationContinueEnjeuxIrd.getEnjeuxIrd());

		if (loadedEnjeuxIrd == null) {
			return;
		}
		formationContinueEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
	}

	private void findFormationContinue(FormationContinueEnjeuxIrd formationContinueEnjeuxIrd) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinueEnjeuxIrd.getFormationContinue() != null
				&& formationContinueEnjeuxIrd.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinueEnjeuxIrd.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinueEnjeuxIrd.setFormationContinue(loadedFormationContinue);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(formationContinueEnjeuxIrds)) {
			formationContinueEnjeuxIrds.forEach(e -> formationContinueEnjeuxIrdDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(formationContinueEnjeuxIrds)) {
			formationContinueEnjeuxIrds.forEach(e -> formationContinueEnjeuxIrdDao.save(e));
		}
	}

}
