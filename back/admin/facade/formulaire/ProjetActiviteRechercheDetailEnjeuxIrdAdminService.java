package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailEnjeuxIrd;
import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailEnjeuxIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ProjetActiviteRechercheDetailEnjeuxIrdAdminService extends AbstractService<ProjetActiviteRechercheDetailEnjeuxIrd,Long,ProjetActiviteRechercheDetailEnjeuxIrdVo>{




/**
    * delete ProjetActiviteRechercheDetailEnjeuxIrd from database
    * @param id - id of ProjetActiviteRechercheDetailEnjeuxIrd to be deleted
    *
    */
    int deleteById(Long id);


    List<ProjetActiviteRechercheDetailEnjeuxIrd> findByEnjeuxIrdCode(String code);

    int deleteByEnjeuxIrdCode(String code);

    List<ProjetActiviteRechercheDetailEnjeuxIrd> findByEnjeuxIrdId(Long id);

    int deleteByEnjeuxIrdId(Long id);

    List<ProjetActiviteRechercheDetailEnjeuxIrd> findByProjetActiviteRechercheDetailId(Long id);

    int deleteByProjetActiviteRechercheDetailId(Long id);





}
