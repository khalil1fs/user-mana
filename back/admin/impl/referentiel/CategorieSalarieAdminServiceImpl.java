package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.CategorieSalarie;
import com.ird.faa.dao.referentiel.CategorieSalarieDao;
import com.ird.faa.service.admin.facade.referentiel.CategorieSalarieAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.CategorieSalarieVo;

@Service
public class CategorieSalarieAdminServiceImpl extends AbstractServiceImpl<CategorieSalarie>
		implements CategorieSalarieAdminService {

	@Autowired
	private CategorieSalarieDao categorieSalarieDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<CategorieSalarie> findAll() {
		return categorieSalarieDao.findAll();
	}

	@Override
	public CategorieSalarie findByCode(String code) {
		if (code == null)
			return null;
		return categorieSalarieDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return categorieSalarieDao.deleteByCode(code);
	}

	@Override
	public CategorieSalarie findByIdOrCode(CategorieSalarie categorieSalarie) {
		CategorieSalarie resultat = null;
		if (categorieSalarie != null) {
			if (StringUtil.isNotEmpty(categorieSalarie.getId())) {
				resultat = categorieSalarieDao.getOne(categorieSalarie.getId());
			} else if (StringUtil.isNotEmpty(categorieSalarie.getCode())) {
				resultat = categorieSalarieDao.findByCode(categorieSalarie.getCode());
			}
		}
		return resultat;
	}

	@Override
	public CategorieSalarie findById(Long id) {
		if (id == null)
			return null;
		return categorieSalarieDao.getOne(id);
	}

	@Override
	public CategorieSalarie findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (categorieSalarieDao.findById(id).isPresent()) {
			categorieSalarieDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public CategorieSalarie update(CategorieSalarie categorieSalarie) {
		CategorieSalarie foundedCategorieSalarie = findById(categorieSalarie.getId());
		if (foundedCategorieSalarie == null)
			return null;
		else {
			return categorieSalarieDao.save(categorieSalarie);
		}
	}

	@Override
	public CategorieSalarie save(CategorieSalarie CategorieSalarie) {

		CategorieSalarie result = null;
		CategorieSalarie foundedCategorieSalarie = findByCode(CategorieSalarie.getCode());
		if (foundedCategorieSalarie == null) {

			CategorieSalarie savedCategorieSalarie = categorieSalarieDao.save(CategorieSalarie);

			result = savedCategorieSalarie;
		}

		return result;
	}

	@Override
	public List<CategorieSalarie> save(List<CategorieSalarie> CategorieSalaries) {
		List<CategorieSalarie> list = new ArrayList<>();
		for (CategorieSalarie CategorieSalarie : CategorieSalaries) {
			list.add(save(CategorieSalarie));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(CategorieSalarie CategorieSalarie) {
		if (CategorieSalarie.getCode() == null)
			return -1;

		CategorieSalarie foundedCategorieSalarie = findByCode(CategorieSalarie.getCode());
		if (foundedCategorieSalarie == null)
			return -1;
		categorieSalarieDao.delete(foundedCategorieSalarie);
		return 1;
	}

	public List<CategorieSalarie> findByCriteria(CategorieSalarieVo CategorieSalarieVo) {

		String query = "SELECT o FROM CategorieSalarie o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", CategorieSalarieVo.getId());
		query += SearchUtil.addConstraint("o", "code", "LIKE", CategorieSalarieVo.getCode());
		query += SearchUtil.addConstraint("o", "libelleCourt", "LIKE", CategorieSalarieVo.getLibelleCourt());
		query += SearchUtil.addConstraint("o", "libelleLong", "LIKE", CategorieSalarieVo.getLibelleLong());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<CategorieSalarie> categorieSalaries) {
		if (ListUtil.isNotEmpty(categorieSalaries)) {
			categorieSalaries.forEach(e -> categorieSalarieDao.delete(e));
		}
	}

	@Override
	public void update(List<CategorieSalarie> categorieSalaries) {
		if (ListUtil.isNotEmpty(categorieSalaries)) {
			categorieSalaries.forEach(e -> categorieSalarieDao.save(e));
		}
	}

}
