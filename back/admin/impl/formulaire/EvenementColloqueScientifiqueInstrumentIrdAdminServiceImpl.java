package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.bean.formulaire.EvenementColloqueScientifiqueInstrumentIrd;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.dao.formulaire.EvenementColloqueScientifiqueInstrumentIrdDao;
import com.ird.faa.service.admin.facade.referentiel.InstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScientifiqueInstrumentIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScientifiqueInstrumentIrdVo;

@Service
public class EvenementColloqueScientifiqueInstrumentIrdAdminServiceImpl
		extends AbstractServiceImpl<EvenementColloqueScientifiqueInstrumentIrd>
		implements EvenementColloqueScientifiqueInstrumentIrdAdminService {

	@Autowired
	private EvenementColloqueScientifiqueInstrumentIrdDao instrumentIrdEvenementColloqueScientifiqueDao;

	@Autowired
	private EvenementColloqueScienntifiqueAdminService evenementColloqueScienntifiqueService;
	@Autowired
	private InstrumentIrdAdminService instrumentIrdService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EvenementColloqueScientifiqueInstrumentIrd> findAll() {
		return instrumentIrdEvenementColloqueScientifiqueDao.findAll();
	}

	@Override
	public List<EvenementColloqueScientifiqueInstrumentIrd> findByEvenementColloqueScienntifiqueId(Long id) {
		return instrumentIrdEvenementColloqueScientifiqueDao.findByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByEvenementColloqueScienntifiqueId(Long id) {
		return instrumentIrdEvenementColloqueScientifiqueDao.deleteByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	public List<EvenementColloqueScientifiqueInstrumentIrd> findByInstrumentIrdCode(String code) {
		return instrumentIrdEvenementColloqueScientifiqueDao.findByInstrumentIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByInstrumentIrdCode(String code) {
		return instrumentIrdEvenementColloqueScientifiqueDao.deleteByInstrumentIrdCode(code);
	}

	@Override
	public List<EvenementColloqueScientifiqueInstrumentIrd> findByInstrumentIrdId(Long id) {
		return instrumentIrdEvenementColloqueScientifiqueDao.findByInstrumentIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByInstrumentIrdId(Long id) {
		return instrumentIrdEvenementColloqueScientifiqueDao.deleteByInstrumentIrdId(id);
	}

	@Override
	public EvenementColloqueScientifiqueInstrumentIrd findById(Long id) {
		if (id == null)
			return null;
		return instrumentIrdEvenementColloqueScientifiqueDao.getOne(id);
	}

	@Override
	public EvenementColloqueScientifiqueInstrumentIrd findByIdWithAssociatedList(Long id) {
		EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique = findById(id);
		return instrumentIrdEvenementColloqueScientifique;
	}

	@Transactional
	public int deleteById(Long id) {
		if (instrumentIrdEvenementColloqueScientifiqueDao.findById(id) == null)
			return 0;
		else {
			instrumentIrdEvenementColloqueScientifiqueDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public EvenementColloqueScientifiqueInstrumentIrd update(
			EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique) {
		EvenementColloqueScientifiqueInstrumentIrd foundedInstrumentIrdEvenementColloqueScientifique = findById(
				instrumentIrdEvenementColloqueScientifique.getId());
		if (foundedInstrumentIrdEvenementColloqueScientifique == null)
			return null;
		else {
			return instrumentIrdEvenementColloqueScientifiqueDao.save(instrumentIrdEvenementColloqueScientifique);
		}
	}

	@Override
	public EvenementColloqueScientifiqueInstrumentIrd save(
			EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique) {

		findEvenementColloqueScienntifique(instrumentIrdEvenementColloqueScientifique);
		findInstrumentIrd(instrumentIrdEvenementColloqueScientifique);

		EvenementColloqueScientifiqueInstrumentIrd savedInstrumentIrdEvenementColloqueScientifique = instrumentIrdEvenementColloqueScientifiqueDao
				.save(instrumentIrdEvenementColloqueScientifique);
		return savedInstrumentIrdEvenementColloqueScientifique;
	}

	@Override
	public List<EvenementColloqueScientifiqueInstrumentIrd> save(
			List<EvenementColloqueScientifiqueInstrumentIrd> instrumentIrdEvenementColloqueScientifiques) {
		List<EvenementColloqueScientifiqueInstrumentIrd> list = new ArrayList<EvenementColloqueScientifiqueInstrumentIrd>();
		for (EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique : instrumentIrdEvenementColloqueScientifiques) {
			list.add(save(instrumentIrdEvenementColloqueScientifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique) {
		if (instrumentIrdEvenementColloqueScientifique.getId() == null)
			return -1;
		EvenementColloqueScientifiqueInstrumentIrd foundedInstrumentIrdEvenementColloqueScientifique = findById(
				instrumentIrdEvenementColloqueScientifique.getId());
		if (foundedInstrumentIrdEvenementColloqueScientifique == null)
			return -1;
		instrumentIrdEvenementColloqueScientifiqueDao.delete(foundedInstrumentIrdEvenementColloqueScientifique);
		return 1;
	}

	public List<EvenementColloqueScientifiqueInstrumentIrd> findByCriteria(
		EvenementColloqueScientifiqueInstrumentIrdVo instrumentIrdEvenementColloqueScientifiqueVo) {

		String query = "SELECT o FROM InstrumentIrdEvenementColloqueScientifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", instrumentIrdEvenementColloqueScientifiqueVo.getId());
		if (instrumentIrdEvenementColloqueScientifiqueVo.getEvenementColloqueScienntifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "evenementColloqueScienntifique.id", "=",
					instrumentIrdEvenementColloqueScientifiqueVo.getEvenementColloqueScienntifiqueVo().getId());
		}

		if (instrumentIrdEvenementColloqueScientifiqueVo.getInstrumentIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "instrumentIrd.id", "=",
					instrumentIrdEvenementColloqueScientifiqueVo.getInstrumentIrdVo().getId());
			query += SearchUtil.addConstraint("o", "instrumentIrd.code", "LIKE",
					instrumentIrdEvenementColloqueScientifiqueVo.getInstrumentIrdVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEvenementColloqueScienntifique(
			EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique) {
		EvenementColloqueScienntifique loadedEvenementColloqueScienntifique = null;
		if (instrumentIrdEvenementColloqueScientifique.getEvenementColloqueScienntifique() != null
				&& instrumentIrdEvenementColloqueScientifique.getEvenementColloqueScienntifique().getId() != null)
			loadedEvenementColloqueScienntifique = evenementColloqueScienntifiqueService.findById(
					instrumentIrdEvenementColloqueScientifique.getEvenementColloqueScienntifique().getId());

		if (loadedEvenementColloqueScienntifique == null) {
			return;
		}
		instrumentIrdEvenementColloqueScientifique
				.setEvenementColloqueScienntifique(loadedEvenementColloqueScienntifique);
	}

	private void findInstrumentIrd(
			EvenementColloqueScientifiqueInstrumentIrd instrumentIrdEvenementColloqueScientifique) {
		InstrumentIrd loadedInstrumentIrd = instrumentIrdService
				.findByIdOrCode(instrumentIrdEvenementColloqueScientifique.getInstrumentIrd());

		if (loadedInstrumentIrd == null) {
			return;
		}
		instrumentIrdEvenementColloqueScientifique.setInstrumentIrd(loadedInstrumentIrd);
	}

	@Override
	@Transactional
	public void delete(
			List<EvenementColloqueScientifiqueInstrumentIrd> instrumentIrdEvenementColloqueScientifiques) {
		if (ListUtil.isNotEmpty(instrumentIrdEvenementColloqueScientifiques)) {
			instrumentIrdEvenementColloqueScientifiques
					.forEach(e -> instrumentIrdEvenementColloqueScientifiqueDao.delete(e));
		}
	}

	@Override
	public void update(
			List<EvenementColloqueScientifiqueInstrumentIrd> instrumentIrdEvenementColloqueScientifiques) {
		if (ListUtil.isNotEmpty(instrumentIrdEvenementColloqueScientifiques)) {
			instrumentIrdEvenementColloqueScientifiques
					.forEach(e -> instrumentIrdEvenementColloqueScientifiqueDao.save(e));
		}
	}

	@Override
	public List<List<EvenementColloqueScientifiqueInstrumentIrd>> getToBeSavedAndToBeDeleted(
			List<EvenementColloqueScientifiqueInstrumentIrd> oldList,
			List<EvenementColloqueScientifiqueInstrumentIrd> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
