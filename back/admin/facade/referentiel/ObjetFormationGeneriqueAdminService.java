package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.ObjetFormationGenerique;
import com.ird.faa.ws.rest.provided.vo.referentiel.ObjetFormationGeneriqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ObjetFormationGeneriqueAdminService
		extends AbstractService<ObjetFormationGenerique, Long, ObjetFormationGeneriqueVo> {

	/**
	 * find ObjetFormationGenerique from database by code (reference)
	 * 
	 * @param code - reference of ObjetFormationGenerique
	 * @return the founded ObjetFormationGenerique , If no ObjetFormationGenerique
	 *         were found in database return null.
	 */
	ObjetFormationGenerique findByCode(String code);

	/**
	 * find ObjetFormationGenerique from database by id (PK) or code (reference)
	 * 
	 * @param id   - id of ObjetFormationGenerique
	 * @param code - reference of ObjetFormationGenerique
	 * @return the founded ObjetFormationGenerique , If no ObjetFormationGenerique
	 *         were found in database return null.
	 */
	ObjetFormationGenerique findByIdOrCode(ObjetFormationGenerique objetFormationGenerique);

	/**
	 * delete ObjetFormationGenerique from database
	 * 
	 * @param id - id of ObjetFormationGenerique to be deleted
	 *
	 */
	int deleteById(Long id);

	/**
	 * delete ObjetFormationGenerique from database by code (reference)
	 *
	 * @param code - reference of ObjetFormationGenerique to be deleted
	 * @return 1 if ObjetFormationGenerique deleted successfully
	 */
	int deleteByCode(String code);

	ObjetFormationGenerique archiver(ObjetFormationGenerique objetFormationGenerique);

	ObjetFormationGenerique desarchiver(ObjetFormationGenerique objetFormationGenerique);

}
