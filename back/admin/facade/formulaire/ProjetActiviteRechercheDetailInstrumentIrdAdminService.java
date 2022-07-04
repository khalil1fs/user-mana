package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailInstrumentIrd;
import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailInstrumentIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ProjetActiviteRechercheDetailInstrumentIrdAdminService extends AbstractService<ProjetActiviteRechercheDetailInstrumentIrd,Long,ProjetActiviteRechercheDetailInstrumentIrdVo>{




/**
    * delete ProjetActiviteRechercheDetailInstrumentIrd from database
    * @param id - id of ProjetActiviteRechercheDetailInstrumentIrd to be deleted
    *
    */
    int deleteById(Long id);



    List<ProjetActiviteRechercheDetailInstrumentIrd> findByProjetActiviteRechercheDetailId(Long id);

    int deleteByProjetActiviteRechercheDetailId(Long id);
    List<ProjetActiviteRechercheDetailInstrumentIrd> findByInstrumentIrdCode(String code);

    int deleteByInstrumentIrdCode(String code);

    List<ProjetActiviteRechercheDetailInstrumentIrd> findByInstrumentIrdId(Long id);

    int deleteByInstrumentIrdId(Long id);





}
