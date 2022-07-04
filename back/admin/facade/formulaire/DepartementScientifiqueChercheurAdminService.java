package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.DepartementScientifiqueChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.DepartementScientifiqueChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DepartementScientifiqueChercheurAdminService
		extends AbstractService<DepartementScientifiqueChercheur, Long, DepartementScientifiqueChercheurVo> {

	/**
	 * delete DepartementScientifiqueChercheur from database
	 * 
	 * @param id - id of DepartementScientifiqueChercheur to be deleted
	 *
	 */
	int deleteById(Long id);

	List<DepartementScientifiqueChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

	int deleteByChercheurNumeroMatricule(String numeroMatricule);

	List<DepartementScientifiqueChercheur> findByChercheurId(Long id);

	int deleteByChercheurId(Long id);

	List<DepartementScientifiqueChercheur> findByDepartementScientifiqueCode(String code);

	int deleteByDepartementScientifiqueCode(String code);

	List<DepartementScientifiqueChercheur> findByDepartementScientifiqueId(Long id);

	int deleteByDepartementScientifiqueId(Long id);

}
