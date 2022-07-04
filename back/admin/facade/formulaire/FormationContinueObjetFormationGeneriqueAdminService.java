package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FormationContinueObjetFormationGenerique;
import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinueObjetFormationGeneriqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FormationContinueObjetFormationGeneriqueAdminService extends
		AbstractService<FormationContinueObjetFormationGenerique, Long, FormationContinueObjetFormationGeneriqueVo> {

	/**
	 * delete FormationContinueObjetFormationGenerique from database
	 * 
	 * @param id - id of FormationContinueObjetFormationGenerique to be deleted
	 *
	 */
	int deleteById(Long id);

	List<FormationContinueObjetFormationGenerique> findByObjetFormationGeneriqueCode(String code);

	int deleteByObjetFormationGeneriqueCode(String code);

	List<FormationContinueObjetFormationGenerique> findByObjetFormationGeneriqueId(Long id);

	int deleteByObjetFormationGeneriqueId(Long id);

	List<FormationContinueObjetFormationGenerique> findByFormationContinueId(Long id);

	int deleteByFormationContinueId(Long id);

}
