package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EcoleDoctorale;
import com.ird.faa.ws.rest.provided.vo.formulaire.EcoleDoctoraleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EcoleDoctoraleAdminService extends AbstractService<EcoleDoctorale,Long,EcoleDoctoraleVo>{


    /**
    * find EcoleDoctorale from database by intitule (reference)
    * @param intitule - reference of EcoleDoctorale
    * @return the founded EcoleDoctorale , If no EcoleDoctorale were
    *         found in database return  null.
    */
    EcoleDoctorale findByIntitule(String intitule);

    /**
    * find EcoleDoctorale from database by id (PK) or intitule (reference)
    * @param id - id of EcoleDoctorale
    * @param intitule - reference of EcoleDoctorale
    * @return the founded EcoleDoctorale , If no EcoleDoctorale were
    *         found in database return  null.
    */
    EcoleDoctorale findByIdOrIntitule(EcoleDoctorale ecoleDoctorale);


/**
    * delete EcoleDoctorale from database
    * @param id - id of EcoleDoctorale to be deleted
    *
    */
    int deleteById(Long id);


    List<EcoleDoctorale> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EcoleDoctorale> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete EcoleDoctorale from database by intitule (reference)
    *
    * @param intitule - reference of EcoleDoctorale to be deleted
    * @return 1 if EcoleDoctorale deleted successfully
    */
    int deleteByIntitule(String intitule);



}
