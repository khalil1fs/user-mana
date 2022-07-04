package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublic;
import com.ird.faa.ws.rest.provided.vo.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublicVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PublicCibleCultureScientifiqueRecontreGrandPublicAdminService extends AbstractService<PublicCibleCultureScientifiqueRecontreGrandPublic,Long,PublicCibleCultureScientifiqueRecontreGrandPublicVo>{




/**
    * delete PublicCibleCultureScientifiqueRecontreGrandPublic from database
    * @param id - id of PublicCibleCultureScientifiqueRecontreGrandPublic to be deleted
    *
    */
    int deleteById(Long id);


    List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPublicCibleCode(String code);

    int deleteByPublicCibleCode(String code);

    List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPublicCibleId(Long id);

    int deleteByPublicCibleId(Long id);
    List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<PublicCibleCultureScientifiqueRecontreGrandPublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);

    int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);





}
