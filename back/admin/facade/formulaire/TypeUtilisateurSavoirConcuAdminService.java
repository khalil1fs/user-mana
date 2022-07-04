package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.TypeUtilisateurSavoirConcu;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.TypeUtilisateurSavoirConcuVo;

public interface TypeUtilisateurSavoirConcuAdminService
		extends AbstractService<TypeUtilisateurSavoirConcu, Long, TypeUtilisateurSavoirConcuVo> {

	/**
	 * delete TypeUtilisateurSavoirConcu from database
	 * 
	 * @param id - id of TypeUtilisateurSavoirConcu to be deleted
	 *
	 */
	int deleteById(Long id);

	List<TypeUtilisateurSavoirConcu> findByTypeUtilisateurCode(String code);

	int deleteByTypeUtilisateurCode(String code);

	List<TypeUtilisateurSavoirConcu> findByTypeUtilisateurId(Long id);

	int deleteByTypeUtilisateurId(Long id);

	List<TypeUtilisateurSavoirConcu> findByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

	int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

}
