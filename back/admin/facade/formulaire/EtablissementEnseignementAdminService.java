package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EtablissementEnseignement;
import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementEnseignementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtablissementEnseignementAdminService
		extends AbstractService<EtablissementEnseignement, Long, EtablissementEnseignementVo> {

	/**
	 * delete EnseignementEtablissement from database
	 * 
	 * @param id - id of EnseignementEtablissement to be deleted
	 *
	 */
	int deleteById(Long id);

	List<EtablissementEnseignement> findByEtablissementCode(String code);

	int deleteByEtablissementCode(String code);

	List<EtablissementEnseignement> findByEtablissementId(Long id);

	int deleteByEtablissementId(Long id);

	List<EtablissementEnseignement> findByEnseignementId(Long id);

	int deleteByEnseignementId(Long id);

	List<EtablissementEnseignement> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<EtablissementEnseignement> findByPaysId(Long id);

	int deleteByPaysId(Long id);

}
