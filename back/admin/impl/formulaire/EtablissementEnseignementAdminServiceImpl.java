package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EtablissementEnseignement;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.EtablissementEnseignementDao;
import com.ird.faa.service.admin.facade.formulaire.EtablissementEnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementEnseignementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EtablissementEnseignementAdminServiceImpl
		extends AbstractServiceImpl<EtablissementEnseignement>
		implements EtablissementEnseignementAdminService {

	@Autowired
	private EtablissementEnseignementDao etablissementEnseignementDao;

	@Autowired
	private EtablissementAdminService etablissementService;
	@Autowired
	private EnseignementAdminService enseignementService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EtablissementEnseignement> findAll() {
		return etablissementEnseignementDao.findAll();
	}

	@Override
	public List<EtablissementEnseignement> findByEtablissementCode(String code) {
		return etablissementEnseignementDao.findByEtablissementCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtablissementCode(String code) {
		return etablissementEnseignementDao.deleteByEtablissementCode(code);
	}

	@Override
	public List<EtablissementEnseignement> findByEtablissementId(Long id) {
		return etablissementEnseignementDao.findByEtablissementId(id);
	}

	@Override
	@Transactional
	public int deleteByEtablissementId(Long id) {
		return etablissementEnseignementDao.deleteByEtablissementId(id);
	}

	@Override
	public List<EtablissementEnseignement> findByEnseignementId(Long id) {
		return etablissementEnseignementDao.findByEnseignementId(id);
	}

	@Override
	@Transactional
	public int deleteByEnseignementId(Long id) {
		return etablissementEnseignementDao.deleteByEnseignementId(id);
	}

	@Override
	public List<EtablissementEnseignement> findByPaysCode(String code) {
		return etablissementEnseignementDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return etablissementEnseignementDao.deleteByPaysCode(code);
	}

	@Override
	public List<EtablissementEnseignement> findByPaysId(Long id) {
		return etablissementEnseignementDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return etablissementEnseignementDao.deleteByPaysId(id);
	}

	@Override
	public EtablissementEnseignement findById(Long id) {
		if (id == null)
			return null;
		return etablissementEnseignementDao.getOne(id);
	}

	@Override
	public EtablissementEnseignement findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (etablissementEnseignementDao.findById(id).isPresent()) {
			etablissementEnseignementDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public EtablissementEnseignement update(
			EtablissementEnseignement etablissementEnseignement) {
		EtablissementEnseignement foundedEtablissementEnseignement = findById(
				etablissementEnseignement.getId());
		if (foundedEtablissementEnseignement == null)
			return null;
		else {
			return etablissementEnseignementDao.save(etablissementEnseignement);
		}
	}

	@Override
	public EtablissementEnseignement save(
			EtablissementEnseignement etablissementEnseignement) {

		findEtablissement(etablissementEnseignement);
		findEnseignement(etablissementEnseignement);
		findPays(etablissementEnseignement);

		return etablissementEnseignementDao.save(etablissementEnseignement);

	}

	@Override
	public List<EtablissementEnseignement> save(
			List<EtablissementEnseignement> etablissementEnseignements) {
		List<EtablissementEnseignement> list = new ArrayList<>();
		for (EtablissementEnseignement etablissementEnseignement : etablissementEnseignements) {
			list.add(save(etablissementEnseignement));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EtablissementEnseignement etablissementEnseignement) {
		if (etablissementEnseignement.getId() == null)
			return -1;
		EtablissementEnseignement foundedEtablissementEnseignement = findById(
				etablissementEnseignement.getId());
		if (foundedEtablissementEnseignement == null)
			return -1;
		etablissementEnseignementDao.delete(foundedEtablissementEnseignement);
		return 1;
	}

	public List<EtablissementEnseignement> findByCriteria(
			EtablissementEnseignementVo etablissementEnseignementVo) {

		String query = "SELECT o FROM EtablissementEnseignement o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", etablissementEnseignementVo.getId());
		if (etablissementEnseignementVo.getEtablissementVo() != null) {
			query += SearchUtil.addConstraint("o", "etablissement.id", "=",
					etablissementEnseignementVo.getEtablissementVo().getId());
			query += SearchUtil.addConstraint("o", "etablissement.code", "LIKE",
					etablissementEnseignementVo.getEtablissementVo().getCode());
		}

		if (etablissementEnseignementVo.getEnseignementVo() != null) {
			query += SearchUtil.addConstraint("o", "enseignement.id", "=",
					etablissementEnseignementVo.getEnseignementVo().getId());
		}

		if (etablissementEnseignementVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					etablissementEnseignementVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					etablissementEnseignementVo.getPaysVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEtablissement(EtablissementEnseignement etablissementEnseignement) {
		Etablissement loadedEtablissement = etablissementService
				.findByIdOrCode(etablissementEnseignement.getEtablissement());

		if (loadedEtablissement == null) {
			return;
		}
		etablissementEnseignement.setEtablissement(loadedEtablissement);
	}

	private void findEnseignement(
			EtablissementEnseignement etablissementEnseignement) {
		Enseignement loadedEnseignement = null;
		if (etablissementEnseignement.getEnseignement() != null
				&& etablissementEnseignement.getEnseignement().getId() != null)
			loadedEnseignement = enseignementService
					.findById(etablissementEnseignement.getEnseignement().getId());

		if (loadedEnseignement == null) {
			return;
		}
		etablissementEnseignement.setEnseignement(loadedEnseignement);
	}

	private void findPays(EtablissementEnseignement etablissementEnseignement) {
		Pays loadedPays = paysService.findByIdOrCode(etablissementEnseignement.getPays());

		if (loadedPays == null) {
			return;
		}
		etablissementEnseignement.setPays(loadedPays);
	}

	@Override
	@Transactional
	public void delete(List<EtablissementEnseignement> etablissementEnseignements) {
		if (ListUtil.isNotEmpty(etablissementEnseignements)) {
			etablissementEnseignements.forEach(e -> etablissementEnseignementDao.delete(e));
		}
	}

	@Override
	public void update(List<EtablissementEnseignement> etablissementEnseignements) {
		if (ListUtil.isNotEmpty(etablissementEnseignements)) {
			etablissementEnseignements.forEach(e -> etablissementEnseignementDao.save(e));
		}
	}

}
