package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EtablissementProjet;
import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementProjetVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtablissementProjetAdminService extends AbstractService<EtablissementProjet,Long,EtablissementProjetVo>{


    /**
    * find EtablissementProjet from database by code (reference)
    * @param code - reference of EtablissementProjet
    * @return the founded EtablissementProjet , If no EtablissementProjet were
    *         found in database return  null.
    */
    EtablissementProjet findByCode(String code);

    /**
    * find EtablissementProjet from database by id (PK) or code (reference)
    * @param id - id of EtablissementProjet
    * @param code - reference of EtablissementProjet
    * @return the founded EtablissementProjet , If no EtablissementProjet were
    *         found in database return  null.
    */
    EtablissementProjet findByIdOrCode(EtablissementProjet etablissementProjet);


/**
    * delete EtablissementProjet from database
    * @param id - id of EtablissementProjet to be deleted
    *
    */
    int deleteById(Long id);


    List<EtablissementProjet> findByVilleCode(String code);

    int deleteByVilleCode(String code);

    List<EtablissementProjet> findByVilleId(Long id);

    int deleteByVilleId(Long id);
    List<EtablissementProjet> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EtablissementProjet> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete EtablissementProjet from database by code (reference)
    *
    * @param code - reference of EtablissementProjet to be deleted
    * @return 1 if EtablissementProjet deleted successfully
    */
    int deleteByCode(String code);



}
