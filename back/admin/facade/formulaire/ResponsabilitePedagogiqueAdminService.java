package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogique;
import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ResponsabilitePedagogiqueAdminService
		extends AbstractService<ResponsabilitePedagogique, Long, ResponsabilitePedagogiqueVo> {

	/**
	 * delete ResponsabilitePedagogique from database
	 * 
	 * @param id - id of ResponsabilitePedagogique to be deleted
	 *
	 */
	int deleteById(Long id);

	List<ResponsabilitePedagogique> findByNiveauResponsabilitePedagogiqueCode(String code);

	int deleteByNiveauResponsabilitePedagogiqueCode(String code);

	List<ResponsabilitePedagogique> findByNiveauResponsabilitePedagogiqueId(Long id);

	int deleteByNiveauResponsabilitePedagogiqueId(Long id);

	List<ResponsabilitePedagogique> findByStatusCursusCode(String code);

	int deleteByStatusCursusCode(String code);

	List<ResponsabilitePedagogique> findByStatusCursusId(Long id);

	int deleteByStatusCursusId(Long id);

	List<ResponsabilitePedagogique> findByEtatEtapeCampagneCode(String code);

	int deleteByEtatEtapeCampagneCode(String code);

	List<ResponsabilitePedagogique> findByEtatEtapeCampagneId(Long id);

	int deleteByEtatEtapeCampagneId(Long id);

	List<ResponsabilitePedagogique> findByEnseignementEtFormationId(Long id);

	int deleteByEnseignementEtFormationId(Long id);

}
