package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeInstrumentsEtDispositifsIrd;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeInstrumentsEtDispositifsIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeInstrumentsEtDispositifsIrdAdminService extends AbstractService<TypeInstrumentsEtDispositifsIrd,Long,TypeInstrumentsEtDispositifsIrdVo>{


    /**
    * find TypeInstrumentsEtDispositifsIrd from database by code (reference)
    * @param code - reference of TypeInstrumentsEtDispositifsIrd
    * @return the founded TypeInstrumentsEtDispositifsIrd , If no TypeInstrumentsEtDispositifsIrd were
    *         found in database return  null.
    */
    TypeInstrumentsEtDispositifsIrd findByCode(String code);

    /**
    * find TypeInstrumentsEtDispositifsIrd from database by id (PK) or code (reference)
    * @param id - id of TypeInstrumentsEtDispositifsIrd
    * @param code - reference of TypeInstrumentsEtDispositifsIrd
    * @return the founded TypeInstrumentsEtDispositifsIrd , If no TypeInstrumentsEtDispositifsIrd were
    *         found in database return  null.
    */
    TypeInstrumentsEtDispositifsIrd findByIdOrCode(TypeInstrumentsEtDispositifsIrd typeInstrumentsEtDispositifsIrd);


/**
    * delete TypeInstrumentsEtDispositifsIrd from database
    * @param id - id of TypeInstrumentsEtDispositifsIrd to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeInstrumentsEtDispositifsIrd from database by code (reference)
    *
    * @param code - reference of TypeInstrumentsEtDispositifsIrd to be deleted
    * @return 1 if TypeInstrumentsEtDispositifsIrd deleted successfully
    */
    int deleteByCode(String code);



}
