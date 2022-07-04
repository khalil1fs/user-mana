package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EnseignementEtFormation;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.dao.formulaire.EnseignementEtFormationDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEtFormationAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementEtFormationVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementEtFormationAdminServiceImpl extends AbstractServiceImpl<EnseignementEtFormation>
		implements EnseignementEtFormationAdminService {

	@Autowired
	private EnseignementEtFormationDao enseignementEtFormationDao;

	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private FormationContinueAdminService formationContinueService;
	@Autowired
	private EnseignementAdminService enseignementService;
	@Autowired
	private CampagneAdminService campagneService;
	@Autowired
	private ResponsabilitePedagogiqueAdminService responsabilitePedagogiqueService;
	@Autowired
	private ChercheurAdminService chercheurService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EnseignementEtFormation> findAll() {
		return enseignementEtFormationDao.findAll();
	}

	@Override
	public List<EnseignementEtFormation> findByEtatEtapeCampagneCode(String code) {
		return enseignementEtFormationDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return enseignementEtFormationDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<EnseignementEtFormation> findByEtatEtapeCampagneId(Long id) {
		return enseignementEtFormationDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return enseignementEtFormationDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public List<EnseignementEtFormation> findByChercheurNumeroMatricule(String numeroMatricule) {
		return enseignementEtFormationDao.findByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	@Transactional
	public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
		return enseignementEtFormationDao.deleteByChercheurNumeroMatricule(numeroMatricule);
	}

	@Override
	public List<EnseignementEtFormation> findByChercheurId(Long id) {
		return enseignementEtFormationDao.findByChercheurId(id);
	}

	@Override
	@Transactional
	public int deleteByChercheurId(Long id) {
		return enseignementEtFormationDao.deleteByChercheurId(id);
	}

	@Override
	public List<EnseignementEtFormation> findByCampagneCode(String code) {
		return enseignementEtFormationDao.findByCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByCampagneCode(String code) {
		return enseignementEtFormationDao.deleteByCampagneCode(code);
	}

	@Override
	public List<EnseignementEtFormation> findByCampagneId(Long id) {
		return enseignementEtFormationDao.findByCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByCampagneId(Long id) {
		return enseignementEtFormationDao.deleteByCampagneId(id);
	}

	@Override
	public EnseignementEtFormation findById(Long id) {
		if (id == null)
			return null;
		return enseignementEtFormationDao.getOne(id);
	}

	@Override
	public EnseignementEtFormation findByIdWithAssociatedList(Long id) {
		EnseignementEtFormation enseignementEtFormation = findById(id);
		findAssociatedLists(enseignementEtFormation);
		return enseignementEtFormation;
	}

	private void findAssociatedLists(EnseignementEtFormation enseignementEtFormation) {
		if (enseignementEtFormation != null && enseignementEtFormation.getId() != null) {
			List<Enseignement> enseignements = enseignementService
					.findByEnseignementEtFormationId(enseignementEtFormation.getId());
			enseignementEtFormation.setEnseignements(enseignements);
			List<FormationContinue> formationContinues = formationContinueService
					.findByEnseignementEtFormationId(enseignementEtFormation.getId());
			enseignementEtFormation.setFormationContinues(formationContinues);
			List<ResponsabilitePedagogique> responsabilitePedagogiques = responsabilitePedagogiqueService
					.findByEnseignementEtFormationId(enseignementEtFormation.getId());
			enseignementEtFormation.setResponsabilitePedagogiques(responsabilitePedagogiques);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id != null) {
			enseignementService.deleteByEnseignementEtFormationId(id);
			formationContinueService.deleteByEnseignementEtFormationId(id);
			responsabilitePedagogiqueService.deleteByEnseignementEtFormationId(id);
		}
	}

	private void updateAssociatedLists(EnseignementEtFormation enseignementEtFormation) {
		if (enseignementEtFormation != null && enseignementEtFormation.getId() != null) {
			List<List<Enseignement>> resultEnseignements = enseignementService.getToBeSavedAndToBeDeleted(
					enseignementService.findByEnseignementEtFormationId(enseignementEtFormation.getId()),
					enseignementEtFormation.getEnseignements());
			enseignementService.delete(resultEnseignements.get(1));
			associateEnseignement(enseignementEtFormation, resultEnseignements.get(0));
			enseignementService.update(resultEnseignements.get(0));

			List<List<FormationContinue>> resultFormationContinues = formationContinueService
					.getToBeSavedAndToBeDeleted(
							formationContinueService.findByEnseignementEtFormationId(enseignementEtFormation.getId()),
							enseignementEtFormation.getFormationContinues());
			formationContinueService.delete(resultFormationContinues.get(1));
			associateFormationContinue(enseignementEtFormation, resultFormationContinues.get(0));
			formationContinueService.update(resultFormationContinues.get(0));

			List<List<ResponsabilitePedagogique>> resultResponsabilitePedagogiques = responsabilitePedagogiqueService
					.getToBeSavedAndToBeDeleted(
							responsabilitePedagogiqueService
									.findByEnseignementEtFormationId(enseignementEtFormation.getId()),
							enseignementEtFormation.getResponsabilitePedagogiques());
			responsabilitePedagogiqueService.delete(resultResponsabilitePedagogiques.get(1));
			associateResponsabilitePedagogique(enseignementEtFormation, resultResponsabilitePedagogiques.get(0));
			responsabilitePedagogiqueService.update(resultResponsabilitePedagogiques.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (enseignementEtFormationDao.findById(id).isPresent()) {
			deleteAssociatedLists(id);
			enseignementEtFormationDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public EnseignementEtFormation update(EnseignementEtFormation enseignementEtFormation) {
		EnseignementEtFormation foundedEnseignementEtFormation = findById(enseignementEtFormation.getId());
		if (foundedEnseignementEtFormation == null)
			return null;
		else {
			updateAssociatedLists(enseignementEtFormation);
			return enseignementEtFormationDao.save(enseignementEtFormation);
		}
	}

	@Override
	public EnseignementEtFormation save(EnseignementEtFormation enseignementEtFormation) {

		EnseignementEtFormation result = null;

		findEtatEtapeCampagne(enseignementEtFormation);
		findChercheur(enseignementEtFormation);
		findCampagne(enseignementEtFormation);

		EnseignementEtFormation savedEnseignementEtFormation = enseignementEtFormationDao.save(enseignementEtFormation);

		saveEnseignements(savedEnseignementEtFormation, enseignementEtFormation.getEnseignements());
		saveFormationContinues(savedEnseignementEtFormation, enseignementEtFormation.getFormationContinues());
		saveResponsabilitePedagogiques(savedEnseignementEtFormation,
				enseignementEtFormation.getResponsabilitePedagogiques());
		result = savedEnseignementEtFormation;

		return result;
	}

	@Override
	public List<EnseignementEtFormation> save(List<EnseignementEtFormation> enseignementEtFormations) {
		List<EnseignementEtFormation> list = new ArrayList<>();
		for (EnseignementEtFormation enseignementEtFormation : enseignementEtFormations) {
			list.add(save(enseignementEtFormation));
		}
		return list;
	}

	private List<Enseignement> prepareEnseignements(EnseignementEtFormation enseignementEtFormation,
			List<Enseignement> enseignements) {
		for (Enseignement enseignement : enseignements) {
			enseignement.setEnseignementEtFormation(enseignementEtFormation);
		}
		return enseignements;
	}

	private List<FormationContinue> prepareFormationContinues(EnseignementEtFormation enseignementEtFormation,
			List<FormationContinue> formationContinues) {
		for (FormationContinue formationContinue : formationContinues) {
			formationContinue.setEnseignementEtFormation(enseignementEtFormation);
		}
		return formationContinues;
	}

	private List<ResponsabilitePedagogique> prepareResponsabilitePedagogiques(
			EnseignementEtFormation enseignementEtFormation,
			List<ResponsabilitePedagogique> responsabilitePedagogiques) {
		for (ResponsabilitePedagogique responsabilitePedagogique : responsabilitePedagogiques) {
			responsabilitePedagogique.setEnseignementEtFormation(enseignementEtFormation);
		}
		return responsabilitePedagogiques;
	}

	@Override
	@Transactional
	public int delete(EnseignementEtFormation enseignementEtFormation) {
		if (enseignementEtFormation.getId() == null)
			return -1;
		EnseignementEtFormation foundedEnseignementEtFormation = findById(enseignementEtFormation.getId());
		if (foundedEnseignementEtFormation == null)
			return -1;
		enseignementEtFormationDao.delete(foundedEnseignementEtFormation);
		return 1;
	}

	public List<EnseignementEtFormation> findByCriteria(EnseignementEtFormationVo enseignementEtFormationVo) {

		String query = "SELECT o FROM EnseignementEtFormation o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", enseignementEtFormationVo.getId());
		query += SearchUtil.addConstraint("o", "annee", "=", enseignementEtFormationVo.getAnnee());
		query += SearchUtil.addConstraint("o", "tempsEstimePourCetteAnnne", "=",
				enseignementEtFormationVo.getTempsEstimePourCetteAnnne());
		query += SearchUtil.addConstraintMinMax("o", "annee", enseignementEtFormationVo.getAnneeMin(),
				enseignementEtFormationVo.getAnneeMax());
		query += SearchUtil.addConstraintMinMax("o", "tempsEstimePourCetteAnnne",
				enseignementEtFormationVo.getTempsEstimePourCetteAnnneMin(),
				enseignementEtFormationVo.getTempsEstimePourCetteAnnneMax());
		if (enseignementEtFormationVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					enseignementEtFormationVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					enseignementEtFormationVo.getEtatEtapeCampagneVo().getCode());
		}

		if (enseignementEtFormationVo.getChercheurVo() != null) {
			query += SearchUtil.addConstraint("o", "chercheur.id", "=",
					enseignementEtFormationVo.getChercheurVo().getId());
			query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
					enseignementEtFormationVo.getChercheurVo().getNumeroMatricule());
		}

		if (enseignementEtFormationVo.getCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "campagne.id", "=",
					enseignementEtFormationVo.getCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "campagne.code", "LIKE",
					enseignementEtFormationVo.getCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveEnseignements(EnseignementEtFormation enseignementEtFormation, List<Enseignement> enseignements) {

		if (ListUtil.isNotEmpty(enseignementEtFormation.getEnseignements())) {
			List<Enseignement> savedEnseignements = new ArrayList<>();
			enseignements.forEach(element -> {
				element.setEnseignementEtFormation(enseignementEtFormation);
				enseignementService.save(element);
			});
			enseignementEtFormation.setEnseignements(savedEnseignements);
		}
	}

	private void saveFormationContinues(EnseignementEtFormation enseignementEtFormation,
			List<FormationContinue> formationContinues) {

		if (ListUtil.isNotEmpty(enseignementEtFormation.getFormationContinues())) {
			List<FormationContinue> savedFormationContinues = new ArrayList<>();
			formationContinues.forEach(element -> {
				element.setEnseignementEtFormation(enseignementEtFormation);
				formationContinueService.save(element);
			});
			enseignementEtFormation.setFormationContinues(savedFormationContinues);
		}
	}

	private void saveResponsabilitePedagogiques(EnseignementEtFormation enseignementEtFormation,
			List<ResponsabilitePedagogique> responsabilitePedagogiques) {

		if (ListUtil.isNotEmpty(enseignementEtFormation.getResponsabilitePedagogiques())) {
			List<ResponsabilitePedagogique> savedResponsabilitePedagogiques = new ArrayList<>();
			responsabilitePedagogiques.forEach(element -> {
				element.setEnseignementEtFormation(enseignementEtFormation);
				responsabilitePedagogiqueService.save(element);
			});
			enseignementEtFormation.setResponsabilitePedagogiques(savedResponsabilitePedagogiques);
		}
	}

	private void findEtatEtapeCampagne(EnseignementEtFormation enseignementEtFormation) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(enseignementEtFormation.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		enseignementEtFormation.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	private void findChercheur(EnseignementEtFormation enseignementEtFormation) {
		Chercheur loadedChercheur = chercheurService.findByIdOrNumeroMatricule(enseignementEtFormation.getChercheur());

		if (loadedChercheur == null) {
			return;
		}
		enseignementEtFormation.setChercheur(loadedChercheur);
	}

	private void findCampagne(EnseignementEtFormation enseignementEtFormation) {
		Campagne loadedCampagne = campagneService.findByIdOrCode(enseignementEtFormation.getCampagne());

		if (loadedCampagne == null) {
			return;
		}
		enseignementEtFormation.setCampagne(loadedCampagne);
	}

	@Override
	@Transactional
	public void delete(List<EnseignementEtFormation> enseignementEtFormations) {
		if (ListUtil.isNotEmpty(enseignementEtFormations)) {
			enseignementEtFormations.forEach(e -> enseignementEtFormationDao.delete(e));
		}
	}

	@Override
	public void update(List<EnseignementEtFormation> enseignementEtFormations) {
		if (ListUtil.isNotEmpty(enseignementEtFormations)) {
			enseignementEtFormations.forEach(e -> enseignementEtFormationDao.save(e));
		}
	}

	private void associateEnseignement(EnseignementEtFormation enseignementEtFormation,
			List<Enseignement> enseignement) {
		if (ListUtil.isNotEmpty(enseignement)) {
			enseignement.forEach(e -> e.setEnseignementEtFormation(enseignementEtFormation));
		}
	}

	private void associateFormationContinue(EnseignementEtFormation enseignementEtFormation,
			List<FormationContinue> formationContinue) {
		if (ListUtil.isNotEmpty(formationContinue)) {
			formationContinue.forEach(e -> e.setEnseignementEtFormation(enseignementEtFormation));
		}
	}

	private void associateResponsabilitePedagogique(EnseignementEtFormation enseignementEtFormation,
			List<ResponsabilitePedagogique> responsabilitePedagogique) {
		if (ListUtil.isNotEmpty(responsabilitePedagogique)) {
			responsabilitePedagogique.forEach(e -> e.setEnseignementEtFormation(enseignementEtFormation));
		}
	}

}
