package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.SavoirEtInnovation;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.SavoirEtInnovationVo;

public interface SavoirEtInnovationAdminService
		extends AbstractService<SavoirEtInnovation, Long, SavoirEtInnovationVo> {

	/**
	 * delete SavoirEtInnovation from database
	 * 
	 * @param id - id of SavoirEtInnovation to be deleted
	 *
	 */
	int deleteById(Long id);

	List<SavoirEtInnovation> findByCampagneCode(String code);

	int deleteByCampagneCode(String code);

	List<SavoirEtInnovation> findByCampagneId(Long id);

	int deleteByCampagneId(Long id);

	List<SavoirEtInnovation> findByChercheurNumeroMatricule(String numeroMatricule);

	int deleteByChercheurNumeroMatricule(String numeroMatricule);

	List<SavoirEtInnovation> findByChercheurId(Long id);

	int deleteByChercheurId(Long id);

	List<SavoirEtInnovation> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<SavoirEtInnovation> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

}
