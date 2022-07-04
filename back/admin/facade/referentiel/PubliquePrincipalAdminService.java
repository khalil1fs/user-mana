package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.PubliquePrincipal;
import com.ird.faa.ws.rest.provided.vo.referentiel.PubliquePrincipalVo;
import com.ird.faa.service.core.facade.AbstractService;

import java.util.List;

public interface PubliquePrincipalAdminService extends AbstractService<PubliquePrincipal,Long,PubliquePrincipalVo>{




/**
    * delete PubliquePrincipal from database
    * @param id - id of PubliquePrincipal to be deleted
    *
    */
    int deleteById(Long id);

    List<PubliquePrincipal> findAll();


    PubliquePrincipal findByCode(String code);

    int deleteByCode(String code);







}
