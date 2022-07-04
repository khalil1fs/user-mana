package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FormationContinueEtablissement;
import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueEtablissementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FormationContinueEtablissementAdminService
		extends AbstractService<FormationContinueEtablissement, Long, FormationContinueEtablissementVo> {

	/**
	 * delete FormationContinueEtablissement from database
	 * 
	 * @param id - id of FormationContinueEtablissement to be deleted
	 *
	 */
	int deleteById(Long id);

	List<FormationContinueEtablissement> findByEtablissementCode(String code);

	int deleteByEtablissementCode(String code);

	List<FormationContinueEtablissement> findByEtablissementId(Long id);

	int deleteByEtablissementId(Long id);

	List<FormationContinueEtablissement> findByFormationContinueId(Long id);

	int deleteByFormationContinueId(Long id);

	List<FormationContinueEtablissement> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<FormationContinueEtablissement> findByPaysId(Long id);

	int deleteByPaysId(Long id);

}
