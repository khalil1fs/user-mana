package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnjeuxIrdEncadrementDoctorant;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnjeuxIrdEncadrementDoctorantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnjeuxIrdEncadrementDoctorantAdminService extends AbstractService<EnjeuxIrdEncadrementDoctorant,Long,EnjeuxIrdEncadrementDoctorantVo>{




/**
    * delete EnjeuxIrdEncadrementDoctorant from database
    * @param id - id of EnjeuxIrdEncadrementDoctorant to be deleted
    *
    */
    int deleteById(Long id);


    List<EnjeuxIrdEncadrementDoctorant> findByEnjeuxIrdCode(String code);

    int deleteByEnjeuxIrdCode(String code);

    List<EnjeuxIrdEncadrementDoctorant> findByEnjeuxIrdId(Long id);

    int deleteByEnjeuxIrdId(Long id);

    List<EnjeuxIrdEncadrementDoctorant> findByEncadrementDoctorantId(Long id);

    int deleteByEncadrementDoctorantId(Long id);







}
