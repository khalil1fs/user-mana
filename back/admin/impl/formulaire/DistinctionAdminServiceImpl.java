package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.formulaire.Distinction;
import com.ird.faa.bean.formulaire.DistinctionEtablissementPays;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.referentiel.TypeParticipation;
import com.ird.faa.dao.formulaire.DistinctionDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.DistinctionAdminService;
import com.ird.faa.service.admin.facade.formulaire.DistinctionEtablissementPaysAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeParticipationAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DistinctionVo;

@Service
public class DistinctionAdminServiceImpl extends AbstractServiceImpl<Distinction> implements DistinctionAdminService {

	@Autowired
	private DistinctionDao distinctionDao;

	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private TypeParticipationAdminService typeParticipationService;
	@Autowired
	private DistinctionEtablissementPaysAdminService distinctionEtablissementPaysService;
	@Autowired
	private CampagneAdminService campagneService;
	@Autowired
	private PaysAdminService paysService;
	@Autowired
	private ChercheurAdminService chercheurService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Distinction> findAll() {
		return distinctionDao.findAll();
	}

	@Override
	public List<Distinction> findByTypeParticipationCode(String code) {
		return distinctionDao.findByTypeParticipationCode(code);
	}

	@Override
	@Transactional
	public int deleteByTypeParticipationCode(String code) {
		return distinctionDao.deleteByTypeParticipationCode(code);
	}

	@Override
	public List<Distinction> findByTypeParticipationId(Long id) {
		return distinctionDao.findByTypeParticipationId(id);
	}

	@Override
	@Transactional
	public int deleteByTypeParticipationId(Long id) {
		return distinctionDao.deleteByTypeParticipationId(id);
	}

	@Override
	public List<Distinction> findByPaysCode(String code) {
		return distinctionDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return distinctionDao.deleteByPaysCode(code);
	}

	@Override
	public List<Distinction> findByPaysId(Long id) {
		return distinctionDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return distinctionDao.deleteByPaysId(id);
	}

