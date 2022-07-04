package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.EvenementColloqueScientifiqueInstrumentIrd;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEvenementColloqueScientifique;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifiqueEnjeuxIrd;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifiquePays;
import com.ird.faa.bean.referentiel.Modalite;
import com.ird.faa.bean.referentiel.ModaliteIntervention;
import com.ird.faa.bean.formulaire.SavoirEtInnovation;
import com.ird.faa.dao.formulaire.EvenementColloqueScienntifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScientifiqueInstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEvenementColloqueScientifiqueAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiqueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.EvenementColloqueScienntifiquePaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.ModaliteAdminService;
import com.ird.faa.service.admin.facade.referentiel.ModaliteInterventionAdminService;
import com.ird.faa.service.admin.facade.formulaire.SavoirEtInnovationAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScienntifiqueVo;

@Service
public class EvenementColloqueScienntifiqueAdminServiceImpl extends AbstractServiceImpl<EvenementColloqueScienntifique>
		implements EvenementColloqueScienntifiqueAdminService {

	@Autowired
	private EvenementColloqueScienntifiqueDao evenementColloqueScienntifiqueDao;

	@Autowired
	private ModaliteAdminService modaliteService;
	@Autowired
	private SavoirEtInnovationAdminService savoirEtInnovationService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private EvenementColloqueScienntifiqueEnjeuxIrdAdminService evenementColloqueScienntifiqueEnjeuxIrdService;
	@Autowired
	private ModaliteInterventionAdminService modaliteInterventionService;
	@Autowired
	private DisciplineScientifiqueEvenementColloqueScientifiqueAdminService disciplineScientifiqueEvenementColloqueScientifiqueService;
	@Autowired
	private EvenementColloqueScienntifiquePaysAdminService evenementColloqueScienntifiquePaysService;
	@Autowired
	private EvenementColloqueScientifiqueInstrumentIrdAdminService communauteSavoirEvenementColloqueScientifiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<EvenementColloqueScienntifique> findAll() {
		return evenementColloqueScienntifiqueDao.findAll();
	}

	@Override
	public List<EvenementColloqueScienntifique> findByModaliteCode(String code) {
		return evenementColloqueScienntifiqueDao.findByModaliteCode(code);
	}

	@Override
	@Transactional
	public int deleteByModaliteCode(String code) {
		return evenementColloqueScienntifiqueDao.deleteByModaliteCode(code);
	}

	@Override
	public List<EvenementColloqueScienntifique> findByModaliteId(Long id) {
		return evenementColloqueScienntifiqueDao.findByModaliteId(id);
	}

	@Override
	@Transactional
	public int deleteByModaliteId(Long id) {
		return evenementColloqueScienntifiqueDao.deleteByModaliteId(id);
	}

	@Override
	public List<EvenementColloqueScienntifique> findByModaliteInterventionCode(String code) {
		return evenementColloqueScienntifiqueDao.findByModaliteInterventionCode(code);
	}

	@Override
	@Transactional
	public int deleteByModaliteInterventionCode(String code) {
		return evenementColloqueScienntifiqueDao.deleteByModaliteInterventionCode(code);
	}

	@Override
	public List<EvenementColloqueScienntifique> findByModaliteInterventionId(Long id) {
		return evenementColloqueScienntifiqueDao.findByModaliteInterventionId(id);
	}

	@Override
	@Transactional
	public int deleteByModaliteInterventionId(Long id) {
		return evenementColloqueScienntifiqueDao.deleteByModaliteInterventionId(id);
	}

	@Override
	public List<EvenementColloqueScienntifique> findBySavoirEtInnovationId(Long id) {
		return evenementColloqueScienntifiqueDao.findBySavoirEtInnovationId(id);
	}

	@Override
	@Transactional
	public int deleteBySavoirEtInnovationId(Long id) {
		return evenementColloqueScienntifiqueDao.deleteBySavoirEtInnovationId(id);
	}

	@Override
	public List<EvenementColloqueScienntifique> findByEtatEtapeCampagneCode(String code) {
		return evenementColloqueScienntifiqueDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return evenementColloqueScienntifiqueDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<EvenementColloqueScienntifique> findByEtatEtapeCampagneId(Long id) {
		return evenementColloqueScienntifiqueDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return evenementColloqueScienntifiqueDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public EvenementColloqueScienntifique findById(Long id) {
		if (id == null)
			return null;
		return evenementColloqueScienntifiqueDao.getOne(id);
	}

	@Override
	public EvenementColloqueScienntifique findByIdWithAssociatedList(Long id) {
		EvenementColloqueScienntifique evenementColloqueScienntifique = findById(id);
		findAssociatedLists(evenementColloqueScienntifique);
		return evenementColloqueScienntifique;
	}

	private void findAssociatedLists(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		if (evenementColloqueScienntifique == null || evenementColloqueScienntifique.getId() == null)
			return;
		else {
			List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrds = evenementColloqueScienntifiqueEnjeuxIrdService
					.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId());
			evenementColloqueScienntifique
					.setEvenementColloqueScienntifiqueEnjeuxIrds(evenementColloqueScienntifiqueEnjeuxIrds);
			List<EvenementColloqueScientifiqueInstrumentIrd> communauteSavoirEvenementColloqueScientifiques = communauteSavoirEvenementColloqueScientifiqueService
					.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId());
			evenementColloqueScienntifique
					.setCommunauteSavoirEvenementColloqueScientifiques(communauteSavoirEvenementColloqueScientifiques);
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifiques = disciplineScientifiqueEvenementColloqueScientifiqueService
					.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId());
			evenementColloqueScienntifique.setDisciplineScientifiqueEvenementColloqueScientifiques(
					disciplineScientifiqueEvenementColloqueScientifiques);
			List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePayss = evenementColloqueScienntifiquePaysService
					.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId());
			evenementColloqueScienntifique.setEvenementColloqueScienntifiquePayss(evenementColloqueScienntifiquePayss);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			evenementColloqueScienntifiqueEnjeuxIrdService.deleteByEvenementColloqueScienntifiqueId(id);
			communauteSavoirEvenementColloqueScientifiqueService.deleteByEvenementColloqueScienntifiqueId(id);
			disciplineScientifiqueEvenementColloqueScientifiqueService.deleteByEvenementColloqueScienntifiqueId(id);
			evenementColloqueScienntifiquePaysService.deleteByEvenementColloqueScienntifiqueId(id);
		}
	}

	private void updateAssociatedLists(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		if (evenementColloqueScienntifique == null || evenementColloqueScienntifique.getId() == null)
			return;
		else {
			List<List<EvenementColloqueScienntifiqueEnjeuxIrd>> resultEvenementColloqueScienntifiqueEnjeuxIrds = evenementColloqueScienntifiqueEnjeuxIrdService
					.getToBeSavedAndToBeDeleted(
							evenementColloqueScienntifiqueEnjeuxIrdService
									.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId()),
							evenementColloqueScienntifique.getEvenementColloqueScienntifiqueEnjeuxIrds());
			evenementColloqueScienntifiqueEnjeuxIrdService
					.delete(resultEvenementColloqueScienntifiqueEnjeuxIrds.get(1));
			associateEvenementColloqueScienntifiqueEnjeuxIrd(evenementColloqueScienntifique,
					resultEvenementColloqueScienntifiqueEnjeuxIrds.get(0));
			evenementColloqueScienntifiqueEnjeuxIrdService
					.update(resultEvenementColloqueScienntifiqueEnjeuxIrds.get(0));

			List<List<EvenementColloqueScientifiqueInstrumentIrd>> resultCommunauteSavoirEvenementColloqueScientifiques = communauteSavoirEvenementColloqueScientifiqueService
					.getToBeSavedAndToBeDeleted(
							communauteSavoirEvenementColloqueScientifiqueService
									.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId()),
							evenementColloqueScienntifique.getCommunauteSavoirEvenementColloqueScientifiques());
			communauteSavoirEvenementColloqueScientifiqueService
					.delete(resultCommunauteSavoirEvenementColloqueScientifiques.get(1));
			associateCommunauteSavoirEvenementColloqueScientifique(evenementColloqueScienntifique,
					resultCommunauteSavoirEvenementColloqueScientifiques.get(0));
			communauteSavoirEvenementColloqueScientifiqueService
					.update(resultCommunauteSavoirEvenementColloqueScientifiques.get(0));

			List<List<DisciplineScientifiqueEvenementColloqueScientifique>> resultDisciplineScientifiqueEvenementColloqueScientifiques = disciplineScientifiqueEvenementColloqueScientifiqueService
					.getToBeSavedAndToBeDeleted(
							disciplineScientifiqueEvenementColloqueScientifiqueService
									.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId()),
							evenementColloqueScienntifique.getDisciplineScientifiqueEvenementColloqueScientifiques());
			disciplineScientifiqueEvenementColloqueScientifiqueService
					.delete(resultDisciplineScientifiqueEvenementColloqueScientifiques.get(1));
			associateDisciplineScientifiqueEvenementColloqueScientifique(evenementColloqueScienntifique,
					resultDisciplineScientifiqueEvenementColloqueScientifiques.get(0));
			disciplineScientifiqueEvenementColloqueScientifiqueService
					.update(resultDisciplineScientifiqueEvenementColloqueScientifiques.get(0));

			List<List<EvenementColloqueScienntifiquePays>> resultEvenementColloqueScienntifiquePayss = evenementColloqueScienntifiquePaysService
					.getToBeSavedAndToBeDeleted(
							evenementColloqueScienntifiquePaysService
									.findByEvenementColloqueScienntifiqueId(evenementColloqueScienntifique.getId()),
							evenementColloqueScienntifique.getEvenementColloqueScienntifiquePayss());
			evenementColloqueScienntifiquePaysService.delete(resultEvenementColloqueScienntifiquePayss.get(1));
			associateEvenementColloqueScienntifiquePays(evenementColloqueScienntifique,
					resultEvenementColloqueScienntifiquePayss.get(0));
			evenementColloqueScienntifiquePaysService.update(resultEvenementColloqueScienntifiquePayss.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (evenementColloqueScienntifiqueDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			evenementColloqueScienntifiqueDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public EvenementColloqueScienntifique update(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		EvenementColloqueScienntifique foundedEvenementColloqueScienntifique = findById(
				evenementColloqueScienntifique.getId());
		if (foundedEvenementColloqueScienntifique == null)
			return null;
		else {
			updateAssociatedLists(evenementColloqueScienntifique);
			return evenementColloqueScienntifiqueDao.save(evenementColloqueScienntifique);
		}
	}

	@Override
	public EvenementColloqueScienntifique save(EvenementColloqueScienntifique evenementColloqueScienntifique) {

		findModalite(evenementColloqueScienntifique);
		findModaliteIntervention(evenementColloqueScienntifique);
		findSavoirEtInnovation(evenementColloqueScienntifique);
		findEtatEtapeCampagne(evenementColloqueScienntifique);

		EvenementColloqueScienntifique savedEvenementColloqueScienntifique = evenementColloqueScienntifiqueDao
				.save(evenementColloqueScienntifique);
		saveEvenementColloqueScienntifiqueEnjeuxIrds(savedEvenementColloqueScienntifique,
				evenementColloqueScienntifique.getEvenementColloqueScienntifiqueEnjeuxIrds());
		saveCommunauteSavoirEvenementColloqueScientifiques(savedEvenementColloqueScienntifique,
				evenementColloqueScienntifique.getCommunauteSavoirEvenementColloqueScientifiques());
		saveDisciplineScientifiqueEvenementColloqueScientifiques(savedEvenementColloqueScienntifique,
				evenementColloqueScienntifique.getDisciplineScientifiqueEvenementColloqueScientifiques());
		saveEvenementColloqueScienntifiquePayss(savedEvenementColloqueScienntifique,
				evenementColloqueScienntifique.getEvenementColloqueScienntifiquePayss());
		return savedEvenementColloqueScienntifique;
	}

	@Override
	public List<EvenementColloqueScienntifique> save(
			List<EvenementColloqueScienntifique> evenementColloqueScienntifiques) {
		List<EvenementColloqueScienntifique> list = new ArrayList<EvenementColloqueScienntifique>();
		for (EvenementColloqueScienntifique evenementColloqueScienntifique : evenementColloqueScienntifiques) {
			list.add(save(evenementColloqueScienntifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		if (evenementColloqueScienntifique.getId() == null)
			return -1;
		EvenementColloqueScienntifique foundedEvenementColloqueScienntifique = findById(
				evenementColloqueScienntifique.getId());
		if (foundedEvenementColloqueScienntifique == null)
			return -1;
		evenementColloqueScienntifiqueDao.delete(foundedEvenementColloqueScienntifique);
		return 1;
	}

	public List<EvenementColloqueScienntifique> findByCriteria(
			EvenementColloqueScienntifiqueVo evenementColloqueScienntifiqueVo) {

		String query = "SELECT o FROM EvenementColloqueScienntifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", evenementColloqueScienntifiqueVo.getId());
		query += SearchUtil.addConstraint("o", "intitule", "LIKE", evenementColloqueScienntifiqueVo.getIntitule());
		query += SearchUtil.addConstraint("o", "typeDeParticipation", "LIKE",
				evenementColloqueScienntifiqueVo.getTypeDeParticipation());
		query += SearchUtil.addConstraintDate("o", "dateEvenement", "=",
				evenementColloqueScienntifiqueVo.getDateEvenement());
		query += SearchUtil.addConstraint("o", "diplomatieStategique", "=",
				evenementColloqueScienntifiqueVo.getDiplomatieStategique());
		query += SearchUtil.addConstraint("o", "volumeParticipant", "=",
				evenementColloqueScienntifiqueVo.getVolumeParticipant());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateEvenement",
				evenementColloqueScienntifiqueVo.getDateEvenementMin(),
				evenementColloqueScienntifiqueVo.getDateEvenementMax());
		query += SearchUtil.addConstraintMinMax("o", "volumeParticipant",
				evenementColloqueScienntifiqueVo.getVolumeParticipantMin(),
				evenementColloqueScienntifiqueVo.getVolumeParticipantMax());
		if (evenementColloqueScienntifiqueVo.getModaliteVo() != null) {
			query += SearchUtil.addConstraint("o", "modalite.id", "=",
					evenementColloqueScienntifiqueVo.getModaliteVo().getId());
			query += SearchUtil.addConstraint("o", "modalite.code", "LIKE",
					evenementColloqueScienntifiqueVo.getModaliteVo().getCode());
		}

		if (evenementColloqueScienntifiqueVo.getModaliteInterventionVo() != null) {
			query += SearchUtil.addConstraint("o", "modaliteIntervention.id", "=",
					evenementColloqueScienntifiqueVo.getModaliteInterventionVo().getId());
			query += SearchUtil.addConstraint("o", "modaliteIntervention.code", "LIKE",
					evenementColloqueScienntifiqueVo.getModaliteInterventionVo().getCode());
		}

		if (evenementColloqueScienntifiqueVo.getSavoirEtInnovationVo() != null) {
			query += SearchUtil.addConstraint("o", "savoirEtInnovation.id", "=",
					evenementColloqueScienntifiqueVo.getSavoirEtInnovationVo().getId());
		}

		if (evenementColloqueScienntifiqueVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					evenementColloqueScienntifiqueVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					evenementColloqueScienntifiqueVo.getEtatEtapeCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveEvenementColloqueScienntifiqueEnjeuxIrds(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrds) {

		if (ListUtil.isNotEmpty(evenementColloqueScienntifique.getEvenementColloqueScienntifiqueEnjeuxIrds())) {
			List<EvenementColloqueScienntifiqueEnjeuxIrd> savedEvenementColloqueScienntifiqueEnjeuxIrds = new ArrayList<>();
			evenementColloqueScienntifiqueEnjeuxIrds.forEach(element -> {
				element.setEvenementColloqueScienntifique(evenementColloqueScienntifique);
				evenementColloqueScienntifiqueEnjeuxIrdService.save(element);
			});
			evenementColloqueScienntifique
					.setEvenementColloqueScienntifiqueEnjeuxIrds(savedEvenementColloqueScienntifiqueEnjeuxIrds);
		}
	}

	private void saveCommunauteSavoirEvenementColloqueScientifiques(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScientifiqueInstrumentIrd> communauteSavoirEvenementColloqueScientifiques) {

		if (ListUtil.isNotEmpty(evenementColloqueScienntifique.getCommunauteSavoirEvenementColloqueScientifiques())) {
			List<EvenementColloqueScientifiqueInstrumentIrd> savedCommunauteSavoirEvenementColloqueScientifiques = new ArrayList<>();
			communauteSavoirEvenementColloqueScientifiques.forEach(element -> {
				element.setEvenementColloqueScienntifique(evenementColloqueScienntifique);
				communauteSavoirEvenementColloqueScientifiqueService.save(element);
			});
			evenementColloqueScienntifique.setCommunauteSavoirEvenementColloqueScientifiques(
					savedCommunauteSavoirEvenementColloqueScientifiques);
		}
	}

	private void saveDisciplineScientifiqueEvenementColloqueScientifiques(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifiques) {

		if (ListUtil
				.isNotEmpty(evenementColloqueScienntifique.getDisciplineScientifiqueEvenementColloqueScientifiques())) {
			List<DisciplineScientifiqueEvenementColloqueScientifique> savedDisciplineScientifiqueEvenementColloqueScientifiques = new ArrayList<>();
			disciplineScientifiqueEvenementColloqueScientifiques.forEach(element -> {
				element.setEvenementColloqueScienntifique(evenementColloqueScienntifique);
				disciplineScientifiqueEvenementColloqueScientifiqueService.save(element);
			});
			evenementColloqueScienntifique.setDisciplineScientifiqueEvenementColloqueScientifiques(
					savedDisciplineScientifiqueEvenementColloqueScientifiques);
		}
	}

	private void saveEvenementColloqueScienntifiquePayss(EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePayss) {

		if (ListUtil.isNotEmpty(evenementColloqueScienntifique.getEvenementColloqueScienntifiquePayss())) {
			List<EvenementColloqueScienntifiquePays> savedEvenementColloqueScienntifiquePayss = new ArrayList<>();
			evenementColloqueScienntifiquePayss.forEach(element -> {
				element.setEvenementColloqueScienntifique(evenementColloqueScienntifique);
				evenementColloqueScienntifiquePaysService.save(element);
			});
			evenementColloqueScienntifique
					.setEvenementColloqueScienntifiquePayss(savedEvenementColloqueScienntifiquePayss);
		}
	}

	private void findModalite(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		Modalite loadedModalite = modaliteService.findByIdOrCode(evenementColloqueScienntifique.getModalite());

		if (loadedModalite == null) {
			return;
		}
		evenementColloqueScienntifique.setModalite(loadedModalite);
	}

	private void findModaliteIntervention(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		ModaliteIntervention loadedModaliteIntervention = modaliteInterventionService
				.findByIdOrCode(evenementColloqueScienntifique.getModaliteIntervention());

		if (loadedModaliteIntervention == null) {
			return;
		}
		evenementColloqueScienntifique.setModaliteIntervention(loadedModaliteIntervention);
	}

	private void findSavoirEtInnovation(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		SavoirEtInnovation loadedSavoirEtInnovation = null;
		if (evenementColloqueScienntifique.getSavoirEtInnovation() != null
				&& evenementColloqueScienntifique.getSavoirEtInnovation().getId() != null)
			loadedSavoirEtInnovation = savoirEtInnovationService
					.findById(evenementColloqueScienntifique.getSavoirEtInnovation().getId());

		if (loadedSavoirEtInnovation == null) {
			return;
		}
		evenementColloqueScienntifique.setSavoirEtInnovation(loadedSavoirEtInnovation);
	}

	private void findEtatEtapeCampagne(EvenementColloqueScienntifique evenementColloqueScienntifique) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(evenementColloqueScienntifique.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		evenementColloqueScienntifique.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	@Override
	@Transactional
	public void delete(List<EvenementColloqueScienntifique> evenementColloqueScienntifiques) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiques)) {
			evenementColloqueScienntifiques.forEach(e -> evenementColloqueScienntifiqueDao.delete(e));
		}
	}

	@Override
	public void update(List<EvenementColloqueScienntifique> evenementColloqueScienntifiques) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiques)) {
			evenementColloqueScienntifiques.forEach(e -> evenementColloqueScienntifiqueDao.save(e));
		}
	}

	private void associateEvenementColloqueScienntifiqueEnjeuxIrd(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScienntifiqueEnjeuxIrd> evenementColloqueScienntifiqueEnjeuxIrd) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiqueEnjeuxIrd)) {
			evenementColloqueScienntifiqueEnjeuxIrd
					.forEach(e -> e.setEvenementColloqueScienntifique(evenementColloqueScienntifique));
		}
	}

	private void associateCommunauteSavoirEvenementColloqueScientifique(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScientifiqueInstrumentIrd> communauteSavoirEvenementColloqueScientifique) {
		if (ListUtil.isNotEmpty(communauteSavoirEvenementColloqueScientifique)) {
			communauteSavoirEvenementColloqueScientifique
					.forEach(e -> e.setEvenementColloqueScienntifique(evenementColloqueScienntifique));
		}
	}

	private void associateDisciplineScientifiqueEvenementColloqueScientifique(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<DisciplineScientifiqueEvenementColloqueScientifique> disciplineScientifiqueEvenementColloqueScientifique) {
		if (ListUtil.isNotEmpty(disciplineScientifiqueEvenementColloqueScientifique)) {
			disciplineScientifiqueEvenementColloqueScientifique
					.forEach(e -> e.setEvenementColloqueScienntifique(evenementColloqueScienntifique));
		}
	}

	private void associateEvenementColloqueScienntifiquePays(
			EvenementColloqueScienntifique evenementColloqueScienntifique,
			List<EvenementColloqueScienntifiquePays> evenementColloqueScienntifiquePays) {
		if (ListUtil.isNotEmpty(evenementColloqueScienntifiquePays)) {
			evenementColloqueScienntifiquePays
					.forEach(e -> e.setEvenementColloqueScienntifique(evenementColloqueScienntifique));
		}
	}

	@Override
	public List<List<EvenementColloqueScienntifique>> getToBeSavedAndToBeDeleted(
			List<EvenementColloqueScienntifique> oldList, List<EvenementColloqueScienntifique> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
