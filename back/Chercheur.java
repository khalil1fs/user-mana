package com.ird.faa.bean.formulaire;

import com.ird.faa.bean.referentiel.*;
import com.ird.faa.security.bean.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = Chercheur.TABLE_NAME)
public class Chercheur extends User {

    public static final String GET_ALL_CHERCHEURS_NATIVE_QUERY =  "SELECT ch.*, ville.libelle as villeLibelle, pays" +
            ".libelle as paysLibelle," +
            " sexe.libelle as sexeLibelle " +
            "FROM public.chercheur ch " +
            "LEFT JOIN  public.ville ville ON ville.id = ch.ville_id " +
            "LEFT JOIN public.pays pays ON pays.id = ch.pays_id " +
            "LEFT JOIN public.sexe sexe ON sexe.id = ch.sexe_id ";

    public static final String GET_ONE_CHERCHEURS_NATIVE_QUERY =  "SELECT ch.*, ville.libelle as villeLibelle, pays" +
            ".libelle as paysLibelle," +
            " sexe.libelle as sexeLibelle " +
            "FROM public.chercheur ch " +
            "LEFT JOIN  public.ville ville ON ville.id = ch.ville_id " +
            "LEFT JOIN public.pays pays ON pays.id = ch.pays_id " +
            "LEFT JOIN public.sexe sexe ON sexe.id = ch.sexe_id " +
            "WHERE ch.id = :id";
    public final static String TABLE_NAME = "chercheur";
    private String numeroMatricule;
    private String email;
    private String natureImplication;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String resume;
    private Boolean formationEnManagement;
    @Column(columnDefinition = "boolean default false")
    private Boolean consentementRgpd = false;
    /* debut Added fields */
    private String idGraph;
    private String civilite;
    private String intitulePoste;
    private Boolean sorgho;
    private Boolean valide;
    private String typeEffectif;
    private String domaineActivite;
    private String nomNaissance;
    private Date dateDeNaissance;
    private String lieuDeNaissance;
    private String telephone;
    private String identifiantCas;
    private String commentaireDesactivation;
    private Date dateCreation;
    private Date dateModification;
    /* fin Added fields */
    private String role;

    @ManyToOne
    private AffectationStructurelle affectationStructurelle;
    @ManyToOne
    private TypeEntiteAdministrative typeEntiteAdministrative;
    @ManyToOne
    private EntiteAdministrative entiteAdministrative;
    @ManyToOne
    private Pays pays;
    @ManyToOne
    private Pays paysAffectationGeo;
    private String villeAffectationGeo;
    @ManyToOne
    private Ville ville;
    @ManyToOne
    private DepartementScientifique departementScientifique;
    @ManyToOne
    private CommissionScientifique commissionScientifique;
    @ManyToOne
    private Grade grade;
    @ManyToOne
    private Corps corps;
    @ManyToOne
    private Sexe sexe;
    @ManyToOne
    private CategorieSalarie categorieSalarie;
    @ManyToOne
    private StatutSalarie statutSalarie;
    @ManyToOne
    private PositionStatutaire positionStatutaire;

    @OneToMany(mappedBy = "chercheur")
    private List<ChercheurEmail> chercheurEmails;
    @OneToMany(mappedBy = "chercheur")
    private List<DisciplineScientifiqueChercheur> disciplineScientifiqueChercheurs;
    @OneToMany(mappedBy = "chercheur")
    private List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches;
    @OneToMany(mappedBy = "chercheur")
    private List<EnjeuxIrdChercheur> enjeuxIrdChercheurs;
    @OneToMany(mappedBy = "chercheur")
    private List<InstrumentIrdChercheur> instrumentIrdChercheurs;
    @OneToMany(mappedBy = "chercheur")
    private List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs;
    @OneToMany(mappedBy = "chercheur")
    private List<CommunauteSavoirChercheur> communauteSavoirChercheurs;
    @OneToMany(mappedBy = "chercheur")
    private List<IdentifiantAuteurExpert> identifiantAuteurExperts;
    @OneToMany(mappedBy = "chercheur")
    private List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs;

    public Chercheur() {
        super();
    }


