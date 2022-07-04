package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementPays;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.dao.formulaire.EnseignementPaysDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementPaysAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementPaysVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementPaysAdminServiceImpl extends AbstractServiceImpl<EnseignementPays>
		implements EnseignementPaysAdminService {

	@Autowired
	private EnseignementPaysDao enseignementPaysDao;

	@Autowired
	private EnseignementAdminService enseignementService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EnseignementPays> findAll() {
		return enseignementPaysDao.findAll();
	}

	@Override
	public List<EnseignementPays> findByPaysCode(String code) {
		return enseignementPaysDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return enseignementPaysDao.deleteByPaysCode(code);
	}

	@Override
	public List<EnseignementPays> findByPaysId(Long id) {
		return enseignementPaysDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return enseignementPaysDao.deleteByPaysId(id);
	}

	@Override
	public List<EnseignementPays> findByEnseignementId(Long id) {
		return enseignementPaysDao.findByEnseignementId(id);
	}

	@Override
	@Transactional
	public int deleteByEnseignementId(Long id) {
		return enseignementPaysDao.deleteByEnseignementId(id);
	}

	@Override
	public EnseignementPays findById(Long id) {
		if (id == null)
			return null;
		return enseignementPaysDao.getOne(id);
	}

	@Override
	public EnseignementPays findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (enseignementPaysDao.findById(id).isPresent()) {
			enseignementPaysDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public EnseignementPays update(EnseignementPays enseignementPays) {
		EnseignementPays foundedEnseignementPays = findById(enseignementPays.getId());
		if (foundedEnseignementPays == null)
			return null;
		else {
			return enseignementPaysDao.save(enseignementPays);
		}
	}

	@Override
	public EnseignementPays save(EnseignementPays enseignementPays) {

		findPays(enseignementPays);
		findEnseignement(enseignementPays);

		return enseignementPaysDao.save(enseignementPays);

	}

	@Override
	public List<EnseignementPays> save(List<EnseignementPays> enseignementPayss) {
		List<EnseignementPays> list = new ArrayList<>();
		for (EnseignementPays enseignementPays : enseignementPayss) {
			list.add(save(enseignementPays));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EnseignementPays enseignementPays) {
		if (enseignementPays.getId() == null)
			return -1;
		EnseignementPays foundedEnseignementPays = findById(enseignementPays.getId());
		if (foundedEnseignementPays == null)
			return -1;
		enseignementPaysDao.delete(foundedEnseignementPays);
		return 1;
	}

	public List<EnseignementPays> findByCriteria(EnseignementPaysVo enseignementPaysVo) {

		String query = "SELECT o FROM EnseignementPays o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", enseignementPaysVo.getId());
		if (enseignementPaysVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=", enseignementPaysVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE", enseignementPaysVo.getPaysVo().getCode());
		}

		if (enseignementPaysVo.getEnseignementVo() != null) {
			query += SearchUtil.addConstraint("o", "enseignement.id", "=",
					enseignementPaysVo.getEnseignementVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findPays(EnseignementPays enseignementPays) {
		Pays loadedPays = paysService.findByIdOrCode(enseignementPays.getPays());

		if (loadedPays == null) {
			return;
		}
		enseignementPays.setPays(loadedPays);
	}

	private void findEnseignement(EnseignementPays enseignementPays) {
		Enseignement loadedEnseignement = null;
		if (enseignementPays.getEnseignement() != null && enseignementPays.getEnseignement().getId() != null)
			loadedEnseignement = enseignementService.findById(enseignementPays.getEnseignement().getId());

		if (loadedEnseignement == null) {
			return;
		}
		enseignementPays.setEnseignement(loadedEnseignement);
	}

	@Override
	@Transactional
	public void delete(List<EnseignementPays> enseignementPayss) {
		if (ListUtil.isNotEmpty(enseignementPayss)) {
			enseignementPayss.forEach(e -> enseignementPaysDao.delete(e));
		}
	}

	@Override
	public void update(List<EnseignementPays> enseignementPayss) {
		if (ListUtil.isNotEmpty(enseignementPayss)) {
			enseignementPayss.forEach(e -> enseignementPaysDao.save(e));
		}
	}

}
