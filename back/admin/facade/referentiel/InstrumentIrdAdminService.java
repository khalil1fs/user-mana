package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.InstrumentIrd;
import com.ird.faa.ws.rest.provided.vo.referentiel.InstrumentIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstrumentIrdAdminService extends AbstractService<InstrumentIrd,Long,InstrumentIrdVo>{


    /**
    * find InstrumentIrd from database by code (reference)
    * @param code - reference of InstrumentIrd
    * @return the founded InstrumentIrd , If no InstrumentIrd were
    *         found in database return  null.
    */
    InstrumentIrd findByCode(String code);

    /**
    * find InstrumentIrd from database by id (PK) or code (reference)
    * @param id - id of InstrumentIrd
    * @param code - reference of InstrumentIrd
    * @return the founded InstrumentIrd , If no InstrumentIrd were
    *         found in database return  null.
    */
    InstrumentIrd findByIdOrCode(InstrumentIrd instrumentIrd);


/**
    * delete InstrumentIrd from database
    * @param id - id of InstrumentIrd to be deleted
    *
    */
    int deleteById(Long id);


    List<InstrumentIrd> findByTypeInstrumentIrdCode(String code);

    int deleteByTypeInstrumentIrdCode(String code);

    List<InstrumentIrd> findByTypeInstrumentIrdId(Long id);

    int deleteByTypeInstrumentIrdId(Long id);


    /**
    * delete InstrumentIrd from database by code (reference)
    *
    * @param code - reference of InstrumentIrd to be deleted
    * @return 1 if InstrumentIrd deleted successfully
    */
    int deleteByCode(String code);



}
