package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementDisciplineScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementDisciplineScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementDisciplineScientifiqueAdminService
		extends AbstractService<EnseignementDisciplineScientifique, Long, EnseignementDisciplineScientifiqueVo> {

	/**
	 * delete EnseignementDisciplineScientifique from database
	 * 
	 * @param id - id of EnseignementDisciplineScientifique to be deleted
	 *
	 */
	int deleteById(Long id);

	List<EnseignementDisciplineScientifique> findByDisciplineScientifiqueCode(String code);

	int deleteByDisciplineScientifiqueCode(String code);

	List<EnseignementDisciplineScientifique> findByDisciplineScientifiqueId(Long id);

	int deleteByDisciplineScientifiqueId(Long id);

	List<EnseignementDisciplineScientifique> findByEnseignementId(Long id);

	int deleteByEnseignementId(Long id);

}
