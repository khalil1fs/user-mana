package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.ModaliteIntervention;
import com.ird.faa.dao.referentiel.ModaliteInterventionDao;
import com.ird.faa.service.admin.facade.referentiel.ModaliteInterventionAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteInterventionVo;

@Service
public class ModaliteInterventionAdminServiceImpl extends AbstractServiceImpl<ModaliteIntervention>
		implements ModaliteInterventionAdminService {

	@Autowired
	private ModaliteInterventionDao modaliteInterventionDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ModaliteIntervention> findAll() {
	return 	modaliteInterventionDao.findAll();
	}

	@Override
	public ModaliteIntervention findByCode(String code) {
		if (code == null)
			return null;
		return modaliteInterventionDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return modaliteInterventionDao.deleteByCode(code);
	}

	@Override
	public ModaliteIntervention findByIdOrCode(ModaliteIntervention modaliteIntervention) {
		ModaliteIntervention resultat = null;
		if (modaliteIntervention == null
				|| (modaliteIntervention.getCode() == null && modaliteIntervention.getId() == null))
			return resultat;
		else {
			if (modaliteIntervention.getId() != null) {
				resultat = modaliteInterventionDao.findById(modaliteIntervention.getId()).get();
			} else if (StringUtil.isNotEmpty(modaliteIntervention.getCode())) {
				resultat = modaliteInterventionDao.findByCode(modaliteIntervention.getCode());
			}
			return resultat;
		}
	}

	@Override
	public ModaliteIntervention findById(Long id) {
		if (id == null)
			return null;
		return modaliteInterventionDao.getOne(id);
	}

	@Override
	public ModaliteIntervention findByIdWithAssociatedList(Long id) {
		ModaliteIntervention modaliteIntervention = findById(id);
		return modaliteIntervention;
	}

	@Override
	public ModaliteIntervention archiver(ModaliteIntervention modaliteIntervention) {
		if (modaliteIntervention.getArchive() == null) {
			modaliteIntervention.setArchive(false);
		}
		modaliteIntervention.setArchive(true);
		modaliteIntervention.setDateArchivage(new Date());
		modaliteInterventionDao.save(modaliteIntervention);
		return modaliteIntervention;

	}

	@Override
	public ModaliteIntervention desarchiver(ModaliteIntervention modaliteIntervention) {
		if (modaliteIntervention.getArchive() == null) {
			modaliteIntervention.setArchive(false);
		}
		modaliteIntervention.setArchive(false);
		modaliteIntervention.setDateArchivage(null);
		modaliteInterventionDao.save(modaliteIntervention);
		return modaliteIntervention;
	}

	@Transactional
	public int deleteById(Long id) {
		if (modaliteInterventionDao.findById(id) == null)
			return 0;
		else {
			modaliteInterventionDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public ModaliteIntervention update(ModaliteIntervention modaliteIntervention) {
		ModaliteIntervention foundedModaliteIntervention = findById(modaliteIntervention.getId());
		if (foundedModaliteIntervention == null)
			return null;
		else {
			prepare(foundedModaliteIntervention);
			return modaliteInterventionDao.save(modaliteIntervention);
		}
	}

	@Override
	public ModaliteIntervention save(ModaliteIntervention modaliteIntervention) {
		ModaliteIntervention foundedModaliteIntervention = findByCode(modaliteIntervention.getCode());
		if (foundedModaliteIntervention != null)
			return null;

		prepare(foundedModaliteIntervention);
		ModaliteIntervention savedModaliteIntervention = modaliteInterventionDao.save(modaliteIntervention);
		return savedModaliteIntervention;
	}

	@Override
	public List<ModaliteIntervention> save(List<ModaliteIntervention> modaliteInterventions) {
		List<ModaliteIntervention> list = new ArrayList<ModaliteIntervention>();
		for (ModaliteIntervention modaliteIntervention : modaliteInterventions) {
			list.add(save(modaliteIntervention));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ModaliteIntervention modaliteIntervention) {
		if (modaliteIntervention.getCode() == null)
			return -1;

		ModaliteIntervention foundedModaliteIntervention = findByCode(modaliteIntervention.getCode());
		if (foundedModaliteIntervention == null)
			return -1;
		modaliteInterventionDao.delete(foundedModaliteIntervention);
		return 1;
	}

	public List<ModaliteIntervention> findByCriteria(ModaliteInterventionVo modaliteInterventionVo) {

		String query = "SELECT o FROM ModaliteIntervention o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", modaliteInterventionVo.getId());
		query += SearchUtil.addConstraint("o", "libelle", "LIKE", modaliteInterventionVo.getLibelle());
		query += SearchUtil.addConstraint("o", "code", "LIKE", modaliteInterventionVo.getCode());
		query += SearchUtil.addConstraint("o", "description", "LIKE", modaliteInterventionVo.getDescription());
		query += SearchUtil.addConstraint("o", "archive", "=", modaliteInterventionVo.getArchive());
		query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", modaliteInterventionVo.getDateArchivage());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", modaliteInterventionVo.getDateArchivageMin(),
				modaliteInterventionVo.getDateArchivageMax());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<ModaliteIntervention> modaliteInterventions) {
		if (ListUtil.isNotEmpty(modaliteInterventions)) {
			modaliteInterventions.forEach(e -> modaliteInterventionDao.delete(e));
		}
	}

	@Override
	public void update(List<ModaliteIntervention> modaliteInterventions) {
		if (ListUtil.isNotEmpty(modaliteInterventions)) {
			modaliteInterventions.forEach(e -> modaliteInterventionDao.save(e));
		}
	}

	@Override
	public List<List<ModaliteIntervention>> getToBeSavedAndToBeDeleted(List<ModaliteIntervention> oldList,
			List<ModaliteIntervention> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
