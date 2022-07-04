package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.NiveauFormationPostBac;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauFormationPostBacVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NiveauFormationPostBacAdminService extends AbstractService<NiveauFormationPostBac,Long,NiveauFormationPostBacVo>{


    /**
    * find NiveauFormationPostBac from database by code (reference)
    * @param code - reference of NiveauFormationPostBac
    * @return the founded NiveauFormationPostBac , If no NiveauFormationPostBac were
    *         found in database return  null.
    */
    NiveauFormationPostBac findByCode(String code);

    /**
    * find NiveauFormationPostBac from database by id (PK) or code (reference)
    * @param id - id of NiveauFormationPostBac
    * @param code - reference of NiveauFormationPostBac
    * @return the founded NiveauFormationPostBac , If no NiveauFormationPostBac were
    *         found in database return  null.
    */
    NiveauFormationPostBac findByIdOrCode(NiveauFormationPostBac niveauFormationPostBac);


/**
    * delete NiveauFormationPostBac from database
    * @param id - id of NiveauFormationPostBac to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete NiveauFormationPostBac from database by code (reference)
    *
    * @param code - reference of NiveauFormationPostBac to be deleted
    * @return 1 if NiveauFormationPostBac deleted successfully
    */
    int deleteByCode(String code);




    NiveauFormationPostBac archiver(NiveauFormationPostBac niveauFormationPostBac) ;
    NiveauFormationPostBac desarchiver(NiveauFormationPostBac niveauFormationPostBac);

}
