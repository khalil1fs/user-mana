package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.Commanditaire;
import com.ird.faa.ws.rest.provided.vo.referentiel.CommanditaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommanditaireAdminService extends AbstractService<Commanditaire, Long, CommanditaireVo> {

	/**
	 * find Commanditaire from database by code (reference)
	 * 
	 * @param code - reference of Commanditaire
	 * @return the founded Commanditaire , If no Commanditaire were found in
	 *         database return null.
	 */
	Commanditaire findByCode(String code);

	/**
	 * find Commanditaire from database by id (PK) or code (reference)
	 * 
	 * @param id   - id of Commanditaire
	 * @param code - reference of Commanditaire
	 * @return the founded Commanditaire , If no Commanditaire were found in
	 *         database return null.
	 */
	Commanditaire findByIdOrCode(Commanditaire commanditaire);

	/**
	 * delete Commanditaire from database
	 * 
	 * @param id - id of Commanditaire to be deleted
	 *
	 */
	int deleteById(Long id);

	List<Commanditaire> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<Commanditaire> findByPaysId(Long id);

	int deleteByPaysId(Long id);

	/**
	 * delete Commanditaire from database by code (reference)
	 *
	 * @param code - reference of Commanditaire to be deleted
	 * @return 1 if Commanditaire deleted successfully
	 */
	int deleteByCode(String code);

	Commanditaire archiver(Commanditaire commanditaire);

	Commanditaire desarchiver(Commanditaire commanditaire);

}
