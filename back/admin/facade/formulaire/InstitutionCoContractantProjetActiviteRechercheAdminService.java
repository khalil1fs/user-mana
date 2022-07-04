package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.InstitutionCoContractantProjetActiviteRecherche;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstitutionCoContractantProjetActiviteRechercheVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstitutionCoContractantProjetActiviteRechercheAdminService extends AbstractService<InstitutionCoContractantProjetActiviteRecherche,Long,InstitutionCoContractantProjetActiviteRechercheVo>{




/**
    * delete InstitutionCoContractantProjetActiviteRecherche from database
    * @param id - id of InstitutionCoContractantProjetActiviteRecherche to be deleted
    *
    */
    int deleteById(Long id);



    List<InstitutionCoContractantProjetActiviteRecherche> findByInstitutionCoContractantId(Long id);

    int deleteByInstitutionCoContractantId(Long id);
    List<InstitutionCoContractantProjetActiviteRecherche> findByProjetActiviteRechercheAnnee(Integer annee);

    int deleteByProjetActiviteRechercheAnnee(Integer annee);

    List<InstitutionCoContractantProjetActiviteRecherche> findByProjetActiviteRechercheId(Long id);

    int deleteByProjetActiviteRechercheId(Long id);





}
