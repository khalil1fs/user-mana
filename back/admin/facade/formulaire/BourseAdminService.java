package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.Bourse;
import com.ird.faa.ws.rest.provided.vo.formulaire.BourseVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface BourseAdminService extends AbstractService<Bourse,Long,BourseVo>{




/**
    * delete Bourse from database
    * @param id - id of Bourse to be deleted
    *
    */
    int deleteById(Long id);


    List<Bourse> findByProjetActiviteRechercheAnnee(Integer annee);

    int deleteByProjetActiviteRechercheAnnee(Integer annee);

    List<Bourse> findByProjetActiviteRechercheId(Long id);

    int deleteByProjetActiviteRechercheId(Long id);
    List<Bourse> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<Bourse> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<Bourse> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<Bourse> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);





}
