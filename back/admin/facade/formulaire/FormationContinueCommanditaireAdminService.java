package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FormationContinueCommanditaire;
import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueCommanditaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FormationContinueCommanditaireAdminService
		extends AbstractService<FormationContinueCommanditaire, Long, FormationContinueCommanditaireVo> {

	/**
	 * delete FormationContinueCommanditaire from database
	 * 
	 * @param id - id of FormationContinueCommanditaire to be deleted
	 *
	 */
	int deleteById(Long id);

	List<FormationContinueCommanditaire> findByCommanditaireCode(String code);

	int deleteByCommanditaireCode(String code);

	List<FormationContinueCommanditaire> findByCommanditaireId(Long id);

	int deleteByCommanditaireId(Long id);

	List<FormationContinueCommanditaire> findByFormationContinueId(Long id);

	int deleteByFormationContinueId(Long id);

	List<FormationContinueCommanditaire> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<FormationContinueCommanditaire> findByPaysId(Long id);

	int deleteByPaysId(Long id);

}
