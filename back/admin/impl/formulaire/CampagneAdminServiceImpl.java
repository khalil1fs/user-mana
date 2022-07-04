package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.stream.Collectors;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.ird.faa.service.admin.impl.config.EtatCampagneAdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;

import com.ird.faa.bean.config.EtatCampagne;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.CampagneChercheur;
import com.ird.faa.bean.formulaire.CampagneChercheurFermeture;
import com.ird.faa.bean.formulaire.CampagneChercheurOuverture;
import com.ird.faa.bean.formulaire.CampagneRappel;
import com.ird.faa.bean.formulaire.CampagneRappelChercheur;
import com.ird.faa.bean.formulaire.CampagneRelance;
import com.ird.faa.bean.formulaire.CampagneRelanceChercheur;
import com.ird.faa.bean.referentiel.TemplateCloture;
import com.ird.faa.bean.referentiel.TemplateOuverture;
import com.ird.faa.dao.formulaire.CampagneDao;
import com.ird.faa.mail.service.facade.EmailService;
import com.ird.faa.security.common.SecurityUtil;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurOuvertureAdminService;
import com.ird.faa.service.admin.facade.config.EtatCampagneAdminService;
import com.ird.faa.service.admin.facade.referentiel.TemplateClotureAdminService;
import com.ird.faa.service.admin.facade.referentiel.TemplateOuvertureAdminService;

import com.ird.faa.service.admin.facade.formulaire.CampagneRelanceAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneRelanceChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneRappelAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurFermetureAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
@SuppressWarnings("unchecked")
public class CampagneAdminServiceImpl extends AbstractServiceImpl<Campagne> implements CampagneAdminService {

	@Autowired
	private CampagneDao campagneDao;

	@Autowired
	private CampagneChercheurOuvertureAdminService campagneChercheurOuvertureService;
	@Autowired
	private EtatCampagneAdminService etatCampagneService;
	@Autowired
	private TemplateClotureAdminService templateClotureService;
	@Autowired
	private TemplateOuvertureAdminService templateOuvertureService;
	@Autowired
	private CampagneRelanceAdminService campagneRelanceService;
	@Autowired
	private CampagneChercheurAdminService campagneChercheurService;
	@Autowired
	private CampagneRappelAdminService campagneRappelService;
	@Autowired
	private CampagneChercheurFermetureAdminService campagneChercheurFermetureService;

	@Autowired
	private CampagneChercheurOuvertureAdminService campagneChercheurOuvertureAdminService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private CampagneChercheurAdminService campagneChercheurAdminService;

	@Autowired
	private CampagneRelanceChercheurAdminService campagneRelanceChercheurAdminService;

	@Autowired
	private CampagneRelanceAdminServiceImpl campagneRelanceAdminService;

	@Autowired
	private CampagneRappelAdminServiceImpl campagneRappelAdminService;

	@Autowired
	private CampagneRappelChercheurAdminServiceImpl campagneRappelChercheurAdminService;

	@Autowired
	private CampagneChercheurFermetureAdminService campagneChercheurFermetureAdminService;

	@Autowired
	private EtatCampagneAdminServiceImpl etatCampagneAdminService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Campagne> findAll() {
		SecurityUtil.getCurrentUser();
		return campagneDao.findAll();
	}

