package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEtablissement;
import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueEtablissementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ResponsabilitePedagogiqueEtablissementAdminService extends
		AbstractService<ResponsabilitePedagogiqueEtablissement, Long, ResponsabilitePedagogiqueEtablissementVo> {

	/**
	 * delete ResponsabilitePedagogiqueEtablissement from database
	 * 
	 * @param id - id of ResponsabilitePedagogiqueEtablissement to be deleted
	 *
	 */
	int deleteById(Long id);

	List<ResponsabilitePedagogiqueEtablissement> findByEtablissementCode(String code);

	int deleteByEtablissementCode(String code);

	List<ResponsabilitePedagogiqueEtablissement> findByEtablissementId(Long id);

	int deleteByEtablissementId(Long id);

	List<ResponsabilitePedagogiqueEtablissement> findByResponsabilitePedagogiqueId(Long id);

	int deleteByResponsabilitePedagogiqueId(Long id);

	List<ResponsabilitePedagogiqueEtablissement> findByPaysCode(String code);

	int deleteByPaysCode(String code);

	List<ResponsabilitePedagogiqueEtablissement> findByPaysId(Long id);

	int deleteByPaysId(Long id);

}
