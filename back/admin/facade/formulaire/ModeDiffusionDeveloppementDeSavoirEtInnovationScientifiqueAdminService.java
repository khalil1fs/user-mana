package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueAdminService extends AbstractService<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique,Long,ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo>{




/**
    * delete ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique from database
    * @param id - id of ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByModeDiffusionCode(String code);

    int deleteByModeDiffusionCode(String code);

    List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByModeDiffusionId(Long id);

    int deleteByModeDiffusionId(Long id);

    List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);

    int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id);





}
