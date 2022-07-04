package com.ird.faa.service.admin.impl.referentiel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.PositionStatutaire;
import com.ird.faa.dao.referentiel.PositionStatutaireDao;
import com.ird.faa.service.admin.facade.referentiel.PositionStatutaireAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.PositionStatutaireVo;

@Service
public class PositionStatutaireAdminServiceImpl extends AbstractServiceImpl<PositionStatutaire>
		implements PositionStatutaireAdminService {

	@Autowired
	private PositionStatutaireDao positionStatutaireDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<PositionStatutaire> findAll() {
		return positionStatutaireDao.findAll();
	}

	@Override
	public PositionStatutaire findByCode(String code) {
		if (code == null)
			return null;
		return positionStatutaireDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return positionStatutaireDao.deleteByCode(code);
	}

	@Override
	public PositionStatutaire findByIdOrCode(PositionStatutaire positionStatutaire) {
		PositionStatutaire resultat = null;
		if (positionStatutaire != null) {
			if (StringUtil.isNotEmpty(positionStatutaire.getId())) {
				resultat = positionStatutaireDao.getOne(positionStatutaire.getId());
			} else if (StringUtil.isNotEmpty(positionStatutaire.getCode())) {
				resultat = positionStatutaireDao.findByCode(positionStatutaire.getCode());
			}
		}
		return resultat;
	}

	@Override
	public PositionStatutaire findById(Long id) {
		if (id == null)
			return null;
		return positionStatutaireDao.getOne(id);
	}

	@Override
	public PositionStatutaire findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (positionStatutaireDao.findById(id).isPresent()) {
			positionStatutaireDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public PositionStatutaire update(PositionStatutaire positionStatutaire) {
		PositionStatutaire foundedPositionStatutaire = findById(positionStatutaire.getId());
		if (foundedPositionStatutaire == null)
			return null;
		else {
			return positionStatutaireDao.save(positionStatutaire);
		}
	}

	@Override
	public PositionStatutaire save(PositionStatutaire PositionStatutaire) {

		PositionStatutaire result = null;
		PositionStatutaire foundedPositionStatutaire = findByCode(PositionStatutaire.getCode());
		if (foundedPositionStatutaire == null) {

			PositionStatutaire savedPositionStatutaire = positionStatutaireDao.save(PositionStatutaire);

			result = savedPositionStatutaire;
		}

		return result;
	}

	@Override
	public List<PositionStatutaire> save(List<PositionStatutaire> PositionStatutaires) {
		List<PositionStatutaire> list = new ArrayList<>();
		for (PositionStatutaire PositionStatutaire : PositionStatutaires) {
			list.add(save(PositionStatutaire));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(PositionStatutaire PositionStatutaire) {
		if (PositionStatutaire.getCode() == null)
			return -1;

		PositionStatutaire foundedPositionStatutaire = findByCode(PositionStatutaire.getCode());
		if (foundedPositionStatutaire == null)
			return -1;
		positionStatutaireDao.delete(foundedPositionStatutaire);
		return 1;
	}

	public List<PositionStatutaire> findByCriteria(PositionStatutaireVo PositionStatutaireVo) {

		String query = "SELECT o FROM PositionStatutaire o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", PositionStatutaireVo.getId());
		query += SearchUtil.addConstraint("o", "code", "LIKE", PositionStatutaireVo.getCode());
		query += SearchUtil.addConstraint("o", "libelleCourt", "LIKE", PositionStatutaireVo.getLibelleCourt());
		query += SearchUtil.addConstraint("o", "libelleLong", "LIKE", PositionStatutaireVo.getLibelleLong());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<PositionStatutaire> positionStatutaires) {
		if (ListUtil.isNotEmpty(positionStatutaires)) {
			positionStatutaires.forEach(e -> positionStatutaireDao.delete(e));
		}
	}

	@Override
	public void update(List<PositionStatutaire> positionStatutaires) {
		if (ListUtil.isNotEmpty(positionStatutaires)) {
			positionStatutaires.forEach(e -> positionStatutaireDao.save(e));
		}
	}

}
