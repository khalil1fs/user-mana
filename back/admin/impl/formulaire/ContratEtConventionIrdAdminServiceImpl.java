package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ird.faa.bean.formulaire.ContratEtConventionIrd;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.SavoirEtInnovation;
import com.ird.faa.bean.referentiel.StatusContratEtConvention;
import com.ird.faa.dao.formulaire.ContratEtConventionIrdDao;
import com.ird.faa.service.admin.facade.formulaire.ContratEtConventionIrdAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.SavoirEtInnovationAdminService;
import com.ird.faa.service.admin.facade.referentiel.StatusContratEtConventionAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.ContratEtConventionIrdVo;

@Service
public class ContratEtConventionIrdAdminServiceImpl extends AbstractServiceImpl<ContratEtConventionIrd>
		implements ContratEtConventionIrdAdminService {

	@Autowired
	private ContratEtConventionIrdDao contratEtConventionIrdDao;

	@Autowired
	private SavoirEtInnovationAdminService savoirEtInnovationService;
	@Autowired
	private EtatEtapeCampagneAdminService etatEtapeCampagneService;
	@Autowired
	private StatusContratEtConventionAdminService statusContratEtConventionService;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ContratEtConventionIrd> findAll() {
		return contratEtConventionIrdDao.findAll();
	}

	@Override
	public List<ContratEtConventionIrd> findByStatusContratEtConventionCode(String code) {
		return contratEtConventionIrdDao.findByStatusContratEtConventionCode(code);
	}

	@Override
	@Transactional
	public int deleteByStatusContratEtConventionCode(String code) {
		return contratEtConventionIrdDao.deleteByStatusContratEtConventionCode(code);
	}

	@Override
	public List<ContratEtConventionIrd> findByStatusContratEtConventionId(Long id) {
		return contratEtConventionIrdDao.findByStatusContratEtConventionId(id);
	}

	@Override
	@Transactional
	public int deleteByStatusContratEtConventionId(Long id) {
		return contratEtConventionIrdDao.deleteByStatusContratEtConventionId(id);
	}

	@Override
	public List<ContratEtConventionIrd> findBySavoirEtInnovationId(Long id) {
		return contratEtConventionIrdDao.findBySavoirEtInnovationId(id);
	}

	@Override
	@Transactional
	public int deleteBySavoirEtInnovationId(Long id) {
		return contratEtConventionIrdDao.deleteBySavoirEtInnovationId(id);
	}

	@Override
	public List<ContratEtConventionIrd> findByEtatEtapeCampagneCode(String code) {
		return contratEtConventionIrdDao.findByEtatEtapeCampagneCode(code);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneCode(String code) {
		return contratEtConventionIrdDao.deleteByEtatEtapeCampagneCode(code);
	}

	@Override
	public List<ContratEtConventionIrd> findByEtatEtapeCampagneId(Long id) {
		return contratEtConventionIrdDao.findByEtatEtapeCampagneId(id);
	}

	@Override
	@Transactional
	public int deleteByEtatEtapeCampagneId(Long id) {
		return contratEtConventionIrdDao.deleteByEtatEtapeCampagneId(id);
	}

	@Override
	public ContratEtConventionIrd findById(Long id) {
		if (id == null)
			return null;
		return contratEtConventionIrdDao.getOne(id);
	}

	@Override
	public ContratEtConventionIrd findByIdWithAssociatedList(Long id) {
		ContratEtConventionIrd contratEtConventionIrd = findById(id);
		return contratEtConventionIrd;
	}

	@Transactional
	public int deleteById(Long id) {
		if (contratEtConventionIrdDao.findById(id) == null)
			return 0;
		else {
			contratEtConventionIrdDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public ContratEtConventionIrd update(ContratEtConventionIrd contratEtConventionIrd) {
		ContratEtConventionIrd foundedContratEtConventionIrd = findById(contratEtConventionIrd.getId());
		if (foundedContratEtConventionIrd == null)
			return null;
		else {
			return contratEtConventionIrdDao.save(contratEtConventionIrd);
		}
	}

	@Override
	public ContratEtConventionIrd save(ContratEtConventionIrd contratEtConventionIrd) {

		findStatusContratEtConvention(contratEtConventionIrd);
		findSavoirEtInnovation(contratEtConventionIrd);
		findEtatEtapeCampagne(contratEtConventionIrd);

		ContratEtConventionIrd savedContratEtConventionIrd = contratEtConventionIrdDao.save(contratEtConventionIrd);
		return savedContratEtConventionIrd;
	}

	@Override
	public List<ContratEtConventionIrd> save(List<ContratEtConventionIrd> contratEtConventionIrds) {
		List<ContratEtConventionIrd> list = new ArrayList<ContratEtConventionIrd>();
		for (ContratEtConventionIrd contratEtConventionIrd : contratEtConventionIrds) {
			list.add(save(contratEtConventionIrd));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(ContratEtConventionIrd contratEtConventionIrd) {
		if (contratEtConventionIrd.getId() == null)
			return -1;
		ContratEtConventionIrd foundedContratEtConventionIrd = findById(contratEtConventionIrd.getId());
		if (foundedContratEtConventionIrd == null)
			return -1;
		contratEtConventionIrdDao.delete(foundedContratEtConventionIrd);
		return 1;
	}

	public List<ContratEtConventionIrd> findByCriteria(ContratEtConventionIrdVo contratEtConventionIrdVo) {

		String query = "SELECT o FROM ContratEtConventionIrd o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", contratEtConventionIrdVo.getId());
		query += SearchUtil.addConstraint("o", "numero", "LIKE", contratEtConventionIrdVo.getNumero());
		query += SearchUtil.addConstraintDate("o", "dateCreationContrat", "=", contratEtConventionIrdVo.getDateCreationContrat());
		query += SearchUtil.addConstraint("o", "intitule", "LIKE", contratEtConventionIrdVo.getIntitule());
		query += SearchUtil.addConstraint("o", "description", "LIKE", contratEtConventionIrdVo.getDescription());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateCreationContrat", contratEtConventionIrdVo.getDateCreationContratMin(),
				contratEtConventionIrdVo.getDateCreationContratMax());
		if (contratEtConventionIrdVo.getStatusContratEtConventionVo() != null) {
			query += SearchUtil.addConstraint("o", "statusContratEtConvention.id", "=",
					contratEtConventionIrdVo.getStatusContratEtConventionVo().getId());
			query += SearchUtil.addConstraint("o", "statusContratEtConvention.code", "LIKE",
					contratEtConventionIrdVo.getStatusContratEtConventionVo().getCode());
		}

		if (contratEtConventionIrdVo.getSavoirEtInnovationVo() != null) {
			query += SearchUtil.addConstraint("o", "savoirEtInnovation.id", "=",
					contratEtConventionIrdVo.getSavoirEtInnovationVo().getId());
		}

		if (contratEtConventionIrdVo.getEtatEtapeCampagneVo() != null) {
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.id", "=",
					contratEtConventionIrdVo.getEtatEtapeCampagneVo().getId());
			query += SearchUtil.addConstraint("o", "etatEtapeCampagne.code", "LIKE",
					contratEtConventionIrdVo.getEtatEtapeCampagneVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void findStatusContratEtConvention(ContratEtConventionIrd contratEtConventionIrd) {
		StatusContratEtConvention loadedStatusContratEtConvention = statusContratEtConventionService
				.findByIdOrCode(contratEtConventionIrd.getStatusContratEtConvention());

		if (loadedStatusContratEtConvention == null) {
			return;
		}
		contratEtConventionIrd.setStatusContratEtConvention(loadedStatusContratEtConvention);
	}

	private void findSavoirEtInnovation(ContratEtConventionIrd contratEtConventionIrd) {
		SavoirEtInnovation loadedSavoirEtInnovation = null;
		if (contratEtConventionIrd.getSavoirEtInnovation() != null
				&& contratEtConventionIrd.getSavoirEtInnovation().getId() != null)
			loadedSavoirEtInnovation = savoirEtInnovationService
					.findById(contratEtConventionIrd.getSavoirEtInnovation().getId());

		if (loadedSavoirEtInnovation == null) {
			return;
		}
		contratEtConventionIrd.setSavoirEtInnovation(loadedSavoirEtInnovation);
	}

	private void findEtatEtapeCampagne(ContratEtConventionIrd contratEtConventionIrd) {
		EtatEtapeCampagne loadedEtatEtapeCampagne = etatEtapeCampagneService
				.findByIdOrCode(contratEtConventionIrd.getEtatEtapeCampagne());

		if (loadedEtatEtapeCampagne == null) {
			return;
		}
		contratEtConventionIrd.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
	}

	@Override
	@Transactional
	public void delete(List<ContratEtConventionIrd> contratEtConventionIrds) {
		if (ListUtil.isNotEmpty(contratEtConventionIrds)) {
			contratEtConventionIrds.forEach(e -> contratEtConventionIrdDao.delete(e));
		}
	}

	@Override
	public void update(List<ContratEtConventionIrd> contratEtConventionIrds) {
		if (ListUtil.isNotEmpty(contratEtConventionIrds)) {
			contratEtConventionIrds.forEach(e -> contratEtConventionIrdDao.save(e));
		}
	}

	@Override
	public List<List<ContratEtConventionIrd>> getToBeSavedAndToBeDeleted(List<ContratEtConventionIrd> oldList,
			List<ContratEtConventionIrd> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

}
