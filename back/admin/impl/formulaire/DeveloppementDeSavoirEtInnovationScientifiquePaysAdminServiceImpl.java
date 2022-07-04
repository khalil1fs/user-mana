package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePays;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePaysDao;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePaysVo;

@Service
public class DeveloppementDeSavoirEtInnovationScientifiquePaysAdminServiceImpl
		extends AbstractServiceImpl<DeveloppementDeSavoirEtInnovationScientifiquePays>
		implements DeveloppementDeSavoirEtInnovationScientifiquePaysAdminService {

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiquePaysDao developpementDeSavoirEtInnovationScientifiquePaysDao;

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> findAll() {
		return developpementDeSavoirEtInnovationScientifiquePaysDao.findAll();
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByPaysCode(String code) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao.deleteByPaysCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByPaysId(Long id) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao.deleteByPaysId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao
				.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
		return developpementDeSavoirEtInnovationScientifiquePaysDao
				.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiquePays findById(Long id) {
		if (id == null)
			return null;
		return developpementDeSavoirEtInnovationScientifiquePaysDao.getOne(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiquePays findByIdWithAssociatedList(Long id) {
		DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays = findById(
				id);
		return developpementDeSavoirEtInnovationScientifiquePays;
	}

	@Transactional
	public int deleteById(Long id) {
		if (developpementDeSavoirEtInnovationScientifiquePaysDao.findById(id) == null)
			return 0;
		else {
			developpementDeSavoirEtInnovationScientifiquePaysDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiquePays update(
			DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays) {
		DeveloppementDeSavoirEtInnovationScientifiquePays foundedDeveloppementDeSavoirEtInnovationScientifiquePays = findById(
				developpementDeSavoirEtInnovationScientifiquePays.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiquePays == null)
			return null;
		else {
			return developpementDeSavoirEtInnovationScientifiquePaysDao
					.save(developpementDeSavoirEtInnovationScientifiquePays);
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifiquePays save(
			DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays) {

		findPays(developpementDeSavoirEtInnovationScientifiquePays);
		findDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifiquePays);

		DeveloppementDeSavoirEtInnovationScientifiquePays savedDeveloppementDeSavoirEtInnovationScientifiquePays = developpementDeSavoirEtInnovationScientifiquePaysDao
				.save(developpementDeSavoirEtInnovationScientifiquePays);
		return savedDeveloppementDeSavoirEtInnovationScientifiquePays;
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> save(
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePayss) {
		List<DeveloppementDeSavoirEtInnovationScientifiquePays> list = new ArrayList<DeveloppementDeSavoirEtInnovationScientifiquePays>();
		for (DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays : developpementDeSavoirEtInnovationScientifiquePayss) {
			list.add(save(developpementDeSavoirEtInnovationScientifiquePays));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(
			DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays) {
		if (developpementDeSavoirEtInnovationScientifiquePays.getId() == null)
			return -1;
		DeveloppementDeSavoirEtInnovationScientifiquePays foundedDeveloppementDeSavoirEtInnovationScientifiquePays = findById(
				developpementDeSavoirEtInnovationScientifiquePays.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifiquePays == null)
			return -1;
		developpementDeSavoirEtInnovationScientifiquePaysDao
				.delete(foundedDeveloppementDeSavoirEtInnovationScientifiquePays);
		return 1;
	}

	public List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByCriteria(
			DeveloppementDeSavoirEtInnovationScientifiquePaysVo developpementDeSavoirEtInnovationScientifiquePaysVo) {

		String query = "SELECT o FROM DeveloppementDeSavoirEtInnovationScientifiquePays o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", developpementDeSavoirEtInnovationScientifiquePaysVo.getId());
		if (developpementDeSavoirEtInnovationScientifiquePaysVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					developpementDeSavoirEtInnovationScientifiquePaysVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiquePaysVo.getPaysVo().getCode());
		}

		if (developpementDeSavoirEtInnovationScientifiquePaysVo
				.getDeveloppementDeSavoirEtInnovationScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "developpementDeSavoirEtInnovationScientifique.id", "=",
					developpementDeSavoirEtInnovationScientifiquePaysVo
							.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findPays(
			DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays) {
		Pays loadedPays = paysService.findByIdOrCode(developpementDeSavoirEtInnovationScientifiquePays.getPays());

		if (loadedPays == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiquePays.setPays(loadedPays);
	}

	private void findDeveloppementDeSavoirEtInnovationScientifique(
			DeveloppementDeSavoirEtInnovationScientifiquePays developpementDeSavoirEtInnovationScientifiquePays) {
		DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
		if (developpementDeSavoirEtInnovationScientifiquePays.getDeveloppementDeSavoirEtInnovationScientifique() != null
				&& developpementDeSavoirEtInnovationScientifiquePays.getDeveloppementDeSavoirEtInnovationScientifique()
						.getId() != null)
			loadedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueService
					.findById(developpementDeSavoirEtInnovationScientifiquePays
							.getDeveloppementDeSavoirEtInnovationScientifique().getId());

		if (loadedDeveloppementDeSavoirEtInnovationScientifique == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifiquePays
				.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
	}

	@Override
	@Transactional
	public void delete(
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePayss) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiquePayss)) {
			developpementDeSavoirEtInnovationScientifiquePayss
					.forEach(e -> developpementDeSavoirEtInnovationScientifiquePaysDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePayss) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiquePayss)) {
			developpementDeSavoirEtInnovationScientifiquePayss
					.forEach(e -> developpementDeSavoirEtInnovationScientifiquePaysDao.save(e));
		}
	}

	@Override
	public List<List<DeveloppementDeSavoirEtInnovationScientifiquePays>> getToBeSavedAndToBeDeleted(
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> oldList,
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
