package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Partenaire;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.PartenaireVo;

import java.util.List;

public interface PartenaireAdminService extends AbstractService<Partenaire, Long, PartenaireVo> {


    /**
     * find Partenaire from database by sigleOfficel (reference)
     *
     * @param sigleOfficel - reference of Partenaire
     * @return the founded Partenaire , If no Partenaire were
     * found in database return  null.
     */
    Partenaire findBySigleOfficel(String sigleOfficel);

    /**
     * find Partenaire from database by id (PK) or sigleOfficel (reference)
     *
     * @param partenaire - reference of Partenaire
     * @return the founded Partenaire , If no Partenaire were
     * found in database return  null.
     */
    Partenaire findByIdOrSigleOfficel(Partenaire partenaire);


    /**
     * delete Partenaire from database
     *
     * @param id - id of Partenaire to be deleted
     */
    int deleteById(Long id);


    List<Partenaire> findByPaysPartenaireCode(String code);

    int deleteByPaysPartenaireCode(String code);

    List<Partenaire> findByPaysPartenaireId(Long id);

    int deleteByPaysPartenaireId(Long id);


    /**
     * delete Partenaire from database by sigleOfficel (reference)
     *
     * @param sigleOfficel - reference of Partenaire to be deleted
     * @return 1 if Partenaire deleted successfully
     */
    int deleteBySigleOfficel(String sigleOfficel);



}
