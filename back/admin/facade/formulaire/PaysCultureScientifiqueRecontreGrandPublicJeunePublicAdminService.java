package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.ws.rest.provided.vo.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminService extends AbstractService<PaysCultureScientifiqueRecontreGrandPublicJeunePublic,Long,PaysCultureScientifiqueRecontreGrandPublicJeunePublicVo>{




/**
    * delete PaysCultureScientifiqueRecontreGrandPublicJeunePublic from database
    * @param id - id of PaysCultureScientifiqueRecontreGrandPublicJeunePublic to be deleted
    *
    */
    int deleteById(Long id);


    List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);

    int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);





}
