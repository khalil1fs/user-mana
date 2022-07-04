package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd;
import com.ird.faa.dao.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdDao;
import com.ird.faa.service.admin.facade.referentiel.InstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdVo;

@Service
public class DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminServiceImpl
		extends AbstractServiceImpl<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd>
		implements DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminService {

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdDao developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao;

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService;
	@Autowired
	private InstrumentIrdAdminService instrumentIrdService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findAll() {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.findAll();
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByInstrumentIrdCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.findByInstrumentIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByInstrumentIrdCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.deleteByInstrumentIrdCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByInstrumentIrdId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.findByInstrumentIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByInstrumentIrdId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.deleteByInstrumentIrdId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao
				.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao
				.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd findById(Long id) {
		if (id == null)
			return null;
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.getOne(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd findByIdWithAssociatedList(Long id) {
		DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd = findById(
				id);
		return developpementDeSavoirEtInnovationScientifiqueInstrumentIrd;
	}

	@Transactional
	public int deleteById(Long id) {
		if (developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.findById(id) == null)
			return 0;
		else {
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd update(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {
		DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd foundedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd = findById(
				developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd == null)
			return null;
		else {
			return developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao
					.save(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd);
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd save(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {

		findInstrumentIrd(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd);
		findDeveloppementDeSavoirEtInnovationScientifique(
				developpementDeSavoirEtInnovationScientifiqueInstrumentIrd);

		DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd savedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd = developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao
				.save(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd);
		return savedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd;
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> save(
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrds) {
		List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> list = new ArrayList<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd>();
		for (DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd : developpementDeSavoirEtInnovationScientifiqueInstrumentIrds) {
			list.add(save(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {
		if (developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.getId() == null)
			return -1;
		DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd foundedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd = findById(
				developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd == null)
			return -1;
		developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao
				.delete(foundedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd);
		return 1;
	}

	public List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByCriteria(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdVo developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo) {

		String query = "SELECT o FROM DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=",
				developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo.getId());
		if (developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo.getInstrumentIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "instrumentIrd.id", "=",
					developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo.getInstrumentIrdVo().getId());
			query += SearchUtil.addConstraint("o", "instrumentIrd.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo.getInstrumentIrdVo().getCode());
		}

		if (developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo
				.getDeveloppementDeSavoirEtInnovationScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "developpementDeSavoirEtInnovationScientifique.id", "=",
					developpementDeSavoirEtInnovationScientifiqueInstrumentIrdVo
							.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findInstrumentIrd(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {
		InstrumentIrd loadedInstrumentIrd = instrumentIrdService
				.findByIdOrCode(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.getInstrumentIrd());

		if (loadedInstrumentIrd == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.setInstrumentIrd(loadedInstrumentIrd);
	}

	private void findDeveloppementDeSavoirEtInnovationScientifique(
			DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {
		DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
		if (developpementDeSavoirEtInnovationScientifiqueInstrumentIrd
				.getDeveloppementDeSavoirEtInnovationScientifique() != null
				&& developpementDeSavoirEtInnovationScientifiqueInstrumentIrd
						.getDeveloppementDeSavoirEtInnovationScientifique().getId() != null)
			loadedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueService
					.findById(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd
							.getDeveloppementDeSavoirEtInnovationScientifique().getId());

		if (loadedDeveloppementDeSavoirEtInnovationScientifique == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiqueInstrumentIrd
				.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
	}

	@Override
	@Transactional
	public void delete(
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrds) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueInstrumentIrds)) {
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrds
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrds) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueInstrumentIrds)) {
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrds
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueInstrumentIrdDao.save(e));
		}
	}

	@Override
	public List<List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd>> getToBeSavedAndToBeDeleted(
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> oldList,
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
