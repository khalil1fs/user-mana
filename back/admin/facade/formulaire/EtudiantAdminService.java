package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.Etudiant;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.EtudiantVo;

public interface EtudiantAdminService extends AbstractService<Etudiant,Long,EtudiantVo>{




/**
    * delete Etudiant from database
    * @param id - id of Etudiant to be deleted
    *
    */
    int deleteById(Long id);


    List<Etudiant> findBySexeCode(String code);

    int deleteBySexeCode(String code);

    List<Etudiant> findBySexeId(Long id);

    int deleteBySexeId(Long id);
    List<Etudiant> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<Etudiant> findByPaysId(Long id);

    int deleteByPaysId(Long id);





	Etudiant archiver(Etudiant etudiant);

	Etudiant desarchiver(Etudiant etudiant);

}
