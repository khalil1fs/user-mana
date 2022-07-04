package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailInstitutionCoContractant;
import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailInstitutionCoContractantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ProjetActiviteRechercheDetailInstitutionCoContractantAdminService extends AbstractService<ProjetActiviteRechercheDetailInstitutionCoContractant,Long,ProjetActiviteRechercheDetailInstitutionCoContractantVo>{




/**
    * delete ProjetActiviteRechercheDetailInstitutionCoContractant from database
    * @param id - id of ProjetActiviteRechercheDetailInstitutionCoContractant to be deleted
    *
    */
    int deleteById(Long id);


    List<ProjetActiviteRechercheDetailInstitutionCoContractant> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ProjetActiviteRechercheDetailInstitutionCoContractant> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);

    List<ProjetActiviteRechercheDetailInstitutionCoContractant> findByProjetActiviteRechercheDetailId(Long id);

    int deleteByProjetActiviteRechercheDetailId(Long id);





}
