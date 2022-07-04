package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.bean.referentiel.NiveauResponsabilitePedagogique;
import com.ird.faa.bean.referentiel.StatusCursus;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.EnseignementEtFormation;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEnjeuxIrd;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEtablissement;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiquePays;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiqueDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnseignementEtFormationAdminService;
import com.ird.faa.service.admin.facade.referentiel.StatusCursusAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.referentiel.NiveauResponsabilitePedagogiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueEtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiquePaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiqueAdminServiceImpl extends AbstractServiceImpl<ResponsabilitePedagogique>
		implements ResponsabilitePedagogiqueAdminService {

	@Autowired
	private ResponsabilitePedagogiqueDao responsabilitePedagogiqueDao;

	@Autowired
	private EnseignementEtFormationAdminService enseignementEtFormationService;
	@Autowired
	private StatusCursusAdminService statusCursusService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private NiveauResponsabilitePedagogiqueAdminService niveauResponsabilitePedagogiqueService;
	@Autowired
	private ResponsabilitePedagogiqueEtablissementAdminService responsabilitePedagogiqueEtablissementService;
	@Autowired
	private ResponsabilitePedagogiqueEnjeuxIrdAdminService responsabilitePedagogiqueEnjeuxIrdService;
	@Autowired
	private ResponsabilitePedagogiquePaysAdminService responsabilitePedagogiquePaysService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ResponsabilitePedagogique> findAll() {
		return responsabilitePedagogiqueDao.findAll();
	}

	@Override
	public List<ResponsabilitePedagogique> findByNiveauResponsabilitePedagogiqueCode(String code) {
		return responsabilitePedagogiqueDao.findByNiveauResponsabilitePedagogiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByNiveauResponsabilitePedagogiqueCode(String code) {
		return responsabilitePedagogiqueDao.deleteByNiveauResponsabilitePedagogiqueCode(code);
	}

	@Override
	public List<ResponsabilitePedagogique> findByNiveauResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueDao.findByNiveauResponsabilitePedagogiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByNiveauResponsabilitePedagogiqueId(Long id) {
		return responsabilitePedagogiqueDao.deleteByNiveauResponsabilitePedagogiqueId(id);
	}

	@Override
	public List<ResponsabilitePedagogique> findByStatusCursusCode(String code) {
		return responsabilitePedagogiqueDao.findByStatusCursusCode(code);
	}

	@Override
	@Transactional
	public int deleteByStatusCursusCode(String code) {
		return responsabilitePedagogiqueDao.deleteByStatusCursusCode(code);
	}

	@Override
	public List<ResponsabilitePedagogique> findByStatusCursusId(Long id) {
		return responsabilitePedagogiqueDao.findByStatusCursusId(id);
	}

	@Override
	@Transactional
	public int deleteByStatusCursusId(Long id) {
		return responsabilitePedagogiqueDao.deleteByStatusCursusId(id);
	}

	@Override
	public List<ResponsabilitePedagogique> findByEtatEtapeCampagneCode(String code) {
		return responsabilitePedagogiqueDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return responsabilitePedagogiqueDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<ResponsabilitePedagogique> findByEtatEtapeCampagneId(Long id) {
		return responsabilitePedagogiqueDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return responsabilitePedagogiqueDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public List<ResponsabilitePedagogique> findByEnseignementEtFormationId(Long id) {
		return responsabilitePedagogiqueDao.findByEnseignementEtFormationId(id);
	}

	@Override
	@Transactional
	public int deleteByEnseignementEtFormationId(Long id) {
		return responsabilitePedagogiqueDao.deleteByEnseignementEtFormationId(id);
	}

	@Override
	public ResponsabilitePedagogique findById(Long id) {
		if (id == null)
			return null;
		return responsabilitePedagogiqueDao.getOne(id);
	}

	@Override
	public ResponsabilitePedagogique findByIdWithAssociatedList(Long id) {
		ResponsabilitePedagogique responsabilitePedagogique = findById(id);
		findAssociatedLists(responsabilitePedagogique);
		return responsabilitePedagogique;
	}

	private void findAssociatedLists(ResponsabilitePedagogique responsabilitePedagogique) {
		if (responsabilitePedagogique != null && responsabilitePedagogique.getId() != null) {
			List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds = responsabilitePedagogiqueEnjeuxIrdService
					.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId());
			responsabilitePedagogique.setResponsabilitePedagogiqueEnjeuxIrds(responsabilitePedagogiqueEnjeuxIrds);
			List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements = responsabilitePedagogiqueEtablissementService
					.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId());
			responsabilitePedagogique
					.setResponsabilitePedagogiqueEtablissements(responsabilitePedagogiqueEtablissements);
			List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss = responsabilitePedagogiquePaysService
					.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId());
			responsabilitePedagogique.setResponsabilitePedagogiquePayss(responsabilitePedagogiquePayss);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id != null) {
			responsabilitePedagogiqueEnjeuxIrdService.deleteByResponsabilitePedagogiqueId(id);
			responsabilitePedagogiqueEtablissementService.deleteByResponsabilitePedagogiqueId(id);
			responsabilitePedagogiquePaysService.deleteByResponsabilitePedagogiqueId(id);
		}
	}

	private void updateAssociatedLists(ResponsabilitePedagogique responsabilitePedagogique) {
		if (responsabilitePedagogique != null && responsabilitePedagogique.getId() != null) {
			List<List<ResponsabilitePedagogiqueEnjeuxIrd>> resultResponsabilitePedagogiqueEnjeuxIrds = responsabilitePedagogiqueEnjeuxIrdService
					.getToBeSavedAndToBeDeleted(
							responsabilitePedagogiqueEnjeuxIrdService
									.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId()),
							responsabilitePedagogique.getResponsabilitePedagogiqueEnjeuxIrds());
			responsabilitePedagogiqueEnjeuxIrdService.delete(resultResponsabilitePedagogiqueEnjeuxIrds.get(1));
			associateResponsabilitePedagogiqueEnjeuxIrd(responsabilitePedagogique,
					resultResponsabilitePedagogiqueEnjeuxIrds.get(0));
			responsabilitePedagogiqueEnjeuxIrdService.update(resultResponsabilitePedagogiqueEnjeuxIrds.get(0));

			List<List<ResponsabilitePedagogiqueEtablissement>> resultResponsabilitePedagogiqueEtablissements = responsabilitePedagogiqueEtablissementService
					.getToBeSavedAndToBeDeleted(
							responsabilitePedagogiqueEtablissementService
									.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId()),
							responsabilitePedagogique.getResponsabilitePedagogiqueEtablissements());
			responsabilitePedagogiqueEtablissementService.delete(resultResponsabilitePedagogiqueEtablissements.get(1));
			associateResponsabilitePedagogiqueEtablissement(responsabilitePedagogique,
					resultResponsabilitePedagogiqueEtablissements.get(0));
			responsabilitePedagogiqueEtablissementService.update(resultResponsabilitePedagogiqueEtablissements.get(0));

			List<List<ResponsabilitePedagogiquePays>> resultResponsabilitePedagogiquePayss = responsabilitePedagogiquePaysService
					.getToBeSavedAndToBeDeleted(
							responsabilitePedagogiquePaysService
									.findByResponsabilitePedagogiqueId(responsabilitePedagogique.getId()),
							responsabilitePedagogique.getResponsabilitePedagogiquePayss());
			responsabilitePedagogiquePaysService.delete(resultResponsabilitePedagogiquePayss.get(1));
			associateResponsabilitePedagogiquePays(responsabilitePedagogique,
					resultResponsabilitePedagogiquePayss.get(0));
			responsabilitePedagogiquePaysService.update(resultResponsabilitePedagogiquePayss.get(0));

		}
	}

	@Transactional
	public int deleteById(Long id) {
		int res = 0;
		if (responsabilitePedagogiqueDao.findById(id).isPresent()) {
			deleteAssociatedLists(id);
			responsabilitePedagogiqueDao.deleteById(id);
			res = 1;
		}
		return res;
	}

	@Override
	public ResponsabilitePedagogique update(ResponsabilitePedagogique responsabilitePedagogique) {
		ResponsabilitePedagogique foundedResponsabilitePedagogique = findById(responsabilitePedagogique.getId());
		if (foundedResponsabilitePedagogique == null)
			return null;
		else {
			updateAssociatedLists(responsabilitePedagogique);
			return responsabilitePedagogiqueDao.save(responsabilitePedagogique);
		}
	}

	private void prepareSave(ResponsabilitePedagogique responsabilitePedagogique) {
		if (responsabilitePedagogique.getServiceRenforcementCapacite() == null)
			responsabilitePedagogique.setServiceRenforcementCapacite(false);
		if (responsabilitePedagogique.getCursusConstruitAvecEtablissements() == null)
			responsabilitePedagogique.setCursusConstruitAvecEtablissements(false);

	}

	@Override
	public ResponsabilitePedagogique save(ResponsabilitePedagogique responsabilitePedagogique) {
		prepareSave(responsabilitePedagogique);

		ResponsabilitePedagogique result = null;

		findNiveauResponsabilitePedagogique(responsabilitePedagogique);
		findStatusCursus(responsabilitePedagogique);
		findEtatEtapeCampagne(responsabilitePedagogique);
		findEnseignementEtFormation(responsabilitePedagogique);

		ResponsabilitePedagogique savedResponsabilitePedagogique = responsabilitePedagogiqueDao
				.save(responsabilitePedagogique);

		saveResponsabilitePedagogiqueEnjeuxIrds(savedResponsabilitePedagogique,
				responsabilitePedagogique.getResponsabilitePedagogiqueEnjeuxIrds());
		saveResponsabilitePedagogiqueEtablissements(savedResponsabilitePedagogique,
				responsabilitePedagogique.getResponsabilitePedagogiqueEtablissements());
		saveResponsabilitePedagogiquePayss(savedResponsabilitePedagogique,
				responsabilitePedagogique.getResponsabilitePedagogiquePayss());
		result = savedResponsabilitePedagogique;

		return result;
	}

	@Override
	public List<ResponsabilitePedagogique> save(List<ResponsabilitePedagogique> responsabilitePedagogiques) {
		List<ResponsabilitePedagogique> list = new ArrayList<>();
		for (ResponsabilitePedagogique responsabilitePedagogique : responsabilitePedagogiques) {
			list.add(save(responsabilitePedagogique));
		}
		return list;
	}

	private List<ResponsabilitePedagogiqueEnjeuxIrd> prepareResponsabilitePedagogiqueEnjeuxIrds(
			ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds) {
		for (ResponsabilitePedagogiqueEnjeuxIrd responsabilitePedagogiqueEnjeuxIrd : responsabilitePedagogiqueEnjeuxIrds) {
			responsabilitePedagogiqueEnjeuxIrd.setResponsabilitePedagogique(responsabilitePedagogique);
		}
		return responsabilitePedagogiqueEnjeuxIrds;
	}

	private List<ResponsabilitePedagogiqueEtablissement> prepareResponsabilitePedagogiqueEtablissements(
			ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements) {
		for (ResponsabilitePedagogiqueEtablissement responsabilitePedagogiqueEtablissement : responsabilitePedagogiqueEtablissements) {
			responsabilitePedagogiqueEtablissement.setResponsabilitePedagogique(responsabilitePedagogique);
		}
		return responsabilitePedagogiqueEtablissements;
	}

	private List<ResponsabilitePedagogiquePays> prepareResponsabilitePedagogiquePayss(
			ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss) {
		for (ResponsabilitePedagogiquePays responsabilitePedagogiquePays : responsabilitePedagogiquePayss) {
			responsabilitePedagogiquePays.setResponsabilitePedagogique(responsabilitePedagogique);
		}
		return responsabilitePedagogiquePayss;
	}

	@Override
	@Transactional
	public int delete(ResponsabilitePedagogique responsabilitePedagogique) {
		if (responsabilitePedagogique.getId() == null)
			return -1;
		ResponsabilitePedagogique foundedResponsabilitePedagogique = findById(responsabilitePedagogique.getId());
		if (foundedResponsabilitePedagogique == null)
			return -1;
		responsabilitePedagogiqueDao.delete(foundedResponsabilitePedagogique);
		return 1;
	}

	public List<ResponsabilitePedagogique> findByCriteria(ResponsabilitePedagogiqueVo responsabilitePedagogiqueVo) {

		String query = "SELECT o FROM ResponsabilitePedagogique o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", responsabilitePedagogiqueVo.getId());
		query += SearchUtil.addConstraint("o", "intituleCursus", "LIKE",
				responsabilitePedagogiqueVo.getIntituleCursus());
		query += SearchUtil.addConstraint("o", "serviceRenforcementCapacite", "=",
				responsabilitePedagogiqueVo.getServiceRenforcementCapacite());
		query += SearchUtil.addConstraint("o", "cursusConstruitAvecEtablissements", "=",
				responsabilitePedagogiqueVo.getCursusConstruitAvecEtablissements());
		if (responsabilitePedagogiqueVo.getNiveauResponsabilitePedagogiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "niveauResponsabilitePedagogique.id", "=",
					responsabilitePedagogiqueVo.getNiveauResponsabilitePedagogiqueVo().getId());
			query += SearchUtil.addConstraint("o", "niveauResponsabilitePedagogique.code", "LIKE",
					responsabilitePedagogiqueVo.getNiveauResponsabilitePedagogiqueVo().getCode());
		}

		if (responsabilitePedagogiqueVo.getStatusCursusVo() != null) {
			query += SearchUtil.addConstraint("o", "statusCursus.id", "=",
					responsabilitePedagogiqueVo.getStatusCursusVo().getId());
			query += SearchUtil.addConstraint("o", "statusCursus.code", "LIKE",
					responsabilitePedagogiqueVo.getStatusCursusVo().getCode());
		}

		if (responsabilitePedagogiqueVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					responsabilitePedagogiqueVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					responsabilitePedagogiqueVo.getEtatEtapeCampagneVo().getCode());
		}

		if (responsabilitePedagogiqueVo.getEnseignementEtFormationVo() != null) {
			query += SearchUtil.addConstraint("o", "enseignementEtFormation.id", "=",
					responsabilitePedagogiqueVo.getEnseignementEtFormationVo().getId());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveResponsabilitePedagogiqueEnjeuxIrds(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrds) {

		if (ListUtil.isNotEmpty(responsabilitePedagogique.getResponsabilitePedagogiqueEnjeuxIrds())) {
			List<ResponsabilitePedagogiqueEnjeuxIrd> savedResponsabilitePedagogiqueEnjeuxIrds = new ArrayList<>();
			responsabilitePedagogiqueEnjeuxIrds.forEach(element -> {
				element.setResponsabilitePedagogique(responsabilitePedagogique);
				responsabilitePedagogiqueEnjeuxIrdService.save(element);
			});
			responsabilitePedagogique.setResponsabilitePedagogiqueEnjeuxIrds(savedResponsabilitePedagogiqueEnjeuxIrds);
		}
	}

	private void saveResponsabilitePedagogiqueEtablissements(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissements) {

		if (ListUtil.isNotEmpty(responsabilitePedagogique.getResponsabilitePedagogiqueEtablissements())) {
			List<ResponsabilitePedagogiqueEtablissement> savedResponsabilitePedagogiqueEtablissements = new ArrayList<>();
			responsabilitePedagogiqueEtablissements.forEach(element -> {
				element.setResponsabilitePedagogique(responsabilitePedagogique);
				responsabilitePedagogiqueEtablissementService.save(element);
			});
			responsabilitePedagogique
					.setResponsabilitePedagogiqueEtablissements(savedResponsabilitePedagogiqueEtablissements);
		}
	}

	private void saveResponsabilitePedagogiquePayss(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePayss) {

		if (ListUtil.isNotEmpty(responsabilitePedagogique.getResponsabilitePedagogiquePayss())) {
			List<ResponsabilitePedagogiquePays> savedResponsabilitePedagogiquePayss = new ArrayList<>();
			responsabilitePedagogiquePayss.forEach(element -> {
				element.setResponsabilitePedagogique(responsabilitePedagogique);
				responsabilitePedagogiquePaysService.save(element);
			});
			responsabilitePedagogique.setResponsabilitePedagogiquePayss(savedResponsabilitePedagogiquePayss);
		}
	}

	private void findNiveauResponsabilitePedagogique(ResponsabilitePedagogique responsabilitePedagogique) {
		NiveauResponsabilitePedagogique loadedNiveauResponsabilitePedagogique = niveauResponsabilitePedagogiqueService
				.findByIdOrCode(responsabilitePedagogique.getNiveauResponsabilitePedagogique());

		if (loadedNiveauResponsabilitePedagogique == null) {
			return;
		}
		responsabilitePedagogique.setNiveauResponsabilitePedagogique(loadedNiveauResponsabilitePedagogique);
	}

	private void findStatusCursus(ResponsabilitePedagogique responsabilitePedagogique) {
		StatusCursus loadedStatusCursus = statusCursusService
				.findByIdOrCode(responsabilitePedagogique.getStatusCursus());

		if (loadedStatusCursus == null) {
			return;
		}
		responsabilitePedagogique.setStatusCursus(loadedStatusCursus);
	}

	private void findEtatEtapeCampagne(ResponsabilitePedagogique responsabilitePedagogique) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(responsabilitePedagogique.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		responsabilitePedagogique.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	private void findEnseignementEtFormation(ResponsabilitePedagogique responsabilitePedagogique) {
		EnseignementEtFormation loadedEnseignementEtFormation = null;
		if (responsabilitePedagogique.getEnseignementEtFormation() != null
				&& responsabilitePedagogique.getEnseignementEtFormation().getId() != null)
			loadedEnseignementEtFormation = enseignementEtFormationService
					.findById(responsabilitePedagogique.getEnseignementEtFormation().getId());

		if (loadedEnseignementEtFormation == null) {
			return;
		}
		responsabilitePedagogique.setEnseignementEtFormation(loadedEnseignementEtFormation);
	}

	@Override
	@Transactional
	public void delete(List<ResponsabilitePedagogique> responsabilitePedagogiques) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiques)) {
			responsabilitePedagogiques.forEach(e -> responsabilitePedagogiqueDao.delete(e));
		}
	}

	@Override
	public void update(List<ResponsabilitePedagogique> responsabilitePedagogiques) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiques)) {
			responsabilitePedagogiques.forEach(e -> responsabilitePedagogiqueDao.save(e));
		}
	}

	private void associateResponsabilitePedagogiqueEnjeuxIrd(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEnjeuxIrd> responsabilitePedagogiqueEnjeuxIrd) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEnjeuxIrd)) {
			responsabilitePedagogiqueEnjeuxIrd.forEach(e -> e.setResponsabilitePedagogique(responsabilitePedagogique));
		}
	}

	private void associateResponsabilitePedagogiqueEtablissement(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiqueEtablissement> responsabilitePedagogiqueEtablissement) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiqueEtablissement)) {
			responsabilitePedagogiqueEtablissement
					.forEach(e -> e.setResponsabilitePedagogique(responsabilitePedagogique));
		}
	}

	private void associateResponsabilitePedagogiquePays(ResponsabilitePedagogique responsabilitePedagogique,
			List<ResponsabilitePedagogiquePays> responsabilitePedagogiquePays) {
		if (ListUtil.isNotEmpty(responsabilitePedagogiquePays)) {
			responsabilitePedagogiquePays.forEach(e -> e.setResponsabilitePedagogique(responsabilitePedagogique));
		}
	}

}
