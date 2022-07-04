package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogique;
import com.ird.faa.ws.rest.provided.vo.formulaire.PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PaysTypeOutilCultureScientifiqueOutilPedagogiqueAdminService extends AbstractService<PaysTypeOutilCultureScientifiqueOutilPedagogique,Long,PaysTypeOutilCultureScientifiqueOutilPedagogiqueVo>{




/**
    * delete PaysTypeOutilCultureScientifiqueOutilPedagogique from database
    * @param id - id of PaysTypeOutilCultureScientifiqueOutilPedagogique to be deleted
    *
    */
    int deleteById(Long id);



    List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id);

    int deleteByCultureScientifiqueOutilPedagogiqueId(Long id);
    List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<PaysTypeOutilCultureScientifiqueOutilPedagogique> findByPaysId(Long id);

    int deleteByPaysId(Long id);





}
