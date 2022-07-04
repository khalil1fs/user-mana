package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.formulaire.NiveauEtudeEnseignement;
import com.ird.faa.ws.rest.provided.vo.formulaire.NiveauEtudeEnseignementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NiveauEtudeEnseignementAdminService
		extends AbstractService<NiveauEtudeEnseignement, Long, NiveauEtudeEnseignementVo> {

	/**
	 * delete NiveauEtudeEnseignement from database
	 * 
	 * @param id - id of NiveauEtudeEnseignement to be deleted
	 *
	 */
	int deleteById(Long id);

	List<NiveauEtudeEnseignement> findByNiveauEtudeCode(String code);

	int deleteByNiveauEtudeCode(String code);

	List<NiveauEtudeEnseignement> findByNiveauEtudeId(Long id);

	int deleteByNiveauEtudeId(Long id);

	List<NiveauEtudeEnseignement> findByEnseignementId(Long id);

	int deleteByEnseignementId(Long id);

}
