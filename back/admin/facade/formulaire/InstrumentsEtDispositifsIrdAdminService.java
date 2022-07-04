package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.InstrumentsEtDispositifsIrd;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstrumentsEtDispositifsIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstrumentsEtDispositifsIrdAdminService extends AbstractService<InstrumentsEtDispositifsIrd,Long,InstrumentsEtDispositifsIrdVo>{


    /**
    * find InstrumentsEtDispositifsIrd from database by code (reference)
    * @param code - reference of InstrumentsEtDispositifsIrd
    * @return the founded InstrumentsEtDispositifsIrd , If no InstrumentsEtDispositifsIrd were
    *         found in database return  null.
    */
    InstrumentsEtDispositifsIrd findByCode(String code);

    /**
    * find InstrumentsEtDispositifsIrd from database by id (PK) or code (reference)
    * @param id - id of InstrumentsEtDispositifsIrd
    * @param code - reference of InstrumentsEtDispositifsIrd
    * @return the founded InstrumentsEtDispositifsIrd , If no InstrumentsEtDispositifsIrd were
    *         found in database return  null.
    */
    InstrumentsEtDispositifsIrd findByIdOrCode(InstrumentsEtDispositifsIrd instrumentsEtDispositifsIrd);


/**
    * delete InstrumentsEtDispositifsIrd from database
    * @param id - id of InstrumentsEtDispositifsIrd to be deleted
    *
    */
    int deleteById(Long id);


    List<InstrumentsEtDispositifsIrd> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<InstrumentsEtDispositifsIrd> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<InstrumentsEtDispositifsIrd> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<InstrumentsEtDispositifsIrd> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);


    /**
    * delete InstrumentsEtDispositifsIrd from database by code (reference)
    *
    * @param code - reference of InstrumentsEtDispositifsIrd to be deleted
    * @return 1 if InstrumentsEtDispositifsIrd deleted successfully
    */
    int deleteByCode(String code);



}
