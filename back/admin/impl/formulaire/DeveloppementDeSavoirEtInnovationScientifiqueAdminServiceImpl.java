package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueRole;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePays;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.referentiel.RoleDeveloppementDeSavoir;
import com.ird.faa.bean.formulaire.SavoirEtInnovation;
import com.ird.faa.bean.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.TypeUtilisateurSavoirConcu;
import com.ird.faa.dao.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueRoleAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminService;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePaysAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.referentiel.RoleDeveloppementDeSavoirAdminService;
import com.ird.faa.service.admin.facade.formulaire.SavoirEtInnovationAdminService;
import com.ird.faa.service.admin.facade.formulaire.TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.TypeUtilisateurSavoirConcuAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueVo;

@Service
public class DeveloppementDeSavoirEtInnovationScientifiqueAdminServiceImpl
		extends AbstractServiceImpl<DeveloppementDeSavoirEtInnovationScientifique>
		implements DeveloppementDeSavoirEtInnovationScientifiqueAdminService {

	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueDao developpementDeSavoirEtInnovationScientifiqueDao;

	@Autowired
	private SavoirEtInnovationAdminService savoirEtInnovationService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiquePaysAdminService developpementDeSavoirEtInnovationScientifiquePaysService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueRoleAdminService developpementDeSavoirEtInnovationScientifiqueRoleService;
	@Autowired
	private RoleDeveloppementDeSavoirAdminService roleDeveloppementDeSavoirService;
	@Autowired
	private TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminService typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminService developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService;
	@Autowired
	private TypeUtilisateurSavoirConcuAdminService typeUtilisateurSavoirConcuService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminService developpementDeSavoirEtInnovationScientifiqueModeDiffusionService;
	@Autowired
	private DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminService developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findAll() {
		return developpementDeSavoirEtInnovationScientifiqueDao.findAll();
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findByRoleDeveloppementDeSavoirCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueDao.findByRoleDeveloppementDeSavoirCode(code);
	}

	@Override
	@Transactional
	public int deleteByRoleDeveloppementDeSavoirCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueDao.deleteByRoleDeveloppementDeSavoirCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findByRoleDeveloppementDeSavoirId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.findByRoleDeveloppementDeSavoirId(id);
	}

	@Override
	@Transactional
	public int deleteByRoleDeveloppementDeSavoirId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.deleteByRoleDeveloppementDeSavoirId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findBySavoirEtInnovationId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.findBySavoirEtInnovationId(id);
	}

	@Override
	@Transactional
	public int deleteBySavoirEtInnovationId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.deleteBySavoirEtInnovationId(id);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findByEtatEtapeCampagneCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return developpementDeSavoirEtInnovationScientifiqueDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> findByEtatEtapeCampagneId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return developpementDeSavoirEtInnovationScientifiqueDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifique findById(Long id) {
		if (id == null)
			return null;
		return developpementDeSavoirEtInnovationScientifiqueDao.getOne(id);
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifique findByIdWithAssociatedList(Long id) {
		DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique = findById(id);
		findAssociatedLists(developpementDeSavoirEtInnovationScientifique);
		return developpementDeSavoirEtInnovationScientifique;
	}

	private void findAssociatedLists(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		if (developpementDeSavoirEtInnovationScientifique == null
				|| developpementDeSavoirEtInnovationScientifique.getId() == null)
			return;
		else {
			List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique.setTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(
					typeSavoirDeveloppementDeSavoirEtInnovationScientifiques);
			List<TypeUtilisateurSavoirConcu> typeUtilisateurSavoirConcus = typeUtilisateurSavoirConcuService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique.setTypeUtilisateurSavoirConcus(typeUtilisateurSavoirConcus);
			List<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion> developpementDeSavoirEtInnovationScientifiqueModeDiffusions = developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(
							developpementDeSavoirEtInnovationScientifiqueModeDiffusions);
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(
					developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds);
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(
							developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques);
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrds = developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds(
							developpementDeSavoirEtInnovationScientifiqueInstrumentIrds);
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePayss = developpementDeSavoirEtInnovationScientifiquePaysService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifiquePayss(
					developpementDeSavoirEtInnovationScientifiquePayss);
			List<DeveloppementDeSavoirEtInnovationScientifiqueRole> developpementDeSavoirEtInnovationScientifiqueRoles = developpementDeSavoirEtInnovationScientifiqueRoleService
					.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
							developpementDeSavoirEtInnovationScientifique.getId());
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueRoles(
							developpementDeSavoirEtInnovationScientifiqueRoles);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			typeUtilisateurSavoirConcuService.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiquePaysService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
			developpementDeSavoirEtInnovationScientifiqueRoleService
					.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
		}
	}

	private void updateAssociatedLists(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		if (developpementDeSavoirEtInnovationScientifique == null
				|| developpementDeSavoirEtInnovationScientifique.getId() == null)
			return;
		else {
			List<List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique>> resultTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques = typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
					.getToBeSavedAndToBeDeleted(
							typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques());
			typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
					.delete(resultTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.get(1));
			associateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(
					developpementDeSavoirEtInnovationScientifique,
					resultTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.get(0));
			typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
					.update(resultTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.get(0));

			List<List<TypeUtilisateurSavoirConcu>> resultTypeUtilisateurSavoirConcus = typeUtilisateurSavoirConcuService
					.getToBeSavedAndToBeDeleted(
							typeUtilisateurSavoirConcuService.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
									developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique.getTypeUtilisateurSavoirConcus());
			typeUtilisateurSavoirConcuService.delete(resultTypeUtilisateurSavoirConcus.get(1));
			associateTypeUtilisateurSavoirConcu(developpementDeSavoirEtInnovationScientifique,
					resultTypeUtilisateurSavoirConcus.get(0));
			typeUtilisateurSavoirConcuService.update(resultTypeUtilisateurSavoirConcus.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion>> resultDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions = developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions());
			developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(
					developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.get(0));
			developpementDeSavoirEtInnovationScientifiqueModeDiffusionService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd>> resultDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds = developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds());
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(
					developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.get(0));
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique>> resultDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques());
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(
					developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.get(0));
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd>> resultDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds = developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds());
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd(
					developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds.get(0));
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiquePays>> resultDeveloppementDeSavoirEtInnovationScientifiquePayss = developpementDeSavoirEtInnovationScientifiquePaysService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiquePaysService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiquePayss());
			developpementDeSavoirEtInnovationScientifiquePaysService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiquePayss.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiquePays(developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiquePayss.get(0));
			developpementDeSavoirEtInnovationScientifiquePaysService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiquePayss.get(0));

			List<List<DeveloppementDeSavoirEtInnovationScientifiqueRole>> resultDeveloppementDeSavoirEtInnovationScientifiqueRoles = developpementDeSavoirEtInnovationScientifiqueRoleService
					.getToBeSavedAndToBeDeleted(
							developpementDeSavoirEtInnovationScientifiqueRoleService
									.findByDeveloppementDeSavoirEtInnovationScientifiqueId(
											developpementDeSavoirEtInnovationScientifique.getId()),
							developpementDeSavoirEtInnovationScientifique
									.getDeveloppementDeSavoirEtInnovationScientifiqueRoles());
			developpementDeSavoirEtInnovationScientifiqueRoleService
					.delete(resultDeveloppementDeSavoirEtInnovationScientifiqueRoles.get(1));
			associateDeveloppementDeSavoirEtInnovationScientifiqueRole(
					developpementDeSavoirEtInnovationScientifique,
					resultDeveloppementDeSavoirEtInnovationScientifiqueRoles.get(0));
			developpementDeSavoirEtInnovationScientifiqueRoleService
					.update(resultDeveloppementDeSavoirEtInnovationScientifiqueRoles.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (developpementDeSavoirEtInnovationScientifiqueDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			developpementDeSavoirEtInnovationScientifiqueDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifique update(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		DeveloppementDeSavoirEtInnovationScientifique foundedDeveloppementDeSavoirEtInnovationScientifique = findById(
				developpementDeSavoirEtInnovationScientifique.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifique == null)
			return null;
		else {
			updateAssociatedLists(developpementDeSavoirEtInnovationScientifique);
			return developpementDeSavoirEtInnovationScientifiqueDao.save(developpementDeSavoirEtInnovationScientifique);
		}
	}

	@Override
	public DeveloppementDeSavoirEtInnovationScientifique save(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {

		findRoleDeveloppementDeSavoir(developpementDeSavoirEtInnovationScientifique);
		findSavoirEtInnovation(developpementDeSavoirEtInnovationScientifique);
		findEtatEtapeCampagne(developpementDeSavoirEtInnovationScientifique);

		DeveloppementDeSavoirEtInnovationScientifique savedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueDao
				.save(developpementDeSavoirEtInnovationScientifique);
		saveTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(savedDeveloppementDeSavoirEtInnovationScientifique,
				developpementDeSavoirEtInnovationScientifique
						.getTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques());
		saveTypeUtilisateurSavoirConcus(savedDeveloppementDeSavoirEtInnovationScientifique,
				developpementDeSavoirEtInnovationScientifique.getTypeUtilisateurSavoirConcus());
		saveDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(
				savedDeveloppementDeSavoirEtInnovationScientifique, developpementDeSavoirEtInnovationScientifique
						.getDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions());
		saveDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(savedDeveloppementDeSavoirEtInnovationScientifique,
				developpementDeSavoirEtInnovationScientifique
						.getDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds());
		saveDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(
				savedDeveloppementDeSavoirEtInnovationScientifique, developpementDeSavoirEtInnovationScientifique
						.getDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques());
		saveDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds(
				savedDeveloppementDeSavoirEtInnovationScientifique, developpementDeSavoirEtInnovationScientifique
						.getDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds());
		saveDeveloppementDeSavoirEtInnovationScientifiquePayss(savedDeveloppementDeSavoirEtInnovationScientifique,
				developpementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifiquePayss());
		saveDeveloppementDeSavoirEtInnovationScientifiqueRoles(
				savedDeveloppementDeSavoirEtInnovationScientifique, developpementDeSavoirEtInnovationScientifique
						.getDeveloppementDeSavoirEtInnovationScientifiqueRoles());
		return savedDeveloppementDeSavoirEtInnovationScientifique;
	}

	@Override
	public List<DeveloppementDeSavoirEtInnovationScientifique> save(
			List<DeveloppementDeSavoirEtInnovationScientifique> developpementDeSavoirEtInnovationScientifiques) {
		List<DeveloppementDeSavoirEtInnovationScientifique> list = new ArrayList<DeveloppementDeSavoirEtInnovationScientifique>();
		for (DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique : developpementDeSavoirEtInnovationScientifiques) {
			list.add(save(developpementDeSavoirEtInnovationScientifique));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		if (developpementDeSavoirEtInnovationScientifique.getId() == null)
			return -1;
		DeveloppementDeSavoirEtInnovationScientifique foundedDeveloppementDeSavoirEtInnovationScientifique = findById(
				developpementDeSavoirEtInnovationScientifique.getId());
		if (foundedDeveloppementDeSavoirEtInnovationScientifique == null)
			return -1;
		developpementDeSavoirEtInnovationScientifiqueDao.delete(foundedDeveloppementDeSavoirEtInnovationScientifique);
		return 1;
	}

	public List<DeveloppementDeSavoirEtInnovationScientifique> findByCriteria(
			DeveloppementDeSavoirEtInnovationScientifiqueVo developpementDeSavoirEtInnovationScientifiqueVo) {

		String query = "SELECT o FROM DeveloppementDeSavoirEtInnovationScientifique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", developpementDeSavoirEtInnovationScientifiqueVo.getId());
		query += SearchUtil.addConstraint("o", "titreInstrument", "LIKE",
				developpementDeSavoirEtInnovationScientifiqueVo.getTitreInstrument());
		query += SearchUtil.addConstraint("o", "anneeMiseEnOeuvre", "=",
				developpementDeSavoirEtInnovationScientifiqueVo.getAnneeMiseEnOeuvre());
		query += SearchUtil.addConstraint("o", "lienWeb", "LIKE",
				developpementDeSavoirEtInnovationScientifiqueVo.getLienWeb());
		query += SearchUtil.addConstraintMinMax("o", "anneeMiseEnOeuvre",
				developpementDeSavoirEtInnovationScientifiqueVo.getAnneeMiseEnOeuvreMin(),
				developpementDeSavoirEtInnovationScientifiqueVo.getAnneeMiseEnOeuvreMax());
		if (developpementDeSavoirEtInnovationScientifiqueVo.getRoleDeveloppementDeSavoirVo() != null) {
			query += SearchUtil.addConstraint("o", "roleDeveloppementDeSavoir.id", "=",
					developpementDeSavoirEtInnovationScientifiqueVo.getRoleDeveloppementDeSavoirVo().getId());
			query += SearchUtil.addConstraint("o", "roleDeveloppementDeSavoir.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiqueVo.getRoleDeveloppementDeSavoirVo().getCode());
		}

		if (developpementDeSavoirEtInnovationScientifiqueVo.getSavoirEtInnovationVo() != null) {
			query += SearchUtil.addConstraint("o", "savoirEtInnovation.id", "=",
					developpementDeSavoirEtInnovationScientifiqueVo.getSavoirEtInnovationVo().getId());
		}

		if (developpementDeSavoirEtInnovationScientifiqueVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					developpementDeSavoirEtInnovationScientifiqueVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					developpementDeSavoirEtInnovationScientifiqueVo.getEtatEtapeCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifiques) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques())) {
			List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> savedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques = new ArrayList<>();
			typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique.setTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(
					savedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques);
		}
	}

	private void saveTypeUtilisateurSavoirConcus(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<TypeUtilisateurSavoirConcu> typeUtilisateurSavoirConcus) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique.getTypeUtilisateurSavoirConcus())) {
			List<TypeUtilisateurSavoirConcu> savedTypeUtilisateurSavoirConcus = new ArrayList<>();
			typeUtilisateurSavoirConcus.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				typeUtilisateurSavoirConcuService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique
					.setTypeUtilisateurSavoirConcus(savedTypeUtilisateurSavoirConcus);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion> developpementDeSavoirEtInnovationScientifiqueModeDiffusions) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions())) {
			List<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion> savedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiqueModeDiffusions.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(
							savedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds())) {
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> savedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(
					savedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques())) {
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> savedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(
							savedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrds) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds())) {
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> savedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrds.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiqueInstrumentIrdService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds(
							savedDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrds);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiquePayss(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePayss) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiquePayss())) {
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> savedDeveloppementDeSavoirEtInnovationScientifiquePayss = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiquePayss.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiquePaysService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifiquePayss(
					savedDeveloppementDeSavoirEtInnovationScientifiquePayss);
		}
	}

	private void saveDeveloppementDeSavoirEtInnovationScientifiqueRoles(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueRole> developpementDeSavoirEtInnovationScientifiqueRoles) {

		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifique
				.getDeveloppementDeSavoirEtInnovationScientifiqueRoles())) {
			List<DeveloppementDeSavoirEtInnovationScientifiqueRole> savedDeveloppementDeSavoirEtInnovationScientifiqueRoles = new ArrayList<>();
			developpementDeSavoirEtInnovationScientifiqueRoles.forEach(element -> {
				element.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique);
				developpementDeSavoirEtInnovationScientifiqueRoleService.save(element);
			});
			developpementDeSavoirEtInnovationScientifique
					.setDeveloppementDeSavoirEtInnovationScientifiqueRoles(
							savedDeveloppementDeSavoirEtInnovationScientifiqueRoles);
		}
	}

	private void findRoleDeveloppementDeSavoir(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		RoleDeveloppementDeSavoir loadedRoleDeveloppementDeSavoir = roleDeveloppementDeSavoirService
				.findByIdOrCode(developpementDeSavoirEtInnovationScientifique.getRoleDeveloppementDeSavoir());

		if (loadedRoleDeveloppementDeSavoir == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifique.setRoleDeveloppementDeSavoir(loadedRoleDeveloppementDeSavoir);
	}

	private void findSavoirEtInnovation(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		SavoirEtInnovation loadedSavoirEtInnovation = null;
		if (developpementDeSavoirEtInnovationScientifique.getSavoirEtInnovation() != null
				&& developpementDeSavoirEtInnovationScientifique.getSavoirEtInnovation().getId() != null)
			loadedSavoirEtInnovation = savoirEtInnovationService
					.findById(developpementDeSavoirEtInnovationScientifique.getSavoirEtInnovation().getId());

		if (loadedSavoirEtInnovation == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifique.setSavoirEtInnovation(loadedSavoirEtInnovation);
	}

	private void findEtatEtapeCampagne(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(developpementDeSavoirEtInnovationScientifique.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		developpementDeSavoirEtInnovationScientifique.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	@Override
	@Transactional
	public void delete(
			List<DeveloppementDeSavoirEtInnovationScientifique> developpementDeSavoirEtInnovationScientifiques) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiques)) {
			developpementDeSavoirEtInnovationScientifiques
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueDao.delete(e));
		}
	}

	@Override
	public void update(
			List<DeveloppementDeSavoirEtInnovationScientifique> developpementDeSavoirEtInnovationScientifiques) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiques)) {
			developpementDeSavoirEtInnovationScientifiques
					.forEach(e -> developpementDeSavoirEtInnovationScientifiqueDao.save(e));
		}
	}

	private void associateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<TypeSavoirDeveloppementDeSavoirEtInnovationScientifique> typeSavoirDeveloppementDeSavoirEtInnovationScientifique) {
		if (ListUtil.isNotEmpty(typeSavoirDeveloppementDeSavoirEtInnovationScientifique)) {
			typeSavoirDeveloppementDeSavoirEtInnovationScientifique.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateTypeUtilisateurSavoirConcu(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<TypeUtilisateurSavoirConcu> typeUtilisateurSavoirConcu) {
		if (ListUtil.isNotEmpty(typeUtilisateurSavoirConcu)) {
			typeUtilisateurSavoirConcu.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion> developpementDeSavoirEtInnovationScientifiqueModeDiffusion) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueModeDiffusion)) {
			developpementDeSavoirEtInnovationScientifiqueModeDiffusion.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd> developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd)) {
			developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique> developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique)) {
			developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> developpementDeSavoirEtInnovationScientifiqueInstrumentIrd) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueInstrumentIrd)) {
			developpementDeSavoirEtInnovationScientifiqueInstrumentIrd.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiquePays(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiquePays> developpementDeSavoirEtInnovationScientifiquePays) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiquePays)) {
			developpementDeSavoirEtInnovationScientifiquePays.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	private void associateDeveloppementDeSavoirEtInnovationScientifiqueRole(
			DeveloppementDeSavoirEtInnovationScientifique developpementDeSavoirEtInnovationScientifique,
			List<DeveloppementDeSavoirEtInnovationScientifiqueRole> developpementDeSavoirEtInnovationScientifiqueRole) {
		if (ListUtil.isNotEmpty(developpementDeSavoirEtInnovationScientifiqueRole)) {
			developpementDeSavoirEtInnovationScientifiqueRole.forEach(e -> e
					.setDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique));
		}
	}

	@Override
	public List<List<DeveloppementDeSavoirEtInnovationScientifique>> getToBeSavedAndToBeDeleted(
			List<DeveloppementDeSavoirEtInnovationScientifique> oldList,
			List<DeveloppementDeSavoirEtInnovationScientifique> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
