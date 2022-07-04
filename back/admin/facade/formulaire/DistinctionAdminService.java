package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.Distinction;
import com.ird.faa.ws.rest.provided.vo.formulaire.DistinctionVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DistinctionAdminService extends AbstractService<Distinction, Long, DistinctionVo> {

	/**
	 * delete Distinction from database
	 * 
	 * @param id - id of Distinction to be deleted
	 *
	 */
	int deleteById(Long id);

	List<Distinction> findByTypeParticipationCode(String code);

	int deleteByTypeParticipationCode(String code);

	List<Distinction> findByTypeParticipationId(Long id);

	int deleteByTypeParticipationId(Long id);

	List<Distinction> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<Distinction> findByPaysId(Long id);

	int deleteByPaysId(Long id);

	List<Distinction> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<Distinction> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

	List<Distinction> findByChercheurNumeroMatricule(String numeroMatricule);

	int deleteByChercheurNumeroMatricule(String numeroMatricule);

	List<Distinction> findByChercheurId(Long id);

	int deleteByChercheurId(Long id);

	List<Distinction> findByCampagneCode(String code);

	int deleteByCampagneCode(String code);

	List<Distinction> findByCampagneId(Long id);

	int deleteByCampagneId(Long id);

}
