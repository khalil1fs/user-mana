package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirEncadrementDoctorant;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEncadrementDoctorantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirEncadrementDoctorantAdminService extends AbstractService<CommunauteSavoirEncadrementDoctorant,Long,CommunauteSavoirEncadrementDoctorantVo>{




/**
    * delete CommunauteSavoirEncadrementDoctorant from database
    * @param id - id of CommunauteSavoirEncadrementDoctorant to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirEncadrementDoctorant> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirEncadrementDoctorant> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);

    List<CommunauteSavoirEncadrementDoctorant> findByEncadrementDoctorantId(Long id);

    int deleteByEncadrementDoctorantId(Long id);







}
