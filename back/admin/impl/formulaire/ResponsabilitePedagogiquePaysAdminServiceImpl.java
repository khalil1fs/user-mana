package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiquePays;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiquePaysDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiquePaysAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiquePaysVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiquePaysAdminServiceImpl extends AbstractServiceImpl<ResponsabilitePedagogiquePays>
		implements ResponsabilitePedagogiquePaysAdminService {

	@Autowired
	private ResponsabilitePedagogiquePaysDao responsabilitePedagogiquePaysDao;

	@Autowired
	private ResponsabilitePedagogiqueAdminService responsabilitePedagogiqueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ResponsabilitePedagogiquePays> findAll() {
		return responsabilitePedagogiquePaysDao.findAll();
	}

	@Override
	public List<ResponsabilitePedagogiquePays> findByPaysCode(String code) {
		return responsabilitePedagogiquePaysDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return responsabilitePedagogiquePaysDao.deleteByPaysCode(code);
	}

	@Override
	public List<ResponsabilitePedagogiquePays> findByPaysId(Long id) {
		return responsabilitePedagogiquePaysDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return responsabilitePedagogiquePaysDao.deleteByPaysId(id);
	}

	@Override
	public List<ResponsabilitePedagogiquePays> findByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiquePaysDao.findByResponsabilitePedagogiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiquePaysDao.deleteByResponsabilitePedagogiqueId(id);
	}

	@Override
	public ResponsabilitePedagogiquePays findById(Long id) {
		if (id == null)
			return null;
		return responsabilitePedagogiquePaysDao.getOne(id);
	}

	@Override
	public ResponsabilitePedagogiquePays findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (responsabilitePedagogiquePaysDao.findById(id).isPresent()) {
			responsabilitePedagogiquePaysDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public ResponsabilitePedagogiquePays update(ResponsabilitePedagogiquePays responsabilitePedagogiquePays) {
		ResponsabilitePedagogiquePays foundedResponsabilitePedagogiquePays = findById(
				responsabilitePedagogiquePays.getId());
		if (foundedResponsabilitePedagogiquePays == null)
			return null;
		else {
			return responsabilitePedagogiquePaysDao.save(responsabilitePedagogiquePays);
		}
	}

	@Override
	public ResponsabilitePedagogiquePays save(ResponsabilitePedagogiquePays responsabilitePedagogiquePays) {

		findPays(responsabilitePedagogiquePays);
		findResponsabilitePedagogique(responsabilitePedagogiquePays);

		return responsabilitePedagogiquePaysDao.save(responsabilitePedagogiquePays);

	}

	@Override
	public List<ResponsabilitePedagogiquePays> save(
			List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss) {
		List<ResponsabilitePedagogiquePays> list = new ArrayList<>();
		for (ResponsabilitePedagogiquePays responsabilitePedagogiquePays : responsabilitePedagogiquePayss) {
			list.add(save(responsabilitePedagogiquePays));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ResponsabilitePedagogiquePays responsabilitePedagogiquePays) {
		if (responsabilitePedagogiquePays.getId() == null)
			return -1;
		ResponsabilitePedagogiquePays foundedResponsabilitePedagogiquePays = findById(
				responsabilitePedagogiquePays.getId());
		if (foundedResponsabilitePedagogiquePays == null)
			return -1;
		responsabilitePedagogiquePaysDao.delete(foundedResponsabilitePedagogiquePays);
		return 1;
	}

	public List<ResponsabilitePedagogiquePays> findByCriteria(
			ResponsabilitePedagogiquePaysVo responsabilitePedagogiquePaysVo) {

		String query = "SELECT o FROM ResponsabilitePedagogiquePays o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", responsabilitePedagogiquePaysVo.getId());
		if (responsabilitePedagogiquePaysVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=", responsabilitePedagogiquePaysVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
					responsabilitePedagogiquePaysVo.getPaysVo().getCode());
		}

		if (responsabilitePedagogiquePaysVo.getResponsabilitePedagogiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "responsabilitePedagogique.id", "=",
					responsabilitePedagogiquePaysVo.getResponsabilitePedagogiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findPays(ResponsabilitePedagogiquePays responsabilitePedagogiquePays) {
		Pays loadedPays = paysService.findByIdOrCode(responsabilitePedagogiquePays.getPays());

		if (loadedPays == null) {
			return;
		}
		responsabilitePedagogiquePays.setPays(loadedPays);
	}

	private void findResponsabilitePedagogique(ResponsabilitePedagogiquePays responsabilitePedagogiquePays) {
		ResponsabilitePedagogique loadedResponsabilitePedagogique = null;
		if (responsabilitePedagogiquePays.getResponsabilitePedagogique() != null
				&& responsabilitePedagogiquePays.getResponsabilitePedagogique().getId() != null)
			loadedResponsabilitePedagogique = responsabilitePedagogiqueService
					.findById(responsabilitePedagogiquePays.getResponsabilitePedagogique().getId());

		if (loadedResponsabilitePedagogique == null) {
			return;
		}
		responsabilitePedagogiquePays.setResponsabilitePedagogique(loadedResponsabilitePedagogique);
	}

	@Override
	@Transactional
	public void delete(List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiquePayss)) {
			responsabilitePedagogiquePayss.forEach(e -> responsabilitePedagogiquePaysDao.delete(e));
		}
	}

	@Override
	public void update(List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiquePayss)) {
			responsabilitePedagogiquePayss.forEach(e -> responsabilitePedagogiquePaysDao.save(e));
		}
	}

}
