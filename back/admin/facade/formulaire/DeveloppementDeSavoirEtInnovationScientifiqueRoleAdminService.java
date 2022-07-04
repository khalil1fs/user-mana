package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueRole;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueRoleVo;

public interface DeveloppementDeSavoirEtInnovationScientifiqueRoleAdminService extends
		AbstractService<DeveloppementDeSavoirEtInnovationScientifiqueRole, Long, DeveloppementDeSavoirEtInnovationScientifiqueRoleVo> {

	/**
	 * delete DeveloppementDeSavoirEtInnovationScientifiqueRoleDeveloppementDeSavoir from
	 * database
	 * 
	 * @param id - id of DeveloppementDeSavoirEtInnovationScientifiqueRoleDeveloppementDeSavoir
	 *           to be deleted
	 *
	 */
	int deleteById(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiqueRole> findByRoleDeveloppementDeSavoirCode(String code);

	int deleteByRoleDeveloppementDeSavoirCode(String code);

	List<DeveloppementDeSavoirEtInnovationScientifiqueRole> findByRoleDeveloppementDeSavoirId(Long id);

	int deleteByRoleDeveloppementDeSavoirId(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiqueRole> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id);

	int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

}
