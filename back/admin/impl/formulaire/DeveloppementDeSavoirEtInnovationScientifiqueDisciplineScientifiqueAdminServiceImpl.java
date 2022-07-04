package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
import com.ird.faa.dao.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo;

@Service
public class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminServiceImpl
		extends AbstractServiceImpl<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique>
		implements DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminService {

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao;

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService;
	@Autowired
	private DisciplineScientifiqueAdminService disciplineScientifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> findAll() {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.findAll();
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> findByDisciplineScientifiqueCode(
			String code) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.findByDisciplineScientifiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
				.deleteByDisciplineScientifiqueCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> findByDisciplineScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.findByDisciplineScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDisciplineScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.deleteByDisciplineScientifiqueId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
				.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
				.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique findById(Long id) {
		if (id == null)
			return null;
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.getOne(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique findByIdWithAssociatedList(Long id) {
		DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique = findById(
				id);
		return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
	}

	@Transactional
	public int deleteById(Long id) {
		if (developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.findById(id) == null)
			return 0;
		else {
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique update(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {
		DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique foundedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = findById(
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique == null)
			return null;
		else {
			return developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
					.save(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique save(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {

		findDisciplineScientifique(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
		findDeveloppementDeSavoirEtInnovationScientifique(
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);

		DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique savedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
				.save(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
		return savedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> save(
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques) {
		List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> list = new ArrayList<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique>();
		for (DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique : developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques) {
			list.add(save(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {
		if (developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.getId() == null)
			return -1;
		DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique foundedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = findById(
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique == null)
			return -1;
		developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao
				.delete(foundedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
		return 1;
	}

	public List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> findByCriteria(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {

		String query = "SELECT o FROM DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=",
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo.getId());
		if (developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo.getDisciplineScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "disciplineScientifique.id", "=",
					developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo.getDisciplineScientifiqueVo()
							.getId());
			query += SearchUtil.addConstraint("o", "disciplineScientifique.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo.getDisciplineScientifiqueVo()
							.getCode());
		}

		if (developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo
				.getDeveloppementDeSavoirEtInnovationScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "developpementDeSavoirEtInnovationScientifique.id", "=",
					developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo
							.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findDisciplineScientifique(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {
		DisciplineScientifique loadedDisciplineScientifique = disciplineScientifiqueService.findByIdOrCode(
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.getDisciplineScientifique());

		if (loadedDisciplineScientifique == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
	}

	private void findDeveloppementDeSavoirEtInnovationScientifique(
			DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {
		DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
		if (developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique
				.getDeveloppementDeSavoirEtInnovationScientifique() != null
				&& developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique
						.getDeveloppementDeSavoirEtInnovationScientifique().getId() != null)
			loadedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueService
					.findById(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique
							.getDeveloppementDeSavoirEtInnovationScientifique().getId());

		if (loadedDeveloppementDeSavoirEtInnovationScientifique == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique
				.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
	}

	@Override
	@Transactional
	public void delete(
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques)) {
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques)) {
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDao.save(e));
		}
	}

	@Override
	public List<List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique>> getToBeSavedAndToBeDeleted(
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> oldList,
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