	@Override
	public List<Distinction> findByEtatEtapeCampagneCode(String code) {
		return distinctionDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return distinctionDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<Distinction> findByEtatEtapeCampagneId(Long id) {
		return distinctionDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return distinctionDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public List<Distinction> findByChercheurNumeroMatricule(String numeroMatricule) {
		return distinctionDao.findByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	@Transactional
	public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
		return distinctionDao.deleteByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	public List<Distinction> findByChercheurId(Long id) {
		return distinctionDao.findByChercheurId(id);
	}

	@Override
	@Transactional
	public int deleteByChercheurId(Long id) {
		return distinctionDao.deleteByChercheurId(id);
	}

	@Override
	public List<Distinction> findByCampagneCode(String code) {
		return distinctionDao.findByCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByCampagneCode(String code) {
		return distinctionDao.deleteByCampagneCode(code);
	}

	@Override
	public List<Distinction> findByCampagneId(Long id) {
		return distinctionDao.findByCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByCampagneId(Long id) {
		return distinctionDao.deleteByCampagneId(id);
	}

	@Override
	public Distinction findById(Long id) {
		if (id == null)
			return null;
		return distinctionDao.getOne(id);
	}

	@Override
	public Distinction findByIdWithAssociatedList(Long id) {
		Distinction distinction = findById(id);
		findAssociatedLists(distinction);
		return distinction;
	}

	private void findAssociatedLists(Distinction distinction) {
		if (distinction == null || distinction.getId() == null)
			return;
		else {
			List<DistinctionEtablissementPays> distinctionEtablissementPayss = distinctionEtablissementPaysService
					.findByDistinctionId(distinction.getId());
			distinction.setDistinctionEtablissementPayss(distinctionEtablissementPayss);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			distinctionEtablissementPaysService.deleteByDistinctionId(id);
		}
	}

	private void updateAssociatedLists(Distinction distinction) {
		if (distinction == null || distinction.getId() == null)
			return;
		else {
			List<List<DistinctionEtablissementPays>> resultDistinctionEtablissementPayss = distinctionEtablissementPaysService
					.getToBeSavedAndToBeDeleted(
							distinctionEtablissementPaysService.findByDistinctionId(distinction.getId()),
							distinction.getDistinctionEtablissementPayss());
			distinctionEtablissementPaysService.delete(resultDistinctionEtablissementPayss.get(1));
			associateDistinctionEtablissementPays(distinction, resultDistinctionEtablissementPayss.get(0));
			distinctionEtablissementPaysService.update(resultDistinctionEtablissementPayss.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (distinctionDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			distinctionDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public Distinction update(Distinction distinction) {
		Distinction foundedDistinction = findById(distinction.getId());
		if (foundedDistinction == null)
			return null;
		else {
			updateAssociatedLists(distinction);
			return distinctionDao.save(distinction);
		}
	}

	@Override
	public Distinction save(Distinction distinction) {

		findTypeParticipation(distinction);
		findPays(distinction);
		findEtatEtapeCampagne(distinction);
		findChercheur(distinction);
		findCampagne(distinction);

		Distinction savedDistinction = distinctionDao.save(distinction);
		saveDistinctionEtablissementPayss(savedDistinction, distinction.getDistinctionEtablissementPayss());
		return savedDistinction;
	}

	@Override
	public List<Distinction> save(List<Distinction> distinctions) {
		List<Distinction> list = new ArrayList<Distinction>();
		for (Distinction distinction : distinctions) {
			list.add(save(distinction));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(Distinction distinction) {
		if (distinction.getId() == null)
			return -1;
		Distinction foundedDistinction = findById(distinction.getId());
		if (foundedDistinction == null)
			return -1;
		distinctionDao.delete(foundedDistinction);
		return 1;
	}

	public List<Distinction> findByCriteria(DistinctionVo distinctionVo) {

		String query = "SELECT o FROM Distinction o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", distinctionVo.getId());
		query += SearchUtil.addConstraintDate("o", "dateObtention", "=", distinctionVo.getDateObtention());
		query += SearchUtil.addConstraint("o", "intitule", "LIKE", distinctionVo.getIntitule());
		if (distinctionVo.getTypeParticipationVo() != null) {
			query += SearchUtil.addConstraint("o", "typeParticipation.id", "=",
					distinctionVo.getTypeParticipationVo().getId());
			query += SearchUtil.addConstraint("o", "typeParticipation.code", "LIKE",
					distinctionVo.getTypeParticipationVo().getCode());
		}

		if (distinctionVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=", distinctionVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE", distinctionVo.getPaysVo().getCode());
		}

		if (distinctionVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					distinctionVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					distinctionVo.getEtatEtapeCampagneVo().getCode());
		}

		if (distinctionVo.getChercheurVo() != null) {
			query += SearchUtil.addConstraint("o", "chercheur.id", "=", distinctionVo.getChercheurVo().getId());
			query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
					distinctionVo.getChercheurVo().getNumeroMatricule());
		}

		if (distinctionVo.getCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "campagne.id", "=", distinctionVo.getCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "campagne.code", "LIKE", distinctionVo.getCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveDistinctionEtablissementPayss(Distinction distinction,
			List<DistinctionEtablissementPays> distinctionEtablissementPayss) {

		if (ListUtil.isNotEmpty(distinction.getDistinctionEtablissementPayss())) {
			List<DistinctionEtablissementPays> savedDistinctionEtablissementPayss = new ArrayList<>();
			distinctionEtablissementPayss.forEach(element -> {
				element.setDistinction(distinction);
				distinctionEtablissementPaysService.save(element);
			});
			distinction.setDistinctionEtablissementPayss(savedDistinctionEtablissementPayss);
		}
	}

	private void findTypeParticipation(Distinction distinction) {
		TypeParticipation loadedTypeParticipation = typeParticipationService
				.findByIdOrCode(distinction.getTypeParticipation());

		if (loadedTypeParticipation == null) {
			return;
		}
		distinction.setTypeParticipation(loadedTypeParticipation);
	}

	private void findPays(Distinction distinction) {
		Pays loadedPays = paysService.findByIdOrCode(distinction.getPays());

		if (loadedPays == null) {
			return;
		}
		distinction.setPays(loadedPays);
	}

	private void findEtatEtapeCampagne(Distinction distinction) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(distinction.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		distinction.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	private void findChercheur(Distinction distinction) {
		Chercheur loadedChercheur = chercheurService.findByIdOrNumeroMatricule(distinction.getChercheur());

		if (loadedChercheur == null) {
			return;
		}
		distinction.setChercheur(loadedChercheur);
	}

	private void findCampagne(Distinction distinction) {
		Campagne loadedCampagne = campagneService.findByIdOrCode(distinction.getCampagne());

		if (loadedCampagne == null) {
			return;
		}
		distinction.setCampagne(loadedCampagne);
	}

	@Override
	@Transactional
	public void delete(List<Distinction> distinctions) {
		if (ListUtil.isNotEmpty(distinctions)) {
			distinctions.forEach(e -> distinctionDao.delete(e));
		}
	}

	@Override
	public void update(List<Distinction> distinctions) {
		if (ListUtil.isNotEmpty(distinctions)) {
			distinctions.forEach(e -> distinctionDao.save(e));
		}
	}

	private void associateDistinctionEtablissementPays(Distinction distinction,
			List<DistinctionEtablissementPays> distinctionEtablissementPays) {
		if (ListUtil.isNotEmpty(distinctionEtablissementPays)) {
			distinctionEtablissementPays.forEach(e -> e.setDistinction(distinction));
		}
	}

	@Override
	public List<List<Distinction>> getToBeSavedAndToBeDeleted(List<Distinction> oldList, List<Distinction> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
