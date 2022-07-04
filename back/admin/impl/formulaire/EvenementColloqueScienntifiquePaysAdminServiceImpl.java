package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifiquePays;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.EvenementColloqueScienntifiquePaysDao;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiquePaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScienntifiquePaysVo;

@Service
public class EvenementColloqueScienntifiquePaysAdminServiceImpl
		extends AbstractServiceImpl<EvenementColloqueScienntifiquePays>
		implements EvenementColloqueScienntifiquePaysAdminService {

	@Autowired
	private EvenementColloqueScienntifiquePaysDao evenementColloqueScienntifiquePaysDao;

	@Autowired
	private EvenementColloqueScienntifiqueAdminService evenementColloqueScienntifiqueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EvenementColloqueScienntifiquePays> findAll() {
		return evenementColloqueScienntifiquePaysDao.findAll();
	}

	@Override
	public List<EvenementColloqueScienntifiquePays> findByEvenementColloqueScienntifiqueId(Long id) {
		return evenementColloqueScienntifiquePaysDao.findByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByEvenementColloqueScienntifiqueId(Long id) {
		return evenementColloqueScienntifiquePaysDao.deleteByEvenementColloqueScienntifiqueId(id);
	}

	@Override
	public List<EvenementColloqueScienntifiquePays> findByPaysCode(String code) {
		return evenementColloqueScienntifiquePaysDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return evenementColloqueScienntifiquePaysDao.deleteByPaysCode(code);
	}

	@Override
	public List<EvenementColloqueScienntifiquePays> findByPaysId(Long id) {
		return evenementColloqueScienntifiquePaysDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return evenementColloqueScienntifiquePaysDao.deleteByPaysId(id);
	}

	@Override
	public EvenementColloqueScienntifiquePays findById(Long id) {
		if (id == null)
			return null;
		return evenementColloqueScienntifiquePaysDao.getOne(id);
	}

	@Override
	public EvenementColloqueScienntifiquePays findByIdWithAssociatedList(Long id) {
		EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays = findById(id);
		return evenementColloqueScienntifiquePays;
	}

	@Transactional
	public int deleteById(Long id) {
		if (evenementColloqueScienntifiquePaysDao.findById(id) == null)
			return 0;
		else {
			evenementColloqueScienntifiquePaysDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public EvenementColloqueScienntifiquePays update(
			EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays) {
		EvenementColloqueScienntifiquePays foundedEvenementColloqueScienntifiquePays = findById(
				evenementColloqueScienntifiquePays.getId());
		if (foundedEvenementColloqueScienntifiquePays == null)
			return null;
		else {
			return evenementColloqueScienntifiquePaysDao.save(evenementColloqueScienntifiquePays);
		}
	}

	@Override
	public EvenementColloqueScienntifiquePays save(
			EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays) {

		findEvenementColloqueScienntifique(evenementColloqueScienntifiquePays);
		findPays(evenementColloqueScienntifiquePays);

		EvenementColloqueScienntifiquePays savedEvenementColloqueScienntifiquePays = evenementColloqueScienntifiquePaysDao
				.save(evenementColloqueScienntifiquePays);
		return savedEvenementColloqueScienntifiquePays;
	}

	@Override
	public List<EvenementColloqueScienntifiquePays> save(
			List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePayss) {
		List<EvenementColloqueScienntifiquePays> list = new ArrayList<EvenementColloqueScienntifiquePays>();
		for (EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays : evenementColloqueScienntifiquePayss) {
			list.add(save(evenementColloqueScienntifiquePays));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays) {
		if (evenementColloqueScienntifiquePays.getId() == null)
			return -1;
		EvenementColloqueScienntifiquePays foundedEvenementColloqueScienntifiquePays = findById(
				evenementColloqueScienntifiquePays.getId());
		if (foundedEvenementColloqueScienntifiquePays == null)
			return -1;
		evenementColloqueScienntifiquePaysDao.delete(foundedEvenementColloqueScienntifiquePays);
		return 1;
	}

	public List<EvenementColloqueScienntifiquePays> findByCriteria(
			EvenementColloqueScienntifiquePaysVo evenementColloqueScienntifiquePaysVo) {

		String query = "SELECT o FROM EvenementColloqueScienntifiquePays o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", evenementColloqueScienntifiquePaysVo.getId());
		if (evenementColloqueScienntifiquePaysVo.getEvenementColloqueScienntifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "evenementColloqueScienntifique.id", "=",
					evenementColloqueScienntifiquePaysVo.getEvenementColloqueScienntifiqueVo().getId());
		}

		if (evenementColloqueScienntifiquePaysVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					evenementColloqueScienntifiquePaysVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					evenementColloqueScienntifiquePaysVo.getPaysVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEvenementColloqueScienntifique(
			EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays) {
		EvenementColloqueScienntifique loadedEvenementColloqueScienntifique = null;
		if (evenementColloqueScienntifiquePays.getEvenementColloqueScienntifique() != null
				&& evenementColloqueScienntifiquePays.getEvenementColloqueScienntifique().getId() != null)
			loadedEvenementColloqueScienntifique = evenementColloqueScienntifiqueService
					.findById(evenementColloqueScienntifiquePays.getEvenementColloqueScienntifique().getId());

		if (loadedEvenementColloqueScienntifique == null) {
			return;
		}
		evenementColloqueScienntifiquePays.setEvenementColloqueScienntifique(loadedEvenementColloqueScienntifique);
	}

	private void findPays(EvenementColloqueScienntifiquePays evenementColloqueScienntifiquePays) {
		Pays loadedPays = paysService.findByIdOrCode(evenementColloqueScienntifiquePays.getPays());

		if (loadedPays == null) {
			return;
		}
		evenementColloqueScienntifiquePays.setPays(loadedPays);
	}

	@Override
	@Transactional
	public void delete(List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePayss) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiquePayss)) {
			evenementColloqueScienntifiquePayss.forEach(e -> evenementColloqueScienntifiquePaysDao.delete(e));
		}
	}

	@Override
	public void update(List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePayss) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiquePayss)) {
			evenementColloqueScienntifiquePayss.forEach(e -> evenementColloqueScienntifiquePaysDao.save(e));
		}
	}

	@Override
	public List<List<EvenementColloqueScienntifiquePays>> getToBeSavedAndToBeDeleted(
			List<EvenementColloqueScienntifiquePays> oldList, List<EvenementColloqueScienntifiquePays> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
