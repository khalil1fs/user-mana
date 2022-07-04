import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

import {LoginAdminComponent} from './login-admin/login-admin.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';

import {
    OutilFormationContinueAdminComponent
} from './view/referentiel/outil-formation-continue-admin/outil-formation-continue-admin.component';


import {
    FinancementDoctorantAdminComponent
} from './view/referentiel/financement-doctorant-admin/financement-doctorant-admin.component';


import {GradeAdminComponent} from './view/referentiel/grade-admin/grade-admin.component';


import {
    EncadrementDoctorantAdminComponent
} from './view/formulaire/encadrement-doctorant-admin/encadrement-doctorant-admin.component';


import {PublicCibleAdminComponent} from './view/referentiel/public-cible-admin/public-cible-admin.component';


import {
    FormationContinueAdminComponent
} from './view/formulaire/formation-continue-admin/formation-continue-admin.component';


import {PaysAdminComponent} from './view/referentiel/pays-admin/pays-admin.component';


import {
    TemplateRelanceAdminComponent
} from './view/referentiel/template-relance-admin/template-relance-admin.component';


import {
    MasterInternationalAdminComponent
} from './view/referentiel/master-international-admin/master-international-admin.component';


import {
    DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/dev-sav-innov-sci-admin';


import {TypeExpertAdminComponent} from './view/referentiel/type-expert-admin/type-expert-admin.component';


import {
    IdentifiantAuteurExpertAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/identifiant-auteur-expert-admin.component';


import {
    CampagneChercheurAdminComponent
} from './view/formulaire/campagne-chercheur-admin/campagne-chercheur-admin.component';


import {
    VieInstitutionnelleAdminComponent
} from './view/formulaire/vie-institutionnelle-admin/vie-institutionnelle-admin.component';


import {CommunauteSavoirChercheurAdminComponent} from './view/formulaire/cosav-chercheur-admin/cosav-chercheur-admin';


import {EcoleDoctoraleAdminComponent} from './view/formulaire/ecole-doctorale-admin/ecole-doctorale-admin.component';


import {EtablissementAdminComponent} from './view/referentiel/etablissement-admin/etablissement-admin.component';


import {ModeDiffusionAdminComponent} from './view/referentiel/mode-diffusion-admin/mode-diffusion-admin.component';


import {
    EncadrementEtudiantAdminComponent
} from './view/formulaire/encadrement-etudiant-admin/encadrement-etudiant-admin.component';


import {
    TemplateClotureAdminComponent
} from './view/referentiel/template-cloture-admin/template-cloture-admin.component';


import {InstitutionAdminComponent} from './view/referentiel/institution-admin/institution-admin.component';


import {EnjeuxIrdAdminComponent} from './view/referentiel/enjeux-ird-admin/enjeux-ird-admin.component';


import {EtatReclamationAdminComponent} from './view/config/etat-reclamation-admin/etat-reclamation-admin.component';


import {
    CultureScientifiqueRecontreGrandPublicJeunePublicAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/culture-sci-recontre-gpjp-admin.component';


import {EtudiantAdminComponent} from './view/formulaire/etudiant-admin/etudiant-admin.component';


import {
    EtatEtapeCampagneAdminComponent
} from './view/config/etat-etape-campagne-admin/etat-etape-campagne-admin.component';


import {EtatCampagneAdminComponent} from './view/config/etat-campagne-admin/etat-campagne-admin.component';


import {
    IdentifiantRechercheAdminComponent
} from './view/referentiel/identifiant-recherche-admin/identifiant-recherche-admin.component';


import {
    TypeInstrumentsEtDispositifsIrdAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/type-instruments-et-dispositifs-ird-admin.component';


import {
    PubliquePrincipalAdminComponent
} from './view/referentiel/publique-principal-admin/publique-principal-admin.component';


import {DoctorantAdminComponent} from './view/formulaire/doctorant-admin/doctorant-admin.component';


import {ObjetGlobalAdminComponent} from './view/referentiel/objet-global-admin/objet-global-admin.component';


import {
    ModaliteFormationContinueAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/modalite-formation-continue-admin.component';


import {FormatRencontreAdminComponent} from './view/formulaire/format-rencontre-admin/format-rencontre-admin.component';


import {VilleAdminComponent} from './view/referentiel/ville-admin/ville-admin.component';


import {StatusProjetAdminComponent} from './view/referentiel/status-projet-admin/status-projet-admin.component';


import {ContinentAdminComponent} from './view/referentiel/continent-admin/continent-admin.component';


import {
    StatutEcoleDoctoraleAdminComponent
} from './view/referentiel/statut-ecole-doctorale-admin/statut-ecole-doctorale-admin.component';


import {
    FournisseurAppelProjetRechercheAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/four-appel-prj-recherche-admin.component';


import {ModaliteAdminComponent} from './view/referentiel/modalite-admin/modalite-admin.component';


import {CaracterisationAdminComponent} from './view/referentiel/caracterisation-admin/caracterisation-admin.component';


import {
    TypeReclamationAdminComponent
} from './view/referentiel/type-reclamation-admin/type-reclamation-admin.component';


import {
    CommunauteSavoirAdminComponent
} from './view/referentiel/communaute-savoir-admin/communaute-savoir-admin.component';


import {
    TypeEnseignementDispenseAdminComponent
} from './view/referentiel/type-enseig-disp-admin/type-enseignement-dispense-admin.component';


import {
    EtablissementProjetAdminComponent
} from './view/formulaire/etablissement-projet-admin/etablissement-projet-admin.component';


import {EnseignementAdminComponent} from './view/formulaire/enseignement-admin/enseignement-admin.component';


import {BourseAdminComponent} from './view/formulaire/bourse-admin/bourse-admin.component';


import {
    EntiteAdministrativeAdminComponent
} from './view/referentiel/entite-administrative-admin/entite-administrative-admin.component';


import {GestionEquipeAdminComponent} from './view/formulaire/gestion-equipe-admin/gestion-equipe-admin.component';


import {DistinctionAdminComponent} from './view/formulaire/distinction-admin/distinction-admin.component';


import {
    NiveauFormationAdminComponent
} from './view/referentiel/niveau-formation-admin/niveau-formation-admin.component';


import {CultureSciOutilPedaAdmin} from './view/formulaire/culture-sci-outil-peda-admin/culture-sci-outil-peda-admin';


import {CategorieFaqAdminComponent} from './view/formulaire/categorie-faq-admin/categorie-faq-admin.component';


import {
    TemplateOuvertureAdminComponent
} from './view/referentiel/template-ouverture-admin/template-ouverture-admin.component';


import {StatutMasterAdminComponent} from './view/referentiel/statut-master-admin/statut-master-admin.component';


import {ReclamationAdminComponent} from './view/formulaire/reclamation-admin/reclamation-admin.component';


import {RoleProjetAdminComponent} from './view/referentiel/role-projet-admin/role-projet-admin.component';


import {TypeExpertiseAdminComponent} from './view/referentiel/type-expertise-admin/type-expertise-admin.component';


import {NationaliteAdminComponent} from './view/referentiel/nationalite-admin/nationalite-admin.component';


import {
    DepartementScientifiqueAdminComponent
} from './view/formulaire/departement-scientifique-admin/departement-scientifique-admin.component';


import {NiveauEtudeAdminComponent} from './view/referentiel/niveau-etude-admin/niveau-etude-admin.component';


import {TypeInstanceAdminComponent} from './view/referentiel/type-instance-admin/type-instance-admin.component';


import {NatureEtudeAdminComponent} from './view/referentiel/nature-etude-admin/nature-etude-admin.component';


import {ContexteAdminComponent} from './view/referentiel/contexte-admin/contexte-admin.component';


import {
    EvaluationEncadrementAdminComponent
} from './view/referentiel/evaluation-encadrement-admin/evaluation-encadrement-admin.component';


import {MasterAdminComponent} from './view/referentiel/master-admin/master-admin.component';


import {TypeSavoirAdminComponent} from './view/referentiel/type-savoir-admin/type-savoir-admin.component';


import {
    RespPedEcoleDoctoraleAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/resp-ped-ecole-doctorale-admin.component';


import {
    DomaineScientifiqueAdminComponent
} from './view/formulaire/domaine-scientifique-admin/domaine-scientifique-admin.component';


import {
    TypeEntiteAdministrativeAdminComponent
} from './view/referentiel/type-entite-administrative-admin/type-entite-administrative-admin.component';


import {CorpsAdminComponent} from './view/referentiel/corps-admin/corps-admin.component';


import {SexeAdminComponent} from './view/referentiel/sexe-admin/sexe-admin.component';


import {ModaliteEtudeAdminComponent} from './view/referentiel/modalite-etude-admin/modalite-etude-admin.component';


import {TemplateRappelAdminComponent} from './view/referentiel/template-rappel-admin/template-rappel-admin.component';


import {TypeOutilAdminComponent} from './view/referentiel/type-outil-admin/type-outil-admin.component';


import {FaqAdminComponent} from './view/formulaire/faq-admin/faq-admin.component';


import {ChercheurAdminComponent} from './view/formulaire/chercheur-admin/chercheur-admin.component';


import {
    ExpertiseScientifiqueAdminComponent
} from './view/formulaire/expertise-scientifique-admin/expertise-scientifique-admin.component';


import {CampagneAdminComponent} from './view/formulaire/campagne-admin/campagne-admin.component';


import {
    EtatCampagneChercheurAdminComponent
} from './view/config/etat-campagne-chercheur-admin/etat-campagne-chercheur-admin.component';
import {FaqVisualisationAdminComponent} from './view/formulaire/faq-visualisation/faq-chercheur.component';
import {
    CampagneCreateAdminComponent
} from './view/formulaire/campagne-admin/create-admin/campagne-create-admin.component';
import {EmailRelanceComponent} from './view/formulaire/campagne-admin/email-relance/email-relance.component';
import {
    EmailRelanceDetailsComponent
} from './view/formulaire/campagne-admin/email-relance/email-relance-details/email-relance-details.component';
import {
    SwitchChercheurAdminComponent
} from './view/formulaire/chercheur-admin/switch_chercheur/switch-chercheur-admin.component';
import {InstrumentIrdAdminComponent} from './view/referentiel/instrument-ird-admin/instrument-ird-admin.component';
import {
    TypeInstrumentIrdAdminComponent
} from './view/referentiel/type-instrument-ird-admin/type-instrument-ird-admin.component';
import {LangueAdminComponent} from './view/referentiel/langue-admin/langue-admin.component';
import {TypePubliqueAdminComponent} from './view/referentiel/type-publique-admin/type-publique-admin.component';
import {
    TypeParticipationAdminComponent
} from './view/referentiel/type-participation-admin/type-participation-admin.component';
import {
    ZoneGeographiqueAdminComponent
} from './view/referentiel/zone-geographique-admin/zone-geographique-admin.component';
import {
    DisciplineScientifiqueErcAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/discipline-scientifique-erc-admin.component';
import {KeyWordAdminComponent} from './view/referentiel/key-word-admin/key-word-admin.component';
import {
    SemanticRelationshipAdminComponent
} from './view/referentiel/semantic-relationship-admin/semantic-relationship-admin.component';
import {
    DisciplineScientifiqueAdminComponent
} from './view/referentiel/discipline-scientifique-admin/discipline-scientifique-admin.component';
import {
    CommanditaireListAdminComponent
} from './view/referentiel/commanditaire-admin/list-admin/commanditaire-list-admin.component';
import {CampagneViewAdminComponent} from './view/formulaire/campagne-admin/view-admin/campagne-view-admin.component';
import {CampagneEditAdminComponent} from './view/formulaire/campagne-admin/edit-admin/campagne-edit-admin.component';
import {
    AffectationStructurelleListAdminComponent
} from './view/referentiel/affectation-structurelle-admin/list-admin/affectation-structurelle-list-admin.component';
import {
    EtablissementPartenaireListAdminComponent
} from './view/referentiel/etablissement-partenaire-admin/list-admin/etablissement-partenaire-list-admin.component';
import {
    NatureActiviteGrandPubliqueListAdminComponent
} from './view/referentiel/nature-activite-grand-publique-admin/list-admin/nature-activite-grand-publique-list-admin.component';
import {
    OrganismeListAdminComponent
} from './view/referentiel/organisme-admin/list-admin/organisme-list-admin.component';
import {
    ResponsabiliteEncadrementEtudiantListAdminComponent
} from './view/referentiel/resp-encad-etud-admin/list-admin/resp-encad-etud-list-admin.component';
import {
    RoleEvaluationRechercheUniversitaireListAdminComponent
} from './view/referentiel/role-eval-rech-uni-admin/list-admin/role-eval-rech-uni-list-admin.component';
import {
    TypeUtilisateurListAdminComponent
} from './view/referentiel/type-utilisateur-admin/list-admin/type-utilisateur-list-admin.component';
import {
    EvalRechercheUnivAdminComponent
} from './view/formulaire/eval-recherche-univ-admin/eval-recherche-univ-admin.component';
import {
    VieInstitutionnelleDetailAdminComponent
} from './view/formulaire/vie-inst-detail-admin/vie-inst-detail-admin.component';
import {
    ConseilEtComiteScientifiqueAdminComponent
} from './view/formulaire/conseil-comite-sci-admin/conseil-comite-sci-admin.component';
import {
    EvenementColloqueScienntifiqueAdminComponent
} from './view/formulaire/evm-colloque-sci-admin/evm-colloque-sci-admin.component';
import {
    ResponsabilitePedagogiqueMasterAdminComponent
} from './view/formulaire/resp-ped-master-admin/resp-ped-master-admin.component';
import {CommissionScientifiqueAdminComponent} from './view/formulaire/commis-scien-admin/commis-scien-admin.component';
import {
    ResponsabiliteEncadrementDoctorantListAdminComponent
} from './view/referentiel/res-enca-doc-admin/list-admin/res-enca-doc-list-admin.component';
import {
    KeyWordDisciplineScientifiqueErcAdminComponent
} from './view/referentiel/kw-d-sc-erc-admin/kw-d-sc-erc-admin.component';
import {
    PartenaireListAdminComponent
} from './view/referentiel/partenaire-admin/list-admin/partenaire-list-admin.component';
import {
    NatureEnseignementListAdminComponent
} from './view/referentiel/nature-enseignement-admin/list-admin/nature-enseignement-list-admin.component';
import {
    NiveauFormationPostBacListAdminComponent
} from './view/referentiel/niveau-formation-post-bac-admin/list-admin/niveau-formation-post-bac-list-admin.component';
import {
    NiveauRespPedListAdminComponent
} from './view/referentiel/niveau-resp-ped-admin/list-admin/niveau-resp-ped-list-admin.component';
import {
    ObjetFormationGeneriqueListAdminComponent
} from './view/referentiel/objet-formation-generique-admin/list-admin/objet-formation-generique-list-admin.component';
import {
    RoleDeveloppementDeSavoirListAdminComponent
} from './view/referentiel/role-dev-de-savoir-admin/list-admin/role-dev-de-savoir-list-admin.component';
import {
    StatusContratEtConventionListAdminComponent
} from './view/referentiel/status-cont-conv-admin/list-admin/status-cont-conv-list-admin.component';
import {
    StatusCursusListAdminComponent
} from './view/referentiel/status-cursus-admin/list-admin/status-cursus-list-admin.component';
import {
    StructureIrdListAdminComponent
} from './view/referentiel/structure-ird-admin/list-admin/structure-ird-list-admin.component';
import {
    TypeEtudeListAdminComponent
} from './view/referentiel/type-etude-admin/list-admin/type-etude-list-admin.component';
import {
    PubliquePrincipalListAdminComponent
} from './view/referentiel/publique-principal-admin/list-admin/publique-principal-list-admin.component';
import {
    ModaliteInterventionListAdminComponent
} from './view/referentiel/modalite-intervention-admin/list-admin/modalite-intervention-list-admin.component';
import {PiloteDeDonneesListAdminComponent} from './view/formulaire/pilote-de-donnees-list-admin/pilote-de-donnees-list-admin.component';
import {UserAppComponent} from './view/user-app/user-app.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilFormationContinueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'user-app',
                            children: [
                                {
                                    path: '',
                                    component: UserAppComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'financement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: FinancementDoctorantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'commanditaire',
                            children: [
                                {
                                    path: 'list',
                                    component: CommanditaireListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'grade',
                            children: [
                                {
                                    path: 'list',
                                    component: GradeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementDoctorantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'public-cible',
                            children: [
                                {
                                    path: 'list',
                                    component: PublicCibleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'affectation-structurelle',
                            children: [
                                {
                                    path: 'list',
                                    component: AffectationStructurelleListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'pays',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'template-relance',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateRelanceAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'conseil-et-comite-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ConseilEtComiteScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-partenaire',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementPartenaireListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'partenaire',
                            children: [
                                {
                                    path: 'list',
                                    component: PartenaireListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'nature-enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: NatureEnseignementListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-formation-post-bac',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauFormationPostBacListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-responsabilite-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauRespPedListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'objet-formation-generique',
                            children: [
                                {
                                    path: 'list',
                                    component: ObjetFormationGeneriqueListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role-developpement-de-savoir',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleDeveloppementDeSavoirListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'status-contrat-et-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: StatusContratEtConventionListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'status-cursus',
                            children: [
                                {
                                    path: 'list',
                                    component: StatusCursusListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'structure-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: StructureIrdListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'type-utilisateur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeUtilisateurListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'type-etude',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEtudeListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },


                        {

                            path: 'evenement-colloque-scienntifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EvenementColloqueScienntifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-encadrement-etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabiliteEncadrementEtudiantListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'master-international',
                            children: [
                                {
                                    path: 'list',
                                    component: MasterInternationalAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-expert',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeExpertAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'identifiant-auteur-expert',
                            children: [
                                {
                                    path: 'list',
                                    component: IdentifiantAuteurExpertAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'vie-institutionnelle',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'vie-institutionnelle-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleDetailAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'ecole-doctorale',
                            children: [
                                {
                                    path: 'list',
                                    component: EcoleDoctoraleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'mode-diffusion',
                            children: [
                                {
                                    path: 'list',
                                    component: ModeDiffusionAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementEtudiantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'template-cloture',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateClotureAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'institution',
                            children: [
                                {
                                    path: 'list',
                                    component: InstitutionAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique-master',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabilitePedagogiqueMasterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'culture-scientifique-recontre-grand-public-jeune-public',
                            children: [
                                {
                                    path: 'list',
                                    component: CultureScientifiqueRecontreGrandPublicJeunePublicAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'publique-professionel',
                            children: [
                                {
                                    path: 'list',
                                    component: PubliquePrincipalListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: EtudiantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-etape-campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatEtapeCampagneAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCampagneAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'identifiant-recherche',
                            children: [
                                {
                                    path: 'list',
                                    component: IdentifiantRechercheAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-instruments-et-dispositifs-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstrumentsEtDispositifsIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'type-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstrumentIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabiliteEncadrementDoctorantListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'publique-principal',
                            children: [
                                {
                                    path: 'list',
                                    component: PubliquePrincipalAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: DoctorantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'objet-global',
                            children: [
                                {
                                    path: 'list',
                                    component: ObjetGlobalAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'evaluation-recherche-universitaire',
                            children: [
                                {
                                    path: 'list',
                                    component: EvalRechercheUnivAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'modalite-formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: ModaliteFormationContinueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'modalite-intervention',
                            children: [
                                {
                                    path: 'list',
                                    component: ModaliteInterventionListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'format-rencontre',
                            children: [
                                {
                                    path: 'list',
                                    component: FormatRencontreAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'status-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: StatusProjetAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'continent',
                            children: [
                                {
                                    path: 'list',
                                    component: ContinentAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'statut-ecole-doctorale',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutEcoleDoctoraleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'fournisseur-appel-projet-recherche',
                            children: [
                                {
                                    path: 'list',
                                    component: FournisseurAppelProjetRechercheAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'modalite',
                            children: [
                                {
                                    path: 'list',
                                    component: ModaliteAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'caracterisation',
                            children: [
                                {
                                    path: 'list',
                                    component: CaracterisationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeReclamationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-enseignement-dispense',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEnseignementDispenseAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementProjetAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'bourse',
                            children: [
                                {
                                    path: 'list',
                                    component: BourseAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'entite-administrative',
                            children: [
                                {
                                    path: 'list',
                                    component: EntiteAdministrativeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'gestion-equipe',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionEquipeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'distinction',
                            children: [
                                {
                                    path: 'list',
                                    component: DistinctionAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'distinction',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-formation',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauFormationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'culture-scientifique-outil-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: CultureSciOutilPedaAdmin,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'categorie-faq',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieFaqAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'template-ouverture',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateOuvertureAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'commission-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CommissionScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut-master',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutMasterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role-evaluation-recherche-universitaire',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleEvaluationRechercheUniversitaireListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'key-word-discipline-scientifique-erc',
                            children: [
                                {
                                    path: 'list',
                                    component: KeyWordDisciplineScientifiqueErcAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },


                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'organisme',
                            children: [
                                {
                                    path: 'list',
                                    component: OrganismeListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleProjetAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-expertise',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeExpertiseAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'nationalite',
                            children: [
                                {
                                    path: 'list',
                                    component: NationaliteAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePubliqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'departement-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DepartementScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-etude',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauEtudeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-instance',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstanceAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'nature-etude',
                            children: [
                                {
                                    path: 'list',
                                    component: NatureEtudeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'contexte',
                            children: [
                                {
                                    path: 'list',
                                    component: ContexteAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'evaluation-encadrement',
                            children: [
                                {
                                    path: 'list',
                                    component: EvaluationEncadrementAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'master',
                            children: [
                                {
                                    path: 'list',
                                    component: MasterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'type-savoir',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSavoirAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique-ecole-doctorale',
                            children: [
                                {
                                    path: 'list',
                                    component: RespPedEcoleDoctoraleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'domaine-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DomaineScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-entite-administrative',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEntiteAdministrativeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'corps',
                            children: [
                                {
                                    path: 'list',
                                    component: CorpsAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'sexe',
                            children: [
                                {
                                    path: 'list',
                                    component: SexeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstrumentIrdAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'modalite-etude',
                            children: [
                                {
                                    path: 'list',
                                    component: ModaliteEtudeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'template-rappel',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateRappelAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-outil',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOutilAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'faq',
                            children: [
                                {
                                    path: 'list',
                                    component: FaqAdminComponent,
                                    canActivate: [AuthGuard]
                                },
                                {
                                    path: 'visualisation',
                                    component: FaqVisualisationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'pilote-de-donnees-list',
                            component: PiloteDeDonneesListAdminComponent,
                            canActivate: [AuthGuard]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'switch',
                                    component: SwitchChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'expertise-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ExpertiseScientifiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'langue',
                            children: [
                                {
                                    path: 'list',
                                    component: LangueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'nature-activite-grand-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: NatureActiviteGrandPubliqueListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-participation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeParticipationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneAdminComponent,
                                    canActivate: [AuthGuard]
                                },
                                {

                                    path: 'create',
                                    component: CampagneCreateAdminComponent,
                                    canActivate: [AuthGuard]
                                },

                                {

                                    path: 'view',
                                    component: CampagneViewAdminComponent,
                                    canActivate: [AuthGuard]
                                },


                                {

                                    path: 'edit',
                                    component: CampagneEditAdminComponent,
                                    canActivate: [AuthGuard]
                                },
                                {
                                    path: 'email-relance',
                                    component: EmailRelanceComponent,
                                    canActivate: [AuthGuard]
                                }
                                ,
                                {
                                    path: 'email-relance-details',
                                    component: EmailRelanceDetailsComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-utilisateur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeUtilisateurListAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-campagne-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCampagneChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'zone-geographique',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneGeographiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-erc',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueErcAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'key-word',
                            children: [
                                {
                                    path: 'list',
                                    component: KeyWordAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }, {

                            path: 'semantic-relationship',
                            children: [
                                {
                                    path: 'list',
                                    component: SemanticRelationshipAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
