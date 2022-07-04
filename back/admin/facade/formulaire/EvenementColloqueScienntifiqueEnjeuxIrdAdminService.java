package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.EvenementColloqueScienntifiqueEnjeuxIrd;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvenementColloqueScienntifiqueEnjeuxIrdVo;

public interface EvenementColloqueScienntifiqueEnjeuxIrdAdminService extends
		AbstractService<EvenementColloqueScienntifiqueEnjeuxIrd, Long, EvenementColloqueScienntifiqueEnjeuxIrdVo> {

	/**
	 * delete EvenementColloqueScienntifiqueEnjeuxIrd from database
	 * 
	 * @param id - id of EvenementColloqueScienntifiqueEnjeuxIrd to be deleted
	 *
	 */
	int deleteById(Long id);

	List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEvenementColloqueScienntifiqueId(Long id);

	int deleteByEvenementColloqueScienntifiqueId(Long id);

	List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEnjeuxIrdCode(String code);

	int deleteByEnjeuxIrdCode(String code);

	List<EvenementColloqueScienntifiqueEnjeuxIrd> findByEnjeuxIrdId(Long id);

	int deleteByEnjeuxIrdId(Long id);

}
