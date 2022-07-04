package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.PaysFormationContinue;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.dao.formulaire.PaysFormationContinueDao;
import com.ird.faa.service.admin.facade.formulaire.PaysFormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.PaysFormationContinueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaysFormationContinueAdminServiceImpl extends AbstractServiceImpl<PaysFormationContinue>
		implements PaysFormationContinueAdminService {

	@Autowired
	private PaysFormationContinueDao paysFormationContinueDao;

	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<PaysFormationContinue> findAll() {
		return paysFormationContinueDao.findAll();
	}

	@Override
	public List<PaysFormationContinue> findByPaysCode(String code) {
		return paysFormationContinueDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return paysFormationContinueDao.deleteByPaysCode(code);
	}

	@Override
	public List<PaysFormationContinue> findByPaysId(Long id) {
		return paysFormationContinueDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return paysFormationContinueDao.deleteByPaysId(id);
	}

	@Override
	public List<PaysFormationContinue> findByFormationContinueId(Long id) {
		return paysFormationContinueDao.findByFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByFormationContinueId(Long id) {
		return paysFormationContinueDao.deleteByFormationContinueId(id);
	}

	@Override
	public PaysFormationContinue findById(Long id) {
		if (id == null)
			return null;
		return paysFormationContinueDao.getOne(id);
	}

	@Override
	public PaysFormationContinue findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (paysFormationContinueDao.findById(id).isPresent()) {
			paysFormationContinueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public PaysFormationContinue update(PaysFormationContinue paysFormationContinue) {
		PaysFormationContinue foundedPaysFormationContinue = findById(paysFormationContinue.getId());
		if (foundedPaysFormationContinue == null)
			return null;
		else {
			return paysFormationContinueDao.save(paysFormationContinue);
		}
	}

	@Override
	public PaysFormationContinue save(PaysFormationContinue paysFormationContinue) {

		findPays(paysFormationContinue);
		findFormationContinue(paysFormationContinue);

		return paysFormationContinueDao.save(paysFormationContinue);

	}

	@Override
	public List<PaysFormationContinue> save(List<PaysFormationContinue> paysFormationContinues) {
		List<PaysFormationContinue> list = new ArrayList<>();
		for (PaysFormationContinue paysFormationContinue : paysFormationContinues) {
			list.add(save(paysFormationContinue));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(PaysFormationContinue paysFormationContinue) {
		if (paysFormationContinue.getId() == null)
			return -1;
		PaysFormationContinue foundedPaysFormationContinue = findById(paysFormationContinue.getId());
		if (foundedPaysFormationContinue == null)
			return -1;
		paysFormationContinueDao.delete(foundedPaysFormationContinue);
		return 1;
	}

	public List<PaysFormationContinue> findByCriteria(PaysFormationContinueVo paysFormationContinueVo) {

		String query = "SELECT o FROM PaysFormationContinue o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", paysFormationContinueVo.getId());
		if (paysFormationContinueVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=", paysFormationContinueVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE", paysFormationContinueVo.getPaysVo().getCode());
		}

		if (paysFormationContinueVo.getFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "formationContinue.id", "=",
					paysFormationContinueVo.getFormationContinueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findPays(PaysFormationContinue paysFormationContinue) {
		Pays loadedPays = paysService.findByIdOrCode(paysFormationContinue.getPays());

		if (loadedPays == null) {
			return;
		}
		paysFormationContinue.setPays(loadedPays);
	}

	private void findFormationContinue(PaysFormationContinue paysFormationContinue) {
		FormationContinue loadedFormationContinue = null;
		if (paysFormationContinue.getFormationContinue() != null
				&& paysFormationContinue.getFormationContinue().getId() != null)
			loadedFormationContinue = formationContinueService
					.findById(paysFormationContinue.getFormationContinue().getId());

		if (loadedFormationContinue == null) {
			return;
		}
		paysFormationContinue.setFormationContinue(loadedFormationContinue);
	}

	@Override
	@Transactional
	public void delete(List<PaysFormationContinue> paysFormationContinues) {
		if (ListUtil.isNotEmpty(paysFormationContinues)) {
			paysFormationContinues.forEach(e -> paysFormationContinueDao.delete(e));
		}
	}

	@Override
	public void update(List<PaysFormationContinue> paysFormationContinues) {
		if (ListUtil.isNotEmpty(paysFormationContinues)) {
			paysFormationContinues.forEach(e -> paysFormationContinueDao.save(e));
		}
	}

}
