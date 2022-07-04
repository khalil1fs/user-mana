package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.PositionStatutaire;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.PositionStatutaireVo;

public interface PositionStatutaireAdminService
		extends AbstractService<PositionStatutaire, Long, PositionStatutaireVo> {
	
	PositionStatutaire findByCode(String code);

	PositionStatutaire findByIdOrCode(PositionStatutaire positionStatutaire);

	int deleteById(Long id);

	int deleteByCode(String code);

}
