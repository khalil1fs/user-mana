package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirConseilEtComiteScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirConseilEtComiteScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirConseilEtComiteScientifiqueAdminService extends AbstractService<CommunauteSavoirConseilEtComiteScientifique,Long,CommunauteSavoirConseilEtComiteScientifiqueVo>{




/**
    * delete CommunauteSavoirConseilEtComiteScientifique from database
    * @param id - id of CommunauteSavoirConseilEtComiteScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirConseilEtComiteScientifique> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirConseilEtComiteScientifique> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);
    List<CommunauteSavoirConseilEtComiteScientifique> findByConseilEtComiteScientifiqueAnnee(Integer annee);

    int deleteByConseilEtComiteScientifiqueAnnee(Integer annee);

    List<CommunauteSavoirConseilEtComiteScientifique> findByConseilEtComiteScientifiqueId(Long id);

    int deleteByConseilEtComiteScientifiqueId(Long id);





}
