package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ZoneGeographiqueFormationContinue;
import com.ird.faa.ws.rest.provided.vo.formulaire.ZoneGeographiqueFormationContinueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ZoneGeographiqueFormationContinueAdminService
		extends AbstractService<ZoneGeographiqueFormationContinue, Long, ZoneGeographiqueFormationContinueVo> {

	/**
	 * delete ZoneGeographiqueFormationContinue from database
	 * 
	 * @param id - id of ZoneGeographiqueFormationContinue to be deleted
	 *
	 */
	int deleteById(Long id);

	List<ZoneGeographiqueFormationContinue> findByFormationContinueId(Long id);

	int deleteByFormationContinueId(Long id);

	List<ZoneGeographiqueFormationContinue> findByZoneGeographiqueCode(String code);

	int deleteByZoneGeographiqueCode(String code);

	List<ZoneGeographiqueFormationContinue> findByZoneGeographiqueId(Long id);

	int deleteByZoneGeographiqueId(Long id);

}