	@Override
	public List<Campagne> findByEtatCampagneCode(String code) {
		return campagneDao.findByEtatCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatCampagneCode(String code) {
		return campagneDao.deleteByEtatCampagneCode(code);
	}

	@Override
	public List<Campagne> findByEtatCampagneId(Long id) {
		return campagneDao.findByEtatCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatCampagneId(Long id) {
		return campagneDao.deleteByEtatCampagneId(id);
	}

	@Override
	public List<Campagne> findByTemplateOuvertureCode(String code) {
		return campagneDao.findByTemplateOuvertureCode(code);
	}

	@Override
	@Transactional
	public int deleteByTemplateOuvertureCode(String code) {
		return campagneDao.deleteByTemplateOuvertureCode(code);
	}

	@Override
	public List<Campagne> findByTemplateOuvertureId(Long id) {
		return campagneDao.findByTemplateOuvertureId(id);
	}

	@Override
	@Transactional
	public int deleteByTemplateOuvertureId(Long id) {
		return campagneDao.deleteByTemplateOuvertureId(id);
	}

	@Override
	public List<Campagne> findByTemplateClotureCode(String code) {
		return campagneDao.findByTemplateClotureCode(code);
	}

	@Override
	@Transactional
	public int deleteByTemplateClotureCode(String code) {
		return campagneDao.deleteByTemplateClotureCode(code);
	}

	@Override
	public List<Campagne> findByTemplateClotureId(Long id) {
		return campagneDao.findByTemplateClotureId(id);
	}

	@Override
	@Transactional
	public int deleteByTemplateClotureId(Long id) {
		return campagneDao.deleteByTemplateClotureId(id);
	}

	@Override
	public Campagne findByCode(String code) {
		if (code == null)
			return null;
		return campagneDao.findByCode(code);
	}

	@Override
	@Transactional
	public int deleteByCode(String code) {
		return campagneDao.deleteByCode(code);
	}

	@Override
	public Campagne findByIdOrCode(Campagne campagne) {
		Campagne resultat = null;
		if (campagne == null || (campagne.getCode() == null && campagne.getId() == null))
			return resultat;
		else {
			if (campagne.getId() != null) {
				resultat = campagneDao.findById(campagne.getId()).get();
			} else if (StringUtil.isNotEmpty(campagne.getCode())) {
				resultat = campagneDao.findByCode(campagne.getCode());
			}
			return resultat;
		}
	}

	@Override
	public Campagne findById(Long id) {
		if (id == null)
			return null;
		return campagneDao.getOne(id);
	}

	@Override
	public Campagne findByIdWithAssociatedList(Long id) {
		Campagne campagne = campagneDao.findById(id).get();
		findAssociatedLists(campagne);
		return campagne;
	}

	private void findAssociatedLists(Campagne campagne) {
		if (campagne == null || campagne.getId() == null)
			return;
		else {
			/*
			 * List<CampagneChercheur> campagneChercheurs =
			 * campagneChercheurService.findByCampagneId(campagne.getId());
			 * campagne.setCampagneChercheurs(campagneChercheurs);
			 */
			List<CampagneChercheurOuverture> campagneChercheurOuvertures = campagneChercheurOuvertureService
					.findByCampagneId(campagne.getId());
			campagne.setCampagneChercheurOuvertures(campagneChercheurOuvertures);
			List<CampagneChercheurFermeture> campagneChercheurFermetures = campagneChercheurFermetureService
					.findByCampagneId(campagne.getId());
			campagne.setCampagneChercheurFermetures(campagneChercheurFermetures);
			List<CampagneRelance> campagneRelances = campagneRelanceService
					.findByCampagneIdOrderByDateRelance(campagne.getId());
			campagne.setCampagneRelances(campagneRelances);
			List<CampagneRappel> campagneRappels = campagneRappelService.findByCampagneId(campagne.getId());
			campagne.setCampagneRappels(campagneRappels);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			campagneChercheurService.deleteByCampagneId(id);
			campagneChercheurOuvertureService.deleteByCampagneId(id);
			campagneChercheurFermetureService.deleteByCampagneId(id);

			List<CampagneRelance> campagneRelances = campagneRelanceAdminService.findByCampagneId(id);
			if (campagneRelances != null) {
				campagneRelances.forEach(campagneRelance -> {
					campagneRelanceChercheurAdminService.deleteByCampagneRelanceId(campagneRelance.getId());
				});
			}

			List<CampagneRappel> campagneRappels = campagneRappelAdminService.findByCampagneId(id);
			if (campagneRappels != null) {
				campagneRappels.forEach(campagneRappel -> {
					campagneRappelChercheurAdminService.deleteByCampagneRappelId(campagneRappel.getId());
				});
			}
			campagneRelanceService.deleteByCampagneId(id);
			campagneRappelService.deleteByCampagneId(id);

		}
	}

	private boolean editCampagneRelance(CampagneRelance campagneRelance, CampagneRelance foundCampagneRelance) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		if (campagneRelance.getMessageRelance() != null && foundCampagneRelance.getMessageRelance() != null
				&& campagneRelance.getMessageRelance().equals(foundCampagneRelance.getMessageRelance())
				&& campagneRelance.getDateRelance() != null
				&& campagneRelance.getObjetRelance().equals(foundCampagneRelance.getObjetRelance())
				&& formatter.format(campagneRelance.getDateRelance())
						.equals(foundCampagneRelance.getDateRelance().toString())) {
			return true;

		}

		return false;

	}

	private boolean editCampagneRappel(CampagneRappel campagneRappel, CampagneRappel foundCampagneRappel) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		if (campagneRappel.getMessageRappel() != null && foundCampagneRappel.getMessageRappel() != null
				&& campagneRappel.getDateRappel() != null
				&& campagneRappel.getMessageRappel().equals(foundCampagneRappel.getMessageRappel())
				&& campagneRappel.getObjetRappel().equals(foundCampagneRappel.getObjetRappel())
				&& formatter.format(campagneRappel.getDateRappel())
						.equals(foundCampagneRappel.getDateRappel().toString())) {
			return true;

		}

		return false;

	}

