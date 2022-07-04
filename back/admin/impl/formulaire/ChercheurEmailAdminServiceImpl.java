package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.ird.faa.bean.formulaire.ChercheurEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.ChercheurEmailDao;
import com.ird.faa.service.admin.facade.formulaire.ChercheurEmailAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurEmailVo;

@Service
public class ChercheurEmailAdminServiceImpl extends AbstractServiceImpl<ChercheurEmail>
		implements ChercheurEmailAdminService {

	@Autowired
	private ChercheurEmailDao chercheurEmailDao;

	@Autowired
	private ChercheurAdminService chercheurService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ChercheurEmail> findAll() {
		return chercheurEmailDao.findAll();
	}

	@Override
	public List<ChercheurEmail> findByChercheurNumeroMatricule(String numeroMatricule) {
		return chercheurEmailDao.findByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	@Transactional
	public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
		return chercheurEmailDao.deleteByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	public List<ChercheurEmail> findByChercheurId(Long id) {
		return chercheurEmailDao.findByChercheurId(id);
	}

	@Override
	@Transactional
	public int deleteByChercheurId(Long id) {
		return chercheurEmailDao.deleteByChercheurId(id);
	}

	@Override
	public ChercheurEmail findById(Long id) {
		if (id == null)
			return null;
		return chercheurEmailDao.getOne(id);
	}

	@Override
	public ChercheurEmail findByIdWithAssociatedList(Long id) {
		ChercheurEmail chercheurEmail = findById(id);
		return chercheurEmail;
	}

	@Transactional
	public int deleteById(Long id) {
		if (chercheurEmailDao.findById(id) == null)
			return 0;
		else {
			chercheurEmailDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public ChercheurEmail update(ChercheurEmail chercheurEmail) {
		ChercheurEmail foundedChercheurEmail = findById(chercheurEmail.getId());
		if (foundedChercheurEmail == null)
			return null;
		else {
			return chercheurEmailDao.save(chercheurEmail);
		}
	}

	@Override
	public ChercheurEmail save(ChercheurEmail chercheurEmail) {

		findChercheur(chercheurEmail);

		ChercheurEmail savedChercheurEmail = chercheurEmailDao.save(chercheurEmail);
		return savedChercheurEmail;
	}

	@Override
	public List<ChercheurEmail> save(List<ChercheurEmail> chercheurEmails) {
		List<ChercheurEmail> list = new ArrayList<ChercheurEmail>();
		for (ChercheurEmail chercheurEmail : chercheurEmails) {
			list.add(save(chercheurEmail));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ChercheurEmail chercheurEmail) {
		if (chercheurEmail.getId() == null)
			return -1;
		ChercheurEmail foundedChercheurEmail = findById(chercheurEmail.getId());
		if (foundedChercheurEmail == null)
			return -1;
		chercheurEmailDao.delete(foundedChercheurEmail);
		return 1;
	}

	public List<ChercheurEmail> findByCriteria(ChercheurEmailVo chercheurEmailVo) {

		String query = "SELECT o FROM ChercheurEmail o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", chercheurEmailVo.getId());
		query += SearchUtil.addConstraint("o", "email", "LIKE", chercheurEmailVo.getEmail());
		query += SearchUtil.addConstraint("o", "principale", "=", chercheurEmailVo.getPrincipale());
		if (chercheurEmailVo.getChercheurVo() != null) {
			query += SearchUtil.addConstraint("o", "chercheur.id", "=", chercheurEmailVo.getChercheurVo().getId());
			query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
					chercheurEmailVo.getChercheurVo().getNumeroMatricule());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findChercheur(ChercheurEmail chercheurEmail) {
		Chercheur loadedChercheur = chercheurService.findByIdOrNumeroMatricule(chercheurEmail.getChercheur());

		if (loadedChercheur == null) {
			return;
		}
		chercheurEmail.setChercheur(loadedChercheur);
	}

	@Override
	@Transactional
	public void delete(List<ChercheurEmail> chercheurEmails) {
		if (ListUtil.isNotEmpty(chercheurEmails)) {
			chercheurEmails.forEach(e -> chercheurEmailDao.delete(e));
		}
	}

	@Override
	public void update(List<ChercheurEmail> chercheurEmails) {
		if (ListUtil.isNotEmpty(chercheurEmails)) {
			chercheurEmails.forEach(e -> chercheurEmailDao.save(e));
		}
	}

	@Override
	public List<List<ChercheurEmail>> getToBeSavedAndToBeDeleted(List<ChercheurEmail> oldList,
			List<ChercheurEmail> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
