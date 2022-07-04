package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.PubliqueProfessionel;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.PubliqueProfessionelVo;

import java.util.List;

public interface PubliqueProfessionelAdminService
        extends AbstractService<PubliqueProfessionel, Long, PubliqueProfessionelVo> {

    /**
     * delete PubliqueProfessionel from database
     *
     * @param id - id of PubliqueProfessionel to be deleted
     */
    int deleteById(Long id);


    List<PubliqueProfessionel> findAll();


    PubliqueProfessionel findByCode(String code);

    int deleteByCode(String code);

    PubliqueProfessionel archiver(PubliqueProfessionel publiqueProfessionel);

    PubliqueProfessionel desarchiver(PubliqueProfessionel publiqueProfessionel);

}
