package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.referentiel.StatusContratEtConvention;
import com.ird.faa.dao.referentiel.StatusContratEtConventionDao;
import com.ird.faa.service.admin.facade.referentiel.StatusContratEtConventionAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatusContratEtConventionVo;

@Service
public class StatusContratEtConventionAdminServiceImpl extends AbstractServiceImpl<StatusContratEtConvention>
		implements StatusContratEtConventionAdminService {

	@Autowired
	private StatusContratEtConventionDao statusContratEtConventionDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<StatusContratEtConvention> findAll() {
		return statusContratEtConventionDao.findAll();
	}

	@Override
	public StatusContratEtConvention findByCode(String code) {
		if (code == null)
			return null;
		return statusContratEtConventionDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return statusContratEtConventionDao.deleteByCode(code);
	}

	@Override
	public StatusContratEtConvention findByIdOrCode(StatusContratEtConvention statusContratEtConvention) {
		StatusContratEtConvention resultat = null;
		if (statusContratEtConvention == null
				|| (statusContratEtConvention.getCode() == null && statusContratEtConvention.getId() == null))
			return resultat;
		else {
			if (statusContratEtConvention.getId() != null) {
				resultat = statusContratEtConventionDao.findById(statusContratEtConvention.getId()).get();
			} else if (StringUtil.isNotEmpty(statusContratEtConvention.getCode())) {
				resultat = statusContratEtConventionDao.findByCode(statusContratEtConvention.getCode());
			}
			return resultat;
		}
	}

	@Override
	public StatusContratEtConvention findById(Long id) {
		if (id == null)
			return null;
		return statusContratEtConventionDao.getOne(id);
	}

	@Override
	public StatusContratEtConvention findByIdWithAssociatedList(Long id) {
		StatusContratEtConvention statusContratEtConvention = findById(id);
		return statusContratEtConvention;
	}

	@Transactional
	public int deleteById(Long id) {
		if (statusContratEtConventionDao.findById(id) == null)
			return 0;
		else {
			statusContratEtConventionDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public StatusContratEtConvention update(StatusContratEtConvention statusContratEtConvention) {
		StatusContratEtConvention foundedStatusContratEtConvention = findById(statusContratEtConvention.getId());
		if (foundedStatusContratEtConvention == null)
			return null;
		else {
			prepare(statusContratEtConvention);

			return statusContratEtConventionDao.save(statusContratEtConvention);
		}
	}

	@Override
	public StatusContratEtConvention save(StatusContratEtConvention statusContratEtConvention) {
		StatusContratEtConvention foundedStatusContratEtConvention = findByCode(statusContratEtConvention.getCode());
		if (foundedStatusContratEtConvention != null)
			return null;
		prepare(statusContratEtConvention);
		StatusContratEtConvention savedStatusContratEtConvention = statusContratEtConventionDao
				.save(statusContratEtConvention);
		return savedStatusContratEtConvention;
	}

	@Override
	public List<StatusContratEtConvention> save(List<StatusContratEtConvention> statusContratEtConventions) {
		List<StatusContratEtConvention> list = new ArrayList<StatusContratEtConvention>();
		for (StatusContratEtConvention statusContratEtConvention : statusContratEtConventions) {
			list.add(save(statusContratEtConvention));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(StatusContratEtConvention statusContratEtConvention) {
		if (statusContratEtConvention.getCode() == null)
			return -1;

		StatusContratEtConvention foundedStatusContratEtConvention = findByCode(statusContratEtConvention.getCode());
		if (foundedStatusContratEtConvention == null)
			return -1;
		statusContratEtConventionDao.delete(foundedStatusContratEtConvention);
		return 1;
	}

	public List<StatusContratEtConvention> findByCriteria(StatusContratEtConventionVo statusContratEtConventionVo) {

		String query = "SELECT o FROM StatusContratEtConvention o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", statusContratEtConventionVo.getId());
		query += SearchUtil.addConstraint("o", "libelle", "LIKE", statusContratEtConventionVo.getLibelle());
		query += SearchUtil.addConstraint("o", "code", "LIKE", statusContratEtConventionVo.getCode());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<StatusContratEtConvention> statusContratEtConventions) {
		if (ListUtil.isNotEmpty(statusContratEtConventions)) {
			statusContratEtConventions.forEach(e -> statusContratEtConventionDao.delete(e));
		}
	}

	@Override
	public void update(List<StatusContratEtConvention> statusContratEtConventions) {
		if (ListUtil.isNotEmpty(statusContratEtConventions)) {
			statusContratEtConventions.forEach(e -> statusContratEtConventionDao.save(e));
		}
	}

	@Override
	public List<List<StatusContratEtConvention>> getToBeSavedAndToBeDeleted(List<StatusContratEtConvention> oldList,
			List<StatusContratEtConvention> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
