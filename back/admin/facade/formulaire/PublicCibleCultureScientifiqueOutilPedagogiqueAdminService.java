package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.PublicCibleCultureScientifiqueOutilPedagogique;
import com.ird.faa.ws.rest.provided.vo.formulaire.PublicCibleCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PublicCibleCultureScientifiqueOutilPedagogiqueAdminService extends AbstractService<PublicCibleCultureScientifiqueOutilPedagogique,Long,PublicCibleCultureScientifiqueOutilPedagogiqueVo>{




/**
    * delete PublicCibleCultureScientifiqueOutilPedagogique from database
    * @param id - id of PublicCibleCultureScientifiqueOutilPedagogique to be deleted
    *
    */
    int deleteById(Long id);


    List<PublicCibleCultureScientifiqueOutilPedagogique> findByPublicCibleCode(String code);

    int deleteByPublicCibleCode(String code);

    List<PublicCibleCultureScientifiqueOutilPedagogique> findByPublicCibleId(Long id);

    int deleteByPublicCibleId(Long id);

    List<PublicCibleCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id);

    int deleteByCultureScientifiqueOutilPedagogiqueId(Long id);
    List<PublicCibleCultureScientifiqueOutilPedagogique> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<PublicCibleCultureScientifiqueOutilPedagogique> findByPaysId(Long id);

    int deleteByPaysId(Long id);





}
