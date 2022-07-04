package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.CategorieSalarie;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.CategorieSalarieVo;

public interface CategorieSalarieAdminService
		extends AbstractService<CategorieSalarie, Long, CategorieSalarieVo> {
	
	CategorieSalarie findByCode(String code);

	CategorieSalarie findByIdOrCode(CategorieSalarie categorieSalarie);

	int deleteById(Long id);

	int deleteByCode(String code);

}
