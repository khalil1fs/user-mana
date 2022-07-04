package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.InstrumentsEtDispositifsIrdProjetActiviteRecherche;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstrumentsEtDispositifsIrdProjetActiviteRechercheVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstrumentsEtDispositifsIrdProjetActiviteRechercheAdminService extends AbstractService<InstrumentsEtDispositifsIrdProjetActiviteRecherche,Long,InstrumentsEtDispositifsIrdProjetActiviteRechercheVo>{




/**
    * delete InstrumentsEtDispositifsIrdProjetActiviteRecherche from database
    * @param id - id of InstrumentsEtDispositifsIrdProjetActiviteRecherche to be deleted
    *
    */
    int deleteById(Long id);


    List<InstrumentsEtDispositifsIrdProjetActiviteRecherche> findByProjetActiviteRechercheAnnee(Integer annee);

    int deleteByProjetActiviteRechercheAnnee(Integer annee);

    List<InstrumentsEtDispositifsIrdProjetActiviteRecherche> findByProjetActiviteRechercheId(Long id);

    int deleteByProjetActiviteRechercheId(Long id);
    List<InstrumentsEtDispositifsIrdProjetActiviteRecherche> findByInstrumentsEtDispositifsIrdCode(String code);

    int deleteByInstrumentsEtDispositifsIrdCode(String code);

    List<InstrumentsEtDispositifsIrdProjetActiviteRecherche> findByInstrumentsEtDispositifsIrdId(Long id);

    int deleteByInstrumentsEtDispositifsIrdId(Long id);





}
