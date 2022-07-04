package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinueCommanditaire;
import com.ird.faa.bean.referentiel.Commanditaire;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.FormationContinueCommanditaireDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueCommanditaireAdminService;
import com.ird.faa.service.admin.facade.referentiel.CommanditaireAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueCommanditaireVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueCommanditaireAdminServiceImpl extends AbstractServiceImpl<FormationContinueCommanditaire>
		implements FormationContinueCommanditaireAdminService {

	@Autowired
	private FormationContinueCommanditaireDao formationContinueCommanditaireDao;

	@Autowired
	private CommanditaireAdminService commanditaireService;
	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinueCommanditaire> findAll() {
		return formationContinueCommanditaireDao.findAll();
	}

	@Override
	public List<FormationContinueCommanditaire> findByCommanditaireCode(String code) {
		return formationContinueCommanditaireDao.findByCommanditaireCode(code);
	}

	@Override
	@Transactional
	public int deleteByCommanditaireCode(String code) {
		return formationContinueCommanditaireDao.deleteByCommanditaireCode(code);
	}

	@Override
	public List<FormationContinueCommanditaire> findByCommanditaireId(Long id) {
		return formationContinueCommanditaireDao.findByCommanditaireId(id);
	}

	@Override
	@Transactional
	public int deleteByCommanditaireId(Long id) {
		return formationContinueCommanditaireDao.deleteByCommanditaireId(id);
	}

	@Override
	public List<FormationContinueCommanditaire> findByFormationContinueId(Long id) {
		return formationContinueCommanditaireDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return formationContinueCommanditaireDao.deleteByFormationContinueId(id);
	}

	@Override
	public List<FormationContinueCommanditaire> findByPaysCode(String code) {
		return formationContinueCommanditaireDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return formationContinueCommanditaireDao.deleteByPaysCode(code);
	}

	@Override
	public List<FormationContinueCommanditaire> findByPaysId(Long id) {
		return formationContinueCommanditaireDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return formationContinueCommanditaireDao.deleteByPaysId(id);
	}

	@Override
	public FormationContinueCommanditaire findById(Long id) {
		if (id == null)
			return null;
		return formationContinueCommanditaireDao.getOne(id);
	}

	@Override
	public FormationContinueCommanditaire findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueCommanditaireDao.findById(id).isPresent()) {
			formationContinueCommanditaireDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinueCommanditaire update(FormationContinueCommanditaire formationContinueCommanditaire) {
		FormationContinueCommanditaire foundedFormationContinueCommanditaire = findById(
				formationContinueCommanditaire.getId());
		if (foundedFormationContinueCommanditaire == null)
			return null;
		else {
			return formationContinueCommanditaireDao.save(formationContinueCommanditaire);
		}
	}

	@Override
	public FormationContinueCommanditaire save(FormationContinueCommanditaire formationContinueCommanditaire) {

		findCommanditaire(formationContinueCommanditaire);
		findFormationContinue(formationContinueCommanditaire);
		findPays(formationContinueCommanditaire);

		return formationContinueCommanditaireDao.save(formationContinueCommanditaire);

	}

	@Override
	public List<FormationContinueCommanditaire> save(
			List<FormationContinueCommanditaire> formationContinueCommanditaires) {
		List<FormationContinueCommanditaire> list = new ArrayList<>();
		for (FormationContinueCommanditaire formationContinueCommanditaire : formationContinueCommanditaires) {
			list.add(save(formationContinueCommanditaire));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(FormationContinueCommanditaire formationContinueCommanditaire) {
		if (formationContinueCommanditaire.getId() == null)
			return -1;
		FormationContinueCommanditaire foundedFormationContinueCommanditaire = findById(
				formationContinueCommanditaire.getId());
		if (foundedFormationContinueCommanditaire == null)
			return -1;
		formationContinueCommanditaireDao.delete(foundedFormationContinueCommanditaire);
		return 1;
	}

	public List<FormationContinueCommanditaire> findByCriteria(
			FormationContinueCommanditaireVo formationContinueCommanditaireVo) {

		String query = "SELECT o FROM FormationContinueCommanditaire o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueCommanditaireVo.getId());
		if (formationContinueCommanditaireVo.getCommanditaireVo() != null) {
			query += SearchUtil.addConstraint("o", "commanditaire.id", "=",
					formationContinueCommanditaireVo.getCommanditaireVo().getId());
			query += SearchUtil.addConstraint("o", "commanditaire.code", "LIKE",
					formationContinueCommanditaireVo.getCommanditaireVo().getCode());
		}

		if (formationContinueCommanditaireVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					formationContinueCommanditaireVo.getFormationContinueVo().getId());
		}

		if (formationContinueCommanditaireVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					formationContinueCommanditaireVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					formationContinueCommanditaireVo.getPaysVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findCommanditaire(FormationContinueCommanditaire formationContinueCommanditaire) {
		Commanditaire loadedCommanditaire = commanditaireService
				.findByIdOrCode(formationContinueCommanditaire.getCommanditaire());

		if (loadedCommanditaire == null) {
			return;
		}
		formationContinueCommanditaire.setCommanditaire(loadedCommanditaire);
	}

	private void findFormationContinue(FormationContinueCommanditaire formationContinueCommanditaire) {
		FormationContinue loadedFormationContinue = null;
		if (formationContinueCommanditaire.getFormationContinue() != null
				&& formationContinueCommanditaire.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(formationContinueCommanditaire.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		formationContinueCommanditaire.setFormationContinue(loadedFormationContinue);
	}

	private void findPays(FormationContinueCommanditaire formationContinueCommanditaire) {
		Pays loadedPays = paysService.findByIdOrCode(formationContinueCommanditaire.getPays());

		if (loadedPays == null) {
			return;
		}
		formationContinueCommanditaire.setPays(loadedPays);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinueCommanditaire> formationContinueCommanditaires) {
		if (ListUtil.isNotEmpty(formationContinueCommanditaires)) {
			formationContinueCommanditaires.forEach(e -> formationContinueCommanditaireDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinueCommanditaire> formationContinueCommanditaires) {
		if (ListUtil.isNotEmpty(formationContinueCommanditaires)) {
			formationContinueCommanditaires.forEach(e -> formationContinueCommanditaireDao.save(e));
		}
	}

}
