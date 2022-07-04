package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EvenementColloqueScienntifique;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScienntifiqueVo;

public interface EvenementColloqueScienntifiqueAdminService
		extends AbstractService<EvenementColloqueScienntifique, Long, EvenementColloqueScienntifiqueVo> {

	/**
	 * delete EvenementColloqueScienntifique from database
	 * 
	 * @param id - id of EvenementColloqueScienntifique to be deleted
	 *
	 */
	int deleteById(Long id);

	List<EvenementColloqueScienntifique> findByModaliteCode(String code);

	int deleteByModaliteCode(String code);

	List<EvenementColloqueScienntifique> findByModaliteId(Long id);

	int deleteByModaliteId(Long id);

	List<EvenementColloqueScienntifique> findByModaliteInterventionCode(String code);

	int deleteByModaliteInterventionCode(String code);

	List<EvenementColloqueScienntifique> findByModaliteInterventionId(Long id);

	int deleteByModaliteInterventionId(Long id);

	List<EvenementColloqueScienntifique> findBySavoirEtInnovationId(Long id);

	int deleteBySavoirEtInnovationId(Long id);

	List<EvenementColloqueScienntifique> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<EvenementColloqueScienntifique> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

}
