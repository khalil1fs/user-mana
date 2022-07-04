package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEnjeuxIrd;
import com.ird.faa.bean.referentiel.EnjeuxIrd;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiqueEnjeuxIrdDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.EnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueEnjeuxIrdVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiqueEnjeuxIrdAdminServiceImpl
		extends AbstractServiceImpl<ResponsabilitePedagogiqueEnjeuxIrd>
		implements ResponsabilitePedagogiqueEnjeuxIrdAdminService {

	@Autowired
	private ResponsabilitePedagogiqueEnjeuxIrdDao responsabilitePedagogiqueEnjeuxIrdDao;

	@Autowired
	private EnjeuxIrdAdminService enjeuxIrdService;
	@Autowired
	private ResponsabilitePedagogiqueAdminService responsabilitePedagogiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ResponsabilitePedagogiqueEnjeuxIrd> findAll() {
		return responsabilitePedagogiqueEnjeuxIrdDao.findAll();
	}

	@Override
	public List<ResponsabilitePedagogiqueEnjeuxIrd> findByEnjeuxIrdCode(String code) {
		return responsabilitePedagogiqueEnjeuxIrdDao.findByEnjeuxIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdCode(String code) {
		return responsabilitePedagogiqueEnjeuxIrdDao.deleteByEnjeuxIrdCode(code);
	}

	@Override
	public List<ResponsabilitePedagogiqueEnjeuxIrd> findByEnjeuxIrdId(Long id) {
		return responsabilitePedagogiqueEnjeuxIrdDao.findByEnjeuxIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByEnjeuxIrdId(Long id) {
		return responsabilitePedagogiqueEnjeuxIrdDao.deleteByEnjeuxIrdId(id);
	}

	@Override
	public List<ResponsabilitePedagogiqueEnjeuxIrd> findByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueEnjeuxIrdDao.findByResponsabilitePedagogiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueEnjeuxIrdDao.deleteByResponsabilitePedagogiqueId(id);
	}

	@Override
	public ResponsabilitePedagogiqueEnjeuxIrd findById(Long id) {
		if (id == null)
			return null;
		return responsabilitePedagogiqueEnjeuxIrdDao.getOne(id);
	}

	@Override
	public ResponsabilitePedagogiqueEnjeuxIrd findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (responsabilitePedagogiqueEnjeuxIrdDao.findById(id).isPresent()) {
			responsabilitePedagogiqueEnjeuxIrdDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public ResponsabilitePedagogiqueEnjeuxIrd update(
			ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd) {
		ResponsabilitePedagogiqueEnjeuxIrd foundedResponsabilitePedagogiqueEnjeuxIrd = findById(
				responsabilitePedagogiqueEnjeuxIrd.getId());
		if (foundedResponsabilitePedagogiqueEnjeuxIrd == null)
			return null;
		else {
			return responsabilitePedagogiqueEnjeuxIrdDao.save(responsabilitePedagogiqueEnjeuxIrd);
		}
	}

	@Override
	public ResponsabilitePedagogiqueEnjeuxIrd save(
			ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd) {

		findEnjeuxIrd(responsabilitePedagogiqueEnjeuxIrd);
		findResponsabilitePedagogique(responsabilitePedagogiqueEnjeuxIrd);

		return responsabilitePedagogiqueEnjeuxIrdDao.save(responsabilitePedagogiqueEnjeuxIrd);

	}

	@Override
	public List<ResponsabilitePedagogiqueEnjeuxIrd> save(
			List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds) {
		List<ResponsabilitePedagogiqueEnjeuxIrd> list = new ArrayList<>();
		for (ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd : responsabilitePedagogiqueEnjeuxIrds) {
			list.add(save(responsabilitePedagogiqueEnjeuxIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd) {
		if (responsabilitePedagogiqueEnjeuxIrd.getId() == null)
			return -1;
		ResponsabilitePedagogiqueEnjeuxIrd foundedResponsabilitePedagogiqueEnjeuxIrd = findById(
				responsabilitePedagogiqueEnjeuxIrd.getId());
		if (foundedResponsabilitePedagogiqueEnjeuxIrd == null)
			return -1;
		responsabilitePedagogiqueEnjeuxIrdDao.delete(foundedResponsabilitePedagogiqueEnjeuxIrd);
		return 1;
	}

	public List<ResponsabilitePedagogiqueEnjeuxIrd> findByCriteria(
			ResponsabilitePedagogiqueEnjeuxIrdVo responsabilitePedagogiqueEnjeuxIrdVo) {

		String query = "SELECT o FROM ResponsabilitePedagogiqueEnjeuxIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", responsabilitePedagogiqueEnjeuxIrdVo.getId());
		if (responsabilitePedagogiqueEnjeuxIrdVo.getEnjeuxIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "enjeuxIrd.id", "=",
					responsabilitePedagogiqueEnjeuxIrdVo.getEnjeuxIrdVo().getId());
			query += SearchUtil.addConstraint("o", "enjeuxIrd.code", "LIKE",
					responsabilitePedagogiqueEnjeuxIrdVo.getEnjeuxIrdVo().getCode());
		}

		if (responsabilitePedagogiqueEnjeuxIrdVo.getResponsabilitePedagogiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "responsabilitePedagogique.id", "=",
					responsabilitePedagogiqueEnjeuxIrdVo.getResponsabilitePedagogiqueVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findEnjeuxIrd(ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd) {
		EnjeuxIrd loadedEnjeuxIrd = enjeuxIrdService.findByIdOrCode(responsabilitePedagogiqueEnjeuxIrd.getEnjeuxIrd());

		if (loadedEnjeuxIrd == null) {
			return;
		}
		responsabilitePedagogiqueEnjeuxIrd.setEnjeuxIrd(loadedEnjeuxIrd);
	}

	private void findResponsabilitePedagogique(ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd) {
		ResponsabilitePedagogique loadedResponsabilitePedagogique = null;
		if (responsabilitePedagogiqueEnjeuxIrd.getResponsabilitePedagogique() != null
				&& responsabilitePedagogiqueEnjeuxIrd.getResponsabilitePedagogique().getId() != null)
			loadedResponsabilitePedagogique = responsabilitePedagogiqueService
					.findById(responsabilitePedagogiqueEnjeuxIrd.getResponsabilitePedagogique().getId());

		if (loadedResponsabilitePedagogique == null) {
			return;
		}
		responsabilitePedagogiqueEnjeuxIrd.setResponsabilitePedagogique(loadedResponsabilitePedagogique);
	}

	@Override
	@Transactional
	public void delete(List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEnjeuxIrds)) {
			responsabilitePedagogiqueEnjeuxIrds.forEach(e -> responsabilitePedagogiqueEnjeuxIrdDao.delete(e));
		}
	}

	@Override
	public void update(List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEnjeuxIrds)) {
			responsabilitePedagogiqueEnjeuxIrds.forEach(e -> responsabilitePedagogiqueEnjeuxIrdDao.save(e));
		}
	}

}
