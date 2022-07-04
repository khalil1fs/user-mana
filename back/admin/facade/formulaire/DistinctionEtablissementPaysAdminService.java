package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DistinctionEtablissementPays;
import com.ird.faa.ws.rest.provided.vo.formulaire.DistinctionEtablissementPaysVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DistinctionEtablissementPaysAdminService
		extends AbstractService<DistinctionEtablissementPays, Long, DistinctionEtablissementPaysVo> {

	/**
	 * delete DistinctionEtablissementPays from database
	 * 
	 * @param id - id of DistinctionEtablissementPays to be deleted
	 *
	 */
	int deleteById(Long id);

	List<DistinctionEtablissementPays> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<DistinctionEtablissementPays> findByPaysId(Long id);

	int deleteByPaysId(Long id);

	List<DistinctionEtablissementPays> findByEtablissementCode(String code);

	int deleteByEtablissementCode(String code);

	List<DistinctionEtablissementPays> findByEtablissementId(Long id);

	int deleteByEtablissementId(Long id);

	List<DistinctionEtablissementPays> findByDistinctionId(Long id);

	int deleteByDistinctionId(Long id);

}
