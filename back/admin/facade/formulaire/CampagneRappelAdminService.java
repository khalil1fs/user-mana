package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneRappel;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRappelVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneRappelAdminService extends AbstractService<CampagneRappel,Long,CampagneRappelVo>{




/**
    * delete CampagneRappel from database
    * @param id - id of CampagneRappel to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneRappel> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<CampagneRappel> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<CampagneRappel> findByTemplateRappelCode(String code);

    int deleteByTemplateRappelCode(String code);

    List<CampagneRappel> findByTemplateRappelId(Long id);

    int deleteByTemplateRappelId(Long id);
    void sendEmailRappel(CampagneRappel campagneRappel) ;
    
    List<CampagneRappel> findByCampagneIdOrderByDateRappel(Long id);





}