	private void updateAssociatedLists(Campagne campagne) {
		List<CampagneRelanceChercheur> campagneRelanceChercheur = new ArrayList<>();
		List<CampagneRappelChercheur> campagneRappelChercheur = new ArrayList<>();
		if (campagne == null || campagne.getId() == null)
			return;
		else {

			List<List<CampagneChercheurOuverture>> resultCampagneChercheurOuvertures = campagneChercheurOuvertureService
					.getToBeSavedAndToBeDeleted(campagneChercheurOuvertureService.findByCampagneId(campagne.getId()),
							campagne.getCampagneChercheurOuvertures());

			campagneChercheurOuvertureService.delete(resultCampagneChercheurOuvertures.get(1));
			associateCampagneChercheurOuverture(campagne, resultCampagneChercheurOuvertures.get(0));
			campagneChercheurOuvertureService.update(resultCampagneChercheurOuvertures.get(0));

			List<List<CampagneChercheurFermeture>> resultCampagneChercheurFermetures = campagneChercheurFermetureService
					.getToBeSavedAndToBeDeleted(campagneChercheurFermetureService.findByCampagneId(campagne.getId()),
							campagne.getCampagneChercheurFermetures());
			campagneChercheurFermetureService.delete(resultCampagneChercheurFermetures.get(1));
			associateCampagneChercheurFermeture(campagne, resultCampagneChercheurFermetures.get(0));
			campagneChercheurFermetureService.update(resultCampagneChercheurFermetures.get(0));

			List<CampagneRelance> foundCampagneRelances = campagneRelanceService
					.findByCampagneIdOrderByDateRelance(campagne.getId());

			if (campagne.getCampagneRelances()!=null && !campagne.getCampagneRelances().isEmpty()) {
				if (campagne.getCampagneRelances().get(0).getId() != null) {
					campagneRelanceChercheur = campagneRelanceChercheurAdminService
							.findByCampagneRelanceId(campagne.getCampagneRelances().get(0).getId());

				}
			}

			if (!foundCampagneRelances.isEmpty()) {
				if (!campagne.getCampagneRelances().isEmpty()) {
					CampagneRelance campagneRelance = new CampagneRelance();
					campagneRelance = campagne.getCampagneRelances().get(0);
					if (!editCampagneRelance(campagneRelance, foundCampagneRelances.get(0))) {
						campagneRelance.setId(null);
						campagneRelance.setCampagne(campagne);
						if (campagneRelance.getTemplateRelance() == null) {
							campagneRelance.setTemplateRelance(foundCampagneRelances.get(0).getTemplateRelance());
						}
						campagneRelanceService.save(campagneRelance);

						if (campagneRelanceChercheur.isEmpty()) {
							campagneRelanceService.delete(foundCampagneRelances.get(0));
						}
					}

				}
			}

			List<CampagneRappel> foundCampagneRappels = campagneRappelService
					.findByCampagneIdOrderByDateRappel(campagne.getId());

		
			if(campagne.getCampagneRappels()!=null && !campagne.getCampagneRappels().isEmpty() ) {
				if(campagne.getCampagneRappels().get(0).getId()!=null) {
					campagneRappelChercheur = campagneRappelChercheurAdminService
							.findByCampagneRappelId(campagne.getCampagneRappels().get(0).getId());
					
				}
				
			}
			/*if (campagne.getCampagneRelances()!=null && !campagne.getCampagneRelances().isEmpty()) {
				if (campagne.getCampagneRelances().get(0).getId() != null) {
					campagneRelanceChercheur = campagneRelanceChercheurAdminService
							.findByCampagneRelanceId(campagne.getCampagneRelances().get(0).getId());

				}
			}*/


			if (!foundCampagneRappels.isEmpty()) {
				if (!campagne.getCampagneRappels().isEmpty()) {
					CampagneRappel campagneRappel = new CampagneRappel();
					campagneRappel = campagne.getCampagneRappels().get(0);
					if (!editCampagneRappel(campagneRappel, foundCampagneRappels.get(0))) {
						campagneRappel.setId(null);
						campagneRappel.setCampagne(campagne);
						if (campagneRappel.getTemplateRappel() == null) {
							campagneRappel.setTemplateRappel(foundCampagneRappels.get(0).getTemplateRappel());
						}
						campagneRappelService.save(campagneRappel);

						if (campagneRappelChercheur.isEmpty()) {
							campagneRappelService.delete(foundCampagneRappels.get(0));
						}
					}

				}
			}

			/*
			 * List<List<CampagneRelance>> resultCampagneRelances=
			 * campagneRelanceService.getToBeSavedAndToBeDeleted(campagneRelanceService.
			 * findByCampagneId(campagne.getId()),campagne.getCampagneRelances());
			 * campagneRelanceService.delete(resultCampagneRelances.get(1));
			 * associateCampagneRelance(campagne,resultCampagneRelances.get(0));
			 * campagneRelanceService.update(resultCampagneRelances.get(0));
			 */

			/*
			 * List<List<CampagneRappel>> resultCampagneRappels =
			 * campagneRappelService.getToBeSavedAndToBeDeleted(
			 * campagneRappelService.findByCampagneId(campagne.getId()),
			 * campagne.getCampagneRappels());
			 * campagneRappelService.delete(resultCampagneRappels.get(1));
			 * associateCampagneRappel(campagne, resultCampagneRappels.get(0));
			 * campagneRappelService.update(resultCampagneRappels.get(0));
			 */

			/*
			 * List<List<Distinction>> resultDistinctions=
			 * distinctionService.getToBeSavedAndToBeDeleted(distinctionService.
			 * findByCampagneId(campagne.getId()),campagne.getDistinctions());
			 * distinctionService.delete(resultDistinctions.get(1));
			 * associateDistinction(campagne,resultDistinctions.get(0));
			 * distinctionService.update(resultDistinctions.get(0));
			 * 
			 * List<List<ProjetActiviteRecherche>> resultProjetActiviteRecherches=
			 * projetActiviteRechercheService.getToBeSavedAndToBeDeleted(
			 * projetActiviteRechercheService.findByCampagneId(campagne.getId()),campagne.
			 * getProjetActiviteRecherches());
			 * projetActiviteRechercheService.delete(resultProjetActiviteRecherches.get(1));
			 * associateProjetActiviteRecherche(campagne,resultProjetActiviteRecherches.get(
			 * 0));
			 * projetActiviteRechercheService.update(resultProjetActiviteRecherches.get(0));
			 * 
			 * List<List<InstrumentsEtDispositifsIrd>> resultInstrumentsEtDispositifsIrds=
			 * instrumentsEtDispositifsIrdService.getToBeSavedAndToBeDeleted(
			 * instrumentsEtDispositifsIrdService.findByCampagneId(campagne.getId()),
			 * campagne.getInstrumentsEtDispositifsIrds());
			 * instrumentsEtDispositifsIrdService.delete(resultInstrumentsEtDispositifsIrds.
			 * get(1)); associateInstrumentsEtDispositifsIrd(campagne,
			 * resultInstrumentsEtDispositifsIrds.get(0));
			 * instrumentsEtDispositifsIrdService.update(resultInstrumentsEtDispositifsIrds.
			 * get(0));
			 * 
			 * List<List<GestionEquipe>> resultGestionEquipes=
			 * gestionEquipeService.getToBeSavedAndToBeDeleted(gestionEquipeService.
			 * findByCampagneId(campagne.getId()),campagne.getGestionEquipes());
			 * gestionEquipeService.delete(resultGestionEquipes.get(1));
			 * associateGestionEquipe(campagne,resultGestionEquipes.get(0));
			 * gestionEquipeService.update(resultGestionEquipes.get(0));
			 * 
			 * List<List<EncadrementEtudiant>> resultEncadrementEtudiants=
			 * encadrementEtudiantService.getToBeSavedAndToBeDeleted(
			 * encadrementEtudiantService.findByCampagneId(campagne.getId()),campagne.
			 * getEncadrementEtudiants());
			 * encadrementEtudiantService.delete(resultEncadrementEtudiants.get(1));
			 * associateEncadrementEtudiant(campagne,resultEncadrementEtudiants.get(0));
			 * encadrementEtudiantService.update(resultEncadrementEtudiants.get(0));
			 * 
			 * List<List<EncadrementDoctorant>> resultEncadrementDoctorants=
			 * directionEncadrementDoctorantService.getToBeSavedAndToBeDeleted(
			 * directionEncadrementDoctorantService.findByCampagneId(campagne.getId()),
			 * campagne.getEncadrementDoctorants());
			 * directionEncadrementDoctorantService.delete(
			 * resultEncadrementDoctorants.get(1));
			 * associateDirectionEncadrementDoctorant(campagne,
			 * resultEncadrementDoctorants.get(0));
			 * directionEncadrementDoctorantService.update(
			 * resultEncadrementDoctorants.get(0));
			 * 
			 * List<List<Enseignement>> resultEnseignements=
			 * enseignementService.getToBeSavedAndToBeDeleted(enseignementService.
			 * findByCampagneId(campagne.getId()),campagne.getEnseignements());
			 * enseignementService.delete(resultEnseignements.get(1));
			 * associateEnseignement(campagne,resultEnseignements.get(0));
			 * enseignementService.update(resultEnseignements.get(0));
			 * 
			 * List<List<FormationContinue>> resultFormationContinues=
			 * formationContinueService.getToBeSavedAndToBeDeleted(formationContinueService.
			 * findByCampagneId(campagne.getId()),campagne.getFormationContinues());
			 * formationContinueService.delete(resultFormationContinues.get(1));
			 * associateFormationContinue(campagne,resultFormationContinues.get(0));
			 * formationContinueService.update(resultFormationContinues.get(0));
			 * 
			 * List<List<ResponsabilitePedagogiqueEcoleDoctorale>>
			 * resultResponsabilitePedagogiqueEcoleDoctorales=
			 * responsabilitePedagogiqueEcoleDoctoraleService.getToBeSavedAndToBeDeleted(
			 * responsabilitePedagogiqueEcoleDoctoraleService.findByCampagneId(campagne.
			 * getId()),campagne.getResponsabilitePedagogiqueEcoleDoctorales());
			 * responsabilitePedagogiqueEcoleDoctoraleService.delete(
			 * resultResponsabilitePedagogiqueEcoleDoctorales.get(1));
			 * associateResponsabilitePedagogiqueEcoleDoctorale(campagne,
			 * resultResponsabilitePedagogiqueEcoleDoctorales.get(0));
			 * responsabilitePedagogiqueEcoleDoctoraleService.update(
			 * resultResponsabilitePedagogiqueEcoleDoctorales.get(0));
			 * 
			 * List<List<ResponsabilitePedagogiqueMaster>>
			 * resultResponsabilitePedagogiqueMasters=
			 * responsabilitePedagogiqueMasterService.getToBeSavedAndToBeDeleted(
			 * responsabilitePedagogiqueMasterService.findByCampagneId(campagne.getId()),
			 * campagne.getResponsabilitePedagogiqueMasters());
			 * responsabilitePedagogiqueMasterService.delete(
			 * resultResponsabilitePedagogiqueMasters.get(1));
			 * associateResponsabilitePedagogiqueMaster(campagne,
			 * resultResponsabilitePedagogiqueMasters.get(0));
			 * responsabilitePedagogiqueMasterService.update(
			 * resultResponsabilitePedagogiqueMasters.get(0));
			 * 
			 * List<List<ExpertiseScientifique>> resultExpertiseScientifiques=
			 * expertiseScientifiqueService.getToBeSavedAndToBeDeleted(
			 * expertiseScientifiqueService.findByCampagneId(campagne.getId()),campagne.
			 * getExpertiseScientifiques());
			 * expertiseScientifiqueService.delete(resultExpertiseScientifiques.get(1));
			 * associateExpertiseScientifique(campagne,resultExpertiseScientifiques.get(0));
			 * expertiseScientifiqueService.update(resultExpertiseScientifiques.get(0));
			 * 
			 * List<List<EvaluationRechercheUniversitaire>>
			 * resultEvaluationRechercheUniversitaires=
			 * evaluationRechercheUniversitaireService.getToBeSavedAndToBeDeleted(
			 * evaluationRechercheUniversitaireService.findByCampagneId(campagne.getId()),
			 * campagne.getEvaluationRechercheUniversitaires());
			 * evaluationRechercheUniversitaireService.delete(
			 * resultEvaluationRechercheUniversitaires.get(1));
			 * associateEvaluationRechercheUniversitaire(campagne,
			 * resultEvaluationRechercheUniversitaires.get(0));
			 * evaluationRechercheUniversitaireService.update(
			 * resultEvaluationRechercheUniversitaires.get(0));
			 * 
			 * List<List<EvenementColloqueScienntifique>>
			 * resultEvenementColloqueScienntifiques=
			 * evenementColloqueScienntifiqueService.getToBeSavedAndToBeDeleted(
			 * evenementColloqueScienntifiqueService.findByCampagneId(campagne.getId()),
			 * campagne.getEvenementColloqueScienntifiques());
			 * evenementColloqueScienntifiqueService.delete(
			 * resultEvenementColloqueScienntifiques.get(1));
			 * associateEvenementColloqueScienntifique(campagne,
			 * resultEvenementColloqueScienntifiques.get(0));
			 * evenementColloqueScienntifiqueService.update(
			 * resultEvenementColloqueScienntifiques.get(0));
			 * 
			 * List<List<RencontreGrandPubliqueJeunePublique>>
			 * resultRencontreGrandPubliqueJeunePubliques=
			 * rencontreGrandPubliqueJeunePubliqueService.getToBeSavedAndToBeDeleted(
			 * rencontreGrandPubliqueJeunePubliqueService.findByCampagneId(campagne.getId())
			 * ,campagne.getRencontreGrandPubliqueJeunePubliques());
			 * rencontreGrandPubliqueJeunePubliqueService.delete(
			 * resultRencontreGrandPubliqueJeunePubliques.get(1));
			 * associateRencontreGrandPubliqueJeunePublique(campagne,
			 * resultRencontreGrandPubliqueJeunePubliques.get(0));
			 * rencontreGrandPubliqueJeunePubliqueService.update(
			 * resultRencontreGrandPubliqueJeunePubliques.get(0));
			 * 
			 * List<List<CultureScientifiqueOutilPedagogique>>
			 * resultCultureScientifiqueOutilPedagogiques=
			 * cultureScientifiqueOutilPedagogiqueService.getToBeSavedAndToBeDeleted(
			 * cultureScientifiqueOutilPedagogiqueService.findByCampagneId(campagne.getId())
			 * ,campagne.getCultureScientifiqueOutilPedagogiques());
			 * cultureScientifiqueOutilPedagogiqueService.delete(
			 * resultCultureScientifiqueOutilPedagogiques.get(1));
			 * associateCultureScientifiqueOutilPedagogique(campagne,
			 * resultCultureScientifiqueOutilPedagogiques.get(0));
			 * cultureScientifiqueOutilPedagogiqueService.update(
			 * resultCultureScientifiqueOutilPedagogiques.get(0));
			 * 
			 * List<List<VieInstitutionnelle>> resultVieInstitutionnelles=
			 * vieInstitutionnelleService.getToBeSavedAndToBeDeleted(
			 * vieInstitutionnelleService.findByCampagneId(campagne.getId()),campagne.
			 * getVieInstitutionnelles());
			 * vieInstitutionnelleService.delete(resultVieInstitutionnelles.get(1));
			 * associateVieInstitutionnelle(campagne,resultVieInstitutionnelles.get(0));
			 * vieInstitutionnelleService.update(resultVieInstitutionnelles.get(0));
			 */

		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (campagneDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			campagneDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public Campagne update(Campagne campagne) {
		Campagne foundedCampagne = findById(campagne.getId());
		if (foundedCampagne == null)
			return null;
		else {
			updateAssociatedLists(campagne);
			return campagneDao.save(campagne);
		}
	}

	@Override
	public Campagne save(Campagne campagne) {
		Campagne foundedCampagne = findByCode(campagne.getCode());
		if (foundedCampagne != null)
			return null;

		findEtatCampagne(campagne);
		findTemplateOuverture(campagne);
		findTemplateCloture(campagne);
		EtatCampagne etatCampagne = etatCampagneAdminService.findByCode("initialise");
		campagne.setEtatCampagne(etatCampagne);

		Campagne savedCampagne = campagneDao.save(campagne);
		saveCampagneChercheurOuvertures(savedCampagne, campagne.getCampagneChercheurOuvertures());
		saveCampagneChercheurFermetures(savedCampagne, campagne.getCampagneChercheurFermetures());
		saveCampagneRelances(savedCampagne, campagne.getCampagneRelances());
		saveCampagneRappels(savedCampagne, campagne.getCampagneRappels());
		/*
		 * saveDistinctions(savedCampagne,campagne.getDistinctions());
		 * saveProjetActiviteRecherches(savedCampagne,campagne.
		 * getProjetActiviteRecherches());
		 * saveInstrumentsEtDispositifsIrds(savedCampagne,campagne.
		 * getInstrumentsEtDispositifsIrds());
		 * saveGestionEquipes(savedCampagne,campagne.getGestionEquipes());
		 * saveEncadrementEtudiants(savedCampagne,campagne.getEncadrementEtudiants());
		 * saveEncadrementDoctorants(savedCampagne,campagne.getEncadrementDoctorants());
		 * saveEnseignements(savedCampagne,campagne.getEnseignements());
		 * saveFormationContinues(savedCampagne,campagne.getFormationContinues());
		 * saveResponsabilitePedagogiqueEcoleDoctorales(savedCampagne,campagne.
		 * getResponsabilitePedagogiqueEcoleDoctorales());
		 * saveResponsabilitePedagogiqueMasters(savedCampagne,campagne.
		 * getResponsabilitePedagogiqueMasters());
		 * saveExpertiseScientifiques(savedCampagne,campagne.getExpertiseScientifiques()
		 * ); saveEvaluationRechercheUniversitaires(savedCampagne,campagne.
		 * getEvaluationRechercheUniversitaires());
		 * saveEvenementColloqueScienntifiques(savedCampagne,campagne.
		 * getEvenementColloqueScienntifiques());
		 * saveRencontreGrandPubliqueJeunePubliques(savedCampagne,campagne.
		 * getRencontreGrandPubliqueJeunePubliques());
		 * saveCultureScientifiqueOutilPedagogiques(savedCampagne,campagne.
		 * getCultureScientifiqueOutilPedagogiques());
		 * saveVieInstitutionnelles(savedCampagne,campagne.getVieInstitutionnelles());
		 */
		return savedCampagne;
	}

	@Override
	public List<Campagne> save(List<Campagne> campagnes) {
		List<Campagne> list = new ArrayList<Campagne>();
		for (Campagne campagne : campagnes) {
			list.add(save(campagne));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(Campagne campagne) {
		if (campagne.getCode() == null)
			return -1;

		Campagne foundedCampagne = findByCode(campagne.getCode());
		if (foundedCampagne == null)
			return -1;
		campagneDao.delete(foundedCampagne);
		return 1;
	}

	public List<Campagne> findByCriteria(CampagneVo campagneVo) {

		String query = "SELECT o FROM Campagne o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", campagneVo.getId());
		query += SearchUtil.addConstraint("o", "libelle", "LIKE", campagneVo.getLibelle());
		query += SearchUtil.addConstraint("o", "code", "LIKE", campagneVo.getCode());
		query += SearchUtil.addConstraint("o", "annee", "=", campagneVo.getAnnee());
		query += SearchUtil.addConstraintDate("o", "dateDepart", "=", campagneVo.getDateDepart());
		query += SearchUtil.addConstraintDate("o", "dateFin", "=", campagneVo.getDateFin());
		query += SearchUtil.addConstraint("o", "objetOuverture", "LIKE", campagneVo.getObjetOuverture());
		query += SearchUtil.addConstraint("o", "messageOuverture", "LIKE", campagneVo.getMessageOuverture());
		query += SearchUtil.addConstraint("o", "objetCloture", "LIKE", campagneVo.getObjetCloture());
		query += SearchUtil.addConstraint("o", "messageCloture", "LIKE", campagneVo.getMessageCloture());
		if (campagneVo.getEtatCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatCampagne.id", "=", campagneVo.getEtatCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatCampagne.code", "LIKE",
					campagneVo.getEtatCampagneVo().getCode());
		}

		if (campagneVo.getTemplateOuvertureVo() != null) {
			query += SearchUtil.addConstraint("o", "templateOuverture.id", "=",
					campagneVo.getTemplateOuvertureVo().getId());
			query += SearchUtil.addConstraint("o", "templateOuverture.code", "LIKE",
					campagneVo.getTemplateOuvertureVo().getCode());
		}

		if (campagneVo.getTemplateClotureVo() != null) {
			query += SearchUtil.addConstraint("o", "templateCloture.id", "=",
					campagneVo.getTemplateClotureVo().getId());
			query += SearchUtil.addConstraint("o", "templateCloture.code", "LIKE",
					campagneVo.getTemplateClotureVo().getCode());
		}

		query += " ORDER BY o.dateDepart";
		return entityManager.createQuery(query).getResultList();
	}

	private void saveCampagneChercheurs(Campagne campagne, List<CampagneChercheur> campagneChercheurs) {

		/*
		 * if (ListUtil.isNotEmpty(campagne.getCampagneChercheurs())) {
		 * List<CampagneChercheur> savedCampagneChercheurs = new ArrayList<>();
		 * campagneChercheurs.forEach(element -> { element.setCampagne(campagne);
		 * campagneChercheurService.save(element); });
		 * campagne.setCampagneChercheurs(savedCampagneChercheurs); }
		 */
	}

	private void saveCampagneChercheurOuvertures(Campagne campagne,
			List<CampagneChercheurOuverture> campagneChercheurOuvertures) {

		if (ListUtil.isNotEmpty(campagne.getCampagneChercheurOuvertures())) {
			List<CampagneChercheurOuverture> savedCampagneChercheurOuvertures = new ArrayList<>();
			campagneChercheurOuvertures.forEach(element -> {
				element.setCampagne(campagne);
				campagneChercheurOuvertureService.save(element);
			});
			campagne.setCampagneChercheurOuvertures(savedCampagneChercheurOuvertures);
		}
	}

	private void saveCampagneChercheurFermetures(Campagne campagne,
			List<CampagneChercheurFermeture> campagneChercheurFermetures) {

		if (ListUtil.isNotEmpty(campagne.getCampagneChercheurFermetures())) {
			List<CampagneChercheurFermeture> savedCampagneChercheurFermetures = new ArrayList<>();
			campagneChercheurFermetures.forEach(element -> {
				element.setCampagne(campagne);
				campagneChercheurFermetureService.save(element);
			});
			campagne.setCampagneChercheurFermetures(savedCampagneChercheurFermetures);
		}
	}

	private void saveCampagneRelances(Campagne campagne, List<CampagneRelance> campagneRelances) {

		if (ListUtil.isNotEmpty(campagne.getCampagneRelances())) {
			List<CampagneRelance> savedCampagneRelances = new ArrayList<>();
			campagneRelances.forEach(element -> {
				element.setCampagne(campagne);
				campagneRelanceService.save(element);
			});
			campagne.setCampagneRelances(savedCampagneRelances);
		}
	}

	private void saveCampagneRappels(Campagne campagne, List<CampagneRappel> campagneRappels) {

		if (ListUtil.isNotEmpty(campagne.getCampagneRappels())) {
			List<CampagneRappel> savedCampagneRappels = new ArrayList<>();
			campagneRappels.forEach(element -> {
				element.setCampagne(campagne);
				campagneRappelService.save(element);
			});
			campagne.setCampagneRappels(savedCampagneRappels);
		}
	}

	private void findEtatCampagne(Campagne campagne) {
		if (campagne.getEtatCampagne() == null || StringUtil.isEmpty(campagne.getEtatCampagne().getCode())) {
			campagne.setEtatCampagne(new EtatCampagne());
			campagne.getEtatCampagne().setCode("encours");
		}
		EtatCampagne loadedEtatCampagne = etatCampagneService.findByIdOrCode(campagne.getEtatCampagne());

		if (loadedEtatCampagne == null) {
			return;
		}
		campagne.setEtatCampagne(loadedEtatCampagne);
	}

	private void findTemplateOuverture(Campagne campagne) {
		TemplateOuverture loadedTemplateOuverture = templateOuvertureService
				.findByIdOrCode(campagne.getTemplateOuverture());

		if (loadedTemplateOuverture == null) {
			return;
		}
		campagne.setTemplateOuverture(loadedTemplateOuverture);
	}

	private void findTemplateCloture(Campagne campagne) {
		TemplateCloture loadedTemplateCloture = templateClotureService.findByIdOrCode(campagne.getTemplateCloture());

		if (loadedTemplateCloture == null) {
			return;
		}
		campagne.setTemplateCloture(loadedTemplateCloture);
	}

	@Override
	@Transactional
	public void delete(List<Campagne> campagnes) {
		if (ListUtil.isNotEmpty(campagnes)) {
			campagnes.forEach(e -> campagneDao.delete(e));
		}
	}

	@Override
	public void update(List<Campagne> campagnes) {
		if (ListUtil.isNotEmpty(campagnes)) {
			campagnes.forEach(e -> campagneDao.save(e));
		}
	}

	private void associateCampagneChercheur(Campagne campagne, List<CampagneChercheur> campagneChercheur) {
		if (ListUtil.isNotEmpty(campagneChercheur)) {
			campagneChercheur.forEach(e -> e.setCampagne(campagne));
		}
	}

	private void associateCampagneChercheurOuverture(Campagne campagne,
			List<CampagneChercheurOuverture> campagneChercheurOuverture) {
		if (ListUtil.isNotEmpty(campagneChercheurOuverture)) {
			campagneChercheurOuverture.forEach(e -> e.setCampagne(campagne));
		}
	}

	private void associateCampagneChercheurFermeture(Campagne campagne,
			List<CampagneChercheurFermeture> campagneChercheurFermeture) {
		if (ListUtil.isNotEmpty(campagneChercheurFermeture)) {
			campagneChercheurFermeture.forEach(e -> e.setCampagne(campagne));
		}
	}

	private void associateCampagneRelance(Campagne campagne, List<CampagneRelance> campagneRelance) {
		if (ListUtil.isNotEmpty(campagneRelance)) {
			campagneRelance.forEach(e -> e.setCampagne(campagne));
		}
	}

	private void associateCampagneRappel(Campagne campagne, List<CampagneRappel> campagneRappel) {
		if (ListUtil.isNotEmpty(campagneRappel)) {
			campagneRappel.forEach(e -> e.setCampagne(campagne));
		}
	}

	@Override
	public List<List<Campagne>> getToBeSavedAndToBeDeleted(List<Campagne> oldList, List<Campagne> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

	public void sendEmailFermeture(Campagne campagne) {
		if (campagne.getCampagneChercheurFermetures() != null) {
			emailService.sendEmailFermeture(campagne, campagne.getCampagneChercheurFermetures());
		}
	}

	public boolean checkOverlappingDepartDate(Campagne campagne) {
		String query = "SELECT o FROM Campagne o where 1=1 ";
		query += SearchUtil.addConstraintDate("o", "dateDepart", "<=", campagne.getDateDepart());
		query += SearchUtil.addConstraintDate("o", "dateFin", ">=", campagne.getDateDepart());
		List<Campagne> campagnes = entityManager.createQuery(query).getResultList();
		if (campagnes != null && !campagnes.isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean checkOverlappingEditDepartDate(Campagne campagne) {
		String query = "SELECT o FROM Campagne o where 1=1 ";
		query += SearchUtil.addConstraintDate("o", "dateDepart", "<=", campagne.getDateDepart());
		query += SearchUtil.addConstraintDate("o", "dateFin", ">=", campagne.getDateDepart());
		List<Campagne> campagnesOverlapping = entityManager.createQuery(query).getResultList();
		List<Campagne> filterCampagnesOverlapping = campagnesOverlapping.stream()
				.filter(campagneOverlapping -> !campagneOverlapping.getId().equals(campagne.getId()))
				.collect(Collectors.toList());

		if (filterCampagnesOverlapping != null && !filterCampagnesOverlapping.isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean checkOverlappingFinDate(Campagne campagne) {
		String query = "SELECT o FROM Campagne o where 1=1 ";
		query += SearchUtil.addConstraintDate("o", "dateDepart", "<=", campagne.getDateFin());
		query += SearchUtil.addConstraintDate("o", "dateDepart", ">=", campagne.getDateDepart());

		List<Campagne> campagnes = entityManager.createQuery(query).getResultList();
		if (campagnes != null && !campagnes.isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean checkOverlappingEditFinDate(Campagne campagne) {
		String query = "SELECT o FROM Campagne o where 1=1 ";
		query += SearchUtil.addConstraintDate("o", "dateDepart", "<=", campagne.getDateFin());
		List<Campagne> campagnesOverlapping = entityManager.createQuery(query).getResultList();
		List<Campagne> filterCampagnesOverlapping = campagnesOverlapping.stream()
				.filter(campagneOverlapping -> !campagneOverlapping.getId().equals(campagne.getId()))
				.collect(Collectors.toList());

		if (filterCampagnesOverlapping != null && !filterCampagnesOverlapping.isEmpty()) {
			return false;
		}
		return true;
	}

	@Override
	public Campagne findProgressCampagneByChercheurUsername(String username) {
		String query = "SELECT o FROM Campagne o ";
		query += "inner join  CampagneChercheurOuverture cc on o.id=cc.campagne.id where 1=1";
		query += SearchUtil.addConstraint("cc", "chercheur.username", "=", username);
		query += SearchUtil.addConstraint("o", "etatCampagne.code", "!=", "termine");
		query += " ORDER BY o.dateDepart DESC";
		List<Campagne> campagnes = entityManager.createQuery(query).getResultList();
		if (campagnes != null && !campagnes.isEmpty()) {
			return campagnes.get(0);
		}
		return null;
	}

	public void sendEmailOuverture(Campagne campagne) {
		if (campagne.getCampagneChercheurOuvertures() != null) {
			emailService.sendEmailOuverture(campagne, campagne.getCampagneChercheurOuvertures());
		}
	}

	@Override
	@Scheduled(cron = "${cron.expression}")
	public void sendAutoEmailOuverture() {
		System.out.println("send email auto ouverture");
		List<Campagne> campagnes = findCampagneByDateDepart();
		campagnes.forEach(campagne -> {
			List<CampagneChercheurOuverture> campagneChercheurOuvertures = this.campagneChercheurOuvertureAdminService
					.findByCampagneId(campagne.getId());
			if (campagneChercheurOuvertures != null) {
				emailService.sendEmailOuverture(campagne, campagneChercheurOuvertures);
			}

		});

	}

	@Override
	@Scheduled(cron = "${cron.expression}")
	public void sendAutoEmailFermeture() {
		System.out.println("send email auto ouverture");
		List<Campagne> campagnes = findCampagneByDateFin();
		campagnes.forEach(campagne -> {
			List<CampagneChercheurFermeture> campagneChercheurFermetures = this.campagneChercheurFermetureAdminService
					.findByCampagneId(campagne.getId());
			if (campagneChercheurFermetures != null) {
				emailService.sendEmailFermeture(campagne, campagneChercheurFermetures);
			}

		});

	}

	public List<Campagne> findCampagneByDateDepart() {
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
		String dateString = sdf.format(new Date());
		String query = "SELECT o FROM Campagne o  where 1=1";
		query += " AND to_date(to_char(o.dateDepart, 'YYYY/MM/DD'), 'YYYY/MM/DD')" + " = " + "\'" + dateString + "\'";
		List<Campagne> campagnes = entityManager.createQuery(query).getResultList();
		return campagnes;
	}

	public List<Campagne> findCampagneByDateFin() {
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
		String dateString = sdf.format(new Date());
		String query = "SELECT o FROM Campagne o  where 1=1";
		query += " AND to_date(to_char(o.dateFin, 'YYYY/MM/DD'), 'YYYY/MM/DD')" + " = " + "\'" + dateString + "\'";
		List<Campagne> campagnes = entityManager.createQuery(query).getResultList();
		return campagnes;

	}

	@Scheduled(cron = "${cron.etat_campagne}")
	public void setEtatCampagne() {
		List<Campagne> campagnesOuvertures = campagneDao.findByDateDepart(new Date());
		List<Campagne> campagnesFermetures = campagneDao.findByDateFin(new Date());
		if (campagnesOuvertures != null) {
			campagnesOuvertures.forEach(campagne -> {
				EtatCampagne etatCampagne = etatCampagneAdminService.findByCode("encours");
				campagne.setEtatCampagne(etatCampagne);
			});

			update(campagnesOuvertures);
		}
		if (campagnesFermetures != null) {
			campagnesFermetures.forEach(campagne -> {
				EtatCampagne etatCampagne = etatCampagneAdminService.findByCode("termine");
				campagne.setEtatCampagne(etatCampagne);
			});

			update(campagnesFermetures);
		}

	}

}
