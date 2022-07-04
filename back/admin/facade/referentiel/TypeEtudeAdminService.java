package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeEtude;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeEtudeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeEtudeAdminService extends AbstractService<TypeEtude, Long, TypeEtudeVo> {

	/**
	 * find TypeEtude from database by code (reference)
	 * 
	 * @param code - reference of TypeEtude
	 * @return the founded TypeEtude , If no TypeEtude were found in database return
	 *         null.
	 */
	TypeEtude findByCode(String code);

	/**
	 * find TypeEtude from database by id (PK) or code (reference)
	 * 
	 * @param id   - id of TypeEtude
	 * @param code - reference of TypeEtude
	 * @return the founded TypeEtude , If no TypeEtude were found in database return
	 *         null.
	 */
	TypeEtude findByIdOrCode(TypeEtude typeEtude);

	/**
	 * delete TypeEtude from database
	 * 
	 * @param id - id of TypeEtude to be deleted
	 *
	 */
	int deleteById(Long id);

	/**
	 * delete TypeEtude from database by code (reference)
	 *
	 * @param code - reference of TypeEtude to be deleted
	 * @return 1 if TypeEtude deleted successfully
	 */
	int deleteByCode(String code);

	TypeEtude archiver(TypeEtude typeEtude);

	TypeEtude desarchiver(TypeEtude typeEtude);

}
