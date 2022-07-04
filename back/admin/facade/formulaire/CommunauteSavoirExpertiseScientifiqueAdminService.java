package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirExpertiseScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirExpertiseScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirExpertiseScientifiqueAdminService extends AbstractService<CommunauteSavoirExpertiseScientifique,Long,CommunauteSavoirExpertiseScientifiqueVo>{




/**
    * delete CommunauteSavoirExpertiseScientifique from database
    * @param id - id of CommunauteSavoirExpertiseScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirExpertiseScientifique> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirExpertiseScientifique> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);
    List<CommunauteSavoirExpertiseScientifique> findByExpertiseScientifiqueAnnee(Integer annee);

    int deleteByExpertiseScientifiqueAnnee(Integer annee);

    List<CommunauteSavoirExpertiseScientifique> findByExpertiseScientifiqueId(Long id);

    int deleteByExpertiseScientifiqueId(Long id);





}
