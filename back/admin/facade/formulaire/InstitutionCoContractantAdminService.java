package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.InstitutionCoContractant;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstitutionCoContractantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstitutionCoContractantAdminService extends AbstractService<InstitutionCoContractant,Long,InstitutionCoContractantVo>{




/**
    * delete InstitutionCoContractant from database
    * @param id - id of InstitutionCoContractant to be deleted
    *
    */
    int deleteById(Long id);


    List<InstitutionCoContractant> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<InstitutionCoContractant> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<InstitutionCoContractant> findByInstitutionCode(String code);

    int deleteByInstitutionCode(String code);

    List<InstitutionCoContractant> findByInstitutionId(Long id);

    int deleteByInstitutionId(Long id);





}