    public Chercheur(String username) {
        super(username);
        this.numeroMatricule = username;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroMatricule() {
        return this.numeroMatricule;
    }

    public void setNumeroMatricule(String numeroMatricule) {
        this.numeroMatricule = numeroMatricule;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TypeEntiteAdministrative getTypeEntiteAdministrative() {
        return this.typeEntiteAdministrative;
    }

    public void setTypeEntiteAdministrative(TypeEntiteAdministrative typeEntiteAdministrative) {
        this.typeEntiteAdministrative = typeEntiteAdministrative;
    }

    public EntiteAdministrative getEntiteAdministrative() {
        return this.entiteAdministrative;
    }

    public void setEntiteAdministrative(EntiteAdministrative entiteAdministrative) {
        this.entiteAdministrative = entiteAdministrative;
    }

    public Pays getPays() {
        return this.pays;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }

    public Ville getVille() {
        return this.ville;
    }

    public void setVille(Ville ville) {
        this.ville = ville;
    }

    public DepartementScientifique getDepartementScientifique() {
        return this.departementScientifique;
    }

    public void setDepartementScientifique(DepartementScientifique departementScientifique) {
        this.departementScientifique = departementScientifique;
    }

    public CommissionScientifique getCommissionScientifique() {
        return this.commissionScientifique;
    }

    public void setCommissionScientifique(CommissionScientifique commissionScientifique) {
        this.commissionScientifique = commissionScientifique;
    }

    public Grade getGrade() {
        return this.grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Corps getCorps() {
        return this.corps;
    }

    public void setCorps(Corps corps) {
        this.corps = corps;
    }

    public Sexe getSexe() {
        return this.sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public List<ZoneActiviteInteractionRecherche> getZoneActiviteInteractionRecherches() {
        return this.zoneActiviteInteractionRecherches;
    }

    public void setZoneActiviteInteractionRecherches(List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches) {
        this.zoneActiviteInteractionRecherches = zoneActiviteInteractionRecherches;
    }

    public List<CommunauteSavoirChercheur> getCommunauteSavoirChercheurs() {
        return this.communauteSavoirChercheurs;
    }

    public void setCommunauteSavoirChercheurs(List<CommunauteSavoirChercheur> communauteSavoirChercheurs) {
        this.communauteSavoirChercheurs = communauteSavoirChercheurs;
    }

    public String getNatureImplication() {
        return this.natureImplication;
    }

    public void setNatureImplication(String natureImplication) {
        this.natureImplication = natureImplication;
    }

    public List<IdentifiantAuteurExpert> getIdentifiantAuteurExperts() {
        return this.identifiantAuteurExperts;
    }

    public void setIdentifiantAuteurExperts(List<IdentifiantAuteurExpert> identifiantAuteurExperts) {
        this.identifiantAuteurExperts = identifiantAuteurExperts;
    }

    public String getResume() {
        return this.resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public Boolean getFormationEnManagement() {
        return this.formationEnManagement;
    }

    public void setFormationEnManagement(Boolean formationEnManagement) {
        this.formationEnManagement = formationEnManagement;
    }


    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chercheur chercheur = (Chercheur) o;
        return id != null && id.equals(chercheur.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


    public String getIdGraph() {
        return idGraph;
    }


    public void setIdGraph(String idGraph) {
        this.idGraph = idGraph;
    }


    public String getCivilite() {
        return civilite;
    }


    public void setCivilite(String civilite) {
        this.civilite = civilite;
    }


    public String getIntitulePoste() {
        return intitulePoste;
    }


    public void setIntitulePoste(String intitulePoste) {
        this.intitulePoste = intitulePoste;
    }


    public Boolean getSorgho() {
        return sorgho;
    }


    public void setSorgho(Boolean sorgho) {
        this.sorgho = sorgho;
    }


    public Boolean getValide() {
        return valide;
    }


    public void setValide(Boolean valide) {
        this.valide = valide;
    }


    public String getTypeEffectif() {
        return typeEffectif;
    }


    public void setTypeEffectif(String typeEffectif) {
        this.typeEffectif = typeEffectif;
    }


    public String getDomaineActivite() {
        return domaineActivite;
    }


    public void setDomaineActivite(String domaineActivite) {
        this.domaineActivite = domaineActivite;
    }


    public String getNomNaissance() {
        return nomNaissance;
    }


    public void setNomNaissance(String nomNaissance) {
        this.nomNaissance = nomNaissance;
    }


    public Date getDateDeNaissance() {
        return dateDeNaissance;
    }


    public void setDateDeNaissance(Date dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }


    public String getLieuDeNaissance() {
        return lieuDeNaissance;
    }


    public void setLieuDeNaissance(String lieuDeNaissance) {
        this.lieuDeNaissance = lieuDeNaissance;
    }


    public String getTelephone() {
        return telephone;
    }


    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }


    public String getIdentifiantCas() {
        return identifiantCas;
    }


    public void setIdentifiantCas(String identifiantCas) {
        this.identifiantCas = identifiantCas;
    }


    public String getCommentaireDesactivation() {
        return commentaireDesactivation;
    }


    public void setCommentaireDesactivation(String commentaireDesactivation) {
        this.commentaireDesactivation = commentaireDesactivation;
    }


    public Date getDateCreation() {
        return dateCreation;
    }


    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }


    public Date getDateModification() {
        return dateModification;
    }


    public void setDateModification(Date dateModification) {
        this.dateModification = dateModification;
    }


	public List<ChercheurEmail> getChercheurEmails() {
		return chercheurEmails;
	}


	public void setChercheurEmails(List<ChercheurEmail> chercheurEmails) {
		this.chercheurEmails = chercheurEmails;
	}


	public Boolean getConsentementRgpd() {
		return consentementRgpd;
	}


	public void setConsentementRgpd(Boolean consentementRgpd) {
		this.consentementRgpd = consentementRgpd;
	}


	public AffectationStructurelle getAffectationStructurelle() {
		return affectationStructurelle;
	}


	public void setAffectationStructurelle(AffectationStructurelle affectationStructurelle) {
		this.affectationStructurelle = affectationStructurelle;
	}


	public Pays getPaysAffectationGeo() {
		return paysAffectationGeo;
	}


	public void setPaysAffectationGeo(Pays paysAffectationGeo) {
		this.paysAffectationGeo = paysAffectationGeo;
	}


	public List<DisciplineScientifiqueChercheur> getDisciplineScientifiqueChercheurs() {
		return disciplineScientifiqueChercheurs;
	}


	public void setDisciplineScientifiqueChercheurs(
			List<DisciplineScientifiqueChercheur> disciplineScientifiqueChercheurs) {
		this.disciplineScientifiqueChercheurs = disciplineScientifiqueChercheurs;
	}


	public List<EnjeuxIrdChercheur> getEnjeuxIrdChercheurs() {
		return enjeuxIrdChercheurs;
	}


	public void setEnjeuxIrdChercheurs(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs) {
		this.enjeuxIrdChercheurs = enjeuxIrdChercheurs;
	}


	public List<InstrumentIrdChercheur> getInstrumentIrdChercheurs() {
		return instrumentIrdChercheurs;
	}


	public void setInstrumentIrdChercheurs(List<InstrumentIrdChercheur> instrumentIrdChercheurs) {
		this.instrumentIrdChercheurs = instrumentIrdChercheurs;
	}


	public List<TypeInstrumentIrdChercheur> getTypeInstrumentIrdChercheurs() {
		return typeInstrumentIrdChercheurs;
	}


	public void setTypeInstrumentIrdChercheurs(List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs) {
		this.typeInstrumentIrdChercheurs = typeInstrumentIrdChercheurs;
	}


	public List<DepartementScientifiqueChercheur> getDepartementScientifiqueChercheurs() {
		return departementScientifiqueChercheurs;
	}


	public void setDepartementScientifiqueChercheurs(
			List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs) {
		this.departementScientifiqueChercheurs = departementScientifiqueChercheurs;
	}


	public String getVilleAffectationGeo() {
		return villeAffectationGeo;
	}


	public void setVilleAffectationGeo(String villeAffectationGeo) {
		this.villeAffectationGeo = villeAffectationGeo;
	}


	public CategorieSalarie getCategorieSalarie() {
		return categorieSalarie;
	}


	public void setCategorieSalarie(CategorieSalarie categorieSalarie) {
		this.categorieSalarie = categorieSalarie;
	}


	public StatutSalarie getStatutSalarie() {
		return statutSalarie;
	}


	public void setStatutSalarie(StatutSalarie statutSalarie) {
		this.statutSalarie = statutSalarie;
	}


	public PositionStatutaire getPositionStatutaire() {
		return positionStatutaire;
	}


	public void setPositionStatutaire(PositionStatutaire positionStatutaire) {
		this.positionStatutaire = positionStatutaire;
	}

}

