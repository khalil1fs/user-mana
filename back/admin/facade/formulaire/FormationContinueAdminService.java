package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FormationContinue;
import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FormationContinueAdminService extends AbstractService<FormationContinue, Long, FormationContinueVo> {

	/**
	 * delete FormationContinue from database
	 * 
	 * @param id - id of FormationContinue to be deleted
	 *
	 */
	int deleteById(Long id);

	List<FormationContinue> findByModaliteFormationContinueCode(String code);

	int deleteByModaliteFormationContinueCode(String code);

	List<FormationContinue> findByModaliteFormationContinueId(Long id);

	int deleteByModaliteFormationContinueId(Long id);

	List<FormationContinue> findByEnseignementEtFormationId(Long id);

	int deleteByEnseignementEtFormationId(Long id);

	List<FormationContinue> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<FormationContinue> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

}
