package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.bean.referentiel.ModaliteEtude;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.EnseignementEtFormation;
import com.ird.faa.bean.formulaire.TypeEtudeEnseignement;
import com.ird.faa.bean.formulaire.EnseignementNature;
import com.ird.faa.bean.formulaire.NiveauEtudeEnseignement;
import com.ird.faa.bean.formulaire.EtablissementEnseignement;
import com.ird.faa.bean.formulaire.EnseignementPays;
import com.ird.faa.bean.formulaire.EnseignementZoneGeographique;
import com.ird.faa.bean.formulaire.EnseignementEnjeuxIrd;
import com.ird.faa.bean.formulaire.EnseignementDisciplineScientifique;
import com.ird.faa.dao.formulaire.EnseignementDao;
import com.ird.faa.service.admin.facade.formulaire.EnseignementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEtFormationAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementNatureAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.NiveauEtudeEnseignementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EtablissementEnseignementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementPaysAdminService;
import com.ird.faa.service.admin.facade.formulaire.TypeEtudeEnseignementAdminService;
import com.ird.faa.service.admin.facade.referentiel.ModaliteEtudeAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementZoneGeographiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnseignementAdminServiceImpl extends AbstractServiceImpl<Enseignement>
		implements EnseignementAdminService {

	@Autowired
	private EnseignementDao enseignementDao;

	@Autowired
	private EnseignementEtFormationAdminService enseignementEtFormationService;
	@Autowired
	private EnseignementDisciplineScientifiqueAdminService enseignementDisciplineScientifiqueService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private EnseignementNatureAdminService enseignementNatureService;
	@Autowired
	private EnseignementEnjeuxIrdAdminService enseignementEnjeuxIrdService;
	@Autowired
	private NiveauEtudeEnseignementAdminService niveauEtudeEnseignementService;
	@Autowired
	private EtablissementEnseignementAdminService etablissementEnseignementService;
	@Autowired
	private EnseignementPaysAdminService enseignementPaysService;
	@Autowired
	private TypeEtudeEnseignementAdminService typeEtudeEnseignementService;
	@Autowired
	private ModaliteEtudeAdminService modaliteEtudeService;
	@Autowired
	private EnseignementZoneGeographiqueAdminService enseignementZoneGeographiqueService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Enseignement> findAll() {
		return enseignementDao.findAll();
	}

	@Override
	public List<Enseignement> findByModaliteEtudeCode(String code) {
		return enseignementDao.findByModaliteEtudeCode(code);
	}

	@Override
	@Transactional
	public int deleteByModaliteEtudeCode(String code) {
		return enseignementDao.deleteByModaliteEtudeCode(code);
	}

	@Override
	public List<Enseignement> findByModaliteEtudeId(Long id) {
		return enseignementDao.findByModaliteEtudeId(id);
	}

	@Override
	@Transactional
	public int deleteByModaliteEtudeId(Long id) {
		return enseignementDao.deleteByModaliteEtudeId(id);
	}

	@Override
	public List<Enseignement> findByEtatEtapeCampagneCode(String code) {
		return enseignementDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return enseignementDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<Enseignement> findByEtatEtapeCampagneId(Long id) {
		return enseignementDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return enseignementDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public List<Enseignement> findByEnseignementEtFormationId(Long id) {
		return enseignementDao.findByEnseignementEtFormationId(id);
	}

	@Override
	@Transactional
	public int deleteByEnseignementEtFormationId(Long id) {
		return enseignementDao.deleteByEnseignementEtFormationId(id);
	}

	@Override
	public Enseignement findById(Long id) {
		if (id == null)
			return null;
		return enseignementDao.getOne(id);
	}

	@Override
	public Enseignement findByIdWithAssociatedList(Long id) {
		Enseignement enseignement = findById(id);
		findAssociatedLists(enseignement);
		return enseignement;
	}

	private void findAssociatedLists(Enseignement enseignement) {
		if (enseignement != null && enseignement.getId() != null) {
			List<TypeEtudeEnseignement> typeEtudeEnseignements = typeEtudeEnseignementService
					.findByEnseignementId(enseignement.getId());
			enseignement.setTypeEtudeEnseignements(typeEtudeEnseignements);
			List<EnseignementNature> enseignementNatures = enseignementNatureService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEnseignementNatures(enseignementNatures);
			List<NiveauEtudeEnseignement> niveauEtudeEnseignements = niveauEtudeEnseignementService
					.findByEnseignementId(enseignement.getId());
			enseignement.setNiveauEtudeEnseignements(niveauEtudeEnseignements);
			List<EtablissementEnseignement> etablissementEnseignements = etablissementEnseignementService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEtablissementEnseignements(etablissementEnseignements);
			List<EnseignementPays> enseignementPayss = enseignementPaysService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEnseignementPayss(enseignementPayss);
			List<EnseignementZoneGeographique> enseignementZoneGeographiques = enseignementZoneGeographiqueService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEnseignementZoneGeographiques(enseignementZoneGeographiques);
			List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds = enseignementEnjeuxIrdService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEnseignementEnjeuxIrds(enseignementEnjeuxIrds);
			List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques = enseignementDisciplineScientifiqueService
					.findByEnseignementId(enseignement.getId());
			enseignement.setEnseignementDisciplineScientifiques(enseignementDisciplineScientifiques);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id != null) {
			typeEtudeEnseignementService.deleteByEnseignementId(id);
			enseignementNatureService.deleteByEnseignementId(id);
			niveauEtudeEnseignementService.deleteByEnseignementId(id);
			etablissementEnseignementService.deleteByEnseignementId(id);
			enseignementPaysService.deleteByEnseignementId(id);
			enseignementZoneGeographiqueService.deleteByEnseignementId(id);
			enseignementEnjeuxIrdService.deleteByEnseignementId(id);
			enseignementDisciplineScientifiqueService.deleteByEnseignementId(id);
		}
	}

	private void updateAssociatedLists(Enseignement enseignement) {
		if (enseignement != null && enseignement.getId() != null) {
			List<List<TypeEtudeEnseignement>> resultTypeEtudeEnseignements = typeEtudeEnseignementService
					.getToBeSavedAndToBeDeleted(typeEtudeEnseignementService.findByEnseignementId(enseignement.getId()),
							enseignement.getTypeEtudeEnseignements());
			typeEtudeEnseignementService.delete(resultTypeEtudeEnseignements.get(1));
			associateTypeEtudeEnseignement(enseignement, resultTypeEtudeEnseignements.get(0));
			typeEtudeEnseignementService.update(resultTypeEtudeEnseignements.get(0));

			List<List<EnseignementNature>> resultEnseignementNatures = enseignementNatureService
					.getToBeSavedAndToBeDeleted(enseignementNatureService.findByEnseignementId(enseignement.getId()),
							enseignement.getEnseignementNatures());
			enseignementNatureService.delete(resultEnseignementNatures.get(1));
			associateEnseignementNature(enseignement, resultEnseignementNatures.get(0));
			enseignementNatureService.update(resultEnseignementNatures.get(0));

			List<List<NiveauEtudeEnseignement>> resultNiveauEtudeEnseignements = niveauEtudeEnseignementService
					.getToBeSavedAndToBeDeleted(
							niveauEtudeEnseignementService.findByEnseignementId(enseignement.getId()),
							enseignement.getNiveauEtudeEnseignements());
			niveauEtudeEnseignementService.delete(resultNiveauEtudeEnseignements.get(1));
			associateNiveauEtudeEnseignement(enseignement, resultNiveauEtudeEnseignements.get(0));
			niveauEtudeEnseignementService.update(resultNiveauEtudeEnseignements.get(0));

			List<List<EtablissementEnseignement>> resultEtablissementEnseignements = etablissementEnseignementService
					.getToBeSavedAndToBeDeleted(
							etablissementEnseignementService.findByEnseignementId(enseignement.getId()),
							enseignement.getEtablissementEnseignements());
			etablissementEnseignementService.delete(resultEtablissementEnseignements.get(1));
			associateEtablissementEnseignement(enseignement, resultEtablissementEnseignements.get(0));
			etablissementEnseignementService.update(resultEtablissementEnseignements.get(0));

			List<List<EnseignementPays>> resultEnseignementPayss = enseignementPaysService.getToBeSavedAndToBeDeleted(
					enseignementPaysService.findByEnseignementId(enseignement.getId()),
					enseignement.getEnseignementPayss());
			enseignementPaysService.delete(resultEnseignementPayss.get(1));
			associateEnseignementPays(enseignement, resultEnseignementPayss.get(0));
			enseignementPaysService.update(resultEnseignementPayss.get(0));

			List<List<EnseignementZoneGeographique>> resultEnseignementZoneGeographiques = enseignementZoneGeographiqueService
					.getToBeSavedAndToBeDeleted(
							enseignementZoneGeographiqueService.findByEnseignementId(enseignement.getId()),
							enseignement.getEnseignementZoneGeographiques());
			enseignementZoneGeographiqueService.delete(resultEnseignementZoneGeographiques.get(1));
			associateEnseignementZoneGeographique(enseignement, resultEnseignementZoneGeographiques.get(0));
			enseignementZoneGeographiqueService.update(resultEnseignementZoneGeographiques.get(0));

			List<List<EnseignementEnjeuxIrd>> resultEnseignementEnjeuxIrds = enseignementEnjeuxIrdService
					.getToBeSavedAndToBeDeleted(enseignementEnjeuxIrdService.findByEnseignementId(enseignement.getId()),
							enseignement.getEnseignementEnjeuxIrds());
			enseignementEnjeuxIrdService.delete(resultEnseignementEnjeuxIrds.get(1));
			associateEnseignementEnjeuxIrd(enseignement, resultEnseignementEnjeuxIrds.get(0));
			enseignementEnjeuxIrdService.update(resultEnseignementEnjeuxIrds.get(0));

			List<List<EnseignementDisciplineScientifique>> resultEnseignementDisciplineScientifiques = enseignementDisciplineScientifiqueService
					.getToBeSavedAndToBeDeleted(
							enseignementDisciplineScientifiqueService.findByEnseignementId(enseignement.getId()),
							enseignement.getEnseignementDisciplineScientifiques());
			enseignementDisciplineScientifiqueService.delete(resultEnseignementDisciplineScientifiques.get(1));
			associateEnseignementDisciplineScientifique(enseignement, resultEnseignementDisciplineScientifiques.get(0));
			enseignementDisciplineScientifiqueService.update(resultEnseignementDisciplineScientifiques.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (enseignementDao.findById(id).isPresent()) {
			deleteAssociatedLists(id);
			enseignementDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public Enseignement update(Enseignement enseignement) {
		Enseignement foundedEnseignement = findById(enseignement.getId());
		if (foundedEnseignement == null)
			return null;
		else {
			updateAssociatedLists(enseignement);
			return enseignementDao.save(enseignement);
		}
	}

	private void prepareSave(Enseignement enseignement) {
		if (enseignement.getEtabilssementNonReconnu() == null)
			enseignement.setEtabilssementNonReconnu(false);

	}

	@Override
	public Enseignement save(Enseignement enseignement) {
		prepareSave(enseignement);

		Enseignement result = null;

		findModaliteEtude(enseignement);
		findEtatEtapeCampagne(enseignement);
		findEnseignementEtFormation(enseignement);

		Enseignement savedEnseignement = enseignementDao.save(enseignement);

		saveTypeEtudeEnseignements(savedEnseignement, enseignement.getTypeEtudeEnseignements());
		saveEnseignementNatures(savedEnseignement, enseignement.getEnseignementNatures());
		saveNiveauEtudeEnseignements(savedEnseignement, enseignement.getNiveauEtudeEnseignements());
		saveEtablissementEnseignements(savedEnseignement, enseignement.getEtablissementEnseignements());
		saveEnseignementPayss(savedEnseignement, enseignement.getEnseignementPayss());
		saveEnseignementZoneGeographiques(savedEnseignement, enseignement.getEnseignementZoneGeographiques());
		saveEnseignementEnjeuxIrds(savedEnseignement, enseignement.getEnseignementEnjeuxIrds());
		saveEnseignementDisciplineScientifiques(savedEnseignement,
				enseignement.getEnseignementDisciplineScientifiques());
		result = savedEnseignement;

		return result;
	}

	@Override
	public List<Enseignement> save(List<Enseignement> enseignements) {
		List<Enseignement> list = new ArrayList<>();
		for (Enseignement enseignement : enseignements) {
			list.add(save(enseignement));
		}
		return list;
	}

	private List<TypeEtudeEnseignement> prepareTypeEtudeEnseignements(Enseignement enseignement,
			List<TypeEtudeEnseignement> typeEtudeEnseignements) {
		for (TypeEtudeEnseignement typeEtudeEnseignement : typeEtudeEnseignements) {
			typeEtudeEnseignement.setEnseignement(enseignement);
		}
		return typeEtudeEnseignements;
	}

	private List<EnseignementNature> prepareEnseignementNatures(Enseignement enseignement,
			List<EnseignementNature> enseignementNatures) {
		for (EnseignementNature enseignementNature : enseignementNatures) {
			enseignementNature.setEnseignement(enseignement);
		}
		return enseignementNatures;
	}

	private List<NiveauEtudeEnseignement> prepareNiveauEtudeEnseignements(Enseignement enseignement,
			List<NiveauEtudeEnseignement> niveauEtudeEnseignements) {
		for (NiveauEtudeEnseignement niveauEtudeEnseignement : niveauEtudeEnseignements) {
			niveauEtudeEnseignement.setEnseignement(enseignement);
		}
		return niveauEtudeEnseignements;
	}

	private List<EtablissementEnseignement> prepareEtablissementEnseignements(Enseignement enseignement,
			List<EtablissementEnseignement> etablissementEnseignements) {
		for (EtablissementEnseignement etablissementEnseignement : etablissementEnseignements) {
			etablissementEnseignement.setEnseignement(enseignement);
		}
		return etablissementEnseignements;
	}

	private List<EnseignementPays> prepareEnseignementPayss(Enseignement enseignement,
			List<EnseignementPays> enseignementPayss) {
		for (EnseignementPays enseignementPays : enseignementPayss) {
			enseignementPays.setEnseignement(enseignement);
		}
		return enseignementPayss;
	}

	private List<EnseignementZoneGeographique> prepareEnseignementZoneGeographiques(Enseignement enseignement,
			List<EnseignementZoneGeographique> enseignementZoneGeographiques) {
		for (EnseignementZoneGeographique enseignementZoneGeographique : enseignementZoneGeographiques) {
			enseignementZoneGeographique.setEnseignement(enseignement);
		}
		return enseignementZoneGeographiques;
	}

	private List<EnseignementEnjeuxIrd> prepareEnseignementEnjeuxIrds(Enseignement enseignement,
			List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds) {
		for (EnseignementEnjeuxIrd enseignementEnjeuxIrd : enseignementEnjeuxIrds) {
			enseignementEnjeuxIrd.setEnseignement(enseignement);
		}
		return enseignementEnjeuxIrds;
	}

	private List<EnseignementDisciplineScientifique> prepareEnseignementDisciplineScientifiques(
			Enseignement enseignement, List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques) {
		for (EnseignementDisciplineScientifique enseignementDisciplineScientifique : enseignementDisciplineScientifiques) {
			enseignementDisciplineScientifique.setEnseignement(enseignement);
		}
		return enseignementDisciplineScientifiques;
	}

	@Override
	@Transactional
	public int delete(Enseignement enseignement) {
		if (enseignement.getId() == null)
			return -1;
		Enseignement foundedEnseignement = findById(enseignement.getId());
		if (foundedEnseignement == null)
			return -1;
		enseignementDao.delete(foundedEnseignement);
		return 1;
	}

	public List<Enseignement> findByCriteria(EnseignementVo enseignementVo) {

		String query = "SELECT o FROM Enseignement o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", enseignementVo.getId());
		query += SearchUtil.addConstraint("o", "intitule", "LIKE", enseignementVo.getIntitule());
		query += SearchUtil.addConstraint("o", "nombreHeure", "=", enseignementVo.getNombreHeure());
		query += SearchUtil.addConstraint("o", "etabilssementNonReconnu", "=",
				enseignementVo.getEtabilssementNonReconnu());
		query += SearchUtil.addConstraintMinMax("o", "nombreHeure", enseignementVo.getNombreHeureMin(),
				enseignementVo.getNombreHeureMax());
		if (enseignementVo.getModaliteEtudeVo() != null) {
			query += SearchUtil.addConstraint("o", "modaliteEtude.id", "=",
					enseignementVo.getModaliteEtudeVo().getId());
			query += SearchUtil.addConstraint("o", "modaliteEtude.code", "LIKE",
					enseignementVo.getModaliteEtudeVo().getCode());
		}

		if (enseignementVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					enseignementVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					enseignementVo.getEtatEtapeCampagneVo().getCode());
		}

		if (enseignementVo.getEnseignementEtFormationVo() != null) {
			query += SearchUtil.addConstraint("o", "enseignementEtFormation.id", "=",
					enseignementVo.getEnseignementEtFormationVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveTypeEtudeEnseignements(Enseignement enseignement,
			List<TypeEtudeEnseignement> typeEtudeEnseignements) {

		if (ListUtil.isNotEmpty(enseignement.getTypeEtudeEnseignements())) {
			List<TypeEtudeEnseignement> savedTypeEtudeEnseignements = new ArrayList<>();
			typeEtudeEnseignements.forEach(element -> {
				element.setEnseignement(enseignement);
				typeEtudeEnseignementService.save(element);
			});
			enseignement.setTypeEtudeEnseignements(savedTypeEtudeEnseignements);
		}
	}

	private void saveEnseignementNatures(Enseignement enseignement, List<EnseignementNature> enseignementNatures) {

		if (ListUtil.isNotEmpty(enseignement.getEnseignementNatures())) {
			List<EnseignementNature> savedEnseignementNatures = new ArrayList<>();
			enseignementNatures.forEach(element -> {
				element.setEnseignement(enseignement);
				enseignementNatureService.save(element);
			});
			enseignement.setEnseignementNatures(savedEnseignementNatures);
		}
	}

	private void saveNiveauEtudeEnseignements(Enseignement enseignement,
			List<NiveauEtudeEnseignement> niveauEtudeEnseignements) {

		if (ListUtil.isNotEmpty(enseignement.getNiveauEtudeEnseignements())) {
			List<NiveauEtudeEnseignement> savedNiveauEtudeEnseignements = new ArrayList<>();
			niveauEtudeEnseignements.forEach(element -> {
				element.setEnseignement(enseignement);
				niveauEtudeEnseignementService.save(element);
			});
			enseignement.setNiveauEtudeEnseignements(savedNiveauEtudeEnseignements);
		}
	}

	private void saveEtablissementEnseignements(Enseignement enseignement,
			List<EtablissementEnseignement> etablissementEnseignements) {

		if (ListUtil.isNotEmpty(enseignement.getEtablissementEnseignements())) {
			List<EtablissementEnseignement> savedEtablissementEnseignements = new ArrayList<>();
			etablissementEnseignements.forEach(element -> {
				element.setEnseignement(enseignement);
				etablissementEnseignementService.save(element);
			});
			enseignement.setEtablissementEnseignements(savedEtablissementEnseignements);
		}
	}

	private void saveEnseignementPayss(Enseignement enseignement, List<EnseignementPays> enseignementPayss) {

		if (ListUtil.isNotEmpty(enseignement.getEnseignementPayss())) {
			List<EnseignementPays> savedEnseignementPayss = new ArrayList<>();
			enseignementPayss.forEach(element -> {
				element.setEnseignement(enseignement);
				enseignementPaysService.save(element);
			});
			enseignement.setEnseignementPayss(savedEnseignementPayss);
		}
	}

	private void saveEnseignementZoneGeographiques(Enseignement enseignement,
			List<EnseignementZoneGeographique> enseignementZoneGeographiques) {

		if (ListUtil.isNotEmpty(enseignement.getEnseignementZoneGeographiques())) {
			List<EnseignementZoneGeographique> savedEnseignementZoneGeographiques = new ArrayList<>();
			enseignementZoneGeographiques.forEach(element -> {
				element.setEnseignement(enseignement);
				enseignementZoneGeographiqueService.save(element);
			});
			enseignement.setEnseignementZoneGeographiques(savedEnseignementZoneGeographiques);
		}
	}

	private void saveEnseignementEnjeuxIrds(Enseignement enseignement,
			List<EnseignementEnjeuxIrd> enseignementEnjeuxIrds) {

		if (ListUtil.isNotEmpty(enseignement.getEnseignementEnjeuxIrds())) {
			List<EnseignementEnjeuxIrd> savedEnseignementEnjeuxIrds = new ArrayList<>();
			enseignementEnjeuxIrds.forEach(element -> {
				element.setEnseignement(enseignement);
				enseignementEnjeuxIrdService.save(element);
			});
			enseignement.setEnseignementEnjeuxIrds(savedEnseignementEnjeuxIrds);
		}
	}

	private void saveEnseignementDisciplineScientifiques(Enseignement enseignement,
			List<EnseignementDisciplineScientifique> enseignementDisciplineScientifiques) {

		if (ListUtil.isNotEmpty(enseignement.getEnseignementDisciplineScientifiques())) {
			List<EnseignementDisciplineScientifique> savedEnseignementDisciplineScientifiques = new ArrayList<>();
			enseignementDisciplineScientifiques.forEach(element -> {
				element.setEnseignement(enseignement);
				enseignementDisciplineScientifiqueService.save(element);
			});
			enseignement.setEnseignementDisciplineScientifiques(savedEnseignementDisciplineScientifiques);
		}
	}

	private void findModaliteEtude(Enseignement enseignement) {
		ModaliteEtude loadedModaliteEtude = modaliteEtudeService.findByIdOrCode(enseignement.getModaliteEtude());

		if (loadedModaliteEtude == null) {
			return;
		}
		enseignement.setModaliteEtude(loadedModaliteEtude);
	}

	private void findEtatEtapeCampagne(Enseignement enseignement) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(enseignement.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		enseignement.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	private void findEnseignementEtFormation(Enseignement enseignement) {
		EnseignementEtFormation loadedEnseignementEtFormation = null;
		if (enseignement.getEnseignementEtFormation() != null
				&& enseignement.getEnseignementEtFormation().getId() != null)
			loadedEnseignementEtFormation = enseignementEtFormationService
					.findById(enseignement.getEnseignementEtFormation().getId());

		if (loadedEnseignementEtFormation == null) {
			return;
		}
		enseignement.setEnseignementEtFormation(loadedEnseignementEtFormation);
	}

	@Override
	@Transactional
	public void delete(List<Enseignement> enseignements) {
		if (ListUtil.isNotEmpty(enseignements)) {
			enseignements.forEach(e -> enseignementDao.delete(e));
		}
	}

	@Override
	public void update(List<Enseignement> enseignements) {
		if (ListUtil.isNotEmpty(enseignements)) {
			enseignements.forEach(e -> enseignementDao.save(e));
		}
	}

	private void associateTypeEtudeEnseignement(Enseignement enseignement,
			List<TypeEtudeEnseignement> typeEtudeEnseignement) {
		if (ListUtil.isNotEmpty(typeEtudeEnseignement)) {
			typeEtudeEnseignement.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEnseignementNature(Enseignement enseignement, List<EnseignementNature> enseignementNature) {
		if (ListUtil.isNotEmpty(enseignementNature)) {
			enseignementNature.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateNiveauEtudeEnseignement(Enseignement enseignement,
			List<NiveauEtudeEnseignement> niveauEtudeEnseignement) {
		if (ListUtil.isNotEmpty(niveauEtudeEnseignement)) {
			niveauEtudeEnseignement.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEtablissementEnseignement(Enseignement enseignement,
			List<EtablissementEnseignement> etablissementEnseignement) {
		if (ListUtil.isNotEmpty(etablissementEnseignement)) {
			etablissementEnseignement.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEnseignementPays(Enseignement enseignement, List<EnseignementPays> enseignementPays) {
		if (ListUtil.isNotEmpty(enseignementPays)) {
			enseignementPays.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEnseignementZoneGeographique(Enseignement enseignement,
			List<EnseignementZoneGeographique> enseignementZoneGeographique) {
		if (ListUtil.isNotEmpty(enseignementZoneGeographique)) {
			enseignementZoneGeographique.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEnseignementEnjeuxIrd(Enseignement enseignement,
			List<EnseignementEnjeuxIrd> enseignementEnjeuxIrd) {
		if (ListUtil.isNotEmpty(enseignementEnjeuxIrd)) {
			enseignementEnjeuxIrd.forEach(e -> e.setEnseignement(enseignement));
		}
	}

	private void associateEnseignementDisciplineScientifique(Enseignement enseignement,
			List<EnseignementDisciplineScientifique> enseignementDisciplineScientifique) {
		if (ListUtil.isNotEmpty(enseignementDisciplineScientifique)) {
			enseignementDisciplineScientifique.forEach(e -> e.setEnseignement(enseignement));
		}
	}

}
