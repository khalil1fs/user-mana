package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEcoleDoctorale;
import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueEcoleDoctoraleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ResponsabilitePedagogiqueEcoleDoctoraleAdminService extends AbstractService<ResponsabilitePedagogiqueEcoleDoctorale,Long,ResponsabilitePedagogiqueEcoleDoctoraleVo>{


    /**
    * find ResponsabilitePedagogiqueEcoleDoctorale from database by annee (reference)
    * @param annee - reference of ResponsabilitePedagogiqueEcoleDoctorale
    * @return the founded ResponsabilitePedagogiqueEcoleDoctorale , If no ResponsabilitePedagogiqueEcoleDoctorale were
    *         found in database return  null.
    */
    ResponsabilitePedagogiqueEcoleDoctorale findByAnnee(Integer annee);

    /**
    * find ResponsabilitePedagogiqueEcoleDoctorale from database by id (PK) or annee (reference)
    * @param id - id of ResponsabilitePedagogiqueEcoleDoctorale
    * @param annee - reference of ResponsabilitePedagogiqueEcoleDoctorale
    * @return the founded ResponsabilitePedagogiqueEcoleDoctorale , If no ResponsabilitePedagogiqueEcoleDoctorale were
    *         found in database return  null.
    */
    ResponsabilitePedagogiqueEcoleDoctorale findByIdOrAnnee(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale);


/**
    * delete ResponsabilitePedagogiqueEcoleDoctorale from database
    * @param id - id of ResponsabilitePedagogiqueEcoleDoctorale to be deleted
    *
    */
    int deleteById(Long id);


    List<ResponsabilitePedagogiqueEcoleDoctorale> findByStatutEcoleDoctoraleCode(String code);

    int deleteByStatutEcoleDoctoraleCode(String code);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByStatutEcoleDoctoraleId(Long id);

    int deleteByStatutEcoleDoctoraleId(Long id);
    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEcoleDoctoraleIntitule(String intitule);

    int deleteByEcoleDoctoraleIntitule(String intitule);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEcoleDoctoraleId(Long id);

    int deleteByEcoleDoctoraleId(Long id);
    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);
    List<ResponsabilitePedagogiqueEcoleDoctorale> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<ResponsabilitePedagogiqueEcoleDoctorale> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<ResponsabilitePedagogiqueEcoleDoctorale> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);


    /**
    * delete ResponsabilitePedagogiqueEcoleDoctorale from database by annee (reference)
    *
    * @param annee - reference of ResponsabilitePedagogiqueEcoleDoctorale to be deleted
    * @return 1 if ResponsabilitePedagogiqueEcoleDoctorale deleted successfully
    */
    int deleteByAnnee(Integer annee);



}
