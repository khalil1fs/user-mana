package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.ird.faa.bean.formulaire.TypeInstrumentIrdChercheur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.referentiel.TypeInstrumentIrd;
import com.ird.faa.dao.formulaire.TypeInstrumentIrdChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.TypeInstrumentIrdChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeInstrumentIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeInstrumentIrdChercheurVo;

@Service
public class TypeInstrumentIrdChercheurAdminServiceImpl extends AbstractServiceImpl<TypeInstrumentIrdChercheur>
		implements TypeInstrumentIrdChercheurAdminService {

	@Autowired
	private TypeInstrumentIrdChercheurDao typeInstrumentIrdChercheurDao;

	@Autowired
	private TypeInstrumentIrdAdminService typeInstrumentIrdService;
	@Autowired
	private ChercheurAdminService chercheurService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<TypeInstrumentIrdChercheur> findAll() {
		return typeInstrumentIrdChercheurDao.findAll();
	}

	@Override
	public List<TypeInstrumentIrdChercheur> findByTypeInstrumentIrdCode(String code) {
		return typeInstrumentIrdChercheurDao.findByTypeInstrumentIrdCode(code);
	}

	@Override
	@Transactional
	public int deleteByTypeInstrumentIrdCode(String code) {
		return typeInstrumentIrdChercheurDao.deleteByTypeInstrumentIrdCode(code);
	}

	@Override
	public List<TypeInstrumentIrdChercheur> findByTypeInstrumentIrdId(Long id) {
		return typeInstrumentIrdChercheurDao.findByTypeInstrumentIrdId(id);
	}

	@Override
	@Transactional
	public int deleteByTypeInstrumentIrdId(Long id) {
		return typeInstrumentIrdChercheurDao.deleteByTypeInstrumentIrdId(id);
	}

	@Override
	public List<TypeInstrumentIrdChercheur> findByChercheurNumeroMatricule(String numeroMatricule) {
		return typeInstrumentIrdChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	@Transactional
	public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
		return typeInstrumentIrdChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	public List<TypeInstrumentIrdChercheur> findByChercheurId(Long id) {
		return typeInstrumentIrdChercheurDao.findByChercheurId(id);
	}

	@Override
	@Transactional
	public int deleteByChercheurId(Long id) {
		return typeInstrumentIrdChercheurDao.deleteByChercheurId(id);
	}

	@Override
	public TypeInstrumentIrdChercheur findById(Long id) {
		if (id == null)
			return null;
		return typeInstrumentIrdChercheurDao.getOne(id);
	}

	@Override
	public TypeInstrumentIrdChercheur findByIdWithAssociatedList(Long id) {
		return findById(id);
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (typeInstrumentIrdChercheurDao.findById(id).isPresent()) {
			typeInstrumentIrdChercheurDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public TypeInstrumentIrdChercheur update(TypeInstrumentIrdChercheur typeInstrumentIrdChercheur) {
		TypeInstrumentIrdChercheur foundedTypeInstrumentIrdChercheur = findById(typeInstrumentIrdChercheur.getId());
		if (foundedTypeInstrumentIrdChercheur == null)
			return null;
		else {
			return typeInstrumentIrdChercheurDao.save(typeInstrumentIrdChercheur);
		}
	}

	@Override
	public TypeInstrumentIrdChercheur save(TypeInstrumentIrdChercheur typeInstrumentIrdChercheur) {

		findTypeInstrumentIrd(typeInstrumentIrdChercheur);
		findChercheur(typeInstrumentIrdChercheur);

		return typeInstrumentIrdChercheurDao.save(typeInstrumentIrdChercheur);

	}

	@Override
	public List<TypeInstrumentIrdChercheur> save(List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs) {
		List<TypeInstrumentIrdChercheur> list = new ArrayList<>();
		for (TypeInstrumentIrdChercheur typeInstrumentIrdChercheur : typeInstrumentIrdChercheurs) {
			list.add(save(typeInstrumentIrdChercheur));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(TypeInstrumentIrdChercheur typeInstrumentIrdChercheur) {
		if (typeInstrumentIrdChercheur.getId() == null)
			return -1;
		TypeInstrumentIrdChercheur foundedTypeInstrumentIrdChercheur = findById(typeInstrumentIrdChercheur.getId());
		if (foundedTypeInstrumentIrdChercheur == null)
			return -1;
		typeInstrumentIrdChercheurDao.delete(foundedTypeInstrumentIrdChercheur);
		return 1;
	}

	public List<TypeInstrumentIrdChercheur> findByCriteria(TypeInstrumentIrdChercheurVo typeInstrumentIrdChercheurVo) {

		String query = "SELECT o FROM TypeInstrumentIrdChercheur o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", typeInstrumentIrdChercheurVo.getId());
		if (typeInstrumentIrdChercheurVo.getTypeInstrumentIrdVo() != null) {
			query += SearchUtil.addConstraint("o", "typeInstrumentIrd.id", "=",
					typeInstrumentIrdChercheurVo.getTypeInstrumentIrdVo().getId());
			query += SearchUtil.addConstraint("o", "typeInstrumentIrd.code", "LIKE",
					typeInstrumentIrdChercheurVo.getTypeInstrumentIrdVo().getCode());
		}

		if (typeInstrumentIrdChercheurVo.getChercheurVo() != null) {
			query += SearchUtil.addConstraint("o", "chercheur.id", "=",
					typeInstrumentIrdChercheurVo.getChercheurVo().getId());
			query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
					typeInstrumentIrdChercheurVo.getChercheurVo().getNumeroMatricule());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findTypeInstrumentIrd(TypeInstrumentIrdChercheur typeInstrumentIrdChercheur) {
		TypeInstrumentIrd loadedTypeInstrumentIrd = typeInstrumentIrdService
				.findByIdOrCode(typeInstrumentIrdChercheur.getTypeInstrumentIrd());

		if (loadedTypeInstrumentIrd == null) {
			return;
		}
		typeInstrumentIrdChercheur.setTypeInstrumentIrd(loadedTypeInstrumentIrd);
	}

	private void findChercheur(TypeInstrumentIrdChercheur typeInstrumentIrdChercheur) {
		Chercheur loadedChercheur = chercheurService
				.findByIdOrNumeroMatricule(typeInstrumentIrdChercheur.getChercheur());

		if (loadedChercheur == null) {
			return;
		}
		typeInstrumentIrdChercheur.setChercheur(loadedChercheur);
	}

	@Override
	@Transactional
	public void delete(List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs) {
		if (ListUtil.isNotEmpty(typeInstrumentIrdChercheurs)) {
			typeInstrumentIrdChercheurs.forEach(e -> typeInstrumentIrdChercheurDao.delete(e));
		}
	}

	@Override
	public void update(List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs) {
		if (ListUtil.isNotEmpty(typeInstrumentIrdChercheurs)) {
			typeInstrumentIrdChercheurs.forEach(e -> typeInstrumentIrdChercheurDao.save(e));
		}
	}

}
