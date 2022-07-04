package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.StatutSalarie;
import com.ird.faa.dao.referentiel.StatutSalarieDao;
import com.ird.faa.service.admin.facade.referentiel.StatutSalarieAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatutSalarieVo;

@Service
public class StatutSalarieAdminServiceImpl extends AbstractServiceImpl<StatutSalarie>
		implements StatutSalarieAdminService {

	@Autowired
	private StatutSalarieDao statutSalarieDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<StatutSalarie> findAll() {
		return statutSalarieDao.findAll();
	}

	@Override
	public StatutSalarie findByCode(String code) {
		if (code == null)
			return null;
		return statutSalarieDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return statutSalarieDao.deleteByCode(code);
	}

	@Override
	public StatutSalarie findByIdOrCode(StatutSalarie statutSalarie) {
		StatutSalarie resultat = null;
		if (statutSalarie != null) {
			if (StringUtil.isNotEmpty(statutSalarie.getId())) {
				resultat = statutSalarieDao.getOne(statutSalarie.getId());
			} else if (StringUtil.isNotEmpty(statutSalarie.getCode())) {
				resultat = statutSalarieDao.findByCode(statutSalarie.getCode());
			}
		}
		return resultat;
	}

	@Override
	public StatutSalarie findById(Long id) {
		if (id == null)
			return null;
		return statutSalarieDao.getOne(id);
	}

	@Override
	public StatutSalarie findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (statutSalarieDao.findById(id).isPresent()) {
			statutSalarieDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public StatutSalarie update(StatutSalarie statutSalarie) {
		StatutSalarie foundedStatutSalarie = findById(statutSalarie.getId());
		if (foundedStatutSalarie == null)
			return null;
		else {
			return statutSalarieDao.save(statutSalarie);
		}
	}

	@Override
	public StatutSalarie save(StatutSalarie StatutSalarie) {

		StatutSalarie result = null;
		StatutSalarie foundedStatutSalarie = findByCode(StatutSalarie.getCode());
		if (foundedStatutSalarie == null) {

			StatutSalarie savedStatutSalarie = statutSalarieDao.save(StatutSalarie);

			result = savedStatutSalarie;
		}

		return result;
	}

	@Override
	public List<StatutSalarie> save(List<StatutSalarie> StatutSalaries) {
		List<StatutSalarie> list = new ArrayList<>();
		for (StatutSalarie StatutSalarie : StatutSalaries) {
			list.add(save(StatutSalarie));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(StatutSalarie StatutSalarie) {
		if (StatutSalarie.getCode() == null)
			return -1;

		StatutSalarie foundedStatutSalarie = findByCode(StatutSalarie.getCode());
		if (foundedStatutSalarie == null)
			return -1;
		statutSalarieDao.delete(foundedStatutSalarie);
		return 1;
	}

	public List<StatutSalarie> findByCriteria(StatutSalarieVo StatutSalarieVo) {

		String query = "SELECT o FROM StatutSalarie o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", StatutSalarieVo.getId());
		query += SearchUtil.addConstraint("o", "code", "LIKE", StatutSalarieVo.getCode());
		query += SearchUtil.addConstraint("o", "libelleCourt", "LIKE", StatutSalarieVo.getLibelleCourt());
		query += SearchUtil.addConstraint("o", "libelleLong", "LIKE", StatutSalarieVo.getLibelleLong());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<StatutSalarie> statutSalaries) {
		if (ListUtil.isNotEmpty(statutSalaries)) {
			statutSalaries.forEach(e -> statutSalarieDao.delete(e));
		}
	}

	@Override
	public void update(List<StatutSalarie> statutSalaries) {
		if (ListUtil.isNotEmpty(statutSalaries)) {
			statutSalaries.forEach(e -> statutSalarieDao.save(e));
		}
	}

}
