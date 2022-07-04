package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementPays;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementPaysVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementPaysAdminService extends AbstractService<EnseignementPays, Long, EnseignementPaysVo> {

	/**
	 * delete EnseignementPays from database
	 * 
	 * @param id - id of EnseignementPays to be deleted
	 *
	 */
	int deleteById(Long id);

	List<EnseignementPays> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<EnseignementPays> findByPaysId(Long id);

	int deleteByPaysId(Long id);

	List<EnseignementPays> findByEnseignementId(Long id);

	int deleteByEnseignementId(Long id);

}
