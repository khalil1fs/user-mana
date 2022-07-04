package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdVo;

public interface DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdAdminService extends
		AbstractService<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd, Long, DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrdVo> {

	/**
	 * delete DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd from
	 * database
	 * 
	 * @param id - id of
	 *           DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd to be
	 *           deleted
	 *
	 */
	int deleteById(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByInstrumentIrdCode(String code);

	int deleteByInstrumentIrdCode(String code);

	List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByInstrumentIrdId(Long id);

	int deleteByInstrumentIrdId(Long id);

	List<DeveloppementDeSavoirEtInnovationScientifiqueInstrumentIrd> findByDeveloppementDeSavoirEtInnovationScientifiqueId(
			Long id);

	int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

}
