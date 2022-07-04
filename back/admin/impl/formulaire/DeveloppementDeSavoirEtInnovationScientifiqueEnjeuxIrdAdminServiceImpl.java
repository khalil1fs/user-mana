package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.dao.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo;

@Service
public class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminServiceImpl
		extends AbstractServiceImpl<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd>
		implements DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminService {

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao;

	@Autowired
	private EnjeuxIrdAdminService enjeuxIrdService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> findAll() {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.findAll();
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> findByEnjeuxIrdCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.findByEnjeuxIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> findByEnjeuxIrdId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.findByEnjeuxIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao
				.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao
				.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd findById(Long id) {
		if (id == null)
			return null;
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.getOne(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd findByIdWithAssociatedList(Long id) {
		DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd = findById(
				id);
		return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
	}

	@Transactional
	public int deleteById(Long id) {
		if (developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.findById(id) == null)
			return 0;
		else {
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd update(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {
		DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd foundedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = findById(
				developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd == null)
			return null;
		else {
			return developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao
					.save(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd save(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {

		findEnjeuxIrd(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
		findDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);

		DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd savedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao
				.save(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
		return savedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> save(
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds) {
		List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> list = new ArrayList<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd>();
		for (DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd : developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds) {
			list.add(save(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {
		if (developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.getId() == null)
			return -1;
		DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd foundedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = findById(
				developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd == null)
			return -1;
		developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao
				.delete(foundedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
		return 1;
	}

	public List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> findByCriteria(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {

		String query = "SELECT o FROM DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=",
				developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo.getId());
		if (developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo.getEnjeuxIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "enjeuxIrd.id", "=",
					developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo.getEnjeuxIrdVo().getId());
			query += SearchUtil.addConstraint("o", "enjeuxIrd.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
		}

		if (developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo
				.getDeveloppementDeSavoirEtInnovationScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "developpementDeSavoirEtInnovationScientifique.id", "=",
					developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo
							.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEnjeuxIrd(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {
		EnjeuxIrd loadedEnjeuxIrd = enjeuxIrdService
				.findByIdOrCode(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.getEnjeuxIrd());

		if (loadedEnjeuxIrd == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
	}

	private void findDeveloppementDeSavoirEtInnovationScientifique(
			DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {
		DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
		if (developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd
				.getDeveloppementDeSavoirEtInnovationScientifique() != null
				&& developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd
						.getDeveloppementDeSavoirEtInnovationScientifique().getId() != null)
			loadedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueService
					.findById(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd
							.getDeveloppementDeSavoirEtInnovationScientifique().getId());

		if (loadedDeveloppementDeSavoirEtInnovationScientifique == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd
				.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
	}

	@Override
	@Transactional
	public void delete(
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds)) {
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds)) {
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdDao.save(e));
		}
	}

	@Override
	public List<List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd>> getToBeSavedAndToBeDeleted(
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> oldList,
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
