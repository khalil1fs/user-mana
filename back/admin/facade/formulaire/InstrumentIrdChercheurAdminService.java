package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.InstrumentIrdChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.InstrumentIrdChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface InstrumentIrdChercheurAdminService extends AbstractService<InstrumentIrdChercheur,Long,InstrumentIrdChercheurVo>{




/**
    * delete InstrumentIrdChercheur from database
    * @param id - id of InstrumentIrdChercheur to be deleted
    *
    */
    int deleteById(Long id);


    List<InstrumentIrdChercheur> findByInstrumentIrdCode(String code);

    int deleteByInstrumentIrdCode(String code);

    List<InstrumentIrdChercheur> findByInstrumentIrdId(Long id);

    int deleteByInstrumentIrdId(Long id);
    List<InstrumentIrdChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<InstrumentIrdChercheur> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);







}
