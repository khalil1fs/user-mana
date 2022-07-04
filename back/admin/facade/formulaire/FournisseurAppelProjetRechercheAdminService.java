package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FournisseurAppelProjetRecherche;
import com.ird.faa.ws.rest.provided.vo.formulaire.FournisseurAppelProjetRechercheVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FournisseurAppelProjetRechercheAdminService extends AbstractService<FournisseurAppelProjetRecherche,Long,FournisseurAppelProjetRechercheVo>{


    /**
    * find FournisseurAppelProjetRecherche from database by code (reference)
    * @param code - reference of FournisseurAppelProjetRecherche
    * @return the founded FournisseurAppelProjetRecherche , If no FournisseurAppelProjetRecherche were
    *         found in database return  null.
    */
    FournisseurAppelProjetRecherche findByCode(String code);

    /**
    * find FournisseurAppelProjetRecherche from database by id (PK) or code (reference)
    * @param id - id of FournisseurAppelProjetRecherche
    * @param code - reference of FournisseurAppelProjetRecherche
    * @return the founded FournisseurAppelProjetRecherche , If no FournisseurAppelProjetRecherche were
    *         found in database return  null.
    */
    FournisseurAppelProjetRecherche findByIdOrCode(FournisseurAppelProjetRecherche fournisseurAppelProjetRecherche);


/**
    * delete FournisseurAppelProjetRecherche from database
    * @param id - id of FournisseurAppelProjetRecherche to be deleted
    *
    */
    int deleteById(Long id);


    List<FournisseurAppelProjetRecherche> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<FournisseurAppelProjetRecherche> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete FournisseurAppelProjetRecherche from database by code (reference)
    *
    * @param code - reference of FournisseurAppelProjetRecherche to be deleted
    * @return 1 if FournisseurAppelProjetRecherche deleted successfully
    */
    int deleteByCode(String code);



}
