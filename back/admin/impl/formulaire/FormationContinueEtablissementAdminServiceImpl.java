package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;

import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinueEtablissement;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.FormationContinueEtablissementDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueEtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueEtablissementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueEtablissementAdminServiceImpl extends AbstractServiceImpl<FormationContinueEtablissement>
		implements FormationContinueEtablissementAdminService {

	@Autowired
	private FormationContinueEtablissementDao formationContinueEtablissementDao;

	@Autowired
	private EtablissementAdminService etablissementService;
	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinueEtablissement> findAll() {
		return formationContinueEtablissementDao.findAll();
	}

	@Override
	public List<FormationContinueEtablissement> findByEtablissementCode(String code) {
		return formationContinueEtablissementDao.findByEtablissementCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtablissementCode(String code) {
		return formationContinueEtablissementDao.deleteByEtablissementCode(code);
	}

	@Override
	public List<FormationContinueEtablissement> findByEtablissementId(Long id) {
		return formationContinueEtablissementDao.findByEtablissementId(id);
	}

	@Override
	@Transactional
	public int deleteByEtablissementId(Long id) {
		return formationContinueEtablissementDao.deleteByEtablissementId(id);
	}

	@Override
	public List<FormationContinueEtablissement> findByFormationContinueId(Long id) {
		return formationContinueEtablissementDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinueEtablissementDao.deleteByFormationContinueId(id);
	}

	@Override
	public List<FormationContinueEtablissement> findByPaysCode(String code) {
		return formationContinueEtablissementDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return formationContinueEtablissementDao.deleteByPaysCode(code);
	}

	@Override
	public List<FormationContinueEtablissement> findByPaysId(Long id) {
		return formationContinueEtablissementDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return formationContinueEtablissementDao.deleteByPaysId(id);
	}

	@Override
	public FormationContinueEtablissement findById(Long id) {
		if (id == null)
			return null;
		return formationContinueEtablissementDao.getOne(id);
	}

	@Override
	public FormationContinueEtablissement findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueEtablissementDao.findById(id).isPresent()) {
			formationContinueEtablissementDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinueEtablissement update(FormationContinueEtablissement formationContinueEtablissement) {
		FormationContinueEtablissement foundedFormationContinueEtablissement = findById(
				formationContinueEtablissement.getId());
		if (foundedFormationContinueEtablissement == null)
			return null;
		else {
			return formationContinueEtablissementDao.save(formationContinueEtablissement);
		}
	}

	@Override
	public FormationContinueEtablissement save(FormationContinueEtablissement formationContinueEtablissement) {

		findEtablissement(formationContinueEtablissement);
		findFormationContinue(formationContinueEtablissement);
		findPays(formationContinueEtablissement);

		return formationContinueEtablissementDao.save(formationContinueEtablissement);

	}

	@Override
	public List<FormationContinueEtablissement> save(
			List<FormationContinueEtablissement> formationContinueEtablissements) {
		List<FormationContinueEtablissement> list = new ArrayList<>();
		for (FormationContinueEtablissement formationContinueEtablissement : formationContinueEtablissements) {
			list.add(save(formationContinueEtablissement));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinueEtablissement formationContinueEtablissement) {
		if (formationContinueEtablissement.getId() == null)
			return -1;
		FormationContinueEtablissement foundedFormationContinueEtablissement = findById(
				formationContinueEtablissement.getId());
		if (foundedFormationContinueEtablissement == null)
			return -1;
		formationContinueEtablissementDao.delete(foundedFormationContinueEtablissement);
		return 1;
	}

	public List<FormationContinueEtablissement> findByCriteria(
			FormationContinueEtablissementVo formationContinueEtablissementVo) {

		String query = "SELECT o FROM FormationContinueEtablissement o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueEtablissementVo.getId());
		if (formationContinueEtablissementVo.getEtablissementVo() != null) {
			query += SearchUtil.addConstraint("o", "etablissement.id", "=",
					formationContinueEtablissementVo.getEtablissementVo().getId());
			query += SearchUtil.addConstraint("o", "etablissement.code", "LIKE",
					formationContinueEtablissementVo.getEtablissementVo().getCode());
		}

		if (formationContinueEtablissementVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinueEtablissementVo.getFormationContinueVo().getId());
		}

		if (formationContinueEtablissementVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					formationContinueEtablissementVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					formationContinueEtablissementVo.getPaysVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEtablissement(FormationContinueEtablissement formationContinueEtablissement) {
		Etablissement loadedEtablissement = etablissementService
				.findByIdOrCode(formationContinueEtablissement.getEtablissement());

		if (loadedEtablissement == null) {
			return;
		}
		formationContinueEtablissement.setEtablissement(loadedEtablissement);
	}

	private void findFormationContinue(FormationContinueEtablissement formationContinueEtablissement) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinueEtablissement.getFormationContinue() != null
				&& formationContinueEtablissement.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinueEtablissement.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinueEtablissement.setFormationContinue(loadedFormationContinue);
	}

	private void findPays(FormationContinueEtablissement formationContinueEtablissement) {
		Pays loadedPays = paysService.findByIdOrCode(formationContinueEtablissement.getPays());

		if (loadedPays == null) {
			return;
		}
		formationContinueEtablissement.setPays(loadedPays);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinueEtablissement> formationContinueEtablissements) {
		if (ListUtil.isNotEmpty(formationContinueEtablissements)) {
			formationContinueEtablissements.forEach(e -> formationContinueEtablissementDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinueEtablissement> formationContinueEtablissements) {
		if (ListUtil.isNotEmpty(formationContinueEtablissements)) {
			formationContinueEtablissements.forEach(e -> formationContinueEtablissementDao.save(e));
		}
	}

}
