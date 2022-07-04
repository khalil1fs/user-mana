package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.bean.referentiel.ModaliteFormationContinue;
import com.ird.faa.bean.formulaire.EnseignementEtFormation;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.FormationContinuePubliqueProfessionel;
import com.ird.faa.bean.formulaire.FormationContinueObjetFormationGenerique;
import com.ird.faa.bean.formulaire.FormationContinueEnjeuxIrd;
import com.ird.faa.bean.formulaire.FormationContinueDisciplineScientifique;
import com.ird.faa.bean.formulaire.PaysFormationContinue;
import com.ird.faa.bean.formulaire.ZoneGeographiqueFormationContinue;
import com.ird.faa.bean.formulaire.FormationContinueEtablissement;
import com.ird.faa.dao.formulaire.FormationContinueDao;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEtFormationAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.ModaliteFormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueObjetFormationGeneriqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ZoneGeographiqueFormationContinueAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinueEtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.FormationContinuePubliqueProfessionelAdminService;
import com.ird.faa.service.admin.facade.formulaire.PaysFormationContinueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class FormationContinueAdminServiceImpl extends AbstractServiceImpl<FormationContinue>
		implements FormationContinueAdminService {

	@Autowired
	private FormationContinueDao formationContinueDao;

	@Autowired
	private EnseignementEtFormationAdminService enseignementEtFormationService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private FormationContinueDisciplineScientifiqueAdminService formationContinueDisciplineScientifiqueService;
	@Autowired
	private ModaliteFormationContinueAdminService modaliteFormationContinueService;
	@Autowired
	private FormationContinueObjetFormationGeneriqueAdminService formationContinueObjetFormationGeneriqueService;
	@Autowired
	private FormationContinueEnjeuxIrdAdminService formationContinueEnjeuxIrdService;
	@Autowired
	private ZoneGeographiqueFormationContinueAdminService zoneGeographiqueFormationContinueService;
	@Autowired
	private FormationContinueEtablissementAdminService formationContinueEtablissementService;
	@Autowired
	private FormationContinuePubliqueProfessionelAdminService formationContinuePubliqueProfessionelService;
	@Autowired
	private PaysFormationContinueAdminService paysFormationContinueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<FormationContinue> findAll() {
		return formationContinueDao.findAll();
	}

	@Override
	public List<FormationContinue> findByModaliteFormationContinueCode(String code) {
		return formationContinueDao.findByModaliteFormationContinueCode(code);
	}

	@Override
	@Transactional
	public int deleteByModaliteFormationContinueCode(String code) {
		return formationContinueDao.deleteByModaliteFormationContinueCode(code);
	}

	@Override
	public List<FormationContinue> findByModaliteFormationContinueId(Long id) {
		return formationContinueDao.findByModaliteFormationContinueId(id);
	}

	@Override
	@Transactional
	public int deleteByModaliteFormationContinueId(Long id) {
		return formationContinueDao.deleteByModaliteFormationContinueId(id);
	}

	@Override
	public List<FormationContinue> findByEnseignementEtFormationId(Long id) {
		return formationContinueDao.findByEnseignementEtFormationId(id);
	}

	@Override
	@Transactional
	public int deleteByEnseignementEtFormationId(Long id) {
		return formationContinueDao.deleteByEnseignementEtFormationId(id);
	}

	@Override
	public List<FormationContinue> findByEtatEtapeCampagneCode(String code) {
		return formationContinueDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return formationContinueDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<FormationContinue> findByEtatEtapeCampagneId(Long id) {
		return formationContinueDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return formationContinueDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public FormationContinue findById(Long id) {
		if (id == null)
			return null;
		return formationContinueDao.getOne(id);
	}

	@Override
	public FormationContinue findByIdWithAssociatedList(Long id) {
		FormationContinue formationContinue = findById(id);
		findAssociatedLists(formationContinue);
		return formationContinue;
	}

	private void findAssociatedLists(FormationContinue formationContinue) {
		if (formationContinue != null && formationContinue.getId() != null) {
			List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels = formationContinuePubliqueProfessionelService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setFormationContinuePubliqueProfessionels(formationContinuePubliqueProfessionels);
			List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques = formationContinueObjetFormationGeneriqueService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setFormationContinueObjetFormationGeneriques(formationContinueObjetFormationGeneriques);
			List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds = formationContinueEnjeuxIrdService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setFormationContinueEnjeuxIrds(formationContinueEnjeuxIrds);
			List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques = formationContinueDisciplineScientifiqueService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setFormationContinueDisciplineScientifiques(formationContinueDisciplineScientifiques);
			List<PaysFormationContinue> paysFormationContinues = paysFormationContinueService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setPaysFormationContinues(paysFormationContinues);
			List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues = zoneGeographiqueFormationContinueService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setZoneGeographiqueFormationContinues(zoneGeographiqueFormationContinues);
			List<FormationContinueEtablissement> formationContinueEtablissements = formationContinueEtablissementService
					.findByFormationContinueId(formationContinue.getId());
			formationContinue.setFormationContinueEtablissements(formationContinueEtablissements);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id != null) {
			formationContinuePubliqueProfessionelService.deleteByFormationContinueId(id);
			formationContinueObjetFormationGeneriqueService.deleteByFormationContinueId(id);
			formationContinueEnjeuxIrdService.deleteByFormationContinueId(id);
			formationContinueDisciplineScientifiqueService.deleteByFormationContinueId(id);
			paysFormationContinueService.deleteByFormationContinueId(id);
			zoneGeographiqueFormationContinueService.deleteByFormationContinueId(id);
			formationContinueEtablissementService.deleteByFormationContinueId(id);
		}
	}

	private void updateAssociatedLists(FormationContinue formationContinue) {
		if (formationContinue != null && formationContinue.getId() != null) {
			List<List<FormationContinuePubliqueProfessionel>> resultFormationContinuePubliqueProfessionels = formationContinuePubliqueProfessionelService
					.getToBeSavedAndToBeDeleted(
							formationContinuePubliqueProfessionelService
									.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getFormationContinuePubliqueProfessionels());
			formationContinuePubliqueProfessionelService.delete(resultFormationContinuePubliqueProfessionels.get(1));
			associateFormationContinuePubliqueProfessionel(formationContinue,
					resultFormationContinuePubliqueProfessionels.get(0));
			formationContinuePubliqueProfessionelService.update(resultFormationContinuePubliqueProfessionels.get(0));

			List<List<FormationContinueObjetFormationGenerique>> resultFormationContinueObjetFormationGeneriques = formationContinueObjetFormationGeneriqueService
					.getToBeSavedAndToBeDeleted(
							formationContinueObjetFormationGeneriqueService
									.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getFormationContinueObjetFormationGeneriques());
			formationContinueObjetFormationGeneriqueService
					.delete(resultFormationContinueObjetFormationGeneriques.get(1));
			associateFormationContinueObjetFormationGenerique(formationContinue,
					resultFormationContinueObjetFormationGeneriques.get(0));
			formationContinueObjetFormationGeneriqueService
					.update(resultFormationContinueObjetFormationGeneriques.get(0));

			List<List<FormationContinueEnjeuxIrd>> resultFormationContinueEnjeuxIrds = formationContinueEnjeuxIrdService
					.getToBeSavedAndToBeDeleted(
							formationContinueEnjeuxIrdService.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getFormationContinueEnjeuxIrds());
			formationContinueEnjeuxIrdService.delete(resultFormationContinueEnjeuxIrds.get(1));
			associateFormationContinueEnjeuxIrd(formationContinue, resultFormationContinueEnjeuxIrds.get(0));
			formationContinueEnjeuxIrdService.update(resultFormationContinueEnjeuxIrds.get(0));

			List<List<FormationContinueDisciplineScientifique>> resultFormationContinueDisciplineScientifiques = formationContinueDisciplineScientifiqueService
					.getToBeSavedAndToBeDeleted(
							formationContinueDisciplineScientifiqueService
									.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getFormationContinueDisciplineScientifiques());
			formationContinueDisciplineScientifiqueService
					.delete(resultFormationContinueDisciplineScientifiques.get(1));
			associateFormationContinueDisciplineScientifique(formationContinue,
					resultFormationContinueDisciplineScientifiques.get(0));
			formationContinueDisciplineScientifiqueService
					.update(resultFormationContinueDisciplineScientifiques.get(0));

			List<List<PaysFormationContinue>> resultPaysFormationContinues = paysFormationContinueService
					.getToBeSavedAndToBeDeleted(
							paysFormationContinueService.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getPaysFormationContinues());
			paysFormationContinueService.delete(resultPaysFormationContinues.get(1));
			associatePaysFormationContinue(formationContinue, resultPaysFormationContinues.get(0));
			paysFormationContinueService.update(resultPaysFormationContinues.get(0));

			List<List<ZoneGeographiqueFormationContinue>> resultZoneGeographiqueFormationContinues = zoneGeographiqueFormationContinueService
					.getToBeSavedAndToBeDeleted(
							zoneGeographiqueFormationContinueService
									.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getZoneGeographiqueFormationContinues());
			zoneGeographiqueFormationContinueService.delete(resultZoneGeographiqueFormationContinues.get(1));
			associateZoneGeographiqueFormationContinue(formationContinue,
					resultZoneGeographiqueFormationContinues.get(0));
			zoneGeographiqueFormationContinueService.update(resultZoneGeographiqueFormationContinues.get(0));

			List<List<FormationContinueEtablissement>> resultFormationContinueEtablissements = formationContinueEtablissementService
					.getToBeSavedAndToBeDeleted(
							formationContinueEtablissementService.findByFormationContinueId(formationContinue.getId()),
							formationContinue.getFormationContinueEtablissements());
			formationContinueEtablissementService.delete(resultFormationContinueEtablissements.get(1));
			associateFormationContinueEtablissement(formationContinue, resultFormationContinueEtablissements.get(0));
			formationContinueEtablissementService.update(resultFormationContinueEtablissements.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (formationContinueDao.findById(id).isPresent()) {
			deleteAssociatedLists(id);
			formationContinueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public FormationContinue update(FormationContinue formationContinue) {
		FormationContinue foundedFormationContinue = findById(formationContinue.getId());
		if (foundedFormationContinue == null)
			return null;
		else {
			updateAssociatedLists(formationContinue);
			return formationContinueDao.save(formationContinue);
		}
	}

	@Override
	public FormationContinue save(FormationContinue formationContinue) {

		FormationContinue result = null;

		findModaliteFormationContinue(formationContinue);
		findEnseignementEtFormation(formationContinue);
		findEtatEtapeCampagne(formationContinue);

		FormationContinue savedFormationContinue = formationContinueDao.save(formationContinue);

		saveFormationContinuePubliqueProfessionels(savedFormationContinue,
				formationContinue.getFormationContinuePubliqueProfessionels());
		saveFormationContinueObjetFormationGeneriques(savedFormationContinue,
				formationContinue.getFormationContinueObjetFormationGeneriques());
		saveFormationContinueEnjeuxIrds(savedFormationContinue, formationContinue.getFormationContinueEnjeuxIrds());
		saveFormationContinueDisciplineScientifiques(savedFormationContinue,
				formationContinue.getFormationContinueDisciplineScientifiques());
		savePaysFormationContinues(savedFormationContinue, formationContinue.getPaysFormationContinues());
		saveZoneGeographiqueFormationContinues(savedFormationContinue,
				formationContinue.getZoneGeographiqueFormationContinues());
		saveFormationContinueEtablissements(savedFormationContinue,
				formationContinue.getFormationContinueEtablissements());
		result = savedFormationContinue;

		return result;
	}

	@Override
	public List<FormationContinue> save(List<FormationContinue> formationContinues) {
		List<FormationContinue> list = new ArrayList<>();
		for (FormationContinue formationContinue : formationContinues) {
			list.add(save(formationContinue));
		}
		return list;
	}

	private List<FormationContinuePubliqueProfessionel> prepareFormationContinuePubliqueProfessionels(
			FormationContinue formationContinue,
			List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels) {
		for (FormationContinuePubliqueProfessionel formationContinuePubliqueProfessionel : formationContinuePubliqueProfessionels) {
			formationContinuePubliqueProfessionel.setFormationContinue(formationContinue);
		}
		return formationContinuePubliqueProfessionels;
	}

	private List<FormationContinueObjetFormationGenerique> prepareFormationContinueObjetFormationGeneriques(
			FormationContinue formationContinue,
			List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques) {
		for (FormationContinueObjetFormationGenerique formationContinueObjetFormationGenerique : formationContinueObjetFormationGeneriques) {
			formationContinueObjetFormationGenerique.setFormationContinue(formationContinue);
		}
		return formationContinueObjetFormationGeneriques;
	}

	private List<FormationContinueEnjeuxIrd> prepareFormationContinueEnjeuxIrds(FormationContinue formationContinue,
			List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds) {
		for (FormationContinueEnjeuxIrd formationContinueEnjeuxIrd : formationContinueEnjeuxIrds) {
			formationContinueEnjeuxIrd.setFormationContinue(formationContinue);
		}
		return formationContinueEnjeuxIrds;
	}

	private List<FormationContinueDisciplineScientifique> prepareFormationContinueDisciplineScientifiques(
			FormationContinue formationContinue,
			List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques) {
		for (FormationContinueDisciplineScientifique formationContinueDisciplineScientifique : formationContinueDisciplineScientifiques) {
			formationContinueDisciplineScientifique.setFormationContinue(formationContinue);
		}
		return formationContinueDisciplineScientifiques;
	}

	private List<PaysFormationContinue> preparePaysFormationContinues(FormationContinue formationContinue,
			List<PaysFormationContinue> paysFormationContinues) {
		for (PaysFormationContinue paysFormationContinue : paysFormationContinues) {
			paysFormationContinue.setFormationContinue(formationContinue);
		}
		return paysFormationContinues;
	}

	private List<ZoneGeographiqueFormationContinue> prepareZoneGeographiqueFormationContinues(
			FormationContinue formationContinue,
			List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues) {
		for (ZoneGeographiqueFormationContinue zoneGeographiqueFormationContinue : zoneGeographiqueFormationContinues) {
			zoneGeographiqueFormationContinue.setFormationContinue(formationContinue);
		}
		return zoneGeographiqueFormationContinues;
	}

	private List<FormationContinueEtablissement> prepareFormationContinueEtablissements(
			FormationContinue formationContinue, List<FormationContinueEtablissement> formationContinueEtablissements) {
		for (FormationContinueEtablissement formationContinueEtablissement : formationContinueEtablissements) {
			formationContinueEtablissement.setFormationContinue(formationContinue);
		}
		return formationContinueEtablissements;
	}

	@Override
	@Transactional
	public int delete(FormationContinue formationContinue) {
		if (formationContinue.getId() == null)
			return -1;
		FormationContinue foundedFormationContinue = findById(formationContinue.getId());
		if (foundedFormationContinue == null)
			return -1;
		formationContinueDao.delete(foundedFormationContinue);
		return 1;
	}

	public List<FormationContinue> findByCriteria(FormationContinueVo formationContinueVo) {

		String query = "SELECT o FROM FormationContinue o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", formationContinueVo.getId());
		query += SearchUtil.addConstraint("o", "intitule", "LIKE", formationContinueVo.getIntitule());
		query += SearchUtil.addConstraint("o", "nombreHeuresDispenseesDansAnnee", "=",
				formationContinueVo.getNombreHeuresDispenseesDansAnnee());
		query += SearchUtil.addConstraintMinMax("o", "nombreHeuresDispenseesDansAnnee",
				formationContinueVo.getNombreHeuresDispenseesDansAnneeMin(),
				formationContinueVo.getNombreHeuresDispenseesDansAnneeMax());
		if (formationContinueVo.getModaliteFormationContinueVo() != null) {
			query += SearchUtil.addConstraint("o", "modaliteFormationContinue.id", "=",
					formationContinueVo.getModaliteFormationContinueVo().getId());
			query += SearchUtil.addConstraint("o", "modaliteFormationContinue.code", "LIKE",
					formationContinueVo.getModaliteFormationContinueVo().getCode());
		}

		if (formationContinueVo.getEnseignementEtFormationVo() != null) {
			query += SearchUtil.addConstraint("o", "enseignementEtFormation.id", "=",
					formationContinueVo.getEnseignementEtFormationVo().getId());
		}

		if (formationContinueVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					formationContinueVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					formationContinueVo.getEtatEtapeCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveFormationContinuePubliqueProfessionels(FormationContinue formationContinue,
			List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionels) {

		if (ListUtil.isNotEmpty(formationContinue.getFormationContinuePubliqueProfessionels())) {
			List<FormationContinuePubliqueProfessionel> savedFormationContinuePubliqueProfessionels = new ArrayList<>();
			formationContinuePubliqueProfessionels.forEach(element -> {
				element.setFormationContinue(formationContinue);
				formationContinuePubliqueProfessionelService.save(element);
			});
			formationContinue.setFormationContinuePubliqueProfessionels(savedFormationContinuePubliqueProfessionels);
		}
	}

	private void saveFormationContinueObjetFormationGeneriques(FormationContinue formationContinue,
			List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGeneriques) {

		if (ListUtil.isNotEmpty(formationContinue.getFormationContinueObjetFormationGeneriques())) {
			List<FormationContinueObjetFormationGenerique> savedFormationContinueObjetFormationGeneriques = new ArrayList<>();
			formationContinueObjetFormationGeneriques.forEach(element -> {
				element.setFormationContinue(formationContinue);
				formationContinueObjetFormationGeneriqueService.save(element);
			});
			formationContinue
					.setFormationContinueObjetFormationGeneriques(savedFormationContinueObjetFormationGeneriques);
		}
	}

	private void saveFormationContinueEnjeuxIrds(FormationContinue formationContinue,
			List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrds) {

		if (ListUtil.isNotEmpty(formationContinue.getFormationContinueEnjeuxIrds())) {
			List<FormationContinueEnjeuxIrd> savedFormationContinueEnjeuxIrds = new ArrayList<>();
			formationContinueEnjeuxIrds.forEach(element -> {
				element.setFormationContinue(formationContinue);
				formationContinueEnjeuxIrdService.save(element);
			});
			formationContinue.setFormationContinueEnjeuxIrds(savedFormationContinueEnjeuxIrds);
		}
	}

	private void saveFormationContinueDisciplineScientifiques(FormationContinue formationContinue,
			List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifiques) {

		if (ListUtil.isNotEmpty(formationContinue.getFormationContinueDisciplineScientifiques())) {
			List<FormationContinueDisciplineScientifique> savedFormationContinueDisciplineScientifiques = new ArrayList<>();
			formationContinueDisciplineScientifiques.forEach(element -> {
				element.setFormationContinue(formationContinue);
				formationContinueDisciplineScientifiqueService.save(element);
			});
			formationContinue
					.setFormationContinueDisciplineScientifiques(savedFormationContinueDisciplineScientifiques);
		}
	}

	private void savePaysFormationContinues(FormationContinue formationContinue,
			List<PaysFormationContinue> paysFormationContinues) {

		if (ListUtil.isNotEmpty(formationContinue.getPaysFormationContinues())) {
			List<PaysFormationContinue> savedPaysFormationContinues = new ArrayList<>();
			paysFormationContinues.forEach(element -> {
				element.setFormationContinue(formationContinue);
				paysFormationContinueService.save(element);
			});
			formationContinue.setPaysFormationContinues(savedPaysFormationContinues);
		}
	}

	private void saveZoneGeographiqueFormationContinues(FormationContinue formationContinue,
			List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinues) {

		if (ListUtil.isNotEmpty(formationContinue.getZoneGeographiqueFormationContinues())) {
			List<ZoneGeographiqueFormationContinue> savedZoneGeographiqueFormationContinues = new ArrayList<>();
			zoneGeographiqueFormationContinues.forEach(element -> {
				element.setFormationContinue(formationContinue);
				zoneGeographiqueFormationContinueService.save(element);
			});
			formationContinue.setZoneGeographiqueFormationContinues(savedZoneGeographiqueFormationContinues);
		}
	}

	private void saveFormationContinueEtablissements(FormationContinue formationContinue,
			List<FormationContinueEtablissement> formationContinueEtablissements) {

		if (ListUtil.isNotEmpty(formationContinue.getFormationContinueEtablissements())) {
			List<FormationContinueEtablissement> savedFormationContinueEtablissements = new ArrayList<>();
			formationContinueEtablissements.forEach(element -> {
				element.setFormationContinue(formationContinue);
				formationContinueEtablissementService.save(element);
			});
			formationContinue.setFormationContinueEtablissements(savedFormationContinueEtablissements);
		}
	}

	private void findModaliteFormationContinue(FormationContinue formationContinue) {
		ModaliteFormationContinue loadedModaliteFormationContinue = modaliteFormationContinueService
				.findByIdOrCode(formationContinue.getModaliteFormationContinue());

		if (loadedModaliteFormationContinue == null) {
			return;
		}
		formationContinue.setModaliteFormationContinue(loadedModaliteFormationContinue);
	}

	private void findEnseignementEtFormation(FormationContinue formationContinue) {
		EnseignementEtFormation loadedEnseignementEtFormation = null;
		if (formationContinue.getEnseignementEtFormation() != null
				&& formationContinue.getEnseignementEtFormation().getId() != null)
			loadedEnseignementEtFormation = enseignementEtFormationService
					.findById(formationContinue.getEnseignementEtFormation().getId());

		if (loadedEnseignementEtFormation == null) {
			return;
		}
		formationContinue.setEnseignementEtFormation(loadedEnseignementEtFormation);
	}

	private void findEtatEtapeCampagne(FormationContinue formationContinue) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(formationContinue.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		formationContinue.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	@Override
	@Transactional
	public void delete(List<FormationContinue> formationContinues) {
		if (ListUtil.isNotEmpty(formationContinues)) {
			formationContinues.forEach(e -> formationContinueDao.delete(e));
		}
	}

	@Override
	public void update(List<FormationContinue> formationContinues) {
		if (ListUtil.isNotEmpty(formationContinues)) {
			formationContinues.forEach(e -> formationContinueDao.save(e));
		}
	}

	private void associateFormationContinuePubliqueProfessionel(FormationContinue formationContinue,
			List<FormationContinuePubliqueProfessionel> formationContinuePubliqueProfessionel) {
		if (ListUtil.isNotEmpty(formationContinuePubliqueProfessionel)) {
			formationContinuePubliqueProfessionel.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associateFormationContinueObjetFormationGenerique(FormationContinue formationContinue,
			List<FormationContinueObjetFormationGenerique> formationContinueObjetFormationGenerique) {
		if (ListUtil.isNotEmpty(formationContinueObjetFormationGenerique)) {
			formationContinueObjetFormationGenerique.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associateFormationContinueEnjeuxIrd(FormationContinue formationContinue,
			List<FormationContinueEnjeuxIrd> formationContinueEnjeuxIrd) {
		if (ListUtil.isNotEmpty(formationContinueEnjeuxIrd)) {
			formationContinueEnjeuxIrd.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associateFormationContinueDisciplineScientifique(FormationContinue formationContinue,
			List<FormationContinueDisciplineScientifique> formationContinueDisciplineScientifique) {
		if (ListUtil.isNotEmpty(formationContinueDisciplineScientifique)) {
			formationContinueDisciplineScientifique.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associatePaysFormationContinue(FormationContinue formationContinue,
			List<PaysFormationContinue> paysFormationContinue) {
		if (ListUtil.isNotEmpty(paysFormationContinue)) {
			paysFormationContinue.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associateZoneGeographiqueFormationContinue(FormationContinue formationContinue,
			List<ZoneGeographiqueFormationContinue> zoneGeographiqueFormationContinue) {
		if (ListUtil.isNotEmpty(zoneGeographiqueFormationContinue)) {
			zoneGeographiqueFormationContinue.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

	private void associateFormationContinueEtablissement(FormationContinue formationContinue,
			List<FormationContinueEtablissement> formationContinueEtablissement) {
		if (ListUtil.isNotEmpty(formationContinueEtablissement)) {
			formationContinueEtablissement.forEach(e -> e.setFormationContinue(formationContinue));
		}
	}

}
