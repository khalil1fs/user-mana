package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementZoneGeographique;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementZoneGeographiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementZoneGeographiqueAdminService extends AbstractService<EnseignementZoneGeographique,Long,EnseignementZoneGeographiqueVo>{




/**
    * delete EnseignementZoneGeographique from database
    * @param id - id of EnseignementZoneGeographique to be deleted
    *
    */
    int deleteById(Long id);



    List<EnseignementZoneGeographique> findByEnseignementId(Long id);

    int deleteByEnseignementId(Long id);
    List<EnseignementZoneGeographique> findByZoneGeographiqueCode(String code);

    int deleteByZoneGeographiqueCode(String code);

    List<EnseignementZoneGeographique> findByZoneGeographiqueId(Long id);

    int deleteByZoneGeographiqueId(Long id);
    List<EnseignementZoneGeographique> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EnseignementZoneGeographique> findByPaysId(Long id);

    int deleteByPaysId(Long id);







}
