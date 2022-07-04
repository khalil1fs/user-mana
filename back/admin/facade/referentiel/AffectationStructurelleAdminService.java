package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.AffectationStructurelle;
import com.ird.faa.ws.rest.provided.vo.referentiel.AffectationStructurelleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface AffectationStructurelleAdminService
		extends AbstractService<AffectationStructurelle, Long, AffectationStructurelleVo> {

	/**
	 * find AffectationStructurelle from database by code (reference)
	 * 
	 * @param code - reference of AffectationStructurelle
	 * @return the founded AffectationStructurelle , If no AffectationStructurelle
	 *         were found in database return null.
	 */
	AffectationStructurelle findByCode(String code);

	/**
	 * find AffectationStructurelle from database by id (PK) or code (reference)
	 * 
	 * @param affectationStructurelle   - id of AffectationStructurelle
	 * @return the founded AffectationStructurelle , If no AffectationStructurelle
	 *         were found in database return null.
	 */
	AffectationStructurelle findByIdOrCode(AffectationStructurelle affectationStructurelle);

	/**
	 * delete AffectationStructurelle from database
	 * 
	 * @param id - id of AffectationStructurelle to be deleted
	 *
	 */
	int deleteById(Long id);

	/**
	 * delete AffectationStructurelle from database by code (reference)
	 *
	 * @param code - reference of AffectationStructurelle to be deleted
	 * @return 1 if AffectationStructurelle deleted successfully
	 */
	int deleteByCode(String code);

}
