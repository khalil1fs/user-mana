package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEvenementColloqueScientifique;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueEvenementColloqueScientifiqueDao;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEvenementColloqueScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEvenementColloqueScientifiqueVo;

@Service
public class DisciplineScientifiqueEvenementColloqueScientifiqueAdminServiceImpl
		extends AbstractServiceImpl<DisciplineScientifiqueEvenementColloqueScientifique>
		implements DisciplineScientifiqueEvenementColloqueScientifiqueAdminService {

	@Autowired
	private DisciplineScientifiqueEvenementColloqueScientifiqueDao disciplineScientifiqueEvenementColloqueScientifiqueDao;

	@Autowired
	private DisciplineScientifiqueAdminService disciplineScientifiqueService;
	@Autowired
	private EvenementColloqueScienntifiqueAdminService evenementColloqueScienntifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DisciplineScientifiqueEvenementColloqueScientifique> findAll() {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.findAll();
	}

	@Override
	public List<DisciplineScientifiqueEvenementColloqueScientifique> findByEvenementColloqueScienntifiqueId(Long id) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.findByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByEvenementColloqueScienntifiqueId(Long id) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.deleteByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	public List<DisciplineScientifiqueEvenementColloqueScientifique> findByDisciplineScientifiqueCode(String code) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.findByDisciplineScientifiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueCode(String code) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
	}

	@Override
	public List<DisciplineScientifiqueEvenementColloqueScientifique> findByDisciplineScientifiqueId(Long id) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.findByDisciplineScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueId(Long id) {
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.deleteByDisciplineScientifiqueId(id);
	}

	@Override
	public DisciplineScientifiqueEvenementColloqueScientifique findById(Long id) {
		if (id == null)
			return null;
		return disciplineScientifiqueEvenementColloqueScientifiqueDao.getOne(id);
	}

	@Override
	public DisciplineScientifiqueEvenementColloqueScientifique findByIdWithAssociatedList(Long id) {
		DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique = findById(
				id);
		return disciplineScientifiqueEvenementColloqueScientifique;
	}

	@Transactional
	public int deleteById(Long id) {
		if (disciplineScientifiqueEvenementColloqueScientifiqueDao.findById(id) == null)
			return 0;
		else {
			disciplineScientifiqueEvenementColloqueScientifiqueDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DisciplineScientifiqueEvenementColloqueScientifique update(
			DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique) {
		DisciplineScientifiqueEvenementColloqueScientifique foundedDisciplineScientifiqueEvenementColloqueScientifique = findById(
				disciplineScientifiqueEvenementColloqueScientifique.getId());
		if (foundedDisciplineScientifiqueEvenementColloqueScientifique == null)
			return null;
		else {
			return disciplineScientifiqueEvenementColloqueScientifiqueDao
					.save(disciplineScientifiqueEvenementColloqueScientifique);
		}
	}

	@Override
	public DisciplineScientifiqueEvenementColloqueScientifique save(
			DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique) {

		findEvenementColloqueScienntifique(disciplineScientifiqueEvenementColloqueScientifique);
		findDisciplineScientifique(disciplineScientifiqueEvenementColloqueScientifique);

		DisciplineScientifiqueEvenementColloqueScientifique savedDisciplineScientifiqueEvenementColloqueScientifique = disciplineScientifiqueEvenementColloqueScientifiqueDao
				.save(disciplineScientifiqueEvenementColloqueScientifique);
		return savedDisciplineScientifiqueEvenementColloqueScientifique;
	}

	@Override
	public List<DisciplineScientifiqueEvenementColloqueScientifique> save(
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifiques) {
		List<DisciplineScientifiqueEvenementColloqueScientifique> list = new ArrayList<DisciplineScientifiqueEvenementColloqueScientifique>();
		for (DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique : disciplineScientifiqueEvenementColloqueScientifiques) {
			list.add(save(disciplineScientifiqueEvenementColloqueScientifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(
			DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique) {
		if (disciplineScientifiqueEvenementColloqueScientifique.getId() == null)
			return -1;
		DisciplineScientifiqueEvenementColloqueScientifique foundedDisciplineScientifiqueEvenementColloqueScientifique = findById(
				disciplineScientifiqueEvenementColloqueScientifique.getId());
		if (foundedDisciplineScientifiqueEvenementColloqueScientifique == null)
			return -1;
		disciplineScientifiqueEvenementColloqueScientifiqueDao
				.delete(foundedDisciplineScientifiqueEvenementColloqueScientifique);
		return 1;
	}

	public List<DisciplineScientifiqueEvenementColloqueScientifique> findByCriteria(
			DisciplineScientifiqueEvenementColloqueScientifiqueVo disciplineScientifiqueEvenementColloqueScientifiqueVo) {

		String query = "SELECT o FROM DisciplineScientifiqueEvenementColloqueScientifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=",
				disciplineScientifiqueEvenementColloqueScientifiqueVo.getId());
		if (disciplineScientifiqueEvenementColloqueScientifiqueVo.getEvenementColloqueScienntifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "evenementColloqueScienntifique.id", "=",
					disciplineScientifiqueEvenementColloqueScientifiqueVo.getEvenementColloqueScienntifiqueVo()
							.getId());
		}

		if (disciplineScientifiqueEvenementColloqueScientifiqueVo.getDisciplineScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "disciplineScientifique.id", "=",
					disciplineScientifiqueEvenementColloqueScientifiqueVo.getDisciplineScientifiqueVo().getId());
			query += SearchUtil.addConstraint("o", "disciplineScientifique.code", "LIKE",
					disciplineScientifiqueEvenementColloqueScientifiqueVo.getDisciplineScientifiqueVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEvenementColloqueScienntifique(
			DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique) {
		EvenementColloqueScienntifique loadedEvenementColloqueScienntifique = null;
		if (disciplineScientifiqueEvenementColloqueScientifique.getEvenementColloqueScienntifique() != null
				&& disciplineScientifiqueEvenementColloqueScientifique.getEvenementColloqueScienntifique()
						.getId() != null)
			loadedEvenementColloqueScienntifique = evenementColloqueScienntifiqueService.findById(
					disciplineScientifiqueEvenementColloqueScientifique.getEvenementColloqueScienntifique().getId());

		if (loadedEvenementColloqueScienntifique == null) {
			return;
		}
		disciplineScientifiqueEvenementColloqueScientifique
				.setEvenementColloqueScienntifique(loadedEvenementColloqueScienntifique);
	}

	private void findDisciplineScientifique(
			DisciplineScientifiqueEvenementColloqueScientifique disciplineScientifiqueEvenementColloqueScientifique) {
		DisciplineScientifique loadedDisciplineScientifique = disciplineScientifiqueService
				.findByIdOrCode(disciplineScientifiqueEvenementColloqueScientifique.getDisciplineScientifique());

		if (loadedDisciplineScientifique == null) {
			return;
		}
		disciplineScientifiqueEvenementColloqueScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
	}

	@Override
	@Transactional
	public void delete(
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifiques) {
		if (ListUtil.isNotEmpty(disciplineScientifiqueEvenementColloqueScientifiques)) {
			disciplineScientifiqueEvenementColloqueScientifiques
					.forEach(e -> disciplineScientifiqueEvenementColloqueScientifiqueDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifiques) {
		if (ListUtil.isNotEmpty(disciplineScientifiqueEvenementColloqueScientifiques)) {
			disciplineScientifiqueEvenementColloqueScientifiques
					.forEach(e -> disciplineScientifiqueEvenementColloqueScientifiqueDao.save(e));
		}
	}

	@Override
	public List<List<DisciplineScientifiqueEvenementColloqueScientifique>> getToBeSavedAndToBeDeleted(
			List<DisciplineScientifiqueEvenementColloqueScientifique> oldList,
			List<DisciplineScientifiqueEvenementColloqueScientifique> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
