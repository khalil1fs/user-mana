package com.ird.faa.ws.rest.provided.converter.formulaire;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.service.util.DateUtil;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.NumberUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.converter.AbstractConverter;
import com.ird.faa.ws.rest.provided.converter.referentiel.*;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import com.ird.faa.ws.rest.provided.vo.referentiel.CategorieSalarieVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChercheurConverter extends AbstractConverter<Chercheur, ChercheurVo> {

    @Autowired
    private CommunauteSavoirChercheurConverter communauteSavoirChercheurConverter;
    @Autowired
    private TypeEntiteAdministrativeConverter typeEntiteAdministrativeConverter;
    @Autowired
    private DepartementScientifiqueConverter departementScientifiqueConverter;
    @Autowired
    private ZoneActiviteInteractionRechercheConverter zoneActiviteInteractionRechercheConverter;
    @Autowired
    private GradeConverter gradeConverter;
    @Autowired
    private CorpsConverter corpsConverter;
    @Autowired
    private CommissionScientifiqueConverter commissionScientifiqueConverter;
    @Autowired
    private PaysConverter paysConverter;
    @Autowired
    private IdentifiantAuteurExpertConverter identifiantAuteurExpertConverter;
    @Autowired
    private EntiteAdministrativeConverter entiteAdministrativeConverter;
    @Autowired
    private SexeConverter sexeConverter;
    @Autowired
    private VilleConverter villeConverter;
    @Autowired
    private CategorieSalarieConverter categorieSalarieConverter;
    @Autowired
    private StatutSalarieConverter statutSalarieConverter;
    @Autowired
    private PositionStatutaireConverter positionStatutaireConverter;
    private Boolean categorieSalarie;
    private Boolean statutSalarie;
    private Boolean positionStatutaire;
    private Boolean typeEntiteAdministrative;
    private Boolean entiteAdministrative;
    private Boolean pays;
    private Boolean ville;
    private Boolean departementScientifique;
    private Boolean commissionScientifique;
    private Boolean grade;
    private Boolean corps;
    private Boolean sexe;
    private Boolean domaineScientifiqueChercheurs;
    private Boolean zoneActiviteInteractionRecherches;
    private Boolean communauteSavoirChercheurs;
    private Boolean instrumentsEtDispositifsIrdChercheurs;
    private Boolean identifiantAuteurExperts;
    @Autowired
    private ChercheurEmailConverter chercheurEmailConverter;
    @Autowired
    private AffectationStructurelleConverter affectationStructurelleConverter;
    private Boolean chercheurEmails;
    private Boolean affectationStructurelle;
    @Autowired
    private DisciplineScientifiqueChercheurConverter disciplineScientifiqueChercheurConverter;
    @Autowired
    private EnjeuxIrdChercheurConverter enjeuxIrdChercheurConverter;
    private Boolean disciplineScientifiqueChercheurs;
    private Boolean enjeuxIrdChercheurs;
    @Autowired
    private InstrumentIrdChercheurConverter instrumentIrdChercheurConverter;
    @Autowired
    private TypeInstrumentIrdChercheurConverter typeInstrumentIrdChercheurConverter;
    private Boolean instrumentIrdChercheurs;
    private Boolean typeInstrumentIrdChercheurs;
    private Boolean departementScientifiqueChercheurs;
    @Autowired
    private DepartementScientifiqueChercheurConverter departementScientifiqueChercheurConverter;

    public ChercheurConverter() {
        init(true);
    }

    @Override
    public Chercheur toItem(ChercheurVo vo) {
        if (vo == null) {
            return null;
        } else {
            Chercheur item = new Chercheur();
            if (StringUtil.isNotEmpty(vo.getId()))
                item.setId(NumberUtil.toLong(vo.getId()));
            if (vo.getConsentementRgpd() != null)
                item.setConsentementRgpd(vo.getConsentementRgpd());
            if (StringUtil.isNotEmpty(vo.getNumeroMatricule()))
                item.setNumeroMatricule(vo.getNumeroMatricule());
            if (StringUtil.isNotEmpty(vo.getEmail()))
                item.setEmail(vo.getEmail());
            if (StringUtil.isNotEmpty(vo.getNatureImplication()))
                item.setNatureImplication(vo.getNatureImplication());
            if (StringUtil.isNotEmpty(vo.getResume()))
                item.setResume(vo.getResume());
            if (StringUtil.isNotEmpty(vo.getFormationEnManagement()))
                item.setFormationEnManagement(NumberUtil.toBoolean(vo.getFormationEnManagement()));
            if (StringUtil.isNotEmpty(vo.getCredentialsNonExpired()))
                item.setCredentialsNonExpired(NumberUtil.toBoolean(vo.getCredentialsNonExpired()));
            if (StringUtil.isNotEmpty(vo.getEnabled()))
                item.setEnabled(NumberUtil.toBoolean(vo.getEnabled()));
            if (StringUtil.isNotEmpty(vo.getCreatedAt()))
                item.setDateCreation(DateUtil.parse(vo.getCreatedAt()));
            if (StringUtil.isNotEmpty(vo.getUpdatedAt()))
                item.setUpdatedAt(DateUtil.parse(vo.getUpdatedAt()));
            if (StringUtil.isNotEmpty(vo.getAccountNonExpired()))
                item.setAccountNonExpired(NumberUtil.toBoolean(vo.getAccountNonExpired()));
            if (StringUtil.isNotEmpty(vo.getAccountNonLocked()))
                item.setAccountNonLocked(NumberUtil.toBoolean(vo.getAccountNonLocked()));
            if (StringUtil.isNotEmpty(vo.getUsername()))
                item.setUsername(vo.getUsername());
            if (StringUtil.isNotEmpty(vo.getPassword()))
                item.setPassword(vo.getPassword());
            if (StringUtil.isNotEmpty(vo.getPrenom()))
                item.setPrenom(vo.getPrenom());
            if (StringUtil.isNotEmpty(vo.getNom()))
                item.setNom(vo.getNom());
            if (StringUtil.isNotEmpty(vo.getRole()))
                item.setRole(vo.getRole());
            if (StringUtil.isNotEmpty(vo.getPasswordChanged()))
                item.setPasswordChanged(NumberUtil.toBoolean(vo.getPasswordChanged()));
            if (this.typeEntiteAdministrative && vo.getTypeEntiteAdministrativeVo() != null)
                item.setTypeEntiteAdministrative(
                        typeEntiteAdministrativeConverter.toItem(vo.getTypeEntiteAdministrativeVo()));
            if (this.entiteAdministrative && vo.getEntiteAdministrativeVo() != null)
                item.setEntiteAdministrative(entiteAdministrativeConverter.toItem(vo.getEntiteAdministrativeVo()));
            if (this.pays && vo.getPaysVo() != null)
                item.setPays(paysConverter.toItem(vo.getPaysVo()));
            if (this.pays && vo.getPaysAffectationGeoVo() != null)
                item.setPaysAffectationGeo(paysConverter.toItem(vo.getPaysAffectationGeoVo()));
            if (this.ville && vo.getVilleVo() != null)
                item.setVille(villeConverter.toItem(vo.getVilleVo()));
            if (this.departementScientifique && vo.getDepartementScientifiqueVo() != null)
                item.setDepartementScientifique(
                        departementScientifiqueConverter.toItem(vo.getDepartementScientifiqueVo()));
            if (this.commissionScientifique && vo.getCommissionScientifiqueVo() != null)
                item.setCommissionScientifique(
                        commissionScientifiqueConverter.toItem(vo.getCommissionScientifiqueVo()));
            if (this.grade && vo.getGradeVo() != null)
                item.setGrade(gradeConverter.toItem(vo.getGradeVo()));
            if (this.corps && vo.getCorpsVo() != null)
                item.setCorps(corpsConverter.toItem(vo.getCorpsVo()));
            if (this.sexe && vo.getSexeVo() != null)
                item.setSexe(sexeConverter.toItem(vo.getSexeVo()));
            if (this.categorieSalarie && vo.getCategorieSalarieVo() != null) {
                item.setCategorieSalarie(categorieSalarieConverter.toItem(vo.getCategorieSalarieVo()));
            }
            if (this.statutSalarie && vo.getStatutSalarieVo() != null) {
            	item.setStatutSalarie(statutSalarieConverter.toItem(vo.getStatutSalarieVo()));
            }
            if (this.positionStatutaire && vo.getPositionStatutaireVo() != null) {
            	item.setPositionStatutaire(positionStatutaireConverter.toItem(vo.getPositionStatutaireVo()));
            }

            if (this.zoneActiviteInteractionRecherches && ListUtil.isNotEmpty(vo.getZoneActiviteInteractionRecherchesVo()))
                item.setZoneActiviteInteractionRecherches(zoneActiviteInteractionRechercheConverter.toItem(vo.getZoneActiviteInteractionRecherchesVo()));
            if (this.communauteSavoirChercheurs && ListUtil.isNotEmpty(vo.getCommunauteSavoirChercheursVo()))
                item.setCommunauteSavoirChercheurs(communauteSavoirChercheurConverter.toItem(vo.getCommunauteSavoirChercheursVo()));
            if (this.identifiantAuteurExperts && ListUtil.isNotEmpty(vo.getIdentifiantAuteurExpertsVo()))
                item.setIdentifiantAuteurExperts(
                        identifiantAuteurExpertConverter.toItem(vo.getIdentifiantAuteurExpertsVo()));
            if (this.chercheurEmails && ListUtil.isNotEmpty(vo.getChercheurEmailsVo()))
                item.setChercheurEmails(chercheurEmailConverter.toItem(vo.getChercheurEmailsVo()));

            if (this.affectationStructurelle && vo.getAffectationStructurelleVo() != null) {
                item.setAffectationStructurelle(
                        affectationStructurelleConverter.toItem(vo.getAffectationStructurelleVo()));
            }
            if (this.disciplineScientifiqueChercheurs && ListUtil.isNotEmpty(vo.getDisciplineScientifiqueChercheursVo())
            )
                item.setDisciplineScientifiqueChercheurs(
                        disciplineScientifiqueChercheurConverter.toItem(vo.getDisciplineScientifiqueChercheursVo()));
            if (this.enjeuxIrdChercheurs && ListUtil.isNotEmpty(vo.getEnjeuxIrdChercheursVo()))
                item.setEnjeuxIrdChercheurs(enjeuxIrdChercheurConverter.toItem(vo.getEnjeuxIrdChercheursVo()));
            if (this.instrumentIrdChercheurs && ListUtil.isNotEmpty(vo.getInstrumentIrdChercheursVo()))
                item.setInstrumentIrdChercheurs(
                        instrumentIrdChercheurConverter.toItem(vo.getInstrumentIrdChercheursVo()));
            if (this.typeInstrumentIrdChercheurs && ListUtil.isNotEmpty(vo.getTypeInstrumentIrdChercheursVo()))
                item.setTypeInstrumentIrdChercheurs(
                        typeInstrumentIrdChercheurConverter.toItem(vo.getTypeInstrumentIrdChercheursVo()));

            if (this.departementScientifiqueChercheurs && ListUtil.isNotEmpty(vo.getDepartementScientifiqueChercheursVo())
            )
                item.setDepartementScientifiqueChercheurs(
                        departementScientifiqueChercheurConverter.toItem(vo.getDepartementScientifiqueChercheursVo()));
            /*
             * TODO:added fields
             */
            if (StringUtil.isNotEmpty(vo.getIdGraph()))
                item.setIdGraph(vo.getIdGraph());
            if (StringUtil.isNotEmpty(vo.getCivilite()))
                item.setCivilite(vo.getCivilite());
            if (StringUtil.isNotEmpty(vo.getIntitulePoste()))
                item.setIntitulePoste(vo.getIntitulePoste());
            if (vo.getSorgho() != null)
                item.setSorgho(vo.getSorgho());
            if (vo.getValide() != null)
                item.setValide(vo.getValide());
            if (StringUtil.isNotEmpty(vo.getTypeEffectif()))
                item.setTypeEffectif(vo.getTypeEffectif());
            if (StringUtil.isNotEmpty(vo.getDomaineActivite()))
                item.setDomaineActivite(vo.getDomaineActivite());
            if (StringUtil.isNotEmpty(vo.getNomNaissance()))
                item.setNomNaissance(vo.getNomNaissance());
            if (vo.getDateDeNaissance() != null)
                item.setDateDeNaissance(vo.getDateDeNaissance());

            if (vo.getDateArchivage() != null)
                item.setDateArchivage(vo.getDateArchivage());


            item.setArchive(vo.getArchive());

            if (StringUtil.isNotEmpty(vo.getLieuDeNaissance()))
                item.setLieuDeNaissance(vo.getLieuDeNaissance());
            if (StringUtil.isNotEmpty(vo.getTelephone()))
                item.setTelephone(vo.getTelephone());
            if (StringUtil.isNotEmpty(vo.getIdentifiantCas()))
                item.setIdentifiantCas(vo.getIdentifiantCas());
            if (StringUtil.isNotEmpty(vo.getCommentaireDesactivation()))
                item.setCommentaireDesactivation(vo.getCommentaireDesactivation());
            if (vo.getDateCreation() != null)
                item.setDateCreation(vo.getDateCreation());
            if (vo.getDateModification() != null)
                item.setDateModification(vo.getDateModification());
            /* fin added fields */
            if (StringUtil.isNotEmpty(vo.getVilleAffectationGeo()))
                item.setVilleAffectationGeo(vo.getVilleAffectationGeo());

            return item;
        }
    }

    @Override
    public ChercheurVo toVo(Chercheur item) {
        if (item == null) {
            return null;
        } else {
            ChercheurVo vo = new ChercheurVo();
            if (item.getId() != null)
                vo.setId(NumberUtil.toString(item.getId()));

            if (item.getConsentementRgpd() != null)
                vo.setConsentementRgpd(item.getConsentementRgpd());

            if (StringUtil.isNotEmpty(item.getNumeroMatricule()))
                vo.setNumeroMatricule(item.getNumeroMatricule());

            if (StringUtil.isNotEmpty(item.getEmail()))
                vo.setEmail(item.getEmail());

            if (StringUtil.isNotEmpty(item.getNatureImplication()))
                vo.setNatureImplication(item.getNatureImplication());

            if (StringUtil.isNotEmpty(item.getResume()))
                vo.setResume(item.getResume());

            if (item.getFormationEnManagement() != null)
                vo.setFormationEnManagement(NumberUtil.toString(item.getFormationEnManagement()));
            vo.setCredentialsNonExpired(NumberUtil.toString(item.getCredentialsNonExpired()));
            vo.setEnabled(NumberUtil.toString(item.getEnabled()));
            vo.setArchive(item.getArchive());

            if (item.getDateCreation() != null)
                vo.setCreatedAt(DateUtil.formateDate(item.getDateCreation()));

            if (item.getDateArchivage() != null)
                vo.setDateArchivage(item.getDateArchivage());


            if (item.getUpdatedAt() != null)
                vo.setUpdatedAt(DateUtil.formateDate(item.getUpdatedAt()));

            vo.setAccountNonExpired(NumberUtil.toString(item.getAccountNonExpired()));
            vo.setAccountNonLocked(NumberUtil.toString(item.getAccountNonLocked()));
            if (StringUtil.isNotEmpty(item.getUsername()))
                vo.setUsername(item.getUsername());

            if (StringUtil.isNotEmpty(item.getPassword()))
                vo.setPassword(item.getPassword());

            if (StringUtil.isNotEmpty(item.getPrenom()))
                vo.setPrenom(item.getPrenom());

            if (StringUtil.isNotEmpty(item.getNom()))
                vo.setNom(item.getNom());

            if (StringUtil.isNotEmpty(item.getRole()))
                vo.setRole(item.getRole());

            if (this.affectationStructurelle && item.getAffectationStructurelle() != null)
                vo.setAffectationStructurelleVo(
                        affectationStructurelleConverter.toVo(item.getAffectationStructurelle()));

            vo.setPasswordChanged(NumberUtil.toString(item.getPasswordChanged()));
            if (this.typeEntiteAdministrative && item.getTypeEntiteAdministrative() != null) {
                vo.setTypeEntiteAdministrativeVo(
                        typeEntiteAdministrativeConverter.toVo(item.getTypeEntiteAdministrative()));
            }
            if (this.entiteAdministrative && item.getEntiteAdministrative() != null) {
                vo.setEntiteAdministrativeVo(entiteAdministrativeConverter.toVo(item.getEntiteAdministrative()));
            }
            if (this.pays && item.getPays() != null) {
                vo.setPaysVo(paysConverter.toVo(item.getPays()));
            }
            if (this.pays && item.getPaysAffectationGeo() != null) {
                vo.setPaysAffectationGeoVo(paysConverter.toVo(item.getPaysAffectationGeo()));
            }
            if (this.ville && item.getVille() != null) {
                vo.setVilleVo(villeConverter.toVo(item.getVille()));
            }
            if (this.departementScientifique && item.getDepartementScientifique() != null) {
                vo.setDepartementScientifiqueVo(departementScientifiqueConverter.toVo(item.getDepartementScientifique()));
            }
            if (this.commissionScientifique && item.getCommissionScientifique() != null) {
                vo.setCommissionScientifiqueVo(commissionScientifiqueConverter.toVo(item.getCommissionScientifique()));
            }
            if (this.grade && item.getGrade() != null) {
                vo.setGradeVo(gradeConverter.toVo(item.getGrade()));
            }
            if (this.corps && item.getCorps() != null) {
                vo.setCorpsVo(corpsConverter.toVo(item.getCorps()));
            }
            if (this.sexe && item.getSexe() != null) {
                vo.setSexeVo(sexeConverter.toVo(item.getSexe()));
            }
            if (this.categorieSalarie && item.getCategorieSalarie() != null) {
                vo.setCategorieSalarieVo(categorieSalarieConverter.toVo(item.getCategorieSalarie()));
            }
            if (this.statutSalarie && item.getStatutSalarie() != null) {
                vo.setStatutSalarieVo(statutSalarieConverter.toVo(item.getStatutSalarie()));
            }
            if (this.positionStatutaire && item.getPositionStatutaire() != null) {
                vo.setPositionStatutaireVo(positionStatutaireConverter.toVo(item.getPositionStatutaire()));
            }

            if (this.zoneActiviteInteractionRecherches && ListUtil.isNotEmpty(item.getZoneActiviteInteractionRecherches())
            ) {
                zoneActiviteInteractionRechercheConverter.init(true);
                zoneActiviteInteractionRechercheConverter.setChercheur(false);
                vo.setZoneActiviteInteractionRecherchesVo(
                        zoneActiviteInteractionRechercheConverter.toVo(item.getZoneActiviteInteractionRecherches()));
            }
            if (this.communauteSavoirChercheurs && ListUtil.isNotEmpty(item.getCommunauteSavoirChercheurs())) {
                communauteSavoirChercheurConverter.init(true);
                communauteSavoirChercheurConverter.setChercheur(false);
                vo.setCommunauteSavoirChercheursVo(
                        communauteSavoirChercheurConverter.toVo(item.getCommunauteSavoirChercheurs()));
            }

            if (this.identifiantAuteurExperts && ListUtil.isNotEmpty(item.getIdentifiantAuteurExperts())) {
                identifiantAuteurExpertConverter.init(true);
                identifiantAuteurExpertConverter.setChercheur(false);
                vo.setIdentifiantAuteurExpertsVo(
                        identifiantAuteurExpertConverter.toVo(item.getIdentifiantAuteurExperts()));
            }
            if (this.chercheurEmails && ListUtil.isNotEmpty(item.getChercheurEmails())) {
                chercheurEmailConverter.init(true);
                chercheurEmailConverter.setChercheur(false);
                vo.setChercheurEmailsVo(chercheurEmailConverter.toVo(item.getChercheurEmails()));
                chercheurEmailConverter.setChercheur(true);
            }
            if (this.disciplineScientifiqueChercheurs && ListUtil.isNotEmpty(item.getDisciplineScientifiqueChercheurs())
            ) {
                disciplineScientifiqueChercheurConverter.init(true);
                disciplineScientifiqueChercheurConverter.setChercheur(false);
                vo.setDisciplineScientifiqueChercheursVo(
                        disciplineScientifiqueChercheurConverter.toVo(item.getDisciplineScientifiqueChercheurs()));
                disciplineScientifiqueChercheurConverter.setChercheur(true);
            }
            if (this.enjeuxIrdChercheurs && ListUtil.isNotEmpty(item.getEnjeuxIrdChercheurs())) {
                enjeuxIrdChercheurConverter.init(true);
                enjeuxIrdChercheurConverter.setChercheur(false);
                vo.setEnjeuxIrdChercheursVo(enjeuxIrdChercheurConverter.toVo(item.getEnjeuxIrdChercheurs()));
                enjeuxIrdChercheurConverter.setChercheur(true);
            }
            if (this.instrumentIrdChercheurs && ListUtil.isNotEmpty(item.getInstrumentIrdChercheurs())) {
                instrumentIrdChercheurConverter.init(true);
                instrumentIrdChercheurConverter.setChercheur(false);
                vo.setInstrumentIrdChercheursVo(
                        instrumentIrdChercheurConverter.toVo(item.getInstrumentIrdChercheurs()));
                instrumentIrdChercheurConverter.setChercheur(true);
            }
            if (this.typeInstrumentIrdChercheurs && ListUtil.isNotEmpty(item.getTypeInstrumentIrdChercheurs())) {
                typeInstrumentIrdChercheurConverter.init(true);
                typeInstrumentIrdChercheurConverter.setChercheur(false);
                vo.setTypeInstrumentIrdChercheursVo(
                        typeInstrumentIrdChercheurConverter.toVo(item.getTypeInstrumentIrdChercheurs()));
                typeInstrumentIrdChercheurConverter.setChercheur(true);
            }
            if (this.departementScientifiqueChercheurs
                    && ListUtil.isNotEmpty(item.getDepartementScientifiqueChercheurs())) {
                departementScientifiqueChercheurConverter.init(true);
                departementScientifiqueChercheurConverter.setChercheur(false);
                vo.setDepartementScientifiqueChercheursVo(
                        departementScientifiqueChercheurConverter.toVo(item.getDepartementScientifiqueChercheurs()));
                departementScientifiqueChercheurConverter.setChercheur(true);
            }
            /*
             * TODO:added fields
             */
            if (StringUtil.isNotEmpty(item.getIdGraph()))
                vo.setIdGraph(item.getIdGraph());
            if (StringUtil.isNotEmpty(item.getCivilite()))
                vo.setCivilite(item.getCivilite());
            if (StringUtil.isNotEmpty(item.getIntitulePoste()))
                vo.setIntitulePoste(item.getIntitulePoste());
            if (item.getSorgho() != null)
                vo.setSorgho(item.getSorgho());
            if (item.getValide() != null)
                vo.setValide(item.getValide());
            if (StringUtil.isNotEmpty(item.getTypeEffectif()))
                vo.setTypeEffectif(item.getTypeEffectif());
            if (StringUtil.isNotEmpty(item.getDomaineActivite()))
                vo.setDomaineActivite(item.getDomaineActivite());
            if (StringUtil.isNotEmpty(item.getNomNaissance()))
                vo.setNomNaissance(item.getNomNaissance());
            if (item.getDateDeNaissance() != null)
                vo.setDateDeNaissance(item.getDateDeNaissance());
            if (StringUtil.isNotEmpty(item.getLieuDeNaissance()))
                vo.setLieuDeNaissance(item.getLieuDeNaissance());
            if (StringUtil.isNotEmpty(item.getTelephone()))
                vo.setTelephone(item.getTelephone());
            if (StringUtil.isNotEmpty(item.getIdentifiantCas()))
                vo.setIdentifiantCas(item.getIdentifiantCas());
            if (StringUtil.isNotEmpty(item.getCommentaireDesactivation()))
                vo.setCommentaireDesactivation(item.getCommentaireDesactivation());
            if (item.getDateCreation() != null)
                vo.setDateCreation(item.getDateCreation());
            if (item.getDateModification() != null)
                vo.setDateModification(item.getDateModification());
            /* fin added fields */
            if (StringUtil.isNotEmpty(item.getVilleAffectationGeo()))
                vo.setVilleAffectationGeo(item.getVilleAffectationGeo());
            return vo;
        }
    }

    public ChercheurVo toVoWithoutList(Chercheur item) {
        if (item == null) {
            return null;
        } else {
            ChercheurVo vo = new ChercheurVo();
            if (item.getId() != null)
                vo.setId(NumberUtil.toString(item.getId()));
            if (StringUtil.isNotEmpty(item.getNumeroMatricule()))
                vo.setNumeroMatricule(item.getNumeroMatricule());

            if (StringUtil.isNotEmpty(item.getEmail()))
                vo.setEmail(item.getEmail());

            if (StringUtil.isNotEmpty(item.getNatureImplication()))
                vo.setNatureImplication(item.getNatureImplication());

            if (StringUtil.isNotEmpty(item.getResume()))
                vo.setResume(item.getResume());

            if (item.getFormationEnManagement() != null)
                vo.setFormationEnManagement(NumberUtil.toString(item.getFormationEnManagement()));
            vo.setCredentialsNonExpired(NumberUtil.toString(item.getCredentialsNonExpired()));
            vo.setEnabled(NumberUtil.toString(item.getEnabled()));
            if (item.getDateCreation() != null)
                vo.setCreatedAt(DateUtil.formateDate(item.getDateCreation()));
            if (item.getUpdatedAt() != null)
                vo.setUpdatedAt(DateUtil.formateDate(item.getUpdatedAt()));
            vo.setAccountNonExpired(NumberUtil.toString(item.getAccountNonExpired()));
            vo.setAccountNonLocked(NumberUtil.toString(item.getAccountNonLocked()));
            if (StringUtil.isNotEmpty(item.getUsername()))
                vo.setUsername(item.getUsername());

            if (StringUtil.isNotEmpty(item.getPassword()))
                vo.setPassword(item.getPassword());

            if (StringUtil.isNotEmpty(item.getPrenom()))
                vo.setPrenom(item.getPrenom());

            if (StringUtil.isNotEmpty(item.getNom()))
                vo.setNom(item.getNom());

            vo.setPasswordChanged(NumberUtil.toString(item.getPasswordChanged()));
            if (item.getTypeEntiteAdministrative() != null && this.typeEntiteAdministrative) {
                vo.setTypeEntiteAdministrativeVo(typeEntiteAdministrativeConverter.toVo(item.getTypeEntiteAdministrative()));
            }
            if (item.getEntiteAdministrative() != null && this.entiteAdministrative) {
                vo.setEntiteAdministrativeVo(entiteAdministrativeConverter.toVo(item.getEntiteAdministrative()));
            }
            if (item.getPays() != null && this.pays) {
                vo.setPaysVo(paysConverter.toVo(item.getPays()));
            }
            if (item.getVille() != null && this.ville) {
                vo.setVilleVo(villeConverter.toVo(item.getVille()));
            }
            if (item.getDepartementScientifique() != null && this.departementScientifique) {
                vo.setDepartementScientifiqueVo(departementScientifiqueConverter.toVo(item.getDepartementScientifique()));
            }
            if (item.getCommissionScientifique() != null && this.commissionScientifique) {
                vo.setCommissionScientifiqueVo(commissionScientifiqueConverter.toVo(item.getCommissionScientifique()));
            }
            if (item.getGrade() != null && this.grade) {
                vo.setGradeVo(gradeConverter.toVo(item.getGrade()));
            }
            if (item.getCorps() != null && this.corps) {
                vo.setCorpsVo(corpsConverter.toVo(item.getCorps()));
            }
            if (item.getSexe() != null && this.sexe) {
                vo.setSexeVo(sexeConverter.toVo(item.getSexe()));
            }

            /*
             * TODO:added fields
             */
            if (StringUtil.isNotEmpty(item.getIdGraph()))
                vo.setIdGraph(item.getIdGraph());
            if (StringUtil.isNotEmpty(item.getCivilite()))
                vo.setCivilite(item.getCivilite());
            if (StringUtil.isNotEmpty(item.getIntitulePoste()))
                vo.setIntitulePoste(item.getIntitulePoste());
            if (item.getSorgho() != null)
                vo.setSorgho(item.getSorgho());
            if (item.getValide() != null)
                vo.setValide(item.getValide());
            if (StringUtil.isNotEmpty(item.getTypeEffectif()))
                vo.setTypeEffectif(item.getTypeEffectif());
            if (StringUtil.isNotEmpty(item.getDomaineActivite()))
                vo.setDomaineActivite(item.getDomaineActivite());
            if (StringUtil.isNotEmpty(item.getNomNaissance()))
                vo.setNomNaissance(item.getNomNaissance());
            if (item.getDateDeNaissance() != null)
                vo.setDateDeNaissance(item.getDateDeNaissance());
            if (StringUtil.isNotEmpty(item.getLieuDeNaissance()))
                vo.setLieuDeNaissance(item.getLieuDeNaissance());
            if (StringUtil.isNotEmpty(item.getTelephone()))
                vo.setTelephone(item.getTelephone());
            if (StringUtil.isNotEmpty(item.getIdentifiantCas()))
                vo.setIdentifiantCas(item.getIdentifiantCas());
            if (StringUtil.isNotEmpty(item.getCommentaireDesactivation()))
                vo.setCommentaireDesactivation(item.getCommentaireDesactivation());
            if (item.getDateCreation() != null)
                vo.setDateCreation(item.getDateCreation());
            if (item.getDateModification() != null)
                vo.setDateModification(item.getDateModification());
            /*fin added fields*/
            if (StringUtil.isNotEmpty(item.getVilleAffectationGeo()))
                vo.setVilleAffectationGeo(item.getVilleAffectationGeo());
            return vo;
        }
    }


    public void init(Boolean value) {
        typeEntiteAdministrative = value;
        disciplineScientifiqueChercheurs = value;
        entiteAdministrative = value;
        pays = value;
        ville = value;
        departementScientifique = value;
        commissionScientifique = value;
        grade = value;
        corps = value;
        sexe = value;
        domaineScientifiqueChercheurs = value;
        zoneActiviteInteractionRecherches = value;
        communauteSavoirChercheurs = value;
        instrumentsEtDispositifsIrdChercheurs = value;
        identifiantAuteurExperts = value;
        chercheurEmails = value;
        affectationStructurelle = value;
        enjeuxIrdChercheurs = value;
        instrumentIrdChercheurs = value;
        typeInstrumentIrdChercheurs = value;
        departementScientifiqueChercheurs = value;
        categorieSalarie= value;
        statutSalarie= value;
        positionStatutaire= value;
    }

    public void initList(Boolean value) {
        zoneActiviteInteractionRecherches = value;
        communauteSavoirChercheurs = value;
        identifiantAuteurExperts = value;
        chercheurEmails = value;
        disciplineScientifiqueChercheurs = value;
        enjeuxIrdChercheurs = value;
        instrumentIrdChercheurs = value;
        typeInstrumentIrdChercheurs = value;
        departementScientifiqueChercheurs = value;
    }

    public CommunauteSavoirChercheurConverter getCommunauteSavoirChercheurConverter() {
        return this.communauteSavoirChercheurConverter;
    }

    public void setCommunauteSavoirChercheurConverter(
            CommunauteSavoirChercheurConverter communauteSavoirChercheurConverter) {
        this.communauteSavoirChercheurConverter = communauteSavoirChercheurConverter;
    }

    public TypeEntiteAdministrativeConverter getTypeEntiteAdministrativeConverter() {
        return this.typeEntiteAdministrativeConverter;
    }

    public void setTypeEntiteAdministrativeConverter(
            TypeEntiteAdministrativeConverter typeEntiteAdministrativeConverter) {
        this.typeEntiteAdministrativeConverter = typeEntiteAdministrativeConverter;
    }

    public DepartementScientifiqueConverter getDepartementScientifiqueConverter() {
        return this.departementScientifiqueConverter;
    }

    public void setDepartementScientifiqueConverter(DepartementScientifiqueConverter departementScientifiqueConverter) {
        this.departementScientifiqueConverter = departementScientifiqueConverter;
    }

    public ZoneActiviteInteractionRechercheConverter getZoneActiviteInteractionRechercheConverter() {
        return this.zoneActiviteInteractionRechercheConverter;
    }

    public void setZoneActiviteInteractionRechercheConverter(
            ZoneActiviteInteractionRechercheConverter zoneActiviteInteractionRechercheConverter) {
        this.zoneActiviteInteractionRechercheConverter = zoneActiviteInteractionRechercheConverter;
    }

    public GradeConverter getGradeConverter() {
        return this.gradeConverter;
    }

    public void setGradeConverter(GradeConverter gradeConverter) {
        this.gradeConverter = gradeConverter;
    }

    public CorpsConverter getCorpsConverter() {
        return this.corpsConverter;
    }

    public void setCorpsConverter(CorpsConverter corpsConverter) {
        this.corpsConverter = corpsConverter;
    }

    public CommissionScientifiqueConverter getCommissionScientifiqueConverter() {
        return this.commissionScientifiqueConverter;
    }

    public void setCommissionScientifiqueConverter(CommissionScientifiqueConverter commissionScientifiqueConverter) {
        this.commissionScientifiqueConverter = commissionScientifiqueConverter;
    }

    public PaysConverter getPaysConverter() {
        return this.paysConverter;
    }

    public void setPaysConverter(PaysConverter paysConverter) {
        this.paysConverter = paysConverter;
    }

    public IdentifiantAuteurExpertConverter getIdentifiantAuteurExpertConverter() {
        return this.identifiantAuteurExpertConverter;
    }

    public void setIdentifiantAuteurExpertConverter(IdentifiantAuteurExpertConverter identifiantAuteurExpertConverter) {
        this.identifiantAuteurExpertConverter = identifiantAuteurExpertConverter;
    }

    public EntiteAdministrativeConverter getEntiteAdministrativeConverter() {
        return this.entiteAdministrativeConverter;
    }

    public void setEntiteAdministrativeConverter(EntiteAdministrativeConverter entiteAdministrativeConverter) {
        this.entiteAdministrativeConverter = entiteAdministrativeConverter;
    }

    public SexeConverter getSexeConverter() {
        return this.sexeConverter;
    }

    public void setSexeConverter(SexeConverter sexeConverter) {
        this.sexeConverter = sexeConverter;
    }

    public VilleConverter getVilleConverter() {
        return this.villeConverter;
    }

    public void setVilleConverter(VilleConverter villeConverter) {
        this.villeConverter = villeConverter;
    }

    public boolean isTypeEntiteAdministrative() {
        return this.typeEntiteAdministrative;
    }

    public void setTypeEntiteAdministrative(boolean typeEntiteAdministrative) {
        this.typeEntiteAdministrative = typeEntiteAdministrative;
    }

    public boolean isEntiteAdministrative() {
        return this.entiteAdministrative;
    }

    public void setEntiteAdministrative(boolean entiteAdministrative) {
        this.entiteAdministrative = entiteAdministrative;
    }

    public boolean isPays() {
        return this.pays;
    }

    public void setPays(boolean pays) {
        this.pays = pays;
    }

    public boolean isVille() {
        return this.ville;
    }

    public void setVille(boolean ville) {
        this.ville = ville;
    }

    public boolean isDepartementScientifique() {
        return this.departementScientifique;
    }

    public void setDepartementScientifique(boolean departementScientifique) {
        this.departementScientifique = departementScientifique;
    }

    public boolean isCommissionScientifique() {
        return this.commissionScientifique;
    }

    public void setCommissionScientifique(boolean commissionScientifique) {
        this.commissionScientifique = commissionScientifique;
    }

    public boolean isGrade() {
        return this.grade;
    }

    public void setGrade(boolean grade) {
        this.grade = grade;
    }

    public boolean isCorps() {
        return this.corps;
    }

    public void setCorps(boolean corps) {
        this.corps = corps;
    }

    public boolean isSexe() {
        return this.sexe;
    }

    public void setSexe(boolean sexe) {
        this.sexe = sexe;
    }

    public Boolean isDomaineScientifiqueChercheurs() {
        return this.domaineScientifiqueChercheurs;
    }

    public void setDomaineScientifiqueChercheurs(Boolean domaineScientifiqueChercheurs) {
        this.domaineScientifiqueChercheurs = domaineScientifiqueChercheurs;
    }

    public Boolean isZoneActiviteInteractionRecherches() {
        return this.zoneActiviteInteractionRecherches;
    }

    public void setZoneActiviteInteractionRecherches(Boolean zoneActiviteInteractionRecherches) {
        this.zoneActiviteInteractionRecherches = zoneActiviteInteractionRecherches;
    }

    public Boolean isCommunauteSavoirChercheurs() {
        return this.communauteSavoirChercheurs;
    }

    public void setCommunauteSavoirChercheurs(Boolean communauteSavoirChercheurs) {
        this.communauteSavoirChercheurs = communauteSavoirChercheurs;
    }

    public Boolean isInstrumentsEtDispositifsIrdChercheurs() {
        return this.instrumentsEtDispositifsIrdChercheurs;
    }

    public void setInstrumentsEtDispositifsIrdChercheurs(Boolean instrumentsEtDispositifsIrdChercheurs) {
        this.instrumentsEtDispositifsIrdChercheurs = instrumentsEtDispositifsIrdChercheurs;
    }

    public Boolean isIdentifiantAuteurExperts() {
        return this.identifiantAuteurExperts;
    }

    public void setIdentifiantAuteurExperts(Boolean identifiantAuteurExperts) {
        this.identifiantAuteurExperts = identifiantAuteurExperts;
    }

    public Boolean getChercheurEmails() {
        return chercheurEmails;
    }

    public void setChercheurEmails(Boolean chercheurEmails) {
        this.chercheurEmails = chercheurEmails;
    }

    public Boolean getAffectationStructurelle() {
        return affectationStructurelle;
    }

    public void setAffectationStructurelle(Boolean affectationStructurelle) {
        this.affectationStructurelle = affectationStructurelle;
    }

    public Boolean getDisciplineScientifiqueChercheurs() {
        return disciplineScientifiqueChercheurs;
    }

    public void setDisciplineScientifiqueChercheurs(Boolean disciplineScientifiqueChercheurs) {
        this.disciplineScientifiqueChercheurs = disciplineScientifiqueChercheurs;
    }

    public Boolean isEnjeuxIrdChercheurs() {
        return this.enjeuxIrdChercheurs;
    }

    public void setEnjeuxIrdChercheurs(Boolean enjeuxIrdChercheurs) {
        this.enjeuxIrdChercheurs = enjeuxIrdChercheurs;
    }

    public Boolean getInstrumentIrdChercheurs() {
        return instrumentIrdChercheurs;
    }

    public void setInstrumentIrdChercheurs(Boolean instrumentIrdChercheurs) {
        this.instrumentIrdChercheurs = instrumentIrdChercheurs;
    }

    public Boolean getTypeInstrumentIrdChercheurs() {
        return typeInstrumentIrdChercheurs;
    }

    public void setTypeInstrumentIrdChercheurs(Boolean typeInstrumentIrdChercheurs) {
        this.typeInstrumentIrdChercheurs = typeInstrumentIrdChercheurs;
    }

	public Boolean getDepartementScientifiqueChercheurs() {
		return departementScientifiqueChercheurs;
	}

	public void setDepartementScientifiqueChercheurs(boolean departementScientifiqueChercheurs) {
		this.departementScientifiqueChercheurs = departementScientifiqueChercheurs;
	}

}
