package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.ContratEtConventionIrd;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.ContratEtConventionIrdVo;

public interface ContratEtConventionIrdAdminService
		extends AbstractService<ContratEtConventionIrd, Long, ContratEtConventionIrdVo> {

	/**
	 * delete ContratEtConventionIrd from database
	 * 
	 * @param id - id of ContratEtConventionIrd to be deleted
	 *
	 */
	int deleteById(Long id);

	List<ContratEtConventionIrd> findByStatusContratEtConventionCode(String code);

	int deleteByStatusContratEtConventionCode(String code);

	List<ContratEtConventionIrd> findByStatusContratEtConventionId(Long id);

	int deleteByStatusContratEtConventionId(Long id);

	List<ContratEtConventionIrd> findBySavoirEtInnovationId(Long id);

	int deleteBySavoirEtInnovationId(Long id);

	List<ContratEtConventionIrd> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<ContratEtConventionIrd> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

}
