package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEtablissement;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiqueEtablissementDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueEtablissementAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueEtablissementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiqueEtablissementAdminServiceImpl
		extends AbstractServiceImpl<ResponsabilitePedagogiqueEtablissement>
		implements ResponsabilitePedagogiqueEtablissementAdminService {

	@Autowired
	private ResponsabilitePedagogiqueEtablissementDao responsabilitePedagogiqueEtablissementDao;

	@Autowired
	private EtablissementAdminService etablissementService;
	@Autowired
	private ResponsabilitePedagogiqueAdminService responsabilitePedagogiqueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findAll() {
		return responsabilitePedagogiqueEtablissementDao.findAll();
	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findByEtablissementCode(String code) {
		return responsabilitePedagogiqueEtablissementDao.findByEtablissementCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtablissementCode(String code) {
		return responsabilitePedagogiqueEtablissementDao.deleteByEtablissementCode(code);
	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findByEtablissementId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.findByEtablissementId(id);
	}

	@Override
	@Transactional
	public int deleteByEtablissementId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.deleteByEtablissementId(id);
	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.findByResponsabilitePedagogiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.deleteByResponsabilitePedagogiqueId(id);
	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findByPaysCode(String code) {
		return responsabilitePedagogiqueEtablissementDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return responsabilitePedagogiqueEtablissementDao.deleteByPaysCode(code);
	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> findByPaysId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return responsabilitePedagogiqueEtablissementDao.deleteByPaysId(id);
	}

	@Override
	public ResponsabilitePedagogiqueEtablissement findById(Long id) {
		if (id == null)
			return null;
		return responsabilitePedagogiqueEtablissementDao.getOne(id);
	}

	@Override
	public ResponsabilitePedagogiqueEtablissement findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (responsabilitePedagogiqueEtablissementDao.findById(id).isPresent()) {
			responsabilitePedagogiqueEtablissementDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public ResponsabilitePedagogiqueEtablissement update(
			ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {
		ResponsabilitePedagogiqueEtablissement foundedResponsabilitePedagogiqueEtablissement = findById(
				responsabilitePedagogiqueEtablissement.getId());
		if (foundedResponsabilitePedagogiqueEtablissement == null)
			return null;
		else {
			return responsabilitePedagogiqueEtablissementDao.save(responsabilitePedagogiqueEtablissement);
		}
	}

	@Override
	public ResponsabilitePedagogiqueEtablissement save(
			ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {

		findEtablissement(responsabilitePedagogiqueEtablissement);
		findResponsabilitePedagogique(responsabilitePedagogiqueEtablissement);
		findPays(responsabilitePedagogiqueEtablissement);

		return responsabilitePedagogiqueEtablissementDao.save(responsabilitePedagogiqueEtablissement);

	}

	@Override
	public List<ResponsabilitePedagogiqueEtablissement> save(
			List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements) {
		List<ResponsabilitePedagogiqueEtablissement> list = new ArrayList<>();
		for (ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement : responsabilitePedagogiqueEtablissements) {
			list.add(save(responsabilitePedagogiqueEtablissement));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {
		if (responsabilitePedagogiqueEtablissement.getId() == null)
			return -1;
		ResponsabilitePedagogiqueEtablissement foundedResponsabilitePedagogiqueEtablissement = findById(
				responsabilitePedagogiqueEtablissement.getId());
		if (foundedResponsabilitePedagogiqueEtablissement == null)
			return -1;
		responsabilitePedagogiqueEtablissementDao.delete(foundedResponsabilitePedagogiqueEtablissement);
		return 1;
	}

	public List<ResponsabilitePedagogiqueEtablissement> findByCriteria(
			ResponsabilitePedagogiqueEtablissementVo responsabilitePedagogiqueEtablissementVo) {

		String query = "SELECT o FROM ResponsabilitePedagogiqueEtablissement o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", responsabilitePedagogiqueEtablissementVo.getId());
		if (responsabilitePedagogiqueEtablissementVo.getEtablissementVo() != null) {
			query += SearchUtil.addConstraint("o", "etablissement.id", "=",
					responsabilitePedagogiqueEtablissementVo.getEtablissementVo().getId());
			query += SearchUtil.addConstraint("o", "etablissement.code", "LIKE",
					responsabilitePedagogiqueEtablissementVo.getEtablissementVo().getCode());
		}

		if (responsabilitePedagogiqueEtablissementVo.getResponsabilitePedagogiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "responsabilitePedagogique.id", "=",
					responsabilitePedagogiqueEtablissementVo.getResponsabilitePedagogiqueVo().getId());
		}

		if (responsabilitePedagogiqueEtablissementVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=",
					responsabilitePedagogiqueEtablissementVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					responsabilitePedagogiqueEtablissementVo.getPaysVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEtablissement(ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {
		Etablissement loadedEtablissement = etablissementService
				.findByIdOrCode(responsabilitePedagogiqueEtablissement.getEtablissement());

		if (loadedEtablissement == null) {
			return;
		}
		responsabilitePedagogiqueEtablissement.setEtablissement(loadedEtablissement);
	}

	private void findResponsabilitePedagogique(
			ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {
		ResponsabilitePedagogique loadedResponsabilitePedagogique = null;
		if (responsabilitePedagogiqueEtablissement.getResponsabilitePedagogique() != null
				&& responsabilitePedagogiqueEtablissement.getResponsabilitePedagogique().getId() != null)
			loadedResponsabilitePedagogique = responsabilitePedagogiqueService
					.findById(responsabilitePedagogiqueEtablissement.getResponsabilitePedagogique().getId());

		if (loadedResponsabilitePedagogique == null) {
			return;
		}
		responsabilitePedagogiqueEtablissement.setResponsabilitePedagogique(loadedResponsabilitePedagogique);
	}

	private void findPays(ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement) {
		Pays loadedPays = paysService.findByIdOrCode(responsabilitePedagogiqueEtablissement.getPays());

		if (loadedPays == null) {
			return;
		}
		responsabilitePedagogiqueEtablissement.setPays(loadedPays);
	}

	@Override
	@Transactional
	public void delete(List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEtablissements)) {
			responsabilitePedagogiqueEtablissements.forEach(e -> responsabilitePedagogiqueEtablissementDao.delete(e));
		}
	}

	@Override
	public void update(List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEtablissements)) {
			responsabilitePedagogiqueEtablissements.forEach(e -> responsabilitePedagogiqueEtablissementDao.save(e));
		}
	}

}
