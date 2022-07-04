package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;
import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ProjetActiviteRechercheDetailAdminService extends AbstractService<ProjetActiviteRechercheDetail,Long,ProjetActiviteRechercheDetailVo>{




/**
    * delete ProjetActiviteRechercheDetail from database
    * @param id - id of ProjetActiviteRechercheDetail to be deleted
    *
    */
    int deleteById(Long id);


    List<ProjetActiviteRechercheDetail> findByStatusProjetCode(String code);

    int deleteByStatusProjetCode(String code);

    List<ProjetActiviteRechercheDetail> findByStatusProjetId(Long id);

    int deleteByStatusProjetId(Long id);
    List<ProjetActiviteRechercheDetail> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ProjetActiviteRechercheDetail> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<ProjetActiviteRechercheDetail> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<ProjetActiviteRechercheDetail> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<ProjetActiviteRechercheDetail> findByProjetActiviteRechercheId(Long id);

    int deleteByProjetActiviteRechercheId(Long id);





}
