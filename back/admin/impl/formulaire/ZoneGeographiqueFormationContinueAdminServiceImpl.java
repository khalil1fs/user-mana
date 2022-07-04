package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ZoneGeographiqueFormationContinue;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.ZoneGeographique;
import com.ird.faa.dao.formulaire.ZoneGeographiqueFormationContinueDao;
import com.ird.faa.service.admin.facade.formulaire.ZoneGeographiqueFormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.ZoneGeographiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ZoneGeographiqueFormationContinueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ZoneGeographiqueFormationContinueAdminServiceImpl
		extends AbstractServiceImpl<ZoneGeographiqueFormationContinue>
		implements ZoneGeographiqueFormationContinueAdminService {

	@Autowired
	private ZoneGeographiqueFormationContinueDao zoneGeographiqueFormationContinueDao;

	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private ZoneGeographiqueAdminService zoneGeographiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ZoneGeographiqueFormationContinue> findAll() {
		return zoneGeographiqueFormationContinueDao.findAll();
	}

	@Override
	public List<ZoneGeographiqueFormationContinue> findByFormationContinueId(Long id) {
		return zoneGeographiqueFormationContinueDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return zoneGeographiqueFormationContinueDao.deleteByFormationContinueId(id);
	}

	@Override
	public List<ZoneGeographiqueFormationContinue> findByZoneGeographiqueCode(String code) {
		return zoneGeographiqueFormationContinueDao.findByZoneGeographiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByZoneGeographiqueCode(String code) {
		return zoneGeographiqueFormationContinueDao.deleteByZoneGeographiqueCode(code);
	}

	@Override
	public List<ZoneGeographiqueFormationContinue> findByZoneGeographiqueId(Long id) {
		return zoneGeographiqueFormationContinueDao.findByZoneGeographiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByZoneGeographiqueId(Long id) {
		return zoneGeographiqueFormationContinueDao.deleteByZoneGeographiqueId(id);
	}

	@Override
	public ZoneGeographiqueFormationContinue findById(Long id) {
		if (id == null)
			return null;
		return zoneGeographiqueFormationContinueDao.getOne(id);
	}

	@Override
	public ZoneGeographiqueFormationContinue findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (zoneGeographiqueFormationContinueDao.findById(id).isPresent()) {
			zoneGeographiqueFormationContinueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public ZoneGeographiqueFormationContinue update(
			ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue) {
		ZoneGeographiqueFormationContinue foundedZoneGeographiqueFormationContinue = findById(
				zoneGeographiqueFormationContinue.getId());
		if (foundedZoneGeographiqueFormationContinue == null)
			return null;
		else {
			return zoneGeographiqueFormationContinueDao.save(zoneGeographiqueFormationContinue);
		}
	}

	@Override
	public ZoneGeographiqueFormationContinue save(ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue) {

		findFormationContinue(zoneGeographiqueFormationContinue);
		findZoneGeographique(zoneGeographiqueFormationContinue);

		return zoneGeographiqueFormationContinueDao.save(zoneGeographiqueFormationContinue);

	}

	@Override
	public List<ZoneGeographiqueFormationContinue> save(
			List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues) {
		List<ZoneGeographiqueFormationContinue> list = new ArrayList<>();
		for (ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue : zoneGeographiqueFormationContinues) {
			list.add(save(zoneGeographiqueFormationContinue));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue) {
		if (zoneGeographiqueFormationContinue.getId() == null)
			return -1;
		ZoneGeographiqueFormationContinue foundedZoneGeographiqueFormationContinue = findById(
				zoneGeographiqueFormationContinue.getId());
		if (foundedZoneGeographiqueFormationContinue == null)
			return -1;
		zoneGeographiqueFormationContinueDao.delete(foundedZoneGeographiqueFormationContinue);
		return 1;
	}

	public List<ZoneGeographiqueFormationContinue> findByCriteria(
			ZoneGeographiqueFormationContinueVo zoneGeographiqueFormationContinueVo) {

		String query = "SELECT o FROM ZoneGeographiqueFormationContinue o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", zoneGeographiqueFormationContinueVo.getId());
		if (zoneGeographiqueFormationContinueVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					zoneGeographiqueFormationContinueVo.getFormationContinueVo().getId());
		}

		if (zoneGeographiqueFormationContinueVo.getZoneGeographiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "zoneGeographique.id", "=",
					zoneGeographiqueFormationContinueVo.getZoneGeographiqueVo().getId());
			query += SearchUtil.addConstraint("o", "zoneGeographique.code", "LIKE",
					zoneGeographiqueFormationContinueVo.getZoneGeographiqueVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findFormationContinue(ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue) {
		FormationContinue loadedFormationContinue = null;
		if (zoneGeographiqueFormationContinue.getFormationContinue() != null
				&& zoneGeographiqueFormationContinue.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(zoneGeographiqueFormationContinue.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		zoneGeographiqueFormationContinue.setFormationContinue(loadedFormationContinue);
	}

	private void findZoneGeographique(ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue) {
		ZoneGeographique loadedZoneGeographique = zoneGeographiqueService
				.findByIdOrCode(zoneGeographiqueFormationContinue.getZoneGeographique());

		if (loadedZoneGeographique == null) {
			return;
		}
		zoneGeographiqueFormationContinue.setZoneGeographique(loadedZoneGeographique);
	}

	@Override
	@Transactional
	public void delete(List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues) {
		if (ListUtil.isNotEmpty(zoneGeographiqueFormationContinues)) {
			zoneGeographiqueFormationContinues.forEach(e -> zoneGeographiqueFormationContinueDao.delete(e));
		}
	}

	@Override
	public void update(List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues) {
		if (ListUtil.isNotEmpty(zoneGeographiqueFormationContinues)) {
			zoneGeographiqueFormationContinues.forEach(e -> zoneGeographiqueFormationContinueDao.save(e));
		}
	}

}
