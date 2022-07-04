package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetail;
import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleDetailVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface VieInstitutionnelleDetailAdminService extends AbstractService<VieInstitutionnelleDetail,Long,VieInstitutionnelleDetailVo>{




/**
    * delete VieInstitutionnelleDetail from database
    * @param id - id of VieInstitutionnelleDetail to be deleted
    *
    */
    int deleteById(Long id);


    List<VieInstitutionnelleDetail> findByTypeInstanceCode(String code);

    int deleteByTypeInstanceCode(String code);

    List<VieInstitutionnelleDetail> findByTypeInstanceId(Long id);

    int deleteByTypeInstanceId(Long id);
    List<VieInstitutionnelleDetail> findByStructureIrdCode(String code);

    int deleteByStructureIrdCode(String code);

    List<VieInstitutionnelleDetail> findByStructureIrdId(Long id);

    int deleteByStructureIrdId(Long id);
    List<VieInstitutionnelleDetail> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<VieInstitutionnelleDetail> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<VieInstitutionnelleDetail> findByVieInstitutionnelleId(Long id);

    int deleteByVieInstitutionnelleId(Long id);





}
