package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueDirectionEncadrementDoctorant;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueDirectionEncadrementDoctorantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueDirectionEncadrementDoctorantAdminService extends AbstractService<DisciplineScientifiqueDirectionEncadrementDoctorant,Long,DisciplineScientifiqueDirectionEncadrementDoctorantVo>{




/**
    * delete DisciplineScientifiqueDirectionEncadrementDoctorant from database
    * @param id - id of DisciplineScientifiqueDirectionEncadrementDoctorant to be deleted
    *
    */
    int deleteById(Long id);



    List<DisciplineScientifiqueDirectionEncadrementDoctorant> findByDirectionEncadrementDoctorantId(Long id);

    int deleteByDirectionEncadrementDoctorantId(Long id);
    List<DisciplineScientifiqueDirectionEncadrementDoctorant> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifiqueDirectionEncadrementDoctorant> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);





}
