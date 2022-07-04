package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.TypeEtudeEnseignement;
import com.ird.faa.ws.rest.provided.vo.formulaire.TypeEtudeEnseignementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeEtudeEnseignementAdminService
		extends AbstractService<TypeEtudeEnseignement, Long, TypeEtudeEnseignementVo> {

	/**
	 * delete TypeEtudeEnseignement from database
	 * 
	 * @param id - id of TypeEtudeEnseignement to be deleted
	 *
	 */
	int deleteById(Long id);

	List<TypeEtudeEnseignement> findByEnseignementId(Long id);

	int deleteByEnseignementId(Long id);

	List<TypeEtudeEnseignement> findByTypeEtudeCode(String code);

	int deleteByTypeEtudeCode(String code);

	List<TypeEtudeEnseignement> findByTypeEtudeId(Long id);

	int deleteByTypeEtudeId(Long id);

}
