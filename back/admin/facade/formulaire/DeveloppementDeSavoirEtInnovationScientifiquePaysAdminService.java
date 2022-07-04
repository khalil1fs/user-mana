package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePays;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiquePaysVo;

public interface DeveloppementDeSavoirEtInnovationScientifiquePaysAdminService extends
		AbstractService<DeveloppementDeSavoirEtInnovationScientifiquePays, Long, DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {

	/**
	 * delete DeveloppementDeSavoirEtInnovationScientifiquePays from database
	 * 
	 * @param id - id of DeveloppementDeSavoirEtInnovationScientifiquePays to be
	 *           deleted
	 *
	 */
	int deleteById(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByPaysId(Long id);

	int deleteByPaysId(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiquePays> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id);

	int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

}
