package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.StatutSalarie;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatutSalarieVo;

public interface StatutSalarieAdminService
		extends AbstractService<StatutSalarie, Long, StatutSalarieVo> {
	
	StatutSalarie findByCode(String code);

	StatutSalarie findByIdOrCode(StatutSalarie statutSalarie);

	int deleteById(Long id);

	int deleteByCode(String code);

}
