package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifiqueEnjeuxIrd;
import com.ird.faa.dao.formulaire.EvenementColloqueScienntifiqueEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueEnjeuxIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScienntifiqueEnjeuxIrdVo;

@Service
public class EvenementColloqueScienntifiqueEnjeuxIrdAdminServiceImpl
		extends AbstractServiceImpl<EvenementColloqueScienntifiqueEnjeuxIrd>
		implements EvenementColloqueScienntifiqueEnjeuxIrdAdminService {

	@Autowired
	private EvenementColloqueScienntifiqueEnjeuxIrdDao evenementColloqueScienntifiqueEnjeuxIrdDao;

	@Autowired
	private EnjeuxIrdAdminService enjeuxIrdService;
	@Autowired
	private EvenementColloqueScienntifiqueAdminService evenementColloqueScienntifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EvenementColloqueScienntifiqueEnjeuxIrd> findAll() {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.findAll();
	}

	@Override
	public List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEvenementColloqueScienntifiqueId(Long id) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.findByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByEvenementColloqueScienntifiqueId(Long id) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.deleteByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	public List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEnjeuxIrdCode(String code) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.findByEnjeuxIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdCode(String code) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
	}

	@Override
	public List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEnjeuxIrdId(Long id) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.findByEnjeuxIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdId(Long id) {
		return evenementColloqueScienntifiqueEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
	}

	@Override
	public EvenementColloqueScienntifiqueEnjeuxIrd findById(Long id) {
		if (id == null)
			return null;
		return evenementColloqueScienntifiqueEnjeuxIrdDao.getOne(id);
	}

	@Override
	public EvenementColloqueScienntifiqueEnjeuxIrd findByIdWithAssociatedList(Long id) {
		EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd = findById(id);
		return evenementColloqueScienntifiqueEnjeuxIrd;
	}

	@Transactional
	public int deleteById(Long id) {
		if (evenementColloqueScienntifiqueEnjeuxIrdDao.findById(id) == null)
			return 0;
		else {
			evenementColloqueScienntifiqueEnjeuxIrdDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public EvenementColloqueScienntifiqueEnjeuxIrd update(
			EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd) {
		EvenementColloqueScienntifiqueEnjeuxIrd foundedEvenementColloqueScienntifiqueEnjeuxIrd = findById(
				evenementColloqueScienntifiqueEnjeuxIrd.getId());
		if (foundedEvenementColloqueScienntifiqueEnjeuxIrd == null)
			return null;
		else {
			return evenementColloqueScienntifiqueEnjeuxIrdDao.save(evenementColloqueScienntifiqueEnjeuxIrd);
		}
	}

	@Override
	public EvenementColloqueScienntifiqueEnjeuxIrd save(
			EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd) {

		findEvenementColloqueScienntifique(evenementColloqueScienntifiqueEnjeuxIrd);
		findEnjeuxIrd(evenementColloqueScienntifiqueEnjeuxIrd);

		EvenementColloqueScienntifiqueEnjeuxIrd savedEvenementColloqueScienntifiqueEnjeuxIrd = evenementColloqueScienntifiqueEnjeuxIrdDao
				.save(evenementColloqueScienntifiqueEnjeuxIrd);
		return savedEvenementColloqueScienntifiqueEnjeuxIrd;
	}

	@Override
	public List<EvenementColloqueScienntifiqueEnjeuxIrd> save(
			List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrds) {
		List<EvenementColloqueScienntifiqueEnjeuxIrd> list = new ArrayList<EvenementColloqueScienntifiqueEnjeuxIrd>();
		for (EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd : evenementColloqueScienntifiqueEnjeuxIrds) {
			list.add(save(evenementColloqueScienntifiqueEnjeuxIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd) {
		if (evenementColloqueScienntifiqueEnjeuxIrd.getId() == null)
			return -1;
		EvenementColloqueScienntifiqueEnjeuxIrd foundedEvenementColloqueScienntifiqueEnjeuxIrd = findById(
				evenementColloqueScienntifiqueEnjeuxIrd.getId());
		if (foundedEvenementColloqueScienntifiqueEnjeuxIrd == null)
			return -1;
		evenementColloqueScienntifiqueEnjeuxIrdDao.delete(foundedEvenementColloqueScienntifiqueEnjeuxIrd);
		return 1;
	}

	public List<EvenementColloqueScienntifiqueEnjeuxIrd> findByCriteria(
			EvenementColloqueScienntifiqueEnjeuxIrdVo evenementColloqueScienntifiqueEnjeuxIrdVo) {

		String query = "SELECT o FROM EvenementColloqueScienntifiqueEnjeuxIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", evenementColloqueScienntifiqueEnjeuxIrdVo.getId());
		if (evenementColloqueScienntifiqueEnjeuxIrdVo.getEvenementColloqueScienntifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "evenementColloqueScienntifique.id", "=",
					evenementColloqueScienntifiqueEnjeuxIrdVo.getEvenementColloqueScienntifiqueVo().getId());
		}

		if (evenementColloqueScienntifiqueEnjeuxIrdVo.getEnjeuxIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "enjeuxIrd.id", "=",
					evenementColloqueScienntifiqueEnjeuxIrdVo.getEnjeuxIrdVo().getId());
			query += SearchUtil.addConstraint("o", "enjeuxIrd.code", "LIKE",
					evenementColloqueScienntifiqueEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEvenementColloqueScienntifique(
			EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd) {
		EvenementColloqueScienntifique loadedEvenementColloqueScienntifique = null;
		if (evenementColloqueScienntifiqueEnjeuxIrd.getEvenementColloqueScienntifique() != null
				&& evenementColloqueScienntifiqueEnjeuxIrd.getEvenementColloqueScienntifique().getId() != null)
			loadedEvenementColloqueScienntifique = evenementColloqueScienntifiqueService
					.findById(evenementColloqueScienntifiqueEnjeuxIrd.getEvenementColloqueScienntifique().getId());

		if (loadedEvenementColloqueScienntifique == null) {
			return;
		}
		evenementColloqueScienntifiqueEnjeuxIrd.setEvenementColloqueScienntifique(loadedEvenementColloqueScienntifique);
	}

	private void findEnjeuxIrd(EvenementColloqueScienntifiqueEnjeuxIrd evenementColloqueScienntifiqueEnjeuxIrd) {
		EnjeuxIrd loadedEnjeuxIrd = enjeuxIrdService
				.findByIdOrCode(evenementColloqueScienntifiqueEnjeuxIrd.getEnjeuxIrd());

		if (loadedEnjeuxIrd == null) {
			return;
		}
		evenementColloqueScienntifiqueEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
	}

	@Override
	@Transactional
	public void delete(List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiqueEnjeuxIrds)) {
			evenementColloqueScienntifiqueEnjeuxIrds.forEach(e -> evenementColloqueScienntifiqueEnjeuxIrdDao.delete(e));
		}
	}

	@Override
	public void update(List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiqueEnjeuxIrds)) {
			evenementColloqueScienntifiqueEnjeuxIrds.forEach(e -> evenementColloqueScienntifiqueEnjeuxIrdDao.save(e));
		}
	}

	@Override
	public List<List<EvenementColloqueScienntifiqueEnjeuxIrd>> getToBeSavedAndToBeDeleted(
			List<EvenementColloqueScienntifiqueEnjeuxIrd> oldList,
			List<EvenementColloqueScienntifiqueEnjeuxIrd> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
