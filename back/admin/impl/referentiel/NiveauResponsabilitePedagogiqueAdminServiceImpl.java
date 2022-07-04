package com.ird.faa.service.admin.impl.referentiel;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.referentiel.NiveauResponsabilitePedagogique;
import com.ird.faa.dao.formulaire.NiveauResponsabilitePedagogiqueDao;
import com.ird.faa.service.admin.facade.referentiel.NiveauResponsabilitePedagogiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauResponsabilitePedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class NiveauResponsabilitePedagogiqueAdminServiceImpl extends
		AbstractServiceImpl<NiveauResponsabilitePedagogique> implements NiveauResponsabilitePedagogiqueAdminService {

	@Autowired
	private NiveauResponsabilitePedagogiqueDao niveauResponsabilitePedagogiqueDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<NiveauResponsabilitePedagogique> findAll() {
		return niveauResponsabilitePedagogiqueDao.findAll();
	}

	@Override
	public NiveauResponsabilitePedagogique findByCode(String code) {
		if (code == null)
			return null;
		return niveauResponsabilitePedagogiqueDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return niveauResponsabilitePedagogiqueDao.deleteByCode(code);
	}

	@Override
	public NiveauResponsabilitePedagogique findByIdOrCode(
			NiveauResponsabilitePedagogique niveauResponsabilitePedagogique) {
		NiveauResponsabilitePedagogique resultat = null;
		if (niveauResponsabilitePedagogique != null) {
			if (StringUtil.isNotEmpty(niveauResponsabilitePedagogique.getId())) {
				resultat = niveauResponsabilitePedagogiqueDao.getOne(niveauResponsabilitePedagogique.getId());
			} else if (StringUtil.isNotEmpty(niveauResponsabilitePedagogique.getCode())) {
				resultat = niveauResponsabilitePedagogiqueDao.findByCode(niveauResponsabilitePedagogique.getCode());
			}
		}
		return resultat;
	}

	@Override
	public NiveauResponsabilitePedagogique findById(Long id) {
		if (id == null)
			return null;
		return niveauResponsabilitePedagogiqueDao.getOne(id);
	}

	@Override
	public NiveauResponsabilitePedagogique findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (niveauResponsabilitePedagogiqueDao.findById(id).isPresent()) {
			niveauResponsabilitePedagogiqueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public NiveauResponsabilitePedagogique update(NiveauResponsabilitePedagogique niveauResponsabilitePedagogique) {
		NiveauResponsabilitePedagogique foundedNiveauResponsabilitePedagogique = findById(
				niveauResponsabilitePedagogique.getId());
		if (foundedNiveauResponsabilitePedagogique == null)
			return null;
		else {
			prepare(niveauResponsabilitePedagogique);
			return niveauResponsabilitePedagogiqueDao.save(niveauResponsabilitePedagogique);
		}
	}

	@Override
	public NiveauResponsabilitePedagogique save(NiveauResponsabilitePedagogique niveauResponsabilitePedagogique) {

		NiveauResponsabilitePedagogique result = null;
		NiveauResponsabilitePedagogique foundedNiveauResponsabilitePedagogique = findByCode(
				niveauResponsabilitePedagogique.getCode());
		if (foundedNiveauResponsabilitePedagogique == null) {
			prepare(niveauResponsabilitePedagogique);

			NiveauResponsabilitePedagogique savedNiveauResponsabilitePedagogique = niveauResponsabilitePedagogiqueDao
					.save(niveauResponsabilitePedagogique);

			result = savedNiveauResponsabilitePedagogique;
		}

		return result;
	}

	@Override
	public List<NiveauResponsabilitePedagogique> save(
			List<NiveauResponsabilitePedagogique> niveauResponsabilitePedagogiques) {
		List<NiveauResponsabilitePedagogique> list = new ArrayList<>();
		for (NiveauResponsabilitePedagogique niveauResponsabilitePedagogique : niveauResponsabilitePedagogiques) {
			list.add(save(niveauResponsabilitePedagogique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(NiveauResponsabilitePedagogique niveauResponsabilitePedagogique) {
		if (niveauResponsabilitePedagogique.getCode() == null)
			return -1;

		NiveauResponsabilitePedagogique foundedNiveauResponsabilitePedagogique = findByCode(
				niveauResponsabilitePedagogique.getCode());
		if (foundedNiveauResponsabilitePedagogique == null)
			return -1;
		niveauResponsabilitePedagogiqueDao.delete(foundedNiveauResponsabilitePedagogique);
		return 1;
	}

	public List<NiveauResponsabilitePedagogique> findByCriteria(
			NiveauResponsabilitePedagogiqueVo niveauResponsabilitePedagogiqueVo) {

		String query = "SELECT o FROM NiveauResponsabilitePedagogique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", niveauResponsabilitePedagogiqueVo.getId());
		query += SearchUtil.addConstraint("o", "libelle", "LIKE", niveauResponsabilitePedagogiqueVo.getLibelle());
		query += SearchUtil.addConstraint("o", "code", "LIKE", niveauResponsabilitePedagogiqueVo.getCode());
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	@Transactional
	public void delete(List<NiveauResponsabilitePedagogique> niveauResponsabilitePedagogiques) {
		if (ListUtil.isNotEmpty(niveauResponsabilitePedagogiques)) {
			niveauResponsabilitePedagogiques.forEach(e -> niveauResponsabilitePedagogiqueDao.delete(e));
		}
	}

	@Override
	public void update(List<NiveauResponsabilitePedagogique> niveauResponsabilitePedagogiques) {
		if (ListUtil.isNotEmpty(niveauResponsabilitePedagogiques)) {
			niveauResponsabilitePedagogiques.forEach(e -> niveauResponsabilitePedagogiqueDao.save(e));
		}
	}

}
