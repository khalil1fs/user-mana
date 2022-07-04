package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.RoleDeveloppementDeSavoir;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.RoleDeveloppementDeSavoirVo;

public interface RoleDeveloppementDeSavoirAdminService
		extends AbstractService<RoleDeveloppementDeSavoir, Long, RoleDeveloppementDeSavoirVo> {

	/**
	 * find RoleDeveloppementDeSavoir from database by code (reference)
	 * 
	 * @param code - reference of RoleDeveloppementDeSavoir
	 * @return the founded RoleDeveloppementDeSavoir , If no
	 *         RoleDeveloppementDeSavoir were found in database return null.
	 */
	RoleDeveloppementDeSavoir findByCode(String code);

	/**
	 * find RoleDeveloppementDeSavoir from database by id (PK) or code (reference)
	 * 
	 * @param id   - id of RoleDeveloppementDeSavoir
	 * @param code - reference of RoleDeveloppementDeSavoir
	 * @return the founded RoleDeveloppementDeSavoir , If no
	 *         RoleDeveloppementDeSavoir were found in database return null.
	 */
	RoleDeveloppementDeSavoir findByIdOrCode(RoleDeveloppementDeSavoir roleDeveloppementDeSavoir);

	/**
	 * delete RoleDeveloppementDeSavoir from database
	 * 
	 * @param id - id of RoleDeveloppementDeSavoir to be deleted
	 *
	 */
	int deleteById(Long id);

	/**
	 * delete RoleDeveloppementDeSavoir from database by code (reference)
	 *
	 * @param code - reference of RoleDeveloppementDeSavoir to be deleted
	 * @return 1 if RoleDeveloppementDeSavoir deleted successfully
	 */
	int deleteByCode(String code);

}
