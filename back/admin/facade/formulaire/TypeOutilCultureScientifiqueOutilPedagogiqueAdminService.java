package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.TypeOutilCultureScientifiqueOutilPedagogique;
import com.ird.faa.ws.rest.provided.vo.formulaire.TypeOutilCultureScientifiqueOutilPedagogiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeOutilCultureScientifiqueOutilPedagogiqueAdminService extends AbstractService<TypeOutilCultureScientifiqueOutilPedagogique,Long,TypeOutilCultureScientifiqueOutilPedagogiqueVo>{




/**
    * delete TypeOutilCultureScientifiqueOutilPedagogique from database
    * @param id - id of TypeOutilCultureScientifiqueOutilPedagogique to be deleted
    *
    */
    int deleteById(Long id);



    List<TypeOutilCultureScientifiqueOutilPedagogique> findByCultureScientifiqueOutilPedagogiqueId(Long id);

    int deleteByCultureScientifiqueOutilPedagogiqueId(Long id);
    List<TypeOutilCultureScientifiqueOutilPedagogique> findByTypeOutilCode(String code);

    int deleteByTypeOutilCode(String code);

    List<TypeOutilCultureScientifiqueOutilPedagogique> findByTypeOutilId(Long id);

    int deleteByTypeOutilId(Long id);





}
